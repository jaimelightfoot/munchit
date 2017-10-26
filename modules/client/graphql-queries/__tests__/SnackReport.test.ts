import { withContext } from "__tests__/db-helpers";
import { SnackReportQuery } from "client/graphql-types";

describe("Dashboard snack query", () => {
  it(
    "Returns snacks with name and vote count",
    withContext(async context => {
      const graphql = context.apolloClient;

      const snack1 = await context.snackRepository.insert({ name: "Foo" });
      const snack2 = await context.snackRepository.insert({ name: "Bar" });

      await Promise.all([
        context.voteRepository.insert({ snackId: snack1.id }),
        context.voteRepository.insert({ snackId: snack2.id }),
        context.voteRepository.insert({ snackId: snack2.id })
      ]);

      const result = await graphql.query<SnackReportQuery>({
        query: require("../SnackReport.graphql")
      });

      if (!result.data || !result.data.topSnacks) throw "no snacks came back!";

      expect(result.data.topSnacks.length).toEqual(2);

      const snackResult = result.data.topSnacks[0];
      expect(snackResult.id).toEqual(snack2.id);
      expect(snackResult.name).toEqual("Bar");
      expect(snackResult.voteCount).toEqual(2);
    })
  );
});
