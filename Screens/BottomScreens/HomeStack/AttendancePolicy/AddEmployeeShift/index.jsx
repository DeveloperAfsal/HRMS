import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import EditIcon from "../../../../../Assets/Icons/Edit.svg";
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg"
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';


const AddEmployeeShift = () => {

    // useRef

    const ref = useRef(null);

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // states

    const [loadData, setLoadData] = useState(false);
    const [load, SetLoad] = useState(false);
    const [datalist, setDatalist] = useState([]);

    const [shiftSlotList, setShiftSlotList] = useState([]);
    const [selectedShiftId, setSelectedShiftId] = useState(null);
    const [selectedShift, setSelectedShift] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedShiftError, setSelectedShiftError] = useState('');

    const [Reason, setReason] = useState('');
    const [DelData, setDelData] = useState(false);
    const [slotToDelete, setSlotToDelete] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [ReasonError, setReasonError] = useState('')

    const [selectedStatus, setSelectedStatus] = useState(null);
    const [showDropdownstatus, setShowDropdownstatus] = useState(false);
    const [statusError, setStatusError] = useState('');

    const [employeeDropdown, setEmployeeDropdown] = useState([]);
    const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState([]);

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedDepartmentIds, setSelectedDepartmentIds] = useState([]);
    const selectedDepartmentIdsAsNumbers = selectedDepartmentIds.map(id => parseInt(id, 10));

    const handleToggleDepartment = (departmentName, departmentId) => {
        if (selectedDepartments.includes(departmentName)) {
            setSelectedDepartments(selectedDepartments.filter(selectedDepartment => selectedDepartment !== departmentName));
            setSelectedDepartmentIds(selectedDepartmentIds.filter(id => id !== departmentId));
        } else {
            setSelectedDepartments([...selectedDepartments, departmentName]);
            setSelectedDepartmentIds([...selectedDepartmentIds, departmentId]);
        }
    };

    const [showWeekoff, setShowWeekoff] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);

    const handleToggleDay = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

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

    // status

    const toggleDropdownstatus = () => {
        setShowDropdownstatus(!showDropdownstatus);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdownstatus(false);
    };

    // Api call for list Shifts

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://ocean21.in/api/public/api/view_employeeshift';
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

    // Api call for shift slot dropdown

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://ocean21.in/api/public/api/shiftslotlist';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;

                setShiftSlotList(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectShift = (shift) => {
        setSelectedShift(shift.shift_slot);
        setSelectedShiftId(shift.id);
        setShowDropdown(false);
    };

    // Api call for Delete

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

                const apiUrl = `https://ocean21.in/api/public/api/delete_employeeshift`;
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
                    setDelData(false)
                } else {
                    Alert.alert("Failed", "Failed to delete shift slot");
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

    // Api call for userrolelist

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


    return (

        <ScrollView>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Assign Employee Shift Form</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Department Name
                    </Text>

                    <TouchableOpacity style={styles.Input} onPress={() => setShowDepartmentNameDropdown(!showDepartmentNameDropdown)}>
                        <View style={styles.selectedDaysContainer}>
                            {selectedDepartments.map(day => (
                                <Text key={day} style={styles.selectedays}>{day}</Text>
                            ))}
                            {selectedDepartments.length === 0 && <Text>Select Department Name</Text>}
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
                        {selectedShiftError}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Employee Name
                    </Text>

                    <TouchableOpacity style={styles.Input}>
                        <Text>Select Employee Name</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    <Text style={styles.errorText}>
                        {selectedShiftError}
                    </Text>

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
                        {selectedShiftError}
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
                        {selectedShiftError}
                    </Text>

                    <Text style={styles.TimeSlotText}>
                        Shift Slot
                    </Text>

                    <TouchableOpacity style={styles.TimeSlotTouchable} onPress={toggleDropdown}>

                        <Text style={styles.TimeSlotTouchableText}>{selectedShift ? selectedShift : "Select Shift"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown && (
                        <View style={styles.dropdown}>
                            {shiftSlotList.map((shift, index) => (

                                <TouchableOpacity key={index} onPress={() => selectShift(shift)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{shift.shift_slot}</Text>
                                </TouchableOpacity>

                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedShiftError}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Week Off
                    </Text>

                    <TouchableOpacity style={styles.Input} onPress={() => setShowWeekoff(!showWeekoff)}>
                        <View style={styles.selectedDaysContainer}>
                            {selectedDays.map(day => (
                                <Text key={day} style={styles.selectedays}>{day}</Text>
                            ))}
                            {selectedDays.length === 0 && <Text>Select Days</Text>}
                        </View>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showWeekoff && (
                        <View style={styles.dropdown}>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Sunday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Sunday')}
                            >
                                <Text style={styles.dropdownOptionText}>Sunday</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Monday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Monday')}>
                                <Text style={styles.dropdownOptionText}>Monday</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Tuesday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Tuesday')}>
                                <Text style={styles.dropdownOptionText}>Tuesday</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Wednesday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Wednesday')}>
                                <Text style={styles.dropdownOptionText}>Wednesday</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Thursday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Thursday')}>
                                <Text style={styles.dropdownOptionText}>Thursday</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    selectedDays.includes('Friday') && styles.selectedOption
                                ]}
                                onPress={() => handleToggleDay('Friday')}>
                                <Text style={styles.dropdownOptionText}>Friday</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[
                                styles.dropdownOption,
                                selectedDays.includes('Saturday') && styles.selectedOption
                            ]}
                                onPress={() => handleToggleDay('Saturday')}>
                                <Text style={styles.dropdownOptionText}>Saturday</Text>
                            </TouchableOpacity>

                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedShiftError}
                    </Text>

                    <Text style={styles.TimeSlotText}>
                        Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownstatus} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus || "Selected Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {/* Dropdown to show the options */}

                    {showDropdownstatus && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus("Active")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Active</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus("In-Active")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>In-Active</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {statusError}
                    </Text>

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

                {/*  */}

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Employee Shift List</Text>
                </View>

                <ScrollView horizontal={true}>

                    <View style={styles.container}>
                        {loadData ? (
                            <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                        ) : (
                            <View>

                                <View style={[styles.row, styles.listHeader]}>
                                    <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Department
                                        Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.EmployeeName]}>Employee
                                        Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Start Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>End Date</Text>
                                    <Text style={[styles.header, styles.cell, styles.ShiftSlot]}>Shift Slot</Text>
                                    <Text style={[styles.header, styles.cell, styles.WeekOff]}>Week Off</Text>
                                    <Text style={[styles.header, styles.cell, styles.Status]}>Status</Text>
                                    <Text style={[styles.header, styles.cell, styles.Action]}>Action</Text>
                                </View>

                                {datalist.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    datalist.map((item, index) => (
                                        <View key={index} style={[styles.row]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.shift_slot}</Text>
                                            <Text style={[styles.cell, styles.EmployeeName]}>{item.first_name}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.start_date}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.end_date}</Text>
                                            <Text style={[styles.cell, styles.ShiftSlot]}>{item.shift_slot}</Text>
                                            <Text style={[styles.cell, styles.WeekOff]}>{item.week_off}</Text>
                                            <Text style={[styles.cell, styles.Status]}>{item.status}</Text>
                                            <View style={[styles.listcontentButtonview]}>
                                                <TouchableOpacity style={[styles.listcontenteditbutton]}>
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

export default AddEmployeeShift;