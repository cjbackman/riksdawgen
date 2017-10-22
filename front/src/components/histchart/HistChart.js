import React, { Component } from 'react'
import './App.css'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { axisBottom } from 'd3-axis'

class HistChart extends Component {
   constructor(props){
      super(props)
      this.createHistChart = this.createHistChart.bind(this)
   }
   componentDidMount() {
      this.createHistChart()
   }
   componentDidUpdate() {
      this.createHistChart()
   }
   createHistChart() {

      // Hardcoded for now
      const dimension = 'age'

      const node = this.node

      const dataMax = max(this.props.data, d => d[dimension])
      const x = scaleLinear()
         .domain([0, dataMax])
         .range([0, this.props.size[0]])

      const nbins = 20
      const histogram = histogram()
         .domain(x.domain())
         .thresholds(x.ticks(nbins))
         .value(d => d[dimension])

      const bins = histogram(this.props.data)

      // Add a g container for each bin
      let binContainer = select(node).selectAll(".gBin").data(bins);

      // Remove old containers
      binContainer.exit().remove()

      // Add new containers
      let binContainerEnter = binContainer.enter()
         .append("g")
         .attr("class", "gBin")
         .attr("transform", d => `translate(${x(d.x0)}, ${this.props.size[1]})`)

      // Populate the bin containers with data
      binContainerEnter.selectAll("circle")
        .data(d => d.map((p, i) => {
          return {
                  idx: i,
                  name: p.name,
                  value: p[dimension],
                  radius: (x(d.x1)-x(d.x0))/2
                }
        }))
      .enter()
      .append("circle")
        .attr("class", "mp-circle")
        .attr("cx", 0) //g element already at correct x pos
        .attr("cy", d => - d.idx * 2 * d.radius - d.radius)
        .attr("r", 0)

      binContainerEnter.merge(binContainer)
        .attr("transform", d => `translate(${x(d.x0)}, ${this.props.size[1]})`)

      // Enter/update/exit for circles, inside each container
      let dots = binContainer.selectAll("circle")
        .data(d => d.map((p, i) => {
          return {
                  idx: i,
                  name: p.name,
                  value: p[dimension],
                  radius: (x(d.x1)-x(d.x0))/2
                }
        }))

      // Remove elements no longer present in data
      dots.exit().remove();

      // Update existing elements
      //dots.attr("class", "update");

      // Add new dots found in data
      dots.enter()
      .append("circle")
        .attr("cx", 0) //g element already at correct x pos
        .attr("cy", d => return - d.idx * 2 * d.radius - d.radius)
        .attr("r", 0)
      .merge(dots)

      //Add x axis
      select(node)
         .append('g')
         .attr("class", "axis axis--x")
         .attr("transform", `translate(0,${this.props.size[1]})`)
         .call(axisBottom(x))

render() {
      return '<svg ref={node => this.node = node} width={500} height={500}></svg>'
   }
}
export default HistChart