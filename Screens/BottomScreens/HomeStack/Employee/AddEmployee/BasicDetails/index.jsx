import React from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import styles from "../style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";

const BasicDetails = ({ onEmpDetails }) => {

    return (

        <View style={styles.InputContainer}>

            <Text style={styles.Heading}>
                Basic Details
            </Text>

            <Text style={styles.subHeading}>
                Employee ID
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Employee Picture
            </Text>

            <View style={styles.fullWidth}>
                <TouchableOpacity style={styles.UploadButton}>
                    <Text style={styles.UploadButtonText}>
                        Upload Image
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.subHeading}>
                First Name
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Last Name
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Gender
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Status
            </Text>

            <TextInput
                style={styles.input}
            />
            <Text style={styles.subHeading}>
                Phone Number
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Whatsapp Number
            </Text>

            <TextInput
                style={styles.input}
            />
            <Text style={styles.subHeading}>
                Email ID
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Date Of Birth
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Current Address
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Permanent Address
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Parent / Guardian Name
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Marital Status
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Spouse Name
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Aadhar Number
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                PAN Number
            </Text>

            <TextInput
                style={styles.input}
            />

            <View style={styles.fullWidth}>
                <TouchableOpacity style={styles.NextButton} onPress={onEmpDetails}>
                    <Text style={styles.NextButtonText}>
                        Next
                    </Text>
                    <ArrowRightIcon width={14} height={14} color={'#fff'} />
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default BasicDetails;