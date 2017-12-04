import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { select } from 'd3-selection'
import { scaleBand, scaleLinear } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { max } from 'd3-array'

const propTypes = {
  members: PropTypes.array.isRequired
}

export class GenderBarChart extends Component {
  static propTypes = propTypes
  state = {
    data: []
  }

  componentDidMount() {
    const data = this.getGenderPerParty(this.props.members)
    this.setState({ data })
  }

  getGenderPerParty = members => {
    return []
  }

  createBarChart = () => {
    const node = this.node

    // setup chart
    const margin = { top: 20, right: 20, bottom: 95, left: 50 }
    const width = 800
    const height = 500

    const chart = select(node)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const xChart = scaleBand().range([0, width])

    const yChart = scaleLinear().range([height, 0])

    const xAxis = axisBottom(xChart)
    const yAxis = axisLeft(yChart)

    const data = [
      {
        party: 'Socialdemokraterna',
        count: 31,
        sex: 'male'
      },
      {
        party: 'Socialdemokraterna',
        count: 5,
        sex: 'female'
      },
      {
        party: 'Moderaterna',
        count: 9,
        sex: 'male'
      },
      {
        party: 'Moderaterna',
        count: 9,
        sex: 'female'
      },
      {
        party: 'Centerpartiet',
        count: 23,
        sex: 'male'
      },
      {
        party: 'Centerpartiet',
        count: 14,
        sex: 'female'
      },
      {
        party: 'Kristdemokraterna',
        count: 15,
        sex: 'male'
      },
      {
        party: 'Kristdemokraterna',
        count: 11,
        sex: 'female'
      },
      {
        party: 'Sverigedemokraterna',
        count: 25,
        sex: 'male'
      },
      {
        party: 'Sverigedemokraterna',
        count: 7,
        sex: 'female'
      }
    ]

    const barWidth = width / data.length

    xChart.domain(data.map(d => d.party))
    yChart.domain([0, max(data, d => 1.2 * d.count)])

    // axis
    chart
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)

    chart
      .append('g')
      .attr('class', 'xAxis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')

    chart
      .selectAll('bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * barWidth + barWidth * 0.1)
      .attr('width', barWidth * 0.8)
      .attr('y', d => yChart(d.count))
      .attr('height', d => height - yChart(d.count))
      .attr('fill', d => {
        if (d.sex === 'female') {
          return 'rgb(251,180,174)'
        } else {
          return 'rgb(179,205,227)'
        }
      })
  }

  render() {
    // if (this.state.data.length > 0) {

    // }
    this.createBarChart()
    return (
      <svg
        ref={node => {
          this.node = node
        }}
      />
    )
  }
}
