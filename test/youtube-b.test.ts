import { processData, type Input, type Output } from '../src/index';
import { describe, expect, test } from 'vitest';

describe('example youtube: B', () => {
	//Link : https://www.youtube.com/watch?v=oaIsq2NPk_4
	const input = {
		weeks: 8,
		availbility: 40,
		wait_time_weeks: 1,
		batch_size: 500,
		programed_recepcions: [0, 0, 0, 0, 0, 0, 0, 0],
		gross_requirements: [0, 450, 35, 50, 450, 490, 55, 0],
		security_stock: 10
	} satisfies Input;

	test('week 1', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 1);
		expect(week).toEqual<Output>({
			week: 1,
			gross_requirement: 0,
			programed_recepcion: 0,
			availbility_proyection: 40,
			net_requirement: 0,
			planned_release_of_the_order: 500
		});
	});

	test('week 2', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 2);
		expect(week).toEqual<Output>({
			week: 2,
			gross_requirement: 450,
			programed_recepcion: 0,
			availbility_proyection: 90,
			net_requirement: 420,
			planned_release_of_the_order: 0
		});
	});

	test('week 3', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 3);
		expect(week).toEqual<Output>({
			week: 3,
			gross_requirement: 35,
			programed_recepcion: 0,
			availbility_proyection: 55,
			net_requirement: 0,
			planned_release_of_the_order: 500
		});
	});

	test('week 4', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 4);
		expect(week).toEqual<Output>({
			week: 4,
			gross_requirement: 50,
			programed_recepcion: 0,
			availbility_proyection: 505,
			net_requirement: 5,
			planned_release_of_the_order: 0
		});
	});

	test('week 5', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 5);
		expect(week).toEqual<Output>({
			week: 5,
			gross_requirement: 450,
			programed_recepcion: 0,
			availbility_proyection: 55,
			net_requirement: 0,
			planned_release_of_the_order: 500
		});
	});

	test('week 6', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 6);
		expect(week).toEqual<Output>({
			week: 6,
			gross_requirement: 490,
			programed_recepcion: 0,
			availbility_proyection: 65,
			net_requirement: 445,
			planned_release_of_the_order: 0
		});
	});

	test('week 7', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 7);
		expect(week).toEqual<Output>({
			week: 7,
			gross_requirement: 55,
			programed_recepcion: 0,
			availbility_proyection: 10,
			net_requirement: 0,
			planned_release_of_the_order: 0
		});
	});

	test('week 8', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 8);
		expect(week).toEqual<Output>({
			week: 8,
			gross_requirement: 0,
			programed_recepcion: 0,
			availbility_proyection: 10,
			net_requirement: 0,
			planned_release_of_the_order: 0
		});
	});
});
