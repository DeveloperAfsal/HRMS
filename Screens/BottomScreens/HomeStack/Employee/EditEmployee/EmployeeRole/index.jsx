import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import styles from "../../AddEmployee/style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg"
import axios from "axios";
import { useSelector } from "react-redux";
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';

const EmployeeRole = ({ onBankDetails, onprevEmpDetails, employee, setEmployee, setShowFields, showFields, desg, setDesg, showDatePicker, setShowDatePicker, startDate, setStartDate }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

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
        // handleFieldsChange('selectedRoleId', departmentName.id);
        updateEmployeeField('role_name', departmentName.role_name)
        setShowDepartmentNameDropdown(false);
    };

    // Api call for supervisor list

    const selectSupervisor = (shift) => {
        // handleFieldsChange('supervisor', shift.supervisor_name);
        // handleFieldsChange('selectedsupervisorId', shift.id);
        updateEmployeeField('supervisor_role_name', shift.supervisor_name)
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
        // handleFieldsChange('checkinCheckout', Punch);
        // handleFieldsChange('checkinCheckoutId', index);
        updateEmployeeField('emp_punch', index);
    };

    // Designation fields 


    // 

    const [showOvertime, setShowOvertime] = useState(false);

    const toggleDropdownOvertime = () => {
        setShowOvertime(!showOvertime);
    };

    const selectOvertime = (Overtime) => {
        // handleFieldsChange('overtime', Overtime);
        updateEmployeeField('ot_status', Overtime);
        setShowOvertime(false);
    };

    // 

    const updateEmployeeField = (fieldName, value) => {
        const updatedEmployee = { ...employee };
        updatedEmployee[fieldName] = value;
        setEmployee(updatedEmployee);
    };

    // 

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setStartDate(date);
        }
        setShowDatePicker(Platform.OS === 'ios');
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    return (

        <View style={styles.InputContainer}>

            <Text style={styles.Heading}>
                Employee Role
            </Text>

            <TouchableOpacity style={styles.Input} onPress={() => setShowDepartmentNameDropdown(!showDepartmentNameDropdown)}>
                <Text style={styles.StatusTouchableText}>
                    {employee.role_name && employee.role_name.length > 0 ? employee.role_name : "Select userRole"}
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

            <Text style={styles.errorText}>
                { }
            </Text>

            <Text style={styles.subHeading}>
                Designation
            </Text>

            <TextInput
                style={styles.input}
                value={employee.department_name}
                onChangeText={(text) => updateEmployeeField('department_name', text)}
            />

            <View style={{ width: "90%", paddingTop: '2%', flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                    tintColors={{ true: '#20DDFE' }}
                    style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                    value={showFields}
                    onValueChange={(newValue) => setShowFields(newValue)}
                />
                <Text style={{ fontWeight: '400', fontSize: 13, lineHeight: 17.29 }}>Update Designation</Text>
            </View>

            <Text style={styles.errorText}>
                { }
            </Text>

            {showFields && (
                <>
                    <Text style={styles.subHeading1}>
                        Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker}>
                            {startDate.toDateString()} &nbsp;
                        </Text>
                        {showDatePicker && (
                            <DateTimePicker
                                value={startDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.subHeading}>
                        New Designation
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={desg}
                        onChangeText={(text) => setDesg(text)}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>
                </>
            )}

            <Text style={styles.subHeading1}>
                Select Supervisor
            </Text>

            <TouchableOpacity style={styles.Input} onPress={() => {
                setShowSupervisorDropdown(!showSupervisorDropdown);
            }}>
                <Text style={styles.selectedays}>
                    {employee.supervisor_role_name && employee.supervisor_role_name.length > 0 ? employee.supervisor_role_name : "Select supervisor"}
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

            <Text style={styles.errorText}>
                { }
            </Text>

            <Text style={styles.subHeading}>
                Official Email ID
            </Text>

            <TextInput
                style={styles.input}
                value={employee.official_email}
                onChangeText={(text) => updateEmployeeField('official_email', text)}
            />

            <Text style={styles.errorText}>
                { }
            </Text>

            <Text style={styles.subHeading}>
                Password
            </Text>

            <TextInput
                style={styles.input}
                value={employee.password}
                onChangeText={(text) => updateEmployeeField('password', text)}
                secureTextEntry={true}
            />

            <Text style={styles.errorText}>
                { }
            </Text>

            <Text style={styles.subHeading}>
                Check-in / Check-out
            </Text>

            <TouchableOpacity onPress={toggleDropdownPucnh} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>
                    {employee.emp_punch && employee.emp_punch.length > 0 ? employee.emp_punch : "Selected Field"}
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

            <Text style={styles.errorText}>
                { }
            </Text>

            <Text style={styles.subHeading}>
                Overtime
            </Text>

            <TouchableOpacity onPress={toggleDropdownOvertime} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>
                    {employee.ot_status && employee.ot_status.length > 0 ? employee.ot_status : "Select Field"}
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

            <Text style={styles.errorText}>
                { }
            </Text>

            <Text style={styles.subHeading}>
                Late Allowed
            </Text>

            <TextInput
                style={styles.input}
                value={employee.late_policy}
                onChangeText={(text) => updateEmployeeField('late_policy', text)}
            />

            <Text style={styles.errorText}>
                { }
            </Text>

            <Text style={styles.subHeading}>
                Permission Allowed
            </Text>

            <TextInput
                style={styles.input}
                value={employee.permission_policy}
                onChangeText={(text) => updateEmployeeField('permission_policy', text)}
            />

            <Text style={styles.errorText}>
                { }
            </Text>

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