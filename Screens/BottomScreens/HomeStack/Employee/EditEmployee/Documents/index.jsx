import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import styles from "../../AddEmployee/style";
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
    employeeDoc,
    setEmployeeDoc,
    navigation,
    setEmployee,
    employee,
}) => {
console.log(employee.password,"employee")
    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // state

    const [showDropdown, setShowDropdown] = useState(false);
    const [documentList, setDocumentList] = useState([]);

    const [docFile, setDocFile] = useState();
    const [docName, setDocName] = useState();
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [selectedDocumentId, setSelectedDocumentId] = useState(null);
    const [load, setLoad] = useState(false);

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
                document_name: selectedDocument,
                document_type_id: selectedDocumentId,
                document_type_name: selectedDocument,
                emp_id: data.emp_id, // Assuming data.emp_id holds the employee ID
                document_img: docFile[0].uri // Assuming docFile is an array of File objects and you want to store the URI
            };

            // Update employeeDoc state
            setEmployeeDoc(prevEmployeeDoc => [...prevEmployeeDoc, newDocument]);

            // Update other related states
            setDocumentType(prevDocumentTypes => [...prevDocumentTypes, selectedDocumentId]);
            setDocumentName(prevDocumentNames => [...prevDocumentNames, docName]);
            setDocumentFile(prevDocumentFiles => [...prevDocumentFiles, docFile[0]]);

            setSelectedDocument([]);
            setDocName('');
            setDocFile('');

        } else {
            Alert.alert('Please fill in all fields');
        }
    };


    // Delete document from list

    const deleteDocument = (index) => {
        const updatedEmployeeDoc = [...employeeDoc];
        updatedEmployeeDoc.splice(index, 1);
        setEmployeeDoc(updatedEmployeeDoc);
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

        setLoad(true);

        const formData = new FormData();

        //append data

        formData.append('id', employee.id);

        formData.append('employee_id', employee.hrms_emp_id);

        if (selectedImage.length > 0) {
            selectedImage.map((selectedImg, index) => {
                const imageUriParts = selectedImg.split('/');
                const imageName = imageUriParts[imageUriParts.length - 1];
                formData.append(`emp_profile`, {
                    uri: selectedImg,
                    name: imageName,
                    type: 'image/jpeg',
                });
            });
        }
        else {
            formData.append('emp_profile', employee.profile_img);
        }

        formData.append('first_name', employee.first_name);
        formData.append('last_name', employee.last_name);
        formData.append('gender', employee.gender);
        formData.append('status', employee.emp_status);
        formData.append('mobile_number', employee.mobile_no);
        formData.append('whatsapp_number', employee.whatsapp);
        formData.append('email_id', employee.email);
        formData.append('date_of_birth', employee.dob);
        formData.append('current_address', employee.current_address);
        formData.append('permanent_address', employee.address);
        formData.append('parent_guardian_name', employee.parents);
        formData.append('marital_status', employee.marital_status);
        formData.append('spouse_name', employee.spouse_name);
        formData.append('aadhar_no', employee.aadhar_number);
        formData.append('pan_no', employee.pan_number);

        if (!employee.employee_category) {
            formData.append('employee_category', "-");
        } else {
            formData.append('employee_category', employee.employee_category);
        }

        if (!employee.doj) {
            formData.append('doj', "-");
        } else {
            formData.append('doj', employee.doj);
        }

        formData.append('probation_period', employee.probation_period);

        if (!employee.confirmation_date) {
            formData.append('confiramation_date', "-");
        } else {
            formData.append('confiramation_date', employee.confirmation_date);
        }

        formData.append('employee_agree_period', employee.emp_aggrement);

        if (!employee.notices_period) {
            formData.append('notice_period', "-");
        } else {
            formData.append('notice_period', employee.notices_period);
        }

        if (!employee.ctc) {
            formData.append('ctc', "-");
        } else {
            formData.append('ctc', employee.ctc);
        }

        if (!employee.emp_grosssalary) {
            formData.append('gross_salary', "-");
        } else {
            formData.append('gross_salary', employee.emp_grosssalary);
        }

        if (!employee.emp_salary) {
            formData.append('net_salary', "-");
        } else {
            formData.append('net_salary', employee.emp_salary);
        }

        formData.append('last_working_day', employee.last_working_date);

        if (!employee.emp_pf) {
            formData.append('emp_pf', "-");
        } else {
            formData.append('emp_pf', employee.emp_pf);
        }

        if (!employee.uan_number) {
            formData.append('uan_number', "-");
        } else {
            formData.append('uan_number', employee.uan_number);
        }

        if (!employee.employee_contribution) {
            formData.append('employee_pf_contribution', "-");
        } else {
            formData.append('employee_pf_contribution', employee.employee_contribution);
        }

        if (!employee.employeer_contribution) {
            formData.append('employer_pf_contribution', "-");
        } else {
            formData.append('employer_pf_contribution', employee.employeer_contribution);
        }

        if (!employee.emp_esi) {
            formData.append('emp_esi', "-");
        } else {
            formData.append('emp_esi', employee.emp_esi);
        }

        if (!employee.esi_number) {
            formData.append('esi_number', "-");
        } else {
            formData.append('esi_number', employee.esi_number);
        }

        if (!employee.employee_esi_contribution) {
            formData.append('employee_esi_contribution', "-");
        } else {
            formData.append('employee_esi_contribution', employee.employee_esi_contribution);
        }

        if (!employee.employeer_esi_contribution) {
            formData.append('employer_esi_contribution', "-");
        } else {
            formData.append('employer_esi_contribution', employee.employeer_esi_contribution);
        }

        if (!employee.role_name) {
            formData.append('role', "-");
        } else {
            formData.append('role', employee.role_id);
        }

        if (!employee.department_name) {
            formData.append('designation', "-");
        } else {
            formData.append('designation', employee.department_name);
        }

        if (!employee.supervisor_role_name) {
            formData.append('supervisor', "-");
        } else {
            formData.append('supervisor', employee.supervisor);
        }

        if (!employee.official_email) {
            formData.append('official_email', "-");
        } else {
            formData.append('official_email', employee.official_email);
        }

        if (!employee.password) {
            formData.append('password', "-");
        } else {
            formData.append('password', employee.password);
        }

        if (!employee.emp_punch) {
            formData.append('emp_punch', "-");
        } else {
            formData.append('emp_punch', employee.emp_punch);
        }

        formData.append('ot_status', employee.ot_status);
        formData.append('late_policy', employee.late_policy);
        formData.append('permission_policy', employee.permission_policy);

        formData.append('account_number', employee.bank_accountnumber);
        formData.append('bank_name', employee.bank_name);
        formData.append('branch_name', employee.bank_branch);
        formData.append('ifsc_code', employee.ifsc_code);
        formData.append('account_type', employee.ac_type);

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

        formData.append('updated_by', data.userrole);

        if (selectedImage.length > 0) {
            selectedImage.map((selectedImg, index) => {
                const imageUriParts = selectedImg.split('/');
                const imageName = imageUriParts[imageUriParts.length - 1];
                formData.append(`old_profileimg`, {
                    uri: selectedImg,
                    name: imageName,
                    type: 'image/jpeg',
                });
            });
        }
        else {
            formData.append('old_profileimg', employee.profile_img);
        }

        try {

            const response = await fetch('https://ocean21.in/api/public/api/update_employee_details', {
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

            if (responsedata.status === "success") {
                // navigation.navigate('Employee List');
                Alert.alert('Submitted', 'Employee Details Updated');
                setLoad(false);
            }

        } catch (error) {
            Alert.alert('Failed to add Employee', error);
            setLoad(false);
        }

    }

    // Handle Cancel

    const HandleCancel = () => {
        // navigation.navigate('Employee List');
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
                        employeeDoc.length === 0 ? (
                            <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                        ) : (
                            employeeDoc.map((doc, index) => (
                                <View key={index} style={styles.listcontent}>
                                    <Text style={styles.listcontentsno}>{index + 1}</Text>
                                    <Text style={styles.listcontentRoleName}>{doc.document_name}</Text>
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
                    { load ? <ActivityIndicator size={"small"} color={"#fff"}/>:<Text style={styles.NextButtonText}>
                        Submit
                    </Text>}
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






