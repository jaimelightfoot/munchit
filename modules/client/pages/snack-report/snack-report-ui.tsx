import * as React from "react";
import * as TagSet from "core/tag-set";
import { TagPicker } from "client/components/tag-picker";

export interface SnackReportRow {
  place: number;
  votes: number;
  snack: string;
  tags: string[];
}

export interface SnackReportUIProps {
  rows: SnackReportRow[] | null;
  selectedTags: TagSet.Type;
  onTagChange: (tag: string, value: boolean) => void;
}

const TAGS = ["delish", "Gluten-free", "Vegan", "yummy"];

export const SnackReportUI: React.SFC<SnackReportUIProps> = props => {
  if (props.rows === null) {
    return <div className="snack-report">Loading...</div>;
  } else if (props.rows.length === 0) {
    return <div className="snack-report">No snacks to show :(</div>;
  } else {
    var rows = props.rows.map((row, i) => (
      <tr key={i}>
        <td>{row.place}</td>
        <td>{row.votes}</td>
        <td>{row.snack}</td>
        <td>{row.tags.join(", ")}</td>
      </tr>
    ));
  }
  return (
    <div className="snack-report">
      <div className="oh-no">
        <TagPicker
          tags={TAGS}
          selected={props.selectedTags}
          onTagChange={() => {}}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Votes</th>
            <th>Snack</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};
