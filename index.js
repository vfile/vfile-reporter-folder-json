const {join, sep} = require('path')

module.exports = vFilesystem

// NOTE: this relies on side effects from the children property
function addFileOrFolder(folder, {pathList, vFile}) {
  // This is where the file goes, add it
  if (pathList.length <= 1) {
    vFile.type = 'file'
    folder.children.push(vFile)
    return folder
  }

  // Find sub folder
  const name = pathList.shift()
  let subFolder = folder.children.find(child => child.name === name)

  // Folder is missing add it
  if (!subFolder) {
    subFolder = vFolder({cwd: folder.path, name})
    folder.children.push(subFolder)
  }

  // Recurse
  addFileOrFolder(subFolder, {pathList, vFile})

  // Return resolved virtual file system
  return folder
}

// Return a unist compatible JSON tree.
// With `file` and `folder` nodes.
function vFilesystem(files, {pretty = null, raw = false} = {}) {
  const filesystem = files
    .map(vFile => ({vFile, pathList: vFile.path.split(sep)}))
    .reduce(addFileOrFolder, vFolder())

  if (raw) {
    return filesystem
  }

  return JSON.stringify(filesystem, null, pretty)
}

function vFolder({name = '', children = [], cwd = ''} = {}) {
  return {type: 'folder', path: join(cwd, name), name, children}
}
