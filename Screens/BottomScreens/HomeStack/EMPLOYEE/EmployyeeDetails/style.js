import { StyleSheet } from "react-native";
import { Ash, Black, PrimaryAshPurple, PrimaryBlue, PrimaryPurple, SecondaryAshPurple, White } from "../../../../../assets/Colors";

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        padding: 5
    },
    card: {
        width: '90%',
        borderRadius: 10,
        marginTop: 20,
        padding: 15,
        backgroundColor: SecondaryAshPurple,
        justifyContent: 'center',
        shadowColor: Black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
    },
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
        borderWidth: 1,
        borderColor: PrimaryBlue
    },
    iconStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
        borderWidth: 1,
        borderColor: Black,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: PrimaryAshPurple,
        borderColor: PrimaryBlue
    },
    cardtop: {
        paddingHorizontal: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    phoneEmail: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        padding: 10,
        width: '100%'
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
        paddingRight:10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20
    },
    searchIcon: {
        width: 30,
        height: 30,
        marginTop: 10,
        padding: 5,
        borderRadius: 60,
    },
    search: {
        width: "90%"
    },
    ActiveInactiveContainer: {
        alignItems: 'flex-end',
        paddingRight: 20,
        paddingTop: 15
    },
    Text:{
        color:White
    },
    NameContainer:{
        gap:10,
        paddingTop:10
    },
    name:{
        fontSize: 20, 
        fontWeight: 'bold' 
    },
    depname:{
        fontSize: 16, 
        fontWeight: '500' 
    },
    gap:{
        gap:5,
    },
    fontsize:{
        fontSize:16
    },
    button:{
        backgroundColor: PrimaryPurple,
        height: 40,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    }
});

export default styles;