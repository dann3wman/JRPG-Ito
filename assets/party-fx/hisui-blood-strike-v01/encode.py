"""Encode the shared renderer's 180 full-resolution frames. Usage: python encode.py FRAMES."""
from PIL import Image
from pathlib import Path
import sys, subprocess
P=Path(__file__).resolve().parent;src=Path(sys.argv[1]);frames=[Image.open(src/f'{i:04d}.png').convert('RGBA') for i in range(180)]
# APNG permits rational millisecond delays. 180*1000/60 = 3000 ms.
frames[0].save(P/'hisui-blood-strike.v01.apng',save_all=True,append_images=frames[1:],duration=1000/60,loop=1,disposal=0,blend=0)
# A viewing derivative for native playback. GIF's 10 ms clock uses a repeating
# 20/10/20 ms exposure pattern, preserving total duration and order.
gif=[f.resize((768,432),Image.Resampling.NEAREST).convert('RGB').quantize(colors=128) for f in frames]
gif[0].save(P/'hisui-blood-strike.v01.gif',save_all=True,append_images=gif[1:],duration=[20,10,20]*60,loop=1,disposal=1)
subprocess.run(['ffmpeg','-v','error','-y','-framerate','60','-i',str(src/'%04d.png'),'-c:v','libx264','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',str(P/'hisui-blood-strike.v01.mp4')],check=True)
print('Encoded APNG, GIF and MP4.')
