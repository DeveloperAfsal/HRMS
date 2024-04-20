import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    topcontainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        width: '90%',
        marginTop: "10%",
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 2,
    },

    backgroundImage: {
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },

    overlay: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: "5%",
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
    },

    datetime: {
        fontSize: 16,
        lineHeight: 21.28,
        fontWeight: '600',
        color: "#000",
    },

    button: {
        borderRadius: 140,
        width: 140,
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "5%",
        elevation: 8,
    },

    buttontext: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginTop: "5%"
    },

    clockcontainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 20
    },

    clockCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '33.3%',
        padding: 2,
    },

    timetext: {
        fontWeight: '400',
        color: "#000",
        fontSize: 14,
        paddingTop: "5%",
        lineHeight: 18.62,
        paddingBottom: "5%",
    },

    timenumbertext: {
        fontWeight: '500',
        color: "#000",
        fontSize: 16
    },

    CountContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20
    },

    cardContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: "1%",
    },

    CountContainerWidth: {
        width: '49%'
    },

    counterCards: {
        borderRadius: 5,
        marginTop: "1%",
        gap: 5,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: "center",
        elevation: 5,
        height: 78
    },

    fontStyle: {
        fontWeight: '400',
    },

    numbers: {
        fontWeight: '700',
        fontSize: 24,
        color: "#000",
        lineHeight: 31.92,
    },

    EmployeeModeBoard: {
        width: "90%",
        paddingTop: "5%",
        paddingBottom: "5%",
        borderRadius: 19,
        backgroundColor: '#F4FDFF',
        alignItems: 'center',
    },

    EmployeeModeBoardContainer: {
        paddingTop: "5%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: "5%",
    },

    EmployeeModeBoardTitle: {
        color: '#00275C',
        fontWeight: '800',
        fontSize: 18,
        lineHeight: 23.94,
    },

    border: {
        borderBottomColor: "#A2CCD6",
        borderBottomWidth: 1,
        width: "80%",
        paddingTop: "5%",
    },

    textview: {
        alignItems: 'flex-start',
        width: "65%",
    },

    text: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 18.62,
        color: "#000",
        paddingTop: "5%",
    },

    Emo: {
        flexDirection: 'row',
        paddingTop: "5%",
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "65%",
    },

    buttonContainer: {
        flexDirection: 'row',
        paddingTop: "5%",
    },

    buttonSubmit: {
        backgroundColor: "#1772FF",
        width: 94,
        height: 31,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },

    buttonCancel: {
        backgroundColor: '#F4FDFF',
        width: 94,
        height: 31,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },

    EmployeeModeBoardbuttonSubmitText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 16.94,
    },

    EmployeeModeBoardbuttonCancelText: {
        color: '#1772FF',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16.94,
    },

    EmployeeModeBoardListContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: "5%",
    },

    EmployeeListModeBoard: {
        width: "90%",
        paddingTop: "5%",
        paddingBottom: "5%",
        borderRadius: 19,
        backgroundColor: '#F4FDFF',
        alignItems: 'center',
    },

    EmoCheck: {
        flexDirection: 'row',
        paddingTop: "5%",
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "75%",
    },

    MoodBoardText: {
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 19.95,
    },

    EmoCheckList: {
        paddingTop: '5%',
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    viewMore: {
        color: '#0A60F1',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 21.28,
    },

    viewMoreContainer: {
        paddingTop: '5%',
        alignItems: 'center'
    },

    AnnounceMentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: "5%",
    },

    AnnounceMent: {
        width: "90%",
        paddingTop: "5%",
        paddingBottom: "5%",
        borderRadius: 19,
        backgroundColor: '#F4FDFF',
        alignItems: 'center',
    },

    tittle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    },

    tittleText: {
        color: '#00275C',
        lineHeight: 21.28,
        fontSize: 16,
        fontWeight: '700',
    },

    addbutton: {
        borderColor: '#0A60F1',
        borderWidth: 2,
        borderRadius: 5,
        width: 72,
        height: 31,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addbuttonText: {
        color: '#000',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 18.62,
    },
    emojiButton: {
        padding: 10,
        borderRadius: 20,
        margin: 5,
    },
    selectedEmoji: {
        backgroundColor: '#D0F6FF',
    },
    option: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    selectedOption: {
        borderBottomWidth: 2,
        borderBottomColor: '#000000',
    }
});

export default styles;

