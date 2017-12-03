import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { select } from 'd3-selection'
import { arc, pie } from 'd3-shape'
import { interpolate } from 'd3-interpolate'
import { parties } from '../../utils'
import { Spinner } from '../_shared/Spinner'

const settings = {
  width: 350,
  height: 225,
  radius: 175,
  innerRadius: 30,
  pi: Math.PI
}

const addText = node => {
  return node
    .append('svg:text')
    .attr('id', 'selected_party')
    .style('font-size', '12px')
}

const addTspan = (node, text) => {
  node
    .append('tspan')
    .attr('x', '-50')
    .attr('dy', '15')
    .text(text)
}

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  members: PropTypes.array.isRequired
}

class _ParliamentPie extends Component {
  state = {
    data: []
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.members.length !== nextProps.members.length) {
      const data = this.getNumOfMembersPerParty(nextProps.members)
      this.setState({ data })
    }
  }

  getNumOfMembersPerParty = members => {
    const groupedByParty = members.reduce((result, member) => {
      result[member.party] = result[member.party] || []
      result[member.party].push(member)
      return result
    }, Object.create(null))

    let data = []
    for (let party of parties) {
      let members = groupedByParty[party.value]
      let average =
        members.reduce((sum, val) => sum + val.age, 0) / members.length
      data.push({
        party: party.value,
        label: party.label,
        color: party.color,
        count: members.length,
        age: average
      })
    }
    console.log(data)
    return data
  }

  createHistChart = () => {
    const node = this.node

    var vis = select(node)
      .data([this.state.data])
      .attr('width', settings.width)
      .attr('height', settings.height)
      .append('svg:g')
      .attr(
        'transform',
        'translate(' + settings.radius + ',' + settings.radius + ')'
      )

    var _arc = arc()
      .outerRadius(settings.radius)
      .innerRadius(settings.innerRadius)

    var _pie = pie()
      .value((d, i) => this.state.data[i].count)
      .startAngle(-90 * (settings.pi / 180))
      .endAngle(90 * (settings.pi / 180))

    var pieces = vis
      .selectAll('g.slice')
      .data(_pie)
      .enter()
      .append('svg:g')
      .attr('class', 'slice')

    pieces
      .append('svg:path')
      .attr('fill', (d, i) => this.state.data[i].color)
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

        node = addText(node)
        addTspan(node, `Parti: ${this.state.data[i].label}`)
        addTspan(node, `Antal ledamöter: ${this.state.data[i].count}`)
        addTspan(node, `Medelålder: ${this.state.data[i].age.toFixed(2)}`)
      })
      .on('mouseout', (d, i, nodes) => {
        let node = select(nodes[i])
        node.style('opacity', '1')
        select('#selected_party').remove()
      })
  }

  render() {
    if (this.state.data.length > 0) {
      this.createHistChart()
    }
    return (
      <div style={{ minHeight: '200px' }}>
        {this.props.isFetching ? <Spinner /> : null}
        <svg
          ref={node => {
            this.node = node
          }}
        />
      </div>
    )
  }
}

_ParliamentPie.propTypes = propTypes

const mapStateToProps = state => ({
  isFetching: state.member.isFetching,
  members: state.member.members
})

export const ParliamentPie = connect(mapStateToProps)(_ParliamentPie)
