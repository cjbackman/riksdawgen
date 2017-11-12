import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  assignments: PropTypes.array.isRequired
}

export const MemberAssignmentsView = ({ assignments }) => (
  <table className='table is-fullwidth table is-striped is-hoverable is-size-7'>
    <thead>
      <tr>
        <th className='is-size-7' style={{width: '35%'}}>Funktion</th>
        <th className='is-size-7' style={{width: '20%'}}>Roll</th>
        <th className='is-size-7' style={{width: '15%'}}>Status</th>
        <th className='is-size-7' style={{width: '15%'}}>Startdatum</th>
        <th className='is-size-7' style={{width: '15%'}}>Slutdatum</th>
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

MemberAssignmentsView.propTypes = propTypes
