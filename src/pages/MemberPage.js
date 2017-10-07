import React from 'react';
import PropTypes from 'prop-types';

export const MemberPage = ({ match }) => (
  <div className="content-wrapper">
    <div className="whole">
      Member with ID: { match.params.id }
    </div>
  </div>
)

MemberPage.propTypes = {
  match: PropTypes.object.isRequired
};
