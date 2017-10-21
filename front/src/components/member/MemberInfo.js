import React from 'react';
import PropTypes from 'prop-types';

export const MemberInfo = ({ member }) => (
  <div>
    <h3 style={{ borderBottom: '1px solid' }}>{member.tilltalsnamn + ' ' + member.efternamn}</h3>
    <div className="wrapper">
      <div className="half">
        <img src={member.bild_url_192} />
      </div>
      <div className="half">
        <div>
          <label style={{ marginRight: '10px' }}>
            Födelseår:  {member.fodd_ar}
          </label>
        </div>
        <div>
          <label style={{ marginRight: '10px' }}>
            Parti:  {member.parti}
          </label>
        </div>
        <div>
          <label style={{ marginRight: '10px' }}>
            Valkrets: {member.valkrets}
          </label>
        </div>
      </div>
    </div>
  </div>
)

MemberInfo.propTypes = {
  member: PropTypes.object.isRequired,
}


