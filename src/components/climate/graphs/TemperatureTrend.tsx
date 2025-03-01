import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const data = [
  { month: 'Jan', temp: 24, minTemp: 20, maxTemp: 28, humidity: 65 },
  { month: 'Feb', temp: 26, minTemp: 22, maxTemp: 30, humidity: 70 },
  { month: 'Mar', temp: 28, minTemp: 24, maxTemp: 32, humidity: 60 },
  { month: 'Apr', temp: 32, minTemp: 28, maxTemp: 36, humidity: 55 },
  { month: 'May', temp: 31, minTemp: 27, maxTemp: 35, humidity: 50 },
  { month: 'Jun', temp: 29, minTemp: 25, maxTemp: 33, humidity: 60 },
];

export function TemperatureTrend() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous graph
    d3.select(svgRef.current).selectAll('*').remove();

    // Set dimensions
    const margin = { top: 40, right: 80, bottom: 60, left: 60 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = svgRef.current.clientHeight - margin.top - margin.bottom;

    // Create SVG with zoom support
    const svg = d3.select(svgRef.current)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add clip path
    svg.append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', width)
      .attr('height', height);

    // Scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([0, width])
      .padding(0.1);

    const y1 = d3.scaleLinear()
      .domain([
        d3.min(data, d => d.minTemp)! - 5,
        d3.max(data, d => d.maxTemp)! + 5
      ])
      .range([height, 0]);

    const y2 = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    // Create gradient for temperature range
    const tempGradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'temp-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', y1(0))
      .attr('x2', 0)
      .attr('y2', y1(40));

    tempGradient.selectAll('stop')
      .data([
        { offset: '0%', color: '#ffd6d6' },
        { offset: '50%', color: '#ff8080' },
        { offset: '100%', color: '#ff4040' }
      ])
      .enter()
      .append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color);

    // Create temperature range area
    const areaGenerator = d3.area<(typeof data)[0]>()
      .x(d => x(d.month)! + x.bandwidth() / 2)
      .y0(d => y1(d.minTemp))
      .y1(d => y1(d.maxTemp))
      .curve(d3.curveCatmullRom);

    // Add temperature range area with animation
    const areaPath = svg.append('path')
      .datum(data)
      .attr('class', 'temp-range')
      .attr('clip-path', 'url(#clip)')
      .attr('fill', 'url(#temp-gradient)')
      .attr('opacity', 0.3)
      .attr('d', areaGenerator);

    // Animate area on load
    const areaLength = areaPath.node()!.getTotalLength();
    areaPath
      .attr('stroke-dasharray', `${areaLength} ${areaLength}`)
      .attr('stroke-dashoffset', areaLength)
      .transition()
      .duration(2000)
      .attr('stroke-dashoffset', 0);

    // Add temperature line
    const lineGenerator = d3.line<(typeof data)[0]>()
      .x(d => x(d.month)! + x.bandwidth() / 2)
      .y(d => y1(d.temp))
      .curve(d3.curveCatmullRom);

    const linePath = svg.append('path')
      .datum(data)
      .attr('class', 'temp-line')
      .attr('clip-path', 'url(#clip)')
      .attr('fill', 'none')
      .attr('stroke', '#ff4040')
      .attr('stroke-width', 3)
      .attr('d', lineGenerator);

    // Animate line on load
    const lineLength = linePath.node()!.getTotalLength();
    linePath
      .attr('stroke-dasharray', `${lineLength} ${lineLength}`)
      .attr('stroke-dashoffset', lineLength)
      .transition()
      .duration(2000)
      .attr('stroke-dashoffset', 0);

    // Add humidity circles
    const humidityScale = d3.scaleLinear()
      .domain([0, 100])
      .range([3, 15]);

    svg.selectAll('.humidity-circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'humidity-circle')
      .attr('cx', d => x(d.month)! + x.bandwidth() / 2)
      .attr('cy', d => y1(d.temp))
      .attr('r', 0)
      .attr('fill', '#4299e1')
      .attr('opacity', 0.6)
      .transition()
      .duration(1000)
      .delay((_, i) => i * 200)
      .attr('r', d => humidityScale(d.humidity));

    // Add interactive elements
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('padding', '10px')
      .style('border-radius', '5px')
      .style('box-shadow', '0 0 10px rgba(0,0,0,0.1)');

    svg.selectAll('.temp-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'temp-point')
      .attr('cx', d => x(d.month)! + x.bandwidth() / 2)
      .attr('cy', d => y1(d.temp))
      .attr('r', 6)
      .attr('fill', '#ff4040')
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 8);

        tooltip
          .style('visibility', 'visible')
          .html(`
            <div class="font-bold">${d.month}</div>
            <div>Temperature: ${d.temp}°C</div>
            <div>Range: ${d.minTemp}°C - ${d.maxTemp}°C</div>
            <div>Humidity: ${d.humidity}%</div>
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
          .attr('r', 6);

        tooltip.style('visibility', 'hidden');
      });

    // Add axes with grid
    const xAxis = d3.axisBottom(x);
    const y1Axis = d3.axisLeft(y1).ticks(5);
    const y2Axis = d3.axisRight(y2).ticks(5);

    // Add X grid
    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x)
        .tickSize(-height)
        .tickFormat(() => '')
      )
      .style('stroke-dasharray', '3,3')
      .style('stroke-opacity', 0.1);

    // Add Y grid
    svg.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(y1)
        .ticks(5)
        .tickSize(-width)
        .tickFormat(() => '')
      )
      .style('stroke-dasharray', '3,3')
      .style('stroke-opacity', 0.1);

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'middle')
      .attr('dy', '1em');

    svg.append('g')
      .call(y1Axis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -50)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', '#666')
      .text('Temperature (°C)');

    svg.append('g')
      .attr('transform', `translate(${width},0)`)
      .call(y2Axis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 45)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', '#666')
      .text('Humidity (%)');

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Temperature & Humidity Trends');

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
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Temperature</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-200 rounded-full"></div>
          <span>Temperature Range</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
          <span>Humidity Level</span>
        </div>
      </div>
    </div>
  );
}