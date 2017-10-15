import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchMembers } from '../actions/memberActions'
import { MembersTable } from '../components/members/MembersTable';
import { MembersBargraph } from '../components/members/MembersBargraph';

class _MembersPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
		this.props.fetchMembers();
  }

  render() {
    return (
      <div className="content-wrapper">
        <div className="half">
          <MembersTable members={this.props.members} isFetching={this.props.isFetching} />
        </div>
        <div className="half">
          <MembersBargraph members={this.props.members} isFetching={this.props.isFetching} />
        </div>
        <div className="whole">
          GRAPH #2
      </div>
      </div>
    );
  }
}

_MembersPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  members: PropTypes.array.isRequired,
  fetchMembers: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isFetching: state.member.isFetching,
  members: state.member.members
})

export const MembersPage =  connect(mapStateToProps, { fetchMembers })(_MembersPage)