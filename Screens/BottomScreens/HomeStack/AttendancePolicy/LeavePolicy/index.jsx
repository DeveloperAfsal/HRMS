import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import EditIcon from "../../../../../Assets/Icons/Edit.svg";
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg"
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';


const LeavePolicy = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // 

    const [datalist, setDatalist] = useState([]);
    const [selectedShiftError, setSelectedShiftError] = useState('');

    // 

    const [Leavecount, setLeavecount] = useState();
    const [Monthlycount, setMonthlycount] = useState();

    // 

    const [loadData, setLoadData] = useState(false);
    const [load, setLoad] = useState(false);

    // handleDateChange

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setStartDate(date);
        }
        setShowDatePicker(Platform.OS === 'ios');
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [endDate, setEndDate] = useState(new Date());

    const handleDateChange1 = (event, date) => {
        if (date !== undefined) {
            setEndDate(date);
        }
        setShowDatePicker1(Platform.OS === 'ios');
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    // 

    // Date Formatter 

    const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    const formattedEndDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;

    // 

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://ocean21.in/api/public/api/view_leavepolicy';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            setLoadData(false)
            const responseData = response.data.data;
            setDatalist(responseData);
        } catch (error) {
            setLoadData(false)
            console.error('Error fetching data:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    // Api call for userrolelist

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedDepartmentIds, setSelectedDepartmentIds] = useState([]);

    const handleToggleDepartment = (departmentName, departmentId) => {
        if (selectedDepartments.includes(departmentName)) {

            // If department is already selected, remove it from the selected list
            setSelectedDepartments(selectedDepartments.filter(selectedDepartment => selectedDepartment !== departmentName));
            setSelectedDepartmentIds(selectedDepartmentIds.filter(id => id !== departmentId));

            // Clear selected employees when department is deselected
            // setSelectedEmployees([]);

        } else {

            // If department is not selected, add it to the selected list
            setSelectedDepartments([...selectedDepartments, departmentName]);
            setSelectedDepartmentIds([...selectedDepartmentIds, departmentId]);

            // Fetch employee dropdown when department is selected
            const selectedIdsAsNumbers = selectedDepartmentIds.map(id => parseInt(id, 10));
            fetchEmployeeDropdown([...selectedIdsAsNumbers, departmentId]);
        }
    };

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

    // Leave Type

    const [leaveTypeDropdown, setLeaveTypeDropdown] = useState([]);
    const [selectedleaveType, setSelectedleaveType] = useState(null);
    const [selectedleaveTypeId, setSelectedleaveTypeId] = useState(null);
    const [showleaveTypeDropdown, setShowleaveTypeDropdown] = useState(false);

    useEffect(() => {

        const apiUrl = 'https://ocean21.in/api/public/api/leave_type_list';

        const fetchData = async () => {

            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;

                setLeaveTypeDropdown(responseData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);

    const handleSelectLeave = (departmentName) => {
        setSelectedleaveType(departmentName.leave_category_name);
        setSelectedleaveTypeId(departmentName.id)
        setShowleaveTypeDropdown(false);
    };

    // Api call for employeelist

    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedEmployeesIds, setSelectedEmployeesIds] = useState([]);

    const [employeeDropdown, setEmployeeDropdown] = useState([]);
    const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);

    const fetchEmployeeDropdown = async (selectedDepartmentIdsAsNumbers) => {

        const apiUrl = `https://ocean21.in/api/public/api/employee_dropdown_list/${selectedDepartmentIdsAsNumbers}`;

        try {

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;

            setEmployeeDropdown(responseData);

        } catch (error) {
            console.error("Error fetching employee dropdown:", error);
        }
    };

    const handleToggleEmployee = (employeeName, employeeNameID) => {
        if (selectedEmployees.includes(employeeName)) {
            setSelectedEmployees(selectedEmployees.filter(selectedEmployee => selectedEmployee !== employeeName));
            setSelectedEmployeesIds(selectedEmployeesIds.filter(id => id !== employeeNameID));
        } else {
            setSelectedEmployees([...selectedEmployees, employeeName]);
            setSelectedEmployeesIds([...selectedEmployeesIds, employeeNameID]);
        }
    };

    const Handlerefresh = () => {
        setStartDate(new Date());
        setEndDate(new Date());
        // setSelectedleaveType('Select Leave Type');
        // setSelectedDepartments('Select Role');
        // setSelectedEmployees('Select Employees');
        setLeavecount('');
        setMonthlycount('');
    }

    const HandleSubmit = async () => {

        setLoad(true);

        try {

            const apiUrl = 'https://ocean21.in/api/public/api/addleave_policy';

            const response = await axios.post(apiUrl, {
                start_date: formattedStartDate,
                end_date: formattedEndDate,
                role_type: selectedDepartmentIds.toString(),
                emp_id: selectedEmployeesIds.toString(),
                leave_type: selectedleaveTypeId,
                leave_count: Leavecount,
                monthly_count: Monthlycount,
                created_by: data.userempid
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                fetchData();
                setLoad(false);
                Handlerefresh();
            } else {
                setLoad(false);
                Alert.alert('Failed To Add:', response.data.message);
            }

        } catch (error) {
            Alert.alert("Error during submit", "Check The Input Credentials");
            console.error('Error during submit:', error);
            setLoad(false);
        }
    }

    // Api call for Delete

    const [Reason, setReason] = useState('');
    const [DelData, setDelData] = useState(false);
    const [slotToDelete, setSlotToDelete] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [ReasonError, setReasonError] = useState('')

    const HandleDelete = (slotId) => {
        setSlotToDelete(slotId);
        setModalVisible(true);
    }

    const cancelDelete = () => {
        setSlotToDelete(null);
        setModalVisible(false);
        setReasonError('');
        setReason('');
        setDelData(false);
    }

    const confirmDelete = async () => {
        setDelData(true)
        if (slotToDelete) {

            try {

                if (!Reason) {
                    setReasonError('Reason Required');
                    setDelData(false);
                    return;
                } else {
                    setReasonError('');
                    setReason('');
                }

                const apiUrl = `https://ocean21.in/api/public/api/delete_leavepolicy`;
                const response = await axios.post(apiUrl, {
                    id: slotToDelete,
                    updated_by: data.userempid,
                    reason: Reason,
                }, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                if (response.data.status === "success") {
                    const updatedDataList = datalist.filter(slot => slot.id !== slotToDelete);
                    setDatalist(updatedDataList);
                    setDelData(false);
                    Alert.alert("Deleted", response.data.message);
                } else {
                    Alert.alert("Failed", response.data.message);
                    setDelData(false)
                }
            } catch (error) {
                Alert.alert("Error", "Error while deleting shift slot");
                console.error('Error deleting shift slot:', error);
                setDelData(false)
            }
            setSlotToDelete(null);
            setModalVisible(false);
        }
    }

    // 

    const handlenavigate = (item) => {
        navigation.navigate('Edit Leave Policy', {
            Id:item.id
        })
    }

    return (
        <ScrollView>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Leave Policy Form</Text>
                </View>

                <View style={styles.Inputcontainer}>
                    <Text style={styles.StatDateText}>
                        Start Date
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

                    <Text style={styles.StatDateText}>
                        End Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker1}>
                            {endDate.toDateString()} &nbsp;
                        </Text>
                        {showDatePicker1 && (
                            <DateTimePicker
                                value={endDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange1}
                            />
                        )}
                    </View>

                    <Text style={styles.StatDateText}>
                        Leave Type
                    </Text>

                    <TouchableOpacity style={styles.Input} onPress={() => setShowleaveTypeDropdown(!showleaveTypeDropdown)}>
                        <Text>{selectedleaveType ? selectedleaveType : 'Select Leave Type'}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showleaveTypeDropdown && (
                        <View style={styles.dropdown}>
                            {leaveTypeDropdown.map((department, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.dropdownOption,
                                        selectedleaveType === department.leave_category_name && styles.selectedOption
                                    ]}
                                    onPress={() => handleSelectLeave(department)}
                                >
                                    <Text style={styles.dropdownOptionText}>{department.leave_category_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}


                    <Text style={styles.StatDateText}>
                        Role
                    </Text>

                    <TouchableOpacity style={styles.Input} onPress={() => setShowDepartmentNameDropdown(!showDepartmentNameDropdown)}>
                        <View style={styles.selectedDaysContainer}>
                            {selectedDepartments.map(day => (
                                <Text key={day} style={styles.selectedays}>{day}</Text>
                            ))}
                            {selectedDepartments.length === 0 && <Text>Select Role</Text>}
                        </View>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showDepartmentNameDropdown && (
                        <View style={styles.dropdown}>
                            {departmentNameDropdown.map((department, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.dropdownOption,
                                        selectedDepartments.includes(department.role_name) && styles.selectedOption
                                    ]}
                                    onPress={() => handleToggleDepartment(department.role_name, department.id)}
                                >
                                    <Text style={styles.dropdownOptionText}>{department.role_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.StatDateText}>
                        Select Employee
                    </Text>

                    <TouchableOpacity style={styles.Input} onPress={() => {
                        setShowEmployeeDropdown(!showEmployeeDropdown);
                    }}>
                        <View style={styles.selectedDaysContainer}>
                            {selectedEmployees.map(employee => (
                                <Text key={employee} style={styles.selectedays}>{employee}</Text>
                            ))}
                            {selectedEmployees.length === 0 && <Text>Select Employees</Text>}
                        </View>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showEmployeeDropdown && (
                        <View style={styles.dropdown}>
                            {employeeDropdown.map((employee, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.dropdownOption,
                                        selectedEmployees.includes(employee.emp_name) && styles.selectedOption
                                    ]}
                                    onPress={() => handleToggleEmployee(employee.emp_name, employee.emp_id)}
                                >
                                    <Text style={styles.dropdownOptionText}>{employee.emp_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.StatDateText}>
                        Total Leave Count
                    </Text>

                    <TextInput
                        keyboardType="numeric"
                        value={Leavecount}
                        onChangeText={(text) => setLeavecount(text)}
                        style={styles.TextInput}
                    />

                    <Text style={styles.StatDateText}>
                        Monthly Leave Count
                    </Text>

                    <TextInput
                        keyboardType="numeric"
                        value={Monthlycount}
                        onChangeText={(text) => setMonthlycount(text)}
                        style={styles.TextInput}
                    />

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

                        <TouchableOpacity style={styles.cancelbutton} onPress={Handlerefresh}>
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Leave Policy List</Text>
                </View>

                <ScrollView horizontal={true}>

                    <View style={styles.container}>
                        {loadData ? (
                            <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                        ) : (
                            <View>

                                <View style={[styles.row, styles.listHeader]}>
                                    <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Employee
                                        Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.EmployeeName]}>Role
                                        Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Leave Type</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Start Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.ShiftSlot]}>End Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.WeekOff]}>Total Leave Count</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Monthly Leave Count</Text>
                                    <Text style={[styles.header, styles.cell, styles.Action]}>Action</Text>
                                </View>

                                {datalist.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    datalist.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.first_name}</Text>
                                            <Text style={[styles.cell, styles.EmployeeName]}>{item.role_name}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.category_name}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.start_date}</Text>
                                            <Text style={[styles.cell, styles.ShiftSlot]}>{item.end_date}</Text>
                                            <Text style={[styles.cell, styles.WeekOff]}>{item.leave_count}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.monthly_count}</Text>
                                            <View style={[styles.listcontentButtonview]}>
                                                <TouchableOpacity style={[styles.listcontenteditbutton]}
                                                    onPress={() => handlenavigate(item)}
                                                >
                                                    <EditIcon width={14} height={14} color="#000" />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[styles.listcontentdelbutton]}
                                                    onPress={() => HandleDelete(item.id)}>
                                                    <DeleteIcon width={14} height={14} color="#000" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))
                                )}

                            </View>
                        )
                        }
                    </View>

                </ScrollView>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTextHeading}>Are You Sure You Want To Delete This !</Text>
                            <Text style={styles.modalText}>Reason:</Text>
                            <TextInput
                                value={Reason}
                                onChangeText={(text) => setReason(text)}
                                style={styles.Reason}
                            />
                            <Text style={styles.errorTextDelete}>
                                {ReasonError}
                            </Text>
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity style={styles.modalCancelButton} onPress={cancelDelete}>
                                    <Text style={styles.modalCancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalDeleteButton} onPress={confirmDelete}>


                                    {
                                        DelData ?
                                            <ActivityIndicator size={"small"} color={"#fff"} /> :
                                            <Text style={styles.modalDeleteButtonText}>Delete</Text>
                                    }


                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

        </ScrollView>
    )
}

export default LeavePolicy;