import React, { useEffect, useState } from "react";
import styles from "./style";
import { ScrollView, Text, View, TextInput, Platform, TouchableOpacity, RefreshControl, Alert } from "react-native";
import CalenderIcon from "../../../../../assets/EPK CRM Icons/Calendar.svg";
import ClockIcon from "../../../../../assets/EPK CRM Icons/Clock.svg";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import { useSelector } from "react-redux";
import axios from "axios";
import { Black, White } from "../../../../../assets/Colors";
import { ActivityIndicator } from "react-native";

const AttendanceRequest = ({ navigation }) => {

  // data from redux store

  const { data } = useSelector((state) => state.login)

  // states.....

  const [requestType, setRequestType] = useState('');
  const [location, setLocation] = useState('');
  const [requestDate, setRequestDate] = useState(new Date());
  const [fromTime, setFromTime] = useState('00:00:00');
  const [toTime, setToTime] = useState('00:00:00');
  const [Reason, setReason] = useState('');
  const [showFromTimePicker, setShowFromTimePicker] = useState(false)
  const [showToTimePicker, setShowToTimePicker] = useState(false);
  const [requestTypeArray, setRequestTypeArray] = useState([]);
  const [locationArray, setLocationArray] = useState([]);
  const [errors, setErrors] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [load, setLoad] = useState(false);

  // Refresh

  const HandleRefresh = () => {
    setRequestDate(new Date())
    setFromTime('00:00:00');
    setToTime('00:00:00');
    setReason('');
    setLocation('');
    setRequestType('');
    setErrors({})
  };

  // Request date picker

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setRequestDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  // From Time:

  const handleFromTimeChange = (event, time) => {
    if (time !== undefined) {
      const formattedTime = format(time, 'HH:mm:ss');
      setFromTime(formattedTime);
    }
    setShowFromTimePicker(Platform.OS === 'ios');
  };

  const showTimepickerFrom = () => {
    setShowFromTimePicker(true);
  };

  // To Time:

  const handleToTimeChange = (event, time) => {
    if (time !== undefined) {
      const formattedTime = format(time, 'HH:mm:ss');
      setToTime(formattedTime);
    }
    setShowToTimePicker(Platform.OS === 'ios');
  };

  const showTimepickerTo = () => {
    setShowToTimePicker(true);
  };

  // handler

  const HandlesetrequestType = (itemValue) => {
    if (itemValue == requestTypeArray[0]) {
      setRequestType('');
    }
    else {
      setRequestType(itemValue)
    }
  }

  const HandlesetLocation = (itemValue) => {
    if (itemValue == locationArray[0]) {
      setLocation('');
    }
    else {
      setLocation(itemValue)
    }
  }

  // Formatted date

  const formattedDate = `${requestDate.getFullYear()}-${requestDate.getMonth() + 1}-${requestDate.getDate()}`;

  //API call for category type

  useEffect(() => {
    const apiUrl = 'https://officeinteriorschennai.com/api/public/api/attendancerequesttype';
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${data.token}`
          }
        });
        const responseData = response.data.data;
        setRequestTypeArray([{ "id": "0", "request_type_name": "Select Category Type" }, ...responseData]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  //API call for Location

  useEffect(() => {
    const apiUrl = 'https://officeinteriorschennai.com/api/public/api/attendancerequestlocation';
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${data.token}`
          }
        });
        const responseData = response.data.data;
        setLocationArray([{ "id": "0", "request_location": "Select Location" }, ...responseData]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  // handle Submit

  const handleSubmit = async () => {

    setLoad(true);

    const newErrors = {};

    const ValidrequestType = !requestType && requestType.trim().length === 0;
    const Validlocation = !location && location.trim().length === 0;
    const ValidReason = !Reason && Reason.trim().length === 0;


    if (ValidrequestType) {
      newErrors.requestType = 'This field is required';
    }

    if (Validlocation) {
      newErrors.location = 'This field is required';
    }

    if (ValidReason) {
      newErrors.Reason = 'This field is required';
    }

    if (Object.keys(newErrors).length === 0) {

      const formData = new FormData();
      formData.append('emp_id', data.userempid);
      formData.append('emp_name', data.username);
      formData.append('emp_email', data.useremail);
      formData.append('request_type', requestType);
      formData.append('request_location', location);
      formData.append('request_date', formattedDate);
      formData.append('request_fromtime', fromTime);
      formData.append('request_totime', toTime);
      formData.append('request_reason', Reason);

      try {
        const response = await fetch('https://officeinteriorschennai.com/api/public/api/attendance_request', {
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

          navigation.navigate('Attendance Request List');

          setRequestDate(new Date())
          setFromTime('00:00:00');
          setToTime('00:00:00');
          setReason('');
          setLocation('');
          setRequestType('');
          setErrors({})
        }
        else {
          // handleShowAlert1();
          console.log("error");
          setLoad(false);
          Alert.alert("Failed to add Request");
        }
      } catch (error) {
        // handleShowAlert1()
        console.log(error);
        setLoad(false);
        Alert.alert("Failed to add Request");
      }
    } else {
      setErrors(newErrors);
      // handleShowAlert2()
      console.log("err");
      setLoad(false);
      Alert.alert("Please fill all the details");
    }
  }

  return (

    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={HandleRefresh} />}>

      <View style={styles.subContainer} >

        <Text style={styles.subHeading}>Attendance Request</Text>

        <View style={[styles.input, { paddingLeft: 0 }]}>
          <Picker
            selectedValue={requestType}
            onValueChange={(itemValue) => {
              HandlesetrequestType(itemValue);
            }}
          >

            {requestTypeArray.map((option, index) => (
              <Picker.Item key={index} label={option.request_type_name} value={option.id} />
            ))}

          </Picker>
        </View>
        {errors.requestType && <Text style={styles.errorText}>{errors.requestType}</Text>}


        <View style={[styles.input, { paddingLeft: 0 }]}>

          <Picker
            selectedValue={location}
            onValueChange={(itemValue) => {
              HandlesetLocation(itemValue);
            }}
          >

            {locationArray.map((option, index) => (
              <Picker.Item key={index} label={option.request_location} value={option.id} />
            ))}
          </Picker>

        </View>
        {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

        <Text style={styles.subtop}>Request Date :</Text>

        <View style={styles.input} >
          <Text onPress={showDatepicker}>
            {requestDate.toDateString()} &nbsp;
            <CalenderIcon width={20} height={20} color={Black} />
          </Text>
          {showDatePicker && (
            <DateTimePicker
              value={requestDate}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}

        </View>
        {errors.requestDate && <Text style={styles.errorText}>{errors.requestDate}</Text>}


        <View>

          <Text style={styles.subtop}>From Time :</Text>

          <View style={styles.input} >
            <Text onPress={showTimepickerFrom}>
              {fromTime} &nbsp;
              <ClockIcon width={20} height={20} color={Black} />
            </Text>
            {showFromTimePicker && (
              <DateTimePicker
                value={parse(fromTime, 'HH:mm:ss', new Date())}
                mode="time"
                display="default"
                onChange={handleFromTimeChange}
              />
            )}
          </View>

        </View>
        {errors.fromTime && <Text style={styles.errorText}>{errors.fromTime}</Text>}


        <View>
          <Text style={styles.subtop}>To Time :</Text>
          <View style={styles.input} >
            <Text onPress={showTimepickerTo}>
              {toTime} &nbsp;
              <ClockIcon width={20} height={20} color={Black} />
            </Text>
            {showToTimePicker && (
              <DateTimePicker
                value={parse(toTime, 'HH:mm:ss', new Date())}
                mode="time"
                display="default"
                onChange={handleToTimeChange}
              />
            )}
          </View>
        </View>
        {errors.toTime && <Text style={styles.errorText}>{errors.toTime}</Text>}

        <View style={[styles.input, { height: 150 }]}>
          <TextInput
            placeholder="Enter Reason.."
            value={Reason}
            onChangeText={(text) => setReason(text)}
            multiline
            numberOfLines={Math.max(4, Reason.split('\n').length)}
            textAlignVertical="top" />
        </View>
        {errors.Reason && <Text style={styles.errorText}>{errors.Reason}</Text>}

        <TouchableOpacity onPress={handleSubmit} style={styles.Button1}>
          {
            load ?
              <ActivityIndicator
                color={White}
                size={"small"}
              /> :
              <Text style={styles.text}>
                Submit Request
              </Text>
          }
        </TouchableOpacity>

      </View>
    </ScrollView>

  )
}

export default AttendanceRequest;