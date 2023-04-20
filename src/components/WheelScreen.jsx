import { Animated, Text, View, Easing, StyleSheet, ScrollView, Linking } from 'react-native';
import { myColors } from "../styling/MyColors";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { myStyles } from '../styling/GlobalStyles';
import { Button } from './Button';
import { Wheel } from './Wheel';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.error(e)
    }
}

const getDetails = async (id) => {
    var returnData = {
        success: false,
        data: {},
        error: ""
    };

    // send request to api
    try {
        var resp = await fetch(`http://54.90.3.82/restaurant?id=${id}`);
        // check for success status code
        if (resp.status != 200) {
            returnData.error = `failed to send results request. status code: ${resp.status}`;
            return returnData;
        }
        // get response json
        returnData.success = true;
        returnData.data = await resp.json();

        console.log(`successful results request.`);
        return returnData;
    } catch (e) {
        // throw err
        returnData.error = `failed to send results request. ERROR: ${String(e)}`;
        return returnData;
    };
}

const Col = ({ numRows, children }) => {
    return  (
        <View style={styles[`${numRows}col`]}>{children}</View>
    )
}

const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
)

const Row2 = ({ children }) => (
    <View style={styles.row2}>{children}</View>
)

export const WheelScreen = ({ navigation }) => {
    const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
    const [foundRestuarant, setfoundRestaurant] = useState(false);
    const [details, setDetails] = useState({})
    const [name, setName] = useState("")
    const [allDetails, setAllDetails] = useState({})

    const dollars = ["$", "$$", "$$$", "$$$$", "$$$$$"];
    
    const handleAnimation = () => {
        Animated.loop(Animated.timing(rotateAnimation, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true
        })).start(() => {
            rotateAnimation.setValue(0);
        });
    };

    const interpolateRotating = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const animatedStyle = {
        transform: [
            {
            rotate: interpolateRotating,
            },
        ],
    };

    useEffect(() => {
        getData("details").then((data) => {
            setAllDetails(data);
        });
    }, []);

    useEffect(() => {
        let restaurantKeys = Object.keys(allDetails)
        let name = restaurantKeys[getRandomInt(restaurantKeys.length)]
        setName(name)
        getDetails(allDetails[name]?.id).then((res) => {
            // skip if failed
            if (!res.success) {
                console.log(res.error)
                return
            }
            // set results data
            setDetails(res.data)
        })
    }, [allDetails])

    useEffect(() => {
        sleep(2000).then(() => {
            console.log(details)
            setfoundRestaurant(true)
        })
    }, [details])

    handleAnimation()
    console.log(details?.opening_hours?.weekday_text)

    return (
        <View style={myStyles.screen}>
            { !foundRestuarant ?
                    <View> 
                        <Animated.Image style={animatedStyle} source={require("../../assets/logo.png")} accessibilityLabel={"logo"} /> 
                    </View>
                :
                    <ScrollView style={styles.result}>
                        <Text style={[myStyles.text, {textAlign: "center", fontSize: "20", margin: 10, backgroundColor: myColors.light, color: myColors.orange, padding: 15, }]}>Choose Chews Chose...</Text>
                        <Text style={[myStyles.text, {textAlign: "center", fontSize: "34", margin: 10, backgroundColor: myColors.white, color: myColors.black, padding: 15, borderWidth: 4, borderColor: myColors.black}]}>{name}</Text>
                        <Row>
                            <Col numRows={2}>
                                <Text style={[styles.title, {color: "#0099ff", textDecorationLine: "underline"}]} numberOfLines={2} onPress={() => Linking.openURL(details?.url)}>Go To Google Maps</Text>
                            </Col>
                            <Col numRows={2}>
                                <Text style={[styles.title, {color: "#0099ff", textDecorationLine: "underline"}]} numberOfLines={2} onPress={() => Linking.openURL(details?.website)}>Go To Their Website</Text>
                            </Col>
                        </Row>
                        <Row2>
                            <Col numRows={1}>
                                <Text style={styles.distance} numberOfLines={1}>{details?.formatted_phone_number}</Text>
                            </Col>
                            <Col numRows={1}>
                                <Text numberOfLines={1} style={styles.rating}>{allDetails[name]?.rating}{" "}<FontAwesome name="star" size={20} color="#ffcc00" /></Text>
                            </Col>
                            <Col numRows={1}>
                                <Text numberOfLines={1} style={styles.price}>{dollars[String(allDetails[name]?.price_level)]}</Text>
                            </Col>
                        </Row2>
                        <View style={{backgroundColor: myColors.white, paddingBottom: 20}}>
                            {details?.opening_hours?.weekday_text.map(value => (
                                <Text key={value} style={{textAlign: "center"}}>{value}</Text>
                            ))}
                        </View>
                    </ScrollView >
            }
            <View style={myStyles.buttonRow}>
                <Button title="Go back" onPress={() => navigation.goBack()} />
                <Button title="Go to Search" onPress={() => navigation.navigate('Search')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        height: 80,
        paddingTop: 10
    },
    row2: {
        flexDirection: "row",
        height: 80,
        paddingTop: 10,
        backgroundColor: myColors.white,
        padding: 5,
        justifyContent: "center"
    },
    "1col":  {
        flex:  1,
    },
    "2col":  {
        flex:  2
    },
    "3col":  {
        flex:  3
    },
    "4col":  {
        flex:  4
    },
    result: {
        height: 100,
        width: "100%",
        borderRadius: 10,
        padding: 15,
        marginBottom: 3,
        borderColor: myColors.light,
        borderWidth: 3
    },
    button:
    {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#996633",
        height: undefined,
        aspectRatio: 4.8,
        borderRadius: 10,
        shadowRadius: 2,
        shadowColor: "#333333",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
    },
    buttonText:
    {
        color: myColors.white,
        fontSize: 14,
        fontWeight: "500",
    },
    price:
    {
        flex: 1,
        fontSize: 20,
        marginHorizontal: 8,
        textAlign: "right",
        color: "#009900"
    },
    rating:
    {
        flex: 1,
        fontSize: 20,
        marginHorizontal: 8,
        textAlign: "right",
        color: "#ffcc00"
    },
    title: {
        fontSize: 20
    },
    distance: {
        color: "#333333"
    }
})