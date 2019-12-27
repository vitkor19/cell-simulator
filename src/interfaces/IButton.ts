import { PropTypes } from '@material-ui/core/index';

export interface IButton {
    text: string,
    color?: PropTypes.Color,
    className?: string;
    onClick: (event: React.MouseEvent<HTMLElement>) => void,
}
