import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '../_shared/Spinner';
// import { Link } from 'react-router-dom';

export const MembersTable = ({ isFetching, members }) => (
  isFetching ?  <Spinner /> :
  <table className="table">
    <thead>
      <tr>
        <th>Namn</th>
        <th>Parti</th>
      </tr>
    </thead>
    <tbody>
      {members.map(member =>
        <tr key={member.tilltalsnamn}>
          <td>
            {member.tilltalsnamn}
            {/* <Link to={`/members/${v.intressent_id}`}>
              {v.tilltalsnamn}
            </Link> */}
          </td>
          <td>
            {member.parti}
          </td>
        </tr>
      )}
    </tbody>
  </table>
)

MembersTable.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  members: PropTypes.array.isRequired,
}