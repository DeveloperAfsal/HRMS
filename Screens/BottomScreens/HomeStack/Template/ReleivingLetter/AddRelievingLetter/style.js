import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

    PolicyContainer: {
        alignItems: 'center',
        paddingBottom: '5%'
    },

    PolicyContainerTitleHeader: {
        paddingTop: "5%",
        paddingBottom: "5%",
        width: "90%",
    },

    PolicyContainerTitle: {
        paddingTop: "5%",
        width: "90%",
    },

    PolicyContainerTitleText: {
        color: '#00275C',
        fontWeight: '700',
        lineHeight: 23.94,
        fontSize: 18,
    },

    Inputcontainer: {
        backgroundColor: "#F4FDFF",
        padding: 20,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#A4CED8',
        width: "90%",
        alignItems: 'center'
    },

    StatDateText: {
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 21.28,
        paddingBottom: "3%",
        width: "90%",
        color: '#2C2C2C',
    },

    inputs: {
        borderWidth: 1,
        borderColor: '#515151',
        width: '90%',
        height: 52,
        borderRadius: 7,
        paddingHorizontal: '5%',
        marginBottom: '3%',
        justifyContent: 'center',
    },

    errorText: {
        color: "red",
        paddingVertical: '3%',
        width: "90%"
    },

    HeaderButtonActive: {
        width: '35%',
        height: 40,
        borderRadius: 7,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A60F1',
        borderColor: '#0A60F1',
    },

    HeaderButtonTextActive: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 18.62
    },

    HeaderButton: {
        width: "25%",
        height: 40,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#0A60F1',
        alignItems: 'center',
        justifyContent: 'center'
    },

    HeaderButtonText: {
        color: '#0A60F1',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18.62
    },

})

export default styles;