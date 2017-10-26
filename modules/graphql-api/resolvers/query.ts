import { Context } from "graphql-api";
import { MinimalSnack } from "graphql-api/resolvers/snack";
import sortBy from "lodash-es/sortBy";

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
    args: {},
    context: Context
  ): Promise<MinimalSnack[]> {
    const snacks = await context.snackRepository.all();

    const votes = await context.voteRepository.countForSnack.loadMany(
      snacks.map(s => s.id)
    );

    var snacksWithVotes = snacks.map((snack, i) => ({
      snack,
      count: votes[i]
    }));

    var thing = sortBy(snacksWithVotes, s => -s.count).map(s => s.snack);

    return thing;
  }
};
