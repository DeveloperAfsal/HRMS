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

const AddAttendance = ({ navigation }) => {

    // data from redux-store

    const { data } = useSelector((state) => state.login);

    // states

    const [datas, setDatas] = useState([]);
    const [person, setPerson] = useState('');
    const [requestDate, setRequestDate] = useState(new Date());
    const [fromTime, setFromTime] = useState('00:00:00');
    const [toTime, setToTime] = useState('00:00:00');

    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [showTimePicker1, setShowTimePicker1] = useState(false);

    const [requestTypeArray, setRequestTypeArray] = useState([]);
    const [locationArray, setLocationArray] = useState([]);

    const [errors, setErrors] = useState({});
    const [load, setLoad] = useState(false);

    // Date Time Picker 

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setRequestDate(date);
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

    // refreshing

    const [refreshing, setRefreshing] = useState(false);

    const HandleRefresh = () => {
        setPerson('');
        setRequestDate(new Date())
        setFromTime('00:00:00');
        setToTime('00:00:00');
        setErrors({})
    };

    // formatter

    const formattedDate = `${requestDate.getFullYear()}-${requestDate.getMonth() + 1}-${requestDate.getDate()}`;

    // Api  call setLocationArray

    useEffect(() => {
        const apiUrl = 'https://officeinteriorschennai.com/api/public/api/attendancerequestlocation';
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responsedata = response.data.data;
                setLocationArray([{ "id": "0", "request_location": "Select Location" }, ...responsedata]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, []);

    // Api Call setRequestTypeArray

    useEffect(() => {
        const apiUrl = 'https://officeinteriorschennai.com/api/public/api/attendancerequesttype';
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responsedata = response.data.data;
                setRequestTypeArray([{ "id": "0", "request_type_name": "Select Category Type" }, ...responsedata]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, []);

    // Api call setDatas

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://officeinteriorschennai.com/api/public/api/employeelist', {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                setDatas([{ "id": "0", "first_name": "Select", "last_name": "Employee" }, ...response.data.data]);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();

    }, []);

    // datas mapping

    const NameArray = datas.map(employee => ({
        id: employee.id,
        name: `${employee.first_name} ${employee.last_name}`,
    }));

    // handler

    const Handlesetperson = (itemValue) => {
        if (itemValue == NameArray[0]) {
            setPerson('');
        }
        else {
            setPerson(itemValue)
        }
    }

    // handle submit

    const handleSubmit = async () => {

        setLoad(true);

        const newErrors = {};

        if (!person && person.trim().length === 0) {
            newErrors.person = 'This field is required';
        }

        if (Object.keys(newErrors).length === 0) {

            const formData = new FormData();
            formData.append('e_id', person);
            formData.append('hr_id', data.userempid);
            formData.append('request_date', formattedDate);
            formData.append('request_fromtime', fromTime);
            formData.append('request_totime', toTime);


            try {
                const response = await fetch('https://officeinteriorschennai.com/api/public/api/add_hr_attendance', {
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

                    setPerson('');
                    setRequestDate(new Date());
                    setFromTime('00:00:00');
                    setToTime('00:00:00');
                    setErrors({});
                    Alert.alert("Added Successfully")
                }
                else {
                    // handleShowAlert1();
                    setLoad(false);
                    console.log("error1");
                    Alert.alert("Failed to add")
                }
            } catch (error) {
                // handleShowAlert1()
                setLoad(false);
                console.log("error2");
                Alert.alert("Failed to add");
            }
        } else {
            setErrors(newErrors);
            // handleShowAlert2()
            setLoad(false);
            console.log("error3");
            Alert.alert("Please fill all the details");
        }
    }


    return (
        <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={HandleRefresh} />}>

            <View style={styles.subContainer} >

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


                <Text style={styles.subtop}>Select Date :</Text>
                <View style={styles.input} >
                    <Text onPress={showDatepicker2}>
                        {requestDate.toDateString()} &nbsp;
                        <CalenderIcon width={20} height={20} color="black" />
                    </Text>
                    {showDatePicker2 && (
                        <DateTimePicker
                            value={requestDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}

                        />
                    )}
                </View>
                {errors.requestDate && <Text style={styles.errorText}>{errors.requestDate}</Text>}


                <View>
                    <Text style={styles.subtop}>From Time :</Text>
                    <View style={styles.input} >
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
                {errors.fromTime && <Text style={styles.errorText}>{errors.fromTime}</Text>}


                <View>
                    <Text style={styles.subtop}>To Time :</Text>
                    <View style={styles.input} >
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
                {errors.toTime && <Text style={styles.errorText}>{errors.toTime}</Text>}

                <TouchableOpacity onPress={handleSubmit} style={styles.Button1}>
                    {
                        load ?
                            <ActivityIndicator size={'small'} color={White} /> :
                            <Text style={styles.text}>
                                Submit
                            </Text>
                    }
                </TouchableOpacity>

            </View>

        </ScrollView>
    )
}

export default AddAttendance;