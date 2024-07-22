import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';

const AddGeneral = ({ navigation, docFile, docFileErr, handleDocumentSelection }) => {

    // Employee from redux store 

    const dispatch = useDispatch();

    const { Resume } = useSelector((state) => state.resume);
    const { data } = useSelector((state) => state.login);

    const handleFieldsChange = (fieldName, value) => {
        dispatch({
            type: 'UPDATE_RESUME_FIELDS',
            payload: { [fieldName]: value }
        });
    };

    // Select Gender

    const [showGender, setShowGender] = useState(false);

    const toggleDropdownGender = () => {
        setShowGender(!showGender);
    };

    const selectGender = (Gender) => {
        setShowGender(false);
        handleFieldsChange('gender', Gender);
    };

    // Select Source

    const [showSource, setShowSource] = useState(false);

    const toggleDropdownSource = () => {
        setShowSource(!showSource);
    };

    const selectSource = (Source) => {
        setShowSource(false);
        handleFieldsChange('source', Source);
    };

    // 

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [startDateErr, setStartDateErr] = useState(null);
    const formattedStartDate = startDate ?
        `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}` :
        "";

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (event, date) => {
        if (event.type === "set" && date) {
            setStartDate(date);
            const formattedStartDate = formatDate(date);
            handleFieldsChange('dob', formattedStartDate);
        }
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    // Api call for Ug 

    const [degree, setDegree] = useState([]);
    const [selectedDegreeErr, setSelectedDegreeErr] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://ocean21.in/api/public/api/ug_list';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;

                setDegree(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectDegree = (shift) => {
        // setSelectedDegree(shift.degree_lists);
        // setSelectedDegreeId(shift.id);
        handleFieldsChange('uDegree', shift.degree_lists);
        handleFieldsChange('uDegreeid', shift.id);
        setShowDropdown(false);
    };


    // Api call for Pg 

    const [pgDegree, setPgDegree] = useState([]);
    const [selectedPgDegreeErr, setSelectedPgDegreeErr] = useState(null);
    const [showDropdown1, setShowDropdown1] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://ocean21.in/api/public/api/pg_list';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;
                setPgDegree(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const toggleDropdown1 = () => {
        setShowDropdown1(!showDropdown1);
    };

    const selectPgDegree = (shift) => {
        handleFieldsChange('pDegree', shift.degree_lists);
        handleFieldsChange('pDegreeid', shift.id);
        setShowDropdown1(false);
    };

    // 

    const [selectedCountryErr, setSelectedCountryErr] = useState(null);
    const [selectedStateErr, setSelectedStateErr] = useState(null);
    const [selectedCitiesErr, setSelectedCitiesErr] = useState(null);

    const [country, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown3 = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const selectCountry = (selectedCountry) => {
        setSelectedCountry(selectedCountry.name);
        setSelectedCountryId(selectedCountry.id);
        handleFieldsChange('country', selectedCountry.name);
        handleFieldsChange('countryid', selectedCountry.id);
        setDropdownVisible(false);
    };

    const CountApi = async () => {

        try {
            const apiUrl = 'https://ocean21.in/api/public/api/country_list';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setCountry(responseData);

        } catch (error) {
            console.error('Error fetching Country data:', error);
        }

    }

    useEffect(() => {
        CountApi();
    }, [])

    const [state, setState] = useState([]);
    const [selectededState, setSelectedState] = useState([]);
    const [selectedStateId, setSelectedStateId] = useState([]);
    const [dropdownVisible1, setDropdownVisible1] = useState(false);

    const toggleDropdown4 = () => {
        setDropdownVisible1(!dropdownVisible1);
    };

    const selectState = (selectededState) => {
        setSelectedState(selectededState.name);
        setSelectedStateId(selectededState.id);
        handleFieldsChange('state', selectededState.name);
        handleFieldsChange('stateid', selectededState.id);
        setDropdownVisible1(false);
    };

    const StateApi = async () => {

        try {
            const apiUrl = `https://ocean21.in/api/public/api/state_list/${selectedCountryId}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setState(responseData);

        } catch (error) {
            console.error('Error fetching State data:', error);
        }

    }

    useEffect(() => {
        StateApi();
    }, [selectedCountryId])

    const [city, setCity] = useState([]);
    const [selectededCity, setSelectedCity] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState([]);
    const [dropdownVisible2, setDropdownVisible2] = useState(false);

    const toggleDropdown5 = () => {
        setDropdownVisible2(!dropdownVisible2);
    };

    const selectCity = (selectedCity) => {
        setSelectedCity(selectedCity.name);
        setSelectedCityId(selectedCity.id);
        handleFieldsChange('city', selectedCity.name);
        handleFieldsChange('cityId', selectedCity.id);
        setDropdownVisible2(false);
    };

    const CityApi = async () => {

        try {
            const apiUrl = `https://ocean21.in/api/public/api/city_list/${selectedStateId}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setCity(responseData);

        } catch (error) {
            console.error('Error fetching Count data:', error);
        }

    }

    useEffect(() => {
        CityApi();
    }, [selectededState])

    const [prefcity, setPrefCity] = useState([]);
    const [selectededPrefCity, setSelectedPrefCity] = useState([]);
    const [selectedPrefCityId, setSelectedPrefCityId] = useState([]);
    const [dropdownVisible3, setDropdownVisible3] = useState(false);

    const toggleDropdown6 = () => {
        setDropdownVisible3(!dropdownVisible3);
    };

    const selectPrefCity = (selectedPrefCity) => {
        setSelectedPrefCity((prevSelectedCities) => {
            if (prevSelectedCities.some(city => city.id === selectedPrefCity.id)) {
                return prevSelectedCities.filter(city => city.id !== selectedPrefCity.id);
            } else {
                return [...prevSelectedCities, selectedPrefCity];
            }
        });

        setSelectedPrefCityId((prevSelectedCityIds) => {
            if (prevSelectedCityIds.includes(selectedPrefCity.id)) {
                return prevSelectedCityIds.filter(id => id !== selectedPrefCity.id);
            } else {
                return [...prevSelectedCityIds, selectedPrefCity.id];
            }
        });

        setDropdownVisible3(false);

    };

    const PrefCityApi = async () => {

        try {
            const apiUrl = `https://ocean21.in/api/public/api/all_city_list`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setPrefCity(responseData);

        } catch (error) {
            console.error('Error fetching Count data:', error);
        }

    }

    useEffect(() => {
        PrefCityApi();
    }, [])

    return (

        <ScrollView>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>General</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Source
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownSource} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{Resume.source || "Select Source"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showSource && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectSource("Social Media")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Social Media</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectSource("NewsPaper")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>NewsPaper</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectSource("Advertisement")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Advertisement</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectSource("Friends Referral")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Friends Referral</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectSource("Others")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Others</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Candidate Name
                    </Text>

                    <TextInput
                        value={Resume.candidateName}
                        onChangeText={(text) => handleFieldsChange('candidateName', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Position Applying For
                    </Text>

                    <TextInput
                        value={Resume.positionApplying}
                        onChangeText={(text) => handleFieldsChange('positionApplying', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Gender
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownGender} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{Resume.gender || "Select Gender"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showGender && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectGender("Male")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Male</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectGender("Female")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Female</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectGender("Others")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Others</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Email
                    </Text>

                    <TextInput
                        value={Resume.email}
                        onChangeText={(text) => handleFieldsChange('email', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Mobile No
                    </Text>

                    <TextInput
                        value={Resume.mobileNo}
                        onChangeText={(text) => handleFieldsChange('mobileNo', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>


                    <Text style={styles.StatDateText}>
                        Alternate Mobile No
                    </Text>

                    <TextInput
                        value={Resume.alternativeMobileNo}
                        onChangeText={(text) => handleFieldsChange('alternativeMobileNo', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Date of Birth
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker}>
                            {startDate ? formatDate(startDate) : "Select Date"} &nbsp;
                        </Text>
                        {showDatePicker && (
                            <DateTimePicker
                                value={startDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        {startDateErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Country
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown3}>
                        <Text style={styles.StatusTouchableText}>
                            {Resume.country ? Resume.country : 'Select a country'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {dropdownVisible && (
                        <View style={styles.dropdown}>
                            {country.map((item) => (
                                <TouchableOpacity key={item.id} onPress={() => selectCountry(item)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedCountryErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        State
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown4}>
                        <Text style={styles.StatusTouchableText}>
                            {Resume.state ? Resume.state : 'Select a State'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {dropdownVisible1 && (
                        <View style={styles.dropdown}>
                            {state.map((item) => (
                                <TouchableOpacity key={item.id} onPress={() => selectState(item)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedStateErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        City
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown5}>
                        <Text style={styles.StatusTouchableText}>
                            {Resume.city ? Resume.city : 'Select a City'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {dropdownVisible2 && (
                        <View style={styles.dropdown}>
                            {city.map((item) => (
                                <TouchableOpacity key={item.id} onPress={() => selectCity(item)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedCitiesErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Preferred Location
                    </Text>

                    {/* <TextInput
                        value={Resume.preferedLocation}
                        onChangeText={(text) => handleFieldsChange('preferedLocation', text)}
                        style={styles.inputs}
                    /> */}
                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown6}>
                        <Text style={styles.StatusTouchableText}>
                            {selectededPrefCity.length > 0
                                ? selectededPrefCity.map(city => city.name).join(', ')
                                : 'Select Prefered City'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {dropdownVisible3 && (
                        <View style={styles.dropdown}>
                            {prefcity.map((item) => (
                                <TouchableOpacity key={item.id} onPress={() => selectPrefCity(item)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Languages Known
                    </Text>

                    <TextInput
                        value={Resume.languageKnown}
                        onChangeText={(text) => handleFieldsChange('languageKnown', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                </View>


            </View>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Under Graduate</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Degree
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown}>

                        <Text style={styles.StatusTouchableText}>{Resume.uDegree || "Select Degree"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown && (
                        <View style={styles.dropdown}>
                            {degree.map((shift, index) => (

                                <TouchableOpacity key={index} onPress={() => selectDegree(shift)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{shift.degree_lists}</Text>
                                </TouchableOpacity>

                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedDegreeErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Specialization
                    </Text>

                    <TextInput
                        value={Resume.uSpecialization}
                        onChangeText={(text) => handleFieldsChange('uSpecialization', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Year of Passing
                    </Text>

                    <TextInput
                        value={Resume.uYearOfPassing}
                        onChangeText={(text) => handleFieldsChange('uYearOfPassing', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        School/University
                    </Text>

                    <TextInput
                        value={Resume.uSchoolUniversity}
                        onChangeText={(text) => handleFieldsChange('uSchoolUniversity', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                </View>

            </View>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Post Graduate</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Degree
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleDropdown1}>

                        <Text style={styles.StatusTouchableText}>{Resume.pDegree || "Select PgDegree"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown1 && (
                        <View style={styles.dropdown}>
                            {pgDegree.map((shift, index) => (

                                <TouchableOpacity key={index} onPress={() => selectPgDegree(shift)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{shift.degree_lists}</Text>
                                </TouchableOpacity>

                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedPgDegreeErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Specialization
                    </Text>

                    <TextInput
                        value={Resume.pSpecialization}
                        onChangeText={(text) => handleFieldsChange('pSpecialization', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Year of Passing
                    </Text>

                    <TextInput
                        value={Resume.pYearOfPassing}
                        onChangeText={(text) => handleFieldsChange('pYearOfPassing', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        School/University
                    </Text>

                    <TextInput
                        value={Resume.pSchoolUniversity}
                        onChangeText={(text) => handleFieldsChange('pSchoolUniversity', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Certification
                    </Text>

                    <TextInput
                        value={Resume.pCertification}
                        onChangeText={(text) => handleFieldsChange('pCertification', text)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Attachment
                    </Text>

                    <Text style={docFile ? styles.DocFileName : styles.DocFileNameHolder}>
                        {docFile ? docFile[0].name : 'Select The Document'}
                    </Text>

                    <View style={styles.fullWidth}>
                        <TouchableOpacity style={styles.UploadButton} onPress={handleDocumentSelection}>
                            <Text style={styles.UploadButtonText}>
                                Select Document
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.errorText}>
                        {docFileErr}
                    </Text>

                </View>

            </View>


        </ScrollView>

    )
}

export default AddGeneral; 