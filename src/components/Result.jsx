import { Text, View } from "react-native"
import { myStyles } from "../styling/GlobalStyles"

export const Result = ({ Restaurant, Distance, Price }) => {
    return (
        <View style={myStyles.result}>
            <Text style={myStyles.restaurant}>{Restaurant}</Text>
            <Text style={myStyles.details}>{Distance} miles ({Price})</Text>
        </View>
    );
}