import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, ScrollView, Image } from "react-native";
import styles from "../style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DeleteIcon from "../../../../../../Assets/Icons/Delete.svg";
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';


const BasicDetails = ({ onEmpDetails }) => {

    // Select Gender

    const [showGender, setShowGender] = useState(false);
    const [selectedGender, setSelectedGender] = useState(null);

    const toggleDropdownGender = () => {
        setShowGender(!showGender);
    };

    const selectGender = (Gender) => {
        setSelectedGender(Gender);
        setShowGender(false);
    };

    // Select Status

    const [showStatus, setShowStatus] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);

    const toggleDropdownStatus = () => {
        setShowStatus(!showStatus);
    };

    const selectStatus = (Status) => {
        setSelectedStatus(Status);
        setShowStatus(false);
    };

    // Select Martial Status

    const [showMstatus, setShowMstatus] = useState(false);
    const [selectedMstatus, setSelectedMstatus] = useState(null);

    const toggleDropdownMstatus = () => {
        setShowMstatus(!showMstatus);
    };

    const selectMstatus = (Mstatus) => {
        setSelectedMstatus(Mstatus);
        setShowMstatus(false);
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
            }
        }
    };

    const deleteImage = (uri) => {
        setSelectedImage((prevImages) => {
            const updatedImages = prevImages.filter((image) => image.uri !== uri);
            return updatedImages;
        });
    };

    const renderSelectedImage = () => {
        return (
            <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.container}>
                    {selectedImage.map((image, index) => (
                        <View key={index} style={styles.imageContainer}>
                            <TouchableOpacity onPress={() => deleteImage(image.uri)} style={styles.deleteButton}>
                                <DeleteIcon width={15} height={15} />
                            </TouchableOpacity>
                            <Image source={{ uri: image.uri }} style={styles.image} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        );
    };

    const handleFromGallery = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, handleImagePickerResult);
    };

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
            />

            <Text style={styles.subHeading}>
                Last Name
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Gender
            </Text>

            <TouchableOpacity onPress={toggleDropdownGender} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>{selectedGender || "Selected Gender"}</Text>
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

                <Text style={styles.StatusTouchableText}>{selectedStatus || "Selected Status"}</Text>
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
            />

            <Text style={styles.subHeading}>
                Whatsapp Number
            </Text>

            <TextInput
                style={styles.input}
            />
            <Text style={styles.subHeading}>
                Email ID
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Date Of Birth
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Current Address
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Permanent Address
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Parent / Guardian Name
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Marital Status
            </Text>

            <TouchableOpacity onPress={toggleDropdownMstatus} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>{selectedMstatus || "Selected Martial status"}</Text>
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
            />

            <Text style={styles.subHeading}>
                Aadhar Number
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                PAN Number
            </Text>

            <TextInput
                style={styles.input}
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