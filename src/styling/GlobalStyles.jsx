import { StyleSheet } from "react-native"
import { myColors } from "./MyColors"

export const myStyles = StyleSheet.create({
    screen:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: myColors.light,
    },
    logo:
    {
        height: undefined,
        width: "60%",
        aspectRatio: 1,
        resizeMode: "stretch",
        borderRadius: "50%",
    },
    buttonRow:
    {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: "row",
    },
    button:
    {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: myColors.brown,
        height: undefined,
        width: '45%',
        aspectRatio: 4.8,
        borderRadius: 10,
    },
    buttonText:
    {
        color: myColors.white,
        fontSize: 20,
        fontWeight: "500",
    },
    text:
    {
        color: myColors.green,
        fontWeight: "500",
        fontSize: 18,
    },
    input: {
        height: undefined,
        width: 300,
        aspectRatio: 3,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        backgroundColor: myColors.white,
        fontSize: "40%",

    },
    result:
    {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: myColors.white,
        width: "90%",
        borderRadius: 10,
        height: undefined,
        aspectRatio: 5,
        padding: 20,
    },
    restaurant:
    {
        fontSize: 30,

    },
    details:
    {
        fontSize: 16,
    },
    price:
    {
        alignItems: "center",
    },
    priceText:
    {
        fontSize: 30,
    }
})