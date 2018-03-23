const { sep } = require("path");

class vFolder {
  constructor({ name = "", children = [] } = {}) {
    return {
      type: "folder",
      name,
      children
    };
  }
}

// NOTE: this relies on side effects from the children property
function addFileOrFolder(folder, { pathList, vFile }) {
  // this is where the file goes, add it
  if (pathList.length <= 1) {
    vFile.type = "file";
    folder.children.push(vFile);
    return folder;
  }

  // find sub folder
  const name = pathList.shift();
  let subFolder = folder.children.find(child => child.name === name);

  // folder is missing add it
  if (!subFolder) {
    subFolder = new vFolder({ name });
    folder.children.push(subFolder);
  }

  // recurse
  addFileOrFolder(subFolder, { pathList, vFile });

  // return resolved virtual file system
  return folder;
}

/**
 * Returns a Unist compatible JSON tree.
 * With `file` and `folder` nodes
 */
function vFilesystem(files, { pretty = null, raw = false } = {}) {
  const filesystem = files
    .map(vFile => ({ vFile, pathList: vFile.path.split(sep) }))
    .reduce(addFileOrFolder, new vFolder());

  if (raw) {
    return filesystem;
  }

  return JSON.stringify(filesystem, null, pretty);
}

module.exports = vFilesystem;
