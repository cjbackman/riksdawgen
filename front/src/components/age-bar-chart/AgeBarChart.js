import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { select } from 'd3-selection'
import { scaleBand, scaleLinear } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { min, max } from 'd3-array'
import { averageAgePerParty } from '../../utils'

const settings = {
  maxWidth: 300,
  maxHeight: 250
}

const propTypes = {
  members: PropTypes.array.isRequired
}
export class AgeBarChart extends Component {
  static propTypes = propTypes

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
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

  drawChart = () => {
    const node = this.node
    const agePerParty = averageAgePerParty(this.props.members)
    console.log(agePerParty)
    const { width, height } = this.state
    const margin = { top: 10, right: 20, bottom: 50, left: 20 }

    select(node)
      .selectAll('*')
      .remove()

    const chart = select(node)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.bottom + margin.top)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const barWidth = width / agePerParty.length

    const xChart = scaleBand()
      .domain(agePerParty.map(d => d.label))
      .range([0, width])

    const yChart = scaleLinear()
      .domain([
        0.9 * min(agePerParty, d => d.averageAge),
        1.1 * max(agePerParty, d => d.averageAge)
      ])
      .range([height, 0])

    chart
      .append('g')
      .attr('class', 'yAxis')
      .call(axisLeft(yChart).ticks(20))

    chart
      .append('g')
      .attr('class', 'xAxis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(axisBottom(xChart))
      .selectAll('text')
      .style('font-size', '12px')

    chart
      .selectAll('bar')
      .data(agePerParty)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => i * barWidth)
      .attr('width', barWidth * 0.8)
      .attr('y', d => yChart(d.averageAge))
      .attr('height', d => height - yChart(d.averageAge))
      .attr('fill', d => d.color)
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
