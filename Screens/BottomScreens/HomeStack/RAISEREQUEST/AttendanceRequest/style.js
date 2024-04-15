import { StyleSheet } from "react-native";
import { PrimaryPurple, PrimaryRed, White } from "../../../../../assets/Colors";

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    input: {
        backgroundColor: White,
        marginBottom: 10,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 16
    },
    Button1: {
        borderRadius: 5,
        backgroundColor: PrimaryPurple,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: White,
    },
    subContainer: {
        padding: 15,
        borderRadius: 15,
        marginBottom: 20
    },
    subHeading: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 20,
        paddingLeft: 15,
    },
    errorText: {
        color: PrimaryRed,
        fontSize: 12,
        marginBottom: 5
    },
    subtop: {
        fontSize: 15,
        margin: 10,
    }
});

export default styles;