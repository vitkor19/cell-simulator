import { ICell } from "../interfaces/ICell";

// creates initial square board with size being width and height
export function createInitialStructure(size: number): ICell[] {
    const maxCellId: number = size * size;
    const cellArray: ICell[] = [];
    let yAxis: number = 0;

    for (let count = 0; count < maxCellId; count++) {
        if (count > 0 && count % size === 0) {
            yAxis++;
        }

        cellArray.push({
            id: count,
            x: count % size,
            y: yAxis,
            isAlive: false,
        });
    }

    return cellArray;
}

export function getNeighbours(id: number, size: number): number[] {
    const mod: number = id % size;
    const isFirstColumn: boolean = (mod === 0);
    const isLastColumn: boolean = (mod === (size - 1));
    const isFirstRow: boolean = (id < size);
    const isLastRow: boolean = (id >= (size * size - size));

    // console.log(`id: ${id}, isFirstColumn: ${isFirstColumn}, isLastColumn: ${isLastColumn}, isFirstRow: ${isFirstRow}, isLastRow: ${isLastRow}`);

    if (isFirstColumn) {
        if (isFirstRow) {
            return [1, size, size + 1, size - 1, 2 * size - 1, size * size - 1, size * (size - 1), size * (size - 1) + 1];
        }
        else if (isLastRow) {
            return [0, 1, id - size, id - size + 1, id + 1, size - 1, size * size - 1, size * (size -  1) - 1];
        }
        else {
            return [id - size, id - size + 1, id + 1, id + size, id + size + 1, id - 1, id + size - 1, 2 * size + id - 1];
        }
    }
    else if (isLastColumn) {
        if (isFirstRow) {
            return [id - 1, id + size, id + size - 1, 0, id + 1, size * size - 1, size * size - 2, size * (size - 1)];
        }
        else if (isLastRow) {
            return [0, size - 1, size - 2, id - 1, id - size, id - size - 1, size * (size - 1), size * (size - 2)];
        }
        else {
            return [id - size, id - size - 1, id - 1, id + size, id + size - 1, id + 1, id - size + 1, id - (2 * size) + 1];
        }
    }
    else if (isFirstRow) {
        const lastColumnStart: number = size * (size - 1);
        return [id - 1, id + size - 1, id + size, id + size + 1, id + 1, lastColumnStart + id, lastColumnStart + id + 1, lastColumnStart + id - 1];
    }
    else if (isLastRow) {
        const lastColumnStart: number = size * (size - 1);
        return [id - 1, id - size - 1, id - size, id - size + 1, id + 1, id - lastColumnStart, id - lastColumnStart - 1, id - lastColumnStart + 1];
    }
    
    return [id - size - 1, id - size, id - size + 1, id - 1, id + 1, id + size - 1, id + size, id + size + 1];
}