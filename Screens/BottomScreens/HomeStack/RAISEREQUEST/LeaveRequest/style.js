import { StyleSheet } from "react-native";
import { Black, PrimaryPurple, PrimaryRed, SecondaryAshPurple, White } from "../../../../../assets/Colors";

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
        backgroundColor: White
    },
    Button: {
        borderRadius: 5,
        borderColor: PrimaryPurple,
        borderWidth: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        color: Black
    },
    Button1: {
        borderRadius: 5,
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
        paddingLeft: 15,
    },
    errorText: {
        color: PrimaryRed,
        fontSize: 12,
        marginBottom: 5
    },
    date: {
        fontSize: 15,
        paddingLeft: 5,
        margin: 5
    },
    text: {
        color: White,
    },
    text1: {
        color: PrimaryPurple,
        fontWeight: '800'
    }
});

export default styles;