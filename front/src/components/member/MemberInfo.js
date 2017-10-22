import React from 'react';
import PropTypes from 'prop-types';

export const MemberInfo = ({ member }) => (
  <div>
    <h3 style={{ borderBottom: '1px solid' }}>{member.name + ' ' + member.lastname}</h3>
    <div className="wrapper">
      <div className="half">
        <img src={member.image} />
      </div>
      <div className="half">
        <div>
          <label style={{ marginRight: '10px' }}>
            Födelseår:  {member.born_year}
          </label>
        </div>
        <div>
          <label style={{ marginRight: '10px' }}>
            Parti:  {member.party}
          </label>
        </div>
        <div>
          <label style={{ marginRight: '10px' }}>
            Valkrets: {member.constituency}
          </label>
        </div>
      </div>
    </div>
  </div>
)

MemberInfo.propTypes = {
  member: PropTypes.object.isRequired,
}


