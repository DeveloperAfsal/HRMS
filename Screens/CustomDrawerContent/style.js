import { Platform, StyleSheet } from "react-native";

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
        width: 70,
        height: 70,
        borderRadius: 70,
        borderWidth: 0.5,
    },

    dropdown: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 3,
        height: 48,
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
        height: 48,
        justifyContent: 'center',
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

    shadowContainer: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.25,
        shadowRadius: 30,
        elevation: 5, // For Android
      },

    DrawerContentScrollView: {
        // marginTop: -6,
    }

});

export default styles;