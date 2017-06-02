import { Component, OnInit, ElementRef, OnChanges, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { WebService } from '../_providers/web.service';
import * as d3 from 'd3';
import { ActivatedRoute } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'dashboard',
	templateUrl: 'dashboard.component.html',
	encapsulation: ViewEncapsulation.None,
	styles: [`
		.d3-chart {
		 	width: 100%;
		 	height: 400px;
		}

		.d3-chart .axis path,
		.d3-chart .axis line {
			stroke: #999;
		}

		.d3-chart .axis text {
			fill: #999;
		}
	`]
})

export class DashboardComponent implements OnInit, OnChanges {

	@ViewChild('chart') private chartContainer: ElementRef;

	private margin: any = { top: 20,  bottom: 20, left: 20, right: 20 };
	private chart: any;
	private width: number;
	private height: number;
	private xScale: any;
	private yScale: any;
	private colors: any;
	private xAxis: any;
	private yAxis: any;

	private dataAll: any;

	constructor( private webService: WebService) {}

	ngOnInit() {
		
		// subscribe observable
		this.webService.getDataAll().subscribe(res => {
			this.dataAll = res;
			// create chart
			this.createChart();
		});

	}

	createChart() {

		let element = this.chartContainer.nativeElement;
		this.width = element.offsetWidth - this.margin.left - this.margin.right;
		this.height =  element.offsetHeight - this.margin.top -this.margin.bottom;

		let svg = d3.select(element).append('svg')
			.attr('width', element.offsetWidth)
			.attr('height', element.offsetHeight);

		// chart plot area
		this.chart = svg.append('g')
			.attr('class', 'bars')
			.attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

		// define X & Y domains
		let xDomain = this.dataAll.map(d => d.name);
		let yDomain = [0, d3.max(this.dataAll, d => d.number)];

		// create scales
		this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
		this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

		// bar colors
		this.colors = d3.scaleLinear().domain([0, this.dataAll.length]).range(<any[]>['red', 'blue']);

		// x & y axis
		this.xAxis = svg.append('g')
			.attr('class', 'axis axis-x')
			.attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
			.call(d3.axisBottom(this.xScale));

		this.yAxis = svg.append('g')
			.attr('class', 'axis axis-y')
			.attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
			.call(d3.axisLeft(this.yScale));

		// write chart
		this.chart.selectAll('.bar')
			.data(this.dataAll)
			.enter()
			.append('rect')
			.attr('class', '.bar')
			.attr('x', d => this.xScale(d.name))
			.attr('y', d => this.yScale(d.number))
			.attr('width', this.xScale.bandwidth())
			.style('fill', (d, i) => this.colors(i))
			.transition()
			.delay((d, i) => i * 10)
			.attr('height', d => this.height - this.yScale(d.number));
	}

}
