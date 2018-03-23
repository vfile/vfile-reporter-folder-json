const vfile = require("vfile");
const reporter = require("./vfile-reporter-folder-json");

test("folder should have one file", () => {
  const file = vfile({ path: "README.md", contents: "# Hello" });
  const folder = reporter([file], { raw: true });
  expect(folder).toHaveProperty("type", "folder");
  expect(folder).toHaveProperty("name", "");
  expect(folder).toHaveProperty("children.0.type", "file");
  expect(folder).toHaveProperty("children.0", file);
});

test("sub-folders generate", () => {
  const file = vfile({ path: "example/README.md", contents: "# Hello" });
  const folder = reporter([file], { raw: true });
  expect(folder).toHaveProperty("name", "");
  expect(folder).toHaveProperty("children.0.name", "example");
  expect(folder).toHaveProperty("children.0.children.0", file);
});

test("sub-folders to not be duplicated generate", () => {
  const file = vfile({ path: "example/README.md", contents: "# Hello" });
  const file2 = vfile({ path: "example/EXAMPLE.md", contents: "# Example" });
  const folder = reporter([file, file2], { raw: true });
  expect(folder).toHaveProperty("name", "");
  expect(folder).toHaveProperty("children.0.name", "example");
  expect(folder).toHaveProperty("children.0.children.0", file);
  expect(folder).toHaveProperty("children.0.children.1", file2);
});

test("two sub-folders generate", () => {
  const file = vfile({ path: "example/README.md", contents: "# Hello" });
  const file2 = vfile({ path: "example-two/README.md", contents: "# Example" });
  const folder = reporter([file, file2], { raw: true });
  expect(folder).toHaveProperty("name", "");
  expect(folder).toHaveProperty("children.0.name", "example");
  expect(folder).toHaveProperty("children.1.name", "example-two");
  expect(folder).toHaveProperty("children.0.children.0", file);
  expect(folder).toHaveProperty("children.1.children.0", file2);
});

test("nested folders generate", () => {
  const file = vfile({
    path: "a/really/long/path/README.md",
    contents: "# Hello"
  });
  const folder = reporter([file], { raw: true });
  expect(folder).toHaveProperty("name", "");
  expect(folder).toHaveProperty("children.0.name", "a");
  expect(folder).toHaveProperty("children.0.children.0.name", "really");
  expect(folder).toHaveProperty(
    "children.0.children.0.children.0.name",
    "long"
  );
  expect(folder).toHaveProperty(
    "children.0.children.0.children.0.children.0.name",
    "path"
  );
  expect(folder).toHaveProperty(
    "children.0.children.0.children.0.children.0.children.0",
    file
  );
});
