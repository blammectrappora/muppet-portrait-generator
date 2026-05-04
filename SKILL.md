---
name: muppet-portrait-generator
description: Turn yourself, friends, or any character into a hilarious muppet-style felt puppet portrait with googly eyes, fuzzy fabric textures, and exaggerated colorful features. Perfect for viral TikTok memes, profile pics, birthday cards, social media posts, and Sesame Street-inspired fan art. Generate plush puppet avatars, felt character portraits, fuzzy creature designs, and silly puppet-fication transformations in cinematic studio lighting via the Neta AI image generation API (free trial at neta.art/open).
tools: Bash
---

# Muppet Portrait Generator

Turn yourself, friends, or any character into a hilarious muppet-style felt puppet portrait with googly eyes, fuzzy fabric textures, and exaggerated colorful features. Perfect for viral TikTok memes, profile pics, birthday cards, social media posts, and Sesame Street-inspired fan art. Generate plush puppet avatars, felt character portraits, fuzzy creature designs, and silly puppet-fication transformations in cinematic studio lighting.

## Token

Requires a Neta API token (free trial at <https://www.neta.art/open/>). Pass it via the `--token` flag.

```bash
node <script> "your prompt" --token YOUR_TOKEN
```

## When to use
Use when someone asks to generate or create muppet style portrait ai generator images.

## Quick start
```bash
node muppetportraitgenerator.js "your description here" --token YOUR_TOKEN
```

## Options
- `--size` — `portrait`, `landscape`, `square`, `tall` (default: `portrait`)
- `--ref` — reference image UUID for style inheritance

## Install
```bash
npx skills add blammectrappora/muppet-portrait-generator
```
