import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    GetCountries,
    GetState,
    GetCity,
} from "react-country-state-city";

const PostJob = () => {

    const [showDropdownstatus, setShowDropdownstatus] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedStatusErr, setSelectedStatusErr] = useState('');
    const [showDropdownstatus1, setShowDropdownstatus1] = useState(false);
    const [selectedStatus1, setSelectedStatus1] = useState(null);
    const [selectedStatusErr1, setSelectedStatusErr1] = useState('');
    const [showDropdownstatus2, setShowDropdownstatus2] = useState(false);
    const [selectedStatus2, setSelectedStatus2] = useState(null);
    const [selectedStatusErr2, setSelectedStatusErr2] = useState('');
    const [showDropdownstatus3, setShowDropdownstatus3] = useState(false);
    const [selectedStatus3, setSelectedStatus3] = useState(null);
    const [selectedStatusErr3, setSelectedStatusErr3] = useState('');

    // status

    const toggleDropdownstatus = () => {
        setShowDropdownstatus(!showDropdownstatus);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdownstatus(false);
    };

    const toggleDropdownstatus1 = () => {
        setShowDropdownstatus1(!showDropdownstatus1);
    };

    const selectStatus1 = (status) => {
        setSelectedStatus1(status);
        setShowDropdownstatus1(false);
    };

    const toggleDropdownstatus2 = () => {
        setShowDropdownstatus2(!showDropdownstatus2);
    };

    const selectStatus2 = (status) => {
        setSelectedStatus2(status);
        setShowDropdownstatus2(false);
    };

    const toggleDropdownstatus3 = () => {
        setShowDropdownstatus3(!showDropdownstatus3);
    };

    const selectStatus3 = (status) => {
        setSelectedStatus3(status);
        setShowDropdownstatus3(false);
    };

    // handleDateChange

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [startDateErr, setStartDateErr] = useState(null);
    const formattedStartDate = startDate ?
        `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}` :
        "";

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setStartDate(date);
        }
        setShowDatePicker(Platform.OS === 'ios');
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    console.log(cities, "cities")
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    console.log(selectedState, "selectedState")
    const [selectedCity, setSelectedCity] = useState(null);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [showStateDropdown, setShowStateDropdown] = useState(false);
    const [showCityDropdown, setShowCityDropdown] = useState(false);

    useEffect(() => {
        const fetchCountries = async () => {
            const fetchedCountries = await GetCountries();
            setCountries(fetchedCountries);
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const fetchStates = async () => {
            if (selectedCountry) {
                const fetchedStates = await GetState(selectedCountry.id);
                setStates(fetchedStates);
            }
        };

        fetchStates();
    }, [selectedCountry]);

    useEffect(() => {
        const fetchCities = async () => {
            if (selectedState) {
                const fetchedCities = await GetCity(selectedState.state_code);
                setCities(fetchedCities);
            }
        };

        fetchCities();
    }, [selectedState]);

    const toggleCountryDropdown = () => {
        setShowCountryDropdown(!showCountryDropdown);
    };

    const toggleStateDropdown = () => {
        setShowStateDropdown(!showStateDropdown);
    };

    const toggleCityDropdown = () => {
        setShowCityDropdown(!showCityDropdown);
    };

    return (
        <ScrollView>

            <View style={styles.ShiftSlotContainer}>

                <View style={styles.ShiftSlotContainerTitle}>
                    <Text style={styles.ShiftSlotContainerTitleText}>Post Job</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.ShiftSlotText}>
                        Designation
                    </Text>

                    <TextInput
                        // value={assetDetails}
                        // onChangeText={(txt) => setAssetsDetails(txt)}
                        style={styles.ShiftSlotTextInput}
                        placeholder="Enter Designation"
                    />

                    <Text style={styles.errorText}>
                        {/* {selectedDepartmentsErr} */}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        No. of Vacancies
                    </Text>

                    <TextInput
                        // value={assetDetails}
                        // onChangeText={(txt) => setAssetsDetails(txt)}
                        style={styles.ShiftSlotTextInput}
                        placeholder="Enter No of Vacancies"
                        keyboardType="numeric"
                    />

                    <Text style={styles.errorText}>
                        {/* {selectedDepartmentsErr} */}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Job Country
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleCountryDropdown}>
                        <Text style={styles.StatusTouchableText}>
                            {selectedCountry ? selectedCountry.name : "Select Country"}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showCountryDropdown && (
                        <View style={styles.dropdown}>
                            {countries.map(country => (
                                <TouchableOpacity
                                    key={country.id}
                                    style={styles.dropdownOption}
                                    onPress={() => {
                                        setSelectedCountry(country);
                                        toggleCountryDropdown();
                                    }}
                                >
                                    <Text>{country.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Job State
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleStateDropdown}>
                        <Text style={styles.StatusTouchableText}>
                            {selectedState ? selectedState.name : "Select State"}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showStateDropdown && (
                        <View style={styles.dropdown}>
                            {states.map(state => (
                                <TouchableOpacity
                                    key={state.id}
                                    style={styles.dropdownOption}
                                    onPress={() => {
                                        setSelectedState(state);
                                        toggleStateDropdown();
                                    }}
                                >
                                    <Text>{state.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Job City
                    </Text>

                    <TouchableOpacity style={styles.StatusTouchable} onPress={toggleCityDropdown}>
                        <Text style={styles.StatusTouchableText}>
                            {selectedCity ? selectedCity.name : "Select City"}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showCityDropdown && (
                        <View style={styles.dropdown}>
                            {cities.map(city => (
                                <TouchableOpacity
                                    key={city.id}
                                    style={styles.dropdownOption}
                                    onPress={() => {
                                        setSelectedCity(city);
                                        toggleCityDropdown();
                                    }}
                                >
                                    <Text>{city.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Job Type
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownstatus1} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus1 || "Select Job Type"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdownstatus1 && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus1("Remote")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Remote</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus1("On-Site")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>On-Site</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus1("Hybrid")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Hybrid</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {selectedStatusErr1}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Employment Type
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownstatus3} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus3 || "Select Employment Type"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdownstatus3 && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus3("Full time / Permanent")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Full time / Permanent</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus3("Part time / Temporary")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Part time / Temporary</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus3("Internship")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Internship</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus3("Freelance")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Freelance</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {selectedStatusErr3}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Schedule / Shift
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownstatus2} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus2 || "Select Schedule / Shift"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdownstatus2 && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus2("General Shift")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>General Shift</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus2("Night Shift")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Night Shift</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus2("Rotational Shift")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Rotational Shift</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {selectedStatusErr2}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Salary (Min)
                    </Text>

                    <TextInput
                        // value={assetDetails}
                        // onChangeText={(txt) => setAssetsDetails(txt)}
                        style={styles.ShiftSlotTextInput}
                        placeholder="Enter Minimum Salary"
                        keyboardType="numeric"
                    />

                    <Text style={styles.errorText}>
                        {/* {selectedAssetTypesErr} */}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Salary (Max)
                    </Text>

                    <TextInput
                        // value={assetDetails}
                        // onChangeText={(txt) => setAssetsDetails(txt)}
                        style={styles.ShiftSlotTextInput}
                        placeholder="Enter Maximum Salary"
                        keyboardType="numeric"
                    />

                    <Text style={styles.errorText}>
                        {/* {selectedAssetTypesErr} */}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Experience (Min)
                    </Text>

                    <TextInput
                        // value={assetDetails}
                        // onChangeText={(txt) => setAssetsDetails(txt)}
                        style={styles.ShiftSlotTextInput}
                        placeholder="Enter Minimum Experience"
                        keyboardType="numeric"
                    />

                    <Text style={styles.errorText}>
                        {/* {selectedAssetTypesErr} */}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Experience (Max)
                    </Text>

                    <TextInput
                        // value={assetDetails}
                        // onChangeText={(txt) => setAssetsDetails(txt)}
                        style={styles.ShiftSlotTextInput}
                        placeholder="Enter Maximum Experience"
                        keyboardType="numeric"
                    />

                    <Text style={styles.errorText}>
                        {/* {selectedAssetTypesErr} */}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Key Skills
                    </Text>

                    <TextInput
                        // value={assetDetails}
                        // onChangeText={(txt) => setAssetsDetails(txt)}
                        style={styles.ShiftSlotTextInput}
                        placeholder="Add Tag"
                    />

                    <Text style={styles.errorText}>
                        {/* {selectedAssetTypesErr} */}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Roles & Responsibilities
                    </Text>

                    <TextInput
                        style={styles.ShiftSlotTextInput1}
                        multiline={true}
                        textAlignVertical="top"
                    />

                    <Text style={styles.errorText}>
                        {/* {selectedAssetTypesErr} */}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Preferred Candidate
                    </Text>

                    <TextInput
                        style={styles.ShiftSlotTextInput1}
                        multiline={true}
                        textAlignVertical="top"
                    />

                    <Text style={styles.errorText}>
                        {/* {selectedAssetTypesErr} */}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Other Benefits
                    </Text>

                    <TextInput
                        style={styles.ShiftSlotTextInput1}
                        multiline={true}
                        textAlignVertical="top"
                    />

                    <Text style={styles.errorText}>
                        {/* {selectedAssetTypesErr} */}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Job Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownstatus} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus || "Select Job Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdownstatus && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus("Active")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Active</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus("In-Active")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>In-Active</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {selectedStatusErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Valid Till
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker}>
                            {/* {startDate.toDateString()} &nbsp; */}
                            {startDate ? startDate.toDateString() : "Select date"} &nbsp;
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


                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.submitbutton}
                        >
                            {
                                // load ?
                                //     <ActivityIndicator size={"small"} color={"#fff"} /> :
                                <Text style={styles.submitbuttonText}>
                                    Submit
                                </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton}
                        // onPress={() => onRefresh()}
                        >
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* <LottieAlertSucess
                    visible={isAlertVisible}
                    animationSource={require('../../../../../Assets/Alerts/tick.json')}
                    title={resMessage}
                />

                <LottieAlertError
                    visible={isAlertVisible1}
                    animationSource={require('../../../../../Assets/Alerts/Close.json')}
                    title={resMessageFail}
                />

                <LottieCatchError
                    visible={isAlertVisible2}
                    animationSource={require('../../../../../Assets/Alerts/Catch.json')}
                    title="Error While Fetching Data"
                /> */}

            </View>

        </ScrollView>
    )
}

export default PostJob;