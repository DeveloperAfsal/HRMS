import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../General/style";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';

const AddCareer = ({ navigation, handleDocumentSelection1, docFile1, docFileErr1 }) => {

    const [load, SetLoad] = useState(false);

    // Employee from redux store 

    const dispatch = useDispatch();

    const { Resume } = useSelector((state) => state.resume);

    const handleFieldsChange = (fieldName, value) => {
        dispatch({
            type: 'UPDATE_RESUME_FIELDS',
            payload: { [fieldName]: value }
        });
    };

    // Select Gender

    const [showEmptype, setShowEmptype] = useState(false);

    const toggleDropdownEmptype = () => {
        setShowEmptype(!showEmptype);
    };

    const selectEmptype = (Emptype) => {
        setShowEmptype(false);
        handleFieldsChange('employmentType', Emptype);
    };

    // Select Notice Period

    const [showNperiod, setShowNperiod] = useState(false);

    const toggleDropdownNperiod = () => {
        setShowNperiod(!showNperiod);
    };

    const selectNperiod = (Nperiod) => {
        setShowNperiod(false);
        handleFieldsChange('noticePeriod', Nperiod);
    };

    // Select Candidate Status

    const [showCstatus, setShowCstatus] = useState(false);

    const toggleDropdownCstatus = () => {
        setShowCstatus(!showCstatus);
    };

    const selectCstatus = (Cstatus) => {
        setShowCstatus(false);
        handleFieldsChange('candidateStatus', Cstatus);
    };

    return (

        <ScrollView>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Career</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Current Employer
                    </Text>

                    <TextInput
                        value={Resume.currentEmployer}
                        onChangeText={(text) => handleFieldsChange('currentEmployer', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Current Designation
                    </Text>

                    <TextInput
                        value={Resume.currentDesignation}
                        onChangeText={(text) => handleFieldsChange('currentDesignation', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Functional Area
                    </Text>

                    <TextInput
                        // value={Resume.functionalArea}
                        // onChangeText={(text) => handleFieldsChange('functionalArea', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Area of Specialization
                    </Text>

                    <TextInput
                        // value={Resume.areaOfSpecification}
                        // onChangeText={(text) => handleFieldsChange('areaOfSpecification', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Industry
                    </Text>

                    <TextInput
                        // value={Resume.industry}
                        // onChangeText={(text) => handleFieldsChange('industry', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Employment Type
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownEmptype} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{Resume.employmentType || "Select Employment Type"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showEmptype && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectEmptype("Fulltime/Permanent")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Fulltime/Permanent</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectEmptype("Parttime/Permanent")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Parttime/Permanent</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectEmptype("Internship")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Internship</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectEmptype("Freelance")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Freelance</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>


                    <Text style={styles.StatDateText}>
                        Total Experience
                    </Text>

                    <TextInput
                        value={Resume.totalExperience}
                        onChangeText={(text) => handleFieldsChange('totalExperience', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Current CTC
                    </Text>

                    <TextInput
                        value={Resume.currentCTC}
                        onChangeText={(text) => handleFieldsChange('currentCTC', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Expected CTC
                    </Text>

                    <TextInput
                        value={Resume.expectedCTC}
                        onChangeText={(text) => handleFieldsChange('expectedCTC', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Notice Period
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownNperiod} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{Resume.noticePeriod || "Select Notice Period"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showNperiod && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectNperiod("Immediate")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Immediate</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectNperiod("Less Than 15 Days")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Less Than 15 Days</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectNperiod("15 - 30 Days")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>15 - 30 Days</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectNperiod("30 - 45 Days")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>30 - 45 Days</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectNperiod("45 - 60 Days")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>45 - 60 Days</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectNperiod("Above 60 Days")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Above 60 Days</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Candidate Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownCstatus} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{Resume.candidateStatus || "Select Candidate Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showCstatus && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectCstatus("Offered")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Offered</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectCstatus("Joined")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Joined</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectCstatus("Shortlisted")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Shortlisted</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectCstatus("Rejected")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Rejected</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectCstatus("Not Suitable")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Not Suitable</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Date Of Joining
                    </Text>

                    <TextInput
                        value={Resume.doj}
                        onChangeText={(text) => handleFieldsChange('doj', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Key Skills
                    </Text>

                    <TextInput
                        value={Resume.keySkills}
                        onChangeText={(text) => handleFieldsChange('keySkills', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Social Media Link
                    </Text>

                    <TextInput
                        value={Resume.socialMediaLink}
                        onChangeText={(text) => handleFieldsChange('socialMediaLink', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Attached Resume
                    </Text>

                    <Text style={docFile1 ? styles.DocFileName : styles.DocFileNameHolder}>
                        {docFile1 ? docFile1[0].name : 'Select The Document'}
                    </Text>

                    <View style={styles.fullWidth}>
                        <TouchableOpacity style={styles.UploadButton} onPress={handleDocumentSelection1}>
                            <Text style={styles.UploadButtonText}>
                                Select Document
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.errorText}>
                        {docFileErr1}
                    </Text>

                </View>

            </View>


        </ScrollView>

    )
}

export default AddCareer; 