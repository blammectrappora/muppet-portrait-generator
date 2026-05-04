# Muppet Portrait Generator

Generate hilarious muppet-style felt puppet portraits from text descriptions — googly eyes, fuzzy fabric textures, exaggerated colorful features, all rendered in cinematic studio lighting. Describe any character, person, or creature in words and get back a plush, Sesame Street-inspired puppet portrait. Perfect for viral memes, profile pics, birthday cards, and fan art.

Powered by the Neta AI image generation API (api.talesofai.com) — the same service as neta.art/open.

## Install

```bash
npx skills add blammectrappora/muppet-portrait-generator
```

Or via ClawHub:

```bash
clawhub install muppet-portrait-generator
```

## Usage

```bash
node muppetportraitgenerator.js "a wise old wizard with a long beard" --token YOUR_TOKEN
```

Pass any text description of who or what you want muppet-ified. The skill prepends the muppet style preset automatically.

### Examples

Generate a muppet astronaut:

```bash
node muppetportraitgenerator.js "an astronaut floating in space, holding a tiny rocket" --token YOUR_TOKEN
```

Square format for social media:

```bash
node muppetportraitgenerator.js "a happy chef with a tall white hat" --size square --token YOUR_TOKEN
```

Use a reference image for style inheritance:

```bash
node muppetportraitgenerator.js "a friendly dragon" --ref <picture_uuid> --token YOUR_TOKEN
```

## Options

| Flag      | Description                                             | Default    |
| --------- | ------------------------------------------------------- | ---------- |
| `--size`  | Output size: `portrait`, `landscape`, `square`, `tall`  | `portrait` |
| `--token` | Neta API token (required)                               | —          |
| `--ref`   | Reference image UUID for style inheritance              | —          |

### Sizes

| Name        | Dimensions |
| ----------- | ---------- |
| `square`    | 1024×1024  |
| `portrait`  | 832×1216   |
| `landscape` | 1216×832   |
| `tall`      | 704×1408   |

## Token Setup

This skill requires a Neta API token (free trial available at <https://www.neta.art/open/>).

Pass it via the `--token` flag:

```bash
node <script> "your prompt" --token YOUR_TOKEN
```

## Output

Returns a direct image URL.

## Example Output

```bash
node muppetportraitgenerator.js "muppet-style puppet portrait, soft felt fabric texture, oversized googly eyes, exaggerated colorful fuzzy fur, big silly grin, vibrant saturated colors, professional studio lighting with soft rim light, Sesame Street aesthetic, plush character vibes, high detail felt material, charming and goofy expression"
```

![Example output](https://oss.talesofai.cn/picture/acdfb6ea-43ab-4b8c-8ec1-68e665777746.webp)

> Prompt: *"muppet-style puppet portrait, soft felt fabric texture, oversized googly eyes, exaggerated colorful fuzzy fur, big silly grin, vibrant saturated colors, professional studio lighting with soft rim light, Sesame Street aesthetic, plush character vibes, high detail felt material, charming and goofy expression"*
