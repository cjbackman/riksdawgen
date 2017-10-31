import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const propTypes = {
  party: PropTypes.string.isRequired
}

const _PartyPage = ({ party }) => (
  <div className='content-wrapper'>
    <div className='one-third'>
      {party}
    </div>
  </div>
)

_PartyPage.propTypes = propTypes

const mapStateToProps = (state, ownProps) => ({
  party: ownProps.match.params.id
})

export const PartyPage = connect(mapStateToProps)(_PartyPage)
