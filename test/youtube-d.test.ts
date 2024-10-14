import { processData, type Input, type Output } from '../src/index';
import { describe, expect, test } from 'vitest';

describe('example youtube: D', () => {
	//Link : https://www.youtube.com/watch?v=oaIsq2NPk_4
	const input = {
		weeks: 8,
		availbility: 110,
		wait_time_weeks: 2,
		batch_size: 350,
		programed_recepcions: [0, 200, 0, 0, 0, 0, 0, 0],
		gross_requirements: [0, 300, 0, 0, 300, 300, 0, 0],
		security_stock: 0
	} satisfies Input;

	test('week 1', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 1);
		expect(week).toEqual<Output>({
			week: 1,
			gross_requirement: 0,
			programed_recepcion: 0,
			availbility_proyection: 110,
			net_requirement: 0,
			planned_release_of_the_order: 0
		});
	});

	test('week 2', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 2);
		expect(week).toEqual<Output>({
			week: 2,
			gross_requirement: 300,
			programed_recepcion: 200,
			availbility_proyection: 10,
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
			availbility_proyection: 10,
			net_requirement: 0,
			planned_release_of_the_order: 350
		});
	});

	test('week 4', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 4);
		expect(week).toEqual<Output>({
			week: 4,
			gross_requirement: 0,
			programed_recepcion: 0,
			availbility_proyection: 10,
			net_requirement: 0,
			planned_release_of_the_order: 350
		});
	});

	test('week 5', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 5);
		expect(week).toEqual<Output>({
			week: 5,
			gross_requirement: 300,
			programed_recepcion: 0,
			availbility_proyection: 60,
			net_requirement: 290,
			planned_release_of_the_order: 0
		});
	});

	test('week 6', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 6);
		expect(week).toEqual<Output>({
			week: 6,
			gross_requirement: 300,
			programed_recepcion: 0,
			availbility_proyection: 110,
			net_requirement: 240,
			planned_release_of_the_order: 0
		});
	});

	test('week 7', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 7);
		expect(week).toEqual<Output>({
			week: 7,
			gross_requirement: 0,
			programed_recepcion: 0,
			availbility_proyection: 110,
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
			availbility_proyection: 110,
			net_requirement: 0,
			planned_release_of_the_order: 0
		});
	});
});
