import { useCallback, useState } from 'react';
import { createInitialStructure, getNeighbours } from '../helpers/structure';
import { ICell } from '../interfaces/ICell';

const useCellSimulator = (size: number, speed: number) => {
    const initialCellArray: ICell[] = createInitialStructure(size);
    
    const [ cellArray, setCellArray ] = useState<ICell[]>(initialCellArray);
    const [ stepCount, setStepCount ] = useState<number>(0);
    const [ simulation, setSimulation ] = useState<NodeJS.Timeout>();

    const stopSimulation = () => {
        if (simulation) {
            clearInterval(simulation);
            setSimulation(undefined);
        }
    }
    
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

    const handleNextGeneration = () => {
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
    
    const handleReset = (cells: ICell[] | undefined) => {
        setCellArray(cells ? cells : initialCellArray);
        setStepCount(count => count + 1);
        stopSimulation();
    }

    const handleSimulate = () => {
        stopSimulation();
        setSimulation(setInterval(handleNextGeneration, speed));
    }

    return {
        cellArray,
        handleCellClick,
        handleNextGeneration,
        handleSimulate,
        handleReset,
    };
}

export default useCellSimulator;