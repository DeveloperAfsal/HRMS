import { StyleSheet } from "react-native";
import { Black, PrimaryAshPurple, White } from '../../../assets/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: White,
        paddingTop: 25,
    },
    name:{
        fontSize: 20, 
        fontWeight: 'bold', 
        paddingTop: 10,
    },
    role:{
        fontSize: 16, 
        fontWeight: '500', 
        paddingTop: 10,
    },
    imageStyle: {
        width: 150,
        height: 150,
        borderRadius: 150,
        borderWidth: 1,
        borderColor: Black
    },
    iconStyle: {
        width: 150,
        height: 150,
        borderRadius: 150,
        borderWidth: 1,
        borderColor: Black,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: PrimaryAshPurple,
    },
    profileimage: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
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
        marginTop: 10,
    },
    detailsText: {
        fontSize: 16,
        paddingTop: 10,
        fontWeight: '400'
    },
    activityIndicator: {
        marginTop: '75%',
    },

    loader:{
        marginTop:'50%'
    }
});

export default styles;