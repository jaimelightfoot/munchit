import { recordInfo, RecordInfo } from "records/record";
import { UnsavedVote, SavedVote } from "records/vote-record";
import { UnsavedSnack, SavedSnack } from "records/snack-record";

export const VoteRecord = recordInfo<UnsavedVote, SavedVote>("votes");
export const SnackRecord = recordInfo<UnsavedSnack, SavedSnack>("snacks");

export const ALL_RECORDS: ReadonlyArray<RecordInfo<any, any, any>> = [
  VoteRecord,
  SnackRecord
];