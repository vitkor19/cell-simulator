import * as React from 'react';
import { ICell } from '../interfaces/ICell';

const Cell = (props: ICell) => {
    // console.log('cell draw');
    return (
        <div
            id={`${props.id}`}
            data-x={props.x}
            data-y={props.y}
            className={`flex-grid${(props.isAlive ? ' alive' : '')}`}
            onClick={props.onClick}
        />
    );
}

export default React.memo(Cell);
