This project demonstates cell simulation, how new cells are born and old cells die depending on the below logic:

When the next generation is running:
* A Cell with fewer than two live neighbours dies of under-population.
* A Cell with 2 or 3 live neighbours lives on to the next generation.
* A Cell with more than 3 live neighbours dies of overcrowding.
* An empty Cell with exactly 3 live neighbours 'comes to life'.
* A Cell who 'comes to life' outside the board should wrap at the other side of the board.

Initial board has 3 buttons: 
* 'NEXT GENERATION' - triggers next generation manually
* 'SIMULATE' - starts simulation and triggers next generation automatically every half a second
* 'RESET' - clears the board, also stops simulation

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
