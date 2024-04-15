import { StyleSheet } from "react-native";
import { Black, Grey, PrimaryPurple, PrimaryRed, SecondaryAshPurple, White } from "../../../../../assets/Colors";

const styles = StyleSheet.create({
    dropdown: {
        borderColor: White,
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
        padding: 5,
        backgroundColor: White,
        marginBottom: 10
    },
    style1: {
        padding: 1,
        margin: 0
    },
    selectedTextStyle: {
        fontSize: 14,
        padding: 0,
        color: Grey
    },
    input: {
        backgroundColor: White,
        marginBottom: 10,
        paddingLeft: 20,
        height: 50,
        justifyContent: 'center',
        fontSize: 16,
    },
    saveButton: {
        borderRadius: 5,
    },
    errorText: {
        color: PrimaryRed,
        marginBottom: 10,
        marginTop: -10
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
        paddingLeft: 10,
    },
    Button: {
        marginTop:5,
        borderRadius: 5,
        height: 40,
        borderColor: PrimaryPurple,
        borderWidth: 1,
        color: Black,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        marginRight: 5,
        marginTop: 5,
        position: 'relative',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 5,
    },
    deleteButton: {
        position: 'absolute',
        backgroundColor: White,
        top: 5,
        right: 5,
        borderRadius: 20,
        padding: 5,
        zIndex: 1,
    },
    Button1: {
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 60,
        backgroundColor: PrimaryPurple,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollViewContainer: {
        flexDirection: 'row',
    },
    container: {
        flexDirection: 'row',
    },
    maincontainer: {
        padding: 20
    },
    EventDate: {
        fontSize: 16,
        margin: 10,
        fontWeight:'600'
    },
    text: {
        color: White
    }
});

export default styles;