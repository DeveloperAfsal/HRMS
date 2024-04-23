import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import CheckInOutField from "../../../../../Components/CheckBox";



const AddRole = () => {

    const [load, SetLoad] = useState(false);

    return (
        <ScrollView>
            <View style={styles.AddroleContainer}>

                <View style={styles.Inputcontainer}>

                    <View style={styles.Row}>

                        <Text style={styles.AddroleText}>
                            Add Role Name
                        </Text>

                        <TextInput style={styles.TextInput} />

                    </View>

                    <View style={styles.checkView}>
                        <CheckInOutField fieldName="Dashboard" />
                    </View>

                    <View style={styles.checkView}>
                        <CheckInOutField fieldName="ORG Structure" />
                        <View style={styles.SubHeaderView}>
                            <CheckInOutField SubHeader="Add Role" />
                            <CheckInOutField SubHeader="Roles List" />
                            <CheckInOutField SubHeader="Supervisor List" />
                            <CheckInOutField SubHeader="Employee Level Category" />
                            <CheckInOutField SubHeader="Employee Document Type" />
                            <CheckInOutField SubHeader="ORG Chart" />
                        </View>
                    </View>

                    <View style={styles.checkView}>
                        <Text style={styles.Header}>Leave & Attendance Policy</Text>
                        <View style={styles.SubHeaderView}>
                            <CheckInOutField SubHeader="Add Shift Slot" />
                            <CheckInOutField SubHeader="Assign Employee Shift" />
                            <CheckInOutField SubHeader="Attendance Policy" />
                            <CheckInOutField SubHeader="Attendance Type" />
                            <CheckInOutField SubHeader="Attendance Location" />
                            <CheckInOutField SubHeader="Leave Policy Type" />
                            <CheckInOutField SubHeader="Leave Policy Category" />
                        </View>
                    </View>

                    <View style={styles.checkView}>
                        <Text style={styles.Header}>Employee</Text>
                        <View style={styles.SubHeaderView}>
                            <CheckInOutField SubHeader="Add Employee" />
                            <CheckInOutField SubHeader="Employee List" />
                            <CheckInOutField SubHeader="Employee Confirmation" />
                        </View>
                    </View>

                    <View style={styles.checkView}>
                        <Text style={styles.Header}>Attendance</Text>
                        <View style={styles.SubHeaderView}>
                            <CheckInOutField SubHeader="Daily Attendance" />
                            <CheckInOutField SubHeader="Monthly Attendance" />
                            <CheckInOutField SubHeader="Monthly Attendance Calendar View" />
                            <CheckInOutField SubHeader="Monthly List" />
                        </View>
                    </View>

                    <View style={styles.checkView}>
                        <Text style={styles.Header}>HR Support</Text>
                        <View style={styles.SubHeaderView}>
                            <CheckInOutField SubHeader="Approvals Requeste" />
                            <CheckInOutField SubHeader="Templates" />
                            <CheckInOutField SubHeader="Job Openings" />
                        </View>
                    </View>

                    <View style={styles.checkView}>
                        <Text style={styles.Header}>TL Approval</Text>
                        <View style={styles.SubHeaderView}>
                            <CheckInOutField SubHeader="Leave Approval" />
                            <CheckInOutField SubHeader="OT Approval" />
                        </View>
                    </View>

                    <View style={styles.checkView}>
                        <CheckInOutField fieldName="Help Desk" />
                    </View>

                    <View style={styles.checkView}>
                        <Text style={styles.Header}>Assets</Text>
                        <View style={styles.SubHeaderView}>
                            <CheckInOutField SubHeader="Assets Type" />
                            <CheckInOutField SubHeader="Add Asset" />
                            <CheckInOutField SubHeader="Asset List" />
                        </View>
                    </View>

                    <View style={styles.checkView}>
                        <Text style={styles.Header}>Events</Text>
                        <View style={styles.SubHeaderView}>
                            <CheckInOutField SubHeader="Add Event" />
                            <CheckInOutField SubHeader="Event List" />
                        </View>
                    </View>

                    <View style={styles.checkView}>
                        <Text style={styles.Header}>Meetings</Text>
                        <View style={styles.SubHeaderView}>
                            <CheckInOutField SubHeader="Add Meeting" />
                            <CheckInOutField SubHeader="Meeting List" />
                        </View>
                    </View>

                    <View style={styles.checkView}>
                        <Text style={styles.Header}>Team Task</Text>
                        <View style={styles.SubHeaderView}>
                            <CheckInOutField SubHeader="Add Project" />
                            <CheckInOutField SubHeader="Project List" />
                            <CheckInOutField SubHeader="Add Task" />
                            <CheckInOutField SubHeader="Tasks - Employee View" />
                            <CheckInOutField SubHeader="Tasks List" />
                            <CheckInOutField SubHeader="Tasks Progress" />
                        </View>
                    </View>

                    <View style={styles.checkView}>
                        <Text style={styles.Header}>Pay Roll</Text>
                        <View style={styles.SubHeaderView}>
                            <CheckInOutField SubHeader="Salary Calculation" />
                            <CheckInOutField SubHeader="Generate Payslip" />
                            <CheckInOutField SubHeader="Payroll List" />
                        </View>
                    </View>

                    <View style={styles.checkView}>
                        <CheckInOutField fieldName="Holiday" />
                    </View>

                    <View style={styles.checkView}>
                        <CheckInOutField fieldName="Visitor Management" />
                        <View style={styles.SubHeaderView}>
                            <CheckInOutField SubHeader="Add Visitors" />
                            <CheckInOutField SubHeader="Visitors Log" />
                        </View>
                    </View>

                    <View style={styles.checkView}>
                        <CheckInOutField fieldName="Logs" />
                        <View style={styles.SubHeaderView}>
                            <CheckInOutField SubHeader="Activity Log" />
                            <CheckInOutField SubHeader="Employee Activity Log" />
                        </View>
                    </View>

                    <View style={styles.buttonview}>

                        <TouchableOpacity style={styles.submitbutton}>
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.submitbuttonText}>
                                        Submit
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton}>
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

export default AddRole;