import React from 'react';
import { shallow } from 'enzyme';
import { NavbarIcon } from './NavbarIcon.js';
import { NavbarLogo } from './NavbarLogo.js';

describe('<NavbarIcon />', () => {

  it('should render FaCoq', () => {
    const wrapper = shallow(<NavbarIcon show={true} toggle={() => {}} />);
    expect(wrapper.find('FaCog')).toHaveLength(1);
  });

  it('should _not_ render FaCoq', () => {
    const wrapper = shallow(<NavbarIcon show={false} toggle={() => {}} />);
    expect(wrapper.find('FaCog')).toHaveLength(0);
  });

});

describe('<NavbarLogo />', () => {

    it('should render img', () => {
      const wrapper = shallow(<NavbarLogo />);
      expect(wrapper.find('img')).toHaveLength(1);
    });

  });