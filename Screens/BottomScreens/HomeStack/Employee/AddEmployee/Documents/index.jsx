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

const Documents = ({
    onprevBankDetails,
    selectedImage,
    setSelectedImage,
    documentFile,
    documentName,
    documentType,
    setDocumentType,
    setDocumentName,
    setDocumentFile,
    setDocuments,
    documents,
    navigation
}) => {

    const dispatch = useDispatch();

    // data from redux store 

    const { data } = useSelector((state) => state.login);
    const { Employee } = useSelector((state) => state.Employee);

    const updateEmployeeFields = (updatedFields) => ({
        type: 'UPDATE_EMPLOYEE_FIELDS',
        payload: updatedFields
    });

    const removeEmployeeFields = () => ({
        type: 'REMOVE_EMPLOYEE'
    });

    // state

    const [showDropdown, setShowDropdown] = useState(false);
    const [documentList, setDocumentList] = useState([]);

    const [docFile, setDocFile] = useState();
    const [docName, setDocName] = useState();
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [selectedDocumentId, setSelectedDocumentId] = useState(null);

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
        setSelectedDocument(File.document_name);
        setSelectedDocumentId(File.id);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    // 

    const addDocument = () => {
        if (selectedDocumentId && docName && docFile && selectedDocument) {

            const newDocument = {
                type: selectedDocument,
                name: docName,
                file: docFile[0]
            };

            setDocuments(prevDocuments => [...prevDocuments, newDocument]);
            setDocumentType(prevDocumentTypes => [...prevDocumentTypes, selectedDocumentId]);
            setDocumentName(prevDocumentNames => [...prevDocumentNames, docName]);
            setDocumentFile(prevDocumentFiles => [...prevDocumentFiles, docFile[0]]);

            setSelectedDocument([]);
            setDocName('');
            setDocFile('');

        } else {
            Alert.alert('data not addded')
        }
    };

    // Delete document from list

    const deleteDocument = (index) => {
        const updatedDocuments = [...documents];
        updatedDocuments.splice(index, 1);
        setDocuments(updatedDocuments);
    };


    // Function to handle document selection

    const handleDocumentSelection = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setDocFile(res);
            // handleFieldsChange('selectedFile', res);
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

        if (selectedImage.length > 0) {
            selectedImage.map((selectedImage, index) => {
                const imageUriParts = selectedImage.split('/');
                const imageName = imageUriParts[imageUriParts.length - 1];
                formData.append(`emp_profile`, {
                    uri: selectedImage,
                    name: imageName,
                    type: 'image/jpeg',
                });
            });
        }
        else {
            formData.append('emp_profile', selectedImage);
        }

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
        formData.append('parent_guardian_name', Employee.parentName);
        formData.append('marital_status', Employee.maritalStatus);
        formData.append('spouse_name', Employee.spouseName);
        formData.append('aadhar_no', Employee.aadharNumber);
        formData.append('pan_no', Employee.panNumber);

        if (!Employee.selectedemployeeCategory) {
            formData.append('employee_category', "-");
        } else {
            formData.append('employee_category', Employee.selectedemployeeCategory);
        }

        if (!Employee.dateOfJoining) {
            formData.append('doj', "-");
        } else {
            formData.append('doj', Employee.dateOfJoining);
        }

        formData.append('probation_period', Employee.probationPeriod);
        formData.append('confiramation_date', Employee.confirmationDate);
        formData.append('employee_agree_period', Employee.employeeAgreementPeriod);

        if (!Employee.noticePeriod) {
            formData.append('notice_period', "-");
        } else {
            formData.append('notice_period', Employee.noticePeriod);
        }

        if (!Employee.ctc) {
            formData.append('ctc', "-");
        } else {
            formData.append('ctc', Employee.ctc);
        }

        if (!Employee.grossSalary) {
            formData.append('gross_salary', "-");
        } else {
            formData.append('gross_salary', Employee.grossSalary);
        }

        if (!Employee.netSalary) {
            formData.append('net_salary', "-");
        } else {
            formData.append('net_salary', Employee.netSalary);
        }

        formData.append('last_working_day', Employee.lastWorkingDay);

        if (!Employee.providentFund) {
            formData.append('emp_pf', "-");
        } else {
            formData.append('emp_pf', Employee.providentFund);
        }

        if (!Employee.uanNumber) {
            formData.append('uan_number', "-");
        } else {
            formData.append('uan_number', Employee.uanNumber);
        }

        if (!Employee.employeePfContribution) {
            formData.append('employee_pf_contribution', "-");
        } else {
            formData.append('employee_pf_contribution', Employee.employeePfContribution);
        }

        if (!Employee.employerPfContribution) {
            formData.append('employer_pf_contribution', "-");
        } else {
            formData.append('employer_pf_contribution', Employee.employerPfContribution);
        }

        if (!Employee.esi) {
            formData.append('emp_esi', "-");
        } else {
            formData.append('emp_esi', Employee.esi);
        }

        if (!Employee.esiNumber) {
            formData.append('esi_number', "-");
        } else {
            formData.append('esi_number', Employee.esiNumber);
        }

        if (!Employee.employeeEsiContribution) {
            formData.append('employee_esi_contribution', "-");
        } else {
            formData.append('employee_esi_contribution', Employee.employeeEsiContribution);
        }

        if (!Employee.employerEsiContribution) {
            formData.append('employer_esi_contribution', "-");
        } else {
            formData.append('employer_esi_contribution', Employee.employerEsiContribution);
        }

        if (!Employee.selectedRoleId) {
            formData.append('role', "-");
        } else {
            formData.append('role', Employee.selectedRoleId);
        }

        if (!Employee.designation) {
            formData.append('designation', "-");
        } else {
            formData.append('designation', Employee.designation);
        }

        if (!Employee.selectedsupervisorId) {
            formData.append('supervisor', "-");
        } else {
            formData.append('supervisor', Employee.selectedsupervisorId);
        }

        if (!Employee.officialEmail) {
            formData.append('official_email', "-");
        } else {
            formData.append('official_email', Employee.officialEmail);
        }

        if (!Employee.password) {
            formData.append('password', "-");
        } else {
            formData.append('password', Employee.password);
        }

        if (!Employee.checkinCheckoutId) {
            formData.append('emp_punch', "-");
        } else {
            formData.append('emp_punch', Employee.checkinCheckoutId);
        }

        formData.append('ot_status', Employee.overtime);
        formData.append('late_policy', Employee.lateAllowed);
        formData.append('permission_policy', Employee.permissionAllowed);

        formData.append('account_number', Employee.bankAccountNumber);
        formData.append('bank_name', Employee.bankName);
        formData.append('branch_name', Employee.bankBranch);
        formData.append('ifsc_code', Employee.ifscCode);
        formData.append('account_type', Employee.accountType);

        if (documentType.length > 0) {
            documentType.map((file, index) => {
                formData.append('emp_document_type[]', file);
            });
        } else {
            formData.append('emp_document_type[]', documentType);
        }

        if (documentName.length > 0) {
            documentName.map((file, index) => {
                formData.append('emp_document_name[]', file);
            });
        } else {
            formData.append('emp_document_name[]', documentName);
        }

        if (documentFile.length > 0) {
            documentFile.map((file, index) => {
                let uri, name;
                if (typeof file === 'string') {
                    const imageUriParts = file.split('/');
                    name = imageUriParts[imageUriParts.length - 1];
                    uri = file;
                } else {
                    name = file.name;
                    uri = file.uri;
                }
                formData.append(`emp_document_image[]`, {
                    uri: uri,
                    name: name,
                    type: 'image/jpeg',
                });
            });
        } else {
            formData.append('emp_document_image[]', documentFile);
        }

        formData.append('created_by', data.userrole);

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

            if (response.status === "success") {
                navigation.navigate('Employee List');
            }

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
                    {selectedDocument && selectedDocument.length > 0 ? selectedDocument : "Selected Document Type"}
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
                // value={Employee.documentName}
                // onChangeText={(text) => handleFieldsChange('documentName', text)}
                value={docName}
                onChangeText={(text) => setDocName(text)}
            />

            <Text style={styles.subHeading}>
                Select File
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

            <View style={styles.fullWidth}>
                <TouchableOpacity style={styles.NextButton}
                    onPress={addDocument}
                >
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
                        documents.length === 0 ? (
                            <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                        ) : (
                            documents.map((doc, index) => (
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

