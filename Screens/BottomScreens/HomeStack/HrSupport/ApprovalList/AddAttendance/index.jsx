import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "../AddLeavePermissionHalfDay/style";
import { Alert } from "react-native";


const AddAttendance = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);
    const [Reason, setReason] = useState('');
    const [load, setLoad] = useState(false);
    const [shiftId, setShiftId] = useState('');
    const [shiftName, setShiftName] = useState('');

    // Department

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState('');

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

                // console.log(responseData,"responseData")

                setDepartmentNameDropdown(responseData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    const handleSelectDepartment = (item) => {
        setSelectedDepartments(item.role_name);
        setShowDepartmentNameDropdown(false);
        fetchEmployeeDropdown(item.id);
    };

    // Member

    const [employeeDropdown, setEmployeeDropdown] = useState([]);
    const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedMemberId, setSelectedMemberId] = useState('');

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

    const handleSelectMember = (item) => {
        setSelectedMember(item.emp_name);
        setSelectedMemberId(item.emp_id)
        setShowEmployeeDropdown(false);
    };

    // Type

    const [TypeDropdown, setTypeDropdown] = useState([]);
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [selectedTypeId, setSelectedTypeId] = useState('');

    useEffect(() => {
        const apiUrl = 'https://ocean21.in/api/public/api/attendance_type_list';

        const fetchData = async () => {

            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;

                // console.log(responseData,"responseData")

                setTypeDropdown(responseData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    const handleSelectType = (item) => {
        setSelectedType(item.attendance_type_name);
        setSelectedTypeId(item.id);
        setShowTypeDropdown(false);
    };

    // Location

    const [LocationDropdown, setLocationDropdown] = useState([]);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedLocationId, setSelectedLocationId] = useState('');

    useEffect(() => {
        const apiUrl = 'https://ocean21.in/api/public/api/attendance_location_list';

        const fetchData = async () => {

            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;

                // console.log(responseData,"responseData")

                setLocationDropdown(responseData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    const handleSelectLocation = (item) => {
        setSelectedLocation(item.attendance_location_name);
        setSelectedLocationId(item.id);
        setShowLocationDropdown(false);
    };

    // handleDateChange

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setStartDate(date);
        }
        setShowDatePicker(Platform.OS === 'ios');
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    // From Time 

    const [slotfromTime, setSlotFromTime] = useState('00:00:00');
    const [showSlotFromTimePicker, setShowSlotFromTimePicker] = useState(false);

    const handleSlotFromTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setSlotFromTime(formattedTime);
        }
        setShowSlotFromTimePicker(Platform.OS === 'ios');
    };

    const showSlotFromTimepicker = () => {
        setShowSlotFromTimePicker(true);
    };

    // To Time 

    const [slotToTime, setSlotToTime] = useState('00:00:00');
    const [showSlotToTimePicker, setShowSlotToTimePicker] = useState(false);

    const handleSlotToTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setSlotToTime(formattedTime);
        }
        setShowSlotToTimePicker(Platform.OS === 'ios');
    };

    const showSlotToTimepicker = () => {
        setShowSlotToTimePicker(true);
    };

    // 

    // Api call for shift slot dropdown

    const [shiftSlotList, setShiftSlotList] = useState([]);
    const [selectedShiftId, setSelectedShiftId] = useState(null);
    const [selectedShift, setSelectedShift] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

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

    const HandleSubmit = async () => {
        setLoad(true);
        try {

            const apiUrl = 'https://ocean21.in/api/public/api/add_attendancemenualentry';

            const response = await axios.post(apiUrl, {
                emp_id: selectedMemberId,
                hr_id: data.userempid,
                request_date: formattedStartDate,
                request_fromtime: slotfromTime,
                request_totime: slotToTime,
                request_type: selectedTypeId,
                request_location: selectedLocationId,
                shiftslot_id: selectedShiftId,
                request_reason: Reason
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            const ResData = response.data;

            if (ResData.status === 'success') {
                Alert.alert('Success', ResData.message);
                navigation.navigate('Approvals List');
                setLoad(false);
            } else {
                console.log("Error")
                setLoad(false);
            }
        } catch (error) {
            console.log(error)
            setLoad(true);
        }
    }

    return (

        <ScrollView>

            <View style={styles.InputContainer}>

                <Text style={styles.subHeading}>
                    Select Department
                </Text>

                <TouchableOpacity
                    onPress={() => setShowDepartmentNameDropdown(!showDepartmentNameDropdown)}
                    style={styles.StatusTouchable}>

                    <Text style={styles.StatusTouchableText}>
                        {selectedDepartments ? selectedDepartments : 'Select Department'}
                    </Text>
                    <DropdownIcon width={14} height={14} color={"#000"} />

                </TouchableOpacity>

                {showDepartmentNameDropdown && (
                    <View style={styles.dropdown}>
                        <ScrollView>
                            {departmentNameDropdown.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.dropdownOption}
                                    onPress={() => handleSelectDepartment(item)}
                                >
                                    <Text>{item.role_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                <Text style={styles.subHeading}>
                    Select Member
                </Text>

                <TouchableOpacity
                    onPress={() => setShowEmployeeDropdown(!showEmployeeDropdown)}
                    style={styles.StatusTouchable}>

                    <Text style={styles.StatusTouchableText}>
                        {selectedMember ? selectedMember : 'Select Member'}
                    </Text>
                    <DropdownIcon width={14} height={14} color={"#000"} />

                </TouchableOpacity>

                {showEmployeeDropdown && (
                    <View style={styles.dropdown}>
                        <ScrollView>
                            {employeeDropdown.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.dropdownOption}
                                    onPress={() => handleSelectMember(item)}
                                >
                                    <Text>{item.emp_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                <Text style={styles.subHeading}>
                    Select Type
                </Text>

                <TouchableOpacity
                    onPress={() => setShowTypeDropdown(!showTypeDropdown)}
                    style={styles.StatusTouchable}>
                    <Text style={styles.StatusTouchableText}>
                        {selectedType ? selectedType : 'Select Type'}
                    </Text>
                    <DropdownIcon width={14} height={14} color={"#000"} />

                </TouchableOpacity>

                {showTypeDropdown && (
                    <View style={styles.dropdown}>
                        <ScrollView>
                            {TypeDropdown.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.dropdownOption}
                                    onPress={() => handleSelectType(item)}
                                >
                                    <Text>{item.attendance_type_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                <Text style={styles.subHeading}>
                    Location
                </Text>

                <TouchableOpacity
                    onPress={() => setShowLocationDropdown(!showLocationDropdown)}
                    style={styles.StatusTouchable}>

                    <Text style={styles.StatusTouchableText}>
                        {selectedLocation ? selectedLocation : 'Select Location'}
                    </Text>
                    <DropdownIcon width={14} height={14} color={"#000"} />

                </TouchableOpacity>

                {showLocationDropdown && (
                    <View style={styles.dropdown}>
                        <ScrollView>
                            {LocationDropdown.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.dropdownOption}
                                    onPress={() => handleSelectLocation(item)}
                                >
                                    <Text>{item.attendance_location_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                <Text style={styles.subHeading}>
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

                <Text style={styles.subHeading}>
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

                <Text style={styles.subHeading}>
                    From Time
                </Text>

                <View style={styles.inputs}>
                    <Text onPress={showSlotFromTimepicker}>
                        {slotfromTime} &nbsp;
                    </Text>
                    {showSlotFromTimePicker && (
                        <DateTimePicker
                            value={parse(slotfromTime, 'HH:mm:ss', new Date())}
                            mode="time"
                            display="default"
                            onChange={handleSlotFromTimeChange}
                        />
                    )}
                </View>

                <Text style={styles.subHeading}>
                    To Time
                </Text>

                <View style={styles.inputs}>
                    <Text onPress={showSlotToTimepicker}>
                        {slotToTime} &nbsp;
                    </Text>
                    {showSlotToTimePicker && (
                        <DateTimePicker
                            value={parse(slotToTime, 'HH:mm:ss', new Date())}
                            mode="time"
                            display="default"
                            onChange={handleSlotToTimeChange}
                        />
                    )}
                </View>

                <Text style={styles.subHeading}>
                    Reason
                </Text>

                <TextInput
                    value={Reason}
                    onChangeText={(text) => setReason(text)}
                    style={styles.Reason}
                />

                <View style={[styles.fullWidth, styles.Row, styles.Left]}>

                    <TouchableOpacity style={styles.NextButton}
                        onPress={HandleSubmit}
                    >
                        {load ? <ActivityIndicator size={"small"} color={'#fff'} /> : <Text style={styles.NextButtonText}>
                            Submit
                        </Text>}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.PrevButton}
                        onPress={() => navigation.navigate('Approvals List')}
                    >
                        <Text style={styles.PrevButtonText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

        </ScrollView>

    )

}

export default AddAttendance;