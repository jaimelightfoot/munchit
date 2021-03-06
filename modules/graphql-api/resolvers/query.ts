import { Context } from "graphql-api";
import { MinimalSnack } from "graphql-api/resolvers/snack";
import sortBy from "lodash-es/sortBy";
import { TopSnacksQueryArgs } from "graphql-api/schema-types";

export const QueryResolvers = {
  async allSnacks(
    query: {},
    args: {},
    context: Context
  ): Promise<MinimalSnack[]> {
    const snacks = await context.snackRepository.all();
    return sortBy(snacks, "name");
  },
  async topSnacks(
    query: {},
    args: TopSnacksQueryArgs,
    context: Context
  ): Promise<MinimalSnack[]> {
    const snacks = await context.snackRepository.findWithTagsNamed(
      args.tags || []
    );

    const votes = await context.voteRepository.countForSnack.loadMany(
      snacks.map(s => s.id)
    );

    var snacksWithVotes = snacks.map((snack, i) => ({
      snack,
      count: votes[i]
    }));

    return sortBy(snacksWithVotes, s => -s.count).map(s => s.snack);
  }
};
