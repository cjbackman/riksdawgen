import React from 'react';
import PropTypes from 'prop-types';

export const MemberPage = ({ match }) => (
  <div>
    { match.params.id }
  </div>
)

MemberPage.propTypes = {
  match: PropTypes.object.isRequired
};
