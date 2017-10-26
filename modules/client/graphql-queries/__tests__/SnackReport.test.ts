import { withContext } from "__tests__/db-helpers";
import { SnackReportQuery } from "client/graphql-types";

describe("Dashboard snack query", () => {
  it(
    "Returns snacks with name and vote count",
    withContext(async context => {
      const graphql = context.apolloClient;

      const snack = await context.snackRepository.insert({ name: "Foo" });
      await Promise.all([
        context.voteRepository.insert({ snackId: snack.id }),
        context.voteRepository.insert({ snackId: snack.id })
      ]);

      const result = await graphql.query<SnackReportQuery>({
        query: require("../SnackReport.graphql")
      });

      if (!result.data || !result.data.topSnacks) throw "no snacks came back!";

      expect(result.data.topSnacks.length).toEqual(1);

      const snackResult = result.data.topSnacks[0];
      expect(snackResult.id).toEqual(snack.id);
      expect(snackResult.name).toEqual("Foo");
      expect(snackResult.voteCount).toEqual(2);
    })
  );
});
