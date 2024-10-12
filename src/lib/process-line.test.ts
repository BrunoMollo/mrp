import { process_line, type ElemntTableLine, type MasterMaterialLine } from '$lib';
import { describe, expect, test } from 'vitest';

describe('process_line: small details', () => {
	test('assign gross_requirement 1', () => {
		const master_material_files = [
			{
				element: 'A',
				availbility: 75,
				wait_time_weeks: 1,
				batch_size: 'Batch to Batch',
				programed_recepcions: [{ week: 1, amount: 50 }],
				security_stock: 0
			}
		] satisfies MasterMaterialLine[];

		const res: Partial<ElemntTableLine>[] = process_line(
			master_material_files[0],
			[{ week: 1, amount: 50 }],
			2
		).map((x) => ({
			week: x.week,
			gross_requirement: x.gross_requirement
		}));

		expect(res).toEqual([
			{ week: 1, gross_requirement: 50 },
			{ week: 2, gross_requirement: 0 }
		]);
	});

	test('assign gross_requirement 2', () => {
		const master_material_files = [
			{
				element: 'A',
				availbility: 75,
				wait_time_weeks: 1,
				batch_size: 'Batch to Batch',
				programed_recepcions: [{ week: 1, amount: 50 }],
				security_stock: 0
			}
		] satisfies MasterMaterialLine[];

		const res: Partial<ElemntTableLine>[] = process_line(master_material_files[0], [], 4).map(
			(x) => ({
				week: x.week,
				gross_requirement: x.gross_requirement
			})
		);

		expect(res).toEqual([
			{ week: 1, gross_requirement: 0 },
			{ week: 2, gross_requirement: 0 },
			{ week: 3, gross_requirement: 0 },
			{ week: 4, gross_requirement: 0 }
		]);
	});

	test('assign programed_recepcions 1', () => {
		const line = {
			element: 'A',
			availbility: 75,
			wait_time_weeks: 1,
			batch_size: 'Batch to Batch',
			programed_recepcions: [{ week: 1, amount: 50 }],
			security_stock: 0
		} satisfies MasterMaterialLine;

		const res = process_line(line, [{ week: 1, amount: 50 }], 4).map(
			({ week, programed_recepcions }) => ({
				week,
				programed_recepcions
			})
		);

		expect(res).toEqual([
			{ week: 1, programed_recepcions: 50 },
			{ week: 2, programed_recepcions: 0 },
			{ week: 3, programed_recepcions: 0 },
			{ week: 4, programed_recepcions: 0 }
		]);
	});

	test('assign programed_recepcions 2', () => {
		const line = {
			element: 'A',
			availbility: 75,
			wait_time_weeks: 1,
			batch_size: 'Batch to Batch',
			programed_recepcions: [{ week: 3, amount: 100 }],
			security_stock: 0
		} satisfies MasterMaterialLine;

		const res = process_line(line, [], 5).map(({ week, programed_recepcions }) => ({
			week,
			programed_recepcions
		}));

		expect(res).toEqual([
			{ week: 1, programed_recepcions: 0 },
			{ week: 2, programed_recepcions: 0 },
			{ week: 3, programed_recepcions: 100 },
			{ week: 4, programed_recepcions: 0 },
			{ week: 5, programed_recepcions: 0 }
		]);
	});

	test('assign programed_recepcions 3', () => {
		const line = {
			element: 'A',
			availbility: 75,
			wait_time_weeks: 1,
			batch_size: 'Batch to Batch',
			programed_recepcions: [
				{ week: 2, amount: 40 },
				{ week: 5, amount: 40 }
			],
			security_stock: 0
		} satisfies MasterMaterialLine;

		const res = process_line(line, [{ week: 3, amount: 100 }], 5).map(
			({ week, programed_recepcions }) => ({
				week,
				programed_recepcions
			})
		);

		expect(res).toEqual([
			{ week: 1, programed_recepcions: 0 },
			{ week: 2, programed_recepcions: 40 },
			{ week: 3, programed_recepcions: 0 },
			{ week: 4, programed_recepcions: 0 },
			{ week: 5, programed_recepcions: 40 }
		]);
	});
});

