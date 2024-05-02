import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    Page: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: '5%'
    },

    container: {
        width: '90%',
        alignItems: 'center'
    },

    HeaderButtonView: {
        width: '85%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 20
    },

    HeaderButton: {
        width: 162,
        height: 52,
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

    HeaderButtonActive: {
        width: 162,
        height: 52,
        borderRadius: 7,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A60F1',
    },

    HeaderButtonTextActive: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 18.62
    },

    InputContainer: {
        backgroundColor: '#F4FDFF',
        width: '100%',
        borderWidth: 1,
        borderRadius: 11,
        borderColor: '#A4CED8',
        padding: '5%',
        marginVertical: '10%',
        alignItems: 'center',
    },

    Heading: {
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 23.49,
        color: '#00275C',
        paddingVertical: '5%',
        paddingHorizontal: '2%',
        width: '100%',
    },

    subHeading: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 21.28,
        paddingVertical: '5%',
        paddingHorizontal: '5%',
        width: '100%',
    },

    input: {
        borderWidth: 1,
        borderColor: '#515151',
        borderRadius: 7,
        width: '90%',
        paddingLeft: "5%"
    },

    fullWidth: {
        width: '100%',
        paddingHorizontal: '5%'
    },

    Row: {
        flexDirection: 'row',
        paddingVertical: '5%',
    },

    Left: {
        justifyContent: 'space-around'
    },

    UploadButton: {
        backgroundColor: '#D4E7EB',
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },

    UploadButtonText: {
        color: '#3D3D3D',
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 17.92
    },

    NextButton: {
        width: 100,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#0A62F1',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '10%',
        flexDirection: 'row',
    },

    NextButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 21.28
    },

    PrevButton: {
        width: 100,
        height: 40,
        borderRadius: 5,
        borderColor: '#0A62F1',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '10%',
        flexDirection: 'row',
    },

    PrevButtonText: {
        color: '#0A62F1',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 21.28
    },

})

export default styles;