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
      () => this.drawBarChart()
    )
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  drawBarChart = () => {
    const membersPerGender = getMembersPerGender(this.props.members)
    this.createBarChart(membersPerGender)
  }

  createBarChart = membersPerGender => {
    const node = this.node
    const margin = { top: 10, right: 20, bottom: 50, left: 20 }
    const width = this.state.width
    const height = this.state.height

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

    const xAxis = axisBottom(xChart)
    const yAxis = axisLeft(yChart)

    const barWidth = width / membersPerGender.length

    xChart.domain(membersPerGender.map(d => d.label))
    yChart.domain([0, max(membersPerGender, d => 1.2 * d.count)])

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
      .attr('fill', d => d.color)
      .style('opacity', d => (d.gender === 'kvinna' ? 1 : 0.4))

    // const colors = parties.map(p => ({
    //   color: p.color
    // }))
    // const legendData = [
    //   {
    //     gender: 'Kvinna',
    //     colors: colors.map(c => ({ color: c.color, gender: 'Kvinna' }))
    //   },
    //   {
    //     gender: 'Man',
    //     colors: colors.map(c => ({ color: c.color, gender: 'Man' }))
    //   }
    // ]

    // const legend = chart
    //   .append('g')
    //   .selectAll('g')
    //   .data(legendData)
    //   .enter()
    //   .append('g')
    //   .attr('transform', (d, i) => {
    //     var height = 20
    //     var x = width - margin.right * 8
    //     var y = i * height * 1.5
    //     return 'translate(' + x + ',' + y + ')'
    //   })

    // legend
    //   .selectAll('g')
    //   .data(d => d.colors)
    //   .enter()
    //   .append('rect')
    //   .attr('width', (d, i) => 20)
    //   .attr('height', (d, i) => 20)
    //   .attr('transform', (d, i) => {
    //     var x = i * 20
    //     return 'translate(' + x + ',' + 0 + ')'
    //   })
    //   .attr('fill', d => d.color)
    //   .style('opacity', d => (d.gender === 'Kvinna' ? 1 : 0.4))

    // legend
    //   .append('text')
    //   .attr('x', -60)
    //   .attr('y', 16)
    //   .text(d => d.gender)
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
