import * as React from "react";

export interface SnackReportRow {
  place: number;
  votes: number;
  snack: string;
  tags: string[];
}

export interface SnackReportUIProps {
  rows: SnackReportRow[] | null;
  // more to come
}

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

export const SnackRseportUI: React.SFC = props => {
  return (
    <div className="snack-report">
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Votes</th>
            <th>Snack</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1.</td>
            <td>8</td>
            <td>Cheese snack</td>
            <td />
          </tr>
          <tr>
            <td>2.</td>
            <td>7</td>
            <td>Guacamole</td>
            <td>Gluten-free, Vegan</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
