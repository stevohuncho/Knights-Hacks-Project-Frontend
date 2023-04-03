import { ScrollView, Text, View, } from 'react-native';
import { myStyles } from '../styling/GlobalStyles';
import { Button } from './Button';
import { Result } from './Result';
import { useEffect, useState } from 'react';
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
                "4 Rivers Smokehouse": {
                    "address": "11764 University Boulevard, Orlando",
                    "id": "ChIJbzG0T41o54gRfTWeGQ6o7Ew",
                    "keywords": [
                        "restaurant",
                        "food",
                        "point_of_interest",
                        "store",
                        "establishment"
                    ],
                    "num_of_ratings": 2564,
                    "price_level": 2,
                    "rating": 4.5
                }
            - id is used with http://54.90.3.82/restaurant?id=${restuarantId}
                - this returns more detailed data for the restaurant like hours of operation etc.
            - price level represents how many $'s
            - doesn't give distance away but rather puts address
                - NOT PRIORITY
                - find way to calcualte distance using our location
                - ill find a way to add it to the response so u dont have to (this is why not priority)
*/

export const ResultScreen = ({ navigation, route }) => {
    const [results, setResults] = useState({});
    const [nextPageToken, setNextPageToken] = useState('');
    const dollars = ["$", "$$", "$$$", "$$$$"];
    const { location, price, miles } = route.params;

    console.log("Miles: " + miles)
    console.log("Location: " + location)
    console.log("Price: " + price)
    // hook runs on initialization
    useEffect(() => {
        async function getResults() {
            var returnData = {
                success: false,
                data: {},
                error: ""
            };

            // send request to api
            try {
                var resp = await fetch("http://54.90.3.82/nearme?lat=28.5970378&long=-81.2276083");
                // check for success status code
                if (resp.status != 200) {
                    returnData.error = `failed to send results request. status code: ${resp.status}`;
                    return returnData;
                }
                // get response json
                returnData.success = true;
                returnData.data = await resp.json();
                // save next page token
                setNextPageToken(returnData.data['next_page_token']);
                // remove next_page_token key to prevent it from creating Result component with tis data
                delete returnData.data['next_page_token'];
                console.log(`successful results request.`);
                return returnData;
            } catch (e) {
                // throw err
                returnData.error = `failed to send results request. ERROR: ${String(e)}`;
                return returnData;
            };
        }

        getResults().then((res) => {
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
            <Text style={myStyles.text}>Result Screen</Text>
            <ScrollView style={myStyles.resultSet}>
                {Object.entries(results).map(([key, value]) => ( /* creates Result component for each restuarant in results  */
                    <Result
                        key={key}
                        Restaurant={key}
                        Distance={value['address']}
                        Price={dollars[String(value['price_level'])]}
                    />
                ))}
            </ScrollView>

            <View style={myStyles.buttonRow}>
                <Button title="Go back" onPress={() => navigation.goBack()} />
                <Button title="Spin the Wheel!" onPress={() => navigation.navigate('Wheel')} />
            </View>
        </View >
    );
}