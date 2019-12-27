import { useCallback, useState } from 'react';
import { createInitialStructure, getNeighbours } from '../helpers/structure';
import { ICell } from '../interfaces/ICell';

const useCellSimulator = (size: number) => {
    const initialCellArray: ICell[] = createInitialStructure(size);
    const [ cellArray, setCellArray ] = useState(initialCellArray);
    const [ stepCount, setStepCount ] = useState(0);
    
    // useCallabck is used to increase performance, doesn't redraw cells unless reset button has been pressed
    const handleCellClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        const selectedId: number = parseInt(e.currentTarget.id);
        const updatedArray: ICell[] = [ ...cellArray ];
        const selectedCell: ICell | undefined = updatedArray.find(cell => cell.id === selectedId);

        if (selectedCell) {
            selectedCell.isAlive = !selectedCell.isAlive;
        }

        setCellArray(updatedArray);
    }, [stepCount]);

    const handleStart = () => {
        const liveCellIds: number[] = [];

        cellArray.forEach(cell => {
            const neighbours = getNeighbours(cell.id, size);
            const liveNeighbours = cellArray.filter(cell => cell.isAlive && neighbours.indexOf(cell.id) > -1);
            
            if (cell.isAlive) {
                if (liveNeighbours.length >= 2 && liveNeighbours.length <= 3) {
                    liveCellIds.push(cell.id);
                }
            }
            else {
                if (liveNeighbours.length === 3) {
                    liveCellIds.push(cell.id);
                }
            }
        });

        const updatedArray: ICell[] = [ ...cellArray ];
        updatedArray.map(cell => cell.isAlive = (liveCellIds.indexOf(cell.id) > -1));

        setCellArray(updatedArray);
        setStepCount(count => count + 1);
    }
    
    const handleReset = () => {
        setCellArray(initialCellArray);
        setStepCount(count => count + 1);
    }

    return {
        cellArray,
        handleCellClick,
        handleStart,
        handleReset,
    };
}

export default useCellSimulator;