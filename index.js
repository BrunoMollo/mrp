/**
 * @typedef {Object} Input
 * @property {number} availbility - The available stock.
 * @property {number} wait_time_weeks - The wait time in weeks.
 * @property {null | number} batch_size - The batch size, which can be null.
 * @property {number} security_stock - The security stock level.
 * @property {number} weeks - The number of weeks.
 * @property {number[]} programed_recepcions - The programmed receptions over time.
 * @property {number[]} gross_requirements - The gross requirements over time.
 */

/**
 * @typedef {Object} Output
 * @property {number} week - The week number.
 * @property {number} gross_requirement - The gross requirement for the week.
 * @property {number} programed_recepcion - The programmed reception for the week.
 * @property {number} availbility_proyection - The availability projection.
 * @property {number} net_requirement - The net requirement.
 * @property {number} planned_release_of_the_order - The planned release of the order for the week.
 */

/**
 * @param {Input} input - The input data containing availability, requirements, and other stock-related details.
 * @returns {Output[]} - An array of output objects representing weekly projections and requirements.
 */
export function process_line(input) {
	const table = [];

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
