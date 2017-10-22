import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const MembersTable = ({ members }) => (
   <div>
      <table className="table">
        <thead>
          <tr>
            <th>Namn</th>
            <th>Ålder</th>
            <th>Parti</th>
            <th>Valkrets</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) =>
            <tr key={index}>
              <td>
                <Link to={`/members/${member.member_id}`}>
                  {member.name + ' ' + member.lastname}
                </Link>
              </td>
              <td>{member.age}</td>
              <td>
                <Link to={`/party/${member.party.toLowerCase()}`}>
                  {member.party}
                </Link>
              </td>
              <td>{member.constituency}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
)

MembersTable.propTypes = {
  members: PropTypes.array.isRequired,
}
