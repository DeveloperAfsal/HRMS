import React, { useState } from "react";
import { ActivityIndicator, Alert, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import EyeOpenIcon from '../../../Assets/Icons/eyeopen.svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { White } from "../../../Assets/Colors";

const LoginScreen = ({ navigation }) => {

    // 

    const handleForgotPassword = () => {
        navigation.navigate('Forgot Password');
    };

    // dispatch

    const dispatch = useDispatch();

    // states

    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [employeeIdError, setEmployeeIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [load, setLoad] = useState(false);

    // handle login

    const handleLogin = async () => {

        setLoad(true)

        try {

            if (!employeeId) {
                setEmployeeIdError('Employee ID is required');
                setLoad(false)
                return;
            } else {
                setEmployeeIdError('');
            }

            if (!password) {
                setPasswordError('Password is required');
                setLoad(false)
                return;
            } else {
                setPasswordError('');
            }

            const apiUrl = 'https://ocean21.in/api/public/api/login';

            const response = await axios.post(apiUrl, {
                user_login: employeeId,
                password: password
            });

            if (response && response.data && response.data.token) {

                setLoad(false);
                const data = response.data;

                const val = {
                    token: data.token,
                    usercheckincurrentdate: data.usercheckincurrentdate,
                    userdepartment: data.userdepartment,
                    userdepartmentname: data.userdepartmentname,
                    useremail: data.useremail,
                    userempcheckintime: data.userempcheckintime,
                    userempcheckouttime: data.userempcheckouttime,
                    userempchecktotaltime: data.userempchecktotaltime,
                    userempid: data.userempid,
                    userepkempid: data.userepkempid,
                    userimage: data.userimage,
                    userlogin: data.userlogin,
                    usermobile: data.usermobile,
                    username: data.username,
                    userrole: data.userrole,
                    supervisor: data.supervisor,
                    user_loginid: data.user_loginid,
                };

                const mail = {
                    useremail: data.useremail,
                }

                // Convert val to a string before storing it in localStorage

                const valString = JSON.stringify(val);
                const mailString = JSON.stringify(mail);

                // Set the stringified val in localStorage

                AsyncStorage.setItem('userData', valString);
                dispatch({ type: 'SET_USER_DATA', payload: val })

                AsyncStorage.setItem('userMail', mailString);
                dispatch({ type: 'SET_EMAIL', payload: mail })

            } else {
                setLoad(false);
                Alert.alert("Login failed");
                console.error('Login failed:', response.data.error);
            }
        } catch (error) {
            setLoad(false);
            Alert.alert("Error during login", "Check The Login Credentials");
            console.error('Error during login:', error);
        }
    };

    return (

        <ImageBackground
            source={require('../../../Assets/Image/MobileBG.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
            resizeMethod="resize"
        >
            <View>
            </View>

            <View style={styles.subContainer}>
                <View style={styles.LogoContainer}>
                    <Text style={styles.LogoText}>Logo</Text>
                </View>

                <View style={styles.fields}>

                    <TextInput
                        placeholder="Email ID/Employee ID"
                        style={styles.inputfield}
                        value={employeeId}
                        onChangeText={(text) => setEmployeeId(text)}
                    />

                    <Text style={styles.errorText}>
                        {employeeIdError}
                    </Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Password"
                            style={styles.inputfieldpass}
                            secureTextEntry={!passwordVisible}
                            value={password}
                            onChangeText={(text) => setPassword(text)} />


                        <TouchableOpacity
                            style={styles.iconsContainer}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <EyeOpenIcon color="black" /> : <EyeOpenIcon color="#20DDFE" />}
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.errorText}>
                        {passwordError}
                    </Text>

                </View>


                <TouchableOpacity style={styles.ForgotPassword} onPress={handleForgotPassword}>
                    <Text style={styles.ForgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <View style={styles.loginView}>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        {
                            load ?
                                <ActivityIndicator size={'small'} color={White} /> :
                                <Text style={styles.loginButtonText}>Log In</Text>
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.powerby}>
                    <Text style={styles.powerbyText}>Powered by</Text>
                </View>

                <View style={styles.powerdebyContent}>
                    <View style={styles.powerdebyContentIcon}></View>
                    <Text style={styles.powerdebyContentName}>ABCD</Text>
                </View>
            </View>

            <View style={styles.endContainer}>

                <TouchableOpacity>
                    <Text style={styles.endContainerText}>Cookie Policy</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.endContainerText}>Terms of Use</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.endContainerText}>Privacy Policy</Text>
                </TouchableOpacity>

            </View>

        </ImageBackground>

    )
}

export default LoginScreen;
