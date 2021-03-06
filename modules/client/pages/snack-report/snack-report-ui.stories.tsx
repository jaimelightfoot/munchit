import { storiesOf } from "@storybook/react";
import * as React from "react";
import { SnackReportUI } from "./snack-report-ui";

storiesOf("Page – Snack Report", module)
  .add("Empty table example", () => (
    <SnackReportUI rows={[]} selectedTags={[]} onTagChange={() => {}} />
  ))
  .add("Loading state", () => (
    <SnackReportUI rows={null} selectedTags={[]} onTagChange={() => {}} />
  ))
  .add("Two rows example", () => (
    <SnackReportUI
      rows={[
        {
          place: 1,
          votes: 8,
          snack: "Cheese snack",
          tags: []
        },
        {
          place: 2,
          votes: 7,
          snack: "Guacamole",
          tags: ["Gluten-free", "Vegan"]
        }
      ]}
      selectedTags={["Vegan"]}
      onTagChange={() => {}}
    />
  ));
