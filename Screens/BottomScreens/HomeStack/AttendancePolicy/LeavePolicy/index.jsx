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
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";


const LeavePolicy = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // 

    const [datalist, setDatalist] = useState([]);

    // 

    const [Leavecount, setLeavecount] = useState();
    const [Monthlycount, setMonthlycount] = useState();
    const [LeavecountError, setLeavecountError] = useState('');
    const [MonthlycountError, setMonthlycountError] = useState('');

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

    const formattedStartDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
    const formattedEndDate = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;

    // 

    const fetchData = async () => {

        setLoadData(true);

        try {

            const apiUrl = 'https://ocean21.in/api/public/api/view_leavepolicy';

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            setLoadData(false);

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


    const [RoleError, setRoleError] = useState('');
    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedDepartmentIds, setSelectedDepartmentIds] = useState([]);
    const selectedDepartmentIdsAsNumbers = selectedDepartmentIds.join(',');

    const handleToggleDepartment = async (departmentName, departmentId) => {
        if (selectedDepartments.includes(departmentName)) {
            setSelectedDepartments(selectedDepartments.filter(selectedDepartment => selectedDepartment !== departmentName));
            setSelectedDepartmentIds(selectedDepartmentIds.filter(id => id !== departmentId));

            // Clear selected employees when department is deselected
            setSelectedEmployees([]);

        } else {
            setSelectedDepartments([...selectedDepartments, departmentName]);
            setSelectedDepartmentIds([...selectedDepartmentIds, departmentId]);
            // Fetch employee dropdown when department is selected
            setSelectedDepartmentIds(selectedDepartmentIds => {
                const selectedIdsAsNumbers = selectedDepartmentIds.map(id => parseInt(id, 10));
                fetchEmployeeDropdown(selectedIdsAsNumbers);
                return selectedDepartmentIds;
            });
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
    const [leaveTypeError, setLeaveTypeError] = useState('');

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
        setSelectedleaveType(departmentName.leave_type_name);
        setSelectedleaveTypeId(departmentName.id)
        setShowleaveTypeDropdown(false);
    };

    // Api call for employeelist

    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedEmployeesIds, setSelectedEmployeesIds] = useState([]);
    const selectedEmployeesIdsAsNumbers = selectedEmployeesIds.join(',');
    const [employeeDropdown, setEmployeeDropdown] = useState([]);
    const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
    const [EmployeeError, setEmployeeError] = useState('');

    const handleToggleEmployee = (employeeName, employeeNameID) => {
        if (selectedEmployees.includes(employeeName)) {
            setSelectedEmployees(selectedEmployees.filter(selectedEmployee => selectedEmployee !== employeeName));
            setSelectedEmployeesIds(selectedEmployeesIds.filter(id => id !== employeeNameID));
        } else {
            setSelectedEmployees([...selectedEmployees, employeeName]);
            setSelectedEmployeesIds([...selectedEmployeesIds, employeeNameID]);
        }
    };

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

    const Handlerefresh = () => {
        setStartDate(new Date());
        setEndDate(new Date());
        setSelectedleaveType(null);
        setSelectedDepartments([]);
        setSelectedDepartmentIds([]);
        setSelectedEmployees([]);
        setSelectedEmployeesIds([]);
        setLeavecount('');
        setMonthlycount('');
        setRoleError('');
        setLeaveTypeError('');
        setLeavecountError('');
        setMonthlycountError('');
    }

    const validateFields = () => {
        let isValid = true;

        if (!selectedleaveType) {
            setLeaveTypeError('Select Leave Type');
            isValid = false;
        } else {
            setLeaveTypeError('');
        }

        if (!selectedDepartments.length) {
            setRoleError('Select Role');
            isValid = false;
        } else {
            setRoleError('');
        }

        if (!selectedEmployees.length) {
            setEmployeeError('Select Employee');
            isValid = false;
        } else {
            setEmployeeError('');
        }

        if (!Leavecount) {
            setLeavecountError('Enter Leave Count');
            isValid = false;
        } else {
            setLeavecountError('');
        }

        if (!Monthlycount) {
            setMonthlycountError('Enter Monthly Leave Count');
            isValid = false;
        } else {
            setMonthlycountError('');
        }

        return isValid;
    };

    const HandleSubmit = async () => {

        setLoad(true);

        try {

            if (!validateFields()) {
                setLoad(false);
                return;
            }

            const apiUrl = 'https://ocean21.in/api/public/api/addleave_policy';

            const response = await axios.post(apiUrl, {
                start_date: formattedStartDate,
                end_date: formattedEndDate,
                role_type: selectedDepartmentIdsAsNumbers,
                emp_id: selectedEmployeesIdsAsNumbers,
                leave_type: selectedleaveTypeId,
                leave_count: Leavecount,
                monthly_count: Monthlycount,
                created_by: data.userempid
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            console.log(response.data, "response")

            console.log(
                "start_date:", formattedStartDate,
                "end_date:", formattedEndDate,
                "role_type:", selectedDepartmentIdsAsNumbers,
                "emp_id:", selectedEmployeesIdsAsNumbers,
                "leave_type:", selectedleaveTypeId,
                "leave_count:", Leavecount,
                "monthly_count:", Monthlycount,
                "created_by:", data.userempid
            )

            if (response.data.status === "success") {
                // Alert.alert("successfull",response.data.message)
                handleShowAlert(response.data);
                fetchData();
                setLoad(false);
                Handlerefresh();
            } else {
                setLoad(false);
                // Alert.alert('Failed', response.data.message);
                handleShowAlert1(response.data.message);
            }

        } catch (error) {
            // Alert.alert("Error during submit", "Check The Input Credentials");
            handleShowAlert2();
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
                    // Alert.alert("Deleted", response.data.message);
                    handleShowAlert(response.data);
                } else {
                    // Alert.alert("Failed", response.data.message);
                    handleShowAlert1(response.data.message);
                    setDelData(false)
                }
            } catch (error) {
                // Alert.alert("Error", "Error while deleting shift slot");
                handleShowAlert2();
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
            Id: item.id,
            Name: item.first_name,
            Role: item.role_name,
            LeaveType: item.category_name,
            StartDate: item.start_date,
            EndDate: item.end_date,
            LeaveCount: item.leave_count,
            MonthlyCount: item.monthly_count,
        })
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res.message)
        setTimeout(() => {
            setAlertVisible(false);
        }, 2500);
    };

    const [isAlertVisible1, setAlertVisible1] = useState(false);
    const [resMessageFail, setResMessageFail] = useState('');

    const handleShowAlert1 = (res) => {
        setAlertVisible1(true);
        setResMessageFail(res);
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

                    <Text style={styles.errorText}>
                        { }
                    </Text>

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

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Leave Type
                    </Text>

                    <TouchableOpacity style={styles.Input} onPress={() => setShowleaveTypeDropdown(!showleaveTypeDropdown)}>
                        <Text>{selectedleaveType || 'Select Leave Type'}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showleaveTypeDropdown && (
                        <View style={styles.dropdown}>
                            {leaveTypeDropdown.map((department, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.dropdownOption,
                                        selectedleaveType === department.leave_type_name && styles.selectedOption
                                    ]}
                                    onPress={() => handleSelectLeave(department)}
                                >
                                    <Text style={styles.dropdownOptionText}>{department.leave_type_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {leaveTypeError}
                    </Text>

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

                    <Text style={styles.errorText}>
                        {RoleError}
                    </Text>

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

                    <Text style={styles.errorText}>
                        {EmployeeError}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Total Leave Count
                    </Text>

                    <TextInput
                        keyboardType="numeric"
                        value={Leavecount}
                        onChangeText={(text) => setLeavecount(text)}
                        style={styles.TextInput}
                    />

                    <Text style={styles.errorText}>
                        {LeavecountError}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Monthly Leave Count
                    </Text>

                    <TextInput
                        keyboardType="numeric"
                        value={Monthlycount}
                        onChangeText={(text) => setMonthlycount(text)}
                        style={styles.TextInput}
                    />

                    <Text style={styles.errorText}>
                        {MonthlycountError}
                    </Text>

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
                                <TouchableOpacity style={styles.modalCancelButton1} onPress={cancelDelete}>
                                    <Text style={styles.modalCancelButtonText1}>Cancel</Text>
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

export default LeavePolicy;