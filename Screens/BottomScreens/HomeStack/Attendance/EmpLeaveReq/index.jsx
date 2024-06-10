import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../EmpAttendReq/style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import { format, parse } from 'date-fns';
import axios from "axios";
import { useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';

const EmpLeaveReq = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // states

    const [load, setLoad] = useState(false);
    const [Reason, setReason] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [shiftId, setShiftId] = useState('');
    const [shiftName, setShiftName] = useState('');

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
        setSelectedleaveType(departmentName.leave_type_name);
        setSelectedleaveTypeId(departmentName.id)
        setShowleaveTypeDropdown(false);
    };

    // Category

    const [CategoryDropdown, setCategoryDropdown] = useState([]);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    useEffect(() => {
        const apiUrl = 'https://ocean21.in/api/public/api/leave_category_list';

        const fetchData = async () => {

            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;

                // console.log(responseData,"responseData")

                setCategoryDropdown(responseData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    const handleSelectCategory = (item) => {
        setSelectedCategory(item.leave_category_name);
        setSelectedCategoryId(item.id);
        setShowCategoryDropdown(false);
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
    const [startDate, setStartDate] = useState(null);
    const formattedStartDate = startDate ?
        `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}` :
        "";
    console.log(formattedStartDate, "formattedStartDate");

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
    const [endDate, setEndDate] = useState(null);
    const formattedEndDate = endDate ?
        `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}` :
        "";
    console.log(formattedEndDate, "formatteddate")

    const handleDateChange1 = (event, date) => {
        if (date !== undefined) {
            setEndDate(date);
        }
        setShowDatePicker1(Platform.OS === 'ios');
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [returnDate, setreturnDate] = useState(null);
    const formattedReturnDate = returnDate ?
        `${returnDate.getFullYear()}-${String(returnDate.getMonth() + 1).padStart(2, '0')}-${String(returnDate.getDate()).padStart(2, '0')}` :
        "";
    console.log(formattedReturnDate, "formatteddate")

    const handleDateChange2 = (event, date) => {
        if (date !== undefined) {
            setreturnDate(date);
        }
        setShowDatePicker2(Platform.OS === 'ios');
    };

    const showDatepicker2 = () => {
        setShowDatePicker2(true);
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

    const AppendedData = async () => {

        try {

            const apiUrl = `https://ocean21.in/api/public/api/shift_slot_checking`;

            const response = await axios.post(apiUrl, {
                emp_id: data.userempid,
                request_type: selectedCategoryId,
                from_date: formattedEndDate,
                to_date: formattedReturnDate,
                date: formattedStartDate,
                from_time: slotfromTime,
                to_time: slotToTime
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const ResData = response.data;
            console.log(ResData, "ResData");

            if (ResData.status === "success") {
                setShiftId(ResData.shift_id);
                setShiftName(ResData.shift_name);
            } else {
                console.log("Error")
            }

            console.log(response.data, "response vantaan paa")

        } catch (error) {
            console.log(error, "error")
        }
    }

    useEffect(() => {
        AppendedData();
    }, [slotToTime, returnDate])

    // 

    // Function to handle document selection

    const [docFile, setDocFile] = useState();

    const handleDocumentSelection = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setDocFile(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Document picker is cancelled');
            } else {
                console.error('Error while picking the document:', err);
            }
        }

    };

    // 

    const Handlerefresh = () => {
        setSelectedleaveType(null);
        setSelectedLocation(null);
        setSelectedShift(null);
        setStartDate(new Date());
        setSlotFromTime('00:00:00');
        setSlotToTime('00:00:00');
        setReason('');
    }

    // Api call for Handle Submit

    const HandleSubmit = async () => {

        setLoad(true);

        const formData = new FormData();

        formData.append('emp_id', data.userempid);
        formData.append('emp_name', data.username);
        formData.append('request_type', selectedCategoryId);
        formData.append('request_category', selectedleaveTypeId);
        formData.append('leave_reason', Reason);
        formData.append('shift_slot', shiftId);
        formData.append('from_date', formattedEndDate);
        formData.append('to_date', formattedReturnDate);
        formData.append('permission_date', formattedStartDate);
        formData.append('permission_timefrom', slotfromTime);
        formData.append('permission_timeto', slotToTime);

        if (docFile.length > 0) {
            docFile.map((img, index) => {
                formData.append(`attachement`, {
                    uri: img.uri,
                    name: img.name,
                    type: img.type,
                });
            });
        }
        else {
            formData.append('attachement', docFile);
        }


        try {

            const response = await fetch('https://ocean21.in/api/public/api/add_employee_leave_request', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${data.token}`
                },
                body: formData,
            });

            const responsedata = await response.json();

            console.log(responsedata, "appended")

            if (responsedata.status === 'success') {
                setLoad(false);
                Alert.alert('Success', responsedata.message);
                if (selectedCategory === "Permission") {
                    navigation.navigate('Permission Request');
                } else if (selectedCategory === "Leave") {
                    navigation.navigate('Leave Request');
                } else if (selectedCategory === "Half Day") {
                    navigation.navigate('HalfDay Request');
                }
            } else {
                console.log('Error')
                setLoad(false);
            }

        } catch (error) {
            setLoad(false);
            console.log('error', error)
        }
    }

    return (

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />}>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Leave Request</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Request Type
                    </Text>

                    <TouchableOpacity
                        onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                        style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedCategory ? selectedCategory : 'Select Category'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showCategoryDropdown && (
                        <View style={styles.dropdown}>
                            <ScrollView>
                                {CategoryDropdown.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.dropdownOption}
                                        onPress={() => handleSelectCategory(item)}
                                    >
                                        <Text>{item.leave_category_name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Category
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
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
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

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    {/* <Text style={styles.StatDateText}>
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
                        { }
                    </Text> */}

                    {selectedCategory === "Permission" || selectedCategory === "Half Day" ?
                        <>
                            <Text style={styles.StatDateText}>
                                Permission Date
                            </Text>

                            <View style={styles.inputs} >
                                <Text onPress={showDatepicker}>
                                    {/* {startDate.toDateString()} &nbsp; */}
                                    {startDate ? startDate.toDateString() : "Select a start date"} &nbsp;
                                </Text>
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={startDate || new Date()}
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
                                From Time
                            </Text>

                            <View style={styles.inputs}>
                                <Text onPress={showSlotFromTimepicker}>
                                    {slotfromTime ? slotfromTime : "Select a time"} &nbsp;
                                </Text>
                                {showSlotFromTimePicker && (
                                    <DateTimePicker
                                        value={slotfromTime ? parse(slotfromTime, 'HH:mm:ss', new Date()) : new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={handleSlotFromTimeChange}
                                    />
                                )}
                            </View>

                            <Text style={styles.errorText}>
                                { }
                            </Text>

                            <Text style={styles.StatDateText}>
                                To Time
                            </Text>

                            <View style={styles.inputs}>
                                <Text onPress={showSlotToTimepicker}>
                                    {slotToTime ? slotToTime : "Select a time"} &nbsp;
                                </Text>
                                {showSlotToTimePicker && (
                                    <DateTimePicker
                                        value={slotToTime ? parse(slotToTime, 'HH:mm:ss', new Date()) : new Date()}
                                        mode="time"
                                        display="default"
                                        onChange={handleSlotToTimeChange}
                                    />
                                )}
                            </View>

                            <Text style={styles.errorText}>
                                { }
                            </Text>
                        </> : null
                    }

                    {selectedCategory === "Leave" || selectedCategory === "Absent" ?
                        <>
                            <Text style={styles.StatDateText}>
                                From Date
                            </Text>

                            <View style={styles.inputs} >
                                <Text onPress={showDatepicker1}>
                                    {/* {endDate.toDateString()} &nbsp; */}
                                    {endDate ? endDate.toDateString() : "Select a date"} &nbsp;
                                </Text>
                                {showDatePicker1 && (
                                    <DateTimePicker
                                        value={endDate || new Date()}
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
                                To Date
                            </Text>

                            <View style={styles.inputs} >
                                <Text onPress={showDatepicker2}>
                                    {/* {returnDate.toDateString()} &nbsp; */}
                                    {returnDate ? returnDate.toDateString() : "Select an end date"} &nbsp;
                                </Text>
                                {showDatePicker2 && (
                                    <DateTimePicker
                                        value={returnDate || new Date()}
                                        mode="date"
                                        display="default"
                                        onChange={handleDateChange2}
                                    />
                                )}
                            </View>

                            <Text style={styles.errorText}>
                                { }
                            </Text>
                        </> : null
                    }

                    <Text style={styles.subHeading}>
                        Select File
                    </Text>

                    <Text style={docFile ? styles.DocFileName : styles.DocFileNameHolder}>
                        {docFile ? docFile[0].name : 'Select The Document'}
                    </Text>

                    <View style={styles.fullWidth}>
                        <TouchableOpacity style={styles.UploadButton} onPress={handleDocumentSelection}>
                            <Text style={styles.UploadButtonText}>
                                Select Document
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Reason
                    </Text>

                    <TextInput
                        value={Reason}
                        onChangeText={(text) => setReason(text)}
                        style={styles.Reason}
                    />

                    <Text style={styles.errorText}>
                        { }
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


            </View>

        </ScrollView>

    )
}

export default EmpLeaveReq;