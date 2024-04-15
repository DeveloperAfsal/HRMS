import styles from "./style";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { MultiSelect } from 'react-native-element-dropdown';
import { format, parse } from 'date-fns';
import axios from 'axios';
import { useSelector } from "react-redux";
import CalenderIcon from "../../../../../../assets/EPK CRM Icons/Calendar.svg";
import ClockIcon from "../../../../../../assets/EPK CRM Icons/Clock.svg";
import { Black } from "../../../../../../assets/Colors";

const ViewEvent = ({ route }) => {

    // data from redux-store

    const { data } = useSelector((state) => state.login);

    // useref

    const ref = useRef(null);

    // route

    const eventID = route.params.Id;

    // states

    const [datas, setDatas] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [eventDate, setEventDate] = useState(new Date());
    const [eventStartTime, setEventStartTime] = useState(format(new Date(), 'HH:mm:ss'));
    const [eventEndTime, setEventEndTime] = useState(format(new Date(), 'HH:mm:ss'));
    const [eventAgenda, setEventAgenda] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [eventPhotoID, setEvenetPhotoID] = useState([]);
    const [teamsDropdown, setTeamsDropdown] = useState([]);
    const [membersDropdown, setMembersDropdown] = useState([]);

    //  eventID call

    useEffect(() => {
        axios
            .get(`https://officeinteriorschennai.com/api/public/api/vieweditevent/${eventID}`, {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                }
            })
            .then(res => {
                if (res.status === 200) {
                    setDatas(res.data.data);
                    // console.log(res.data.data,"resdata")
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [eventID]);

    //  Api call datas

    useEffect(() => {
        if (datas) {
            const teamNameArray = datas.event_teamname ? datas.event_teamname.split(',').map(team => team.trim()) : [];
            const teamMemberArray = datas.event_teammember ? datas.event_teammember.split(',').map(member => member.trim()) : [];
            setSelectedTeams(teamNameArray);
            setSelectedMembers(teamMemberArray);
            setEventDate(new Date(datas.event_date));
            setEventStartTime(datas.start_time);
            setEventEndTime(datas.end_time);
            setEventAgenda(datas.event_reason);
            setEventTitle(datas.event_title);
            setEvenetPhotoID(datas.event_photoid);
            if (datas.pvaluename) {
                const bannerImagesString = datas.pvaluename;
                const imageFilenames = bannerImagesString.split(",");
                // const urlPrefix = "https://officeinteriorschennai.com/assets/Events_photo/";
                // const fullPaths = imageFilenames.map(filename => urlPrefix + filename);
                // setSelectedImages1(imageFilenames);
            }
        }
    }, [datas]);

    // API call setTeamsDropdown

    useEffect(() => {
        const apiUrl = 'https://officeinteriorschennai.com/api/public/api/teamlist';
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responsedata = response.data.data;
                setTeamsDropdown(responsedata);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [data.token]);

    // formattedTeams

    const formattedTeams = selectedTeams.join(',');

    // API call setMembersDropdown

    useEffect(() => {
        const apiUrl = 'https://officeinteriorschennai.com/api/public/api/memberdata';
        const postData = async () => {
            try {
                const response = await axios.post(apiUrl, {
                    memberdata: formattedTeams
                }, {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const responsedata = response.data.data;
                setMembersDropdown(responsedata);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        postData();
    }, [formattedTeams]);


    return (

        <ScrollView style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.subHeading}>View Event</Text>

                <TextInput
                    placeholder="Event Title"
                    value={eventTitle}
                    style={styles.input}
                    editable={false}
                />

                <View >
                    <Text>Selected Departments:</Text>
                    <MultiSelect
                        search
                        inside
                        ref={ref}
                        style={[styles.dropdown,{paddingLeft:15}]}
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
                        editable={false}
                        onChange={() => { }}
                    />
                </View>

                <View >
                    <MultiSelect
                        search
                        inside
                        ref={ref}
                        style={[styles.dropdown,{paddingLeft:15}]}
                        data={membersDropdown}
                        labelField="first_name"
                        valueField="id"
                        label="Multi Select"
                        placeholder="  Select Members"
                        selectedStyle={styles.style1}
                        selectedTextStyle={styles.selectedTextStyle}
                        activeColor='rgba(0, 0, 0, 0.18)'
                        searchPlaceholder="Search"
                        value={selectedMembers.toString()}
                        editable={false}
                        onChange={() => { }}
                    />
                </View>


                <Text style={styles.date}>Event Date :</Text>

                <View style={styles.input} >
                    <Text>
                        {eventDate.toDateString()} &nbsp;
                        <CalenderIcon width={20} height={20} color={Black} />
                    </Text>
                </View>


                <View>
                    <Text style={styles.date}>Tentative Start Time :</Text>
                    <View style={styles.input} >
                        <Text>
                            {eventStartTime} &nbsp;
                            <ClockIcon width={20} height={20} color={Black} />
                        </Text>
                    </View>

                    <Text style={styles.date}>Tentative End Time :</Text>
                    <View style={styles.input} >
                        <Text>
                            {eventEndTime} &nbsp;
                            <ClockIcon width={20} height={20} color={Black} />
                        </Text>
                    </View>
                </View>


                <TextInput
                    placeholder="Enter Event Agenda"
                    value={eventAgenda}
                    style={styles.input}
                    multiline
                    numberOfLines={5}
                    editable={false}
                />


                <View>
                    <View >
                        {/* {renderSelectedImages()} */}
                    </View>
                </View>

                <TouchableOpacity style={styles.savetoGalary} onPress={() => { saveImagesToGallery() }}>
                    <Text style={styles.text}>
                        Save Images
                    </Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

export default ViewEvent;