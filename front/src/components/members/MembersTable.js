import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '../_shared/Spinner';
// import { Link } from 'react-router-dom';

export const MembersTable = ({ isFetching, members }) => (
  isFetching ? <Spinner /> :
    <div style={{ height: 300, overflowY: 'scroll' }}>
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
              <td>{member.tilltalsnamn}
                {/* <Link to={`/members/${v.intressent_id}`}>
              {v.tilltalsnamn}
            </Link> */}
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
  isFetching: PropTypes.bool.isRequired,
  members: PropTypes.array.isRequired,
}