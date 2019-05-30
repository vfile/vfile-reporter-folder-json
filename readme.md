# vfile reporter folder json

[![NPM Version](https://img.shields.io/npm/v/vfile-reporter-folder-json.svg)](https://www.npmjs.com/package/vfile-reporter-folder-json)
[![Linux Build Status](https://travis-ci.org/vfile/vfile-reporter-folder-json.svg?branch=master)](https://travis-ci.org/vfile/vfile-reporter-folder-json)
[![Windows Build status](https://ci.appveyor.com/api/projects/status/xqjg1cs03g44g2x9/branch/master?svg=true)](https://ci.appveyor.com/project/ChristianMurphy/vfile-reporter-folder-json/branch/master)

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
const engine = require('unified-engine')
const remark = require('remark')
const folderJson = require('vfile-reporter-folder-json')

engine(
  {
    // Custom reporter
    reporter: folderJson,
    // Standard engine configuration
    processor: remark,
    files: ['.'],
    extensions: ['md', 'markdown', 'mkd', 'mkdn', 'mkdown'],
    pluginPrefix: 'remark',
    rcName: '.remarkrc',
    packageField: 'remarkConfig',
    ignoreName: '.remarkignore',
    color: true
  },
  err => {
    if (err) throw err
  }
)
```

## Options

- **pretty** - optional - identation to use for printing json, can be a number or `"\t"`
- **raw** - optional - output raw (un-stringified) json object

## Output

```json
{
  "type": "folder",
  "name": "",
  "path": ".",
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
      "path": "example",
      "children": [
        {
          "type": "file",
          "path": "example/README.md",
          "extname": ".md",
          "basename": "README.md",
          "history": [],
          "messages": [],
          "data": {}
        },
        {
          "type": "folder",
          "name": "two",
          "path": "example/two",
          "children": [
            {
              "type": "file",
              "path": "example/two/README.md",
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
  ]
}
```

## Contribute

**VFile** is built by people just like you! Check out
[`contributing.md`][contribute] for ways to get started.

This project has a [Code of Conduct][coc]. By interacting with this repository,
organisation, or community you agree to abide by its terms.

Want to chat with the community and contributors? Join us in [Gitter][chat]!

Have an idea for a cool new utility or tool? That’s great! If you want
feedback, help, or just to share it with the world you can do so by creating
an issue in the [`vfile/ideas`][ideas] repository!

[chat]: https://gitter.im/vfile/Lobby
[contribute]: CONTRIBUTING.md
[coc]: https://github.com/vfile/vfile/blob/master/code-of-conduct.md
[ideas]: https://github.com/vfile/ideas
