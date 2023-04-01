import { Text, View, } from 'react-native';
import { myStyles } from '../styling/GlobalStyles';
import { Button } from './Button';
import { Result } from './Result';


export const ResultScreen = ({ navigation }) => {
    return (
        <View style={myStyles.screen}>
            <Text style={myStyles.text}>Result Screen</Text>
            <Result Restaurant={"Chilli's"} Distance={"13"} Price={"$$"} />
            <View style={myStyles.buttonRow}>
                <Button title="Go back" onPress={() => navigation.goBack()} />
                <Button title="Spin the Wheel!" onPress={() => navigation.navigate('Wheel')} />
            </View>
        </View >
    );
}