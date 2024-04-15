import { StyleSheet } from "react-native";
import { Ash, PrimaryAshPurple, PrimaryBlue, PrimaryPurple, SecondaryAshPurple, White } from "../../../../../assets/Colors";

const styles = StyleSheet.create({
    tableBorder: {
        borderWidth: 1,
        borderColor: Ash,
        borderRadius: 10,
    },
    tableHeader: {
        height: 40,
        backgroundColor: PrimaryAshPurple,
    },
    headerText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: PrimaryBlue,
    },
    row: {
        height: 40,
        backgroundColor: SecondaryAshPurple,
    },
    rowText: {
        textAlign: 'center',
    },
    indicationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 20,
        padding: 10
    },
    indicationText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2
    },
    exportContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-Start',
        marginBottom: 10,
    },
    activityIndicator: {
        marginTop: '50%',
    },
    filterInput: {
        borderWidth: 1,
        borderColor: Ash,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    exportContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    exportButton: {
        backgroundColor: PrimaryPurple,
        padding: 10,
        marginLeft: 10,
        borderRadius: 5,
    },
    exportButtonText: {
        color: White,
        fontWeight: 'bold'
    },
    NextButton: {
        padding: 4,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
    },
    NextButtonText: {
        color: PrimaryPurple,
        fontWeight: 'medium',
        fontSize: 14
    },
    NextPrevButtonContainer: {
        gap: 5,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    MonthYear: {
        fontSize: 20,
        fontWeight: '800'
    },
    searchIcon: {
        width: 30,
        height: 30,
        marginTop: 10,
        padding: 5,
        borderRadius: 60,
    },
    container: {
        padding: 20
    },
    search: {
        width: '90%'
    },
});

export default styles;