import React, { useEffect, useState } from "react";
import LoginScreen from "../../Screens/Login/LoginScreen";
import AppNavigator from "../../Screens/DrawerNavigation";
import { useDispatch, useSelector } from "react-redux";
import SplashScreen from "../../Screens/SplashScreen/index.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from "../../Screens/Login/ForgotPass/index.jsx";
import ResetPassword from "../../Screens/Login/ResetPass/index.jsx";
import Otp from "../../Screens/Login/OtpScreen/index.jsx";
import { Alert } from "react-native";
import LottieAlertSucess from "../../Assets/Alerts/Success";
import AddRelievingLetter from "../../Screens/BottomScreens/HomeStack/Template/ReleivingLetter/AddRelievingLetter/index.jsx";


const Stack = createNativeStackNavigator();

const AppNav = ({ navigation }) => {

    // state 

    const [loading, setLoading] = useState(true);

    // dispatch

    const dispatch = useDispatch();

    // data from redux store

    const { data } = useSelector((state) => state.login)


    // Api call

    useEffect(() => {

        const fetchData = async () => {
            try {
                const valString = await AsyncStorage.getItem('userData');
                const mailString = await AsyncStorage.getItem('userMail');
                const val = JSON.parse(valString);
                const mail = JSON.parse(mailString);
                setLoading(false);
                dispatch({ type: 'SET_USER_DATA', payload: val });
                dispatch({ type: 'SET_EMAIL', payload: mail });
            } catch (error) {
                setLoading(false);
                console.error('Error retrieving data from storage:', error);
            }
        };

        fetchData();
    }, []);

    const [isAlertVisible, setAlertVisible] = useState(false);

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
        }, 2500);
    };

    useEffect(() => {
        if (data != null) {
            handleShowAlert();
        } else {
            // Alert.alert("Oops", "Your Session Has Expired");
        }
    }, [data]);



    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>

                {
                    !loading ?
                        (
                            data != null ? (
                                <Stack.Screen name="AppNavigator" component={AppNavigator} />
                            ) :
                                (
                                    <Stack.Screen name="Login Screen" component={AddRelievingLetter} />
                                )
                        ) : (
                            <Stack.Screen name="SplashScreen" component={SplashScreen} />
                        )
                }

                <Stack.Screen name="Forgot Password" component={ForgotPassword} />
                <Stack.Screen name="Reset Password" component={ResetPassword} />
                <Stack.Screen name="Otp" component={Otp} />

            </Stack.Navigator>

            <LottieAlertSucess
                visible={isAlertVisible}
                animationSource={require('../../Assets/Alerts/tick.json')}
                title="Successfully Logged In"
            />

        </>


    )
}

export default AppNav;