import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const MembersTable = ({ members }) => (
   <div>
      <table className="table">
        <thead>
          <tr>
            <th>Förnamn</th>
            <th>Efternamn</th>
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
                  {member.tilltalsnamn}
                </Link>
              </td>
              <td>{member.efternamn}</td>
              <td>{member.fodd_ar}</td>
              <td>{member.parti}</td>
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