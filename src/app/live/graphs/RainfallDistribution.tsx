import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const data = [
  { month: 'Jan', rainfall: 10, probability: 30, intensity: 'light' },
  { month: 'Feb', rainfall: 15, probability: 40, intensity: 'light' },
  { month: 'Mar', rainfall: 25, probability: 60, intensity: 'moderate' },
  { month: 'Apr', rainfall: 30, probability: 70, intensity: 'moderate' },
  { month: 'May', rainfall: 45, probability: 80, intensity: 'heavy' },
  { month: 'Jun', rainfall: 80, probability: 90, intensity: 'heavy' },
];

const intensityColors = {
  light: '#82ca9d',
  moderate: '#4CAF50',
  heavy: '#2E7D32',
};

export function RainfallDistribution() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous graph
    d3.select(svgRef.current).selectAll('*').remove();

    // Set dimensions
    const margin = { top: 40, right: 60, bottom: 60, left: 60 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = svgRef.current.clientHeight - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([0, width])
      .padding(0.2);

    const y1 = d3.scaleLinear().domain([0, d3.max(data, (d) => d.rainfall)! * 1.2]).range([height, 0]);

    const y2 = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    // Add bars
    svg
      .selectAll('.rain-bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.month)!)
      .attr('width', x.bandwidth())
      .attr('y', height)
      .attr('height', 0)
      .attr('fill', (d) => intensityColors[d.intensity as keyof typeof intensityColors])
      .attr('fill-opacity', 0.6)
      .transition()
      .duration(1000)
      .delay((_, i) => i * 100)
      .attr('y', (d) => y1(d.rainfall))
      .attr('height', (d) => height - y1(d.rainfall));

    // Line and points for probability
    const line = d3
      .line<(typeof data)[0]>()
      .x((d) => x(d.month)! + x.bandwidth() / 2)
      .y((d) => y2(d.probability))
      .curve(d3.curveCatmullRom.alpha(0.5));

    const path = svg
      .append('path')
      .datum(data)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', '#2196F3')
      .attr('stroke-width', 2);

    const pathLength = path.node()!.getTotalLength();
    path
      .attr('stroke-dasharray', pathLength)
      .attr('stroke-dashoffset', pathLength)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

    svg
      .selectAll('.probability-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.month)! + x.bandwidth() / 2)
      .attr('cy', (d) => y2(d.probability))
      .attr('r', 0)
      .attr('fill', '#2196F3')
      .transition()
      .delay((_, i) => 2000 + i * 100)
      .duration(1000)
      .attr('r', 5);

    // Axes
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y1));
    svg.append('g').attr('transform', `translate(${width},0)`).call(d3.axisRight(y2));
  }, []);

  return <svg ref={svgRef} className="w-full h-full" style={{ minHeight: '300px' }} />;
}
