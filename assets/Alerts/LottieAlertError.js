import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

const LottieAlertError = ({ visible, animationSource, title, message }) => {
    return (
        <Modal isVisible={visible} animationIn="fadeIn">
            <View style={styles.container}>
                <LottieView
                    source={animationSource}
                    autoPlay
                    loop
                    style={styles.animation}
                />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message}</Text>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    animation: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        marginTop: 8,
        textAlign: 'center',
    },
});

export default LottieAlertError;
