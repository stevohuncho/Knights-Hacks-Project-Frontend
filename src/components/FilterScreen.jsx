import { useState, useEffect } from 'react';
import { Text, View, } from 'react-native';

import * as Location from "expo-location"

import { myStyles } from '../styling/GlobalStyles';
import { myColors } from '../styling/MyColors';
import { Button } from './Button';
import Slider from '@react-native-community/slider';

let pr
let loc
let mi
export const FilterScreen = ({ navigation }) => {
    const [location, setLocation] = useState();
    const [miles, setMiles] = useState(0);
    const [value, setValue] = useState(1);
    const dollars = ["","$", "$$", "$$$", "$$$$"]


    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Please grant location permissions");
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            console.log("Location to be set: " + currentLocation)
            setLocation(currentLocation);
            console.log("Location set: " + location)
        };
        getPermissions();
    }, []);

    return (
        <View style={myStyles.screen}>
            <View>
                <View>
                    <Text style={myStyles.priceText}>Mile Range: {miles}</Text>
                    <Slider
                        style={{ width: 300, height: 60 }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor={myColors.brown}
                        maximumTrackTintColor={myColors.tan}
                        thumbTintColor={myColors.green}
                        onValueChange={(mil) => setMiles(Math.floor(mil * 20) * 5)}
                    />
                </View>

                <View>
                    <Text style={myStyles.priceText}>Price Range: {dollars[value]}</Text>
                    <Slider
                        style={{ width: 300, height: 60 }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor={myColors.brown}
                        maximumTrackTintColor={myColors.tan}
                        thumbTintColor={myColors.green}
                        onValueChange={(val) => setValue(Math.floor(val * 3) + 1)}
                    />
                </View>
            </View>


            <Button title="See Results" onPress={() => {
                navigation.navigate('Results', {
                    location: location,
                    price: value,
                    miles: miles,
                })
            }} />
        </View>
    );
}
