import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import styles from "../style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const EmployeeRole = ({ onBankDetails, onprevEmpDetails }) => {

    const dispatch = useDispatch();

    // data from redux store 

    const { data } = useSelector((state) => state.login);
    const { Employee } = useSelector((state) => state.Employee);

    const updateEmployeeFields = (updatedFields) => ({
        type: 'UPDATE_EMPLOYEE_FIELDS',
        payload: updatedFields
    });

    const handleFieldsChange = (fieldName, value) => {
        dispatch(updateEmployeeFields({ [fieldName]: value }));
    };

    // Api call for userrolelist

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);

    const [supervisorDropdown, setSupervisorDropdown] = useState([]);
    const [showSupervisorDropdown, setShowSupervisorDropdown] = useState(false);

    useEffect(() => {

        const apiUrl = 'https://ocean21.in/api/public/api/userrolelist';

        const fetchData = async () => {

            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;

                setDepartmentNameDropdown(responseData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);

    const handleSelectDepartment = (departmentName) => {
        fetchSupervisorDropdown(departmentName.id);
        handleFieldsChange('userRole', departmentName.role_name);
        handleFieldsChange('selectedRoleId', departmentName.id);
        setShowDepartmentNameDropdown(false);
    };

    // Api call for supervisor list

    const selectSupervisor = (shift) => {
        handleFieldsChange('supervisor', shift.supervisor_name);
        handleFieldsChange('selectedsupervisorId', shift.id);
        setShowSupervisorDropdown(false);
    };

    const fetchSupervisorDropdown = async (index) => {

        const apiUrl = `https://ocean21.in/api/public/api/supervisor_list/${index}`;

        try {

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            console.log(responseData, "responseData")

            setSupervisorDropdown(responseData);

        } catch (error) {
            console.error("Error fetching employee dropdown:", error);
        }
    };

    // 

    const [showPunch, setShowPunch] = useState(false);

    const toggleDropdownPucnh = () => {
        setShowPunch(!showPunch);
    };

    const selectPunch = (Punch, index) => {
        setShowPunch(false);
        handleFieldsChange('checkinCheckout', Punch);
        handleFieldsChange('checkinCheckoutId', index);
    };

    // 

    const [showOvertime, setShowOvertime] = useState(false);

    const toggleDropdownOvertime = () => {
        setShowOvertime(!showOvertime);
    };

    const selectOvertime = (Overtime) => {
        handleFieldsChange('overtime', Overtime);
        setShowOvertime(false);
    };


    return (

        <View style={styles.InputContainer}>

            <Text style={styles.Heading}>
                Employee Role
            </Text>

            <TouchableOpacity style={styles.Input} onPress={() => setShowDepartmentNameDropdown(!showDepartmentNameDropdown)}>
                <Text style={styles.StatusTouchableText}>
                    {Employee.userRole && Employee.userRole.length > 0 ? Employee.userRole : "Select userRole"}
                </Text>
                <DropdownIcon width={14} height={14} color={"#000"} />
            </TouchableOpacity>

            {showDepartmentNameDropdown && (
                <View style={styles.dropdown}>
                    {departmentNameDropdown.map((department, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dropdownOption,
                                selectedDepartment === department.role_name && styles.selectedOption
                            ]}
                            onPress={() => handleSelectDepartment(department)}
                        >
                            <Text style={styles.dropdownOptionText}>{department.role_name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <Text style={styles.subHeading}>
                Designation
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.designation}
                onChangeText={(text) => handleFieldsChange('designation', text)}
            />

            <Text style={styles.subHeading}>
                Select Supervisor
            </Text>

            <TouchableOpacity style={styles.Input} onPress={() => {
                setShowSupervisorDropdown(!showSupervisorDropdown);
            }}>
                <Text style={styles.selectedays}>
                    {Employee.supervisor && Employee.supervisor.length > 0 ? Employee.supervisor : "Select supervisor"}
                </Text>
                <DropdownIcon width={14} height={14} color={"#000"} />
            </TouchableOpacity>

            {
                showSupervisorDropdown && (
                    <View style={styles.dropdown}>
                        {supervisorDropdown.map((shift, index) => (

                            <TouchableOpacity key={index} onPress={() => selectSupervisor(shift)} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>{shift.supervisor_name}</Text>
                            </TouchableOpacity>

                        ))}
                    </View>
                )
            }

            <Text style={styles.subHeading}>
                Official Email ID
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.officialEmail}
                onChangeText={(text) => handleFieldsChange('officialEmail', text)}
            />
            <Text style={styles.subHeading}>
                Password
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.password}
                onChangeText={(text) => handleFieldsChange('password', text)}
            />

            <Text style={styles.subHeading}>
                Check-in / Check-out
            </Text>

            <TouchableOpacity onPress={toggleDropdownPucnh} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>
                    {Employee.checkinCheckout && Employee.checkinCheckout.length > 0 ? Employee.checkinCheckout : "Selected Field"}
                </Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showPunch && (

                <View style={styles.dropdown}>

                    <TouchableOpacity onPress={() => selectPunch("Check-in", "1")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Check-in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectPunch("Check-in/Check-out", "2")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Check-in/Check-out</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectPunch("None", "3")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>None</Text>
                    </TouchableOpacity>

                </View>

            )}

            <Text style={styles.subHeading}>
                Overtime
            </Text>

            <TouchableOpacity onPress={toggleDropdownOvertime} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>
                    {Employee.overtime && Employee.overtime.length > 0 ? Employee.overtime : "Select Field"}
                </Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showOvertime && (

                <View style={styles.dropdown}>

                    <TouchableOpacity onPress={() => selectOvertime("Applicable")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Applicable</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectOvertime("NA")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>NA</Text>
                    </TouchableOpacity>

                </View>

            )}


            <Text style={styles.subHeading}>
                Late Allowed
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.lateAllowed}
                onChangeText={(text) => handleFieldsChange('lateAllowed', text)}
            />

            <Text style={styles.subHeading}>
                Permission Allowed
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.permissionAllowed}
                onChangeText={(text) => handleFieldsChange('permissionAllowed', text)}
            />

            <View style={[styles.fullWidth, styles.Row, styles.Left]}>
                <TouchableOpacity style={styles.PrevButton} onPress={onprevEmpDetails}>
                    <ArrowLeftIcon width={14} height={14} color={'#0A62F1'} />
                    <Text style={styles.PrevButtonText}>
                        Previous
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.NextButton} onPress={onBankDetails}>
                    <Text style={styles.NextButtonText}>
                        Next
                    </Text>
                    <ArrowRightIcon width={14} height={14} color={'#fff'} />
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default EmployeeRole;