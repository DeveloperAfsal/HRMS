import React, { useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment-timezone';
import Svg, { Path } from 'react-native-svg';
import HandCursorIcon from "../../../Assets/Icons/HandCursor.svg";
import LaughIcon from "../../../Assets/Emo/laugh.svg";
import DepressedIcon from "../../../Assets/Emo/depressed.svg";
import HeartFeelIcon from "../../../Assets/Emo/HeartFeel.svg";
import SadIcon from "../../../Assets/Emo/sad.svg";
import SmileIcon from "../../../Assets/Emo/smile.svg";

const HomeScreen = ({ navigation }) => {

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

    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [showFullText, setShowFullText] = useState(false);
    const toggleText = () => setShowFullText(!showFullText);

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

    // 

    const selectEmoji = (emoji) => {
        setSelectedEmoji(emoji);
    };

    // 

    const initialItemsToShow = 3;
    const [showAll, setShowAll] = useState(false);
    const data = [
        { name: 'Afsal', key: '1', iconType: 'smile' },
        { name: 'Karthick', key: '2', iconType: 'laugh' },
        { name: 'Sathya', key: '3', iconType: 'heart' },
        { name: 'Afsal', key: '4', iconType: 'smile' },
        { name: 'Karthick', key: '5', iconType: 'laugh' },
        { name: 'Sathya', key: '6', iconType: 'heart' }
    ];

    const handleViewMore = () => {
        setShowAll(true);
    };

    const renderIcon = (iconType) => {
        switch (iconType.toLowerCase()) {
            case 'smile':
                return <SmileIcon width={20} height={20} />;
            case 'laugh':
                return <LaughIcon width={20} height={20} />;
            case 'heart':
                return <HeartFeelIcon width={20} height={20} />;
            case 'sad':
                return <SadIcon width={20} height={20} />;
            case 'depressed':
                return <DepressedIcon width={20} height={20} />;
            default:
                return null;
        }
    };

    // 

    const [selectedOption, setSelectedOption] = useState('All');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    // 

    const filteredData = selectedOption === 'All' ? data : data.filter(item => {
        console.log("selectedOption:", selectedOption);
        console.log("item.iconType:", item.iconType);
        return item.iconType.toLowerCase() === selectedOption.toLowerCase();
    });

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

                                    <TouchableOpacity>

                                        <View
                                            style={[styles.button,
                                            { backgroundColor: "#19CDFE" }
                                            ]}>

                                            <View style={{ alignItems: 'center' }}>
                                                <HandCursorIcon color={"#fff"} width={60} height={60} />
                                                <Text style={styles.buttontext}>
                                                    Check In
                                                </Text>
                                            </View>

                                        </View>

                                    </TouchableOpacity>

                                    <View style={styles.clockcontainer}>
                                        <View style={styles.clockCenter}>
                                            <ClockIcon />
                                            <Text style={styles.timetext}>In Time</Text>
                                            <Text style={styles.timenumbertext}>
                                                {/* {loggedInTime} */}
                                                12:00
                                            </Text>
                                        </View>

                                        <View style={styles.clockCenter}>
                                            <ClockIcon />
                                            <Text style={styles.timetext}>Out Time</Text>
                                            <Text style={styles.timenumbertext}>
                                                {/* {loggedOutTime} */}
                                                12:00
                                            </Text>
                                        </View>

                                        <View style={styles.clockCenter}>
                                            <ClockIcon />
                                            <Text style={styles.timetext}>Working Hrs</Text>
                                            <Text style={styles.timenumbertext}>
                                                {/* {totalHours} */}
                                                12:00
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
                                <Text style={styles.numbers}>1</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={0.9}  >
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Late</Text>
                                <Text style={styles.numbers}>2</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.cardContainer}>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1} >
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Present</Text>
                                <Text style={styles.numbers}>3</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1} >
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Absent</Text>
                                <Text style={styles.numbers}>4</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.cardContainer}>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1}>
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Permission</Text>
                                <Text style={styles.numbers}>5</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1}>
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Half Day</Text>
                                <Text style={styles.numbers}>6</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.cardContainer}>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1}>
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Leave</Text>
                                <Text style={styles.numbers}>7</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1}>
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>On Duty</Text>
                                <Text style={styles.numbers}>8</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.cardContainer}>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1}>
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Missed Count</Text>
                                <Text style={styles.numbers}>9</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1}>
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Manual Entry</Text>
                                <Text style={styles.numbers}>10</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.cardContainer}>

                        <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1}>
                            <View style={styles.counterCards}>
                                <Text style={styles.fontStyle}>Total Visitors</Text>
                                <Text style={styles.numbers}>11</Text>
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

                        <View style={styles.Emo}>

                            <TouchableOpacity onPress={() => selectEmoji('laugh')} style={[styles.emojiButton, selectedEmoji === 'laugh' && styles.selectedEmoji]}>
                                <LaughIcon />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectEmoji('depressed')} style={[styles.emojiButton, selectedEmoji === 'depressed' && styles.selectedEmoji]}>
                                <DepressedIcon />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectEmoji('heart')} style={[styles.emojiButton, selectedEmoji === 'heart' && styles.selectedEmoji]}>
                                <HeartFeelIcon />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectEmoji('sad')} style={[styles.emojiButton, selectedEmoji === 'sad' && styles.selectedEmoji]}>
                                <SadIcon />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectEmoji('smile')} style={[styles.emojiButton, selectedEmoji === 'smile' && styles.selectedEmoji]}>
                                <SmileIcon />
                            </TouchableOpacity>

                        </View>

                        <View style={styles.buttonContainer}>

                            <TouchableOpacity style={styles.buttonSubmit}>
                                <Text style={styles.EmployeeModeBoardbuttonSubmitText}>Submit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonCancel}>
                                <Text style={styles.EmployeeModeBoardbuttonCancelText}>Cancel</Text>
                            </TouchableOpacity>

                        </View>

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
                                <Text style={styles.MoodBoardText}>All</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.option, selectedOption === 'Laugh' && styles.selectedOption]}
                                onPress={() => handleOptionClick('Laugh')}
                            >
                                <LaughIcon width={20} height={20} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.option, selectedOption === 'Depressed' && styles.selectedOption]}
                                onPress={() => handleOptionClick('Depressed')}
                            >
                                <DepressedIcon width={20} height={20} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.option, selectedOption === 'Heart' && styles.selectedOption]}
                                onPress={() => handleOptionClick('Heart')}
                            >
                                <HeartFeelIcon width={20} height={20} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.option, selectedOption === 'Sad' && styles.selectedOption]}
                                onPress={() => handleOptionClick('Sad')}
                            >
                                <SadIcon width={20} height={20} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.option, selectedOption === 'Smile' && styles.selectedOption]}
                                onPress={() => handleOptionClick('Smile')}
                            >
                                <SmileIcon width={20} height={20} />
                            </TouchableOpacity>
                        </View>

                        <View>
                            {filteredData.slice(0, showAll ? data.length : initialItemsToShow).map(item => (
                                <View style={styles.EmoCheckList} key={item.key}>
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

                            <TouchableOpacity style={styles.addbutton}>
                                <Text style={styles.addbuttonText}>
                                    + Add
                                </Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{ paddingTop: "5%" }}>

                            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#E1F3F8', width: "85%", paddingTop: '5%', borderRadius: 7 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "85%" }}>
                                    <Text style={{ color: '#000000', fontWeight: '700', fontSize: 14, lineHeight: 18.62 }}>Ramzan</Text>
                                    <Text style={{ fontWeight: '400', fontSize: 15, lineHeight: 19.95 }}>Today</Text>
                                </View>

                                <View style={{ padding: '5%' }}>
                                    <Text style={{ fontWeight: '400', lineHeight: 18.62 }}> {showFullText ?
                                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit sint placeat dolores, tempora non ut eum modi in, vitae, veritatis fuga! Vel modi voluptas, exercitationem optio veniam doloribus sequi harum." :
                                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit sint placeat dolores..."
                                    }</Text>
                                    {!showFullText &&
                                        <TouchableOpacity onPress={toggleText}>
                                            <Text style={{ color: '#0A60F1', paddingTop: "1%" }}>See more</Text>
                                        </TouchableOpacity>
                                    }
                                </View>

                            </View>

                        </View>

                        <View style={{ paddingTop: "5%" }}>

                            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFDEB', width: "85%", paddingTop: '5%', borderRadius: 7 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "85%" }}>
                                    <Text style={{ color: '#000000', fontWeight: '700', fontSize: 14, lineHeight: 18.62 }}>Holi</Text>
                                    <Text style={{ fontWeight: '400', fontSize: 15, lineHeight: 19.95 }}>Today</Text>
                                </View>

                                <View style={{ padding: '5%' }}>
                                    <Text style={{ fontWeight: '400', lineHeight: 18.62 }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit sint placeat dolores, tempora non ut eum modi in, vitae, veritatis fuga! Vel modi voluptas, exercitationem optio veniam doloribus sequi harum.</Text>
                                </View>

                            </View>

                        </View>

                        <View style={{ paddingTop: "5%" }}>

                            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F6E5', width: "85%", paddingTop: '5%', borderRadius: 7 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "85%" }}>
                                    <Text style={{ color: '#000000', fontWeight: '700', fontSize: 14, lineHeight: 18.62 }}>Tamil New Year</Text>
                                    <Text style={{ fontWeight: '400', fontSize: 15, lineHeight: 19.95 }}>Today</Text>
                                </View>

                                <View style={{ padding: '5%' }}>
                                    <Text style={{ fontWeight: '400', lineHeight: 18.62 }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit sint placeat dolores, tempora non ut eum modi in, vitae, veritatis fuga! Vel modi voluptas, exercitationem optio veniam doloribus sequi harum.</Text>
                                </View>

                            </View>

                        </View>

                    </View>

                </View>

            </View>

        </ScrollView >
    )
}

export default HomeScreen