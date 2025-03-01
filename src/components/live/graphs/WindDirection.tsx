import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const data = [
  { direction: 'N', speed: 65, gusts: 80, frequency: 15 },
  { direction: 'NE', speed: 80, gusts: 95, frequency: 20 },
  { direction: 'E', speed: 45, gusts: 60, frequency: 10 },
  { direction: 'SE', speed: 30, gusts: 45, frequency: 5 },
  { direction: 'S', speed: 55, gusts: 70, frequency: 12 },
  { direction: 'SW', speed: 40, gusts: 55, frequency: 8 },
  { direction: 'W', speed: 70, gusts: 85, frequency: 18 },
  { direction: 'NW', speed: 50, gusts: 65, frequency: 12 },
];

export function WindDirection() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous graph
    d3.select(svgRef.current).selectAll('*').remove();

    // Set dimensions
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = svgRef.current.clientHeight - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .append('g')
      .attr('transform', `translate(${width / 2 + margin.left},${height / 2 + margin.top})`);

    // Create scales
    const angleScale = d3.scalePoint()
      .domain(data.map(d => d.direction))
      .range([0, 2 * Math.PI]);

    const radiusScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.gusts)!])
      .range([0, radius]);

    const colorScale = d3.scaleSequential()
      .domain([0, d3.max(data, d => d.speed)!])
      .interpolator(d3.interpolateBlues);

    // Create radial gradient
    const gradient = svg.append('defs')
      .append('radialGradient')
      .attr('id', 'wind-gradient')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#63B3ED')
      .attr('stop-opacity', 0.7);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#2B6CB0')
      .attr('stop-opacity', 0.3);

    // Create circular grid
    const gridCircles = [20, 40, 60, 80, 100];
    svg.selectAll('.grid-circle')
      .data(gridCircles)
      .enter()
      .append('circle')
      .attr('class', 'grid-circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', d => radiusScale(d))
      .attr('fill', 'none')
      .attr('stroke', '#E2E8F0')
      .attr('stroke-dasharray', '2,2');

    // Add grid labels
    svg.selectAll('.grid-label')
      .data(gridCircles)
      .enter()
      .append('text')
      .attr('class', 'grid-label')
      .attr('x', 5)
      .attr('y', d => -radiusScale(d))
      .attr('font-size', '10px')
      .attr('fill', '#718096')
      .text(d => `${d}km/h`);

    // Create direction labels
    svg.selectAll('.direction-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'direction-label')
      .attr('x', d => (radius + 20) * Math.cos(angleScale(d.direction)! - Math.PI / 2))
      .attr('y', d => (radius + 20) * Math.sin(angleScale(d.direction)! - Math.PI / 2))
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-weight', 'bold')
      .attr('fill', '#4A5568')
      .text(d => d.direction);

    // Create wind rose petals
    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius((d: any) => radiusScale(d.data.speed))
      .startAngle((d: any) => angleScale(d.data.direction)! - Math.PI / 8)
      .endAngle((d: any) => angleScale(d.data.direction)! + Math.PI / 8);

    const gustArcGenerator = d3.arc()
      .innerRadius((d: any) => radiusScale(d.data.speed))
      .outerRadius((d: any) => radiusScale(d.data.gusts))
      .startAngle((d: any) => angleScale(d.data.direction)! - Math.PI / 8)
      .endAngle((d: any) => angleScale(d.data.direction)! + Math.PI / 8);

    // Add wind petals with animation
    svg.selectAll('.wind-petal')
      .data(data.map(d => ({ data: d })))
      .enter()
      .append('path')
      .attr('class', 'wind-petal')
      .attr('d', arcGenerator as any)
      .attr('fill', d => colorScale(d.data.speed))
      .attr('stroke', '#4299E1')
      .attr('stroke-width', 1)
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .delay((_, i) => i * 100)
      .style('opacity', 0.7);

    // Add gust areas with animation
    svg.selectAll('.gust-area')
      .data(data.map(d => ({ data: d })))
      .enter()
      .append('path')
      .attr('class', 'gust-area')
      .attr('d', gustArcGenerator as any)
      .attr('fill', 'url(#wind-gradient)')
      .attr('stroke', '#4299E1')
      .attr('stroke-width', 0.5)
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .delay((_, i) => i * 100 + 500)
      .style('opacity', 0.3);

    // Add frequency circles
    svg.selectAll('.frequency-circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'frequency-circle')
      .attr('cx', d => radiusScale(d.speed) * Math.cos(angleScale(d.direction)! - Math.PI / 2))
      .attr('cy', d => radiusScale(d.speed) * Math.sin(angleScale(d.direction)! - Math.PI / 2))
      .attr('r', d => d.frequency / 2)
      .attr('fill', '#4299E1')
      .attr('stroke', 'white')
      .attr('stroke-width', 1)
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .delay((_, i) => i * 100 + 1000)
      .style('opacity', 1);

    // Add interactive tooltip
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('padding', '10px')
      .style('border-radius', '5px')
      .style('box-shadow', '0 0 10px rgba(0,0,0,0.1)');

    // Add interactivity
    svg.selectAll('.wind-petal, .gust-area')
      .on('mouseover', function(event, d: any) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('opacity', 0.9);

        tooltip
          .style('visibility', 'visible')
          .html(`
            <div class="font-bold">${d.data.direction}</div>
            <div>Wind Speed: ${d.data.speed} km/h</div>
            <div>Gusts: ${d.data.gusts} km/h</div>
            <div>Frequency: ${d.data.frequency}%</div>
          `);
      })
      .on('mousemove', (event) => {
        tooltip
          .style('top', (event.pageY - 10) + 'px')
          .style('left', (event.pageX + 10) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .style('opacity', d3.select(this).classed('wind-petal') ? 0.7 : 0.3);

        tooltip.style('visibility', 'hidden');
      });

    // Add title
    svg.append('text')
      .attr('x', 0)
      .attr('y', -height / 2 + 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Wind Rose Diagram');

  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="h-64">
        <svg
          ref={svgRef}
          className="w-full h-full"
          style={{ minHeight: '250px' }}
        />
      </div>
      <div className="mt-4 text-sm text-gray-600 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500"></div>
          <span>Wind Speed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-300 bg-opacity-50"></div>
          <span>Gust Speed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-blue-500"></div>
          <span>Frequency</span>
        </div>
      </div>
    </div>
  );
}