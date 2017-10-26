//2 Create a tag-record.ts and tagging-record.ts with Id, Unsaved, and Saved types as well as new empty repositories.
import { RepositoryBase, loaderOf, NumberId } from "./record";
import { TagRecord, TaggingRecord } from "records/record-infos";

export type TagId = NumberId<"tags">;

export interface UnsavedTag {
  name: string;
}
export interface SavedTag extends UnsavedTag {
  id: TagId;
}

export class TagRepository extends RepositoryBase(TagRecord) {
  forTagging = loaderOf(this).owning(TaggingRecord, "tagId");
}
