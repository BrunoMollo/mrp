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
export function processData({
	weeks,
	availbility,
	gross_requirements,
	programed_recepcions,
	batch_size,
	wait_time_weeks,
	security_stock
}) {
	const output = [];

	let availbility_proyection = availbility;

	for (let i = 1; i <= weeks; i++) {
		const gross_requirement = gross_requirements[i - 1];
		const programed_recepcion = programed_recepcions[i - 1];

		availbility_proyection += programed_recepcion;
		availbility_proyection -= gross_requirement;

		const net_requirement = calculate_net_requirement({ availbility_proyection, security_stock });

		if (availbility_proyection < security_stock) {
			const request = calculate_amount_to_request({
				availbility_proyection,
				batch_size,
				net_requirement
			});
			output[i - wait_time_weeks - 1].planned_release_of_the_order = request;
			availbility_proyection += request;
		}
		output.push({
			week: i,
			gross_requirement,
			programed_recepcion,
			availbility_proyection,
			net_requirement,
			planned_release_of_the_order: 0
		});
	}

	return output;
}

/**
 * @param {{availbility_proyection:number, security_stock:number}} input
 * @returns {number}
 */
function calculate_net_requirement({ availbility_proyection, security_stock }) {
	if (availbility_proyection <= security_stock) {
		return security_stock - availbility_proyection;
	}
	return 0;
}

/**
 * @param {{availbility_proyection:number,batch_size:number|null, net_requirement:number}} input
 * @returns {number}
 */
function calculate_amount_to_request({ availbility_proyection, batch_size, net_requirement }) {
	if (batch_size === null) {
		return net_requirement;
	}

	const required_amount = -availbility_proyection;
	if (batch_size > required_amount) {
		return batch_size;
	}

	const number_of_baches = Math.ceil(required_amount / batch_size);
	return batch_size * number_of_baches;
}
