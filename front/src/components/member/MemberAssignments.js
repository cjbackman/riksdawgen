import React from 'react'
import PropTypes from 'prop-types'

export const MemberAssignments = ({ assignments }) => (
  <table className='table is-fullwidth table is-striped is-hoverable'>
    <thead>
      <tr>
        <th>Funktion</th>
        <th>Roll</th>
        <th>Status</th>
        <th>Startdatum</th>
        <th>Slutdatum</th>
      </tr>
    </thead>
    <tbody>
      {assignments.map((assignment, index) =>
        <tr key={index}>
          <td>{assignment.function}</td>
          <td>{assignment.role_code}</td>
          <td>{assignment.status}</td>
          <td>{assignment.start_date}</td>
          <td>{assignment.end_date}</td>
        </tr>
      )}
    </tbody>
  </table>
)

MemberAssignments.propTypes = {
  assignments: PropTypes.array.isRequired
}
