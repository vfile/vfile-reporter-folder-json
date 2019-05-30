const test = require("tape");
const vfile = require("vfile");
const reporter = require("./vfile-reporter-folder-json");
const { join } = require("path");

test("folder should have one file", t => {
  const file = vfile({ path: "readme.md", contents: "# Hello" });
  const folder = reporter([file], { raw: true });

  t.equal(folder.type, "folder", "should have a type");
  t.equal(folder.name, "", "should have a name");
  t.equal(folder.children.length, 1, "should have one child");
  t.equal(folder.children[0].type, "file", "should have a file (#1)");
  t.equal(folder.children[0], file, "should have a file (#2)");

  t.end();
});

test("sub-folders generate", t => {
  const file = vfile({
    path: join("example", "readme.md"),
    contents: "# Hello"
  });
  const folder = reporter([file], { raw: true });

  t.equal(folder.name, "", "should have a name");
  t.equal(folder.children.length, 1, "should have one child");
  t.equal(folder.children[0].name, "example", "should have a subfolder");
  t.equal(folder.children[0].children[0], file, "should have a file");

  t.end();
});

test("sub-folders to not be duplicated generate", t => {
  const file = vfile({
    path: join("example", "readme.md"),
    contents: "# Hello"
  });
  const file2 = vfile({
    path: join("example", "example.md"),
    contents: "# Example"
  });
  const folder = reporter([file, file2], { raw: true });

  t.equal(folder.name, "", "should have a name");
  t.equal(folder.children[0].name, "example", "should have a subfolder");
  t.equal(folder.children[0].children[0], file, "should have a file");
  t.equal(folder.children[0].children[1], file2, "should have another file");

  t.end();
});

test("two sub-folders generate", t => {
  const file = vfile({
    path: join("example", "readme.md"),
    contents: "# Hello"
  });
  const file2 = vfile({
    path: join("example-two", "readme.md"),
    contents: "# Example"
  });
  const folder = reporter([file, file2], { raw: true });

  t.equal(folder.name, "", "should have a name");
  t.equal(folder.children[0].name, "example", "should have a subfolder");
  t.equal(
    folder.children[1].name,
    "example-two",
    "should have another subfolder"
  );
  t.equal(folder.children[0].children[0], file, "should have a file");
  t.equal(folder.children[1].children[0], file2, "should have another file");

  t.end();
});

test("folders have path attribute", t => {
  const file = vfile({
    path: join("example", "foo", "readme.md"),
    contents: "# Hello"
  });

  const folder = reporter([file], { raw: true });
  t.equal(folder.path, ".", "root should have a path");

  const subFolder = folder.children.find(vfile => vfile.type === "folder");
  t.equal(subFolder.path, "example", "folder should have a path");

  const subFolder2 = subFolder.children.find(vfile => vfile.type === "folder");
  t.equal(subFolder2.path, join("example", "foo"), "folder should have a path");

  t.end();
});

test("nested folders generate", t => {
  const file = vfile({
    path: join("a", "really", "long", "path", "readme.md"),
    contents: "# Hello"
  });
  const folder = reporter([file], { raw: true });

  t.equal(folder.name, "");
  t.equal(folder.children[0].name, "a");
  t.equal(folder.children[0].children[0].name, "really");
  t.equal(folder.children[0].children[0].children[0].name, "long");
  t.equal(folder.children[0].children[0].children[0].children[0].name, "path");
  t.equal(
    folder.children[0].children[0].children[0].children[0].children[0],
    file
  );

  t.end();
});
