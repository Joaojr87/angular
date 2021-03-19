import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  private data = [
    {"Month": "JAN", "Percentage": "70"},
    {"Month": "FEV", "Percentage": "90"},
    {"Month": "MAR", "Percentage": "90"},
    {"Month": "ABR", "Percentage": "70"},
  ];

  private svg: any;
  private svg2: any;
  private svg3: any;
  private svg4: any;
  private svg5: any;
  private margin = 50;
  private width = 240 - (this.margin * 2);
  private height = 200 - (this.margin * 2);

  ngOnInit(): void {
    this.drawBars(this.data, this.svg, "svg1");
    this.drawBars(this.data, this.svg2, "svg2");
    this.drawBars(this.data, this.svg3, "svg3");
    this.drawBars(this.data, this.svg3, "svg4");
    this.drawBars(this.data, this.svg3, "svg5");

  }

  

  private drawBars(data: any[], svg: any, render:any): void {
    svg = d3.select("svg#"+render)
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
    // Add X axis
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.Month))
    .padding(0.2);
        
    svg.append('g')
    .attr('transform', `translate(0, ${this.height})`)
    .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
    .range([this.height, 0])
    .domain([0, 100]);

    svg.append("g")
    .call(d3.axisLeft(y));

    // Create and fill the bars
   // Create and fill the bars
   svg.selectAll("bars")
   .data(data)
   .enter()
   .append("rect")
   .attr("x", (d: { Month: string; }) => x(d.Month))
   .attr("y", (d: { Percentage: d3.NumberValue; }) => y(d.Percentage))
   .attr("width", x.bandwidth())
   .attr("height", (d: { Percentage: d3.NumberValue; }) => this.height - y(d.Percentage))
   .attr("fill", "#68b7c3")
   .style("text-anchor", "middle");
  }
}
