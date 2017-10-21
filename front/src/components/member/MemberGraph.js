import React from 'react';
import PropTypes from 'prop-types';

export const MemberGraph = ({ member }) => (
  <div>
    <h3 style={{ borderBottom: '1px solid' }}>Graf om {member.tilltalsnamn + 's voteringar'}</h3>
    <div>
    </div>
  </div>
)

MemberGraph.propTypes = {
  member: PropTypes.object.isRequired
}