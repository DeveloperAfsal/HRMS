import React from "react";
import styles from "./style";
import { Image, View } from "react-native";

const SplashScreen = () => {
    return (
        <View style={styles.Splashcontainer}>
            <View style={styles.SplashimageContainer}>
                <Image
                    source={require('../../assets/EPK_group_Logo.png')}
                    style={styles.Splashimage}
                    resizeMode="contain"
                />
            </View>
        </View>
    )
}

export default SplashScreen;
