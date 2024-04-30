import React from "react";
import { ActivityIndicator, Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const EditSupervisorList = ({ navigation, route }) => {

    // 

    const { DepName, EmpName, st, Id } = route.params;

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // states

    const [datalist, setDatalist] = useState([]);
    const [selectedID, setSelectedID] = useState();

    // 

    const [load, setLoad] = useState(false);

    // 

    const [selectedStatus, setSelectedStatus] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdown(false);
    };

    // Api call for userrolelist

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);

    const [supervisorNameDropdown, setSupervisorNameDropdown] = useState([]);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedNameId, setSelectedNameId] = useState(null);
    const [showSupervisorNameDropdown, setShowSupervisorNameDropdown] = useState(false);

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
                setSupervisorNameDropdown(responseData);

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

    const handleSelectName = (name) => {
        setSelectedName(name.role_name);
        setSelectedNameId(name.id)
        setShowSupervisorNameDropdown(false);
    };

    // Api call for datalist

    useEffect(() => {

        const fetchData = async () => {

            try {
                const apiUrl = `https://ocean21.in/api/public/api/editview_supervisor/${Id}`;

                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;

                if (responseData) {
                    setDatalist(responseData);
                    setSelectedID(responseData.id);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [Id]);

    // 

    useEffect(() => {
        setSelectedDepartment(DepName);
        setSelectedName(EmpName);
        setSelectedStatus(st);

        if (datalist) {
            setSelectedDepartmentId(datalist.departmentrole_id);
            setSelectedNameId(datalist.supervisor_id);
        }
    }, [DepName, EmpName, st, datalist]); 


    console.log(
        selectedID,
        selectedDepartmentId,
        selectedNameId,
        selectedStatus,
        data.userempid
    )


    const HandleSubmit = async () => {

        setLoad(true);

        try {

            const apiUrl = 'https://ocean21.in/api/public/api/update_supervisor';

            const response = await axios.put(apiUrl, {
                id: selectedID,
                departmentrole_id: selectedDepartmentId,
                supervisor_id: selectedNameId,
                status: selectedStatus,
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                navigation.navigate('Supervisor List')
            } else {
                setLoad(false);
                Alert.alert('Failed To Add:', response.data.message);
            }

        } catch (error) {
            Alert.alert("Error during submit", "Check The Input Credentials");
            console.error('Error during submit:', error);
            setLoad(false);
        }

    }

    // 

    const Handlecancel = () => {
        navigation.navigate('Supervisor List')
    }



    return (

        <ScrollView>

            <View style={styles.SupervisorContainer}>

                <View style={styles.SupervisorContainerTitle}>
                    <Text style={styles.SupervisorContainerTitleText}>Edit Supervisor</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.DepartmentText}>
                        Department Name
                    </Text>

                    <View style={styles.Input}>
                        <Text style={styles.selectedays}>{selectedDepartment ? selectedDepartment : 'Select Department Name'}</Text>
                    </View>

                    <Text style={styles.DepartmentText}>
                        Supervisor Name
                    </Text>

                    <TouchableOpacity style={styles.Input} onPress={() => setShowSupervisorNameDropdown(!showSupervisorNameDropdown)}>
                        <Text style={styles.selectedays}>{selectedName ? selectedName : 'Select Name'}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showSupervisorNameDropdown && (
                        <View style={styles.dropdown}>
                            {supervisorNameDropdown
                                .filter(department => department.role_name !== selectedDepartment)
                                .map((department, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.dropdownOption,
                                            selectedName === department.role_name && styles.selectedOption
                                        ]}
                                        onPress={() => handleSelectName(department)}
                                    >
                                        <Text style={styles.dropdownOptionText}>{department.role_name}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    )}

                    <Text style={styles.StatusText}>
                        Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus || "Selected Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus("Active")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Active</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus("In-Active")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>In-Active</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.submitbutton} onPress={HandleSubmit}>
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.submitbuttonText}>
                                        Update
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton} onPress={Handlecancel}>
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

        </ScrollView>
    )
}

export default EditSupervisorList;