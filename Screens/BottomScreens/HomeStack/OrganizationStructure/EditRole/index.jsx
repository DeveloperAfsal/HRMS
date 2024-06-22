import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { useSelector } from "react-redux";
import CheckBox from '@react-native-community/checkbox';
import axios from "axios";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const EditRole = ({ navigation, route }) => {

    // data from redux store

    const { data } = useSelector((state) => state.login);

    // states

    const [load, setLoad] = useState(false);
    const [roleName, setRoleName] = useState('');
    const [nameError, setNameError] = useState('');

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
    const [selectedID, setSelectedID] = useState();
    const [Activity, setActivity] = useState();

    // 

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

    // 

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

    // 

    const SpecId = route.params.Id;

    //  

    useEffect(() => {

        const fetchData = async () => {

            try {
                const apiUrl = `https://ocean21.in/api/public/api/editview_role/${SpecId}`;

                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;

                if (responseData) {
                    setRoleName(responseData.role_name);
                    setActivity(responseData.status);
                    setSelectedID(responseData.id);

                    let parsedPermissions;
                    try {
                        parsedPermissions = JSON.parse(responseData.permission);
                    } catch (error) {
                        console.error('Error parsing permissions JSON:', error);
                        parsedPermissions = {};
                    }

                    if (typeof parsedPermissions === 'string') {
                        parsedPermissions = JSON.parse(parsedPermissions);
                    }

                    if (typeof parsedPermissions === 'object' && parsedPermissions !== null) {
                        setCheckedNames(parsedPermissions);
                    } else {
                        console.error('Parsed permissions are not in the expected format:', parsedPermissions);
                    }
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [SpecId]);

    // 

    const HandleSubmit = async () => {

        setLoad(true);

        if (!nameError) {
            setNameError('Role Name Required');
        }

        try {
            const apiUrl = 'https://ocean21.in/api/public/api/update_role';
            const response = await axios.put(apiUrl, {
                id: selectedID,
                role_name: roleName,
                permission: checkedNames,
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            console.log(response.data, "response.data")

            if (response.data.status === "success") {
                setLoad(false);
                handleShowAlert(response.data);
            } else {
                setLoad(false);
                handleShowAlert1(response.data);
                // Alert.alert("Failed To Edit");
                console.error('Failed To Edit:', response.data.error);
            }

        } catch (error) {
            setLoad(false);
            handleShowAlert2();
            // Alert.alert("Error during submit", "Check The Input Credentials");
            console.error('Error during submit:', error);
        }
    }

    const HandleCancel = () => {
        setCheckedNames({});
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
                                Edit Role Name
                            </Text>
                        </View>
                        <View style={{ width: "60%" }}>
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
                                        value={checkedNames[field.name] ? true : false}
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
                                        value={checkedNames[field.name] && checkedNames[field.name].includes(subheading)} // Check if subheading is included in checkedNames
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

export default EditRole;