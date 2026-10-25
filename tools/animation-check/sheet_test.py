#!/usr/bin/env python3
import importlib.util
import json
from pathlib import Path
import sys
import tempfile
from types import SimpleNamespace
import unittest

sys.dont_write_bytecode = True
root = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('sheet', root / '.claude/skills/sprite-animation/scripts/sheet.py')
sheet = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sheet)


class SheetCoordinates(unittest.TestCase):
    def test_trim_metadata_and_proposal(self):
        with tempfile.TemporaryDirectory(prefix='rig-sheet-') as directory:
            work = Path(directory)
            image = sheet.Image.new('RGBA', (20, 20))
            image.paste((255, 255, 255, 255), (3, 4, 18, 19))
            image.save(work / 'source.png')
            (work / 'parts.json').write_text(json.dumps({'torso': [0, 0, 20, 20]}))
            args = SimpleNamespace(src=work / 'source.png', key=None, tol=40, fringe=2,
                                   parts=work / 'parts.json', scale=1, no_trim=False, base=None, out=work / 'new.webp')
            sheet.cmd_pack(args)
            metadata = json.loads((work / 'new.metadata.json').read_text())
            self.assertEqual(metadata['parts']['torso']['trimOffset'], [3, 4])
            self.assertEqual(metadata['parts']['torso']['packedSize'], [15, 15])
            rig = {'creature': 'test', 'bones': [
                {'id': 'torso', 'img': 'torso', 'pv': [8, 9], 'tip': [12, 13]},
                {'id': 'hand', 'p': 'torso', 'img': 'hand', 'at': [10, 11], 'pv': [1, 1]}
            ]}
            proposal = sheet.migration_proposal(rig, metadata, {'torso': [0, 0, 20, 20]})
            self.assertEqual(proposal['bones'][0]['pv'], [5, 5])
            self.assertEqual(proposal['bones'][0]['tip'], [9, 9])
            self.assertEqual(proposal['bones'][1]['at'], [7, 7])
            self.assertEqual(rig['bones'][0]['pv'], [8, 9], 'proposal must not mutate input')
            args.scale = 2
            sheet.cmd_pack(args)
            scaled = json.loads((work / 'new.metadata.json').read_text())['parts']['torso']
            self.assertEqual(scaled['scale'], [2, 2])
            self.assertEqual(scaled['sourceSize'], [20, 20])
            args.scale = 1
            args.no_trim = True
            sheet.cmd_pack(args)
            untrimmed = json.loads((work / 'new.metadata.json').read_text())['parts']['torso']
            self.assertEqual(untrimmed['trimOffset'], [0, 0])
            self.assertEqual(untrimmed['packedSize'], [20, 20])

    def test_revised_parts_keep_existing_pixels_and_metadata(self):
        with tempfile.TemporaryDirectory(prefix='rig-sheet-') as directory:
            work = Path(directory)
            image = sheet.Image.new('RGBA', (12, 12), (255, 255, 255, 255))
            image.save(work / 'source.png')
            (work / 'parts.json').write_text(json.dumps({'newPart': [0, 0, 12, 12]}))
            args = SimpleNamespace(src=work / 'source.png', key=None, tol=40, fringe=2,
                                   parts=work / 'parts.json', scale=1, no_trim=False, base='widow', out=work / 'new.webp')
            sheet.cmd_pack(args)
            metadata = json.loads((work / 'new.metadata.json').read_text())
            self.assertTrue(metadata['parts']['head']['unchanged'])
            old_rc = sheet.load_atlas()['widow']['head']
            new_rc = json.loads((work / 'new.atlas.json').read_text())['head']
            def crop(image, rc):
                x, y, w, h = rc
                return image.crop((x, y, x + w, y + h)).tobytes()
            old = sheet.Image.open(sheet.VIEWER.parent / 'widow.webp').convert('RGBA')
            new = sheet.Image.open(work / 'new.webp').convert('RGBA')
            self.assertEqual(crop(old, old_rc), crop(new, new_rc))


if __name__ == '__main__':
    unittest.main()
