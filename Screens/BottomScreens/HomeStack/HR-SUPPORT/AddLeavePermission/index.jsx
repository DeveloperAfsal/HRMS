import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl, TextInput, TouchableOpacity, Image, Platform, ActivityIndicator, Alert } from 'react-native';
import styles from "./style";
import CalenderIcon from "../../../../../assets/EPK CRM Icons/Calendar.svg";
import ClockIcon from "../../../../../assets/EPK CRM Icons/Clock.svg";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import { useSelector } from "react-redux";
import axios from "axios";
import { Black, Grey, White } from "../../../../../assets/Colors";

const AddLeavePermission = ({ navigation }) => {

    // data from redux-store

    const { data } = useSelector((state) => state.login);

    // states 

    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [person, setPerson] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [typeArray, setTypeArray] = useState([{ "id": "0", "request_type_name": "Select Type" }]);
    const [leaveCategoryArray, setLeaveCategoryArray] = useState([{ "cid": "0", "category_name": "Select Type" }]);
    const [errors, setErrors] = useState({});
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [permissionDate, setPermissionDate] = useState(new Date());
    const [fromTime, setFromTime] = useState('00:00:00');
    const [toTime, setToTime] = useState('00:00:00');
    const [reason, setReason] = useState('');
    const [load, setLoad] = useState(false);

    // Handler

    const HandlesetType = (itemValue) => {
        setType(itemValue == 0 ? '' : itemValue);
    };

    const HandlesetLeaveCategory = (itemValue) => {
        setCategory(itemValue == 0 ? '' : itemValue);
    };

    const Handlesetperson = (itemValue) => {
        if (itemValue == NameArray[0]) {
            setPerson('');
        }
        else {
            setPerson(itemValue)
        }
    }

    // refreshing

    const [refreshing, setRefreshing] = useState(false);

    const HandleRefresh = () => {
        setPerson('');
        setCategory('');
        setType('');
        setFromDate(new Date());
        setToDate(new Date());
        setPermissionDate(new Date());
        setFromTime('00:00:00');
        setToTime('00:00:00');
        setReason('');
        const newErrors = {};
        setErrors(newErrors)
    };

    // datas Mapping

    const NameArray = datas.map(employee => ({
        id: employee.id,
        name: `${employee.first_name} ${employee.last_name}`,
    }));

    // formatter

    const fromDate1 = `${fromDate.getFullYear()}-${fromDate.getMonth() + 1}-${fromDate.getDate()}`;
    const toDate1 = `${toDate.getFullYear()}-${toDate.getMonth() + 1}-${toDate.getDate()}`;
    const permissionDate1 = `${permissionDate.getFullYear()}-${permissionDate.getMonth() + 1}-${permissionDate.getDate()}`;

    // Submit 

    const handleSubmit = async () => {

        setLoad(true);

        const newErrors = {};

        if (!person && person.trim().length === 0) {
            newErrors.person = 'This field is required';
        }

        if (!type && type.trim().length === 0) {
            newErrors.type = 'This field is required';
        }

        if (!category && category.trim().length === 0) {
            newErrors.category = 'This field is required';
        }

        if (!reason && reason.trim().length === 0) {
            newErrors.reason = 'This field is required';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

            const formData = new FormData();

            formData.append('id', person);
            formData.append('request_type', type);
            formData.append('request_category', category);
            formData.append('loginhr_id', data.userempid);
            formData.append('leave_reason', reason);

            formData.append('from_date', fromDate1);
            formData.append('to_date', toDate1);
            formData.append('permission_date', permissionDate1);
            formData.append('permission_timefrom', fromTime);
            formData.append('permission_timeto', toTime);

            if (selectedImage1.length > 0) {
                selectedImage1.map((selectedImage, index) => {
                    const imageUriParts = selectedImage.split('/');
                    const imageName = imageUriParts[imageUriParts.length - 1];
                    formData.append(`proof`, {
                        uri: selectedImage,
                        name: imageName,
                        type: 'image/jpeg',
                    });
                });
            } else {
                formData.append('proof', selectedImage1);
            }

            try {
                const response = await fetch('https://officeinteriorschennai.com/api/public/api/hr_admin_add_attendance', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${data.token}`
                    },
                    body: formData,
                });

                const responsedata = await response.json();

                if (responsedata.status == 'success') {
                    setLoad(false);
                    // handleShowAlert();

                    navigation.navigate('Monthly Employee Calendar')

                    setPerson('');
                    setCategory('');
                    setType('');
                    setFromDate(new Date());
                    setToDate(new Date());
                    setPermissionDate(new Date());
                    setFromTime('00:00:00');
                    setToTime('00:00:00');
                    setReason('');
                    setSelectedImage1([]);
                }
                else {
                    // handleShowAlert1();
                    setLoad(false);
                    Alert.alert("Failed to add Attendance")
                    console.log("error1")
                }
            } catch (error) {
                // handleShowAlert1();
                setLoad(false);
                Alert.alert("Failed to add Attendance")
                console.log("error2")
            }
        }
        else {
            // handleShowAlert2()
            setLoad(false);
            Alert.alert("Please fill all the details")
            console.log("error3")
        }

    }

    // API Call setTypeArray

    useEffect(() => {
        const apiUrl = 'https://officeinteriorschennai.com/api/public/api/leaverequesttype';
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responsedata = response.data.data;
                setTypeArray([{ "id": "0", "request_type_name": "Select Type" }, ...responsedata]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, []);

    // API Call setLeaveCategoryArray

    useEffect(() => {
        const apiUrl = 'https://officeinteriorschennai.com/api/public/api/leaverequestcategory';
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responsedata = response.data.data;
                setLeaveCategoryArray([{ "cid": "0", "category_name": "Select Category Type" }, ...responsedata]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, []);

    // Api call for setDatas

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.get('https://officeinteriorschennai.com/api/public/api/employeelist', {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                setDatas([{ "id": "0", "first_name": "Select", "last_name": "Employee" }, ...response.data.data]);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();

    }, []);

    // Date , Time , Image - Pickers

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showTimePicker1, setShowTimePicker1] = useState(false);
    const [selectedImage1, setSelectedImage1] = useState([]);

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setFromDate(date);
        }
        setShowDatePicker(Platform.OS === 'ios');
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const handleDateChange1 = (event, date) => {
        if (date !== undefined) {
            setToDate(date);
        }
        setShowDatePicker1(Platform.OS === 'ios');
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    const handleDateChange2 = (event, date) => {
        if (date !== undefined) {
            setPermissionDate(date);
        }
        setShowDatePicker2(Platform.OS === 'ios');
    };

    const showDatepicker2 = () => {
        setShowDatePicker2(true);
    };

    const handleTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setFromTime(formattedTime);
        }
        setShowTimePicker(Platform.OS === 'ios');
    };

    const handleTimeChange1 = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setToTime(formattedTime);
        }
        setShowTimePicker1(Platform.OS === 'ios');
    };

    const showTimepicker = () => {
        setShowTimePicker(true);
    };

    const showTimepicker1 = () => {
        setShowTimePicker1(true);
    };

    return (
        <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={HandleRefresh} />}>

            <Text style={styles.subHeading}>Add Attendance</Text>

            <View style={[styles.input, styles.padding]}>
                <Picker
                    selectedValue={person}
                    onValueChange={(itemValue) => {
                        Handlesetperson(itemValue);
                    }}>
                    {NameArray.map((option, index) => (
                        <Picker.Item key={index} label={option.name} value={option.id} color={Grey} />
                    ))}

                </Picker>
            </View>
            {errors.person && <Text style={styles.errorText}>{errors.person}</Text>}


            <View style={[styles.input, styles.padding]}>
                <Picker selectedValue={type} onValueChange={HandlesetType}>
                    {typeArray.map((option) => (
                        <Picker.Item key={option.id} label={option.request_type_name} value={option.id} color={Grey} />
                    ))}
                </Picker>
            </View>
            {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}



            <View style={[styles.input, styles.padding]}>
                <Picker selectedValue={category} onValueChange={HandlesetLeaveCategory}>
                    {leaveCategoryArray.map((option) => (
                        <Picker.Item key={option.cid} label={option.category_name} value={option.cid} color={Grey} />
                    ))}
                </Picker>
            </View>
            {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}


            {type == 2 || type == 3 ?
                <View >
                    <Text style={styles.date}>Date :</Text>
                    <View style={[styles.input, styles.padding]} >
                        <Text onPress={showDatepicker2}>
                            {permissionDate.toDateString()} &nbsp;
                            <CalenderIcon width={20} height={20} color={Black} />
                        </Text>
                        {showDatePicker2 && (
                            <DateTimePicker
                                value={permissionDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange2}
                            />
                        )}
                    </View>

                    <View>
                        <Text style={styles.date}>From Time :</Text>
                        <View style={[styles.input, styles.padding]} >
                            <Text onPress={showTimepicker}>
                                {fromTime} &nbsp;
                                <ClockIcon width={20} height={20} color={Black} />
                            </Text>
                            {showTimePicker && (
                                <DateTimePicker
                                    value={parse(fromTime, 'HH:mm:ss', new Date())}
                                    mode="time"
                                    display="default"
                                    onChange={handleTimeChange}
                                />
                            )}
                        </View>
                    </View>

                    <View>
                        <Text style={styles.date}>To Time :</Text>
                        <View style={[styles.input, styles.padding]} >
                            <Text onPress={showTimepicker1}>
                                {toTime} &nbsp;
                                <ClockIcon width={20} height={20} color={Black} />
                            </Text>
                            {showTimePicker1 && (
                                <DateTimePicker
                                    value={parse(toTime, 'HH:mm:ss', new Date())}
                                    mode="time"
                                    display="default"
                                    onChange={handleTimeChange1}
                                />
                            )}
                        </View>
                    </View>
                </View>
                : null}


            {type == 1 || type == 4 ?
                <View >
                    <Text style={styles.date}>From Date :</Text>
                    <View style={styles.input} >
                        <Text onPress={showDatepicker}>
                            {fromDate.toDateString()} &nbsp;
                            <CalenderIcon width={20} height={20} color={Black} />
                        </Text>
                        {showDatePicker && (
                            <DateTimePicker
                                value={fromDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>

                    <Text style={styles.date}>To Date :</Text>
                    <View style={styles.input} >
                        <Text onPress={showDatepicker1}>
                            {toDate.toDateString()} &nbsp;
                            <CalenderIcon width={20} height={20} color={Black} />
                        </Text>
                        {showDatePicker1 && (
                            <DateTimePicker
                                value={toDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange1}
                            />
                        )}
                    </View>
                </View>
                : null}


            <View style={[styles.input, { padding: 10, height: 150 }]}>
                <TextInput
                    placeholder="Enter Reason.."
                    value={reason}
                    onChangeText={(text) => setReason(text)}
                    multiline
                    numberOfLines={Math.max(4, reason.split('\n').length)}
                    textAlignVertical="top" />
            </View>
            {errors.reason && <Text style={styles.errorText}>{errors.reason}</Text>}

            <TouchableOpacity onPress={handleSubmit} style={styles.Button1}>
                {
                    load ?
                        <ActivityIndicator size={'small'} color={White} /> :
                        <Text style={styles.text}>
                            Submit
                        </Text>
                }
            </TouchableOpacity>

        </ScrollView>
    )
}

export default AddLeavePermission;