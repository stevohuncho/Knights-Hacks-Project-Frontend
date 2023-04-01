import React from "react";
import { TouchableOpacity, Text, } from 'react-native';

import { myStyles } from "../styling/GlobalStyles";

export const Button = ({ title, onPress, }) => {
    return (
        <TouchableOpacity style={myStyles.button} onPress={onPress}>
            <Text style={myStyles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}
