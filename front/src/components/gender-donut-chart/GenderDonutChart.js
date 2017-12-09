import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { select } from 'd3-selection'
import { arc, pie } from 'd3-shape'
import { getMembersPerGender } from '../../utils'

const propTypes = {
  members: PropTypes.array.isRequired,
  party: PropTypes.string.isRequired
}
const settings = {
  maxRadius: 125
}

export class GenderDonutChart extends Component {
  static propTypes = propTypes
  state = {
    radius: 0
  }

  updateDimensions = () => {
    const element = document.getElementById('parliament-pie-container')
    this.setState(
      {
        radius: Math.min(element.offsetWidth / 4, settings.maxRadius)
      },
      () => this.drawDonutChart()
    )
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  componentDidUpdate() {
    this.drawDonutChart()
  }

  drawDonutChart = () => {
    const membersPerGender = getMembersPerGender(this.props.members)
    const genders = membersPerGender.filter(m => m.label === this.props.party)
    this.createDonutChart(genders)
  }

  createDonutChart = genders => {
    const node = this.node
    var width = this.state.radius * 2
    var height = this.state.radius * 2
    var radius = this.state.radius
    var donutWidth = this.state.radius * 0.8

    select(node)
      .selectAll('*')
      .remove()

    const vis = select(node)
      .data([genders])
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    const _arc = arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius)

    var _pie = pie().value(d => d.count)

    const pieces = vis
      .selectAll('path')
      .data(_pie)
      .enter()

    pieces
      .append('path')
      .attr('fill', d => d.data.color)
      .attr('d', _arc)
      .attr('stroke', '#fff')
      .style('opacity', d => (d.data.gender === 'kvinna' ? 1 : 0.4))
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
