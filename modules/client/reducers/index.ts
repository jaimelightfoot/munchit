import * as State from "../state";
import { ActionTypeKeys, ActionTypes } from "client/actions";
import * as TagSet from "core/tag-set";

export function rootReducer(
  state: State.Type = State.DEFAULT,
  action: ActionTypes
): State.Type {
  switch (action.type) {
    case ActionTypeKeys.SET_POPULARITY:
      return State.popularityMode.set(state, action.popularityMode);
    case ActionTypeKeys.CHANGE_TAG:
      return State.selectedTags
        .comp(TagSet.tagValue(action.tag))
        .set(state, action.value);
    default:
      return state;
  }
}
