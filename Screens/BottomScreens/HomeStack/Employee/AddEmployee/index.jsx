import React from "react";
import { ScrollView, Text, TextInput, View, TouchableOpacity } from "react-native";
import styles from "./style";
import ArrowRightIcon from "../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../Assets/Icons/leftarrow.svg";

const AddEmployee = () => {

    return (
        <ScrollView>

            <View style={styles.Page}>

                <View style={styles.container}>

                    <View style={styles.HeaderButtonView}>

                        <TouchableOpacity style={styles.HeaderButtonActive}>
                            <Text style={styles.HeaderButtonTextActive}>
                                1 . Basic Details
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.HeaderButton}>
                            <Text style={styles.HeaderButtonText}>
                                2 . Employee Details
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.HeaderButton}>
                            <Text style={styles.HeaderButtonText}>
                                3 . Employee Role
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.HeaderButton}>
                            <Text style={styles.HeaderButtonText}>
                                4 . Bank Details
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.HeaderButton}>
                            <Text style={styles.HeaderButtonText}>
                                5 . Documents
                            </Text>
                        </TouchableOpacity>

                    </View>

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
                            <TouchableOpacity style={styles.NextButton}>
                                <Text style={styles.NextButtonText}>
                                    Next
                                </Text>
                                <ArrowRightIcon width={14} height={14} color={'#fff'} />
                            </TouchableOpacity>
                        </View>

                    </View>

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
                            <TouchableOpacity style={styles.PrevButton}>
                                <ArrowLeftIcon width={14} height={14} color={'#0A62F1'} />
                                <Text style={styles.PrevButtonText}>
                                    Previous
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.NextButton}>
                                <Text style={styles.NextButtonText}>
                                    Next
                                </Text>
                                <ArrowRightIcon width={14} height={14} color={'#fff'} />
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.InputContainer}>

                        <Text style={styles.Heading}>
                            Employee Role
                        </Text>

                        <Text style={styles.subHeading}>
                            User Role
                        </Text>

                        <TextInput
                            style={styles.input}
                        />

                        <Text style={styles.subHeading}>
                            Designation
                        </Text>

                        <TextInput
                            style={styles.input}
                        />

                        <Text style={styles.subHeading}>
                            Select Supervisor
                        </Text>

                        <TextInput
                            style={styles.input}
                        />

                        <Text style={styles.subHeading}>
                            Shift Role
                        </Text>

                        <TextInput
                            style={styles.input}
                        />

                        <Text style={styles.subHeading}>
                            Official Email ID
                        </Text>

                        <TextInput
                            style={styles.input}
                        />
                        <Text style={styles.subHeading}>
                            Password
                        </Text>

                        <TextInput
                            style={styles.input}
                        />

                        <Text style={styles.subHeading}>
                            Check-in / Check-out
                        </Text>

                        <TextInput
                            style={styles.input}
                        />
                        <Text style={styles.subHeading}>
                            Overtime
                        </Text>

                        <TextInput
                            style={styles.input}
                        />

                        <Text style={styles.subHeading}>
                            Late Allowed
                        </Text>

                        <TextInput
                            style={styles.input}
                        />

                        <Text style={styles.subHeading}>
                            Permission Allowed
                        </Text>

                        <TextInput
                            style={styles.input}
                        />

                        <View style={[styles.fullWidth, styles.Row, styles.Left]}>
                            <TouchableOpacity style={styles.PrevButton}>
                                <ArrowLeftIcon width={14} height={14} color={'#0A62F1'} />
                                <Text style={styles.PrevButtonText}>
                                    Previous
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.NextButton}>
                                <Text style={styles.NextButtonText}>
                                    Next
                                </Text>
                                <ArrowRightIcon width={14} height={14} color={'#fff'} />
                            </TouchableOpacity>
                        </View>

                    </View>

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

                        <TextInput
                            style={styles.input}
                        />

                        <View style={[styles.fullWidth, styles.Row, styles.Left]}>
                            <TouchableOpacity style={styles.PrevButton}>
                                <ArrowLeftIcon width={14} height={14} color={'#0A62F1'} />
                                <Text style={styles.PrevButtonText}>
                                    Previous
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.NextButton}>
                                <Text style={styles.NextButtonText}>
                                    Next
                                </Text>
                                <ArrowRightIcon width={14} height={14} color={'#fff'} />
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.InputContainer}>

                        <Text style={styles.Heading}>
                            Documents
                        </Text>

                        <Text style={styles.subHeading}>
                            Document Type
                        </Text>

                        <TextInput
                            style={styles.input}
                        />

                        <Text style={styles.subHeading}>
                            Document Name
                        </Text>

                        <TextInput
                            style={styles.input}
                        />

                        <Text style={styles.subHeading}>
                            Select File
                        </Text>

                        <View style={styles.fullWidth}>
                            <TouchableOpacity style={styles.UploadButton}>
                                <Text style={styles.UploadButtonText}>
                                    Select Image
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.fullWidth}>
                            <TouchableOpacity style={styles.NextButton}>
                                <Text style={styles.NextButtonText}>
                                    Upload
                                </Text>
                                <ArrowRightIcon width={14} height={14} color={'#fff'} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.Heading}>
                            Documents List
                        </Text>

                        <View style={[styles.fullWidth, styles.Row, styles.Left]}>
                            <TouchableOpacity style={styles.PrevButton}>
                                <ArrowLeftIcon width={14} height={14} color={'#0A62F1'} />
                                <Text style={styles.PrevButtonText}>
                                    Previous
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.NextButton}>
                                <Text style={styles.NextButtonText}>
                                    Submit
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.PrevButton}>
                                <Text style={styles.PrevButtonText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>


                    </View>

                </View>
            </View>
        </ScrollView>
    )
}

export default AddEmployee;