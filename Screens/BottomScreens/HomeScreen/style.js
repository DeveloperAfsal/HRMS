import { StyleSheet } from "react-native";
import { Black, PrimaryRed, Red, White } from "../../../assets/Colors";

const styles = StyleSheet.create({
    topcontainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        width: '90%',
        marginTop: "10%",
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 2,
    },

    button: {
        borderRadius: 170,
        width: 170,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        elevation: 8,
    },

    buttontext: {
        fontSize: 20,
        fontWeight: "bold",
        color: White,
        marginTop: "10%"
    },

    clockCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '33.3%',
        padding: 2,
    },

    timetext: {
        fontWeight: '500',
        color: Black,
        fontSize: 14,
        paddingTop: 5,
        paddingBottom: 5
    },

    timenumbertext: {
        fontWeight: '500',
        color: Black,
        fontSize: 16
    },

    backgroundImage: {
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',

    },

    overlay: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
    },

    counterCards: {
        borderRadius: 5,
        marginTop: 5,
        gap: 5,
        backgroundColor: White,
        justifyContent: 'center',
        alignItems: "center",
        shadowColor: Black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 8,
        height: 70
    },

    numbers: {
        fontWeight: '800',
        fontSize: 20,
        color: Black
    },

    cardContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: 10,
        padding: 3,
    },

    fontStyle: {
        fontWeight: '500',
    },

    warningMessage: {
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#fff1f1',
        padding: 15,
        flexDirection: 'row',
        borderColor: Red,
        borderWidth: 0.5,
    },

    datetime: {
        fontSize: 16,
        fontWeight: '500',
        color: Black
    },

    clockcontainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },

    firstname: {
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 3
    },

    viewAttendance: {
        padding: 5,
        width: 140,
        borderColor: Red,
        borderWidth: 1
    },

    viewAttendanceText: {
        color: White,
        textAlign: 'center',
        color: Red,
        fontWeight: '600',
    },

    activityIndicator: {
        marginTop: '40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    CountContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20
    },

    CountContainerWidth: {
        width: '49%'
    },

    dashboardMonthlyContainer: {
        padding: 20
    },

    dashboardMonthlyAlert: {
        width: '15%'
    },

    dashboardMonthlyContent: {
        width: '85%'
    },


});

export default styles;