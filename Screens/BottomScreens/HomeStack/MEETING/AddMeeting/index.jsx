import React, { useEffect, useRef, useState } from "react";
import styles from "./style";
import { ActivityIndicator, Platform, RefreshControl, ScrollView, Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import { MultiSelect } from 'react-native-element-dropdown';
import { format, parse } from 'date-fns';
import { useSelector } from "react-redux";
import axios from "axios";
import CalenderIcon from "../../../../../assets/EPK CRM Icons/Calendar.svg";
import ClockIcon from "../../../../../assets/EPK CRM Icons/Clock.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Black, White } from "../../../../../assets/Colors";

const AddMeeting = ({ navigation }) => {

    const ref = useRef(null);

    // data from redux-store

    const { data } = useSelector((state) => state.login);

    // states

    const [teamsDropdown, setTeamsDropdown] = useState([]);
    const [membersDropdown, setMembersDropdown] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [meetingDate, setMeetingDate] = useState(new Date());
    const [meetingStartTime, setMeetingStartTime] = useState(format(new Date(), 'HH:mm:ss'));
    const [meetingEndTime, setMeetingEndTime] = useState(format(new Date(), 'HH:mm:ss'));
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [showTimePicker1, setShowTimePicker1] = useState(false)
    const [meetingAgenda, setMeetingAgenda] = useState('');
    const [remarks, setRemarks] = useState('');
    const [meetingTitle, setMeetingTitle] = useState('');
    const [load, setLoad] = useState(false);

    // errors

    const [errors, setErrors] = useState({});

    // Date Formatter 

    const formattedDate = `${meetingDate.getFullYear()}-${meetingDate.getMonth() + 1}-${meetingDate.getDate()}`;

    //  Handle Refresh

    const [refreshing, setRefreshing] = useState(false);

    const HandleRefresh = () => {
        setSelectedTeams([]);
        setSelectedMembers([]);
        setMeetingDate(new Date());
        setMeetingStartTime(format(new Date(), 'HH:mm:ss'));
        setMeetingEndTime(format(new Date(), 'HH:mm:ss'));
        setMeetingAgenda('');
        setMeetingTitle('');
        setRemarks('')
        const nullErrors = Object.fromEntries(
            Object.keys(errors).map((key) => [key, null])
        );
        setErrors(nullErrors);
    };

    // Api call for setTeamsDropdown

    useEffect(() => {
        const apiUrl = 'https://officeinteriorschennai.com/api/public/api/teamlist';
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;
                // console.log(responseData,"responseData")
                setTeamsDropdown(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, []);

    const formattedTeams = selectedTeams.join(',');

    // Api call for setTeamsDropdown

    useEffect(() => {
        const apiUrl = 'https://officeinteriorschennai.com/api/public/api/memberdata';
        const requestData = {
            memberdata: formattedTeams
        };

        const fetchData = async () => {
            try {
                const response = await axios.post(apiUrl, requestData, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;
                console.log(responseData, "responseData")
                setMembersDropdown(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [formattedTeams]);

    // Time picker

    const handleTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setMeetingStartTime(formattedTime);
        }
        setShowTimePicker(Platform.OS === 'ios');
    };

    const showTimepicker = () => {
        setShowTimePicker(true);
    };

    const handleTimeChange1 = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setMeetingEndTime(formattedTime);
        }
        setShowTimePicker1(Platform.OS === 'ios');
    };

    const showTimepicker1 = () => {
        setShowTimePicker1(true);
    };

    // Date picker

    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setMeetingDate(date);
        }
        setShowDatePicker(Platform.OS === 'ios');
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    // Submit handler

    const handleSubmit = async () => {
        setLoad(true)
        const newErrors = {};

        if (!meetingTitle && meetingTitle.trim().length === 0) {
            newErrors.meetingTitle = 'This field is required';
        }

        if (!selectedTeams && selectedTeams.trim().length === 0) {
            newErrors.meetingteams = 'This field is required';
        }

        if (!selectedMembers && selectedMembers.trim().length === 0) {
            newErrors.meetingmembers = 'This field is required';
        }

        if (!meetingAgenda && meetingAgenda.trim().length === 0) {
            newErrors.meetingagenda = 'This field is required';
        }

        if (!remarks && remarks.trim().length === 0) {
            newErrors.remarks = 'This field is required';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

            const formData = new FormData();

            formData.append('meeting_teamname', selectedTeams);
            formData.append('meeting_teammember', selectedMembers);
            formData.append('meeting_title', meetingTitle);
            formData.append('meeting_date', formattedDate);
            formData.append('start_time', meetingStartTime);
            formData.append('end_time', meetingEndTime);
            formData.append('meeting_reason', meetingAgenda);
            formData.append('meeting_remarks', remarks);
            formData.append('added_hr_id', data.userempid);

            try {
                const response = await fetch('https://officeinteriorschennai.com/api/public/api/meetinginsert', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${data.token}`
                    },
                    body: formData,
                });

                const responsedata = await response.json();
                console.log(responsedata, "responsedata");

                if (responsedata.status == 'success') {
                    setLoad(false)
                    // handleShowAlert();
                    
                    navigation.navigate('View Meeting')

                    setSelectedTeams([]);
                    setSelectedMembers([]);
                    setMeetingDate(new Date());
                    setMeetingStartTime(format(new Date(), 'HH:mm:ss'));
                    setMeetingEndTime(format(new Date(), 'HH:mm:ss'));
                    setMeetingAgenda('');
                    setMeetingTitle('');
                    setRemarks('')
                    const nullErrors = Object.fromEntries(
                        Object.keys(errors).map((key) => [key, null])
                    );
                    setErrors(nullErrors);
                }
                else {
                    // handleShowAlert1();
                    setLoad(false);
                    console.log("erro1");
                    Alert.alert("Failed to add Meeting");
                }
            } catch (error) {
                // handleShowAlert1();
                setLoad(false);
                console.log("erro2");
                Alert.alert("Failed to add Meeting");
            }
        }
        else {
            // handleShowAlert2();
            setLoad(false);
            console.log("erro3");
            Alert.alert("Please fill all the details");
        }
    }


    return (
        <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={HandleRefresh} />}>
            
            <View style={styles.subContainer}>

                <Text style={styles.subHeading}>Add Meeting</Text>

                <TextInput
                    placeholder="Meeting Title"
                    value={meetingTitle}
                    onChangeText={(text) => setMeetingTitle(text)}
                    style={styles.input}
                />
                {errors.meetingTitle ? <Text style={styles.errorText}>{errors.meetingTitle}</Text> : null}


                <View >
                    <MultiSelect
                        search
                        inside
                        ref={ref}
                        style={styles.dropdown}
                        data={teamsDropdown}
                        labelField="department_name"
                        valueField="department_id"
                        label="Multi Select"
                        placeholder="  Select Teams"
                        selectedStyle={styles.style1}
                        selectedTextStyle={styles.selectedTextStyle}
                        activeColor='rgba(0, 0, 0, 0.18)'
                        searchPlaceholder="Search"
                        value={selectedTeams}
                        onChange={(item) => {
                            setSelectedTeams(item);
                        }}
                    />
                </View>
                {errors.meetingteams ? <Text style={styles.errorText}>{errors.meetingteams}</Text> : null}

                <View >
                    <MultiSelect
                        search
                        inside
                        ref={ref}
                        style={styles.dropdown}
                        data={membersDropdown}
                        labelField="first_name"
                        valueField="id"
                        label="Multi Select"
                        placeholder="  Select Members"
                        selectedStyle={styles.style1}
                        selectedTextStyle={styles.selectedTextStyle}
                        activeColor='rgba(0, 0, 0, 0.18)'
                        searchPlaceholder="Search"
                        value={selectedMembers}
                        onChange={(item) => {
                            setSelectedMembers(item);
                        }}
                    />
                </View>
                {errors.meetingmembers ? <Text style={styles.errorText}>{errors.meetingmembers}</Text> : null}


                <Text style={styles.date}>Meeting Date :</Text>

                <View style={styles.input} >
                    <Text onPress={showDatepicker}>
                        {meetingDate.toDateString()} &nbsp;
                        <CalenderIcon width={20} height={20} color={Black} />
                    </Text>
                    {showDatePicker && (
                        <DateTimePicker
                            value={meetingDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </View>


                <View>

                    <Text style={styles.date}>Tentative Start Time :</Text>
                    
                    <View style={styles.input} >
                        <Text onPress={showTimepicker}>
                            {meetingStartTime} &nbsp;
                            <ClockIcon width={20} height={20} color={Black} />
                        </Text>
                        {showTimePicker && (
                            <DateTimePicker
                                value={parse(meetingStartTime, 'HH:mm:ss', new Date())}
                                mode="time"
                                display="default"
                                onChange={handleTimeChange}
                            />
                        )}
                    </View>

                    <Text style={styles.date}>Tentative End Time :</Text>
                    <View style={styles.input} >
                        <Text onPress={showTimepicker1} >
                            {meetingEndTime} &nbsp;
                            <ClockIcon width={20} height={20} color={Black} />
                        </Text>
                        {showTimePicker1 && (
                            <DateTimePicker
                                value={parse(meetingEndTime, 'HH:mm:ss', new Date())}
                                mode="time"
                                display="default"
                                onChange={handleTimeChange1}
                            />
                        )}
                    </View>
                </View>

                <TextInput
                    placeholder="Enter Meeting Agenda"
                    value={meetingAgenda}
                    onChangeText={(text) => setMeetingAgenda(text)}
                    style={styles.input}
                    multiline
                    numberOfLines={5}
                />
                {errors.meetingagenda ? <Text style={styles.errorText}>{errors.meetingagenda}</Text> : null}

                <TextInput
                    placeholder="Remarks"
                    value={remarks}
                    onChangeText={(text) => setRemarks(text)}
                    style={styles.input}
                    keyboardType="default"
                />
                {errors.remarks ? <Text style={styles.errorText}>{errors.remarks}</Text> : null}

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

export default AddMeeting;