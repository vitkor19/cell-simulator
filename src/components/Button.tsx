import * as React from 'react';
import { IButton } from '../interfaces/IButton';
import Button from '@material-ui/core/Button';

const Header = (props: IButton) => {
    return (
        <Button
            className={props.className}
            variant={'outlined'}
            color={props.color}
            onClick={props.onClick}
        >
            {props.text}
        </Button>
    );
}

export default React.memo(Header);
