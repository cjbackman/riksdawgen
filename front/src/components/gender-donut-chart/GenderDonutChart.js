import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { select } from 'd3-selection'
import { arc } from 'd3-shape'
import { format } from 'd3-format'
import { interpolate } from 'd3-interpolate'
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
    const numOfWomen = membersPerGender.filter(
      m => m.label === this.props.party && m.gender === 'kvinna'
    )[0]
    this.createDonutChart(numOfWomen)
  }

  createDonutChart = numOfWomen => {
    const node = this.node
    const tau = 2 * Math.PI
    const { color, percentage } = numOfWomen
    // const duration = 1500
    // const transition = 200
    // const percent = 45

    select(node)
      .selectAll('*')
      .remove()

    const radius = this.state.radius
    const _format = format('.0%')

    const _arc = arc()
      .innerRadius(radius * 0.8)
      .outerRadius(radius)
      .startAngle(0)

    var svg = select(node)
      .attr('width', radius * 2)
      .attr('height', radius * 2)
      .append('g')
      .attr('transform', 'translate(' + radius + ',' + radius + ')')

    svg
      .append('path')
      .datum({ endAngle: tau })
      .style('fill', color)
      .style('opacity', 0.4)
      .attr('d', _arc)

    var text = svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')

    var foreground = svg
      .append('path')
      .datum({ endAngle: 0 })
      .style('fill', color)
      .attr('d', _arc)

    foreground
      .transition()
      .duration(750)
      .attrTween('d', d => {
        var i = interpolate(0, percentage * tau)
        var i2 = interpolate(0, percentage * 100)
        return t => {
          d.endAngle = i(t)
          text.text(_format(i2(t) / 100))
          return _arc(d)
        }
      })
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
