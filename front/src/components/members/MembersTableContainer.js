import React from 'react';
import PropTypes from 'prop-types';
import  { MembersTable } from './MembersTable';
import { TextInput } from '../_shared/TextInput';
import { Dropdown } from '../_shared/Dropdown';

const partyOptions =  [{ value: '', label: 'Alla'}, { value: 's', label: 'Sossarna'}, { value: 'm', label: 'Brackorna'}];

export class MembersTableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      selectedParty: {}
    }
    this.nameTextChanged = this.nameTextChanged.bind(this);
    this.partyChanged = this.partyChanged.bind(this);
  }

  nameTextChanged(text) {
    let searchText = text.toLowerCase();
    this.setState({searchText});
  }

  partyChanged(selectedParty) {
    this.setState({selectedParty});
  }

  getFilteredMembers() {
    let members = this.props.members
    .filter(m => (m.tilltalsnamn.toLowerCase().includes(this.state.searchText) || m.efternamn.toLowerCase().includes(this.state.searchText)) &&
    (!this.state.selectedParty.value || this.state.selectedParty.value === m.parti.toLowerCase()));

    return members;
  }

  render() {
    let members = this.getFilteredMembers();
    return (
      <div>
        <TextInput handleChange={this.nameTextChanged} placeholder="Sök" />
        <Dropdown options={partyOptions} valProp='value' labelProp='label' handleChange={this.partyChanged}/>
        <MembersTable members={members} isFetching={this.props.isFetching} />
      </div>
    );
  }
}

MembersTableContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  members: PropTypes.array.isRequired,
}