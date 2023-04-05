import { Text, View, Image } from 'react-native';
import { myStyles } from '../styling/GlobalStyles';
import { Button } from './Button';


export const HomeScreen = ({ navigation }) => {
    return (
        <View style={myStyles.screen}>
            <Image style={myStyles.logo} source={require("../../assets/logo.png")} accessibilityLabel={"logo"} />
            <Button
                style={myStyles.button}
                title="Get Started!"
                onPress={() => navigation.navigate("Search")}
            />
        </View>
    );
}