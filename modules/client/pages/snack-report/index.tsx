import * as React from "react";
import {
  SnackReportUI,
  SnackReportRow
} from "client/pages/snack-report/snack-report-ui";
import { SnackReportQuery } from "client/graphql-types";

export const SnackReportPage: React.SFC = props => {
  return <SnackReportUI rows={null} />;
};

export function dataToRows(data: SnackReportQuery): SnackReportRow[] {
  if (!data.allSnacks) {
    return [];
  }

  return data.allSnacks.map((row, index) => ({
    place: index + 1,
    snack: row.name,
    votes: row.voteCount,
    tags: []
  }));
}
