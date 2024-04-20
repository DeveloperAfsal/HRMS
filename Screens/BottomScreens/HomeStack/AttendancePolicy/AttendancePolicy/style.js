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

    TimeSlotText: {
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 21.28,
        paddingBottom: "3%",
        paddingTop: "3%",
        width: "90%",
        color:"#2C2C2C",
    },

    Text:{
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 21.28,
        paddingBottom: "10%",
        paddingTop: "10%",
        color:"#2C2C2C",
    },

    TimeSlotTouchable: {
        width: "90%",
        height: 42,
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

    TimeSlotTouchableText: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 19.95,
        color: '#000',
    },

    buttonview: {
        flexDirection: 'row',
        paddingTop: '10%',
        gap: 20
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

    DoubleInputs:{
         width: '90%', 
         flexDirection: 'row', 
         alignItems: 'center', 
         justifyContent: 'space-between' 
    },

    shortInputs:{
        width: '45%' 
    },

    averageWidth:{
        width: '90%'
    },

    input:{
         borderWidth: 1, 
         borderColor: "#515151", 
         borderRadius: 7, 
         height: 42, 
         paddingLeft: 10 
    },

    inputs:{
        borderWidth: 1, 
        borderColor: '#515151', 
        width: '90%', 
        borderRadius: 7, 
        paddingLeft: 10 
    },

    listHeader: {
        backgroundColor: '#E1F1FC',
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center'
    },

    header: {
        flex: 1,
        padding: 10,
        color: "#404040",
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 19.95,
        textAlign: 'center',
      },

      table: {
        width: width * 0.9, 
      },

      listcontentButtonview: {
        flexDirection: 'row',
        alignItems:'center',
        gap:5
    },

    listcontenteditbutton: {
        width: 26,
        height: 26,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#76B700",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F6E5'
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

    Tablecontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#A4CED8',
        width: "90%",
      },
      
      row: {
        flexDirection: 'row',
      },
    
      cell: {
        flex: 1,
        padding: 10,
        textAlign: 'center',
      },
})

export default styles;