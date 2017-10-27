import * as TagSet from "../tag-set";

describe("TagSet.has", () => {
  it("returns true if the set contains the tagname", () => {
    expect(TagSet.has(["foo"], "foo")).toBeTruthy();
  });
  it("returns false if the set doesn't contain the value", () => {
    expect(TagSet.has(["foo"], "bar")).toBeFalsy();
  });
});

describe("TagSet.add", () => {
  it("can add a tag to a TagSet", () => {
    expect(TagSet.add(TagSet.EMPTY, "foo")).toEqual(["foo"]);
  });
  it("can keeps the tag set ordered", () => {
    expect(TagSet.add(["foo"], "bar")).toEqual(["bar", "foo"]);
  });
  it("does not duplicate entries", () => {
    const original: TagSet.Type = ["foo"];
    expect(TagSet.add(original, "foo")).toBe(original);
  });
});

describe("TagSet.remove", () => {
  it("can remove a tag from a TagSet", () => {
    expect(TagSet.remove(["bar", "foo"], "foo")).toEqual(["bar"]);
  });
  it("returns the tagSet if the tag isn't present", () => {
    const original: TagSet.Type = ["bar"];
    expect(TagSet.remove(original, "foo")).toBe(original);
  });
});

describe("tagValue", () => {
  it("Can get presence of a tag in a tag set", () => {
    expect(TagSet.tagValue("thing 1").get(["thing 1"])).toBe(true);
    expect(TagSet.tagValue("thing 1").get(["thing 2"])).toBe(false);
  });

  it("Can set presence of a tag into a tag set", () => {
    expect(TagSet.tagValue("thing 1").set(["thing 2"], true)).toEqual([
      "thing 1",
      "thing 2"
    ]);
    expect(TagSet.tagValue("thing 1").set(["thing 2"], false)).toEqual([
      "thing 2"
    ]);
    expect(TagSet.tagValue("thing 1").set(["thing 1"], true)).toEqual([
      "thing 1"
    ]);
    expect(TagSet.tagValue("thing 1").set(["thing 1"], false)).toEqual([]);
  });

  it("Can update a tag in a tagset", () => {});
});
