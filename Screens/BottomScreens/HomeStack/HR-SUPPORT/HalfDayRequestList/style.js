import { StyleSheet } from "react-native";
import { Ash, Black, Grey, PrimaryAshPurple, PrimaryBlue, PrimaryGreen, PrimaryPurple, PrimaryRed, SecondaryAshPurple, White, button, icons } from "../../../../../assets/Colors";

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    search: {
        width: "90%"
    },
    tableContainer: {
        width: 1201,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: White,
        shadowColor: Black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    tableBorder: {
        borderWidth: 1,
        borderColor: Ash,
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
        minHeight: 50,
        backgroundColor: SecondaryAshPurple,
    },
    rowText: {
        textAlign: 'center',
        // color: '#333',
    },
    noDataRow: {
        height: 40,
    },
    noDataRowText: {
        textAlign: 'center',
        fontStyle: 'italic',
        // color: '#999',
    },
    cellText: {
        textAlign: 'center',
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15
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
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    arrowstyle: {
        width: 30,
        height: 30,
        padding: 5,
        backgroundColor: PrimaryBlue,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    paginationText: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10
    },
    filterInput: {
        borderWidth: 1,
        borderColor: Ash,
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        justifyContent: "center",
        flexDirection: 'row',
        gap: 20
    },
    approveButton: {
        color: White,
        fontWeight: 'bold',
        backgroundColor: PrimaryGreen,
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        justifyContent: 'center',
        fontSize: 16
    },
    rejectButton: {
        color: White,
        fontWeight: 'bold',
        backgroundColor: PrimaryRed,
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        justifyContent: 'center',
        fontSize: 16
    },
    activityIndicator: {
        marginTop: '50%',
    },
    searchIcon: {
        width: 30,
        height: 30,
        marginTop: 10,
        padding: 5,
        borderRadius: 60,
    }
});

export default styles;