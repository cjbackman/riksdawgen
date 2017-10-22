import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const MembersTable = ({ members }) => (
   <div>
      <table className="table">
        <thead>
          <tr>
            <th>Namn</th>
            <th>Födelseår</th>
            <th>Parti</th>
            <th>Valkrets</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) =>
            <tr key={index}>
              <td>
                <Link to={`/members/${member.intressent_id}`}>
                  {member.tilltalsnamn + ' ' + member.efternamn}
                </Link>
              </td>
              <td>{member.fodd_ar}</td>
              <td>
                <Link to={`/party/${member.parti.toLowerCase()}`}>
                  {member.parti}
                </Link>
              </td>
              <td>{member.valkrets}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
)

MembersTable.propTypes = {
  members: PropTypes.array.isRequired,
}