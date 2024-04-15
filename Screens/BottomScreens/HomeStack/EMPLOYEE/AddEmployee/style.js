import { StyleSheet } from "react-native";
import { Grey, PrimaryPurple, PrimaryRed, White } from "../../../../../assets/Colors";


const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        padding: 15,
        marginTop: 10,
        paddingBottom: 100
    },
    radioGroup: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: PrimaryPurple,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: PrimaryRed,
        marginBottom: 10
    },
    input: {
        backgroundColor: White,
        marginBottom: 10,
        paddingLeft: 20,
        height: 50,
        justifyContent: 'center'
    },
    subHeading: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
        marginTop: 10
    },
    subContainer: {
        padding: 15,
        borderRadius: 15,
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
    addButton: {
        borderRadius: 5,
        color: White,
        backgroundColor: PrimaryPurple,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginRight: 10,
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
        paddingLeft: 15
    },
    scrollViewContainer: {
        paddingBottom:10
    },
    userEmpid: {
        fontSize: 15,
        color: Grey
    },
    imageProof: {
        marginBottom: 10
    },
    dob: {
        fontSize: 15,
        marginBottom: 10,
        marginTop: 10,
        paddingLeft: 10
    },
    padding: {
        paddingLeft: 0
    },
    text: {
        color: White
    },
    doj: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15,
        paddingLeft: 10
    }
});

export default styles;
