# vfile reporter folder json

[![Build Status](https://travis-ci.org/ChristianMurphy/vfile-reporter-folder-json.svg?branch=master)](https://travis-ci.org/ChristianMurphy/vfile-reporter-folder-json)

> Construct a virtual json folder structure based off the paths of the given vfiles

## Installing

```sh
# npm
npm install vfile-reporter-folder-json

# yarn
yarn add vfile-reporter-folder-json
```

## Usage

The plugin can be use added via [unified-engine](https://github.com/unifiedjs/unified-engine#options) configuration

```json
{
  "reporter": "vfile-reporter-folder-json"
}
```

or from the terminal with [Unified Args](https://github.com/unifiedjs/unified-args#--report-reporter)

```sh
remark . --report vfile-reporter-folder-json
```

or programmatically from [unified-engine](https://github.com/unifiedjs/unified-engine#options)

```js
const engine = require('unified-engine');
const remark = require('remark');
const folderJson = require('vfile-reporter-folder-json');

engine({
  // custom reporter
  reporter: folderJson
  // standard engine configuration
  processor: remark,
  files: ['.'],
  extensions: ['md', 'markdown', 'mkd', 'mkdn', 'mkdown'],
  pluginPrefix: 'remark',
  rcName: '.remarkrc',
  packageField: 'remarkConfig',
  ignoreName: '.remarkignore',
  color: true
}, function (err) {
  if (err) throw err;
});
```

## Options

* **pretty** - optional - identation to use for printing json, can be a number or `"\t"`
* **raw** - optional - output raw (un-stringified) json object

## Output

```json
{
  "type": "folder",
  "name": "",
  "children": [
    {
      "type": "file",
      "path": "README.md",
      "extname": ".md",
      "basename": "README.md",
      "history": [],
      "messages": [],
      "data": {}
    },
    {
      "type": "folder",
      "name": "example",
      "children": [
        {
          "type": "file",
          "path": "example/README.md",
          "extname": ".md",
          "basename": "README.md",
          "history": [],
          "messages": [],
          "data": {}
        }
      ]
    }
  ]
}
```
