import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from './Navbar.js';

describe('<Navbar />', () => {
  it('should render three <NavLink /> components', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find('NavLink')).toHaveLength(3);
  });
});