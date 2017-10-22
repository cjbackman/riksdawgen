import React from 'react';
import PropTypes from 'prop-types';
import  { MembersTable } from './MembersTable';
import { TextInput } from '../_shared/TextInput';
import { Dropdown } from '../_shared/Dropdown';
import { Pagination } from '../_shared/Pagination';

const partyOptions =  [{ value: '', label: 'Alla'}, { value: 's', label: 'Sossarna'}, { value: 'm', label: 'Brackorna'}];

export class MembersTableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredMembers: [],
      pagedMembers: [],
      searchText: '',
      selectedParty: {}
    }
    this.onNameChanged = this.onNameChanged.bind(this);
    this.onPartyChanged = this.onPartyChanged.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { members } = nextProps;
    this.setState({ filteredMembers: members });
  }

  filterMembers() {
    let filteredMembers = this.props.members
      .filter(m => (m.name.toLowerCase().includes(this.state.searchText) || m.lastname.toLowerCase().includes(this.state.searchText)) &&
      (!this.state.selectedParty.value || this.state.selectedParty.value === m.party.toLowerCase()));
    this.setState({ filteredMembers });
  }

  onNameChanged(text) {
    let searchText = text.toLowerCase();
    this.setState({ searchText }, () => this.filterMembers());
  }

  onPartyChanged(selectedParty) {
    this.setState({ selectedParty }, () => this.filterMembers());
  }

  onChangePage(pagedMembers) {
    this.setState({ pagedMembers });
  }

  render() {
    return (
      <div>
        <h3 style={{borderBottom: '1px solid'}}>Ledamöter</h3>
        <label style={{ marginRight: '10px' }}>
          Namn:  <TextInput handleChange={this.onNameChanged} placeholder="Sök" />
        </label>
        <label>
          Parti: <Dropdown options={partyOptions} valProp='value' labelProp='label' handleChange={this.onPartyChanged}/>
        </label>
        <div style={{ marginTop: '1rem' }}>
          <MembersTable members={this.state.pagedMembers} />
          <Pagination items={this.state.filteredMembers} onChangePage={this.onChangePage} pageSize={15} />
        </div>
      </div>
    );
  }
}

MembersTableContainer.propTypes = {
  members: PropTypes.array.isRequired,
}