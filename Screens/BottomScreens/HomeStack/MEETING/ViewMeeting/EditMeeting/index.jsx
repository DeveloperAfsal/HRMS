import React, { useEffect, useRef, useState } from "react";
import styles from "./style";
import { ActivityIndicator, Platform, ScrollView, Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import { MultiSelect } from 'react-native-element-dropdown';
import { format, parse } from 'date-fns';
import CalenderIcon from "../../../../../../assets/EPK CRM Icons/Calendar.svg";
import ClockIcon from "../../../../../../assets/EPK CRM Icons/Clock.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Black, White } from "../../../../../../assets/Colors";

const EditMeeting = ({ route, navigation }) => {

    // useRef

    const ref = useRef(null);

    // data from redux-store

    const { data } = useSelector((state) => state.login);

    // route

    const meetingId = route.params.Id;

    // Api call setDatas

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        axios
            .get(`https://officeinteriorschennai.com/api/public/api/vieweditmeeting/${meetingId}`, {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            })
            .then(res => {
                if (res.status === 200) {
                    setDatas(res.data.data[0]);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [meetingId]);

    // setting up datas

    useEffect(() => {
        if (datas) {
            const teamNameArray = datas.meeting_teamname ? datas.meeting_teamname.split(',').map(team => team.trim()) : [];
            const teamMemberArray = datas.meeting_teammember ? datas.meeting_teammember.split(',').map(member => member.trim()) : [];
            console.log(teamNameArray),
                console.log(teamMemberArray),
                setSelectedTeams(teamNameArray);
            setSelectedMembers(teamMemberArray);
            setMeetingDate(new Date(datas.meeting_date));
            setMeetingStartTime(datas.start_time);
            setMeetingEndTime(datas.end_time);
            setMeetingAgenda(datas.meeting_reason);
            setRemarks(datas.meeting_remarks);
            setMeetingTitle(datas.meeting_title);
        }
    }, [datas]);

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

    // Api call for setTeamsDropdown

    useEffect(() => {
        const apiUrl = 'https://officeinteriorschennai.com/api/public/api/teamlist';
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                });
                const responsedata = response.data.data;
                setTeamsDropdown(responsedata);
                // console.log(responsedata,"responsedata")
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // 

    const formattedTeams = selectedTeams.join(',');

    // Api call for setMembersDropdown

    useEffect(() => {
        const apiUrl = 'https://officeinteriorschennai.com/api/public/api/memberdata';
        const fetchData = async () => {
            try {
                const response = await axios.post(apiUrl, {
                    memberdata: formattedTeams
                }, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;
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

    // Date Picker

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

    // Date Formatter

    const formattedDate = `${meetingDate.getFullYear()}-${meetingDate.getMonth() + 1}-${meetingDate.getDate()}`;

    // errors

    const [errors, setErrors] = useState({});

    // handleSubmit

    const handleSubmit = async () => {
        setLoad(true);
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


            formData.append('id', meetingId);
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
                const response = await fetch('https://officeinteriorschennai.com/api/public/api/edit_meeting', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${data.token}`
                    },
                    body: formData,
                });

                const responsedata = await response.json();
                console.log(responsedata, "responsedata")

                if (responsedata.status == 'success') {
                    setLoad(false)
                    // handleShowAlert();
                    navigation.navigate('View Meeting');
                }
                else {
                    // handleShowAlert1();
                    console.log("erro1");
                    setLoad(false);
                    Alert.alert("Failed to Edit Meeting");
                }
            } catch (error) {
                // handleShowAlert1();
                console.log("erro2");
                setLoad(false);
                Alert.alert("Failed to Edit Meeting");
            }
        }
        else {
            // handleShowAlert2();
            console.log("erro3");
            setLoad(false);
            Alert.alert("Please fill all the details");
        }
    }


    return (
        <ScrollView style={styles.container} >
            <View style={styles.subContainer}>
                <Text style={styles.subHeading}>Edit Meeting</Text>

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
                        onChange={(items) => {
                            setSelectedMembers(items);
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
                        <Text onPress={showTimepicker1}>
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

                <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
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

export default EditMeeting;