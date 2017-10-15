import React from 'react';
import { shallow } from 'enzyme';
import { MembersTable } from './MembersTable.js';

describe('<MembersTable />', () => {

  it('should render loader', () => {
    const wrapper = shallow(<MembersTable isFetching={true} members={[]} />);
    expect(wrapper.find('Spinner')).toHaveLength(1);
  });

  it('should render table', () => {
    const wrapper = shallow(<MembersTable isFetching={false} members={[]} />);
    expect(wrapper.find('table')).toHaveLength(1);
  });

  it('should render header row + three rows', () => {
    const wrapper = shallow(<MembersTable isFetching={false} members={[{tilltalsnamn: '1'},{tilltalsnamn: '2'},{tilltalsnamn: '3'}]} />);
    expect(wrapper.find('tr')).toHaveLength(4);
  });

});