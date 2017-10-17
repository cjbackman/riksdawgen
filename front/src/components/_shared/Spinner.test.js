import React from 'react';
import { shallow } from 'enzyme';
import { Spinner } from './Spinner.js';

describe('<Spinner />', () => {

  it('should render', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find('div')).toHaveLength(6);
    expect(wrapper.find('div').first().children()).toHaveLength(5);
    expect(wrapper.find('div').first().hasClass('spinner')).toBeTruthy();
    expect(wrapper.find('div.rect1')).toHaveLength(1);
    expect(wrapper.find('div.rect2')).toHaveLength(1);
    expect(wrapper.find('div.rect3')).toHaveLength(1);
    expect(wrapper.find('div.rect4')).toHaveLength(1);
    expect(wrapper.find('div.rect5')).toHaveLength(1);
  });

});