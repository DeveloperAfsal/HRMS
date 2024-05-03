import React from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import styles from "../style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";

const EmployeeDetails = ({ onEmpRole, onprevBasicDetails }) => {

    return (

        <View style={styles.InputContainer}>

            <Text style={styles.Heading}>
                Employee Details
            </Text>

            <Text style={styles.subHeading}>
                Employee Category
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Date Of Joining
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Probation Period
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Confirmation Date
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Employee Agreement Period
            </Text>

            <TextInput
                style={styles.input}
            />
            <Text style={styles.subHeading}>
                Notice Period
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                CTC
            </Text>

            <TextInput
                style={styles.input}
            />
            <Text style={styles.subHeading}>
                Gross Salary
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Net Salary
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Last Working Day
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                PF
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                UAN Number
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Employee PF Contribution
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Employer PF Contribution
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                ESI
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                ESI Number
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Employee ESI Contribution
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Employer ESI Contribution
            </Text>

            <TextInput
                style={styles.input}
            />

            <View style={[styles.fullWidth, styles.Row, styles.Left]}>
                <TouchableOpacity style={styles.PrevButton} onPress={onprevBasicDetails}>
                    <ArrowLeftIcon width={14} height={14} color={'#0A62F1'} />
                    <Text style={styles.PrevButtonText}>
                        Previous
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.NextButton} onPress={onEmpRole}>
                    <Text style={styles.NextButtonText}>
                        Next
                    </Text>
                    <ArrowRightIcon width={14} height={14} color={'#fff'} />
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default EmployeeDetails;