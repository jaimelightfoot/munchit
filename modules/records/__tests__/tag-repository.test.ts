import { SnackRepository } from "records/snack-record";
import { getConnection, destroyConnection } from "db";
import { TaggingRepository } from "records/tagging-record";
import { truncateAll } from "__tests__/db-helpers";
import { TagRepository } from "records/tag-record";

describe("TagRepository", () => {
  const knex = getConnection();
  let snackRepo = new SnackRepository(knex);
  let tagRepo = new TagRepository(knex);
  let taggingRepo = new TaggingRepository(knex);

  beforeAll(async () => truncateAll(knex));
  afterAll(destroyConnection);

  it("Can find a tag for a tagging", async () => {
    const snack = await snackRepo.insert({ name: "Boop" });
    expect(snack.id).not.toBeFalsy();
    const tag = await tagRepo.insert({ name: "yep" });
    expect(tag.id).not.toBeFalsy();
    const tagging = await taggingRepo.insert({
      tagId: tag.id,
      snackId: snack.id
    });
    expect(tagging.id).not.toBeFalsy();
    expect(tagging.snackId).toBe(snack.id);
    expect(tagging.tagId).toBe(tag.id);

    const tagFound = await tagRepo.forTagging.load(tagging);
    expect(tagFound.name).toEqual("yep");
  });
});
