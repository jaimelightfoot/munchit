import * as React from "react";
import * as TagSet from "core/tag-set";

require("./styles.scss");

export interface TagPickerProps {
  tags: ReadonlyArray<string>;
  selected: TagSet.Type;
  onTagChange: (tag: string, value: boolean) => void;
}

export const TagPicker: React.SFC<TagPickerProps> = props => {
  if (props.tags.length === 0) {
    console.log("no tags");
    return null;
  }

  const tagList = props.tags.map(tag => {
    const checked = TagSet.has(props.selected, tag);

    return (
      <li key={tag}>
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={event => props.onTagChange(tag, !checked)}
          />
          {tag}
        </label>
      </li>
    );
  });
  return (
    <div className="tag-picker">
      <div className="tag-picker-title">
        <h1>✨ Tag Picker ✨</h1>
      </div>
      <ul>{tagList}</ul>
    </div>
  );
};
