import { StyleSheet } from "react-native";
import { Ash, Black, PrimaryAshPurple, PrimaryBlue, PrimaryGreen, PrimaryPurple, PrimaryRed, SecondaryAshPurple, White } from "../../../../../assets/Colors";

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    header: {
        fontSize: 14,
        color: Black,
        paddingBottom: 5
    },
    search: {
        width: '90%'
    },
    holidayView: {
        marginVertical: 10
    },
    buttonDirection: {
        flexDirection: 'row'
    },
    footer: {
        marginBottom: 40
    },
    tableContainer: {
        width: 701,
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
        // color: '#333',
    },
    row: {
        minHeight: 50,
        backgroundColor: SecondaryAshPurple,
    },

    rowHighlight: {
        minHeight: 50,
        backgroundColor: White,
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
    buttonContainer: {
        justifyContent: "center",
        flexDirection: 'row',
        gap: 10
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
    disabledapproveButton: {
        color: White,
        fontWeight: 'bold',
        backgroundColor: '#9f93a8',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        justifyContent: 'center',
        fontSize: 16,
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
    holidaytext: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: PrimaryPurple,
        padding: 5,
        borderWidth: 1,
        width: 130,
        borderRadius: 5,
        height: 30
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: 1000
    },
    modalContent: {
        backgroundColor: White,
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: Ash,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        height: 45,
        justifyContent: 'center'
    },
    modalButton: {
        backgroundColor: PrimaryPurple,
        color: White,
        padding: 15,
        borderRadius: 5,
        textAlign: 'center',
        marginBottom: 10,
    },

    modalButton1: {
        backgroundColor: White,
        color: PrimaryPurple,
        borderRadius: 5,
        textAlign: 'center',
        borderColor: PrimaryPurple,
        padding: 10,
        borderWidth: 1,
    },
    errorText: {
        color: PrimaryRed,
        marginBottom: 10,
        marginTop: -10
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