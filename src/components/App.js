import React, { Component } from 'react'
import Game from './Game'

class App extends Component {
	state = {
		gameId: 1
	}

	resetGame = () => {
		this.setState((prevState) => {
			return { gameId: prevState.gameId + 1 }
		})
	}
	render() {
		return (
			<Game
				randomnNumberCount={6}
				initialSeconds={10}
				key={this.state.gameId}
				onPlayAgain={this.resetGame}
			/>
		);
	}
}

export default App;