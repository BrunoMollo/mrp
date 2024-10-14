import { processData, type Input, type Output } from '../src/index';
import { describe, expect, test } from 'vitest';

describe('extra example: Multiple Batches', () => {
	// Semana	1	2	3	4	5	6
	// Requeriminetos Brutos	0	150	0	120	0	100
	// Recepciones Programadas	0	0	0	0	10	0
	// Proyeccion de disponibilidad	0	0	0	30	40	40
	// Requeriminetos Netos	0	150	0	120	0	60
	// Liberacion Planificada del Pedido	150	0	150	0	100	0

	const input = {
		weeks: 6,
		availbility: 0,
		wait_time_weeks: 1,
		batch_size: 50,
		gross_requirements: [0, 150, 0, 120, 0, 100],
		programed_recepcions: [0, 0, 0, 0, 10, 0],
		security_stock: 0
	} satisfies Input;

	test('week 1', () => {
		const res = processData(input);
		const week = res.find((x) => x.week === 1);
		expect(week).toEqual<Output>({
			week: 1,
			gross_requirement: 0,
			programed_recepcion: 0,
			availbility_proyection: 0,
			net_requirement: 0,
			planned_release_of_the_order: 150
		});
	});

	test('week 2', () => {
		const week = 2;
		const res = processData(input);
		const col = res.find((x) => x.week === week);
		expect(col).toEqual<Output>({
			week,
			gross_requirement: 150,
			programed_recepcion: 0,
			availbility_proyection: 0,
			net_requirement: 150,
			planned_release_of_the_order: 0
		});
	});

	test('week 3', () => {
		const week = 3;
		const res = processData(input);
		const col = res.find((x) => x.week === week);
		expect(col).toEqual<Output>({
			week,
			gross_requirement: 0,
			programed_recepcion: 0,
			availbility_proyection: 0,
			net_requirement: 0,
			planned_release_of_the_order: 150
		});
	});

	test('week 4', () => {
		const week = 4;
		const res = processData(input);
		const col = res.find((x) => x.week === week);
		expect(col).toEqual<Output>({
			week,
			gross_requirement: 120,
			programed_recepcion: 0,
			availbility_proyection: 30,
			net_requirement: 120,
			planned_release_of_the_order: 0
		});
	});

	test('week 5', () => {
		const week = 5;
		const res = processData(input);
		const col = res.find((x) => x.week === week);
		expect(col).toEqual<Output>({
			week,
			gross_requirement: 0,
			programed_recepcion: 10,
			availbility_proyection: 40,
			net_requirement: 0,
			planned_release_of_the_order: 100
		});
	});

	test('week 6', () => {
		const week = 6;
		const res = processData(input);
		const col = res.find((x) => x.week === week);
		expect(col).toEqual<Output>({
			week,
			gross_requirement: 100,
			programed_recepcion: 0,
			availbility_proyection: 40,
			net_requirement: 60,
			planned_release_of_the_order: 0
		});
	});
});
