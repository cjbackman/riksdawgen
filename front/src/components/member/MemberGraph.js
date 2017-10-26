import React from 'react';
import PropTypes from 'prop-types';

export const MemberGraph = ({ member }) => (
  <div>
    <h2 className="subtitle">Graf om {member.name + 's voteringar'}</h2>
  </div>
)

MemberGraph.propTypes = {
  member: PropTypes.object.isRequired
}