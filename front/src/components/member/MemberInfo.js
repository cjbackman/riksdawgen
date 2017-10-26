import React from 'react';
import PropTypes from 'prop-types';

export const MemberInfo = ({ member }) => (
  <div>
    <h2 className="subtitle">{member.name}</h2>
    <div className="columns">
      <div className="column">
        <img src={member.image} />
      </div>
      <div className="column">
        <div className="field is-grouped">
          <label className="label control">År</label>
          <p className="control">{member.age}</p>
        </div>
        <div className="field is-grouped">
          <label className="label control">Parti</label>
          <p className="control">{member.party}</p>
        </div>
        <div className="field is-grouped">
          <label className="label control">Valkrets</label>
          <p className="control">{member.constituency}</p>
        </div>
      </div>
    </div>
  </div>
)

MemberInfo.propTypes = {
  member: PropTypes.object.isRequired,
}


