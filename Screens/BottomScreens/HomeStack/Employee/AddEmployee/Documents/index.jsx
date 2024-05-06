import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import styles from "../style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";
import DeleteIcon from "../../../../../../Assets/Icons/Delete.svg";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DocumentPicker from 'react-native-document-picker';

const Documents = ({ onprevBankDetails }) => {

    const dispatch = useDispatch();

    // data from redux store 

    const { data } = useSelector((state) => state.login);
    const { Employee } = useSelector((state) => state.Employee);

    console.log(
        'employee_id:', Employee.employeeId,
        'emp_profile:', Employee.employeePicture,
        'first_name:', Employee.firstName,
        'last_name:', Employee.lastName,
        'gender:', Employee.gender,
        'status:', Employee.status,
        'mobile_number:', Employee.phoneNumber,
        'whatsapp_number:', Employee.whatsappNumber,
        'email_id:', Employee.email,
        'date_of_birth:', Employee.dob,
        'current_address:', Employee.currentAddress,
        'permanent_address:', Employee.permanentAddress,
        'parent_gardian_name:', Employee.parentName,
        'marital_status:', Employee.maritalStatus,
        'spouse_name:', Employee.spouseName,
        'aadhar_no:', Employee.aadharNumber,
        'pan_no:', Employee.panNumber,

        'employee_category:', Employee.employeeCategory,
        'selectedemployeeCategory:', Employee.selectedemployeeCategory,
        'doj:', Employee.dateOfJoining,
        'probation_period:', Employee.probationPeriod,
        'confiramation_date:', Employee.confirmationDate,
        'employee_agree_period:', Employee.employeeAgreementPeriod,
        'notice_period:', Employee.noticePeriod,
        'ctc:', Employee.ctc,
        'gross_salary:', Employee.grossSalary,
        'net_salary:', Employee.netSalary,
        'last_working_day:', Employee.lastWorkingDay,
        'emp_pf:', Employee.providentFund,
        'uan_number:', Employee.uanNumber,
        'employee_pf_contribution:', Employee.employeePfContribution,
        'employeer_pf_contribution:', Employee.employerPfContribution,
        'emp_esi:', Employee.esi,
        'esi_number:', Employee.esiNumber,
        'employee_esi_contribution:', Employee.employeeEsiContribution,
        'employeer_esi_contribution:', Employee.employerEsiContribution,

        'role:', Employee.userRole,
        'selectedRoleId:', Employee.selectedRoleId,
        'designation:', Employee.designation,
        'supervisor:', Employee.supervisor,
        'selectedsupervisorId:', Employee.selectedsupervisorId,
        'official_email:', Employee.officialEmail,
        'password:', Employee.password,
        'emp_punch:', Employee.checkinCheckoutId,
        'ot_status:', Employee.overtime,
        'late_policy:', Employee.lateAllowed,
        'permission_policy:', Employee.permissionAllowed,

        'account_number:', Employee.bankAccountNumber,
        'bank_name:', Employee.bankName,
        'branch_name:', Employee.bankBranch,
        'ifsc_code:', Employee.ifscCode,
        'account_type:', Employee.accountType,

        'emp_document_type:', Employee.documentType,
        'emp_document_name:', Employee.documentName,
        'emp_document_image:', Employee.selectedFile,
        'created_by:', data.userrole,

        'documents:', Employee.documents,
    )

    const updateEmployeeFields = (updatedFields) => ({
        type: 'UPDATE_EMPLOYEE_FIELDS',
        payload: updatedFields
    });

    const removeEmployeeFields = () => ({
        type: 'REMOVE_EMPLOYEE'
    });

    const handleFieldsChange = (fieldName, value) => {
        dispatch(updateEmployeeFields({ [fieldName]: value }));
    };

    // state

    const [showDropdown, setShowDropdown] = useState(false);
    const [documentList, setDocumentList] = useState([]);

    // Api call for Dropdown dropdown

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://ocean21.in/api/public/api/employee_document_typelist';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responseData = response.data.data;

                setDocumentList(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const selectDocument = (File) => {
        handleFieldsChange('documentType', File.document_name);
        handleFieldsChange('documentTypeId', File.id);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    // Add document to list

    const addDocument = () => {

        if (Employee.documentType && Employee.documentName && Employee.selectedFile) {
            const newDocument = {
                id: Employee.documents.length + 1,
                type: Employee.documentType,
                name: Employee.documentName,
                File: Employee.selectedFile[0],
            };

            dispatch(updateEmployeeFields({
                ...Employee,
                documents: [...Employee.documents, newDocument],
                // documentType: '',
                // documentName: '',
                // selectedFile: null
            }));

        }
    };

    // Delete document from list

    const deleteDocument = (id) => {
        const updatedDocuments = Employee.documents.filter((doc) => doc.id !== id);
        dispatch(updateEmployeeFields({ documents: updatedDocuments }));
    };

    // Function to handle document selection

    const handleDocumentSelection = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            handleFieldsChange('selectedFile', res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Document picker is cancelled');
            } else {
                console.error('Error while picking the document:', err);
            }
        }

    };

    // Handle Submit

    const HandleSubmit = async () => {

        const formData = new FormData();

        //append data

        formData.append('employee_id', Employee.employeeId);
        formData.append('emp_profile', Employee.employeePicture);
        formData.append('first_name', Employee.firstName);
        formData.append('last_name', Employee.lastName);
        formData.append('gender', Employee.gender);
        formData.append('status', Employee.status);
        formData.append('mobile_number', Employee.phoneNumber);
        formData.append('whatsapp_number', Employee.whatsappNumber);
        formData.append('email_id', Employee.email);
        formData.append('date_of_birth', Employee.dob);
        formData.append('current_address', Employee.currentAddress);
        formData.append('permanent_address', Employee.permanentAddress);
        formData.append('parent_gardian_name', Employee.parentName);
        formData.append('marital_status', Employee.maritalStatus);
        formData.append('spouse_name', Employee.spouseName);
        formData.append('aadhar_no', Employee.aadharNumber);
        formData.append('pan_no', Employee.panNumber);

        // formData.append('employee_category', Employee.employeeCategory);
        formData.append('selectedemployeeCategory', Employee.selectedemployeeCategory);
        formData.append('doj', Employee.dateOfJoining);
        formData.append('probation_period', Employee.probationPeriod);
        formData.append('confiramation_date', Employee.confirmationDate);
        formData.append('employee_agree_period', Employee.employeeAgreementPeriod);
        formData.append('notice_period', Employee.noticePeriod);
        formData.append('ctc', Employee.ctc);
        formData.append('gross_salary', Employee.grossSalary);
        formData.append('net_salary', Employee.netSalary);
        formData.append('last_working_day', Employee.lastWorkingDay);
        formData.append('emp_pf', Employee.providentFund);
        formData.append('uan_number', Employee.uanNumber);
        formData.append('employee_pf_contribution', Employee.employeePfContribution);
        formData.append('employeer_pf_contribution', Employee.employerPfContribution);
        formData.append('emp_esi', Employee.esi);
        formData.append('esi_number', Employee.esiNumber);
        formData.append('employee_esi_contribution', Employee.employeeEsiContribution);
        formData.append('employeer_esi_contribution', Employee.employerEsiContribution);

        // formData.append('role', Employee.userRole);
        formData.append('selectedRoleId', Employee.selectedRoleId);
        formData.append('designation', Employee.designation);
        // formData.append('supervisor', Employee.supervisor);
        formData.append('selectedsupervisorId', Employee.selectedsupervisorId);
        // formData.append('shift_role', Employee.shiftRole);
        formData.append('official_email', Employee.officialEmail);
        formData.append('password', Employee.password);
        formData.append('emp_punch', Employee.checkinCheckoutId);
        // formData.append('emp_punch', Employee.checkinCheckout);
        formData.append('ot_status', Employee.overtime);
        formData.append('late_policy', Employee.lateAllowed);
        formData.append('permission_policy', Employee.permissionAllowed);

        formData.append('account_number', Employee.bankAccountNumber);
        formData.append('bank_name', Employee.bankName);
        formData.append('branch_name', Employee.bankBranch);
        formData.append('ifsc_code', Employee.ifscCode);
        formData.append('account_type', Employee.accountType);

        // formData.append('emp_document_type', Employee.documentType);
        formData.append('emp_document_type', Employee.documentTypeId);
        formData.append('emp_document_name', Employee.documentName);
        formData.append('emp_document_image', Employee.selectedFile);
        formData.append('created_by', data.userepkempid);


        try {

            const response = await fetch('https://ocean21.in/api/public/api/add_employee', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${data.token}`
                },
                body: formData,
            });

            const responsedata = await response.json();

            console.log(responsedata, "appended")

        } catch (error) {
            Alert.alert('Failed to add Employee', error)
        }
    }

    // Handle Cancel

    const HandleCancel = () => {
        dispatch(removeEmployeeFields());
    }

    return (

        <View style={styles.InputContainer}>

            <Text style={styles.Heading}>
                Documents
            </Text>

            <Text style={styles.subHeading}>
                Document Type
            </Text>

            <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>
                    {Employee.documentType && Employee.documentType.length > 0 ? Employee.documentType : "Selected Document Type"}
                </Text>
                <DropdownIcon width={14} height={14} color={"#000"} />

            </TouchableOpacity>

            {showDropdown && (
                <View style={styles.dropdown}>
                    {documentList.map((File, index) => (

                        <TouchableOpacity key={index} onPress={() => selectDocument(File)} style={styles.dropdownOption}>
                            <Text style={styles.dropdownOptionText}>{File.document_name}</Text>
                        </TouchableOpacity>

                    ))}
                </View>
            )}

            <Text style={styles.subHeading}>
                Document Name
            </Text>

            <TextInput
                style={styles.input}
                value={Employee.documentName}
                onChangeText={(text) => handleFieldsChange('documentName', text)}
            />

            <Text style={styles.subHeading}>
                Select File
            </Text>

            <Text style={Employee.selectedFile && Employee.selectedFile.length > 0 ? styles.DocFileName : styles.DocFileNameHolder}>
                {Employee.selectedFile && Employee.selectedFile.length > 0 ? Employee.selectedFile[0].name : 'Select The Document'}
            </Text>

            <View style={styles.fullWidth}>
                <TouchableOpacity style={styles.UploadButton} onPress={handleDocumentSelection}>
                    <Text style={styles.UploadButtonText}>
                        Select Document
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.fullWidth}>
                <TouchableOpacity style={styles.NextButton} onPress={addDocument}>
                    <Text style={styles.NextButtonText}>
                        ADD
                    </Text>
                    <ArrowRightIcon width={14} height={14} color={'#fff'} />
                </TouchableOpacity>
            </View>

            <Text style={styles.Heading}>
                Documents List
            </Text>

            <View style={styles.RolelistContainer}>

                <View style={styles.listContainer}>


                    <View style={styles.listHeader}>
                        <Text style={styles.sno}>S.No</Text>
                        <Text style={styles.RoleName}>Document Name</Text>
                        <Text style={styles.Action}>Action</Text>
                    </View>


                    {
                        Employee.documents.length === 0 ? (
                            <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                        ) : (
                            Employee.documents.map((doc, index) => (
                                <View key={index} style={styles.listcontent}>
                                    <Text style={styles.listcontentsno}>{index + 1}</Text>
                                    <Text style={styles.listcontentRoleName}>{doc.name}</Text>
                                    <View style={styles.listcontentButtonview}>
                                        <TouchableOpacity onPress={() => deleteDocument(doc.id)} style={styles.listcontentdelbutton}>
                                            <DeleteIcon width={14} height={14} color={"#000"} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        )
                    }

                </View>

            </View>

            <View style={[styles.fullWidth, styles.Row, styles.Left]}>
                <TouchableOpacity style={styles.PrevButton} onPress={onprevBankDetails}>
                    <ArrowLeftIcon width={14} height={14} color={'#0A62F1'} />
                    <Text style={styles.PrevButtonText}>
                        Previous
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.NextButton} onPress={HandleSubmit}>
                    <Text style={styles.NextButtonText}>
                        Submit
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.PrevButton} onPress={HandleCancel}>
                    <Text style={styles.PrevButtonText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default Documents;