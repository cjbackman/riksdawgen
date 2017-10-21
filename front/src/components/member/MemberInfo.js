import React from 'react';
import PropTypes from 'prop-types';

export const MemberInfo = ({ member }) => (
  <div>
    Du har valt: { member.tilltalsnamn + ' ' + member.efternamn }
  </div>
)

MemberInfo.propTypes = {
  member: PropTypes.object.isRequired,
}


