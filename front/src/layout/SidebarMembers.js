import React from 'react';
import PropTypes from 'prop-types';

export const SidebarMembers = ({show}) => {
  const members = [ { namn: 'Janne' }, { namn: 'Josef' }, { namn: 'Jesper'}, { namn: 'Sören' }];
  return (
    show ?
    <div className="sidebar-child-list">
      {members.map((member, i) =>
        <div key={i} className="sidebar-child-item">
          {member.namn}
        </div>)
      }
    </div> : null
  )
};

SidebarMembers.propTypes = {
  show: PropTypes.bool.isRequired
}