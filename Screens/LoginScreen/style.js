import { StyleSheet } from "react-native";
import { Black, PrimaryPurple, PrimaryRed, White } from "../../assets/Colors";

const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoContainer: {
        width: "50%",
        height: "30%",
        borderColor: Black,
        overflow: 'hidden',
    },

    logo: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },

    loginContainer: {
        padding: 20,
        width: '90%',
        borderRadius: 13,
        backgroundColor: White,
        shadowColor: 'rgba(0, 0, 4, 4)',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        elevation: 4,
        alignItems: 'center',
    },

    loginTitle: {
        fontSize: 24,
        marginBottom: 20,
        fontFamily: 'Inter-Bold',
    },

    input: {
        backgroundColor: White,
        borderBottomWidth: 0.5,
    },

    loginButton: {
        height: 50,
        width: "100%",
        margin: 15,
        backgroundColor: PrimaryPurple,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    errorText: {
        color: PrimaryRed,
        padding: 10
    },

    bg_color: {
        width: '100%',
        height: '100%',
        padding: 16,
    },

    inputsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    inputs: {
        flex: 1,
        backgroundColor: White,
        borderBottomWidth: 0.5,
    },

    iconsContainer: {
        width: 30,
        height: 30,
        padding: 5,
    },

    Textinputfield: {
        width: "100%"
    },

    ActivityIndicatorText: {
        color: White,
        fontSize: 18
    }

});

export default styles;