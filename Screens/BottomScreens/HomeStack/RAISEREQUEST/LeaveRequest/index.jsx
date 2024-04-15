import React, { useEffect, useState } from "react";
import styles from "./style";
import { Alert, Image, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalenderIcon from "../../../../../assets/EPK CRM Icons/Calendar.svg";
import ClockIcon from "../../../../../assets/EPK CRM Icons/Clock.svg";
import DeleteIcon from "../../../../../assets/EPK CRM Icons/Delete.svg";
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from "react-redux";
import axios from "axios";
import { format, parse } from 'date-fns';
import { Black, White } from "../../../../../assets/Colors";
import { ActivityIndicator } from "react-native";

const LeaveRequest = ({ navigation }) => {

    // data from redux store

    const { data } = useSelector((state) => state.login)


    // states

    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [reason, setReason] = useState('');
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [permissionDate, setPermissionDate] = useState(new Date());
    const [fromTime, setFromTime] = useState('00:00:00');
    const [toTime, setToTime] = useState('00:00:00');
    const [selectedImage1, setSelectedImage1] = useState([]);
    const [errors, setErrors] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const [load, setLoad] = useState(false);

    // API call For Select Type

    const [typeArray, setTypeArray] = useState([{ "id": "0", "request_type_name": "Select Type" }]);

    useEffect(() => {
        const apiUrl = 'https://officeinteriorschennai.com/api/public/api/leaverequesttype';
        const headers = {
            Authorization: `Bearer ${data.token}`
        };

        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl, { headers });
                const responsedata = response.data.data;
                setTypeArray([{ "id": "0", "request_type_name": "Select Type" }, ...responsedata]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, []);

    // API call For Category Type

    const [leaveCategoryArray, setLeaveCategoryArray] = useState([{ "cid": "0", "category_name": "Select Category" }]);

    useEffect(() => {
        const apiUrl = 'https://officeinteriorschennai.com/api/public/api/leaverequestcategory';
        const headers = {
            Authorization: `Bearer ${data.token}`
        };

        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl, { headers });
                const responsedata = response.data.data;
                setLeaveCategoryArray([{ "cid": "0", "category_name": "Select Category Type" }, ...responsedata]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, []);

    // Handler

    const HandlesetType = (itemValue) => {
        setType(itemValue == 0 ? '' : itemValue);
    };

    const HandlesetLeaveCategory = (itemValue) => {
        setCategory(itemValue == 0 ? '' : itemValue);
    };

    const HandleRefresh = () => {
        setType('');
        setCategory('');
        setReason('');
        setFromDate(new Date());
        setToDate(new Date());
        setFromTime('00:00:00');
        setToTime('00:00:00');
        setSelectedImage1([]);
        setErrors({})
    };


    //  Date Time Picker

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [showTimePicker1, setShowTimePicker1] = useState(false)

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setFromDate(date);
        }
        setShowDatePicker(Platform.OS === 'ios');
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const handleDateChange1 = (event, date) => {
        if (date !== undefined) {
            setToDate(date);
        }
        setShowDatePicker1(Platform.OS === 'ios');
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    const handleDateChange2 = (event, date) => {
        if (date !== undefined) {
            setPermissionDate(date);
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

    // Image Picker

    const [selectedImage, setSelectedImage] = useState([]);

    const pickImage = async () => {
        try {
            const options = {
                mediaType: 'photo',
                selectionLimit: 1,
            };
            const result = await launchImageLibrary(options);

            if (!result.didCancel) {
                const images = result.assets ? result.assets : [result];
                for (const image of images) {
                    const response = await fetch(image.uri);
                    const blob = await response.blob();
                    if (blob.size > 1024 * 1024) {
                        Alert.alert("File size should be less than 1MB");
                    } else {
                        setSelectedImage(prevImages => [...prevImages, image.uri]);
                    }
                }
            }
        } catch (error) {
            console.log('Error picking images: ', error);
        }
    };

    const deleteImage = (index) => {
        setSelectedImage(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };

    const renderSelectedImage = () => {
        return selectedImage.map((imageUri, index) => (
            <View key={index} style={styles.imageContainer}>
                <TouchableOpacity onPress={() => deleteImage(index)}
                    style={styles.deleteButton}>
                    <DeleteIcon width={15} height={15} />
                </TouchableOpacity>
                <Image source={{ uri: imageUri }} style={styles.image} />
            </View>
        ));
    };

    // Formatter

    const fromDate1 = `${fromDate.getFullYear()}-${fromDate.getMonth() + 1}-${fromDate.getDate()}`;
    const toDate1 = `${toDate.getFullYear()}-${toDate.getMonth() + 1}-${toDate.getDate()}`;
    const permissionDate1 = `${permissionDate.getFullYear()}-${permissionDate.getMonth() + 1}-${permissionDate.getDate()}`;

    // Submit Function

    const handleSubmit = async () => {

        setLoad(true);

        const newErrors = {};

        if (!type && type.trim().length === 0) {
            newErrors.type = 'This field is required';
        }

        if (!category && category.trim().length === 0) {
            newErrors.category = 'This field is required';
        }

        if (!reason && reason.trim().length === 0) {
            newErrors.reason = 'This field is required';
        }

        if (Object.keys(newErrors).length === 0) {

            const formData = new FormData();

            formData.append('emp_id', data.userempid);
            formData.append('emp_name', data.username);
            formData.append('emp_email', data.useremail);
            formData.append('request_type', type);
            formData.append('request_category', category);
            formData.append('from_date', fromDate1);
            formData.append('to_date', toDate1);
            formData.append('permission_date', permissionDate1);
            formData.append('permission_timefrom', fromTime);
            formData.append('permission_timeto', toTime);
            formData.append('leave_reason', reason);

            if (selectedImage1.length > 0) {
                selectedImage1.map((selectedImage, index) => {
                    const imageUriParts = selectedImage.split('/');
                    const imageName = imageUriParts[imageUriParts.length - 1];
                    formData.append(`proof`, {
                        uri: selectedImage,
                        name: imageName,
                        type: 'image/jpeg',
                    });
                });
            } else {
                formData.append('proof', selectedImage1);
            }

            try {
                const response = await fetch('https://officeinteriorschennai.com/api/public/api/leave-request-insert', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${data.token}`
                    },
                    body: formData,
                });

                const responseData = await response.json();
                console.log("responseData", responseData)


                if (responseData.status == "success") {

                    setLoad(false);

                    if (type == 1) {
                        navigation.navigate('Leave Request List');
                    }
                    else if (type == 2) {
                        navigation.navigate('Half Day Request List');
                    }
                    else if (type == 3) {
                        navigation.navigate('Permission Request List');
                    }
                    else {
                        null
                    }

                    setType('');
                    setCategory('');
                    setReason('');
                    setFromDate(new Date());
                    setToDate(new Date());
                    setFromTime('00:00:00');
                    setToTime('00:00:00');
                    setSelectedImage1([]);
                    setErrors({})

                }
                else {
                    // handleShowAlert1();
                    console.log("error1");
                    Alert.alert("Failed to add Request");
                }
            } catch (error) {
                // handleShowAlert1()
                console.log("error2");
                Alert.alert("Failed to add Request");
            }
        } else {
            setErrors(newErrors);
            // handleShowAlert2()
            console.log("error3")
            Alert.alert("Please fill all the details")
        }
    }

    return (

        <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={HandleRefresh} />}>

            <View style={styles.subContainer}>

                <Text style={styles.subHeading}>Leave Request</Text>

                <View style={[styles.input, { paddingLeft: 0 }]}>
                    <Picker selectedValue={type} onValueChange={HandlesetType}>
                        {typeArray.map((option) => (
                            <Picker.Item key={option.id} label={option.request_type_name} value={option.id} />
                        ))}
                    </Picker>
                </View>
                {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}

                <View style={[styles.input, { paddingLeft: 0 }]}>
                    <Picker selectedValue={category} onValueChange={HandlesetLeaveCategory}>
                        {leaveCategoryArray.map((option) => (
                            <Picker.Item key={option.cid} label={option.category_name} value={option.cid} />
                        ))}
                    </Picker>
                </View>
                {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}


                <View >
                    <Text style={styles.date}>Date :</Text>
                    <View style={styles.input} >
                        <Text onPress={showDatepicker2}>
                            {permissionDate.toDateString()} &nbsp;
                            <CalenderIcon width={20} height={20} color={Black} />
                        </Text>
                        {showDatePicker2 && (
                            <DateTimePicker
                                value={permissionDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange2}
                                minimumDate={new Date()}
                            />
                        )}
                    </View>

                    <View>
                        <Text style={styles.date}>From Time :</Text>
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

                    <View>
                        <Text style={styles.date}>To Time :</Text>
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
                </View>



                <View >
                    <Text style={styles.date}>From Date :</Text>
                    <View style={styles.input} >
                        <Text onPress={showDatepicker}>
                            {fromDate.toDateString()} &nbsp;
                            <CalenderIcon width={20} height={20} color={Black} />
                        </Text>
                        {showDatePicker && (
                            <DateTimePicker
                                value={fromDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                                minimumDate={new Date()}
                            />
                        )}
                    </View>

                    <Text style={styles.date}>To Date :</Text>
                    <View style={styles.input} >
                        <Text onPress={showDatepicker1}>
                            {toDate.toDateString()} &nbsp;
                            <CalenderIcon width={20} height={20} color={Black} />
                        </Text>
                        {showDatePicker1 && (
                            <DateTimePicker
                                value={toDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange1}
                                minimumDate={new Date()}
                            />
                        )}
                    </View>
                </View>


                <View style={[styles.input, { height: 150 }]}>
                    <TextInput
                        placeholder="Enter Reason.."
                        value={reason}
                        onChangeText={(text) => setReason(text)}
                        multiline
                        numberOfLines={Math.max(4, reason.split('\n').length)}
                        textAlignVertical="top" />
                </View>
                {errors.reason && <Text style={styles.errorText}>{errors.reason}</Text>}


                <View style={{ marginBottom: 10 }}>
                    <ScrollView horizontal>{renderSelectedImage()}</ScrollView>
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity onPress={pickImage} style={styles.Button}>
                            <Text style={styles.text1}>
                                Upload Proof
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

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

export default LeaveRequest;
