import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { myStyles } from '../styling/GlobalStyles';
import { Button } from './Button';
import { Result } from './Result';
import { useEffect, useState } from 'react';
import { myColors } from '../styling/MyColors';
/*
    Task 1: 
        - change line 27 (fetch request) to be formated with the users coordinates
            - ex: `http://54.90.3.82/nearme?lat=${userLat}&long=${userLong}`
    Task 2: 
        - fix the css with the results components
            - add text overflow handling 
            - add scrolling for when list is too long
    Task 3: 
        - work on formating restaurant data in Result component
        - current restuarant data from request
            - ex:   
                "Lazy Moon Pizza": {
                    "price_level": 1,
                    "rating": 4.6,
                    "num_of_ratings": 3251,
                    "keywords": [
                        "restaurant",
                        "food",
                        "point_of_interest",
                        "establishment"
                    ],
                    "address": "11551 University Boulevard, Orlando",
                    "id": "ChIJn6P2NfVo54gRjwL_crPfhyQ",
                    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
                    "open": true,
                    "lat": 28.5983402,
                    "long": -81.21946129999999
                },
            - id is used with http://54.90.3.82/restaurant?id=${restuarantId}
                - this returns more detailed data for the restaurant like hours of operation etc.
            - price level represents how many $'s
            - doesn't give distance away but rather puts address
                - NOT PRIORITY
                - find way to calcualte distance using our location
                - ill find a way to add it to the response so u dont have to (this is why not priority)
*/

const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.error(e)
    }
}

async function getResults(lat, long, price, miles) {
    var returnData = {
        success: false,
        data: {},
        error: ""
    };

    // send request to api
    try {
        var resp = await fetch(`http://54.90.3.82/nearme?lat=${lat}&long=${long}&min=${0}&max=${price}&miles=${miles}`);
        // check for success status code
        if (resp.status != 200) {
            returnData.error = `failed to send results request. status code: ${resp.status}`;
            return returnData;
        }
        // get response json
        returnData.success = true;
        returnData.data = await resp.json();
        // remove next_page_token key to prevent it from creating Result component with tis data
        if (returnData.data?.next_page_token !== undefined) {
            delete returnData.data['next_page_token'];
        }
        console.log(`successful results request.`);
        return returnData;
    } catch (e) {
        // throw err
        returnData.error = `failed to send results request. ERROR: ${String(e)}`;
        return returnData;
    };
}

export const ResultScreen = ({ navigation, route }) => {
    const [results, setResults] = useState({});
    const [showDetails, setShowDetails] = useState(false);
    const [details, setDetails] = useState({})
    const dollars = ["$", "$$", "$$$", "$$$$", "$$$$$"];
    const { location, price, miles } = route.params;
    const userLat = location?.coords?.latitude;
    const userLong = location?.coords?.longitude;
    const mySet = new Set();


    // if u log an object + string it says [Object object] instead of the actual data
    console.log("Miles: " + miles)
    console.log(location)
    console.log(userLat, userLong)
    console.log("Price: " + price)
    // hook runs on initialization
    useEffect(() => {
        getResults(userLat, userLong, price, miles).then((res) => {
            // skip if failed
            if (!res.success) {
                console.log(res.error)
                return
            }
            // set results data
            setResults(res.data)
        })
    }, []);

    return (
        <View style={myStyles.screen}>
            <ScrollView style={myStyles.resultSet}>
                {Object.entries(results).map(([key, value]) => ( /* creates Result component for each restuarant in results  */
                    <Result
                        key={key}
                        Restaurant={key}
                        Distance={value?.distance}
                        Price={dollars[String(value?.price_level)]}
                        Rating={value?.rating}
                        onDetails={() => {

                            setShowDetails(true)
                        }}
                        onPress={() => { 
                            if (mySet.has(key)) {
                                mySet.delete(key)
                                console.log("Key removed: " + key) 
                            } else {
                                mySet.add(key)
                                console.log("Key added: " + key) 
                            }
                            console.log(Array.from(mySet.values()))
                        }}
                    />
                ))}
            </ScrollView>

            <View style={myStyles.buttonRow}>
                <Button title="Go back" onPress={() => navigation.goBack()} />
                <Button title="Spin the Wheel!" onPress={async () => {
                    var details = {};
                    if (mySet.size == 0) {
                        details = results
                    } else {
                        mySet.forEach(element => {
                            console.log(element);
                            details[element] = results[element]
                        });
                    }
                    await storeData("details", details)
                    navigation.navigate('Wheel')
                }} />
            </View>
            { showDetails &&
                <View style={styles.details}> 
                    <TouchableOpacity>
                        <Text>More Details</Text>
                    </TouchableOpacity>
                    <Text >asd</Text>
                </View >
            }
        </View >
    );
}

const styles = StyleSheet.create({
    details: {
        position: "absolute",
        height: "75%",
        width: "90%",
        marginTop: "5%",
        backgroundColor: myColors.green,
        zIndex: 100,
        borderRadius: 20
    }
})