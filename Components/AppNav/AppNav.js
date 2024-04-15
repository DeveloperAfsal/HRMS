import React, { useEffect, useState } from "react";
import LoginScreen from "../../Screens/LoginScreen/index.jsx";
import AppNavigator from "../../Screens/DrawerNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import SplashScreen from "../../Screens/SplashScreen/index.jsx";

const AppNav = () => {

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
        const val = JSON.parse(valString);
        setLoading(false);
        dispatch({ type: 'SET_USER_DATA', payload: val });
      } catch (error) {
        setLoading(false);
        console.error('Error retrieving data from storage:', error);
      }
    };

    fetchData();
  }, []);


  return (

    <>

      {

        !loading ? (

          data != null ? (

            <AppNavigator />

          ) :

            (
              <LoginScreen />
            )

        ) :

          (
            <SplashScreen />
          )

      }

    </>

  )

}

export default AppNav;