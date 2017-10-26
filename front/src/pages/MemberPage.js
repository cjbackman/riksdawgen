import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MemberInfo } from '../components/member/MemberInfo';
import { Spinner } from '../components/_shared/Spinner';
import { fetchMember } from '../actions/memberActions';
import { MemberGraph } from '../components/member/MemberGraph';

export class _MemberPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const { memberId } = this.props;
    this.props.fetchMember(memberId);
  }

  render() {
    return (
      this.props.isFetching || !this.props.member ? <Spinner/> :
      <div className="columns">
        <div className="column is-one-third">
          <MemberInfo member={this.props.member} />
        </div>
        <div className="column is-two-thirds">
          <MemberGraph member={this.props.member} />
        </div>
      </div>
    )
  }
}

_MemberPage.propTypes = {
  memberId: PropTypes.string.isRequired,
  fetchMember: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  member: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  memberId: ownProps.match.params.id,
  isFetching: state.member.isFetching,
  member: state.member.member,
})

export const MemberPage =  connect(mapStateToProps, { fetchMember })(_MemberPage)