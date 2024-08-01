import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";

const AddRelievingLetter = () => {

    const [load, SetLoad] = useState(false);

    return (

        <ScrollView>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Add Relieving Letter</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Insert Header
                    </Text>

                    <TextInput
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>

                    </Text>

                    <Text style={styles.StatDateText}>
                        Insert Footer
                    </Text>

                    <TextInput
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>

                    </Text>

                    <Text style={styles.StatDateText}>
                        Date
                    </Text>

                    <TextInput
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>

                    </Text>

                    <Text style={styles.StatDateText}>
                        Employee Name
                    </Text>

                    <TextInput
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>

                    </Text>

                    <Text style={styles.StatDateText}>
                        Designation
                    </Text>

                    <TextInput
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>

                    </Text>

                    <Text style={styles.StatDateText}>
                        Company Name
                    </Text>

                    <TextInput
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>

                    </Text>

                    <Text style={styles.StatDateText}>
                        Joining Date
                    </Text>

                    <TextInput
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>

                    </Text>

                    <Text style={styles.StatDateText}>
                        Last Working Day
                    </Text>

                    <TextInput
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>

                    </Text>

                    <Text style={styles.StatDateText}>
                        Authorised Person Name
                    </Text>

                    <TextInput
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>

                    </Text>

                    <Text style={styles.StatDateText}>
                        Authorised Person Designation
                    </Text>

                    <TextInput
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>

                    </Text>

                </View>

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: '5%' }}>
                <TouchableOpacity style={styles.HeaderButtonActive} >
                    {
                        load ?
                            <ActivityIndicator size={"small"} color={"#fff"} /> :
                            <Text style={styles.HeaderButtonTextActive}>
                                Add Relieving Letter
                            </Text>
                    }
                </TouchableOpacity>

                <TouchableOpacity style={styles.HeaderButton} >
                    <Text style={styles.HeaderButtonText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>

        </ScrollView>

    )

}

export default AddRelievingLetter;