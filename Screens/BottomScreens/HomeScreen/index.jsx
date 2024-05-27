import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, ImageBackground, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment-timezone';
import Svg, { Path } from 'react-native-svg';
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import HandCursorIcon from "../../../Assets/Icons/HandCursor.svg";
import LaughIcon from "../../../Assets/Emo/laugh.svg";
import DepressedIcon from "../../../Assets/Emo/depressed.svg";
import HeartFeelIcon from "../../../Assets/Emo/HeartFeel.svg";
import SadIcon from "../../../Assets/Emo/sad.svg";
import SmileIcon from "../../../Assets/Emo/smile.svg";
import { useSelector } from "react-redux";
import axios from "axios";


const HomeScreen = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // clock icon

    const ClockIcon = () => {
        return (
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                width={20}
                height={20}
            >
                <Path
                    fill={"#000"}
                    d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
            </Svg>
        );
    };

    // states

    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loggedInTime, setLoggedInTime] = useState('00:00');
    const [loggedOutTime, setLoggedOutTime] = useState('00:00');
    const [totalHours, setTotalHours] = useState('00:00');
    const [userAlreadyLoggedIn, setUserAlreadyLoggedIn] = useState('0');
    const [currentDate, setCurrentDate] = useState('');
    const [currentDay, setCurrentDay] = useState('');
    const [load, SetLoad] = useState(false);

    // current date & current day

    useEffect(() => {
        const updateDateTime = () => {
            const indiaTimeZone = 'Asia/Kolkata';
            const now = moment().tz(indiaTimeZone);
            const formattedDate = now.format('MMMM DD YYYY');
            const formattedDay = now.format('dddd');

            setCurrentDate(formattedDate);
            setCurrentDay(formattedDay);
        };
        updateDateTime();
        const intervalId = setInterval(updateDateTime, 60000);
        return () => clearInterval(intervalId);
    }, []);

    // totalcount --------------

    const [totalcount, setTotalCount] = useState('');

    const CountApi = async () => {

        try {
            const apiUrl = 'https://ocean21.in/api/public/api/adminIndexTodayCount';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data;
            setTotalCount(responseData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    useEffect(() => {
        CountApi();
    }, [])

    // mood Board -------------

    const [mood, setMood] = useState('');
    const [moodLoad, setMoodLoad] = useState('');
    const [moodList, setMoodList] = useState({
        mood_counts: {},
        moodboard: [],
        total_count: 0
    });
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [showFullText, setShowFullText] = useState(false);

    const toggleText = () => setShowFullText(!showFullText);

    const initialItemsToShow = 3;
    const [showAll, setShowAll] = useState(false);


    const handleViewMore = () => {
        setShowAll(true);
    };

    const renderIcon = (iconType) => {
        switch (iconType.toLowerCase()) {

            case 'face_shy':
                return <SmileIcon width={20} height={20} />;

            case 'happy':
                return <LaughIcon width={20} height={20} />;

            case 'happy_positive':
                return <DepressedIcon width={20} height={20} />;

            case 'love_happy':
                return <HeartFeelIcon width={20} height={20} />;

            case 'sad_smiley':
                return <SadIcon width={20} height={20} />;

            default:
                return null;
        }
    };

    const transformMoodboard = (moodboard) => {
        return moodboard.map(item => ({
            name: item.emp_name,
            key: item.id,
            iconType: item.mood_name,
            profileImg: item.profile_img
        }));
    };

    const selectEmoji = (emoji) => {
        setSelectedEmoji(emoji);
    };

    const [selectedOption, setSelectedOption] = useState('All');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const transformedMoodboard = transformMoodboard(moodList.moodboard);
    const filteredData = selectedOption === 'All' ? transformedMoodboard : transformedMoodboard.filter(item => {
        return item.iconType.toLowerCase() === selectedOption.toLowerCase();
    });

    // Get MoodBoardlist

    const MoodBoard = async () => {
        try {
            const apiUrl = 'https://ocean21.in/api/public/api/view_moodboard';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setMoodList(responseData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Post MoodBoardlist

    const MoodboardPost = async () => {
        setMoodLoad(true);
        try {

            const apiUrl = 'https://ocean21.in/api/public/api/addmoodboard';
            const response = await axios.post(apiUrl, {
                mood_name: selectedEmoji,
                created_by: data.userempid
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data;
            setMood(responseData);

            if (responseData.status === "success") {
                Alert.alert("Successfull", responseData.message);
                setMoodLoad(false);
            } else {
                Alert.alert("Failed", responseData.message)
                setMoodLoad(false);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            setMoodLoad(false);
        }
    }

    const MoodCancel = () => {
        setSelectedEmoji(null);
    }

    // Edit Mood 

    const [editIcon, setEditIcon] = useState();

    const EditMood = async () => {

        try {

            const apiUrl = `https://ocean21.in/api/public/api/editview_moodboard/${data.userempid}`;

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;

            setEditIcon(responseData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    useEffect(() => {
        EditMood();
        MoodBoard();
    }, [mood])


    const Update = () => {
        setMood('');
    }

    // 

    const [announcementList, setAnnouncementList] = useState([]);

    const formatDate = (dateString) => {
        const today = new Date();
        const date = new Date(dateString);

        return date.toDateString() === today.toDateString() ? 'Today' : dateString;
    };

    const Annlist = async () => {

        try {
            const apiUrl = 'https://ocean21.in/api/public/api/view_announcement';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setAnnouncementList(responseData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    useEffect(() => {
        Annlist();
    }, [])

    // 

    const [selectedImage, setSelectedImage] = useState([]);

    const handleFromGallery = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, handleImagePickerResult);
    };

    const handleImagePickerResult = async (result) => {
        if (!result.didCancel) {
            const images = result.assets ? result.assets : [result];
            for (const image of images) {
                const response = await fetch(image.uri);
                const blob = await response.blob();
                if (blob.size > 1024 * 1024) {
                    Alert.alert("File size should be less than 1MB");
                } else {
                    const compressedUri = await compressImage(image);
                    // console.log(compressedUri, "compressedUri")
                    setSelectedImage(prevImages => [...prevImages, compressedUri.path]);
                    checkWiFiConnection();
                }
            }
        }
    };

    const compressImage = async (image) => {
        try {
            const croppedImage = await ImagePicker.openCropper({
                path: image.uri,
                width: 1024,
                height: 1024,
                cropping: true,
                compressImageQuality: 0.8,
                cropperCircleOverlay: true,
                includeBase64: true,
                cropperToolbarTitle: 'Edit Image',
            });
            return croppedImage;
        } catch (error) {
            console.error('Error compressing image:', error);
            return null;
        }
    };

    // CustomAlert

    const [showAlert, setShowAlert] = useState(false);

    const handlecheckout = () => {
        setShowAlert(true);
    };

    const handleCancel = () => {
        setShowAlert(false);
    };

    const handleConfirm = () => {
        setShowAlert(false);
        performCheckOut();
    };

    const [allowedipAddress, setAllowedipAddress] = useState([]);
    const [useripaddress, setUseripaddress] = useState('');

    useEffect(() => {

        const fetchIPAddresses = async () => {
            try {

                // Fetch EPKipaddress using Laravel
                const epkResponse = await axios.get('https://ocean21.in/api/public/api/getipAddresses', {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const epkData = epkResponse.data.data;
                setAllowedipAddress(epkData);

                // Fetch Actualipaddress
                const connectionInfo = await NetInfo.fetch();
                const ipAddress = connectionInfo.details.ipAddress;
                setUseripaddress(ipAddress);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchIPAddresses();
    }, []);

    const checkWiFiConnection = async () => {

        SetLoad(true);

        const connectionInfo = await NetInfo.fetch();

        if (connectionInfo.details) {
            const ipAddress = connectionInfo.details.ipAddress;
            setUseripaddress(ipAddress);

            if (allowedipAddress.includes(ipAddress)) {
                if (userAlreadyLoggedIn == 1) {
                    performCheckOut();
                } else {
                    performCheckIn();
                }
            } else {
                // handlecheckout1();
                console.log("Error")
            }
        }

    };

    // checkin function

    const performCheckIn = async () => {

        const formData = new FormData();

        formData.append('checkinuserempid', data.userempid);
        formData.append('checkinuseripaddress', useripaddress);
        formData.append('device', 'Redmi8');
        formData.append('checking_type', 'Mobile');
        formData.append('created_by', data.userempid);

        if (selectedImage.length > 0) {
            selectedImage.map((image, index) => {
                const imageUriParts = image.split('/');
                const imageName = imageUriParts[imageUriParts.length - 1];
                formData.append(`checkin_user_img`, {
                    uri: image,
                    name: imageName,
                    type: 'image/jpeg',
                });
            });
        } else {
            formData.append('checkin_user_img', selectedImage);
        }


        try {
            const response = await fetch('https://ocean21.in/api/public/api/insertappcheckin', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${data.token}`
                },
                body: formData,
            });

            const responsedata = await response.json();

            if (responsedata.status === "success") {
                getInOutWorkingTime();
                Alert.alert('Successfull', responsedata.message)
            } else {
                Alert.alert('Failed', responsedata.message)
            }

        } catch (error) {
            console.error('Error:', error.response.data);
        }
    }

    // checkout function

    const performCheckOut = async () => {

        try {

            const apiUrl = `https://ocean21.in/api/public/api/insertcheckout`;

            const response = await axios.post(apiUrl, {
                checkinuserempid: data.userempid,
                updated_by: data.userempid,
            },
                {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

            const responsedata = await response.data;
            console.log(responsedata, "performancecheckout")

            if (responsedata.status === "success") {
                getInOutWorkingTime();
                Alert.alert('Successfull', responsedata.message)
            } else {
                Alert.alert('Failed', responsedata.message)
            }


        } catch (error) {
            console.error('Error:', error);
        }
    };

    // 

    const getInOutWorkingTime = async () => {

        try {

            const apiUrl = 'https://ocean21.in/api/public/api/employeeIndexinouttime';

            const response = await axios.post(apiUrl, {
                emp_id: data.userempid
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            console.log(response.data, "response")

            if (response && response.data) {
                const updatedata = response.data;
                setLoggedInTime(updatedata.userempcheckintime);
                setLoggedOutTime(updatedata.userempcheckouttime);
                setTotalHours(updatedata.userempchecktotaltime);
                setUserAlreadyLoggedIn(updatedata.statuscurrentdate);
            }

        } catch (error) {
            Alert.alert('Error during login:', error);
        }
    };

    return (

        <ScrollView>

            <View>

                <>
                    <View style={styles.topcontainer}>

                        <View style={styles.card}>

                            <ImageBackground
                                source={require('../../../Assets/Image/Card-bg.jpg')}
                                style={styles.backgroundImage}
                            >

                                <View style={styles.overlay}>

                                    <Text style={styles.datetime}>{currentDay}, {currentDate}</Text>

                                    <TouchableOpacity
                                        onPress={handleFromGallery}
                                    >
                                        <View
                                            style={[styles.button,
                                            { backgroundColor: userAlreadyLoggedIn == 1 ? "#19CDFE" : "#0879F6" }
                                            ]}>

                                            <View style={{ alignItems: 'center' }}>
                                                <HandCursorIcon color={"#fff"} width={60} height={60} />
                                                <Text style={styles.buttontext}>
                                                    {userAlreadyLoggedIn == 1 ? 'Check Out' : 'Check In'}
                                                </Text>
                                            </View>

                                        </View>

                                    </TouchableOpacity>

                                    <View style={styles.clockcontainer}>
                                        <View style={styles.clockCenter}>
                                            <ClockIcon />
                                            <Text style={styles.timetext}>In Time</Text>
                                            <Text style={styles.timenumbertext}>
                                                {loggedInTime}
                                            </Text>
                                        </View>

                                        <View style={styles.clockCenter}>
                                            <ClockIcon />
                                            <Text style={styles.timetext}>Out Time</Text>
                                            <Text style={styles.timenumbertext}>
                                                {loggedOutTime}
                                            </Text>
                                        </View>

                                        <View style={styles.clockCenter}>
                                            <ClockIcon />
                                            <Text style={styles.timetext}>Working Hrs</Text>
                                            <Text style={styles.timenumbertext}>
                                                {totalHours}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                            </ImageBackground>

                        </View>

                    </View>
                </>

                <View style={styles.CountContainer}>

                    <View style={styles.cardContainer}>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={0.9}>
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Total Employee</Text>
                                <Text style={styles.numbers}>{totalcount.total_employee_count}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={0.9}  >
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Late</Text>
                                <Text style={styles.numbers}>{totalcount.days_late}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.cardContainer}>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1} >
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Present</Text>
                                <Text style={styles.numbers}>{totalcount.days_present}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1} >
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Absent</Text>
                                <Text style={styles.numbers}>{totalcount.days_absent}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.cardContainer}>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1}>
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Permission</Text>
                                <Text style={styles.numbers}>{totalcount.days_permission}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1}>
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Half Day</Text>
                                <Text style={styles.numbers}>{totalcount.days_halfday}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.cardContainer}>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1}>
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Leave</Text>
                                <Text style={styles.numbers}>{totalcount.days_leave}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1}>
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>On Duty</Text>
                                <Text style={styles.numbers}>{totalcount.days_onduty}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.cardContainer}>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1}>
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Missed Count</Text>
                                <Text style={styles.numbers}>{totalcount.total_missed_count}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1}>
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Manual Entry</Text>
                                <Text style={styles.numbers}>{totalcount.ManualEntryCount}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.cardContainer}>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1}>
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Total Visitors</Text>
                                <Text style={styles.numbers}>{totalcount.days_permission}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>

                <View style={styles.EmployeeModeBoardContainer}>

                    <View style={styles.EmployeeModeBoard}>

                        <Text style={styles.EmployeeModeBoardTitle}>Employee’s Mood Board</Text>

                        <View style={styles.border}></View>

                        <View style={styles.textview}>
                            <Text style={styles.text}>What's your mood today? </Text>
                        </View>

                        {
                            mood.status === "success" ?
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: '5%', gap: 10 }}>

                                    <Text style={{
                                        fontWeight: '400',
                                        fontSize: 14, color: "#000",
                                    }}>Hey ! You'R Mood Today</Text>

                                    {
                                        editIcon.mood_name === "face_shy" ? (
                                            <SmileIcon />
                                        ) : editIcon.mood_name === "happy" ? (
                                            <LaughIcon />
                                        ) : editIcon.mood_name === "happy_positive" ? (
                                            <DepressedIcon />
                                        ) : editIcon.mood_name === "love_happy" ? (
                                            <HeartFeelIcon />
                                        ) : editIcon.mood_name === "sad_smiley" ? (
                                            <SadIcon />
                                        ) : null
                                    }

                                </View>
                                :
                                <View style={styles.Emo}>

                                    <TouchableOpacity onPress={() => selectEmoji('happy')} style={[styles.emojiButton, selectedEmoji === 'happy' && styles.selectedEmoji]}>
                                        <LaughIcon />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => selectEmoji('happy_positive')} style={[styles.emojiButton, selectedEmoji === 'happy_positive' && styles.selectedEmoji]}>
                                        <DepressedIcon />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => selectEmoji('love_happy')} style={[styles.emojiButton, selectedEmoji === 'love_happy' && styles.selectedEmoji]}>
                                        <HeartFeelIcon />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => selectEmoji('sad_smiley')} style={[styles.emojiButton, selectedEmoji === 'sad_smiley' && styles.selectedEmoji]}>
                                        <SadIcon />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => selectEmoji('face_shy')} style={[styles.emojiButton, selectedEmoji === 'face_shy' && styles.selectedEmoji]}>
                                        <SmileIcon />
                                    </TouchableOpacity>

                                </View>
                        }

                        {
                            mood.status === "success" ?
                                <View style={{ marginTop: '5%' }}>
                                    <TouchableOpacity style={styles.buttonSubmit} onPress={Update}>
                                        <Text style={styles.EmployeeModeBoardbuttonSubmitText}>Update</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={styles.buttonContainer}>

                                    <TouchableOpacity style={styles.buttonSubmit}
                                        onPress={MoodboardPost}
                                    >
                                        {
                                            moodLoad ? <ActivityIndicator size={"small"} color={"#fff"} /> :
                                                <Text style={styles.EmployeeModeBoardbuttonSubmitText}>Submit</Text>

                                        }
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.buttonCancel} onPress={MoodCancel}>
                                        <Text style={styles.EmployeeModeBoardbuttonCancelText}>Cancel</Text>
                                    </TouchableOpacity>

                                </View>
                        }

                    </View>

                </View>

                <View style={styles.EmployeeModeBoardListContainer}>

                    <View style={styles.EmployeeListModeBoard}>

                        <Text style={styles.EmployeeModeBoardTitle}>Employee’s Mood Board</Text>
                        <View style={styles.border}></View>

                        <View style={styles.EmoCheck}>

                            <TouchableOpacity
                                style={[styles.option, selectedOption === 'All' && styles.selectedOption]}
                                onPress={() => handleOptionClick('All')}>
                                <Text style={styles.MoodBoardText}>All ({moodList.total_count})</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.option, selectedOption === 'face_shy' && styles.selectedOption, { flexDirection: 'row', alignItems: 'center', gap: 5 }]}
                                onPress={() => handleOptionClick('face_shy')}
                            >
                                <SmileIcon width={20} height={20} />
                                <Text>({moodList.mood_counts.face_shy})</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.option, selectedOption === 'happy' && styles.selectedOption, { flexDirection: 'row', alignItems: 'center', gap: 5 }]}
                                onPress={() => handleOptionClick('happy')}
                            >
                                <LaughIcon width={20} height={20} />
                                <Text>({moodList.mood_counts.happy})</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.option, selectedOption === 'happy_positive' && styles.selectedOption, { flexDirection: 'row', alignItems: 'center', gap: 5 }]}
                                onPress={() => handleOptionClick('happy_positive')}
                            >
                                <DepressedIcon width={20} height={20} />
                                <Text>({moodList.mood_counts.happy_positive})</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.option, selectedOption === 'love_happy' && styles.selectedOption, { flexDirection: 'row', alignItems: 'center', gap: 5 }]}
                                onPress={() => handleOptionClick('love_happy')}
                            >
                                <HeartFeelIcon width={20} height={20} />
                                <Text>({moodList.mood_counts.love_happy})</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.option, selectedOption === 'sad_smiley' && styles.selectedOption, { flexDirection: 'row', alignItems: 'center', gap: 5 }]}
                                onPress={() => handleOptionClick('sad_smiley')}
                            >
                                <SadIcon width={20} height={20} />
                                <Text>({moodList.mood_counts.sad_smiley})</Text>
                            </TouchableOpacity>


                        </View>

                        <View>
                            {filteredData.slice(0, showAll ? transformedMoodboard.length : initialItemsToShow).map(item => (
                                <View style={styles.EmoCheckList} key={item.key}>
                                    <Image source={{ uri: `https://ocean21.in/api/storage/app/${item.profileImg}` }} style={styles.profileImage} />
                                    <Text style={styles.MoodBoardText}>{item.name}</Text>
                                    {renderIcon(item.iconType)}
                                </View>
                            ))}
                            {!showAll && (
                                <View style={styles.viewMoreContainer}>
                                    <TouchableOpacity onPress={handleViewMore}>
                                        <Text style={styles.viewMore}>View More</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>

                    </View>

                </View>

                <View style={styles.AnnounceMentContainer}>

                    <View style={styles.AnnounceMent}>

                        <View style={styles.tittle}>

                            <Text style={styles.tittleText}>Announcements</Text>

                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <TouchableOpacity style={styles.addbutton}
                                    onPress={() => navigation.navigate('Announcement')}
                                >
                                    <Text style={styles.addbuttonText}>
                                        View
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.addbutton}>
                                    <Text style={styles.addbuttonText}>
                                        + Add
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ paddingTop: "1%" }}>

                            {
                                announcementList.map((item, index) => (
                                    <View key={index} style={styles.AnnouncementData}>

                                        <View style={styles.AnnouncementDataHeadr}>
                                            <Text style={styles.AnnouncementDataHeadrTitle}>{item.a_title}</Text>
                                            <Text style={styles.AnnouncementDataHeadrWhen}>{formatDate(item.a_validdate)}</Text>
                                        </View>

                                        <View style={{ padding: '5%' }}>
                                            <Text style={{ fontWeight: '400', lineHeight: 18.62 }}>{item.a_description}</Text>
                                        </View>

                                    </View>
                                ))
                            }

                        </View>

                    </View>

                </View>

            </View>

        </ScrollView >

    )
}

export default HomeScreen;