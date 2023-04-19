import { Text, TouchableOpacity, View } from "react-native"
import { myStyles } from "../styling/GlobalStyles"

import FontAwesome from "@expo/vector-icons/FontAwesome"
import { myColors } from "../styling/MyColors";
import { useState } from "react";
/*import { readDb, writeDb } from "../db/dbFunctions";*/

export const Result = ({ Restaurant, Distance, Price, Rating }) => {
    const [pressed, setPressed] = useState(false);
    const press = () => {
        setPressed(!pressed);
        //writeDb(Restaurant);
        //readDb();
    }
    return (
        <TouchableOpacity style={[myStyles.result, { backgroundColor: pressed ? myColors.liGreen : myColors.white }]}
            onPress={press}>
            <View style={myStyles.resultCol}>
                <Text style={myStyles.restaurant}>{Restaurant}</Text>
                <Text style={myStyles.price}>({Price})</Text>
            </View>

            <View style={myStyles.resultCol}>
                <Text style={myStyles.details}>{Distance} miles </Text>
                <Text style={myStyles.price}>{Rating} <FontAwesome name="star" size={20} color="#000" /></Text>
            </View>
        </TouchableOpacity>
    );
}