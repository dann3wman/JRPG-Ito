const fs = require('fs');
fs.mkdirSync('output/arena/staged-browser', { recursive:true });
const test = fs.readFileSync('output/arena/verify.cjs', 'utf8')
  .replace("await page.goto('http://127.0.0.1:8765');", "await page.goto(pathToFileURL(path.resolve('output/arena/staged/index.html')).href);")
  .replaceAll('output/arena/', 'output/arena/staged-browser/')
  .replace('output/arena/staged-browser/staged/index.html', 'output/arena/staged/index.html');
require('vm').runInThisContext('(function(require){' + test + '\n})')(require);
