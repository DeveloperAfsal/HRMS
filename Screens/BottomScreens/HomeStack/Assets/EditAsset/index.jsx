import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../AddAsset/style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import axios from "axios";
import { useSelector } from "react-redux";

const EditAsset = ({ route, navigation }) => {

    // 

    const SpecId = route.params.Id;

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [assetDetails, setAssetsDetails] = useState('');
    const [assetValue, setAssetsValue] = useState('');
    const [remarks, setRemarks] = useState('');

    const [datalist, setDatalist] = useState([]);

    const [load, SetLoad] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [showDropdownstatus, setShowDropdownstatus] = useState(false);

    // status

    const toggleDropdownstatus = () => {
        setShowDropdownstatus(!showDropdownstatus);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdownstatus(false);
    };

    //

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState('');
    const [selectedDepartmentsId, setSelectedDepartmentsId] = useState('');

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
    }, [])

    const handleSelectDepartment = (item) => {
        setSelectedDepartments(item.role_name);
        setSelectedDepartmentsId(item.id);
        setShowDepartmentNameDropdown(false);
        fetchEmployeeDropdown(item.id);
    };

    const [employeeDropdown, setEmployeeDropdown] = useState([]);
    const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedMemberId, setSelectedMemberId] = useState('');

    const fetchEmployeeDropdown = async (selectedDepartmentIdsAsNumbers) => {

        const apiUrl = `https://ocean21.in/api/public/api/employee_dropdown_list/${selectedDepartmentIdsAsNumbers}`;

        try {

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;

            setEmployeeDropdown(responseData);

        } catch (error) {
            console.error("Error fetching employee dropdown:", error);
        }
    };

    const handleSelectMember = (item) => {
        setSelectedMember(item.emp_name);
        setSelectedMemberId(item.emp_id)
        setShowEmployeeDropdown(false);
    };

    // handleDateChange

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setStartDate(date);
        }
        setShowDatePicker(Platform.OS === 'ios');
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [endDate, setEndDate] = useState(new Date());

    const handleDateChange1 = (event, date) => {
        if (date !== undefined) {
            setEndDate(date);
        }
        setShowDatePicker1(Platform.OS === 'ios');
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [returnDate, setreturnDate] = useState(new Date());

    const handleDateChange2 = (event, date) => {
        if (date !== undefined) {
            setreturnDate(date);
        }
        setShowDatePicker2(Platform.OS === 'ios');
    };

    const showDatepicker2 = () => {
        setShowDatePicker2(true);
    };

    const formattedStartDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
    const formattedEndDate = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;
    const formattedReturnDate = `${returnDate.getFullYear()}-${String(returnDate.getMonth() + 1).padStart(2, '0')}-${String(returnDate.getDate()).padStart(2, '0')}`;

    // 

    const [assetTypeDropdown, setAssetTypeDropdown] = useState([]);
    const [showAssetTypeDropdown, setShowAssetTypeDropdown] = useState(false);
    const [selectedAssetTypes, setSelectedAssetTypes] = useState([]);
    const [selectedAssetTypeIds, setSelectedAssetTypeIds] = useState([]);
    const Assetid = selectedAssetTypeIds.join(', ')


    const handleToggleAssetType = (assetTypeName, assetTypeId) => {
        if (selectedAssetTypes.includes(assetTypeName)) {
            setSelectedAssetTypes(selectedAssetTypes.filter(selectedAsset => selectedAsset !== assetTypeName));
            setSelectedAssetTypeIds(selectedAssetTypeIds.filter(id => id !== assetTypeId));
        } else {
            setSelectedAssetTypes([...selectedAssetTypes, assetTypeName]);
            setSelectedAssetTypeIds([...selectedAssetTypeIds, assetTypeId]);
        }
    };

    useEffect(() => {

        const Asstype = async () => {

            try {
                const apiUrl = 'https://ocean21.in/api/public/api/asset_name';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data.data;
                setAssetTypeDropdown(responseData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }

        Asstype();

    }, [])
    // 

    useEffect(() => {

        const EditassType = async () => {

            try {
                const apiUrl = `https://ocean21.in/api/public/api/edit_assign_assetlist/${SpecId.id}`;
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data;
                const resp = response.data.data;

                if (responseData.status === 'success') {
                    setDatalist(resp);
                    setSelectedAssetTypeIds([resp.asset_id]);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }

        EditassType();

    }, [SpecId])

    useEffect(() => {
        setSelectedDepartmentsId(datalist.department);
        setSelectedDepartments(SpecId.department);
        setSelectedMemberId(datalist.emp_id);
        setSelectedMember(SpecId.emp_name);
        setSelectedAssetTypes(SpecId.asset_name.split(','));
        setAssetsDetails(datalist.asset_details);
        setAssetsValue(datalist.asset_value);
        setStartDate(new Date(datalist.issue_date));
        setEndDate(new Date(datalist.valid_till));
        setreturnDate(new Date(datalist.return_on));
        setRemarks(datalist.remarks);
        setSelectedStatus(datalist.status);
    }, [datalist])

    // 

    const onRefresh = () => {
        setSelectedDepartments('');
        setSelectedMember('');
        setSelectedAssetTypeIds([]);
        setAssetsDetails('');
        setAssetsValue('');
        setRemarks('');
        setStartDate(new Date());
        setEndDate(new Date());
        setreturnDate(new Date());
        setSelectedStatus(null);
    }

    // 

    const EditAss = async () => {

        SetLoad(true);

        try {

            const apiUrl = 'https://ocean21.in/api/public/api/update_assign_asset';

            const response = await axios.put(apiUrl, {
                id: SpecId.id,
                department: selectedDepartmentsId,
                emp_id: selectedMemberId,
                asset_type: Assetid,
                asset_details: assetDetails,
                asset_value: assetValue,
                issue_date: formattedStartDate,
                valid_till: formattedEndDate,
                return_on: formattedReturnDate,
                remarks: remarks,
                status: selectedStatus,
                updated_by: data.userempid
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data;

            if (responseData.status === "success") {
                Alert.alert("Successfull", responseData.message);
                SetLoad(false);
                navigation.navigate('Asset List');
                onRefresh();
            } else {
                Alert.alert("Failed", responseData.message);
                SetLoad(false);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            SetLoad(false);
        }

    }

    return (

        <ScrollView>

            <View style={styles.ShiftSlotContainer}>
                <View style={styles.Inputcontainer}>

                    <Text style={styles.ShiftSlotText}>
                        Department
                    </Text>

                    <TouchableOpacity
                        onPress={() => setShowDepartmentNameDropdown(!showDepartmentNameDropdown)}
                        style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDepartments ? selectedDepartments : 'Select Department'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDepartmentNameDropdown && (
                        <View style={styles.dropdown}>
                            <ScrollView>
                                {departmentNameDropdown.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.dropdownOption}
                                        onPress={() => handleSelectDepartment(item)}
                                    >
                                        <Text>{item.role_name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Employee Name
                    </Text>

                    <TouchableOpacity
                        onPress={() => setShowEmployeeDropdown(!showEmployeeDropdown)}
                        style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedMember ? selectedMember : 'Select Member'}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showEmployeeDropdown && (
                        <View style={styles.dropdown}>
                            <ScrollView>
                                {employeeDropdown.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.dropdownOption}
                                        onPress={() => handleSelectMember(item)}
                                    >
                                        <Text>{item.emp_name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Asset Type
                    </Text>

                    <TouchableOpacity style={styles.Input} onPress={() => {
                        setShowAssetTypeDropdown(!showAssetTypeDropdown);
                    }}>
                        <View style={styles.selectedDaysContainer}>
                            {selectedAssetTypes.map((assetType, index) => (
                                <Text key={index} style={styles.selectedays}>{assetType}</Text>
                            ))}
                            {selectedAssetTypes.length === 0 && <Text>Select Asset Types</Text>}
                        </View>
                        <DropdownIcon width={14} height={14} color={"#000"} />
                    </TouchableOpacity>

                    {showAssetTypeDropdown && (
                        <View style={styles.dropdown}>
                            <ScrollView>
                                {assetTypeDropdown.map((asset, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.dropdownOption,
                                            selectedAssetTypes.includes(asset.asset_type_name) && styles.selectedOption
                                        ]}
                                        onPress={() => handleToggleAssetType(asset.asset_type_name, asset.id)}
                                    >
                                        <Text style={styles.dropdownOptionText}>{asset.asset_type_name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Asset Details
                    </Text>

                    <TextInput
                        value={assetDetails}
                        onChangeText={(txt) => setAssetsDetails(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Asset Value
                    </Text>

                    <TextInput
                        value={assetValue}
                        onChangeText={(txt) => setAssetsValue(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Issue Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker}>
                            {startDate.toDateString()} &nbsp;
                        </Text>
                        {showDatePicker && (
                            <DateTimePicker
                                value={startDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Valid Till
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker1}>
                            {endDate.toDateString()} &nbsp;
                        </Text>
                        {showDatePicker1 && (
                            <DateTimePicker
                                value={endDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange1}
                            />
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Return On
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker2}>
                            {returnDate.toDateString()} &nbsp;
                        </Text>
                        {showDatePicker && (
                            <DateTimePicker
                                value={returnDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange2}
                            />
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownstatus} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus || "Selected Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdownstatus && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus("Allocated")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Allocated</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus("Return")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Return</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Remarks
                    </Text>

                    <TextInput
                        value={remarks}
                        onChangeText={(txt) => setRemarks(txt)}
                        style={styles.ShiftSlotTextInput1}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.submitbutton}
                            onPress={EditAss}
                        >
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.submitbuttonText}>
                                        Submit
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton}
                            onPress={() => navigation.navigate('Dashboard')}
                        >
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

export default EditAsset;