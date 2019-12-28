import React from 'react';
import { Button, Cell } from './components';
import { ICell } from './interfaces/ICell';
import useCellSimulator from './hooks/useCellSimulator';

import './styles/main.scss';

const App: React.FC = () => {
  const gridSize: number = 15;
  const { cellArray, handleCellClick, handleNextGeneration, handleSimulate, handleReset } = useCellSimulator(gridSize);

  return (
    <div className="cell-simulator">
      <header>
        <h3>Cell Simulator</h3>
      </header>
      <section>
        <div className="flex-grid-container">
          {cellArray && cellArray.map((cell: ICell) => {
            return (
              <Cell
                key={cell.id}
                id={cell.id}
                isAlive={cell.isAlive}
                x={cell.x}
                y={cell.y}
                onClick={handleCellClick}
              />
            )
          })}
        </div>
        <Button
          text="Next Generation"
          color={'primary'}
          onClick={handleNextGeneration}
        />
        &nbsp;
        <Button
          text="Simulate"
          color={'primary'}
          onClick={handleSimulate}
        />
        &nbsp;
        <Button
          text="Reset"
          color={'secondary'}
          onClick={handleReset}
        />
      </section>
    </div>
  );
}

export default App;
