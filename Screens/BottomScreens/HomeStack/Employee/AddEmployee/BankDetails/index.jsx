import React, { useState } from "react";
import { ScrollView, Text, TextInput, View, TouchableOpacity } from "react-native";
import styles from "../style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";

const BankDetails = ({ onDetails, onprevEmpRole }) => {

    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdown(false);
    };

    return (

        <View style={styles.InputContainer}>

            <Text style={styles.Heading}>
                Bank Details
            </Text>

            <Text style={styles.subHeading}>
                Bank Account Number
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Bank Name
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Bank Branch
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                IFSC Code
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Select Account Type
            </Text>

            <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>{selectedStatus || "Selected Account Type"}</Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showDropdown && (

                <View style={styles.dropdown}>

                    <TouchableOpacity onPress={() => selectStatus("Savings")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Savings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectStatus("Current")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Current</Text>
                    </TouchableOpacity>

                </View>

            )}

            <View style={[styles.fullWidth, styles.Row, styles.Left]}>
                <TouchableOpacity style={styles.PrevButton} onPress={onprevEmpRole}>
                    <ArrowLeftIcon width={14} height={14} color={'#0A62F1'} />
                    <Text style={styles.PrevButtonText}>
                        Previous
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.NextButton} onPress={onDetails}>
                    <Text style={styles.NextButtonText}>
                        Next
                    </Text>
                    <ArrowRightIcon width={14} height={14} color={'#fff'} />
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default BankDetails;
