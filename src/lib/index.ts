export type MasterMaterialLine = {
	element: string;
	availbility: number;
	wait_time_weeks: number;
	batch_size: 'Batch to Batch' | number;
	programed_recepcions: {
		week: number;
		amount: number;
	}[];
	security_stock: 0;
};

export type ElemntTableLine = {
	week: number;
	gross_requirement: number;
	programed_recepcions: number;
	availbility_proyection: number;
	net_requirement: number;
	planned_release_of_the_order: number;
};

export function process_line(
	x: MasterMaterialLine,
	gross_requirements: { week: number; amount: number }[],
	weeks: number
) {
	//TODO: rm partial
	const table: ElemntTableLine[] = [];

	let availbility_proyection = x.availbility;

	for (let i = 1; i <= weeks; i++) {
		const gross_requirement = gross_requirements.find((x) => x.week === i)?.amount ?? 0;
		const programed_recepcions = x.programed_recepcions.find((x) => x.week === i)?.amount ?? 0;

		availbility_proyection += programed_recepcions;
		availbility_proyection -= gross_requirement;

		const net_requirement = availbility_proyection < 0 ? -availbility_proyection : 0;

		if (availbility_proyection < 0) {
			const request = x.batch_size === 'Batch to Batch' ? net_requirement : x.batch_size;
			table[i - x.wait_time_weeks - 1].planned_release_of_the_order = request;
			availbility_proyection += request;
		}

		table.push({
			week: i,
			gross_requirement,
			programed_recepcions,
			availbility_proyection,
			net_requirement,
			planned_release_of_the_order: 0
		});
	}

	return table;
}
