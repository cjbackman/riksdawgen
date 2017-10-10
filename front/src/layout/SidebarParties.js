import React from 'react';
import PropTypes from 'prop-types';

export const SidebarParties = ({show}) => {
  const parties = [
    { namn: 'VPK' },
    { namn: 'Såssarna' },
    { namn: 'Brackorna' },
    { namn: 'Miljöpartiet' },
    { namn: 'CenterN^' },
    { namn: 'Razzarna' },
    { namn: 'Björklunds boys' },
    { namne: 'Jehovas' }
  ];
  return (
    show ?
    <div className="sidebar-child-list">
      {parties.map((party, i) =>
        <div key={i} className="sidebar-child-item">
          {party.namn}
        </div>)
      }
    </div> : null
  )
};

SidebarParties.propTypes = {
  show: PropTypes.bool.isRequired
}