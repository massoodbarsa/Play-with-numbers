import React, { Component } from 'react';
import propTypes from 'prop-types'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

class RandomNumebr extends Component {
    static propTypes = {
        id: propTypes.number.isRequired,
        number: propTypes.number.isRequired,
        isDisabled: propTypes.bool.isRequired,
        onPress: propTypes.func.isRequired
    }

    //press the buttons
    handlePress = () => {
        if (this.props.isDisabled) { return }

        this.props.onPress(this.props.id)
    }

    render() {
        return (
            <TouchableOpacity onPress={this.handlePress}>
                <Text style={[styles.random, this.props.isDisabled && styles.disabled]}>{this.props.number}</Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    random: {
        backgroundColor: 'lightslategray',
        marginHorizontal: 15,
        width: 100,
        marginVertical: 25,
        textAlign: 'center',
        fontSize: 35
    },
    disabled: {
        opacity: 0.3
    },
})
export default RandomNumebr;