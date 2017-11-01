import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { scaleLinear } from 'd3-scale'
import { min, max, histogram, ascending } from 'd3-array'
import { select } from 'd3-selection'
import { axisBottom } from 'd3-axis'
import { transition } from 'd3-transition'
import { map } from 'd3-collection'
import { getPartyProp } from '../../utils'

export class HistChart extends Component {
  static propTypes = {
    dimension: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    size: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
  }

  componentDidMount () {
    this.createHistChart()
  }
  componentDidUpdate () {
    this.createHistChart()
  }

  createHistChart = () => {
    const node = this.node
    const t = transition().duration(500)
    const margin = {top: 20, right: 20, bottom: 50, left: 20}
    const width = this.props.size[0] - margin.right - margin.left
    const height = this.props.size[1] - margin.top - margin.bottom

    // Clear svg
    select(node).selectAll('*').remove()

    // Add wrapper g
    let wrapper = select(node)
      .append('g')
      .attr('class', 'wrapper-g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // Prep data
    const dimension = this.props.dimension
    const filterByParty = this.props.filter
    let data = this.props.data.slice(0)
    data.sort((x, y) => ascending(getPartyProp(x.party, 'sortOrder'), getPartyProp(y.party, 'sortOrder')))
    data = filterByParty === 'all' ? data : data.filter(d => d.party === filterByParty)

    // Set scale
    const maxValue = max(data, d => d[dimension]) + 5
    const minValue = min(data, d => d[dimension]) - 5
    const x = scaleLinear()
      .domain([minValue, maxValue])
      .range([0, width])

    // Create bins for histogram
    const nbins = map(data, d => d[dimension]).size()
    const _histogram = histogram()
      .domain(x.domain())
      .thresholds(x.ticks(nbins))
      .value(d => d[dimension])
    const bins = _histogram(data)

    // Bind data to g containers
    let binContainer = wrapper.selectAll('g').data(bins)

    // Remove old containers
    binContainer.exit().remove()

    // Add new containers
    let binContainerEnter = binContainer.enter()
      .append('g')
      .attr('transform', d => `translate(${x(d.x0)}, ${height})`)

    // Populate the bin containers with data
    binContainerEnter.selectAll('hist-mp-circle')
      .data(d => d.map((p, i) => {
        return {
          idx: i,
          name: p.name,
          value: p[dimension],
          party: p.party,
          radius: (x(d.x1) - x(d.x0)) / 2
        }
      }), d => d.member_id)
      .enter()
      .append('circle')
      .attr('class', 'hist-mp-circle')
      .attr('cx', 0) // g element already at correct x pos
      .attr('cy', d => -d.idx * 2 * d.radius - d.radius)
      .style('fill', d => getPartyProp(d.party, 'color'))
      .transition(t)
      .attr('r', d => d.radius)

    // Enter + update
    binContainerEnter.merge(binContainer)
      .attr('transform', d => `translate(${x(d.x0)}, ${height})`)

    // Bind data
    let dots = binContainer
      .selectAll('hist-mp-circle')
      .data(d => d.map((p, i) => {
        return {
          idx: i,
          name: p.name,
          value: p[dimension],
          party: p.party,
          radius: (x(d.x1) - x(d.x0)) / 2
        }
      }), d => d.member_id)

    // Remove elements no longer present in data
    dots.exit()
      .transition(t)
      .attr('r', 0)
      .remove()

    // Update dots
    dots.style('fill', d => getPartyProp(d.party, 'color'))

    // Add new dots found in data
    dots.enter()
      .append('circle')
      .attr('class', 'hist-mp-circle')
      .attr('cx', 0)
      .attr('cy', d => -d.idx * 2 * d.radius - d.radius)
      .style('fill', d => getPartyProp(d.party, 'color'))
      .merge(dots)
      .transition(t)
      .attr('r', d => d.radius)

    // Add x axis
    wrapper
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(axisBottom(x))

    // Add axis label
    let labels = {'age': 'Ålder', 'assignment_count': 'Antal uppdrag'}
    wrapper.append('text')
      .attr('transform', `translate(${width / 2}, ${height + margin.bottom / 3})`)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text(labels[dimension])
  }

  render () {
    return (
      <svg ref={node => { this.node = node }} width={500} height={600} />
    )
  }
}
