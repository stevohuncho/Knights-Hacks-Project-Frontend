import { Text, View, } from 'react-native';
import { myStyles } from '../styling/GlobalStyles';
import { Button } from './Button';

export const WheelScreen = ({ navigation }) => {
    return (
        <View style={myStyles.screen}>
            <Text style={myStyles.text}>Wheel</Text>
            <View style={myStyles.buttonRow}>
                <Button title="Go back" onPress={() => navigation.goBack()} />
                <Button title="Go to Search" onPress={() => navigation.navigate('Search')} />
            </View>
        </View>
    );
}