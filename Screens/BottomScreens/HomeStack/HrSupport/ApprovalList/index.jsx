import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ArrowRightIcon from "../../../../../Assets/Icons/ArrowRight.svg";
import styles from "./style";

const ApprovalList = ({ navigation }) => {

    return (

        <ScrollView>

            <View style={styles.Container}>

                <TouchableOpacity style={styles.Button}>
                    <Text style={styles.ButtonText}>
                        Add Leave/Permission/Half Day
                    </Text>
                </TouchableOpacity>

                <View style={styles.ButtonView}>

                    <TouchableOpacity style={styles.HalfButton}>
                        <Text style={styles.ButtonText}>
                            Add Attendance
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.HalfButton}>
                        <Text style={styles.ButtonText}>
                            Add Over Time
                        </Text>
                    </TouchableOpacity>

                </View>

                <View>

                    <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Attendance Request')}>
                        <Text style={styles.primaryButtonText}>Attendance Request</Text>
                        <ArrowRightIcon width={15} height={24} color={'#0A62F1'} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Leave Request')}>
                        <Text style={styles.primaryButtonText}>Leave Request</Text>
                        <ArrowRightIcon width={15} height={24} color={'#0A62F1'} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Permission Request')}>
                        <Text style={styles.primaryButtonText}>Permission Request</Text>
                        <ArrowRightIcon width={15} height={24} color={'#0A62F1'} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('HalfDay Request')}>
                        <Text style={styles.primaryButtonText}>Half Day Request</Text>
                        <ArrowRightIcon width={15} height={24} color={'#0A62F1'} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('OverTime Request')}>
                        <Text style={styles.primaryButtonText}>Over Time Request</Text>
                        <ArrowRightIcon width={15} height={24} color={'#0A62F1'} />
                    </TouchableOpacity>

                </View>

            </View>

        </ScrollView>

    )
}

export default ApprovalList;