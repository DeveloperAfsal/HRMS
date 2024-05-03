import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../style";

const ButtonComponent = ({ navigation }) => {

    return (
        <View style={styles.HeaderButtonView}>

            <TouchableOpacity
                style={styles.HeaderButtonActive}
                onPress={() => navigation.navigate('Basic Details')}>
                <Text style={styles.HeaderButtonTextActive}>
                    1 . Basic Details
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.HeaderButton}
                onPress={() => navigation.navigate('Employee Details')}>
                <Text style={styles.HeaderButtonText}>
                    2 . Employee Details
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.HeaderButton}
                onPress={() => navigation.navigate('Employee Role')}>
                <Text style={styles.HeaderButtonText}>
                    3 . Employee Role
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.HeaderButton}
                onPress={() => navigation.navigate('Bank Details')}>
                <Text style={styles.HeaderButtonText}>
                    4 . Bank Details
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.HeaderButton}
                onPress={() => navigation.navigate('Documents')}>
                <Text style={styles.HeaderButtonText}>
                    5 . Documents
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default ButtonComponent;