
import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import propTypes from 'prop-types'
import RandomNumber from './RandomNumebr'
import shuffle from 'lodash.shuffle'

class App extends Component {

    static propTypes = {
        randomnNumberCount: propTypes.number.isRequired,
        initialSeconds: propTypes.number.isRequired,
        onPlayAgain:propTypes.func.isRequired
    }

    state = {
        selectedIds: [],
        remainingSeconds: this.props.initialSeconds
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState((prevState) => {

                return { remainingSeconds: prevState.remainingSeconds - 1 }
            }, () => {
                if (this.state.remainingSeconds === 0) {
                    clearInterval(this.intervalId)
                }
            })

        }, 1000)
    }

    componentWillUpdate(nextProps, nextState) {

        if (nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0) {
            this.gameStatus = this.calcgameStatus(nextState)
            if (this.gameStatus !== 'PLAYING') {
                clearInterval(this.intervalId)
            }
        }

    }



    isNumberSelected = (numberIndex) => {
        return this.state.selectedIds.indexOf(numberIndex) >= 0
    }


    selectNumebr = (numberIndex) => {
        this.setState((prevState) => ({
            selectedIds: [...prevState.selectedIds, numberIndex],
        }))
    }

    calcgameStatus = (nextState) => {
        const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
            return acc + this.shuffleRandomNumbers[curr]
        }, 0)
        if (nextState.remainingSeconds === 0) {
            return 'LOST'
        }
        if (sumSelected < this.target) {
            return 'PLAYING'
        }
        if (sumSelected === this.target) {
            return 'WON'
        } if (sumSelected > this.target) {
            return 'LOST'
        }


    }


    gameStatus = "PLAYING"

    //make random numbers
    shuffleRandomNumbers = Array.from({
        length: this.props.randomnNumberCount
    }).map(() => 1 + Math.floor(10 * Math.random()))

    target = this.shuffleRandomNumbers.slice(0, this.props.randomnNumberCount - 2)
        .reduce((acc, curr) =>
            acc + curr, 0
        )

    shuffleRandomNumbers = shuffle(this.shuffleRandomNumbers)

    render() {
        const gameStatus = this.gameStatus
        return (
            <View style={styles.container}>
                <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
                    {this.target}
                </Text>
                <View style={styles.randomContainer}>
                    {this.shuffleRandomNumbers.map((randomNumber, index) =>
                        <RandomNumber
                            key={index}
                            id={index}
                            number={randomNumber}
                            isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'}
                            onPress={this.selectNumebr}
                        />
                    )}
                </View>

                <Button
                    title = 'Play again'
                    onPress = {this.props.onPlayAgain}

                />

                <Text style={styles.target}>
                    {this.state.remainingSeconds}
                </Text>

                <Text style={styles.target}>
                    {gameStatus}
                </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gainsboro',
        flex: 1,
        paddingTop: 30,

    },
    target: {
        fontSize: 40,
        backgroundColor: 'darkgray',
        marginHorizontal: 50,
        textAlign: 'center',
        marginVertical: 25,

    },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginVertical: 25,

    },

    STATUS_PLAYING: {
        backgroundColor: 'darkgray',
    },
    STATUS_WON: {
        backgroundColor: 'green',
    },
    STATUS_LOST: {
        backgroundColor: 'red',
    },
})

export default App;