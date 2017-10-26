import {
  SnackReportUI,
  SnackReportUIProps,
  SnackReportRow
} from "client/pages/snack-report/snack-report-ui";
import { SnackReportQuery } from "client/graphql-types";
import { graphql } from "react-apollo";

export function dataToRows(data: SnackReportQuery): SnackReportRow[] {
  if (!data.topSnacks) {
    return [];
  }

  return data.topSnacks.map((row, index) => ({
    place: index + 1,
    snack: row.name,
    votes: row.voteCount,
    tags: []
  }));
}

const wireToApollo = graphql<
  SnackReportQuery,
  {},
  SnackReportUIProps
>(require("client/graphql-queries/SnackReport.graphql"), {
  props(result): SnackReportUIProps {
    if (!result.data || result.data.loading) {
      return { rows: null };
    } else {
      return { rows: dataToRows(result.data) };
    }
  }
});

export const SnackReportPage = wireToApollo(SnackReportUI);
