import { StyleSheet } from "react-native";
import { PrimaryPurple, PrimaryRed, White } from "../../../../../assets/Colors";

const styles = StyleSheet.create({
    input: {
        backgroundColor: White,
        marginBottom: 10,
        paddingLeft: 20,
        height: 50,
        justifyContent: 'center'
    },
    Button1: {
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 60,
        backgroundColor:PrimaryPurple,
        height:40,
        alignItems:'center',
        justifyContent:'center'
    },
    subContainer: {
        padding: 15,
        borderRadius: 15,
        marginBottom: 20
    },
    subHeading: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        paddingLeft:10
    },
    errorText: {
        color: PrimaryRed,
        fontSize: 12,
        marginBottom: 5
    },
    subtop: {
        fontSize: 15,
        margin:10,
        paddingLeft:10,
        fontWeight:'600'
    },
    container:{
        padding:15
    },
    text: {
        color: White
    },
    padding: {
        paddingLeft: 0
    },
});

export default styles;