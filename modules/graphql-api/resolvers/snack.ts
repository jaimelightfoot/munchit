import { Snack } from "graphql-api/schema-types";
import { Context } from "graphql-api";

/** The graphql schema-compatible typescript type required to implement any snack resolver */
export interface MinimalSnack {
  id: Snack["id"];
}

export const SnackResolvers = {
  async name(snack: MinimalSnack, args: {}, context: Context) {
    if ((snack as any).name) return (snack as any).name;

    const record = await context.snackRepository.findById.load(snack.id);
    return record && record.name;
  },

  async voteCount(
    snack: MinimalSnack,
    args: {},
    context: Context
  ): Promise<Snack["voteCount"]> {
    return await context.voteRepository.countForSnack.load(snack.id);
  },

  async tags(
    snack: MinimalSnack,
    args: {},
    context: Context
  ): Promise<Snack["tags"]> {
    const taggings = await context.taggingRepository.forSnack.load(snack.id);
    const tags = await context.tagRepository.forTagging.loadMany(taggings);

    return tags.map(t => t.name);
  }
};
