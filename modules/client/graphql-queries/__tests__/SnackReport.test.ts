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
  it(
    "Returns snacks with tags",
    withContext(async context => {
      const graphql = context.apolloClient;

      const snack1 = await context.snackRepository.insert({ name: "Guac" });
      const snack2 = await context.snackRepository.insert({ name: "cheese" });

      const tag1 = await context.tagRepository.insert({ name: "wow so good" });
      const tag2 = await context.tagRepository.insert({ name: "pretty good" });

      await context.taggingRepository.insert({
        tagId: tag1.id,
        snackId: snack2.id
      });
      await context.taggingRepository.insert({
        tagId: tag2.id,
        snackId: snack1.id
      });

      const result = await graphql.query<SnackReportQuery>({
        query: require("../SnackReport.graphql")
      });

      if (!result.data || !result.data.topSnacks) throw "no snacks came back!";

      expect(result.data.topSnacks.length).toEqual(2);

      var snackResult = result.data.topSnacks[0];
      expect(snackResult.id).toEqual(snack1.id);
      expect(snackResult.name).toEqual("Guac");
      expect(snackResult.tags.length).toEqual(1);
      expect(snackResult.tags[0]).toEqual("pretty good");

      snackResult = result.data.topSnacks[1];

      expect(snackResult.id).toEqual(snack2.id);
      expect(snackResult.name).toEqual("cheese");
      expect(snackResult.tags.length).toEqual(1);
      expect(snackResult.tags[0]).toEqual("wow so good");
    })
  );
});
