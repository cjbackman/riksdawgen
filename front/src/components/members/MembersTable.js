import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const propTypes = {
  members: PropTypes.array.isRequired
}

export const MembersTable = ({ members }) => (
  <table className='table is-fullwidth table is-striped is-hoverable'>
    <thead>
      <tr>
        <th>Namn</th>
        <th className='is-hidden-mobile'>Ålder</th>
        <th>Parti</th>
        <th className='is-hidden-mobile'>Valkrets</th>
      </tr>
    </thead>
    <tbody>
      {members.map((member, index) =>
        <tr key={index}>
          <td>
            <Link to={`/members/${member.member_id}`}>
              {member.name}
            </Link>
          </td>
          <td className='is-hidden-mobile'>{member.age}</td>
          <td>
            <Link to={`/party/${member.party}`}>
              {member.party}
            </Link>
          </td>
          <td className='is-hidden-mobile'>{member.constituency}</td>
        </tr>
      )}
    </tbody>
  </table>
)

MembersTable.propTypes = propTypes
