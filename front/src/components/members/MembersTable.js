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
                <Link to={`/member/${member.member_id}`}>
                  {member.name}
                </Link>
              </td>
              <td>{member.lastname}</td>
              <td>{member.born_year}</td>
              <td>{member.party}</td>
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