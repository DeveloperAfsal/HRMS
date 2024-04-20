import React, { useState } from "react";
import styles from "./style";
import { ActivityIndicator, Alert, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import EyeOpenIcon from '../../../Assets/Icons/eyeopen.svg';
import { White } from "../../../Assets/Colors";
import axios from "axios";
import { useSelector } from "react-redux";

const ResetPassword = ({ navigation }) => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showEmployeeId, setShowEmployeeId] = useState(false);
    const [employeeIdError, setEmployeeIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [EmployeeId, setEmployeeId] = useState('');
    const [Password, setPassword] = useState('');
    const [load, setLoad] = useState(false);

    const { email } = useSelector((state) => state.login)

    const handleReset = async () => {

        setLoad(true)

        try {

            if (!EmployeeId) {
                setEmployeeIdError('Password is required');
                setLoad(false)
                return;
            } else {
                setEmployeeIdError('');
            }

            if (!Password) {
                setPasswordError('Confirm Password is required');
                setLoad(false)
                return;
            } else {
                setPasswordError('');
            }

            if (EmployeeId !== Password) {
                Alert.alert("Passwords do not match");
                setLoad(false);
                return;
            }

            const apiUrl = 'https://ocean21.in/api/public/api/forgot_change_password';

            const response = await axios.post(apiUrl, {
                email: email,
                change_password: EmployeeId,
            });

            if (!response.ok) {
                setLoad(false);
                navigation.navigate('Login Screen');
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

    return (
        <ImageBackground
            source={require('../../../Assets/Image/MobileBG.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
            resizeMethod="resize"
        >
            <View style={styles.subContainer}>
                <Image source={require('../../../Assets/Image/ResetPassword.png')} />

                <View style={styles.textView}>
                    <Text style={styles.textTitle}>Reset Password</Text>
                </View>

                <View style={styles.fields}>

                    <View style={styles.inputContainer}>

                        <TextInput
                            placeholder="Enter new password"
                            style={styles.inputfield}
                            value={EmployeeId}
                            onChangeText={(text) => setEmployeeId(text)}
                        />

                        <TouchableOpacity
                            style={styles.iconsContainer}
                            onPress={() => setShowEmployeeId(!showEmployeeId)}
                        >
                            {showEmployeeId ? <EyeOpenIcon color="black" /> : <EyeOpenIcon color="red" />}
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.errorText}>
                        {employeeIdError}
                    </Text>

                    <View style={styles.inputContainer}>

                        <TextInput
                            placeholder="Confirm new password"
                            style={styles.inputfield}
                            secureTextEntry={!passwordVisible}
                            value={Password}
                            onChangeText={(text) => setPassword(text)}
                        />

                        <TouchableOpacity
                            style={styles.iconsContainer}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <EyeOpenIcon color="black" /> : <EyeOpenIcon color="red" />}
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.errorText}>
                        {passwordError}
                    </Text>

                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleReset}>
                    {
                        load ?
                            <ActivityIndicator size={'small'} color={White} /> :
                            <Text style={styles.submitButtonText}>
                                Reset Password
                            </Text>
                    }
                </TouchableOpacity>

            </View>
        </ImageBackground>
    )
}

export default ResetPassword;