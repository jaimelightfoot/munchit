import { mockProvider } from "client/test-helpers/mock-apollo";
import { mount } from "enzyme";
import * as React from "react";
import { SnackReportPage } from "client/pages/snack-report";
import { sleep } from "helpers";

describe("Snack report page", () => {
  it("Begins in a loading state", () => {
    const Provider = mockProvider();

    const page = mount(
      <Provider>
        <SnackReportPage />
      </Provider>
    );

    expect(page.text()).toContain("Loading");
  });
  it("has no snacks", async () => {
    const Provider = mockProvider({
      mocks: {
        Query: () => ({
          topSnacks: () => []
        })
      }
    });

    const page = mount(
      <Provider>
        <SnackReportPage />
      </Provider>
    );

    await sleep(0);

    expect(page.text()).toContain("No snacks to show :(");
  });

  it("has some snacks yay", async () => {
    const Provider = mockProvider({
      mocks: {
        Query: () => ({
          topSnacks: () => [
            { id: 1, name: "Kiwis", voteCount: 1, tags: [] },
            {
              id: 2,
              name: "Those cool koala things",
              voteCount: 2,
              tags: ["nostalgia"]
            }
          ]
        })
      }
    });

    const page = mount(
      <Provider>
        <SnackReportPage />
      </Provider>
    );

    await sleep(0);

    expect(page.text()).toContain("Kiwis");
    expect(page.text()).toContain("koala");
    expect(page.text()).toContain("nostalgia");
  });
  it("checks dem checked tags", async () => {
    const Provider = mockProvider({
      mocks: {
        Query: () => ({
          topSnacks: () => [
            { id: 1, name: "Kiwis", voteCount: 1, tags: [] },
            {
              id: 2,
              name: "Those cool koala things",
              voteCount: 2,
              tags: ["nostalgia"]
            }
          ]
        })
      }
    });

    const page = mount(
      <Provider>
        <SnackReportPage />
      </Provider>
    );

    await sleep(0);

    const selectedTags = page
      .find("input[checked=true]")
      .map(n => n.closest("label").text())
      .sort();
    expect(selectedTags).toContain("Vegan");
  });
});