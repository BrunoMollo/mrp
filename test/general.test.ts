import { processData, type Input, type Output } from '../src/index';
import { describe, expect, test } from 'vitest';

describe('process_line: small details', () => {
	test('assign gross_requirement 1', () => {
		const input = {
			weeks: 2,
			availbility: 75,
			wait_time_weeks: 1,
			batch_size: null,
			programed_recepcions: [20, 0],
			gross_requirements: [50, 0],
			security_stock: 0
		} satisfies Input;

		const res: Partial<Output>[] = processData(input).map((x) => ({
			week: x.week,
			gross_requirement: x.gross_requirement
		}));

		expect(res).toEqual([
			{ week: 1, gross_requirement: 50 },
			{ week: 2, gross_requirement: 0 }
		]);
	});

	test('assign gross_requirement 2', () => {
		const input = {
			weeks: 4,
			availbility: 75,
			wait_time_weeks: 1,
			batch_size: null,
			programed_recepcions: [50, 0],
			gross_requirements: [0, 0, 0, 0],
			security_stock: 0
		} satisfies Input;

		const res: Partial<Output>[] = processData(input).map((x) => ({
			week: x.week,
			gross_requirement: x.gross_requirement
		}));

		expect(res).toEqual([
			{ week: 1, gross_requirement: 0 },
			{ week: 2, gross_requirement: 0 },
			{ week: 3, gross_requirement: 0 },
			{ week: 4, gross_requirement: 0 }
		]);
	});

	test('assign programed_recepcions 1', () => {
		const input = {
			weeks: 4,
			availbility: 75,
			wait_time_weeks: 1,
			batch_size: null,
			gross_requirements: [50, 0, 0, 0],
			programed_recepcions: [50, 0, 0, 0],
			security_stock: 0
		} satisfies Input;

		const res = processData(input).map(({ week, programed_recepcion }) => ({
			week,
			programed_recepcion
		}));

		expect(res).toEqual<typeof res>([
			{ week: 1, programed_recepcion: 50 },
			{ week: 2, programed_recepcion: 0 },
			{ week: 3, programed_recepcion: 0 },
			{ week: 4, programed_recepcion: 0 }
		]);
	});
});
