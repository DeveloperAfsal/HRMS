import { Platform, StyleSheet } from "react-native";
// import { Black, PrimaryAshPurple, PrimaryPurple, White } from "../../assets/Colors";

const styles = StyleSheet.create({
    profileview: {
        flexDirection: 'row',
        backgroundColor: "#1FDAFD",
        padding: 10,
        paddingTop: 30,
        alignItems: 'center'
    },
    profileviewusername: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    profileviewuserdepartmentname: {
        fontSize: 14,
        fontWeight: '500'
    },
    imageview: {
        marginRight: 16,
    },
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 0.5,
        // borderColor: PrimaryPurple
    },
    dropdown: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'red',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 3,
        height: 48,
        // elevation: Platform.OS === 'android' ? 2 : 0,
        // shadowColor: Black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
    },
    dropdownText: {
        fontSize: 16,
        fontWeight: '400',
    },
    forSingle: {
        // backgroundColor: PrimaryAshPurple,
        height: 48,
        justifyContent: 'center',
        // elevation: Platform.OS === 'android' ? 2 : 0,
        // shadowColor: Black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
    },
    forsinglelable: {
        fontSize: 16,
        fontWeight: '600',
    },
    Tab: {
        display: 'flex',
        flexDirection: 'row',
        gap: 30
    },
    DrawerContentScrollView: {
        // backgroundColor: White,
        marginTop: -6
    }
});

export default styles;