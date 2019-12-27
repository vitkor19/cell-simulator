export interface ICell {
    id: number,
    x: number,
    y: number,
    isAlive: boolean,
    onClick?: (event: React.MouseEvent<HTMLElement>) => void,
}
