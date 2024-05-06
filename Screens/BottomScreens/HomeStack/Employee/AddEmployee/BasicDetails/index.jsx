import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, ScrollView, Image, Platform } from "react-native";
import styles from "../style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DeleteIcon from "../../../../../../Assets/Icons/Delete.svg";
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";


const BasicDetails = ({ onEmpDetails }) => {

    const dispatch = useDispatch();

    // Employee from redux store 

    const { data } = useSelector((state) => state.login);
    const { Employee } = useSelector((state) => state.Employee);

    console.log(Employee.dob, "dob");

    const updateEmployeeFields = (updatedFields) => ({
        type: 'UPDATE_EMPLOYEE_FIELDS',
        payload: updatedFields
    });

    const handleFieldsChange = (fieldName, value) => {
        dispatch(updateEmployeeFields({ [fieldName]: value }));
    };

    // Select Gender

    const [showGender, setShowGender] = useState(false);
    const [selectedGender, setSelectedGender] = useState(null);

    const toggleDropdownGender = () => {
        setShowGender(!showGender);
    };

    const selectGender = (Gender) => {
        // setSelectedGender(Gender);
        setShowGender(false);
        handleFieldsChange('gender', Gender);
    };

    // Select Status

    const [showStatus, setShowStatus] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);

    const toggleDropdownStatus = () => {
        setShowStatus(!showStatus);
    };

    const selectStatus = (Status) => {
        // setSelectedStatus(Status);
        setShowStatus(false);
        handleFieldsChange('status', Status);
    };

    // Select Martial Status

    const [showMstatus, setShowMstatus] = useState(false);
    const [selectedMstatus, setSelectedMstatus] = useState(null);

    const toggleDropdownMstatus = () => {
        setShowMstatus(!showMstatus);
    };

    const selectMstatus = (Mstatus) => {
        // setSelectedMstatus(Mstatus);
        setShowMstatus(false);
        handleFieldsChange('maritalStatus', Mstatus);
    };

    // Select Image

    const [selectedImage, setSelectedImage] = useState([]);

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

    const handleImagePickerResult = async (response) => {
        if (!response.didCancel) {
            const images = Array.isArray(response.assets) ? response.assets : [response];
            for (const image of images) {
                const compressedUri = await compressImage(image);
                setSelectedImage((prevImages) => [...prevImages, { uri: compressedUri }]);
                handleFieldsChange('employeePicture', compressedUri);
            }
        }
    };

    // const deleteImage = (uri) => {
    //     setSelectedImage((prevImages) => {
    //         const updatedImages = prevImages.filter((image) => image.uri !== uri);
    //         return updatedImages;
    //     });
    // };

    const handleDeleteEmployeePicture = () => {
        dispatch(updateEmployeeFields({ employeePicture: null }));
    }

    const renderSelectedImage = () => {
        return (

            // <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContainer}>
            //     <View style={styles.container}>
            //         {selectedImage.map((image, index) => (
            //             <View key={index} style={styles.imageContainer}>
            //                 <TouchableOpacity onPress={() => deleteImage(image.uri)} style={styles.deleteButton}>
            //                     <DeleteIcon width={15} height={15} />
            //                 </TouchableOpacity>
            //                 <Image source={{ uri: image.uri }} style={styles.image} />
            //             </View>
            //         ))}
            //     </View>
            // </ScrollView>

            <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.container}>
                    {Employee.employeePicture && (
                        <View style={styles.imageContainer}>
                            <TouchableOpacity onPress={() => handleDeleteEmployeePicture()} style={styles.deleteButton}>
                                <DeleteIcon width={15} height={15} />
                            </TouchableOpacity>
                            <Image source={{ uri: Employee.employeePicture }} style={styles.image} />
                        </View>
                    )}
                </View>
            </ScrollView>

        );
    };

    const handleFromGallery = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, handleImagePickerResult);
    };

    // 

    useEffect(() => {

        const fetchData = async () => {

            try {
                const apiUrl = 'https://ocean21.in/api/public/api/employee_uid';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;

                dispatch(updateEmployeeFields({ 'employeeId': responseData }));

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [])

    // handleDateChange

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setSelectedDate(date);
        }
        const formattedStartDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
        handleFieldsChange('dob', formattedStartDate);
        setShowDatePicker(Platform.OS === 'ios');
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const formattedDOB = Employee.dob ? new Date(Employee.dob).toDateString() : selectedDate.toDateString();


    return (

        <View style={styles.InputContainer}>

            <Text style={styles.Heading}>
                Basic Details
            </Text>

            <Text style={styles.subHeading}>
                Employee ID
            </Text>

            <TextInput
                style={styles.input}
                editable={false}
                value={Employee.employeeId}
            />

            <Text style={styles.subHeading}>
                Employee Picture
            </Text>

            <View style={styles.fullWidth}>

                <ScrollView horizontal contentContainerStyle={styles.scrollViewContainer}>
                    {renderSelectedImage()}
                </ScrollView>

                <TouchableOpacity style={styles.UploadButton} onPress={handleFromGallery}>
                    <Text style={styles.UploadButtonText}>
                        Upload Image
                    </Text>
                </TouchableOpacity>

            </View>

            <Text style={styles.subHeading}>
                First Name
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.firstName}
                onChangeText={(text) => handleFieldsChange('firstName', text)}
            />

            <Text style={styles.subHeading}>
                Last Name
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.lastName}
                onChangeText={(text) => handleFieldsChange('lastName', text)}
            />

            <Text style={styles.subHeading}>
                Gender
            </Text>

            <TouchableOpacity onPress={toggleDropdownGender} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>{Employee.gender || "Selected Gender"}</Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showGender && (

                <View style={styles.dropdown}>

                    <TouchableOpacity onPress={() => selectGender("Male")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Male</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectGender("FeMale")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>FeMale</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectGender("Others")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Others</Text>
                    </TouchableOpacity>

                </View>

            )}

            <Text style={styles.subHeading}>
                Status
            </Text>

            <TouchableOpacity onPress={toggleDropdownStatus} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>{Employee.status || "Selected Status"}</Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showStatus && (

                <View style={styles.dropdown}>

                    <TouchableOpacity onPress={() => selectStatus("Active")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Active</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectStatus("In-Active")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>In-Active</Text>
                    </TouchableOpacity>

                </View>

            )}

            <Text style={styles.subHeading}>
                Phone Number
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.phoneNumber}
                onChangeText={(text) => handleFieldsChange('phoneNumber', text)}
                keyboardType="number-pad"
            />

            <Text style={styles.subHeading}>
                Whatsapp Number
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.whatsappNumber}
                onChangeText={(text) => handleFieldsChange('whatsappNumber', text)}
                keyboardType="number-pad"
            />

            <Text style={styles.subHeading}>
                Email ID
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.email}
                onChangeText={(text) => handleFieldsChange('email', text)}
            />

            <Text style={styles.subHeading}>
                Date Of Birth
            </Text>

            {/* <TextInput
                style={styles.input}
                value={Employee.dob}
                onChangeText={(text) => handleFieldsChange('dob', text)}
                keyboardType="number-pad"
            /> */}

            <View style={styles.inputs}>
                <Text onPress={showDatepicker}>
                    {formattedDOB}
                </Text>
                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
            </View>

            <Text style={styles.subHeading}>
                Current Address
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.currentAddress}
                onChangeText={(text) => handleFieldsChange('currentAddress', text)}
            />

            <Text style={styles.subHeading}>
                Permanent Address
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.permanentAddress}
                onChangeText={(text) => handleFieldsChange('permanentAddress', text)}
            />

            <Text style={styles.subHeading}>
                Parent / Guardian Name
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.parentName}
                onChangeText={(text) => handleFieldsChange('parentName', text)}
            />

            <Text style={styles.subHeading}>
                Marital Status
            </Text>

            <TouchableOpacity onPress={toggleDropdownMstatus} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>{Employee.maritalStatus || "Selected Martial status"}</Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showMstatus && (

                <View style={styles.dropdown}>

                    <TouchableOpacity onPress={() => selectMstatus("Single")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Single</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectMstatus("Married")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Married</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectMstatus("Divorce")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Divorce</Text>
                    </TouchableOpacity>

                </View>

            )}

            <Text style={styles.subHeading}>
                Spouse Name
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.spouseName}
                onChangeText={(text) => handleFieldsChange('spouseName', text)}
            />

            <Text style={styles.subHeading}>
                Aadhar Number
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.aadharNumber}
                onChangeText={(text) => handleFieldsChange('aadharNumber', text)}
                keyboardType="number-pad"
            />

            <Text style={styles.subHeading}>
                PAN Number
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.panNumber}
                onChangeText={(text) => handleFieldsChange('panNumber', text)}
            />

            <View style={styles.fullWidth}>
                <TouchableOpacity style={styles.NextButton} onPress={onEmpDetails}>
                    <Text style={styles.NextButtonText}>
                        Next
                    </Text>
                    <ArrowRightIcon width={14} height={14} color={'#fff'} />
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default BasicDetails;