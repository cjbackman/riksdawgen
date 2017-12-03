import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { select } from 'd3-selection'
import { arc, pie } from 'd3-shape'
import { interpolate } from 'd3-interpolate'
import { parties } from '../../utils'
import { Spinner } from '../_shared/Spinner'

const addText = node => {
  return node
    .append('svg:text')
    .attr('id', 'selected_party')
    .style('font-size', '12px')
}

const addTspan = (node, text, header) => {
  const tspan = node
    .append('tspan')
    .attr('x', '-50')
    .attr('dy', '15')
    .text(text)
  if (header) {
    tspan.style('font-weight', 'bold')
  }
}

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  members: PropTypes.array.isRequired
}

class _ParliamentPie extends Component {
  state = {
    data: [],
    width: 350,
    height: 225,
    radius: 175,
    innerRadius: 30,
    pi: Math.PI
  }

  componentDidMount() {
    const element = document.getElementById('parliament-pie-container')
    this.setState({
      width: Math.min(element.offsetWidth, 350),
      height: Math.min(element.offsetHeight, 225),
      radius: Math.min(element.offsetWidth / 2, 175),
      innerRadius: Math.min(element.offsetWidth / 2 / 6, 30)
    })
    if (this.props.members.length > 0) {
      const data = this.getNumOfMembersPerParty(this.props.members)
      this.setState({ data })
    }
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
    return data
  }

  createHistChart = () => {
    const node = this.node

    const vis = select(node)
      .data([this.state.data])
      .attr('width', this.state.width)
      .attr('height', this.state.height)
      .append('svg:g')
      .attr(
        'transform',
        'translate(' + this.state.radius + ',' + this.state.radius + ')'
      )

    const _arc = arc()
      .outerRadius(this.state.radius)
      .innerRadius(this.state.innerRadius)

    const _pie = pie()
      .value((d, i) => this.state.data[i].count)
      .startAngle(-90 * (this.state.pi / 180))
      .endAngle(90 * (this.state.pi / 180))

    const pieces = vis
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
        addTspan(node, `${this.state.data[i].label}`, true)
        addTspan(node, `Antal ledamöter: ${this.state.data[i].count}`)
        addTspan(node, `Medelålder: ${this.state.data[i].age.toFixed(2)} år`)
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
      <div
        style={{
          height: this.state.height,
          width: this.state.width,
          margin: '0 auto'
        }}
      >
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
