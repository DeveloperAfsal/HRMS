import { StyleSheet } from "react-native";
import { Grey, PrimaryPurple, PrimaryRed, White } from "../../../../../assets/Colors";

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    text: {
        color: White
    },
    date: {
        fontSize: 15,
        margin: 10,
        fontWeight:'600'
    },
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
        height: 50,
        justifyContent: 'center',
        paddingLeft: 16
    },
    saveButton: {
        borderRadius: 5,
    },
    errorText: {
        color: PrimaryRed,
        marginBottom: 10,
    },
    subContainer: {
        padding: 15,
        borderRadius: 15,
        marginBottom: 20
    },
    subHeading: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 15,
        paddingLeft: 10,
    },
    Button1: {
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 60,
        backgroundColor: PrimaryPurple,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;