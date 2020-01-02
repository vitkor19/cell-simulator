import React, { useState } from 'react';
import { Button, Cell } from './components';
import { ICell } from './interfaces/ICell';
import useCellSimulator from './hooks/useCellSimulator';
import { Typography, Slider } from '@material-ui/core';
import { createInitialStructure } from './helpers/structure';

import './styles/main.scss';

const App: React.FC = () => {
  const [ size, setSize ] = useState<number>(15);
  const [ speed, setSpeed ] = useState<number>(300);
  const { cellArray, handleCellClick, handleNextGeneration, handleSimulate, handleReset } = useCellSimulator(size, speed);
  
  const handleSizeChange = (newSize: number) => {
    if (size === newSize) return;
    
    setSize(newSize);
    handleReset(createInitialStructure(newSize));
  }

  return (
    <div className="cell-simulator">
      <header>
        <h3>Cell Simulator</h3>
      </header>
      <div className="settings-container">
        <div className="slider">
          <Typography gutterBottom>
            Dimensions
          </Typography>
          <Slider
            min={3}
            max={30}
            defaultValue={15}
            valueLabelDisplay={"auto"}
            onChange={(e, value) => (Array.isArray(value) ? handleSizeChange(value[0]) : handleSizeChange(value))}
          />
        </div>

        <div className="slider">
          <Typography gutterBottom>
            Simulation Speed (ms)
          </Typography>
          <Slider
            min={50}
            max={1000}
            defaultValue={speed}
            valueLabelDisplay={"auto"}
            onChange={(e, value) => (Array.isArray(value) ? setSpeed(value[0]) : setSpeed(value))}
          />
        </div>

        <Button
          text="Next Generation"
          color={"primary"}
          onClick={handleNextGeneration}
        />
        <Button
          text="Simulate"
          color={"primary"}
          onClick={handleSimulate}
        />
        <Button
          text="Reset"
          color={"secondary"}
          onClick={e => handleReset(undefined)}
        />
      </div>
      <div title="cell-container" className="flex-grid-container" style={{'width': `${size * 2}rem`, 'height': `${size * 2}rem`}}>
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
    </div>
  );
}

export default App;
