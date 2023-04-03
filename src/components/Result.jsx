import { Text, View } from "react-native"
import { myStyles } from "../styling/GlobalStyles"

export const Result = ({ Restaurant, Distance, Price }) => {
    return (
        <View style={myStyles.result}>
            <View style={myStyles.resultTitle}>
                <Text style={myStyles.restaurant}>{Restaurant}</Text>
                <Text>({Price})</Text>
            </View>

            <Text style={myStyles.details}>{Distance} miles </Text>
        </View>
    );
}