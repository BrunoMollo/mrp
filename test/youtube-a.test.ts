import { processData, type Input, type Output } from '../src/index';
import { describe, expect, test } from 'vitest';

describe('example youtube: A', () => {
	//Link : https://www.youtube.com/watch?v=oaIsq2NPk_4
	const input = {
		weeks: 8,
		availbility: 75,
		wait_time_weeks: 1,
		batch_size: null,
		programed_recepcions: [50, 0, 0, 0, 0, 0, 0, 0],
		gross_requirements: [0, 100, 0, 60, 50, 0, 40, 55],
		security_stock: 0
	} satisfies Input;

	test('week 1', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 1);
		expect(week).toEqual<Output>({
			week: 1,
			gross_requirement: 0,
			programed_recepcion: 50,
			availbility_proyection: 125,
			net_requirement: 0,
			planned_release_of_the_order: 0
		});
	});

	test('week 2', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 2);
		expect(week).toEqual<Output>({
			week: 2,
			gross_requirement: 100,
			programed_recepcion: 0,
			availbility_proyection: 25,
			net_requirement: 0,
			planned_release_of_the_order: 0
		});
	});

	test('week 3', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 3);
		expect(week).toEqual<Output>({
			week: 3,
			gross_requirement: 0,
			programed_recepcion: 0,
			availbility_proyection: 25,
			net_requirement: 0,
			planned_release_of_the_order: 35
		});
	});

	test('week 4', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 4);
		expect(week).toEqual<Output>({
			week: 4,
			gross_requirement: 60,
			programed_recepcion: 0,
			availbility_proyection: 0,
			net_requirement: 35,
			planned_release_of_the_order: 50
		});
	});

	test('week 5', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 5);
		expect(week).toEqual<Output>({
			week: 5,
			gross_requirement: 50,
			programed_recepcion: 0,
			availbility_proyection: 0,
			net_requirement: 50,
			planned_release_of_the_order: 0
		});
	});

	test('week 6', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 6);
		expect(week).toEqual<Output>({
			week: 6,
			gross_requirement: 0,
			programed_recepcion: 0,
			availbility_proyection: 0,
			net_requirement: 0,
			planned_release_of_the_order: 40
		});
	});

	test('week 7', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 7);
		expect(week).toEqual<Output>({
			week: 7,
			gross_requirement: 40,
			programed_recepcion: 0,
			availbility_proyection: 0,
			net_requirement: 40,
			planned_release_of_the_order: 55
		});
	});

	test('week 8', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 8);
		expect(week).toEqual<Output>({
			week: 8,
			gross_requirement: 55,
			programed_recepcion: 0,
			availbility_proyection: 0,
			net_requirement: 55,
			planned_release_of_the_order: 0
		});
	});
});
