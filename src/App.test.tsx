import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('checks if cell container has 225 children, board size 15 by 15', () => {
  const { getByTitle } = render(<App />);
  const cellContainer = getByTitle('cell-container');
  expect(cellContainer.childNodes.length).toBe(225);
});
