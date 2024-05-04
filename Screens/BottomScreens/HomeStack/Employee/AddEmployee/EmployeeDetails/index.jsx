import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import styles from "../style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const EmployeeDetails = ({ onEmpRole, onprevBasicDetails }) => {

    const dispatch = useDispatch();

    // data from redux store 

    const { data } = useSelector((state) => state.login);
    const { Employee } = useSelector((state) => state.Employee);

    const updateEmployeeFields = (updatedFields) => ({
        type: 'UPDATE_EMPLOYEE_FIELDS',
        payload: updatedFields
    });

    const handleFieldsChange = (fieldName, value) => {
        dispatch(updateEmployeeFields({ [fieldName]: value }));
    };

    // States

    const [showDropdown, setShowDropdown] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    // Api call for Category

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://ocean21.in/api/public/api/employee_categorylist';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;

                setCategoryList(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const selectCategory = (File) => {
        // setSelectedCategory(File.employee_category);
        // setSelectedCategoryId(File.id);
        handleFieldsChange('employeeCategory', File.employee_category);
        handleFieldsChange('selectedemployeeCategory', File.id);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    // 

    const [showPF, setShowPF] = useState(false);
    const [selectedPF, setSelectedPF] = useState(null);

    const toggleDropdownPF = () => {
        setShowPF(!showPF);
    };

    const selectPF = (PF) => {
        // setSelectedPF(PF);
        setShowPF(false);
        handleFieldsChange('providentFund', PF);
    };

    // 

    const [showESI, setShowESI] = useState(false);
    const [selectedESI, setSelectedESI] = useState(null);

    const toggleDropdownESI = () => {
        setShowESI(!showESI);
    };

    const selectESI = (ESI) => {
        // setSelectedESI(ESI);
        setShowESI(false);
        handleFieldsChange('esi', ESI);
    };

    return (

        <View style={styles.InputContainer}>

            <Text style={styles.Heading}>
                Employee Details
            </Text>

            <Text style={styles.subHeading}>
                Employee Category
            </Text>

            <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>
                    {Employee.employeeCategory && Employee.employeeCategory.length > 0 ? Employee.employeeCategory : "Selected Category Type"}
                </Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showDropdown && (
                <View style={styles.dropdown}>
                    {categoryList.map((File, index) => (

                        <TouchableOpacity key={index} onPress={() => selectCategory(File)} style={styles.dropdownOption}>
                            <Text style={styles.dropdownOptionText}>{File.employee_category}</Text>
                        </TouchableOpacity>

                    ))}
                </View>
            )}

            <Text style={styles.subHeading}>
                Date Of Joining
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.dateOfJoining}
                onChangeText={(text) => handleFieldsChange('dateOfJoining', text)}
            />

            <Text style={styles.subHeading}>
                Probation Period
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.probationPeriod}
                onChangeText={(text) => handleFieldsChange('probationPeriod', text)}
            />

            <Text style={styles.subHeading}>
                Confirmation Date
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.confirmationDate}
                onChangeText={(text) => handleFieldsChange('confirmationDate', text)}
            />

            <Text style={styles.subHeading}>
                Employee Agreement Period
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.employeeAgreementPeriod}
                onChangeText={(text) => handleFieldsChange('employeeAgreementPeriod', text)}
            />
            <Text style={styles.subHeading}>
                Notice Period
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.noticePeriod}
                onChangeText={(text) => handleFieldsChange('noticePeriod', text)}
            />

            <Text style={styles.subHeading}>
                CTC
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.ctc}
                onChangeText={(text) => handleFieldsChange('ctc', text)}
            />
            <Text style={styles.subHeading}>
                Gross Salary
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.grossSalary}
                onChangeText={(text) => handleFieldsChange('grossSalary', text)}
            />

            <Text style={styles.subHeading}>
                Net Salary
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.netSalary}
                onChangeText={(text) => handleFieldsChange('netSalary', text)}
            />

            <Text style={styles.subHeading}>
                Last Working Day
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.lastWorkingDay}
                onChangeText={(text) => handleFieldsChange('lastWorkingDay', text)}
            />

            <Text style={styles.subHeading}>
                PF
            </Text>

            <TouchableOpacity onPress={toggleDropdownPF} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>{Employee.providentFund || "Selected Field"}</Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showPF && (

                <View style={styles.dropdown}>

                    <TouchableOpacity onPress={() => selectPF("Applicable")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Applicable</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectPF("NA")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>NA</Text>
                    </TouchableOpacity>

                </View>

            )}


            {
                Employee.providentFund === "Applicable" ?
                    <>
                        <Text style={styles.subHeading}>
                            UAN Number
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={Employee.uanNumber}
                            onChangeText={(text) => handleFieldsChange('uanNumber', text)}
                        />

                        <Text style={styles.subHeading}>
                            Employee PF Contribution
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={Employee.employeePfContribution}
                            onChangeText={(text) => handleFieldsChange('employeePfContribution', text)}
                        />

                        <Text style={styles.subHeading}>
                            Employer PF Contribution
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={Employee.employerPfContribution}
                            onChangeText={(text) => handleFieldsChange('employerPfContribution', text)}
                        />
                    </>
                    : null
            }



            <Text style={styles.subHeading}>
                ESI
            </Text>

            <TouchableOpacity onPress={toggleDropdownESI} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>{Employee.esi || "Selected Field"}</Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showESI && (

                <View style={styles.dropdown}>

                    <TouchableOpacity onPress={() => selectESI("Applicable")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>Applicable</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectESI("NA")} style={styles.dropdownOption}>
                        <Text style={styles.dropdownOptionText}>NA</Text>
                    </TouchableOpacity>

                </View>

            )}

            {
                Employee.esi === "Applicable" ?
                    <>
                        <Text style={styles.subHeading}>
                            ESI Number
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={Employee.esiNumber}
                            onChangeText={(text) => handleFieldsChange('esiNumber', text)}
                        />

                        <Text style={styles.subHeading}>
                            Employee ESI Contribution
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={Employee.employeeEsiContribution}
                            onChangeText={(text) => handleFieldsChange('employeeEsiContribution', text)}
                        />

                        <Text style={styles.subHeading}>
                            Employer ESI Contribution
                        </Text>

                        <TextInput
                            style={styles.input}
                            value={Employee.employerEsiContribution}
                            onChangeText={(text) => handleFieldsChange('employerEsiContribution', text)}
                        />
                    </>
                    : null
            }

            <View style={[styles.fullWidth, styles.Row, styles.Left]}>
                <TouchableOpacity style={styles.PrevButton} onPress={onprevBasicDetails}>
                    <ArrowLeftIcon width={14} height={14} color={'#0A62F1'} />
                    <Text style={styles.PrevButtonText}>
                        Previous
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.NextButton} onPress={onEmpRole}>
                    <Text style={styles.NextButtonText}>
                        Next
                    </Text>
                    <ArrowRightIcon width={14} height={14} color={'#fff'} />
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default EmployeeDetails;