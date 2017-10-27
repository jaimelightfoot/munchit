import { Flavor } from "helpers";
import { Lens } from "@atomic-object/lenses/lib";

export type Type = Flavor<Array<string>, "TagSet">;
export const EMPTY: Type = [];

export function has(set: Type, tag: string): boolean {
  return set.indexOf(tag) >= 0;
}

export function add(set: Type, tag: string): Type {
  if (has(set, tag)) {
    return set;
  } else {
    return [...set, tag].sort();
  }
}

export function remove(set: Type, tag: string): Type {
  if (has(set, tag)) {
    return set.filter(t => t != tag);
  } else {
    return set;
  }
}

export const tagValue = (tag: string): Lens<Type, boolean> =>
  Lens.of<Type, boolean>({
    get: tagSet => has(tagSet, tag),
    set: (tagSet, value) => (value ? add(tagSet, tag) : remove(tagSet, tag))
  });
