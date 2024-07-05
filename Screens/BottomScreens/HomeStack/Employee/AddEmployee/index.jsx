import React, { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import styles from "./style";
import BasicDetails from '../AddEmployee/BasicDetails/index';
import EmployeeDetails from '../AddEmployee/EmployeeDetails/index';
import EmployeeRole from '../AddEmployee/EmployeeRole/index';
import BankDetails from '../AddEmployee/BankDetails/index';
import Documents from '../AddEmployee/Documents/index';

const AddEmployee = () => {

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
    const [selectedImageErr, setSelectedImageErr] = useState([]);
    const [documentType, setDocumentType] = useState([]);
    const [documentName, setDocumentName] = useState([]);
    const [documentFile, setDocumentFile] = useState([]);
    const [documents, setDocuments] = useState([]);


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
                        // onPress={() => renderComponent('BasicDetails')}
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
                        // onPress={() => renderComponent('EmployeeDetails')}
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
                        // onPress={() => renderComponent('EmployeeRole')}
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
                        // onPress={() => renderComponent('BankDetails')}
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
                        // onPress={() => renderComponent('Documents')}
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
                        />
                    }
                    {
                        activeComponent === 'EmployeeDetails' &&
                        <EmployeeDetails
                            onEmpRole={handleNextEmpRole}
                            onprevBasicDetails={handlePrevBasicDetails} />
                    }
                    {
                        activeComponent === 'EmployeeRole' &&
                        <EmployeeRole
                            onBankDetails={handleNextBankDetails}
                            onprevEmpDetails={handlePrevEmpDetails} />
                    }
                    {
                        activeComponent === 'BankDetails' &&
                        <BankDetails
                            onDetails={handleNextDocuments}
                            onprevEmpRole={handlePrevEmpRole} />
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
                        />
                    }

                </View>
            </View>
        </ScrollView>
    )
}

export default AddEmployee;