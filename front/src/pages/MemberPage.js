import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MemberInfo } from '../components/member/MemberInfo';
import { Spinner } from '../components/_shared/Spinner';
import { fetchMember } from '../actions/memberActions';

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
      <div className="content-wrapper">
        <div className="whole">
          <MemberInfo member={this.props.member} />
        </div>
      </div>
    )
  }
}

_MemberPage.propTypes = {
  memberId: PropTypes.string.isRequired,
  fetchMember: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  member: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  memberId: ownProps.match.params.id,
  isFetching: state.member.isFetching,
  member: state.member.member,
})

export const MemberPage =  connect(mapStateToProps, { fetchMember })(_MemberPage)