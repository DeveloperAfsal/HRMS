import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    AddroleContainer: {
        alignItems: 'center',
        paddingTop: '5%',
        paddingBottom: '5%'
    },

    Row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    Inputcontainer: {
        backgroundColor: "#F4FDFF",
        padding: 20,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#A4CED8',
        width: "90%",
    },

    AddroleText: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 21.28,
        color: '#000000',
    },

    TextInput: {
        width: "80%",
        height: 42,
        backgroundColor: '#F3FCFF',
        borderWidth: 1,
        borderColor: '#515151',
        borderRadius: 7,
        marginTop:'8%',
        paddingLeft:'5%'
    },

    checkView: {
        paddingTop: '5%',
        paddingLeft: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    Header: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 21.28,
        color: '#000000',
    },

    SingleHeader: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 21.28,
        color: '#000000',
    },

    SubHeaderView: {
        paddingLeft: '10%',
    },

    SubHeader: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 21.28,
        color: '#000000',
    },

    buttonview: {
        flexDirection: 'row',
        paddingTop: '10%',
        gap: 20,
        justifyContent: 'center'
    },

    submitbutton: {
        backgroundColor: '#0A62F1',
        borderRadius: 5,
        width: 90,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center'
    },

    cancelbutton: {
        backgroundColor: '#F4FDFF',
        borderRadius: 5,
        width: 90,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "#0A62F1"
    },

    submitbuttonText: {
        fontWeight: '700',
        fontSize: 15,
        lineHeight: 19.95,
        color: '#fff'
    },

    cancelbuttontext: {
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 19.95,
        color: '#0A62F1'
    },

    FieldHeader: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 21.28,
        color: '#000000',
    },
    Subheading: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 21.28,
        color: '#000000',
    },

    errorText: {
        color: "red",
        paddingTop: 10,
        width:"90%",
        alignItems:'center',
        justifyContent:'center'
    },
})

export default styles