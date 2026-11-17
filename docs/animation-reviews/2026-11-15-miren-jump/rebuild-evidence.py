"""Rebuild review evidence from the pinned, unchanged Miren source and rendered frames."""
import hashlib
import json
from pathlib import Path
import subprocess
import sys
from PIL import Image, ImageDraw

source, rendered, output = map(Path, sys.argv[1:4])
output.mkdir(parents=True, exist_ok=True)
assert hashlib.sha256((source / 'poses.png').read_bytes()).hexdigest() == '9f2737479e35760455f14513c407be767e93aa5f9e95acbcc029fe78d69f168c'
atlas = Image.open(source / 'poses.png').convert('RGBA')
assert atlas.size == (192, 128)
sheet = Image.new('RGB', (768, 600), '#20262d')
draw = ImageDraw.Draw(sheet)
labels = ['MJ01 HOVER', 'MJ02 COIL', 'MJ03 ASCEND', 'MJ04 SUSPEND', 'MJ05 DIVE', 'MJ06 RECOIL']
for i, label in enumerate(labels):
    x, y = i % 3 * 64, i // 3 * 64
    cell = atlas.crop((x, y, x + 64, y + 64)).resize((256, 256), Image.Resampling.NEAREST)
    sheet.paste(cell, (i % 3 * 256, i // 3 * 300), cell)
    draw.text((i % 3 * 256 + 8, i // 3 * 300 + 270), label, fill='white')
sheet.save(output / 'poses.review-4x.png')
boundary = Image.new('RGB', (768, 300), '#20262d')
draw = ImageDraw.Draw(boundary)
for i, t in enumerate([3299, 3300]):
    frame = Image.open(rendered / f'after_{t}.png').crop((960, 464, 1216, 720))
    boundary.paste(frame, (i * 384, 0))
    draw.text((i * 384 + 8, 270), f'{t} ms: ' + ('MJ06 RECOIL' if i == 0 else 'MJ01 HOVER'), fill='white')
boundary.save(output / 'recovery-boundary.png')
for name, fps in [('normal', 60), ('slow', 30)]:
    subprocess.run(['ffmpeg', '-v', 'error', '-framerate', str(fps), '-i', str(rendered / '%04d.png'),
                    '-vf', 'crop=768:432:768:32', '-c:v', 'libx264', '-crf', '16', '-pix_fmt', 'yuv420p',
                    '-y', str(output / f'jump.{name}.mp4')], check=True)
