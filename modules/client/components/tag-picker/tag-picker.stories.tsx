import { storiesOf } from "@storybook/react";
import * as React from "react";
import { TagPicker } from "client/components/tag-picker";
import * as TagSet from "core/tag-set";

storiesOf("Component – Tag Picker", module)
  .add("Empty example", () => (
    <TagPicker
      selected={TagSet.EMPTY}
      tags={[] as string[]}
      onTagChange={() => {}}
    />
  ))
  .add("Basic example, none selected", () => (
    <TagPicker
      selected={TagSet.EMPTY}
      tags={["one", "two", "three"]}
      onTagChange={() => {}}
    />
  ))
  .add("Basic example, one selected", () => (
    <TagPicker
      selected={["one"]}
      tags={["one", "two", "three"]}
      onTagChange={() => {}}
    />
  ));
