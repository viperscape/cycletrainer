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
	let mass = mass_person;

	let frontal_cd = 0.45;
	let air_r = 0.325 * frontal_cd * 1.225;

	let roll_r = 0.0045;
	gradient *= 0.01;

	let mass_r = (gravity * mass) * (gradient + roll_r);
	let wind = 0.0;
	let efficiency = 98 * 0.01;
	return Newtonsmethod(air_r, wind, mass_r, efficiency, power); // in m/s
}

export { CalcSpeed };