import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    errorText: {
        color: "red",
        paddingVertical: '3%',
        width: "90%"
    },

    Page: {
        width: '100%',
        alignItems: 'center',
        paddingTop: '5%'
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
        borderColor: '#0A60F1',
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

    DocFileNameHolder: {
        width: '90%',
        lineHeight: 21.28,
        fontSize: 14,
        marginBottom: '5%',
    },

    DocFileName: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 21.28,
        marginBottom: '5%',
        marginHorizontal: '5%',
        borderRadius: 5,
        padding: '3%',
        width: '90%',
        backgroundColor: '#D4E7EB',
    },

    input: {
        borderWidth: 1,
        borderColor: '#515151',
        borderRadius: 7,
        width: '90%',
        paddingLeft: "5%",
    },

    inputs:{
        borderWidth: 1,
        borderColor: '#515151',
        borderRadius: 7,
        width: '90%',
        paddingLeft: "5%",
        height:50,
        justifyContent:'center'
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


    // 

    RolelistContainer: {
        alignItems: 'center',
        paddingVertical: '5%'
    },

    listContainer: {
        backgroundColor: "#fff",
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#A4CED8',
        width: "90%",
    },

    listHeader: {
        backgroundColor: '#E1F1FC',
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        flexDirection: 'row',
        width: '100%',
        height: 44,
        alignItems: 'center'
    },

    sno: {
        width: '25%',
        color: "#404040",
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 19.95,
        paddingLeft: "5%"
    },

    RoleName: {
        width: '45%',
        color: "#404040",
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 19.95,
    },

    Action: {
        width: '30%',
        color: "#404040",
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 19.95,
        textAlign: 'center'
    },

    listcontent: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10
    },

    listcontentsno: {
        width: '25%',
        paddingLeft: "7%",
    },

    listcontentRoleName: {
        width: '45%',
    },

    listcontentButtonview: {
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },

    listcontentdelbutton: {
        width: 26,
        height: 26,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#FF7676",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFE0E0'
    },

    Activeindicator: {
        height: 150
    },

    // 

    StatusTouchable: {
        width: "90%",
        height: 50,
        backgroundColor: '#F3FCFF',
        borderWidth: 1,
        borderColor: '#515151',
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: "5%",
        paddingLeft: "5%"
    },

    StatusTouchableText: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 19.95,
    },

    // 

    dropdown: {
        width: "90%",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#ccc",
    },

    dropdownOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },

    dropdownOptionText: {
        fontSize: 16,
    },

    // 

    Input: {
        borderWidth: 1,
        borderColor: '#515151',
        width: '90%',
        height: 50,
        borderRadius: 7,
        paddingHorizontal: '5%',
        paddingVertical: '3%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },

    // 

    TimeSlotTouchable: {
        width: "90%",
        height: 50,
        backgroundColor: '#F3FCFF',
        borderWidth: 1,
        borderColor: '#515151',
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
    },

    TimeSlotTouchableText: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 19.95,
        color: 'grey',
    },

    // 

    imageContainer: {
        marginRight: 5,
        marginTop: 5,
        position: 'relative',
    },

    image: {
        width: 200,
        height: 200,
        marginBottom: 5,
    },

    deleteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        borderRadius: 20,
        padding: 5,
        zIndex: 1,
        backgroundColor: "#fff"
    },
})

export default styles;