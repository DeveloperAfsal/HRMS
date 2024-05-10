import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import styles from "../AddEmployee/style";
import BasicDetails from '../EditEmployee/BasicDetails/index';
import EmployeeDetails from '../EditEmployee/EmployeeDetails/index';
import EmployeeRole from '../EditEmployee/EmployeeRole/index';
import BankDetails from '../EditEmployee/BankDetails/index';
import Documents from '../EditEmployee/Documents/index';
import { useSelector } from "react-redux";
import axios from "axios";

const EditEmployee = ({ route, navigation }) => {

    const { id } = route.params;
    const { data } = useSelector((state) => state.login);

    const [activeComponent, setActiveComponent] = useState('BasicDetails');

    const renderComponent = (componentName) => {
        setActiveComponent(componentName);
    }

    const handleNextEmpDetails = () => {
        setActiveComponent('EmployeeDetails');
    }

    const handleNextEmpRole = () => {
        setActiveComponent('EmployeeRole');
    }

    const handleNextBankDetails = () => {
        setActiveComponent('BankDetails');
    }

    const handleNextDocuments = () => {
        setActiveComponent('Documents');
    }

    const handlePrevBankDetails = () => {
        setActiveComponent('BankDetails');
    }

    const handlePrevEmpRole = () => {
        setActiveComponent('EmployeeRole');
    }

    const handlePrevEmpDetails = () => {
        setActiveComponent('EmployeeDetails');
    }

    const handlePrevBasicDetails = () => {
        setActiveComponent('BasicDetails');
    }

    const [selectedImage, setSelectedImage] = useState([]);
    const [documentType, setDocumentType] = useState([]);
    const [documentName, setDocumentName] = useState([]);
    const [documentFile, setDocumentFile] = useState([]);
    const [documents, setDocuments] = useState([]);

    const [loading, setLoading] = useState(false);
    const [employee, setEmployee] = useState(null);
    const [employeeDoc, setEmployeeDoc] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://ocean21.in/api/public/api/employee_detailslitshow/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${data.token}`
                        }
                    }
                );
                const resData = response.data.data.employee_details;
                const resDoc = response.data.data.employee_documents;
                setEmployee(resData);
                setEmployeeDoc(resDoc);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);


    return (
        <ScrollView>

            <View style={styles.Page}>

                <View style={styles.container}>

                    <View style={styles.HeaderButtonView}>

                        <TouchableOpacity
                            style={
                                activeComponent === 'BasicDetails' ?
                                    styles.HeaderButtonActive : styles.HeaderButton
                            }
                            onPress={() => renderComponent('BasicDetails')}
                        >
                            <Text
                                style={
                                    activeComponent === 'BasicDetails' ?
                                        styles.HeaderButtonTextActive : styles.HeaderButtonText
                                }
                            >
                                1 . Basic Details
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={
                                activeComponent === 'EmployeeDetails' ?
                                    styles.HeaderButtonActive : styles.HeaderButton
                            }
                            onPress={() => renderComponent('EmployeeDetails')}
                        >
                            <Text
                                style={
                                    activeComponent === 'EmployeeDetails' ?
                                        styles.HeaderButtonTextActive : styles.HeaderButtonText
                                }
                            >
                                2 . Employee Details
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={
                                activeComponent === 'EmployeeRole' ?
                                    styles.HeaderButtonActive : styles.HeaderButton
                            }
                            onPress={() => renderComponent('EmployeeRole')}
                        >
                            <Text
                                style={
                                    activeComponent === 'EmployeeRole' ?
                                        styles.HeaderButtonTextActive : styles.HeaderButtonText
                                }
                            >
                                3 . Employee Role
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={
                                activeComponent === 'BankDetails' ?
                                    styles.HeaderButtonActive : styles.HeaderButton
                            }
                            onPress={() => renderComponent('BankDetails')}
                        >
                            <Text
                                style={
                                    activeComponent === 'BankDetails' ?
                                        styles.HeaderButtonTextActive : styles.HeaderButtonText
                                }
                            >
                                4 . Bank Details
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={
                                activeComponent === 'Documents' ?
                                    styles.HeaderButtonActive : styles.HeaderButton
                            }
                            onPress={() => renderComponent('Documents')}
                        >
                            <Text
                                style={
                                    activeComponent === 'Documents' ?
                                        styles.HeaderButtonTextActive : styles.HeaderButtonText
                                }
                            >
                                5 . Documents
                            </Text>
                        </TouchableOpacity>

                    </View>

                    {
                        activeComponent === 'BasicDetails' &&
                        <BasicDetails
                            onEmpDetails={handleNextEmpDetails}
                            selectedImage={selectedImage}
                            setSelectedImage={setSelectedImage}
                            employee={employee}
                            setEmployee={setEmployee}
                        />
                    }
                    {
                        activeComponent === 'EmployeeDetails' &&
                        <EmployeeDetails
                            onEmpRole={handleNextEmpRole}
                            onprevBasicDetails={handlePrevBasicDetails}
                            employee={employee}
                            setEmployee={setEmployee}
                        />
                    }
                    {
                        activeComponent === 'EmployeeRole' &&
                        <EmployeeRole
                            onBankDetails={handleNextBankDetails}
                            onprevEmpDetails={handlePrevEmpDetails}
                            employee={employee}
                            setEmployee={setEmployee}
                        />
                    }
                    {
                        activeComponent === 'BankDetails' &&
                        <BankDetails
                            onDetails={handleNextDocuments}
                            onprevEmpRole={handlePrevEmpRole}
                            employee={employee}
                            setEmployee={setEmployee}
                        />
                    }
                    {
                        activeComponent === 'Documents' &&
                        <Documents
                            onprevBankDetails={handlePrevBankDetails}
                            selectedImage={selectedImage}
                            setSelectedImage={setSelectedImage}
                            documents={documents}
                            documentFile={documentFile}
                            documentName={documentName}
                            documentType={documentType}
                            setDocuments={setDocuments}
                            setDocumentType={setDocumentType}
                            setDocumentName={setDocumentName}
                            setDocumentFile={setDocumentFile}
                            setEmployeeDoc={setEmployeeDoc}
                            employeeDoc={employeeDoc}
                        />
                    }

                </View>
            </View>
        </ScrollView>
    )
}

export default EditEmployee;