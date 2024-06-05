import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import ProfileIcon from "../../../../../Assets/Icons/Profile.svg";
import PhoneIcon from "../../../../../Assets/Icons/Phone.svg";
import MailIcon from "../../../../../Assets/Icons/MailorMessage.svg";
import TickIcon from '../../../../../Assets/Icons/Tick.svg';
import SearchIcon from '../../../../../Assets/Icons/Search.svg';
import moment from 'moment-timezone';
import styles from "./style";
import { useSelector } from "react-redux";
import axios from "axios";


const VisitorLog = ({ navigation }) => {

    // data from redux

    const { data } = useSelector((state) => state.login);

    // states

    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [EditLoad, setEditLoad] = useState(false);

    const filteredData = employeeData.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase()));
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://ocean21.in/api/public/api/visitor_list`, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            const employeeData = response.data.data;

            setEmployeeData(employeeData);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    // 

    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const indiaTimeZone = 'Asia/Kolkata';
            const now = moment().tz(indiaTimeZone);
            const formattedTime = now.format('hh:mm:ss');

            setCurrentTime(formattedTime);
        };
        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);
        return () => clearInterval(intervalId);
    }, []);

    // 

    const Checkout = async (employee) => {

        // setEditLoad(true);

        try {

            const apiUrl = 'https://ocean21.in/api/public/api/visitor_checkout';

            const response = await axios.put(apiUrl, {
                id: employee.id,
                out_time: currentTime,
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            const resdata = response.data;
            console.log(resdata, "resdata")

            if (resdata.status === "success") {
                setEditLoad(false);
                Alert.alert("successfull", resdata.message);
                fetchData();
            } else {
                setEditLoad(false);
                Alert.alert("Failed To Update", resdata.message);
                console.error('Failed To Update:');
            }

        } catch (error) {
            setEditLoad(false);
            Alert.alert("Error during submit", resdata.message);
            console.error('Error during submit:', error);
        }

    }

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />}>

            <View style={styles.filterInput}>

                <TextInput
                    style={styles.search}
                    placeholder="Search Employee"
                    value={filterText}
                    onChangeText={text => {
                        setFilterText(text);
                    }}
                />

                <View style={styles.searchIcon}>
                    <SearchIcon color={"#1AD0FF"} />
                </View>

            </View>

            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color={"#0A60F1"} style={styles.activityIndicator} />
                ) : (
                    <>
                        {
                            filteredData.map((employee, index) =>

                            (
                                <View key={index} style={[styles.card, index === filteredData.length - 1 && styles.cardBottom]}

                                >
                                    <View key={index} >
                                        <View style={styles.cardtop}>
                                            <View>
                                                {employee.profile_img ? (
                                                    <Image
                                                        source={{ uri: `https://ocean21.in/api/storage/app/${employee.profile_img}` }}
                                                        style={styles.imageStyle}

                                                    />
                                                ) : (
                                                    <View style={styles.iconStyle}>
                                                        <ProfileIcon width={22} height={22} color={'#0A60F1'} />
                                                    </View>
                                                )}


                                                <View style={styles.NameContainer}>
                                                    <Text style={styles.name}>{employee.visitor_name}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={styles.phoneEmail}>
                                            <View style={styles.gap} >
                                                <Text style={styles.fontsize}>Phone Number :</Text>
                                                <Text style={styles.fontsize}>Email ID : </Text>
                                            </View>
                                            <View style={styles.gap} >
                                                <Text style={styles.fontsize}>   {employee.mobile_number}</Text>
                                                <Text style={styles.fontsize}>   {employee.email_id}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.Buttonview}>
                                            <TouchableOpacity style={employee.out_time === null ? styles.Checkout : styles.CheckoutActive}
                                                onPress={() => Checkout(employee)}
                                            >
                                                {
                                                    EditLoad ?
                                                        <ActivityIndicator size={"small"} color={"#fff"} /> :
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                                            {employee.out_time === null ? null : <TickIcon width={14} height={14} />}
                                                            <Text style={styles.CheckoutText}>Check out</Text>
                                                        </View>
                                                }
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.ViewDetails}
                                                onPress={() => navigation.navigate('ViewDeatails', { Id: employee })}
                                            >
                                                <Text style={styles.DetailsText}>View Details</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))
                        }

                    </>
                )}
            </View>

        </ScrollView>
    )
}

export default VisitorLog;