import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View, TouchableOpacity } from "react-native";
import styles from "../style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg"
import axios from "axios";
import { useSelector } from "react-redux";

const EmployeeRole = ({ onBankDetails, onprevEmpDetails }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // Api call for userrolelist

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);

    const [slotError, setSlotError] = useState('');
    const [shiftSlotList, setShiftSlotList] = useState([]);
    const [selectedShiftId, setSelectedShiftId] = useState(null);
    const [selectedShift, setSelectedShift] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedShiftError, setSelectedShiftError] = useState('');

    useEffect(() => {

        const apiUrl = 'https://ocean21.in/api/public/api/userrolelist';

        const fetchData = async () => {

            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;

                setDepartmentNameDropdown(responseData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);

    const handleSelectDepartment = (departmentName) => {
        setSelectedDepartment(departmentName.role_name);
        setSelectedDepartmentId(departmentName.id)
        setShowDepartmentNameDropdown(false);
    };

    // Api call for shift slot dropdown

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://ocean21.in/api/public/api/shiftslotlist';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;

                setShiftSlotList(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectShift = (shift) => {
        setSelectedShift(shift.shift_slot);
        setSelectedShiftId(shift.id);
        setShowDropdown(false);
    };


    return (

        <View style={styles.InputContainer}>

            <Text style={styles.Heading}>
                Employee Role
            </Text>

            <TouchableOpacity style={styles.Input} onPress={() => setShowDepartmentNameDropdown(!showDepartmentNameDropdown)}>
                <Text style={styles.selectedays}>{selectedDepartment ? selectedDepartment : 'Select Department Name'}</Text>
                <DropdownIcon width={14} height={14} color={"#000"} />
            </TouchableOpacity>

            {showDepartmentNameDropdown && (
                <View style={styles.dropdown}>
                    {departmentNameDropdown.map((department, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dropdownOption,
                                selectedDepartment === department.role_name && styles.selectedOption
                            ]}
                            onPress={() => handleSelectDepartment(department)}
                        >
                            <Text style={styles.dropdownOptionText}>{department.role_name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <Text style={styles.subHeading}>
                Designation
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Select Supervisor
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Shift Role
            </Text>

            <TouchableOpacity style={styles.TimeSlotTouchable} onPress={toggleDropdown}>

                <Text style={styles.TimeSlotTouchableText}>{selectedShift ? selectedShift : "Select Shift"}</Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showDropdown && (
                <View style={styles.dropdown}>
                    {shiftSlotList.map((shift, index) => (

                        <TouchableOpacity key={index} onPress={() => selectShift(shift)} style={styles.dropdownOption}>
                            <Text style={styles.dropdownOptionText}>{shift.shift_slot}</Text>
                        </TouchableOpacity>

                    ))}
                </View>
            )}

            <Text style={styles.subHeading}>
                Official Email ID
            </Text>

            <TextInput
                style={styles.input}
            />
            <Text style={styles.subHeading}>
                Password
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Check-in / Check-out
            </Text>

            <TextInput
                style={styles.input}
            />
            <Text style={styles.subHeading}>
                Overtime
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Late Allowed
            </Text>

            <TextInput
                style={styles.input}
            />

            <Text style={styles.subHeading}>
                Permission Allowed
            </Text>

            <TextInput
                style={styles.input}
            />

            <View style={[styles.fullWidth, styles.Row, styles.Left]}>
                <TouchableOpacity style={styles.PrevButton} onPress={onprevEmpDetails}>
                    <ArrowLeftIcon width={14} height={14} color={'#0A62F1'} />
                    <Text style={styles.PrevButtonText}>
                        Previous
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.NextButton} onPress={onBankDetails}>
                    <Text style={styles.NextButtonText}>
                        Next
                    </Text>
                    <ArrowRightIcon width={14} height={14} color={'#fff'} />
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default EmployeeRole;