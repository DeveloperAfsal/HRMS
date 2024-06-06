import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    Card: {
        backgroundColor: '#00275C',
        width: "60%",
        height: 70,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        paddingLeft: '3%',
        marginTop: '5%'
    },

    ImgCard: {
        backgroundColor: '#fff',
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
    },

    Img: {
        width: 45,
        height: 45,
        borderColor: '#fff',
        borderWidth: 1
    },

    Name: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        marginVertical: '5%'
    },

    Role: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600'
    },

})

export default styles;