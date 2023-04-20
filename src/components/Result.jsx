import { Text, TouchableOpacity, View, StyleSheet } from "react-native"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { myColors } from "../styling/MyColors";
import { useState } from "react";

const Col = ({ numRows, children }) => {
    return  (
        <View style={styles[`${numRows}col`]}>{children}</View>
    )
}

const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
)

export const Result = ({ Restaurant, Distance, Price, Rating, onDetails, onPress }) => {
    const [pressed, setPressed] = useState(false);
    const press = () => {
        setPressed(!pressed);
    }
    return (
        <TouchableOpacity 
            style={[styles.result, { opacity: pressed ? 0.4 : 1}]}
            onPress={() => {
                press()
                onPress()
            }
            }
        >
            <Row>
                <Col numRows={3}>
                    <Text style={styles.title} numberOfLines={2}>{Restaurant}</Text>
                </Col>
                <Col numRows={1}>
                <Text numberOfLines={1} style={styles.rating}>{Rating}{" "}<FontAwesome name="star" size={20} color="#ffcc00" /></Text>
                </Col>
            </Row>
            <Row>
                <Col numRows={3}>
                    <Text style={styles.distance} numberOfLines={1}>{Distance} miles away</Text>
                </Col>
                <Col numRows={1}>
                    <Text numberOfLines={1} style={styles.price}>{Price}</Text>
                </Col>
            </Row>
            {/*
                <Row>
                    <Col numRows={1}>
                    </Col>
                    <Col numRows={2}>
                        <TouchableOpacity style={styles.button} onPress={onDetails}>
                            <Text style={styles.buttonText} numberOfLines={1}>More Details</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col numRows={1}>
                    </Col>
                </Row> 
            */}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        height: 40
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
        justifyContent: "flex-end",
        textAlign: "right",
        color: "#009900"
    },
    rating:
    {
        flex: 1,
        fontSize: 20,
        marginHorizontal: 8,
        justifyContent: "flex-end",
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