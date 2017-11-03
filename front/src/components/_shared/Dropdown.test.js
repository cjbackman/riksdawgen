import React from 'react'
import { shallow } from 'enzyme'
import { Dropdown } from './Dropdown.js'

describe('<Dropdown />', () => {
  let props

  beforeEach(() => {
    props = {
      options: [],
      valProp: '',
      labelProp: '',
      handleChange: () => {}
    }
  })

  it('should not render', () => {
    const wrapper = shallow(<Dropdown {...props} />)
    expect(wrapper.find('select')).toHaveLength(0)
  })

  it('should render two options', () => {
    let _props = Object.assign({}, props,
      {
        options: [{val: 1}, {val: 2}],
        valProp: 'val'
      })

    const wrapper = shallow(<Dropdown {..._props} />)
    expect(wrapper.find('select')).toHaveLength(1)
    expect(wrapper.find('option')).toHaveLength(2)
  })
})
