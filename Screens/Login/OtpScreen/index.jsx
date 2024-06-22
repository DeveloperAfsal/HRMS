import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { useSelector } from "react-redux";
import axios from "axios";
import { White } from "../../../Assets/Colors";
import LottieAlertSucess from "../../../Assets/Alerts/Success";
import LottieAlertError from "../../../Assets/Alerts/Error";
import LottieCatchError from "../../../Assets/Alerts/Catch";

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

            if (response.data.status === "success") {
                setLoad(false);
                handleShowAlert();
            } else {
                setLoad(false);
                // Alert.alert("Login failed");
                handleShowAlert1();
                console.error('Login failed:', response.data.error);
            }

        }

        catch (error) {
            setLoad(false);
            // Alert.alert("Error during Sending Otp", "Check The Login Credentials");
            handleShowAlert2();
            console.error('Error during login:', error);
        }
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Reset Password');
        }, 2500);
    };

    const [isAlertVisible1, setAlertVisible1] = useState(false);

    const handleShowAlert1 = (res) => {
        setAlertVisible1(true);
        setTimeout(() => {
            setAlertVisible1(false);
        }, 2500);
    };

    const [isAlertVisible2, setAlertVisible2] = useState(false);

    const handleShowAlert2 = () => {
        setAlertVisible2(true);
        setTimeout(() => {
            setAlertVisible2(false);
        }, 3000);
    };

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

            <LottieAlertSucess
                visible={isAlertVisible}
                animationSource={require('../../../Assets/Alerts/tick.json')}
                title="SuccessFully Logged In"
            />

            <LottieAlertError
                visible={isAlertVisible1}
                animationSource={require('../../../Assets/Alerts/Close.json')}
                title="Failed To Login"
            />

            <LottieCatchError
                visible={isAlertVisible2}
                animationSource={require('../../../Assets/Alerts/Catch.json')}
                title="Error While Fetching Data Check Login Credential"
            />

        </ImageBackground>
    )
}

export default Otp;