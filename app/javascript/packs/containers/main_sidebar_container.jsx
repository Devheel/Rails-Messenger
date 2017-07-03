import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainSidebar from '../components/main_sidebar';
import { withRouter } from 'react-router-dom';
import {
  fetchMessageThreads,
  setActiveThread,
  fetchMessagesFor,
} from '../actions/message_threads';
import * as Selectors from '../reducers';

class MainSidebarContainer extends Component {
  componentWillMount() {
    this.props.fetchMessageThreads()
      .then(() => {
        const { activeThreadId, mostRecentThreadId } = this.props;
        if (activeThreadId !== null) {
          this.props.setActiveThread(activeThreadId);
          this.props.fetchMessagesFor(activeThreadId);
          return;
        }

        if (mostRecentThreadId !== false) {
          this.props.setActiveThread(mostRecentThreadId);
          this.props.fetchMessagesFor(mostRecentThreadId);
        }
      });
  }

  render() {
    return (
      <MainSidebar
        messageThreads={this.props.messageThreads}
        activeThreadId={this.props.activeThreadId}
      />
    );
  }
};

const mapStateToProps = (state) => ({
  messageThreads: Selectors.getAllMessageThreads(state),
  activeThreadId: Selectors.getActiveMessageThreadId(state),
  mostRecentThreadId: Selectors.getMostRecentMessageThreadId(state),
});

export default connect(
  mapStateToProps,
  {
    fetchMessageThreads,
    setActiveThread,
    fetchMessagesFor,
  }
)(MainSidebarContainer);
