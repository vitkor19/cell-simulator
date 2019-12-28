import { createInitialStructure, getNeighbours } from './structure';
import { ICell } from "../interfaces/ICell";

const size: number = 15;

test('create structure works properly', () => {
    const cells: ICell[] = createInitialStructure(size);
    expect(cells.length).toBe(size * size);
});

test('checks if all cells return 8 neighbours', () => {
    let allHaveEight: boolean = true;
    for (let count = 0; count < size * size; count++) {
        if (getNeighbours(count, size).length !== 8) {
            allHaveEight = false;
        }
    }
    expect(allHaveEight).toBeTruthy();
});

test('checks if cell in the midlle of the grid returns correct neighbours', () => {
    const neighbours: number[] = getNeighbours(Math.floor((size * size) / 2), size);
    expect(neighbours.sort((a, b) => a - b)).toEqual([96, 97, 98, 111, 113, 126, 127, 128]);
});

// below tests are checking if neighbours outside the boundary of the board are wrapping on to the other side
test('checks if correct neighbours are displayed for cell 0,0 - top left cell', () => {
    const neighbours: number[] = getNeighbours(0, size);
    expect(neighbours.sort((a, b) => a - b)).toEqual([1, 14, 15, 16, 29, 210, 211, 224]);
});

test('checks if correct neighbours are displayed for cell 14,0 - top right cell', () => {
    const neighbours: number[] = getNeighbours(size - 1, size);
    expect(neighbours.sort((a, b) => a - b)).toEqual([0, 13, 15, 28, 29, 210, 223, 224]);
});

test('checks if correct neighbours are displayed for cell 0, 14 - bottom left cell', () => {
    const neighbours: number[] = getNeighbours(size * size - size, size);
    expect(neighbours.sort((a, b) => a - b)).toEqual([0, 1, 14, 195, 196, 209, 211, 224]);
});

test('checks if correct neighbours are displayed for cell 14, 14 - bottom right cell', () => {
    const neighbours: number[] = getNeighbours(size * size - 1, size);
    expect(neighbours.sort((a, b) => a - b)).toEqual([0, 13, 14, 195, 208, 209, 210, 223]);
});
