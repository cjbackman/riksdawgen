import React from 'react'
import PropTypes from 'prop-types'
import { MembersTableView } from './MembersTableView'
import { TextInput } from '../_shared/TextInput'
import { Dropdown } from '../_shared/Dropdown'
import { Pagination } from '../_shared/Pagination'
import { parties } from '../../utils'

const partyOptions = [{ value: '', label: 'Alla' }, ...parties]

export class MembersTable extends React.Component {
  static propTypes = {
    members: PropTypes.array.isRequired
  }

  state = {
    pagedMembers: [],
    searchText: '',
    selectedParty: {}
  }

  onNameChanged = text => {
    let searchText = text.toLowerCase()
    this.setState({ searchText })
  }

  onPartyChanged = selectedParty => {
    this.setState({ selectedParty })
  }

  onChangePage = pagedMembers => {
    this.setState({ pagedMembers })
  }

  render() {
    let filteredMembers = this.props.members.filter(
      m =>
        m.name.toLowerCase().includes(this.state.searchText) &&
        (!this.state.selectedParty.value ||
          this.state.selectedParty.value === m.party)
    )

    return (
      <div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label is-size-7">Ledamot</label>
              <TextInput handleChange={this.onNameChanged} placeholder="Sök" />
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label is-size-7">Parti</label>
              <Dropdown
                options={partyOptions}
                valProp="value"
                labelProp="label"
                handleChange={this.onPartyChanged}
              />
            </div>
          </div>
        </div>
        <MembersTableView members={this.state.pagedMembers} />
        <Pagination
          items={filteredMembers}
          onChangePage={this.onChangePage}
          pageSize={12}
        />
      </div>
    )
  }
}
