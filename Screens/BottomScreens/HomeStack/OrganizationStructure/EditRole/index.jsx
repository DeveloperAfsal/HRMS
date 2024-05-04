import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { useSelector } from "react-redux";
import CheckBox from '@react-native-community/checkbox';
import axios from "axios";


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
        { name: 'ORG Structure', isChecked: false, subheadings: ['Add Role', 'Roles List', 'Supervisor List', 'Employee Level Category', 'Employee Document Type', 'ORG Chart'], checkboxes: Array(6).fill(false) },
        { name: 'Leave & Attendance Policy', isChecked: false, subheadings: ['Add Shift Slot', 'Assign Employee Shift', 'Attendance Policy', 'Attendance Type', 'Attendance Location', 'Leave Policy Type', 'Leave Policy Category'], checkboxes: Array(7).fill(false) },
        { name: 'Employee', isChecked: false, subheadings: ['Add Employee', 'Employee List', 'Employee Confirmation'], checkboxes: Array(3).fill(false) },
        { name: 'Attendance', isChecked: false, subheadings: ['Daily Attendance', 'Monthly Attendance', 'Monthly Attendance Calendar View', 'Monthly List'], checkboxes: Array(4).fill(false) },
        { name: 'HR Support', isChecked: false, subheadings: ['Approvals Request', 'Templates', 'Job Openings'], checkboxes: Array(3).fill(false) },
        { name: 'TL Approval', isChecked: false, subheadings: ['Leave Approval', 'OT Approval'], checkboxes: Array(2).fill(false) },
        { name: 'Help Desk', isChecked: false, subheadings: [], checkboxes: Array(0).fill(false) },
        { name: 'Assets', isChecked: false, subheadings: ['Assets Type', 'Add Asset', 'Asset List'], checkboxes: Array(3).fill(false) },
        { name: 'Events', isChecked: false, subheadings: ['Add Event', 'Event List'], checkboxes: Array(2).fill(false) },
        { name: 'Meetings', isChecked: false, subheadings: ['Add Meeting', 'Meeting List'], checkboxes: Array(2).fill(false) },
        { name: 'Team Task', isChecked: false, subheadings: ['Add Project', 'Project List', 'Add Task', 'Tasks - Employee View', 'Tasks List', 'Tasks Progress'], checkboxes: Array(6).fill(false) },
        { name: 'Pay Roll', isChecked: false, subheadings: ['Salary Calculation', 'Generate Payslip', 'Payroll List'], checkboxes: Array(3).fill(false) },
        { name: 'Holiday', isChecked: false, subheadings: [], checkboxes: Array(0).fill(false) },
        { name: 'Visitor Management', isChecked: false, subheadings: ['Add Visitors', 'Visitors Log'], checkboxes: Array(2).fill(false) },
        { name: 'Logs', isChecked: false, subheadings: ['Activity Log', 'Employee Activity Log'], checkboxes: Array(2).fill(false) },

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
                navigation.navigate('Roles List');
            } else {
                setLoad(false);
                Alert.alert("Failed To Edit");
                console.error('Failed To Edit:', response.data.error);
            }

        } catch (error) {
            setLoad(false);
            Alert.alert("Error during submit", "Check The Input Credentials");
            console.error('Error during submit:', error);
        }
    }

    const HandleCancel = () => {
        setCheckedNames({});
    };

    return (
        <ScrollView>

            <View style={styles.AddroleContainer}>

                <View style={styles.Inputcontainer}>

                    <View style={styles.Row}>
                        <View style={{ width: "40%", alignItems: 'center' }}>
                            <Text style={styles.AddroleText}>
                                Add Role Name
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
                                {['Dashboard', 'Help Desk', 'Holiday'].includes(field.name) && (
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

            </View>

        </ScrollView>
    )
}

export default EditRole;