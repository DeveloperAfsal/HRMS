import React, { useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from 'react-native-svg';
import AlertIcon from "../../../assets/EPK CRM Icons/Alert.svg";
import HandCursorIcon from "../../../assets/EPK CRM Icons/HandCursor.svg";
import styles from "./style";
import { useSelector } from "react-redux";
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment-timezone';
import axios from "axios";
import CustomAlert from "../../../Components/CustomAlert";
import { PrimaryGreen, PrimaryRed, White } from "../../../assets/Colors";

const HomeScreen = ({ navigation }) => {

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

  // 

  const [showAlert1, setShowAlert1] = useState(false);

  const handlecheckout1 = () => {
    setShowAlert1(true);
    SetLoad(false);
  };

  const handleOk = () => {
    setShowAlert1(false);
  };


  //navigations

  const handleCardPressTotalEmp = () => {
    navigation.navigate('Daily Attendance');
  }

  const handleCardPress = (value) => {
    navigation.navigate('Today Dashboard', { value: value });
  }

  // clock icon

  const ClockIcon = () => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        width={25}
        height={25}
      >
        <Path
          fill={"#000"}
          d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
      </Svg>
    );
  };

  // data from redux store 

  const { data } = useSelector((state) => state.login);

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

  // wifi connection ip address

  const [allowedipAddress, setAllowedipAddress] = useState([]);
  const [useripaddress, setUseripaddress] = useState('');

  useEffect(() => {

    const fetchIPAddresses = async () => {
      try {

        // Fetch EPKipaddress using Laravel
        const epkResponse = await axios.get('https://officeinteriorschennai.com/api/public/api/epkipaddress');
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

  // Api states

  const [dashboardMonthly, setDashboardMonthly] = useState('')
  const [conditionDisplay, setConditionDisplay] = useState('')
  const [conditionDisplayAdmin, setConditionDisplayAdmin] = useState('')
  const [dashboardData, setDashboardData] = useState([]);

  // To Set The Dashboard Data in laravel api = []

  useEffect(() => {
    const fetchMonthlyDashboardData = async () => {
      try {
        const dashboardMonthly = await axios.get(
          `https://officeinteriorschennai.com/api/public/api/viewdashboardnotificationempid/${data.userempid}`,
          {
            headers: {
              Authorization: `Bearer ${data.token}`
            }
          }
        );
        setDashboardMonthly(dashboardMonthly.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchMonthlyDashboardData();
  }, []);

  // Fetch data for userrolenavigation laravel api = ["1","2","4","7"]

  useEffect(() => {
    const fetchUserRoleNavigation = async () => {
      try {
        const conditionDisplay = await axios.get(
          `https://officeinteriorschennai.com/api/public/api/userrolenavigation`,
          {
            headers: {
              Authorization: `Bearer ${data.token}`
            }
          }
        );
        setConditionDisplay(conditionDisplay.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserRoleNavigation();
  }, []);

  // Fetch data for dashboardcountview laravel api = ["1","7"]

  useEffect(() => {
    const fetchDashboardCountView = async () => {
      try {
        const conditionDisplayAdmin = await axios.get(
          `https://officeinteriorschennai.com/api/public/api/dashboardcountview`,
          {
            headers: {
              Authorization: `Bearer ${data.token}`
            }
          }
        );
        setConditionDisplayAdmin(conditionDisplayAdmin.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchDashboardCountView();
  }, []);

  // Fetch data for adminindextodaycount absent present laraval Api

  useEffect(() => {
    const fetchAdminIndexTodayCount = async () => {
      try {
        const dashboardData = await axios.get(
          'https://officeinteriorschennai.com/api/public/api/adminindextodaycount',
          {
            headers: {
              Authorization: `Bearer ${data.token}`
            }
          }
        );
        setDashboardData(dashboardData.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAdminIndexTodayCount();
  }, []);


  // checking the connection of ipaddress

  const checkWiFiConnection = async () => {
    SetLoad(true);
    const connectionInfo = await NetInfo.fetch();

    if (connectionInfo.details) {
      const ipAddress = connectionInfo.details.ipAddress;
      setUseripaddress(ipAddress);

      if (allowedipAddress.includes(ipAddress)) {
        if (userAlreadyLoggedIn == 1) {
          handlecheckout();
        } else {
          performCheckIn();
        }
      } else {
        handlecheckout1();
        // handleAlert();
      }
    }
  };

  // checkin function

  const performCheckIn = async () => {
    try {
      const apiUrl = 'https://officeinteriorschennai.com/api/public/api/checkin_time';

      const response = await axios.post(
        apiUrl,
        {
          checkinuserempid: parseInt(data.userempid),
          checkinuserepkempid: data.userepkempid,
          checkinuseripaddress: useripaddress,
          checkinuserrole: parseInt(data.userrole),
          checkinuserdepartment: parseInt(data.userdepartment),
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.status === 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = response.data;
      console.log(responseData, "in");
      getInOutWorkingTime();
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  }

  // checkout function

  const performCheckOut = async () => {
    try {

      const apiUrl = `https://officeinteriorschennai.com/api/public/api/checkout_time`;

      const response = await axios.post(apiUrl, {
        checkoutuserempid: parseInt(data.userempid),
        checkoutuserepkempid: data.userepkempid,
      },
        {
          headers: {
            Authorization: `Bearer ${data.token}`
          }
        });

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responsedata = await response.data;
      console.log(responsedata, "performancecheckout")
      getInOutWorkingTime();

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getInOutWorkingTime();
  }, []);

  // updating the checkin checkout time

  const getInOutWorkingTime = async () => {
    try {
      setLoading(true);

      const apiUrl = 'https://officeinteriorschennai.com/api/public/api/index_details';

      const response = await axios.post(apiUrl, {
        indexloginepkempid: data.userepkempid,
        indexloginempid: parseInt(data.userempid),
      }, {
        headers: {
          Authorization: `Bearer ${data.token}`
        }
      });

      if (response && response.data) {
        const updatedata = response.data;
        setLoggedInTime(updatedata.userempcheckintime);
        setLoggedOutTime(updatedata.userempcheckouttime);
        setTotalHours(updatedata.userempchecktotaltime);
        setUserAlreadyLoggedIn(updatedata.usercheckincurrentdate);
      }
      SetLoad(false);
      setLoading(false);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getInOutWorkingTime} />}>

      <View>

        {conditionDisplayAdmin.includes(data.userrole) ? null : (

          <>
            <View style={styles.topcontainer}>

              <View style={styles.card}>

                <ImageBackground
                  source={require('../../../assets/Card-bg.jpg')}
                  style={styles.backgroundImage}
                >

                  <View style={styles.overlay}>

                    <Text style={styles.datetime}>{currentDay}, {currentDate}</Text>

                    <TouchableOpacity onPress={checkWiFiConnection}>

                      <View
                        style={[styles.button,
                        { backgroundColor: userAlreadyLoggedIn == 1 ? PrimaryRed : PrimaryGreen }
                        ]}>

                        {
                          load ?
                            <ActivityIndicator size={"large"} color={White} /> :

                            <View style={{ alignItems: 'center' }}>
                              <HandCursorIcon color={White} />
                              <Text style={styles.buttontext}>
                                {userAlreadyLoggedIn == 1 ? 'Check Out' : 'Check In'}
                              </Text>
                            </View>
                        }



                      </View>

                    </TouchableOpacity>

                    <CustomAlert
                      isVisible={showAlert}
                      headingmessage='Confirmation'
                      message="Are you sure you want to check out?"
                      onCancelText="Cancel"
                      onConfirmText="Confirm"
                      onCancel={handleCancel}
                      onConfirm={handleConfirm}
                    />

                    <CustomAlert
                      isVisible={showAlert1}
                      headingmessage='Oops..'
                      message="Connect With Your Office Wifi And Try Again"
                      onConfirmText="Ok"
                      onConfirm={handleOk}
                    />

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
                        <Text style={styles.timetext}>Working Hours</Text>
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

        )}



        {conditionDisplay.includes(data.userrole) ? (

          <View style={styles.CountContainer}>

            <View style={styles.cardContainer}>

              <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={0.9} onPress={() => handleCardPressTotalEmp()}>
                <View style={styles.counterCards}>
                  <Text style={styles.fontStyle}>Total Employee</Text>
                  <Text style={styles.numbers}>{dashboardData.total_employee_count}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={0.9} onPress={() => handleCardPress('LA')} >
                <View style={styles.counterCards}>
                  <Text style={styles.fontStyle}>Late</Text>
                  <Text style={styles.numbers}>{dashboardData.days_late}</Text>
                </View>
              </TouchableOpacity>

            </View>

            <View style={styles.cardContainer}>

              <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1} onPress={() => handleCardPress('P')}>
                <View style={[styles.counterCards, { backgroundColor: PrimaryGreen }]}>
                  <Text style={[styles.fontStyle, { color: White }]}>Present</Text>
                  <Text style={[styles.numbers, { color: White }]}>{dashboardData.days_present}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1} onPress={() => handleCardPress('A')}>
                <View style={[styles.counterCards, { backgroundColor: PrimaryRed }]}>
                  <Text style={[styles.fontStyle, { color: White }]}>Absent</Text>
                  <Text style={[styles.numbers, { color: White }]}>{dashboardData.days_absent}</Text>
                </View>
              </TouchableOpacity>

            </View>

            <View style={styles.cardContainer}>

              <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1} onPress={() => handleCardPress('PR')}>
                <View style={styles.counterCards}>
                  <Text style={styles.fontStyle}>Permission</Text>
                  <Text style={styles.numbers}>{dashboardData.days_permission}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.CountContainerWidth} activeOpacity={1} onPress={() => handleCardPress('HL')}>
                <View style={styles.counterCards}>
                  <Text style={styles.fontStyle}>Half Day</Text>
                  <Text style={styles.numbers}>{dashboardData.days_halfday}</Text>
                </View>
              </TouchableOpacity>

            </View>
          </View>

        ) : null}



        {dashboardMonthly && dashboardMonthly[0] ?

          <View style={styles.dashboardMonthlyContainer}>

            <View style={styles.warningMessage}>

              <View style={styles.dashboardMonthlyAlert}>
                <AlertIcon color={PrimaryRed} />
              </View>

              <View style={styles.dashboardMonthlyContent}>

                <Text style={styles.firstname}>Hi, {dashboardMonthly[0].first_name}</Text>

                <Text>You Have used <Text style={{ fontWeight: 600, lineHeight: 20 }} > {dashboardMonthly[0].late_count} Late, {dashboardMonthly[0].permission_count} Permission, {dashboardMonthly[0].absent_count} Day Leave & {dashboardMonthly[0].halfday_count} Half Day</Text> for this Month
                </Text>

                <TouchableOpacity onPress={() => { navigation.navigate('Monthly Attendance') }} style={{ marginTop: 6 }}>
                  <View style={styles.viewAttendance}>
                    <Text style={styles.viewAttendanceText}>View Attendance</Text>
                  </View>
                </TouchableOpacity>

              </View>
            </View>
          </View>

          : null}

      </View>

    </ScrollView >
  )
}

export default HomeScreen;