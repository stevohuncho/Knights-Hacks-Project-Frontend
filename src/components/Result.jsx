import { Text, View } from "react-native"
import { myStyles } from "../styling/GlobalStyles"

import FontAwesome from "@expo/vector-icons/FontAwesome"

export const Result = ({ Restaurant, Distance, Price, Rating }) => {
    return (
        <View style={myStyles.result}>
            <View style={myStyles.resultCol}>
                <Text style={myStyles.restaurant}>{Restaurant}</Text>
                <Text style={myStyles.price}>({Price})</Text>
            </View>

            <View style={myStyles.resultCol}>
                <Text style={myStyles.details}>{Distance} miles </Text>
                <Text style={myStyles.price}>{Rating} <FontAwesome name="star" size={20} color="#000"/></Text>
            </View>
        </View>
    );
}