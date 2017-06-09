import { 
	Component, 
	OnInit, 
	ElementRef, 
	ViewChild, 
	ViewEncapsulation
} from '@angular/core';
import { WebService } from '../_providers/web.service';
import * as D3 from 'd3';
import { ActivatedRoute } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'dashboard',
	templateUrl: 'dashboard.component.html',
	styleUrls: ['dashboard.component.css'],
	encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {

	@ViewChild('chart') private chartContainer: ElementRef;
	@ViewChild('pie') private pieContainer: ElementRef;

	// chart
	private margin: any = { top: 20,  bottom: 20, left: 20, right: 20 };
	private chart: any;
	private width: number;
	private height: number;
	private xScale: any;
	private yScale: any;
	private colors: any;
	private xAxis: any;
	private yAxis: any;

	// pie chart	
	private pMargin = { top: 0, right: 100, bottom: 30, left: 100 };
	private pWidth: number;
	private pHeight: number;
	private pRadius: number;

	private arc: any;
	private labelArc: any;
	private pie: any;
	private color: any;
	private svg: any;

	// data
	private dataAll: any;

	constructor( private webService: WebService) {}


	ngOnInit() {

		// subscribe observable
		this.webService.getDataAll().subscribe(res => {

			this.dataAll = res;
			
			// create charts
			this.createChart();
			this.createPie();

		});
	}

	// bars chart
	createChart() {

		let element = this.chartContainer.nativeElement;
		this.width = element.offsetWidth - this.margin.left - this.margin.right;
		this.height =  element.offsetHeight - this.margin.top -this.margin.bottom;

		let svg = D3.select(element).append('svg')
			.attr('width', element.offsetWidth)
			.attr('height', element.offsetHeight);

		// chart plot area
		this.chart = svg.append('g')
			.attr('class', 'bars')
			.attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

		// define X & Y domains
		let xDomain = this.dataAll.map( d => d.name);
		let yDomain = [0, D3.max(this.dataAll, (d) => d.values)];

		// create scales
		this.xScale = D3.scaleBand().padding(0.1).domain(<any>xDomain).rangeRound([0, this.width]);
		this.yScale = D3.scaleLinear().domain(<any>yDomain).range([this.height, 0]);

		// bar colors
		this.colors = D3.scaleLinear().domain([0, this.dataAll.length]).range(<any[]>['red', 'blue']);

		// x & y axis
		this.xAxis = svg.append('g')
			.attr('class', 'axis axis-x')
			.attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
			.call(D3.axisBottom(this.xScale));

		this.yAxis = svg.append('g')
			.attr('class', 'axis axis-y')
			.attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
			.call(D3.axisLeft(this.yScale));

		// write chart
		this.chart.selectAll('.bar')
			.data(this.dataAll)
			.enter()
			.append('rect')
			.attr('class', '.bar')
			.attr('x', d => this.xScale(d.name))
			.attr('y', d => this.yScale(d.values))
			.attr('width', this.xScale.bandwidth())
			.style('fill', (d, i) => this.colors(i))
			.transition()
			.delay((d, i) => i * 10)
			.attr('height', d => this.height - this.yScale(d.values));

	}

	// pie bar
	createPie() {

		let pElement = this.pieContainer.nativeElement;
		this.pWidth = pElement.offsetWidth - this.margin.left - this.margin.right;
		this.pHeight = pElement.offsetHeight - this.margin.top - this.margin.bottom;
		this.pRadius = Math.min(this.pWidth, this.pHeight) / 2;

		this.color = D3.scaleOrdinal(D3.schemeCategory10);

		// pie-chart area
        this.arc = D3.arc()
        	.outerRadius(this.pRadius - 10)
        	.innerRadius(0);

        this.labelArc = D3.arc()
        	.outerRadius(this.pRadius - 40)
        	.innerRadius(this.pRadius - 40);

        this.pie = D3.pie()
        	.value((d: any) => d.values);

        this.svg = D3.select(pElement).append('svg')
        	.append('g')
        	.attr('transform', 'translate(' + this.pWidth/2 + ',' + this.pHeight/2 + ')');

        // populate pie-chart
       	let g = this.svg.selectAll('.arc')
			.data(this.pie(this.dataAll))
			.enter()
			.append('g')
			.attr('class', 'arc');

			g.append('path').attr('d', this.arc)
				.style('fill', (d: any) => this.color(d.values));

			g.append('text')
				.attr('transform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')')
				.attr('dy', '0.35em')
				.text( (d: any) => d.data.name ).style('fill', '#f2f2f2');

	}

}
