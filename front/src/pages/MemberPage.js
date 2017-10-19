import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MemberInfo } from '../components/member/MemberInfo';
import { Spinner } from '../components/_shared/Spinner';

export class _MemberPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.isFetching ? <Spinner/> :
      <div className="content-wrapper">
        <div className="whole">
          <MemberInfo member={this.props.member} />
        </div>
      </div>
    )
  }
}

_MemberPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  member: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const memberId = ownProps.match.params.id;
  return {
    isFetching: state.member.isFetching,
    member: state.member.members.filter(m => m.intressent_id === memberId)[0] || {}
  }

}

export const MemberPage =  connect(mapStateToProps)(_MemberPage)