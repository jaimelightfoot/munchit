import { Flavor } from "helpers";

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
