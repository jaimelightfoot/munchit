import {
  SnackReportUI,
  SnackReportUIProps,
  SnackReportRow
} from "client/pages/snack-report/snack-report-ui";
import {
  SnackReportQuery,
  SnackReportQueryVariables
} from "client/graphql-types";
import { graphql } from "react-apollo";
import { AssertAssignable } from "helpers";
import * as State from "client/state/index";
import { Dispatch, connect } from "react-redux";
import * as Actions from "client/actions";

type StateProps = Pick<SnackReportUIProps, "selectedTags">;
type DispatchProps = Pick<SnackReportUIProps, "onTagChange">;
type ReduxConnectedProps = StateProps & DispatchProps;
type GraphQLProps = Pick<SnackReportUIProps, "rows">;

type _check = AssertAssignable<
  SnackReportUIProps,
  ReduxConnectedProps & GraphQLProps
>;

//  It should type check and utilize state.selectedTags.

function mapStateToProps(state: State.Type): StateProps {
  return {
    selectedTags: state.selectedTags
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
  return {
    onTagChange: (tag, value) => {
      dispatch(Actions.changeTag(tag, value));
    }
  };
}

export function dataToRows(data: SnackReportQuery): SnackReportRow[] {
  if (!data.topSnacks) {
    return [];
  }

  return data.topSnacks.map((row, index) => ({
    place: index + 1,
    snack: row.name,
    votes: row.voteCount,
    tags: row.tags
  }));
}

const wireToApollo = graphql<
  SnackReportQuery,
  ReduxConnectedProps,
  SnackReportUIProps
>(require("client/graphql-queries/SnackReport.graphql"), {
  options(props) {
    const variables: SnackReportQueryVariables = {
      tags: props.selectedTags
    };
    return { variables };
  },
  props(result): GraphQLProps {
    if (!result.data || result.data.loading) {
      return {
        rows: null
      };
    } else {
      return {
        rows: dataToRows(result.data)
      };
    }
  }
});
const wireToRedux = connect(mapStateToProps, mapDispatchToProps);

export const SnackReportPage = wireToRedux(wireToApollo(SnackReportUI));
