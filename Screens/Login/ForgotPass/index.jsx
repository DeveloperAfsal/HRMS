import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import LeftArrowIcon from '../../../Assets/Icons/leftarrow.svg';
import axios from 'axios';
import { White } from "../../../Assets/Colors";
import { useDispatch } from "react-redux";

const ForgotPassword = ({ navigation }) => {

    // useDispatch

    const dispatch = useDispatch();

    // states

    const [load, setLoad] = useState(false);
    const [email, setEmail] = useState('');
    const [employeeIdError, setEmployeeIdError] = useState('');

    // handleSubmit

    const handleSubmit = async () => {

        setLoad(true)

        try {

            if (!email) {
                setEmployeeIdError('Employee ID is required');
                setLoad(false)
                return;
            } else {
                setEmployeeIdError('');
            }

            const apiUrl = 'https://ocean21.in/api/public/api/forgot_password';

            const response = await axios.post(apiUrl, {
                email: email,
            });

            if (response.data.status === "success") {
                setLoad(false);
                navigation.navigate('Otp')
            } else {
                setLoad(false);
                Alert.alert("Login failed");
                console.error('Login failed:', response.data.error);
            }

        }

        catch (error) {
            setLoad(false);
            Alert.alert("Error during Mail", "Check The Login Credentials");
            console.error('Error during login:', error);
        }

    }

    const handelGoBack = () => {
        navigation.navigate('Login Screen')
    }

    const handleEmailChange = (text) => {
        setEmail(text);
        dispatch({ type: 'SET_EMAIL', payload: text });
    };

    return (
        <ImageBackground
            source={require('../../../Assets/Image/MobileBG.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
            resizeMethod="resize"
        >
            <View style={styles.subContainer}>

                <Image source={require('../../../Assets/Image/Forgotpassword.png')} />

                <View style={styles.textView}>
                    <Text style={styles.textTitle}>Forgot Password</Text>
                    <Text style={styles.textContent}>Enter your email and we will send
                        an OTP to reset your password </Text>
                </View>

                <View style={styles.fields}>
                    <TextInput
                        placeholder="Enter your email"
                        style={styles.inputfield}
                        value={email}
                        onChangeText={handleEmailChange}
                    />
                </View>

                <Text style={styles.errorText}>
                    {employeeIdError}
                </Text>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    {
                        load ?
                            <ActivityIndicator size={'small'} color={White} /> :
                            <Text style={styles.submitButtonText}>
                                Submit
                            </Text>
                    }
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButton} onPress={handelGoBack}>
                    <LeftArrowIcon width={15} height={15} color={White} />
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    )
}

export default ForgotPassword;