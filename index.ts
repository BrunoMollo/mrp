export type Input = {
	availbility: number;
	wait_time_weeks: number;
	batch_size: null | number;
	security_stock: number;
	weeks: number;
	programed_recepcions: number[];
	gross_requirements: number[];
};

export type Output = {
	week: number;
	gross_requirement: number;
	programed_recepcion: number;
	availbility_proyection: number;
	net_requirement: number;
	planned_release_of_the_order: number;
};

export function process_line(input: Input): Output[] {
	//TODO: rm partial
	const table = [] as Output[];

	const { weeks, gross_requirements, programed_recepcions, batch_size, wait_time_weeks } = input;
	let availbility_proyection = input.availbility;

	for (let i = 1; i <= weeks; i++) {
		const gross_requirement = gross_requirements[i - 1];
		const programed_recepcion = programed_recepcions[i - 1];

		availbility_proyection += programed_recepcion;
		availbility_proyection -= gross_requirement;

		const net_requirement = availbility_proyection < 0 ? -availbility_proyection : 0;

		if (availbility_proyection < 0) {
			const request = batch_size === null ? net_requirement : batch_size;
			table[i - wait_time_weeks - 1].planned_release_of_the_order = request;
			availbility_proyection += request;
		}
		table.push({
			week: i,
			gross_requirement,
			programed_recepcion,
			availbility_proyection,
			net_requirement,
			planned_release_of_the_order: 0
		});
	}

	return table;
}
