import { StyleSheet } from "react-native";
import { Black, PrimaryPurple, PrimaryRed, White, button, heading } from "../../../../../assets/Colors";

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    input: {
        backgroundColor: White,
        height: 50,
        marginTop: 15,
        paddingLeft: 20,
        height: 50,
        justifyContent: 'center',
    },
    Button1: {
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 60
    },
    subContainer: {
        padding: 15,
        borderRadius: 15,
        marginBottom: 20
    },
    subHeading: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        color: PrimaryPurple,
    },
    errorText: {
        color: PrimaryRed,
        fontSize: 12,
    },
    subtop: {
        fontSize: 15,
        marginTop: 10
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
    addButton: {
        borderRadius: 5,
        marginBottom: 50,
        marginTop: 15,
        backgroundColor: PrimaryPurple,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
        width: '10%',
        alignItems: 'center',
    },
    editable: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    text: {
        color: White
    }
});

export default styles;