import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../AddProject/style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useSelector } from "react-redux";

const EditProject = ({ route, navigation }) => {

    // 

    const SpecId = route.params.Id;

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // states

    const [datalist, setDatalist] = useState([]);
    const [dataload, setDataload] = useState(false);

    const [pname, setPname] = useState('');
    const [ptype, setPtype] = useState('');
    const [pcategory, setPcategory] = useState('');
    const [pworktype, setPworktype] = useState('');
    const [des, setDes] = useState('');
    const [duration, setDuration] = useState('');

    const [cname, setCname] = useState('');
    const [ccompany, setCcompany] = useState('');
    const [ccontact, setCcontact] = useState('');
    const [cemail, setCemail] = useState('');
    const [ccity, setCcity] = useState('');
    const [cstate, setCstate] = useState('');

    const [load, SetLoad] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedEmployeesIds, setSelectedEmployeesIds] = useState([]);
    const selectedEmployeesIdsAsNumbers = selectedEmployeesIds.join(',');

    const [employeeDropdown, setEmployeeDropdown] = useState([]);
    const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);

    const handleToggleEmployee = (employeeName, employeeNameID) => {
        if (selectedEmployees.includes(employeeName)) {
            setSelectedEmployees(selectedEmployees.filter(selectedEmployee => selectedEmployee !== employeeName));
            setSelectedEmployeesIds(selectedEmployeesIds.filter(id => id !== employeeNameID));
        } else {
            setSelectedEmployees([...selectedEmployees, employeeName]);
            setSelectedEmployeesIds([...selectedEmployeesIds, employeeNameID]);
        }
    };

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedDepartmentIds, setSelectedDepartmentIds] = useState([]);
    const selectedDepartmentIdsAsNumbers = selectedDepartmentIds.join(',');

    const handleToggleDepartment = async (departmentName, departmentId) => {
        if (selectedDepartments.includes(departmentName)) {
            setSelectedDepartments(selectedDepartments.filter(selectedDepartment => selectedDepartment !== departmentName));
            setSelectedDepartmentIds(selectedDepartmentIds.filter(id => id !== departmentId));

            // Clear selected employees when department is deselected
            setSelectedEmployees([]);

        } else {
            setSelectedDepartments([...selectedDepartments, departmentName]);
            setSelectedDepartmentIds([...selectedDepartmentIds, departmentId]);
            // Fetch employee dropdown when department is selected
            setSelectedDepartmentIds(selectedDepartmentIds => {
                const selectedIdsAsNumbers = selectedDepartmentIds.map(id => parseInt(id, 10));
                fetchEmployeeDropdown(selectedIdsAsNumbers);
                return selectedDepartmentIds;
            });
        }
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

    // 

    useEffect(() => {

        const EditRaisetick = async () => {

            setDataload(true);

            try {
                const apiUrl = `https://ocean21.in/api/public/api/edit_projectlist/${SpecId.id}`;
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                const responseData = response.data;
                const resp = response.data.data;

                if (responseData.status === 'success') {
                    setDatalist(resp);
                    setDataload(false);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }

        EditRaisetick();

    }, [SpecId])

    // Api call for userrolelist

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

    // Api call for employeelist

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

    // Date Formatter 

    const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    const formattedEndDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;

    const [showModalDropdown, setShowModalDropdown] = useState(false);
    const [editedStatus, setEditedStatus] = useState(null);

    const toggleModalDropdown = () => {
        setShowModalDropdown(!showModalDropdown);
    };

    const selecModaltStatus = (status) => {
        setEditedStatus(status);
        setShowModalDropdown(false);
    };

    // 

    useEffect(() => {
        setStartDate(new Date(SpecId.from_date));
        setEndDate(new Date(SpecId.to_date));
        setSelectedDepartments(SpecId.department.split(','));
        setSelectedEmployees(SpecId.membername.split(','));
        setSelectedDepartmentIds([datalist.p_department]);
        setSelectedEmployeesIds([datalist.p_members]);
        setPname(SpecId.p_name);
        setPtype(SpecId.p_type);
        setPworktype(SpecId.p_work_type);
        setPcategory(SpecId.p_category);
        setDes(datalist.p_description);
        setDuration(datalist.p_durations);
        setCname(datalist.c_company);
        setCcompany(SpecId.client_company);
        setCemail(SpecId.p_durations);
        setCcontact(datalist.c_mobile);
        setCemail(datalist.c_email);
        setCstate(datalist.c_state);
        setEditedStatus(SpecId.status);
        setCcity(datalist.c_city);
    }, [SpecId, datalist]);

    // Api call for Handle Submit

    const HandleSubmit = async () => {

        SetLoad(true);

        try {

            const apiUrl = 'https://ocean21.in/api/public/api/update_project';

            const response = await axios.put(apiUrl, {
                id: SpecId.id,
                p_name: pname,
                p_type: ptype,
                p_work_type: pworktype,
                p_category: pcategory,
                p_description: des,
                p_department: selectedDepartmentIdsAsNumbers,
                p_members: selectedEmployeesIdsAsNumbers,
                from_date: formattedStartDate,
                to_date: formattedEndDate,
                p_durations: duration,
                c_name: cname,
                c_company: ccompany,
                c_email: cemail,
                c_mobile: ccontact,
                c_city: ccity,
                c_state: cstate,
                status: editedStatus,
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                SetLoad(false);
                navigation.navigate('Projects List')
                Alert.alert("Successfull", response.data.message);
            } else {
                Alert.alert("Failed To Add", response.data.message);
                SetLoad(false);
                console.error('Failed To Add:', response.data.error);
            }

        } catch (error) {
            Alert.alert("Error during submit", "Check The Input Credentials");
            console.error('Error during submit:', error);
            SetLoad(false);
        }

    }

    return (

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />}>

            {dataload ? <ActivityIndicator size={"large"} style={styles.Activeindicator} /> :
                <>
                    <View style={styles.PolicyContainer}>

                        <View style={styles.PolicyContainerTitleHeader}>
                            <Text style={styles.PolicyContainerTitleText}>Edit Project Details </Text>
                        </View>

                        <View style={styles.Inputcontainer}>

                            <Text style={styles.StatDateText}>
                                Project Name
                            </Text>

                            <TextInput
                                value={pname}
                                onChangeText={(txt) => setPname(txt)}
                                style={styles.inputs}
                            />

                            <Text style={styles.errorText}>
                                { }
                            </Text>

                            <Text style={styles.StatDateText}>
                                Project Type
                            </Text>

                            <TextInput
                                value={ptype}
                                onChangeText={(txt) => setPtype(txt)}
                                style={styles.inputs}
                            />

                            <Text style={styles.errorText}>
                                { }
                            </Text>

                            <Text style={styles.StatDateText}>
                                Project Category
                            </Text>

                            <TextInput
                                value={pcategory}
                                onChangeText={(txt) => setPcategory(txt)}
                                style={styles.inputs}
                            />

                            <Text style={styles.errorText}>
                                { }
                            </Text>

                            <Text style={styles.StatDateText}>
                                Project Work Type
                            </Text>

                            <TextInput
                                value={pworktype}
                                onChangeText={(txt) => setPworktype(txt)}
                                style={styles.inputs}
                            />

                            <Text style={styles.errorText}>
                                { }
                            </Text>

                            <Text style={styles.StatDateText}>
                                Department
                            </Text>

                            <TouchableOpacity style={styles.Input} onPress={() => setShowDepartmentNameDropdown(!showDepartmentNameDropdown)}>
                                <View style={styles.selectedDaysContainer}>
                                    {selectedDepartments.map(day => (
                                        <Text key={day} style={styles.selectedays}>{day}</Text>
                                    ))}
                                    {selectedDepartments.length === 0 && <Text>Select Department Name</Text>}
                                </View>
                                <DropdownIcon width={14} height={14} color={"#000"} />
                            </TouchableOpacity>

                            {showDepartmentNameDropdown && (
                                <View style={styles.dropdown}>
                                    {departmentNameDropdown.map((department, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.dropdownOption,
                                                selectedDepartments.includes(department.role_name) && styles.selectedOption
                                            ]}
                                            onPress={() => handleToggleDepartment(department.role_name, department.id)}
                                        >
                                            <Text style={styles.dropdownOptionText}>{department.role_name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                            <Text style={styles.errorText}>
                                { }
                            </Text>

                            <Text style={styles.StatDateText}>
                                Members
                            </Text>

                            <TouchableOpacity style={styles.Input} onPress={() => {
                                setShowEmployeeDropdown(!showEmployeeDropdown);
                            }}>
                                <View style={styles.selectedDaysContainer}>
                                    {selectedEmployees.map(employee => (
                                        <Text key={employee} style={styles.selectedays}>{employee}</Text>
                                    ))}
                                    {selectedEmployees.length === 0 && <Text>Select Employees</Text>}
                                </View>
                                <DropdownIcon width={14} height={14} color={"#000"} />
                            </TouchableOpacity>

                            {showEmployeeDropdown && (
                                <View style={styles.dropdown}>
                                    {employeeDropdown.map((employee, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.dropdownOption,
                                                selectedEmployees.includes(employee.emp_name) && styles.selectedOption
                                            ]}
                                            onPress={() => handleToggleEmployee(employee.emp_name, employee.emp_id)}
                                        >
                                            <Text style={styles.dropdownOptionText}>{employee.emp_name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                            <Text style={styles.errorText}>
                                { }
                            </Text>


                            <Text style={styles.StatDateText}>
                                From Date
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

                            <Text style={styles.StatDateText}>
                                To Date
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

                            <Text style={styles.StatDateText}>
                                Duration
                            </Text>

                            <TextInput
                                value={duration}
                                onChangeText={(txt) => setDuration(txt)}
                                style={styles.inputs}
                            />

                            <Text style={styles.errorText}>
                                { }
                            </Text>

                            <Text style={styles.StatDateText}>
                                Status
                            </Text>

                            <TouchableOpacity onPress={toggleModalDropdown} style={styles.Input}>

                                <Text style={styles.StatusTouchableText}>{editedStatus ? editedStatus : "Select Status"}</Text>
                                <DropdownIcon width={14} height={14} color={"#000"} />

                            </TouchableOpacity>

                            {showModalDropdown && (

                                <View style={styles.dropdown}>

                                    <TouchableOpacity onPress={() => selecModaltStatus("Not Yet Start")} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>Not Yet Start</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => selecModaltStatus("In-Progress")} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>In-Progress</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => selecModaltStatus("Hold")} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>Hold</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => selecModaltStatus("Completed")} style={styles.dropdownOption}>
                                        <Text style={styles.dropdownOptionText}>Completed</Text>
                                    </TouchableOpacity>

                                </View>

                            )}

                            <Text style={styles.errorText}>
                                { }
                            </Text>

                            <Text style={styles.StatDateText}>
                                Description
                            </Text>

                            <TextInput
                                value={des}
                                onChangeText={(txt) => setDes(txt)}
                                style={styles.inputs}
                            />

                            <Text style={styles.errorText}>
                                { }
                            </Text>

                        </View>


                    </View>

                    <View style={styles.PolicyContainer}>

                        <View style={styles.PolicyContainerTitleHeader}>
                            <Text style={styles.PolicyContainerTitleText}>Client Details</Text>
                        </View>

                        <View style={styles.Inputcontainer}>

                            <Text style={styles.StatDateText}>
                                Client Name
                            </Text>

                            <TextInput
                                value={cname}
                                onChangeText={(txt) => setCname(txt)}
                                style={styles.inputs}
                            />

                            <Text style={styles.errorText}>
                                { }
                            </Text>

                            <Text style={styles.StatDateText}>
                                Client Company
                            </Text>

                            <TextInput
                                value={ccompany}
                                onChangeText={(txt) => setCcompany(txt)}
                                style={styles.inputs}
                            />

                            <Text style={styles.errorText}>
                                { }
                            </Text>

                            <Text style={styles.StatDateText}>
                                Contact No.
                            </Text>

                            <TextInput
                                value={ccontact}
                                onChangeText={(txt) => setCcontact(txt)}
                                style={styles.inputs}
                            />

                            <Text style={styles.errorText}>
                                { }
                            </Text>

                            <Text style={styles.StatDateText}>
                                Email
                            </Text>

                            <TextInput
                                value={cemail}
                                onChangeText={(txt) => setCemail(txt)}
                                style={styles.inputs}
                            />

                            <Text style={styles.errorText}>
                                { }
                            </Text>

                            <Text style={styles.StatDateText}>
                                City
                            </Text>

                            <TextInput
                                value={ccity}
                                onChangeText={(txt) => setCcity(txt)}
                                style={styles.inputs}
                            />

                            <Text style={styles.errorText}>
                                { }
                            </Text>

                            <Text style={styles.StatDateText}>
                                State
                            </Text>

                            <TextInput
                                value={cstate}
                                onChangeText={(txt) => setCstate(txt)}
                                style={styles.inputs}
                            />

                            <Text style={styles.errorText}>
                                { }
                            </Text>

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

                                <TouchableOpacity style={styles.cancelbutton} onPress={() => navigation.navigate('Projects List')}>
                                    <Text style={styles.cancelbuttontext}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>

                            </View>

                        </View>


                    </View>
                </>
            }
        </ScrollView>

    )
}

export default EditProject; 