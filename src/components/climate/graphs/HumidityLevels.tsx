import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const data = [
  { hour: '00:00', humidity: 65, dewPoint: 18, temp: 22 },
  { hour: '04:00', humidity: 70, dewPoint: 19, temp: 21 },
  { hour: '08:00', humidity: 60, dewPoint: 17, temp: 24 },
  { hour: '12:00', humidity: 55, dewPoint: 16, temp: 26 },
  { hour: '16:00', humidity: 50, dewPoint: 15, temp: 28 },
  { hour: '20:00', humidity: 60, dewPoint: 17, temp: 25 },
];

export function HumidityLevels() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous graph
    d3.select(svgRef.current).selectAll('*').remove();

    // Set dimensions
    const margin = { top: 40, right: 60, bottom: 60, left: 60 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = svgRef.current.clientHeight - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3.scaleBand()
      .domain(data.map((d) => d.hour))
      .range([0, width])
      .padding(0.1);

    const y1 = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    const y2 = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.temp)! + 5])
      .range([height, 0]);

    // Create radial gradient
    const radialGradient = svg.append('defs')
      .append('radialGradient')
      .attr('id', 'humidity-gradient')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');

    radialGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#63B3ED')
      .attr('stop-opacity', 0.8);

    radialGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#63B3ED')
      .attr('stop-opacity', 0.2);

    // Humidity area
    const areaGenerator = d3.area<(typeof data)[0]>()
      .x((d) => x(d.hour)! + x.bandwidth() / 2)
      .y0(height)
      .y1((d) => y1(d.humidity))
      .curve(d3.curveCatmullRom);

    svg.append('path')
      .datum(data)
      .attr('fill', 'url(#humidity-gradient)')
      .attr('d', areaGenerator);

    // Dew point line
    const dewPointLine = d3.line<(typeof data)[0]>()
      .x((d) => x(d.hour)! + x.bandwidth() / 2)
      .y((d) => y2(d.dewPoint))
      .curve(d3.curveCatmullRom);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#38B2AC')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5')
      .attr('d', dewPointLine);

    // Temperature line
    const tempLine = d3.line<(typeof data)[0]>()
      .x((d) => x(d.hour)! + x.bandwidth() / 2)
      .y((d) => y2(d.temp))
      .curve(d3.curveCatmullRom);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#F56565')
      .attr('stroke-width', 2)
      .attr('d', tempLine);

    // Tooltip
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('padding', '10px')
      .style('border-radius', '5px')
      .style('box-shadow', '0 0 10px rgba(0,0,0,0.1)');

    svg.selectAll('.data-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', (d) => x(d.hour)! + x.bandwidth() / 2)
      .attr('cy', (d) => y1(d.humidity))
      .attr('r', 6)
      .attr('fill', '#63B3ED')
      .on('mouseover', function (event, d) {
        d3.select(this).attr('r', 8);
        tooltip
          .style('visibility', 'visible')
          .html(`
            <div><strong>${d.hour}</strong></div>
            <div>Humidity: ${d.humidity}%</div>
            <div>Temperature: ${d.temp}°C</div>
            <div>Dew Point: ${d.dewPoint}°C</div>
          `);
      })
      .on('mousemove', (event) => {
        tooltip
          .style('top', `${event.pageY - 10}px`)
          .style('left', `${event.pageX + 10}px`);
      })
      .on('mouseout', function () {
        d3.select(this).attr('r', 6);
        tooltip.style('visibility', 'hidden');
      });

    // Comfort zone
    svg.append('rect')
      .attr('x', 0)
      .attr('y', y1(70))
      .attr('width', width)
      .attr('height', y1(30) - y1(70))
      .attr('fill', '#48BB78')
      .attr('opacity', 0.1);

    svg.append('text')
      .attr('x', width - 10)
      .attr('y', y1(50))
      .attr('text-anchor', 'end')
      .attr('fill', '#48BB78')
      .text('Comfort Zone (30-70%)');

    // Axes
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y1));
    svg.append('g').call(d3.axisRight(y2).tickSize(width));

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .text('Humidity & Temperature Relationship');
  }, []);

  return (
    <div>
      <svg ref={svgRef} width="100%" height="400"></svg>
    </div>
  );
}
