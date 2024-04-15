import { StyleSheet } from "react-native";
import { Black, PrimaryAshPurple, PrimaryPurple, PrimaryRed, White } from "../../../../../assets/Colors";

const styles = StyleSheet.create({
    input: {
        backgroundColor: White,
        marginBottom: 10,
        paddingLeft: 20,
        height: 50,
        justifyContent: 'center'
    },
    Button1: {
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 60,
        backgroundColor: PrimaryPurple,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subContainer: {
        padding: 15,
        borderRadius: 15,
        marginBottom: 20
    },
    subHeading: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 10,
        paddingLeft: 10
    },
    errorText: {
        color: PrimaryRed,
        fontSize: 12,
        marginBottom: 5,
        marginTop: -10
    },
    subtop: {
        fontSize: 15,
        marginTop: 10
    },
    Button: {
        borderRadius: 5,
        backgroundColor: PrimaryAshPurple,
        borderColor: PrimaryPurple,
        borderWidth: 1,
        color: Black
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 5,
    },
    imageContainer: {
        marginRight: 5,
        marginTop: 5,
        position: 'relative',
    },
    deleteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        borderRadius: 20,
        padding: 5,
        zIndex: 1,
    },
    container: {
        padding: 30
    },
    date: {
        fontSize: 15,
        margin: 10,
        fontWeight:"600"
    },
    text: {
        color: White
    },
    padding: {
        paddingLeft: 0
    }
});

export default styles;