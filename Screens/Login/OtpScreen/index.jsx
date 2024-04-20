import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { useSelector } from "react-redux";
import axios from "axios";
import { White } from "../../../Assets/Colors";

const Otp = ({ navigation }) => {

    // data from redux store

    const { email } = useSelector((state) => state.login)

    //  states

    const [otp, setOtp] = useState('');
    const [load, setLoad] = useState(false);
    const [otpError, setOtpError] = useState('');

    // 

    const handleOTPChange = (value, index) => {

        // Update OTP state
        const updatedOtp = otp.split('');
        updatedOtp[index] = value;
        setOtp(updatedOtp.join(''));

        // Move focus to the previous input field if the user is deleting a digit
        if (value === '' && index > 0) {
            this[`input_${index - 1}`].focus();
        }

        // Move focus to the next input field if a digit is entered
        if (value !== '' && index < 3) {
            this[`input_${index + 1}`].focus();
        }
    };

    // 

    const handleOtp = async () => {

        setLoad(true)

        try {

            if (!otp) {
                setOtpError('Employee ID is required');
                setLoad(false)
                return;
            } else {
                setOtpError('');
            }

            const apiUrl = 'https://ocean21.in/api/public/api/forgot_otp_verifiy';

            const response = await axios.post(apiUrl, {
                email: email,
                otp: otp,
            });

            if (!response.ok) {
                setLoad(false);
                navigation.navigate('Reset Password')
            } else {
                setLoad(false);
                Alert.alert("Login failed");
                console.error('Login failed:', response.data.error);
            }

        }

        catch (error) {
            setLoad(false);
            Alert.alert("Error during Sending Otp", "Check The Login Credentials");
            console.error('Error during login:', error);
        }
    }

    return (
        <ImageBackground
            source={require('../../../Assets/Image/MobileBG.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
            resizeMethod="resize"
        >
            <View style={styles.subContainer}>
                <Image source={require('../../../Assets/Image/EnterOTP.png')} />

                <View style={styles.textView}>
                    <Text style={styles.textTitle}>One Time Password</Text>
                    <Text style={styles.textContent}>Please enter an OTP sent to your email</Text>
                </View>

                <View style={styles.otpContainer}>
                    {[0, 1, 2, 3].map((index) => (
                        <TextInput
                            key={index}
                            style={styles.input}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(value) => handleOTPChange(value, index)}
                            ref={(ref) => (this[`input_${index}`] = ref)}
                        />
                    ))}
                </View>

                <Text style={styles.errorText}>
                    {otpError}
                </Text>

                <TouchableOpacity style={styles.submitButton} onPress={handleOtp}>
                    {
                        load ?
                            <ActivityIndicator size={'small'} color={White} /> :
                            <Text style={styles.submitButtonText}>
                                Verify
                            </Text>
                    }
                </TouchableOpacity>

            </View>

        </ImageBackground>
    )
}

export default Otp;