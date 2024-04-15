import styles from "./style";
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, TextInput, Platform, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { MultiSelect } from 'react-native-element-dropdown';
import { useSelector } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import axios from "axios";
import DeleteIcon from "../../../../../../assets/EPK CRM Icons/Delete.svg";
import CalenderIcon from "../../../../../../assets/EPK CRM Icons/Calendar.svg";
import ClockIcon from "../../../../../../assets/EPK CRM Icons/Clock.svg";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { Black, PrimaryPurple, White } from "../../../../../../assets/Colors";
import CustomAlert from "../../../../../../Components/CustomAlert";

const EditEvent = ({ route, navigation }) => {

    const ref = useRef(null);

    // data from redux-store

    const { data } = useSelector((state) => state.login);

    //  routes

    const eventID = route.params.Id;
    // console.log(eventID,"eventID")

    // states

    const [datas, setDatas] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [eventDate, setEventDate] = useState(new Date());
    const [eventStartTime, setEventStartTime] = useState(format(new Date(), 'HH:mm:ss'));
    const [eventEndTime, setEventEndTime] = useState(format(new Date(), 'HH:mm:ss'));
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [showTimePicker1, setShowTimePicker1] = useState(false)
    const [eventAgenda, setEventAgenda] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [membersDropdown, setMembersDropdown] = useState([]);
    const [teamsDropdown, setTeamsDropdown] = useState([]);
    const [eventPhotoID, setEvenetPhotoID] = useState([]);
    const [load, setLoad] = useState(false);

    // eventID call

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
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [eventID]);

    // API call datas

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
                const urlPrefix = "https://officeinteriorschennai.com/api/storage/app/assets/Events_photo/"
                const fullPaths = imageFilenames.map(filename => (urlPrefix + filename));
                console.log("fullPaths", fullPaths);
                setSelectedImages1(fullPaths);
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

    // Time Picker

    const handleTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setEventStartTime(formattedTime);
        }
        setShowTimePicker(Platform.OS === 'ios');
    };

    const showTimepicker = () => {
        setShowTimePicker(true);
    };

    const handleTimeChange1 = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setEventEndTime(formattedTime);
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
            setEventDate(date);
        }
        setShowDatePicker(Platform.OS === 'ios');
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const formattedDate = `${eventDate.getFullYear()}-${eventDate.getMonth() + 1}-${eventDate.getDate()}`;

    // errors handler

    const [errors, setErrors] = useState({
        eventteams: false,
        eventagenda: false,
    });

    // handle refresh

    const [refreshing, setRefreshing] = useState(false);

    const HandleRefresh = () => {
        setSelectedTeams([]);
        setSelectedMembers([]);
        setEventTitle('');
        setEventDate(new Date());
        setEventStartTime(format(new Date(), 'HH:mm:ss'));
        setEventAgenda('')
        const nullErrors = Object.fromEntries(
            Object.keys(errors).map((key) => [key, null])
        );
        setErrors(nullErrors);
    };

    // Multiple Image selection

    const [selectedImages1, setSelectedImages1] = useState([]);

    // const pickImage1 = async () => {

    //     const options = ['Choose from gallery', 'Take a photo', 'Cancel'];

    //     const choice = await new Promise((resolve) => {
    //         Alert.alert(
    //             'Select Image',
    //             'Choose an option',
    //             options.map((text, index) => ({
    //                 text,
    //                 onPress: () => resolve(index),
    //             })),
    //             { cancelable: true }
    //         );
    //     });

    //     if (choice === 0) {
    //         launchImageLibrary({ mediaType: 'photo', selectionLimit: 10 }, handleImagePickerResult1);
    //     } else if (choice === 1) {
    //         launchCamera({ mediaType: 'photo' }, handleImagePickerResult1);
    //     }
    // };

    const compressImage = async (image) => {
        try {
            const croppedImage = await ImagePicker.openCropper({
                path: image.uri,
                width: 1024,
                height: 1024,
                cropping: true,
                compressImageQuality: 0.8,
                cropperCircleOverlay: false,
                includeBase64: false,
                cropperToolbarTitle: 'Edit Image',
            });
            return croppedImage.path;
        } catch (error) {
            console.error('Error compressing image:', error);
            return null;
        }
    };

    const handleImagePickerResult1 = async (response) => {
        if (!response.didCancel) {
            const images = Array.isArray(response.assets) ? response.assets : [response];
            for (const image of images) {
                const compressedUri = await compressImage(image);
                // setSelectedImages1((prevImages) => [...prevImages, { uri: compressedUri }]);
                setSelectedImages1((prevImages) => [...prevImages, compressedUri]);
            }
        }
    };

    const deleteImage1 = (uri) => {
        setSelectedImages1((prevImages) => {
            const updatedImages = prevImages.filter((image) => image.uri !== uri);
            return updatedImages;
        });
    };

    const renderSelectedImages1 = () => {
        return (
            <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.container}>
                    {selectedImages1.map((value, index) => {
                        return (
                            <View key={index} style={styles.imageContainer}>
                                <TouchableOpacity onPress={() => deleteImage1(value.uri)} style={styles.deleteButton}>
                                    <DeleteIcon width={15} height={15} />
                                </TouchableOpacity>
                                <Image source={{ uri: value }} style={styles.image} />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        );
    };

    // handleSubmit

    const handleSubmit = async () => {
        setLoad(true);

        const newErrors = {};

        if (!eventTitle && eventTitle.trim().length === 0) {
            newErrors.eventTitle = 'This field is required';
        }

        if (!selectedTeams && selectedTeams.trim().length === 0) {
            newErrors.eventteams = 'Select at least one team';
        }

        if (!selectedMembers && selectedMembers.trim().length === 0) {
            newErrors.eventmembers = 'Select at least one Member';
        }

        if (!eventAgenda && eventAgenda.trim().length === 0) {
            newErrors.eventagenda = 'Enter event Agenda';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

            const formData = new FormData();

            formData.append('id', eventID);
            formData.append('event_teamname', selectedTeams);
            formData.append('event_teammember', selectedMembers);
            formData.append('event_title', eventTitle);
            formData.append('event_date', formattedDate);
            formData.append('start_time', eventStartTime);
            formData.append('end_time', eventEndTime);
            formData.append('event_reason', eventAgenda);
            formData.append('added_hr_id', data.userempid);

            if (selectedImages1.length > 0) {
                selectedImages1.forEach((selectedImage, index) => {

                    if (selectedImage && selectedImage.uri && typeof selectedImage.uri === 'string') {
                        const imageUriParts = selectedImage.uri.split('/');
                        const imageName = imageUriParts[imageUriParts.length - 1];
                        formData.append('event_images[]', {
                            uri: selectedImage.uri,
                            name: imageName,
                            type: 'image/jpeg',
                        });
                    } else {

                        console.error('Selected image does not have a valid URI:', selectedImage);
                    }
                });
            } else {
                formData.append('event_images[]', '');
            }


            try {
                const response = await fetch('https://officeinteriorschennai.com/api/public/api/editevent', {
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

                if (responsedata.status === 'success') {
                    setLoad(false);
                    // handleShowAlert();
                    navigation.navigate('Event List');

                }
                else {
                    // handleShowAlert1();
                    console.log("erro1")
                }
            } catch (error) {
                // handleShowAlert1();
                console.log("erro2")
            }
        }
        else {
            // handleShowAlert2();
            console.log("erro3")
        }
    }

    // custom Alert

    const [showAlert, setShowAlert] = useState(false);

    const handleUploadimage = () => {
        setShowAlert(true);
    };

    const handleeCancel = () => {
        setShowAlert(false);
    };

    const handleTakephoto = () => {
        // setShowAlert(false);
        launchCamera({ mediaType: 'photo' }, handleImagePickerResult1);
    };

    const handleFromGallery = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 10 }, handleImagePickerResult1);
        setShowAlert(false);
    };

    return (
        <ScrollView style={styles.maincontainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={HandleRefresh} />}>

            <View style={styles.subContainer}>
                <Text style={styles.subHeading}>Edit Event</Text>

                <TextInput
                    placeholder="Event Title"
                    value={eventTitle}
                    onChangeText={(text) => setEventTitle(text)}
                    style={styles.input}
                />
                {errors.eventTitle ? <Text style={styles.errorText}>{errors.eventTitle}</Text> : null}

                <View >
                    <MultiSelect
                        search
                        inside
                        ref={ref}
                        style={[styles.dropdown, { paddingLeft: 15 }]}
                        data={teamsDropdown}
                        labelField="department_name"
                        valueField="department_id"
                        label="Multi Select"
                        placeholder="Select Teams"
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
                {errors.eventteams ? <Text style={styles.errorText}>{errors.eventteams}</Text> : null}

                <View >
                    <MultiSelect
                        search
                        inside
                        ref={ref}
                        style={[styles.dropdown, { paddingLeft: 15 }]}
                        data={membersDropdown}
                        labelField="first_name"
                        valueField="id"
                        label="Multi Select"
                        placeholder="Select Members"
                        selectedStyle={styles.style1}
                        selectedTextStyle={styles.selectedTextStyle}
                        activeColor='rgba(0, 0, 0, 0.18)'
                        searchPlaceholder="Search"
                        value={selectedMembers}
                        onChange={(member) => {
                            setSelectedMembers(member);
                        }}
                    />

                </View>
                {errors.eventmembers ? <Text style={styles.errorText}>{errors.eventmembers}</Text> : null}


                <Text style={styles.date}>Event Date :</Text>

                <View style={styles.input} >
                    <Text onPress={showDatepicker}>
                        {eventDate.toDateString()} &nbsp;
                        <CalenderIcon width={20} height={20} color={Black} />
                    </Text>
                    {showDatePicker && (
                        <DateTimePicker
                            value={eventDate}
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
                            {eventStartTime} &nbsp;
                            <ClockIcon width={20} height={20} color={Black} />
                        </Text>
                        {showTimePicker && (
                            <DateTimePicker
                                value={parse(eventStartTime, 'HH:mm:ss', new Date())}
                                mode="time"
                                display="default"
                                onChange={handleTimeChange}
                            />
                        )}
                    </View>

                    <Text style={styles.date}>Tentative End Time :</Text>
                    <View style={styles.input} >
                        <Text onPress={showTimepicker1}>
                            {eventEndTime} &nbsp;
                            <ClockIcon width={20} height={20} color={Black} />
                        </Text>
                        {showTimePicker1 && (
                            <DateTimePicker
                                value={parse(eventEndTime, 'HH:mm:ss', new Date())}
                                mode="time"
                                display="default"
                                onChange={handleTimeChange1}
                            />
                        )}
                    </View>
                </View>


                <TextInput
                    placeholder="Enter Event Agenda"
                    value={eventAgenda}
                    onChangeText={(text) => setEventAgenda(text)}
                    style={styles.input}
                    multiline
                    numberOfLines={5}
                />
                {errors.eventagenda ? <Text style={styles.errorText}>{errors.eventagenda}</Text> : null}

                <View >
                    {renderSelectedImages1()}
                    {selectedImages1.length > 4 ? '' :
                        <TouchableOpacity onPress={handleUploadimage} style={styles.Button}>
                            <Text style={{ color: PrimaryPurple, fontWeight: '800' }}>
                                Upload Images
                            </Text>
                        </TouchableOpacity>
                    }
                </View>

                <TouchableOpacity style={styles.savetoGalary} onPress={() => { saveImagesToGallery() }}>
                    <Text style={styles.text}>
                        Save Images
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
                    {
                        load ?
                            <ActivityIndicator size={'small'} color={White} /> :
                            <Text style={styles.text}>
                                Submit
                            </Text>
                    }
                </TouchableOpacity>

                <CustomAlert
                    isVisible={showAlert}
                    message="Select Image"
                    headingmessage="Choose An Option"
                    onCancel={handleeCancel}
                    onCancelText="Cancel"
                    // onTakephoto={() => handleTakephoto()}
                    // onTakephotoText="On Take photo"
                    onFromGallery={() => handleFromGallery()}
                    onFromGalleryText="Open Gallery"
                />

            </View>
        </ScrollView>
    )
}

export default EditEvent;