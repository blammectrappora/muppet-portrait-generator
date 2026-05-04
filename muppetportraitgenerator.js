#!/usr/bin/env node
import process from 'node:process';

const DEFAULT_PROMPT = "muppet-style puppet portrait, soft felt fabric texture, oversized googly eyes, exaggerated colorful fuzzy fur, big silly grin, vibrant saturated colors, professional studio lighting with soft rim light, Sesame Street aesthetic, plush character vibes, high detail felt material, charming and goofy expression";

const SIZES = {
  square: { width: 1024, height: 1024 },
  portrait: { width: 832, height: 1216 },
  landscape: { width: 1216, height: 832 },
  tall: { width: 704, height: 1408 },
};

function parseArgs(argv) {
  const args = { positional: [], size: 'portrait', token: null, ref: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--size') args.size = argv[++i];
    else if (a === '--token') args.token = argv[++i];
    else if (a === '--ref') args.ref = argv[++i];
    else args.positional.push(a);
  }
  return args;
}

async function main() {
  const argv = process.argv.slice(2);
  const { positional, size, token: tokenFlag, ref } = parseArgs(argv);

  const userPrompt = positional.join(' ').trim();
  const PROMPT = userPrompt
    ? `${DEFAULT_PROMPT}, ${userPrompt}`
    : DEFAULT_PROMPT;

  const TOKEN = tokenFlag;

  if (!TOKEN) {
    console.error('\n✗ Token required. Pass via: --token YOUR_TOKEN');
    console.error('  Get yours at: https://www.neta.art/open/');
    process.exit(1);
  }

  const dims = SIZES[size] || SIZES.portrait;

  const headers = {
    'x-token': TOKEN,
    'x-platform': 'nieta-app/web',
    'content-type': 'application/json',
  };

  const body = {
    storyId: 'DO_NOT_USE',
    jobType: 'universal',
    rawPrompt: [{ type: 'freetext', value: PROMPT, weight: 1 }],
    width: dims.width,
    height: dims.height,
    meta: { entrance: 'PICTURE,VERSE' },
    context_model_series: '8_image_edit',
  };

  if (ref) {
    body.inherit_params = {
      collection_uuid: ref,
      picture_uuid: ref,
    };
  }

  console.error(`→ Submitting muppet portrait job (${dims.width}x${dims.height})...`);

  let submitRes;
  try {
    submitRes = await fetch('https://api.talesofai.com/v3/make_image', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(`✗ Network error: ${err.message}`);
    process.exit(1);
  }

  if (!submitRes.ok) {
    const text = await submitRes.text();
    console.error(`✗ Submit failed (${submitRes.status}): ${text}`);
    process.exit(1);
  }

  const submitText = await submitRes.text();
  let taskUuid;
  try {
    const parsed = JSON.parse(submitText);
    taskUuid = typeof parsed === 'string' ? parsed : parsed.task_uuid;
  } catch {
    taskUuid = submitText.replace(/^"|"$/g, '').trim();
  }

  if (!taskUuid) {
    console.error(`✗ No task_uuid returned: ${submitText}`);
    process.exit(1);
  }

  console.error(`→ Task ${taskUuid} submitted, polling...`);

  for (let attempt = 0; attempt < 90; attempt++) {
    await new Promise((r) => setTimeout(r, 2000));

    let pollRes;
    try {
      pollRes = await fetch(`https://api.talesofai.com/v1/artifact/task/${taskUuid}`, {
        method: 'GET',
        headers,
      });
    } catch (err) {
      console.error(`  poll error: ${err.message}`);
      continue;
    }

    if (!pollRes.ok) {
      console.error(`  poll http ${pollRes.status}`);
      continue;
    }

    const data = await pollRes.json();
    const status = data.task_status;

    if (status === 'PENDING' || status === 'MODERATION') {
      if (attempt % 5 === 0) console.error(`  status: ${status} (attempt ${attempt + 1}/90)`);
      continue;
    }

    const url =
      (data.artifacts && data.artifacts[0] && data.artifacts[0].url) ||
      data.result_image_url;

    if (url) {
      console.log(url);
      process.exit(0);
    }

    console.error(`✗ Task finished with status "${status}" but no URL found.`);
    console.error(JSON.stringify(data, null, 2));
    process.exit(1);
  }

  console.error('✗ Timed out after 90 polling attempts (~3 minutes).');
  process.exit(1);
}

main().catch((err) => {
  console.error(`✗ Unexpected error: ${err.message}`);
  process.exit(1);
});
