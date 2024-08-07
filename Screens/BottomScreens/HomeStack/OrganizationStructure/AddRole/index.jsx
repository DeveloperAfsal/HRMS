import React, { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { useSelector } from "react-redux";
import CheckBox from '@react-native-community/checkbox';
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";
import axios from "axios";

const AddRole = ({ navigation }) => {

    // data from redux Store 

    const { data } = useSelector((state) => state.login);

    // states

    const [load, setLoad] = useState(false);
    const [roleName, setRoleName] = useState('');
    const [nameError, setNameError] = useState('');

    const initialFieldsState = [
        { name: 'Dashboard', isChecked: false, subheadings: [], checkboxes: Array(0).fill(false) },
        { name: 'ORGStructure', isChecked: false, subheadings: ['add_Role', 'roles_list', 'supervisor_list', 'empLevel_Category', 'emp_DocumentType', 'org_Chart'], checkboxes: Array(6).fill(false) },
        { name: 'LeaveAndAttendancePolicy', isChecked: false, subheadings: ['addShiftSlot', 'assignEmployeeShift', 'attendancePolicy', 'attendanceType', 'attendanceLocation', 'leavePolicyType', 'leavePolicyCategory', '"leavePolicy"'], checkboxes: Array(7).fill(false) },
        { name: 'Employee', isChecked: false, subheadings: ['Add_Employee', 'Emp_loyeeList', 'Employee_Confirmation'], checkboxes: Array(3).fill(false) },
        { name: 'Attendance', isChecked: false, subheadings: ['DailyAttendance', 'Monthly_Attendance', 'Monthly_AttendanceCalendar', 'Monthly_List'], checkboxes: Array(4).fill(false) },
        { name: 'HRSupport', isChecked: false, subheadings: ['Approval_List', 'Template', 'Job_Opening'], checkboxes: Array(3).fill(false) },
        { name: 'TLApproval', isChecked: false, subheadings: ['Leave_Approval', 'OT_Approval'], checkboxes: Array(2).fill(false) },
        { name: 'HelpDesk', isChecked: false, subheadings: ['Issue_Type', 'Raise_Ticket', 'Tickets_List', 'Assigned_List'], checkboxes: Array(0).fill(false) },
        { name: 'Assets', isChecked: false, subheadings: ['Assets_Type', 'Assign_Asset', 'Asset_List'], checkboxes: Array(3).fill(false) },
        { name: 'Events', isChecked: false, subheadings: ['Add_Event', 'Event_List'], checkboxes: Array(2).fill(false) },
        { name: 'Meeting', isChecked: false, subheadings: ['Add_Meeting', 'Meeting_List'], checkboxes: Array(2).fill(false) },
        { name: 'TeamTask', isChecked: false, subheadings: ['Add_Project', 'Project_List', 'Add_task', 'Task_List', 'Assigned_Task', 'TL_Assigned_Task'], checkboxes: Array(6).fill(false) },
        { name: 'Payroll', isChecked: false, subheadings: ['OverTimeCalculation', 'Assign Employee Salary', 'Salarycalculation', 'Generate_payslip', 'Payslip_list'], checkboxes: Array(3).fill(false) },
        { name: 'Holiday', isChecked: false, subheadings: [], checkboxes: Array(0).fill(false) },
        { name: 'Visitiormanagement', isChecked: false, subheadings: ['Add_visitor', 'Visitor_log'], checkboxes: Array(2).fill(false) },
        { name: 'Logs', isChecked: false, subheadings: ['Activity_Log', 'Employee_ActivityLog'], checkboxes: Array(2).fill(false) },

    ];

    const [fields, setFields] = useState(initialFieldsState);

    // checkbox Handler

    const toggleFieldCheckBox = (fieldIndex) => {
        const newFields = [...fields];
        newFields[fieldIndex].isChecked = !newFields[fieldIndex].isChecked;
        newFields[fieldIndex].checkboxes = newFields[fieldIndex].checkboxes.map(() => newFields[fieldIndex].isChecked);
        setFields(newFields);
        updateCheckedNames(fieldIndex, newFields[fieldIndex].isChecked);
    };

    const toggleSubheadingCheckBox = (fieldIndex, subheadingIndex) => {
        const newFields = [...fields];
        newFields[fieldIndex].checkboxes[subheadingIndex] = !newFields[fieldIndex].checkboxes[subheadingIndex]; // Toggle the subheading checkbox state
        setFields(newFields);
        updateCheckedNames(fieldIndex, newFields[fieldIndex].checkboxes[subheadingIndex], subheadingIndex);
    };

    // checkbox Handler

    const updateCheckedNames = (fieldIndex, isChecked, subheadingIndex = null) => {
        const newCheckedNames = { ...checkedNames };
        const fieldName = fields[fieldIndex].name;
        if (isChecked) {
            if (subheadingIndex !== null) {
                if (!newCheckedNames[fieldName]) {
                    newCheckedNames[fieldName] = []; // Initialize as array if it doesn't exist
                }
                newCheckedNames[fieldName].push(fields[fieldIndex].subheadings[subheadingIndex]);
            } else {
                // Add the field name directly to the array if it has no subheadings
                newCheckedNames[fieldName] = [fieldName];
            }
        } else {
            if (subheadingIndex !== null) {
                if (newCheckedNames[fieldName]) { // Check if the array exists
                    const index = newCheckedNames[fieldName].indexOf(fields[fieldIndex].subheadings[subheadingIndex]);
                    if (index !== -1) {
                        newCheckedNames[fieldName].splice(index, 1);
                    }
                }
            } else {
                // Remove the field name from the array if it has no subheadings
                delete newCheckedNames[fieldName];
            }
        }
        setCheckedNames(newCheckedNames);
    };

    const [checkedNames, setCheckedNames] = useState({
        'Dashboard': [],
        'ORGStructure': [],
        'LeaveAndAttendancePolicy': [],
        'Employee': [],
        'Attendance': [],
        'HRSupport': [],
        'TLApproval': [],
        'HelpDesk': [],
        'Assets': [],
        'Events': [],
        'Meeting': [],
        'TeamTask': [],
        'Payroll': [],
        'Holiday': [],
        'Visitiormanagement': [],
        'Logs': [],
    });

    // HandleSubmit

    const HandleSubmit = async () => {

        setLoad(true);

        try {

            if (!roleName) {
                setNameError('Role Name Required ');
                Alert.alert('Missing', "Check The Role Name Field");
                setLoad(false);
                return;
            } else {
                setNameError('');
            }

            const apiUrl = 'https://ocean21.in/api/public/api/addroleinsert';
            const response = await axios.post(apiUrl, {
                role_name: roleName,
                permission: checkedNames,
                created_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            console.log(response.data, "response.data")

            if (response.data.status === "success") {
                setLoad(false);
                // navigation.navigate('Roles List');
                // Alert.alert("SuccessFull", response.data.message);
                handleShowAlert(response.data);
                setFields(initialFieldsState);
                setRoleName('');
            } else if (response.data.status === "error") {
                setNameError(response.data.message);
                // Alert.alert("Failed", response.data.message);
                handleShowAlert1(response.data);
                setLoad(false);
            } else {
                setLoad(false);
                // Alert.alert("Failed To Add");
                handleShowAlert1(response.data);
                console.error('Failed To Add:', response.data.error);
            }

        } catch (error) {
            setLoad(false);
            handleShowAlert2();
            // Alert.alert("Error during submit", "Check The Input Credentials.");
            console.error('Error during submit:', error);
        }
    }

    const HandleCancel = () => {
        setFields(initialFieldsState);
        setRoleName('');
        setNameError('');
    };

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res.message)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Roles List');
        }, 2500);
    };

    const [isAlertVisible1, setAlertVisible1] = useState(false);
    const [resMessageFail, setResMessageFail] = useState('');

    const handleShowAlert1 = (res) => {
        setAlertVisible1(true);
        setResMessageFail(res.message);
        setTimeout(() => {
            setAlertVisible1(false);
        }, 2500);
    };

    const [isAlertVisible2, setAlertVisible2] = useState(false);

    const handleShowAlert2 = () => {
        setAlertVisible2(true);
        setTimeout(() => {
            setAlertVisible2(false);
        }, 3000);
    };

    return (

        <ScrollView>

            <View style={styles.AddroleContainer}>

                <View style={styles.Inputcontainer}>

                    <View style={styles.Row}>
                        <View style={{ width: "40%", alignItems: 'center' }}>
                            <Text style={styles.AddroleText}>
                                Add Role Name :
                            </Text>
                        </View>
                        <View style={{ width: "50%" }}>
                            <TextInput
                                style={styles.TextInput}
                                value={roleName}
                                onChangeText={(txt) => setRoleName(txt)} />
                            <Text style={styles.errorText}>
                                {nameError}
                            </Text>
                        </View>
                    </View>



                    {fields.map((field, fieldIndex) => (
                        <View key={fieldIndex}>
                            <View style={styles.checkView}>
                                {['Dashboard', 'Holiday'].includes(field.name) && (
                                    <CheckBox
                                        disabled={false}
                                        value={field.isChecked}
                                        onValueChange={() => toggleFieldCheckBox(fieldIndex)}
                                        tintColors={{ true: '#20DDFE' }}
                                        style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                                    />
                                )}
                                <Text style={styles.FieldHeader}>{field.name}</Text>
                            </View>

                            {field.subheadings.map((subheading, subheadingIndex) => (
                                <View key={subheadingIndex} style={styles.checkView}>
                                    <CheckBox
                                        disabled={false}
                                        value={field.checkboxes[subheadingIndex]}
                                        onValueChange={() => toggleSubheadingCheckBox(fieldIndex, subheadingIndex)}
                                        style={{ marginLeft: 20 }}
                                        tintColors={{ true: '#20DDFE' }}
                                    />
                                    <Text style={styles.Subheading}>{subheading}</Text>
                                </View>
                            ))}
                        </View>
                    ))}

                    <View style={styles.buttonview}>

                        <TouchableOpacity style={styles.submitbutton} onPress={HandleSubmit}>
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.submitbuttonText}>
                                        Submit
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton} onPress={HandleCancel}>
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

                <LottieAlertSucess
                    visible={isAlertVisible}
                    animationSource={require('../../../../../Assets/Alerts/tick.json')}
                    title={resMessage}
                />

                <LottieAlertError
                    visible={isAlertVisible1}
                    animationSource={require('../../../../../Assets/Alerts/Close.json')}
                    title={resMessageFail}
                />

                <LottieCatchError
                    visible={isAlertVisible2}
                    animationSource={require('../../../../../Assets/Alerts/Catch.json')}
                    title="Error While Fetching Data"
                />

            </View>

        </ScrollView>

    )
}


export default AddRole;