import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  assignments: PropTypes.array.isRequired
}

export const MemberAssignments = ({ assignments }) => (
  <table className='table is-fullwidth table is-striped is-hoverable'>
    <thead>
      <tr>
        <th className='is-size-7' style={{width: '41%'}}>Funktion</th>
        <th className='is-size-7' style={{width: '20%'}}>Roll</th>
        <th className='is-size-7' style={{width: '15%'}}>Status</th>
        <th className='is-size-7' style={{width: '12%'}}>Startdatum</th>
        <th className='is-size-7' style={{width: '12%'}}>Slutdatum</th>
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

MemberAssignments.propTypes = propTypes
