import React from 'react'
import PropTypes from 'prop-types'
import { MembersTable } from './MembersTable'
import { TextInput } from '../_shared/TextInput'
import { Dropdown } from '../_shared/Dropdown'
import { Pagination } from '../_shared/Pagination'
import { Parties } from '../../data'

const partyOptions = [{ value: '', label: 'Alla' }, ...Parties]

export class MembersTableContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pagedMembers: [],
      searchText: '',
      selectedParty: {}
    }
    this.onNameChanged = this.onNameChanged.bind(this)
    this.onPartyChanged = this.onPartyChanged.bind(this)
    this.onChangePage = this.onChangePage.bind(this)
  }

  onNameChanged (text) {
    let searchText = text.toLowerCase()
    this.setState({ searchText })
  }

  onPartyChanged (selectedParty) {
    this.setState({ selectedParty })
  }

  onChangePage (pagedMembers) {
    this.setState({ pagedMembers })
  }

  render () {
    let filteredMembers = this.props.members.filter(m => m.name.toLowerCase().includes(this.state.searchText) &&
      (!this.state.selectedParty.value || this.state.selectedParty.value === m.party.toLowerCase()))

    return (
      <div>
        <div className='columns'>
          <div className='column'>
            <div className='field'>
              <label className='label'>Name</label>
              <div className='control'>
                <TextInput handleChange={this.onNameChanged} placeholder='Sök' />
              </div>
            </div>
          </div>
          <div className='column'>
            <div className='field'>
              <label className='label'>Subject</label>
              <div className='control'>
                <div className='select'>
                  <Dropdown options={partyOptions} valProp='value' labelProp='label' handleChange={this.onPartyChanged} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <MembersTable members={this.state.pagedMembers} />
        <Pagination items={filteredMembers} onChangePage={this.onChangePage} pageSize={10} />
      </div>
    )
  }
}

MembersTableContainer.propTypes = {
  members: PropTypes.array.isRequired
}
