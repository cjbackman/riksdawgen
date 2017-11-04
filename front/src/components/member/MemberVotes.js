import React from 'react'
import { Dropdown } from '../_shared/Dropdown'

const years = [{ value: '2018', label: '2017/2018' }, { value: '2017', label: '2016/2017' }]

export class MemberVotes extends React.Component {
  state = { selectedYear: {} }

  onYearChanged = (selectedYear) => { this.setState({ selectedYear }) }

  render () {
    return (
      <div>
        <h2 className='subtitle'>Voteringar</h2>
        <div className='field'>
          <label className='label is-size-7'>År</label>
          <div className='control'>
            <div className='select'>
              <Dropdown options={years} valProp='value' labelProp='label' handleChange={this.onYearChanged} />
            </div>
          </div>
        </div>

        <div className='columns'>
          <div className='column is-half'>
            <h3 style={{height: 300}}>Tabell</h3>
            <h3>Graf - Fördelning i antal voteringar under året</h3>
          </div>
          <div className='column is-half'>
            <h3 style={{height: 300}}>Graf - Fördelning Ja/Nej/Avstår/Frånvarande</h3>
            <h3>Graf - Frånvaro under året?</h3>
          </div>
        </div>
      </div>
    )
  }
}
