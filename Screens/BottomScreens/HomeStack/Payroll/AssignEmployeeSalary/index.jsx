import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import axios from "axios";
import { useSelector } from "react-redux";
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const AssignEmpSalary = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [load, SetLoad] = useState(false);
    const [ctc, setCtc] = useState('');
    const [ctcErr, setCtcErr] = useState('');
    const [grossPay, setGrossPay] = useState('');
    const [grossPayErr, setGrossPayErr] = useState('');
    const [netPay, setNetPay] = useState('');
    const [netPayErr, setNetPayErr] = useState('');
    const [basic, setBasic] = useState('');
    const [basicErr, setBasicErr] = useState('');
    const [hra, setHra] = useState('');
    const [hraErr, setHraErr] = useState('');
    const [cAllowance, setCAllowance] = useState('');
    const [cAllowanceErr, setCAllowanceErr] = useState('');
    const [tAllowance, setTAllowance] = useState('');
    const [tAllowanceErr, setTAllowanceErr] = useState('');
    const [mAllowance, setMAllowance] = useState('');
    const [mAllowanceErr, setMAllowanceErr] = useState('');
    const [oAllowance, setOAllowance] = useState('');
    const [oAllowanceErr, setOAllowanceErr] = useState('');
    const [variable, setVariable] = useState('');
    const [variableErr, setVariableErr] = useState('');
    const [pf, setPf] = useState('');
    const [pfErr, setPfErr] = useState('');
    const [epf, setEpf] = useState('');
    const [epfErr, setEpfErr] = useState('');
    const [esi, setEsi] = useState('');
    const [esiErr, setEsiErr] = useState('');
    const [sAdvance, setSAdvance] = useState('');
    const [sAdvanceErr, setSAdvanceErr] = useState('');
    const [oDeduction, setODeduction] = useState('');
    const [oDeductionErr, setODeductionErr] = useState('');

    //

    const [departmentNameDropdown, setDepartmentNameDropdown] = useState([]);
    const [showDepartmentNameDropdown, setShowDepartmentNameDropdown] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState('');
    const [selectedDepartmentsErr, setSelectedDepartmentsErr] = useState('');
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
    const [selectedMemberErr, setSelectedMemberErr] = useState('');
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

    const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    const formattedEndDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;

    // status

    const [selectedStatus, setSelectedStatus] = useState(null);
    const [showDropdownstatus, setShowDropdownstatus] = useState(false);
    const [statusError, setStatusError] = useState('');

    const toggleDropdownstatus = () => {
        setShowDropdownstatus(!showDropdownstatus);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdownstatus(false);
    };

    const AddAss = async () => {

        // console.log(
        //     " dep_id:", selectedDepartmentsId,
        //     "e_id:", selectedMemberId,
        //    " start_date:", formattedStartDate,
        //     "end_date: ",formattedEndDate,
        //    " annual_ctc:", ctc,
        //    " gross_pay:", grossPay,
        //     "net_pay:", netPay,
        //     "basic_da:", basic,
        //     "hra:", hra,
        //     "conveyance_allowance:", cAllowance,
        //     "transport_allowance:", tAllowance,
        //     "medical_allowance:", mAllowance,
        //     "other_allowance:", oAllowance,
        //     "variable:", variable,
        //     "pf:", pf,
        //     "epf:", epf,
        //     "esi:", esi,
        //     "advance:", sAdvance,
        //     "other_deduction:", oDeduction,
        //     "status:", selectedStatus,
        //     "created_by:", data.userempid
        // )

        SetLoad(true);

        if (!selectedDepartments) {
            setSelectedDepartmentsErr('Select Department Name');
            Alert.alert('Missing', "Check The Department Field");
            SetLoad(false);
            return;
        } else {
            setSelectedDepartmentsErr('');
        }

        if (!selectedMember) {
            setSelectedMemberErr('Select Member Name');
            Alert.alert('Missing', "Check The Member Field");
            SetLoad(false);
            return;
        } else {
            setSelectedMemberErr('');
        }

        if (!ctc) {
            setCtcErr('Enter CTC');
            Alert.alert('Missing', "Check The CTC Field");
            SetLoad(false);
            return;
        } else {
            setCtcErr('');
        }

        if (!grossPay) {
            setGrossPayErr('Enter Gross Pay');
            Alert.alert('Missing', "Check The Gross Pay Field");
            SetLoad(false);
            return;
        } else {
            setGrossPayErr('');
        }

        if (!netPay) {
            setNetPayErr('Enter Net Pay');
            Alert.alert('Missing', "Check The Net Pay Field");
            SetLoad(false);
            return;
        } else {
            setNetPayErr('');
        }

        if (!basic) {
            setBasicErr('Enter Basic');
            Alert.alert('Missing', "Check The Basic Field");
            SetLoad(false);
            return;
        } else {
            setBasicErr('');
        }

        if (!hra) {
            setHraErr('Enter HRA');
            Alert.alert('Missing', "Check The HRA Field");
            SetLoad(false);
            return;
        } else {
            setHraErr('');
        }

        if (!cAllowance) {
            setCAllowanceErr('Enter Convenience Allowance');
            Alert.alert('Missing', "Check The Convenience Allowance Field");
            SetLoad(false);
            return;
        } else {
            setCAllowanceErr('');
        }

        if (!tAllowance) {
            setTAllowanceErr('Enter Transport Allowance');
            Alert.alert('Missing', "Check The Transport Allowance Field");
            SetLoad(false);
            return;
        } else {
            setTAllowanceErr('');
        }

        if (!mAllowance) {
            setMAllowanceErr('Enter Medical Allowance');
            Alert.alert('Missing', "Check The Medical Allowance Field");
            SetLoad(false);
            return;
        } else {
            setMAllowanceErr('');
        }

        if (!oAllowance) {
            setOAllowanceErr('Enter Other Allowance');
            Alert.alert('Missing', "Check The Other Allowance Field");
            SetLoad(false);
            return;
        } else {
            setOAllowanceErr('');
        }

        if (!variable) {
            setVariableErr('Enter variable');
            Alert.alert('Missing', "Check The variable Field");
            SetLoad(false);
            return;
        } else {
            setVariableErr('');
        }

        if (!pf) {
            setPfErr('Enter PF');
            Alert.alert('Missing', "Check The PF Field");
            SetLoad(false);
            return;
        } else {
            setPfErr('');
        }

        if (!epf) {
            setEpfErr('Enter EPF');
            Alert.alert('Missing', "Check The EPF Field");
            SetLoad(false);
            return;
        } else {
            setEpfErr('');
        }

        if (!esi) {
            setEsiErr('Enter ESI');
            Alert.alert('Missing', "Check The ESI Field");
            SetLoad(false);
            return;
        } else {
            setEsiErr('');
        }

        if (!sAdvance) {
            setSAdvanceErr('Enter Salary Advance');
            Alert.alert('Missing', "Check The Salary Advance Field");
            SetLoad(false);
            return;
        } else {
            setSAdvanceErr('');
        }

        if (!oDeduction) {
            setODeductionErr('Enter Other Deduction');
            Alert.alert('Missing', "Check The Other Deduction Field");
            SetLoad(false);
            return;
        } else {
            setODeductionErr('');
        }

        if (!selectedStatus) {
            setStatusError('Select Status');
            Alert.alert('Missing', "Check The Status Field");
            SetLoad(false);
            return;
        } else {
            setStatusError('');
        }

        try {

            const apiUrl = 'https://ocean21.in/api/public/api/add_define_emp_salary';

            const response = await axios.post(apiUrl, {
                dep_id: selectedDepartmentsId,
                e_id: selectedMemberId,
                start_date: formattedStartDate,
                end_date: formattedEndDate,
                annual_ctc: ctc,
                gross_pay: grossPay,
                net_pay: netPay,
                basic_da: basic,
                hra: hra,
                conveyance_allowance: cAllowance,
                transport_allowance: tAllowance,
                medical_allowance: mAllowance,
                other_allowance: oAllowance,
                variable: variable,
                pf: pf,
                epf: epf,
                esi: esi,
                advance: sAdvance,
                other_deduction: oDeduction,
                status: selectedStatus,
                created_by: data.userempid
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data;

            if (responseData.status === "success") {
                // Alert.alert("Successfull", responseData.message);
                handleShowAlert(responseData.message);
                SetLoad(false);
            } else {
                // Alert.alert("Failed", responseData.message);
                handleShowAlert1(responseData.message);
                SetLoad(false);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            handleShowAlert2();
            SetLoad(false);
        }

    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Assign Employee Salary')
        }, 2500);
    };

    const [isAlertVisible1, setAlertVisible1] = useState(false);
    const [resMessageFail, setResMessageFail] = useState('');

    const handleShowAlert1 = (res) => {
        setAlertVisible1(true);
        setResMessageFail(res);
        setTimeout(() => {
            setAlertVisible1(false);
        }, 2500);
    };

    const [isAlertVisible2, setAlertVisible2] = useState(false);

    const handleShowAlert2 = () => {
        setAlertVisible2(true);
        setTimeout(() => {
            setAlertVisible2(false);
        }, 3000);
    };

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
                        {selectedDepartmentsErr}
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
                        {selectedMemberErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Start Date
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
                        End Date
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
                        CTC
                    </Text>

                    <TextInput
                        value={ctc}
                        onChangeText={(txt) => setCtc(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {ctcErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Gross Pay
                    </Text>

                    <TextInput
                        value={grossPay}
                        onChangeText={(txt) => setGrossPay(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {grossPayErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Net Pay
                    </Text>

                    <TextInput
                        value={netPay}
                        onChangeText={(txt) => setNetPay(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {netPayErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Basic + DA
                    </Text>

                    <TextInput
                        value={basic}
                        onChangeText={(txt) => setBasic(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {basicErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        HRA
                    </Text>

                    <TextInput
                        value={hra}
                        onChangeText={(txt) => setHra(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {hraErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Convenience Allowance
                    </Text>

                    <TextInput
                        value={cAllowance}
                        onChangeText={(txt) => setCAllowance(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {cAllowanceErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Transport Allowance
                    </Text>

                    <TextInput
                        value={tAllowance}
                        onChangeText={(txt) => setTAllowance(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {tAllowanceErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Medical Allowance
                    </Text>

                    <TextInput
                        value={mAllowance}
                        onChangeText={(txt) => setMAllowance(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {mAllowanceErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Other Allowance
                    </Text>

                    <TextInput
                        value={oAllowance}
                        onChangeText={(txt) => setOAllowance(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {oAllowanceErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Variable
                    </Text>

                    <TextInput
                        value={variable}
                        onChangeText={(txt) => setVariable(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {variableErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        PF
                    </Text>

                    <TextInput
                        value={pf}
                        onChangeText={(txt) => setPf(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {pfErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        EPF
                    </Text>

                    <TextInput
                        value={epf}
                        onChangeText={(txt) => setEpf(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {epfErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        ESI
                    </Text>

                    <TextInput
                        value={esi}
                        onChangeText={(txt) => setEsi(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {esiErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Salary Advance
                    </Text>

                    <TextInput
                        value={sAdvance}
                        onChangeText={(txt) => setSAdvance(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {sAdvanceErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Other Deduction
                    </Text>

                    <TextInput
                        value={oDeduction}
                        onChangeText={(txt) => setODeduction(txt)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {oDeductionErr}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownstatus} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus || "Selected Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {/* Dropdown to show the options */}

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
                        {statusError}
                    </Text>

                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.submitbutton}
                            onPress={AddAss}
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

                    <LottieAlertSucess
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
                    />

                </View>
            </View>

        </ScrollView>

    )
}

export default AssignEmpSalary;