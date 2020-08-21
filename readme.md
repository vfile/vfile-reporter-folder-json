# vfile-reporter-folder-json

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Construct a virtual JSON folder structure based off the paths of the given
[vfile][]s.

## Install

[npm][]:

```sh
npm install vfile-reporter-folder-json
```

…or [yarn][]:

```sh
yarn add vfile-reporter-folder-json
```

## Use

The plugin can be use added via [unified-engine][] configuration:

```js
{
  reporter: 'vfile-reporter-folder-json'
}
```

…or from the terminal with [unified-args][]:

```sh
remark . --report vfile-reporter-folder-json
```

…or programmatically from [unified-engine][]:

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

## API

### `vfileReporterFolderJson(files[, options])`

Pass a list of [vfile][]s.

###### `options.pretty`

Indentation to use for printing json, can be a number or `'\t'` (optional).

###### `options.raw`

Output a raw (un-stringified) JSON object (default: `false`).

###### Returns

Virtual JSON folder, such as the following:

```js
{
  type: 'folder',
  name: '',
  path: '.',
  children: [
    {
      type: 'file',
      path: 'README.md',
      extname: '.md',
      basename: 'README.md',
      history: [],
      messages: [],
      data: {}
    },
    {
      type: 'folder',
      name: 'example',
      path: 'example',
      children: [
        {
          type: 'file',
          path: 'example/README.md',
          extname: '.md',
          basename: 'README.md',
          history: [],
          messages: [],
          data: {}
        },
        {
          type: 'folder',
          name: 'two',
          path: 'example/two',
          children: [
            {
              type: 'file',
              path: 'example/two/README.md',
              extname: '.md',
              basename: 'README.md',
              history: [],
              messages: [],
              data: {}
            }
          ]
        }
      ]
    }
  ]
}
```

## Contribute

See [`contributing.md`][contributing] in [`vfile/.github`][health] for ways to
get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © Christian Murphy

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/vfile/vfile-reporter-folder-json.svg

[build]: https://travis-ci.org/vfile/vfile-reporter-folder-json

[coverage-badge]: https://img.shields.io/codecov/c/github/vfile/vfile-reporter-folder-json.svg

[coverage]: https://codecov.io/github/vfile/vfile-reporter-folder-json

[downloads-badge]: https://img.shields.io/npm/dm/vfile-reporter-folder-json.svg

[downloads]: https://www.npmjs.com/package/vfile-reporter-folder-json

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/vfile/vfile/discussions

[npm]: https://docs.npmjs.com/cli/install

[yarn]: https://yarnpkg.com/en/docs/cli/add

[contributing]: https://github.com/vfile/.github/blob/HEAD/contributing.md

[support]: https://github.com/vfile/.github/blob/HEAD/support.md

[health]: https://github.com/vfile/.github

[coc]: https://github.com/vfile/.github/blob/HEAD/code-of-conduct.md

[license]: license

[vfile]: https://github.com/vfile/vfile

[unified-engine]: https://github.com/unifiedjs/unified-engine#options

[unified-args]: https://github.com/unifiedjs/unified-args#--report-reporter
