import React, { useState } from 'react';
import { View, Image, ImageBackground, TouchableOpacity, Text, ActivityIndicator, TextInput, Alert } from 'react-native';
import styles from './style';
import EyeCloseIcon from '../../assets/EPK CRM Icons/EyeClose.svg'
import EyeOpenIcon from '../../assets/EPK CRM Icons/EyeOpen.svg'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { White } from '../../assets/Colors';

const LoginScreen = () => {

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

            const apiUrl = 'https://officeinteriorschennai.com/api/public/api/login';

            const response = await axios.post(apiUrl, {
                loginepkempid: employeeId,
                loginpassword: password
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
                };

                // Convert val to a string before storing it in localStorage

                const valString = JSON.stringify(val);

                // Set the stringified val in localStorage

                AsyncStorage.setItem('userData', valString);
                dispatch({ type: 'SET_USER_DATA', payload: val })

            } else {
                setLoad(false);
                Alert.alert("Login failed");
                console.error('Login failed:', response.data.error);
            }
        } catch (error) {
            setLoad(false);
            Alert.alert("Error during login","Check The Login Credentials");
            console.error('Error during login:', error);
        }
    };

    // 

    return (
        <ImageBackground
            source={require('../../assets/Newlogin-bg.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
            resizeMethod="resize"
        >

            <View style={styles.bg_color}>

                <View style={styles.container}>

                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/EPK_group_Logo.png')} style={styles.logo} />
                    </View>

                    <View style={styles.loginContainer}>

                        <Text style={styles.loginTitle}>LOGIN</Text>

                        <View style={styles.Textinputfield}>

                            <TextInput
                                placeholder="Employee ID"
                                value={employeeId}
                                onChangeText={(text) => setEmployeeId(text)}
                                style={styles.input}
                            />

                            <Text style={styles.errorText}>
                                {employeeIdError}
                            </Text>

                            <View style={styles.inputsContainer}>

                                <TextInput style={styles.inputs}
                                    placeholder="Password"
                                    secureTextEntry={!passwordVisible}
                                    onChangeText={(text) => setPassword(text)} />

                                <TouchableOpacity
                                    style={styles.iconsContainer}
                                    onPress={() => setPasswordVisible(!passwordVisible)}
                                >
                                    {passwordVisible ? <EyeOpenIcon color="black" /> : <EyeCloseIcon color="black" />}
                                </TouchableOpacity>

                            </View>

                            <Text style={styles.errorText}>
                                {passwordError}
                            </Text>

                        </View>

                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            {
                                load ?
                                    <ActivityIndicator size={'small'} color={White} /> :
                                    <Text style={styles.ActivityIndicatorText}>
                                        Login
                                    </Text>
                            }
                        </TouchableOpacity>

                    </View>

                </View>

            </View>

        </ImageBackground>
    );

}

export default LoginScreen;
