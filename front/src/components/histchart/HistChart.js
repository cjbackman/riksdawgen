import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { scaleLinear } from 'd3-scale'
import { max, histogram } from 'd3-array'
import { select } from 'd3-selection'
import { axisBottom } from 'd3-axis'
import { transition } from 'd3-transition'

export class HistChart extends Component {
  constructor (props) {
    super(props)
    this.createHistChart = this.createHistChart.bind(this)
  }
  componentDidMount () {
    this.createHistChart()
  }
  componentDidUpdate () {
    this.createHistChart()
  }
  createHistChart () {
    const t = transition().duration(500)
    const dimension = this.props.dimension
    const node = this.node

    const maxValue = max(this.props.data, d => d[dimension])
    const x = scaleLinear()
      .domain([0, maxValue])
      .range([0, this.props.size[0]])

    const nbins = 30
    const _histogram = histogram()
      .domain(x.domain())
      .thresholds(x.ticks(nbins))
      .value(d => d[dimension])

    const bins = _histogram(this.props.data)

    // Add a g container for each bin
    let binContainer = select(node)
      .selectAll('g')
      .data(bins)
    // Remove old containers
    binContainer.exit().remove()

    // Add new containers
    let binContainerEnter = binContainer.enter()
      .append('g')
      .attr('transform', d => `translate(${x(d.x0)}, ${this.props.size[1]})`)

    // Populate the bin containers with data
    binContainerEnter.selectAll('circle')
      .data(d => d.map((p, i) => {
        return {
          idx: i,
          name: p.name,
          value: p[dimension],
          radius: (x(d.x1) - x(d.x0)) / 2
        }
      }))
      .enter()
      .append('circle')
      .attr('class', 'mp-circle')
      .attr('cx', 0) // g element already at correct x pos
      .attr('cy', d => -d.idx * 2 * d.radius - d.radius)
      .transition(t)
      .attr('r', d => d.radius)

    binContainerEnter.merge(binContainer)
      .attr('transform', d => `translate(${x(d.x0)}, ${this.props.size[1]})`)

    // Enter/update/exit for circles, inside each container
    let dots = binContainer
      .selectAll('circle')
      .data(d => d.map((p, i) => {
        return {
          idx: i,
          name: p.name,
          value: p[dimension],
          radius: (x(d.x1) - x(d.x0)) / 2
        }
      }))

    // Remove elements no longer present in data
    dots.exit()
      .attr('class', 'exit')
      .transition(t)
      .attr('r', 0)
      .remove()

    // Add new dots found in data
    dots.enter()
      .append('circle')
      .attr('class', 'mp-circle')
      .attr('cx', 0)
      .attr('cy', d => -d.idx * 2 * d.radius - d.radius)
      .merge(dots)
      .transition(t)
      .attr('r', d => d.radius)

    // Add x axis
    select(node)
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${this.props.size[1]})`)
      .call(axisBottom(x))
  }

  render () {
    return (
      <svg ref={node => { this.node = node }} width={350} height={350} />
    )
  }
}

HistChart.propTypes = {
  dimension: PropTypes.string.isRequired,
  size: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
}
