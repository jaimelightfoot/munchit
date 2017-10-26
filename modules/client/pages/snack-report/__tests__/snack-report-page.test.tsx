import { mockProvider } from "client/test-helpers/mock-apollo";
import { mount } from "enzyme";
import * as React from "react";
import * as State from "client/state";
import { SnackReportPage } from "client/pages/snack-report";

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
});
