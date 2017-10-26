//2 Create a tag-record.ts and tagging-record.ts with Id, Unsaved, and Saved types as well as new empty repositories.
import { RepositoryBase, loaderOf, NumberId } from "./record";
import { SnackRecord, TaggingRecord } from "records/record-infos";
import { TagId } from "records/tag-record";
import { SnackId } from "records/snack-record";

export type TaggingId = NumberId<"taggings">;

export interface UnsavedTagging {
  snackId: SnackId;
  tagId: TagId;
}
export interface SavedTagging extends UnsavedTagging {
  id: TaggingId;
}

export class TaggingRepository extends RepositoryBase(TaggingRecord) {
  forSnack = loaderOf(this).allBelongingTo(SnackRecord, "snackId");
}
