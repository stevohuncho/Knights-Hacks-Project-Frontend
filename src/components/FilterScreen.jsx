import { useState, useEffect } from 'react';
import { Text, TextInput, View, } from 'react-native';

import * as Location from "expo-location"

import { myStyles } from '../styling/GlobalStyles';
import { myColors } from '../styling/MyColors';
import { Button } from './Button';
import Slider from '@react-native-community/slider';

export const FilterScreen = ({ navigation }) => {

    const [location, setLocation] = useState();
    const [miles, setMiles] = useState(0);
    const [value, setValue] = useState(0);
    const dollars = ["$", "$$", "$$$", "$$$$"]

    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Please grant location permissions");
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            console.log("Location:");
            console.log(currentLocation);
        };
        getPermissions();
    }, []);

    return (
        <View style={myStyles.screen}>
            <Text style={myStyles.text}>Filter Screen</Text>
            <View>
                <View style={myStyles.price}>
                    <Text style={myStyles.priceText}>Mile Range: {Math.floor(miles * 20) * 5}</Text>
                    <Slider
                        style={{ width: 300, height: 60 }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor={myColors.brown}
                        maximumTrackTintColor={myColors.tan}
                        thumbTintColor={myColors.green}
                        onValueChange={(mil) => setMiles(mil)}
                    />
                </View>

                <View style={myStyles.price}>
                    <Text style={myStyles.priceText}>Price Range: {dollars[Math.floor(value * 3)]}</Text>
                    <Slider
                        style={{ width: 300, height: 60 }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor={myColors.brown}
                        maximumTrackTintColor={myColors.tan}
                        thumbTintColor={myColors.green}
                        onValueChange={(val) => setValue(val)}
                    />
                </View>
            </View>


            <Button title="See Results" onPress={() => navigation.navigate('Results')} />
        </View>
    );
}
