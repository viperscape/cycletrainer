import React, { Component } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

class Metrics extends Component {
    constructor(props)
    {
		super(props);
		
        this.state = {
            power: -1, speed: 0, revs: 0, 
            bikespeed: 0, distance: 0 
		};
		
		this.CalcMetrics = this.CalcMetrics.bind(this);
        this.props.bus.on("data", this.CalcMetrics);
    }

	CalcMetrics (_, data) {
		let gradient = 0.0; // degrees 
		data.bikespeed = CalcSpeed(9.80665, data.power, this.props.weight, gradient);
		let wheelsize = 668; // 700c
		let distance = (data.revs * wheelsize * Math.PI) * 0.000001; // kilometers
		distance = distance.toFixed(2);
		if (data.revs > this.state.revs)
			data.distance = this.state.distance + distance;
		else 
			data.distance = distance;

		this.setState(data);
	}

	componentWillUnmount()
    {
        this.props.bus.removeListener("data", this.CalcMetrics);
    }

    render() {
        return (
			<Container>
				{this.state.power<0 && 
				<Container>
					<span>Finding Trainer... </span>
					<Spinner animation="border" role="status">
					</Spinner>
				</Container>
				}
				<Container>
					<Row><Col><h3>Metrics</h3></Col></Row>
					<Row><Col>Power</Col> <Col>
						{this.state.power > 0 && this.state.power}
						{this.state.power < 1 && "--"}
						</Col></Row>
					<Row><Col>Cadence</Col> <Col>
						{this.state.power > 0 && this.state.speed}
						{this.state.power < 1 && "--"}
						</Col></Row>
					<Row><Col>Bike Speed</Col> <Col>{this.state.bikespeed}</Col></Row>
					<Row><Col>Distance</Col> <Col>{this.state.distance}</Col></Row>
				</Container>
			</Container>
        )
    }
}


export default Metrics;


// http://bikecalculator.com/veloUS.html
function Newtonsmethod(aero, hw, tr, tran, p)
{
	let vel = 20;       // Initial guess
	let MAX = 10;       // maximum iterations
	let TOL = 0.05;     // tolerance

	for (let i = 1; i < MAX; i++) {
		let tv = vel + hw;
		let f = vel * (aero * tv * tv + tr) - tran * p; // the function
		let fp = aero * (3.0 * vel + hw) * tv + tr;     // the derivative
		let vNew = vel - f / fp;
		if (Math.abs(vNew - vel) < TOL) return vNew;  // success
		vel = vNew;
	}
	return 0.0;  // failed to converge
}

function CalcSpeed(gravity, power, mass_person, gradient) {
	let mass_bike = 10; // 22 lbs
	let mass = mass_person + mass_bike;

	let frontal_cd = 0.45;
	let air_r = 0.325 * frontal_cd * 1.225;

	let roll_r = 0.0045;
	gradient *= 0.01;

	let mass_r = (gravity * mass) * (gradient + roll_r);
	let wind = 0.0;
	let efficiency = 98 * 0.01;
	return Newtonsmethod(air_r, wind, mass_r, efficiency, power); // in m/s
}