import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { select } from 'd3-selection'
import { arc, pie } from 'd3-shape'
import { interpolate } from 'd3-interpolate'
import { getNumOfMembersPerParty } from '../../utils'

const addText = node => {
  return node
    .append('svg:text')
    .attr('id', 'selected_party')
    .style('font-size', '12px')
    .attr('y', '-25')
}

const addTspan = (node, text, header) => {
  const tspan = node
    .append('tspan')
    .attr('x', '-55')
    .attr('dy', '15')
    .text(text)
  if (header) {
    tspan.style('font-weight', 'bold')
  }
}

const propTypes = {
  members: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  party: PropTypes.string
}
const settings = {
  maxRadius: 250
}

export class ParliamentPie extends Component {
  static propTypes = propTypes

  state = {
    radius: 0,
    innerRadius: 0
  }

  updateDimensions = () => {
    const element = document.getElementById('parliament-pie-container')
    this.setState(
      {
        radius: Math.min(element.offsetWidth / 2, settings.maxRadius),
        innerRadius: Math.min(
          element.offsetWidth / 2 / 3,
          settings.maxRadius / 3
        )
      },
      () => this.drawHistChart()
    )
  }

  addLabel = (party, node, pieNode) => {
    select(node)
      .selectAll('.slice')
      .select('#selected_party')
      .remove()

    if (this.props.party === party.party) {
      this.props.onChange(undefined)
      return
    }
    this.props.onChange(party.party)

    if (party) {
      const textNode = addText(pieNode)
      addTspan(textNode, `${party.label}`, true)
      addTspan(textNode, `Antal ledamöter: ${party.count}`)
      addTspan(textNode, `Medelålder: ${party.age.toFixed(2)} år`)
    }
  }

  drawHistChart = () => {
    const membersPerParty = getNumOfMembersPerParty(this.props.members)
    this.createHistChart(membersPerParty)
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  createHistChart = membersPerParty => {
    const node = this.node

    select(node)
      .selectAll('*')
      .remove()

    const vis = select(node)
      .data([membersPerParty])
      .attr('width', this.state.radius * 2)
      .attr('height', this.state.radius * 2)
      .append('svg:g')
      .attr(
        'transform',
        'translate(' + this.state.radius + ',' + this.state.radius + ')'
      )

    const _arc = arc()
      .outerRadius(this.state.radius)
      .innerRadius(this.state.innerRadius)

    const _pie = pie().value((d, i) => membersPerParty[i].count)

    let pieces = vis
      .selectAll('g.slice')
      .data(_pie)
      .enter()
      .append('svg:g')
      .attr('class', 'slice')
      .style('cursor', 'pointer')

    pieces
      .append('svg:path')
      .attr('fill', (d, i) => membersPerParty[i].color)
      .transition()
      .attrTween('d', d => {
        var i = interpolate(d.startAngle + 0.1, d.endAngle)
        return t => {
          d.endAngle = i(t)
          return _arc(d)
        }
      })
      .duration(300)
      .attr('stroke', '#fff')

    pieces
      .on('mouseover', (d, i, nodes) => {
        let node = select(nodes[i])
        node.style('opacity', '0.8')
      })
      .on('mouseout', (d, i, nodes) => {
        let node = select(nodes[i])
        node.style('opacity', '1')
      })
      .on('click', (d, i, nodes) => {
        let pieNode = select(nodes[i])
        this.addLabel(d.data, node, pieNode)
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
