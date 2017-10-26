import { SnackReportQuery } from "client/graphql-types";
import { SnackReportRow } from "client/pages/snack-report/snack-report-ui";
import { dataToRows } from "client/pages/snack-report/index";

describe("SnackReport.dataToRows", () => {
  it("handles a failed lookup", () => {
    const query: SnackReportQuery = {
      allSnacks: null
    };
    const expected: SnackReportRow[] = [];

    const result = dataToRows(query);
    expect(result).toEqual(expected);
  });

  it("returns data with valid place", () => {
    const query: SnackReportQuery = {
      allSnacks: [
        {
          id: 1,
          name: "Nom #1",
          voteCount: 4
        },
        {
          id: 2,
          name: "Nom #2",
          voteCount: 3
        }
      ]
    };

    const expected: SnackReportRow[] = [
      {
        place: 1,
        snack: "Nom #1",
        votes: 4,
        tags: []
      },
      {
        place: 2,
        snack: "Nom #2",
        votes: 3,
        tags: []
      }
    ];

    const result = dataToRows(query);
    expect(result).toEqual(expected);
  });
});
