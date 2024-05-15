import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Platform } from "react-native";
import styles from "../../AddEmployee/style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const EmployeeDetails = ({ onEmpRole, onprevBasicDetails, setEmployee, employee }) => {

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

    const updateEmployeeField = (fieldName, value) => {
        const updatedEmployee = { ...employee };
        updatedEmployee[fieldName] = value;
        setEmployee(updatedEmployee);
    };

    // States

    const [showDropdown, setShowDropdown] = useState(false);
    const [categoryList, setCategoryList] = useState([]);

    // Api call for Category

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://ocean21.in/api/public/api/employee_categorylist';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;

                setCategoryList(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const selectCategory = (File) => {
        // handleFieldsChange('employeeCategory', File.employee_category);
        // handleFieldsChange('selectedemployeeCategory', File.id);
        updateEmployeeField('employee_category', File.employee_category)
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    // 

    const [showPF, setShowPF] = useState(false);

    const toggleDropdownPF = () => {
        setShowPF(!showPF);
    };

    const selectPF = (PF) => {
        setShowPF(false);
        // handleFieldsChange('providentFund', PF);
        updateEmployeeField('emp_pf', PF)
    };

    // 

    const [showESI, setShowESI] = useState(false);

    const toggleDropdownESI = () => {
        setShowESI(!showESI);
    };

    const selectESI = (ESI) => {
        setShowESI(false);
        // handleFieldsChange('esi', ESI);
        updateEmployeeField('emp_esi', ESI);
    };

    // 

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDateDoj, setSelectedDateDoj] = useState(new Date());

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setSelectedDateDoj(date);
        }
        const formattedDoj = `${selectedDateDoj.getFullYear()}-${selectedDateDoj.getMonth() + 1}-${selectedDateDoj.getDate()}`;
        updateEmployeeField('doj', formattedDoj);
        // handleFieldsChange('dateOfJoining', formattedDoj);
        setShowDatePicker(Platform.OS === 'ios');
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const formattedDoj = Employee.dateOfJoining ? new Date(Employee.dateOfJoining).toDateString() : selectedDateDoj.toDateString();

    // 

    const [showDatePickerConfirm, setShowDatePickerConfirm] = useState(false);
    const [selectedConfirmDate, setSelectedConfirmDate] = useState(new Date());

    const handleConfirmDateChange = (event, date) => {
        if (date !== undefined) {
            setSelectedConfirmDate(date);
            const formattedConfirmDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            updateEmployeeField('confirmation_date', formattedConfirmDate);
        }
        setShowDatePickerConfirm(Platform.OS === 'ios');
    };

    const showConfirmDatepicker = () => {
        setShowDatePickerConfirm(true);
    };

    const formattedConfirm = Employee.confirmationDate ? new Date(Employee.confirmationDate).toDateString() : selectedConfirmDate.toDateString();

    // 

    const [showDatePickerLWD, setShowDatePickerLWD] = useState(false);
    const [selectedLWDDate, setSelectedLWDDate] = useState(new Date());

    const handleLWDDateChange = (event, date) => {
        if (date !== undefined) {
            setSelectedLWDDate(date);
        }
        const formattedLWDDate = `${selectedLWDDate.getFullYear()}-${selectedLWDDate.getMonth() + 1}-${selectedLWDDate.getDate()}`;
        updateEmployeeField('last_working_date', formattedLWDDate);
        setShowDatePickerLWD(Platform.OS === 'ios');
    };

    const showLWDDatepicker = () => {
        setShowDatePickerLWD(true);
    };

    const formattedLWD = Employee.lastWorkingDay ? new Date(Employee.lastWorkingDay).toDateString() : selectedLWDDate.toDateString();

    return (

        <View style={styles.InputContainer}>

            <Text style={styles.Heading}>
                Employee Details
            </Text>

            <Text style={styles.subHeading}>
                Employee Category
            </Text>

            <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>
                    {employee.employee_category && employee.employee_category.length > 0 ? employee.employee_category : "Selected Category Type"}
                </Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showDropdown && (
                <View style={styles.dropdown}>
                    {categoryList.map((File, index) => (

                        <TouchableOpacity key={index} onPress={() => selectCategory(File)} style={styles.dropdownOption}>
                            <Text style={styles.dropdownOptionText}>{File.employee_category}</Text>
                        </TouchableOpacity>

                    ))}
                </View>
            )}

            <Text style={styles.subHeading}>
                Date Of Joining
            </Text>

            <View style={styles.inputs}>
                <Text onPress={showDatepicker}>
                    {employee.doj}
                </Text>
                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDateDoj}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
            </View>

            <Text style={styles.subHeading}>
                Probation Period
            </Text>

            <TextInput
                style={styles.input}
                value={employee.probation_period}
                onChangeText={(text) => updateEmployeeField('probation_period', text)}
            />

            <Text style={styles.subHeading}>
                Confirmation Date
            </Text>

            <View style={styles.inputs}>
                <Text onPress={showConfirmDatepicker}>
                    {employee.confirmation_date === null ? "yyyy-mm-dd" : employee.confirmation_date}
                </Text>
                {showDatePickerConfirm && (
                    <DateTimePicker
                        value={selectedConfirmDate}
                        mode="date"
                        display="default"
                        onChange={handleConfirmDateChange}
                    />
                )}
            </View>

            <Text style={styles.subHeading}>
                Employee Agreement Period
            </Text>

            <TextInput
                style={styles.input}
                value={employee.emp_aggrement}
                onChangeText={(text) => updateEmployeeField('emp_aggrement', text)}
            />

            <Text style={styles.subHeading}>
                Notice Period
            </Text>

            <TextInput
                style={styles.input}
                value={employee.notices_period}
                onChangeText={(text) => updateEmployeeField('notices_period', text)}
            />

            <Text style={styles.subHeading}>
                CTC
            </Text>

            <TextInput
                style={styles.input}
                value={employee.ctc}
                onChangeText={(text) => updateEmployeeField('ctc', text)}
            />
            <Text style={styles.subHeading}>
                Gross Salary
            </Text>

            <TextInput
                style={styles.input}
                value={employee.emp_grosssalary}
                onChangeText={(text) => updateEmployeeField('emp_grosssalary', text)}
            />

            <Text style={styles.subHeading}>
                Net Salary
            </Text>

            <TextInput
                style={styles.input}
                value={employee.emp_salary}
                onChangeText={(text) => updateEmployeeField('emp_salary', text)}
            />

            <Text style={styles.subHeading}>
                Last Working Day
            </Text>

            <View style={styles.inputs}>
                <Text onPress={showLWDDatepicker}>
                    {employee.last_working_date}
                </Text>
                {showDatePickerLWD && (
                    <DateTimePicker
                        value={selectedLWDDate}
                        mode="date"
                        display="default"
                        onChange={handleLWDDateChange}
                    />
                )}
            </View>

            <Text style={styles.subHeading}>
                PF
            </Text>

            <TouchableOpacity onPress={toggleDropdownPF} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>{employee.emp_pf || "Selected Field"}</Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showPF && (

                <View style={styles.dropdown}>

                    <TouchableOpacity onPress={() => selectPF("Applicable")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Applicable</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectPF("NA")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>NA</Text>
                    </TouchableOpacity>

                </View>

            )}

            {
                employee.emp_pf === "Applicable" ?
                    <>
                        <Text style={styles.subHeading}>
                            UAN Number
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={employee.uan_number}
                            onChangeText={(text) => updateEmployeeField('uan_number', text)}
                        />

                        <Text style={styles.subHeading}>
                            Employee PF Contribution
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={employee.employee_contribution}
                            onChangeText={(text) => updateEmployeeField('employee_contribution', text)}
                        />

                        <Text style={styles.subHeading}>
                            Employer PF Contribution
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={employee.employeer_contribution}
                            onChangeText={(text) => updateEmployeeField('employeer_contribution', text)}
                        />
                    </>
                    : null
            }

            <Text style={styles.subHeading}>
                ESI
            </Text>

            <TouchableOpacity onPress={toggleDropdownESI} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>{employee.emp_esi || "Selected Field"}</Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showESI && (

                <View style={styles.dropdown}>

                    <TouchableOpacity onPress={() => selectESI("Applicable")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Applicable</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectESI("NA")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>NA</Text>
                    </TouchableOpacity>

                </View>

            )}

            {
                employee.emp_esi === "Applicable" ?
                    <>
                        <Text style={styles.subHeading}>
                            ESI Number
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={employee.esi_number}
                            onChangeText={(text) => updateEmployeeField('esi_number', text)}
                        />

                        <Text style={styles.subHeading}>
                            Employee ESI Contribution
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={employee.employee_esi_contribution}
                            onChangeText={(text) => updateEmployeeField('employee_esi_contribution', text)}
                        />

                        <Text style={styles.subHeading}>
                            Employer ESI Contribution
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={employee.employeer_esi_contribution}
                            onChangeText={(text) => updateEmployeeField('employeer_esi_contribution', text)}
                        />
                    </>
                    : null
            }

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