import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { select } from 'd3-selection'
import { scaleBand, scaleLinear } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { max } from 'd3-array'
import { getMembersPerGender } from '../../utils'

const propTypes = {
  members: PropTypes.array.isRequired
}
const settings = {
  maxWidth: 300,
  maxHeight: 250
}

export class GenderBarChart extends Component {
  static propTypes = propTypes
  state = {
    height: 0,
    width: 0
  }

  updateDimensions = () => {
    const element = document.getElementById('parliament-pie-container')
    this.setState(
      {
        width: Math.min(element.offsetWidth * 0.75, settings.maxWidth),
        height: Math.min(element.offsetWidth * 0.75, settings.maxHeight)
      },
      () => this.drawChart()
    )
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  drawChart = () => {
    const membersPerGender = getMembersPerGender(this.props.members)
    const node = this.node
    const margin = { top: 10, right: 20, bottom: 50, left: 20 }
    const width = this.state.width
    const height = this.state.height
    const color = '#1c5bbf'

    select(node)
      .selectAll('*')
      .remove()

    const chart = select(node)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const xChart = scaleBand().range([0, width])
    const yChart = scaleLinear().range([height, 0])
    const barWidth = width / membersPerGender.length

    xChart.domain(membersPerGender.map(d => d.label))
    yChart.domain([0, max(membersPerGender, d => 1.2 * d.count)])

    // axis
    chart
      .append('g')
      .attr('class', 'y axis')
      .call(axisLeft(yChart))

    chart
      .append('g')
      .attr('class', 'xAxis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(axisBottom(xChart))
      .selectAll('text')
      .style('font-size', '12px')

    chart
      .selectAll('bar')
      .data(membersPerGender)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * barWidth + barWidth * 0.2 * ((i + 1) % 2))
      .attr('width', barWidth * 0.8)
      .attr('y', d => yChart(d.count))
      .attr('height', d => height - yChart(d.count))
      .attr('fill', color)
      .style('opacity', d => (d.gender === 'kvinna' ? 1 : 0.4))

    const legendData = [
      {
        gender: 'Kvinna',
        opacity: 1
      },
      {
        gender: 'Man',
        opacity: 0.4
      }
    ]

    var legend = select(node)
      .selectAll('.legend')
      .data(legendData)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => 'translate(0,' + i * 20 + ')')

    legend
      .append('rect')
      .attr('x', width - 18)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', color)
      .style('opacity', d => d.opacity)

    legend
      .append('text')
      .attr('x', width - 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text(d => d.gender)
  }

  render() {
    return (
      <svg
        ref={node => {
          this.node = node
        }}
      />
    )
  }
}
