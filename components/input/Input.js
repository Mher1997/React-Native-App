import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';


const Input = props => {
    const [value, onChangeValue] = useState('');
    return(
        <TextInput
            value={value}
            style={styles.textInput}
            onChange={onChangeValue}
            {...props}
        />
    )
};

const styles = StyleSheet.create({
    textInput: {
        borderColor: '#A7C5C8',
        backgroundColor: '#FFFFFF',
        opacity: 0.9,
        color: 'black',
        borderWidth: 0,
        height: 40,
        paddingLeft: 7,
        marginBottom: 35,
        fontSize: 18
    }
});

export default Input;