import { StyleSheet } from "react-native";
import { Black, PrimaryAshPurple, PrimaryBlue, PrimaryPurple, White, heading } from "../../../../../assets/Colors";

const styles = StyleSheet.create({
    contentcontainer: {
        padding: 20
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10
    },
    editbuttonview: {
        alignItems: 'flex-end',
        marginRight: 30,
        marginTop: 20,
        marginBottom: -20
    },
    editbutton: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: PrimaryPurple,
        padding: 10,
        borderRadius: 4,
        gap: 8
    },
    text: {
        color: White,
        fontSize: 16
    },
    container: {
        flex: 1,
        backgroundColor: White,
    },
    phoneEmail: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        padding: 10,
        width: '100%'
    },
    imageStyle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: PrimaryBlue,
    },
    iconStyle: {
        width: 150,
        height: 150,
        borderRadius: 150,
        borderWidth: 1,
        borderColor: Black,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: PrimaryAshPurple,
        borderColor: PrimaryBlue
    },
    profileimage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
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
        marginTop: 10,
    },
    detailsText: {
        fontSize: 16,
        fontWeight: '400',
        paddingTop: 10
    },
    activityIndicator: {
        marginTop: '75%',
    },
});

export default styles;