describe('process_line: full exmaple youtube', () => {
	//Link : https://www.youtube.com/watch?v=oaIsq2NPk_4
	const master_material_files = [
		{
			element: 'A',
			availbility: 75,
			wait_time_weeks: 1,
			batch_size: 'Batch to Batch',
			programed_recepcions: [{ week: 1, amount: 50 }],
			security_stock: 0
		}
	] satisfies MasterMaterialLine[];

	const gross_requirements = [
		{ week: 2, amount: 100 },
		{ week: 4, amount: 60 },
		{ week: 5, amount: 50 },
		{ week: 7, amount: 40 },
		{ week: 8, amount: 55 }
	];

	test('week 1', () => {
		const res = process_line(master_material_files[0], gross_requirements, 8);
		const week = res.find((x) => x.week === 1);
		expect(week).toEqual({
			week: 1,
			gross_requirement: 0,
			programed_recepcions: 50,
			availbility_proyection: 125,
			net_requirement: 0,
			planned_release_of_the_order: 0
		});
	});

	test('week 2', () => {
		const res = process_line(master_material_files[0], gross_requirements, 8);
		const week = res.find((x) => x.week === 2);
		expect(week).toEqual({
			week: 2,
			gross_requirement: 100,
			programed_recepcions: 0,
			availbility_proyection: 25,
			net_requirement: 0,
			planned_release_of_the_order: 0
		});
	});

	test('week 3', () => {
		const res = process_line(master_material_files[0], gross_requirements, 8);
		const week = res.find((x) => x.week === 3);
		expect(week).toEqual({
			week: 3,
			gross_requirement: 0,
			programed_recepcions: 0,
			availbility_proyection: 25,
			net_requirement: 0,
			planned_release_of_the_order: 35
		});
	});

	test('week 4', () => {
		const res = process_line(master_material_files[0], gross_requirements, 8);
		const week = res.find((x) => x.week === 4);
		expect(week).toEqual({
			week: 4,
			gross_requirement: 60,
			programed_recepcions: 0,
			availbility_proyection: 0,
			net_requirement: 35,
			planned_release_of_the_order: 50
		});
	});

	test('week 5', () => {
		const res = process_line(master_material_files[0], gross_requirements, 8);
		const week = res.find((x) => x.week === 5);
		expect(week).toEqual({
			week: 5,
			gross_requirement: 50,
			programed_recepcions: 0,
			availbility_proyection: 0,
			net_requirement: 50,
			planned_release_of_the_order: 0
		});
	});

	test('week 6', () => {
		const res = process_line(master_material_files[0], gross_requirements, 8);
		const week = res.find((x) => x.week === 6);
		expect(week).toEqual({
			week: 6,
			gross_requirement: 0,
			programed_recepcions: 0,
			availbility_proyection: 0,
			net_requirement: 0,
			planned_release_of_the_order: 40
		});
	});

	test('week 7', () => {
		const res = process_line(master_material_files[0], gross_requirements, 8);
		const week = res.find((x) => x.week === 7);
		expect(week).toEqual({
			week: 7,
			gross_requirement: 40,
			programed_recepcions: 0,
			availbility_proyection: 0,
			net_requirement: 40,
			planned_release_of_the_order: 55
		});
	});

	test('week 8', () => {
		const res = process_line(master_material_files[0], gross_requirements, 8);
		const week = res.find((x) => x.week === 8);
		expect(week).toEqual({
			week: 8,
			gross_requirement: 55,
			programed_recepcions: 0,
			availbility_proyection: 0,
			net_requirement: 55,
			planned_release_of_the_order: 0
		});
	});
});
