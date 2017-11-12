import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  votes: PropTypes.array.isRequired
}

export const MemberVotesTableView = ({votes}) => (
  <table className='table is-fullwidth table is-striped is-hoverable is-size-7'>
    <thead>
      <tr>
        <th className='is-size-7' style={{width: '40%'}}>Votering</th>
        <th className='is-size-7' style={{width: '30%'}}>Röstade</th>
        <th className='is-size-7' style={{width: '30%'}}>Datum</th>
      </tr>
    </thead>
    <tbody>
      {votes.map((vote, index) =>
        <tr key={index}>
          <td>{vote.document_id}</td>
          <td>{vote.vote}</td>
          <td>{vote.date}</td>
        </tr>
      )}
    </tbody>
  </table>
)

MemberVotesTableView.propTypes = propTypes
