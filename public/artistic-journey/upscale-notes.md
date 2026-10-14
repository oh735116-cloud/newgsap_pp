# Foundation image processing

- Original: `public/01-foundation.jpg` (1682 × 1080), preserved.
- Applied: `public/01-foundation-upscaled.webp` (3364 × 2160).
- Method: built-in image_gen restoration followed by Sharp Lanczos3 resizing and WebP encoding at quality 92.
- The generated restoration was 1565 × 1005. The final dimensions come from resampling, not native high-resolution AI output. AI restoration may alter small facial, clothing, and instrument details.
- This is a prepared asset, not an automatic upload processing service. New originals require regeneration to update the derivative.

## Prompt used for selected restoration

Use case: identity-preserve. Edit target: the supplied photograph. Upscale and conservatively restore this exact photograph for a large website background, aiming for 3364 x 2160 or higher resolution with the original aspect ratio. Preserve the same person's face, identity, pose, clothing and lettering, drumsticks, drum, all brass instruments, stage floor, lighting, shadows, dark background and exact framing. Only improve resolution, mild compression artifacts and natural edge clarity. Do not redesign, beautify, add objects or text, crop, change colors, or invent fine facial detail. Keep the photographic appearance and composition identical.

# Education image processing

- Original: `public/03-education.png` (1673 × 940), preserved.
- Applied: `public/03-education-upscaled.webp` (3346 × 1880).
- Method: built-in image_gen restoration followed by Sharp Lanczos3 resizing and WebP encoding at quality 92, matching the first image workflow.
- Final dimensions come from resampling; AI restoration can alter small details and does not recover verified original detail.

## Prompt used

Use case: identity-preserve. Edit target: the supplied orchestra concert photograph. Conservatively restore and upscale this exact photo for an enlarged website background, aiming for 3346 x 1880 pixels, maintaining its original aspect ratio. Preserve exact framing, every musician and conductor, identities, poses, clothing, instrument types and placements, chairs, music stands, piano, percussion, flowers, curtains, stage floor, lighting, projected film scene and banner lettering. Improve only mild compression artifacts, noise and natural edge clarity. Keep the dim concert atmosphere and original colors. No new objects, no people removed or added, no invented face details, no new text, no crop, no stylization or redesign.
