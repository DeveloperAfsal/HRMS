import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import styles from "../style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";
import DeleteIcon from "../../../../../../Assets/Icons/Delete.svg";
import DropdownIcon from "../../../../../../Assets/Icons/Dropdowndownarrow.svg"
import { useSelector } from "react-redux";
import axios from "axios";
import DocumentPicker from 'react-native-document-picker';

const Documents = ({ onprevBankDetails }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // state

    const [loadData, setLoadData] = useState(false);

    const [docFile, setDocFile] = useState();
    const [docName, setDocName] = useState();
    const [showDropdown, setShowDropdown] = useState(false);
    const [documentList, setDocumentList] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [selectedDocumentId, setSelectedDocumentId] = useState(null);

    const [documents, setDocuments] = useState([]);

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

    // Add document to list

    const addDocument = () => {
        if (selectedDocument && docName && docFile) {
            const newDocument = {
                id: documents.length + 1,
                type: selectedDocument,
                name: docName,
                File: docFile[0],
            };
            setDocuments([...documents, newDocument]);
            // Reset form fields
            setSelectedDocument(null);
            setDocName("");
            setDocFile("");
        }
    };

    // Delete document from list

    const deleteDocument = (id) => {
        setDocuments(documents.filter((doc) => doc.id !== id));
    };

    // Function to handle document selection

    const handleDocumentSelection = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setDocFile(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Document picker is cancelled');
            } else {
                console.error('Error while picking the document:', err);
            }
        }

    };

    return (

        <View style={styles.InputContainer}>

            <Text style={styles.Heading}>
                Documents
            </Text>

            <Text style={styles.subHeading}>
                Document Type
            </Text>

            <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                <Text style={styles.StatusTouchableText}>{selectedDocument ? selectedDocument : "Selected Document Type"}</Text>
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
                value={docName}
                onChangeText={(text) => setDocName(text)}
            />

            <Text style={styles.subHeading}>
                Select File
            </Text>

            <Text style={docFile && docFile.length > 0 ? styles.DocFileName : styles.DocFileNameHolder}>
                {docFile && docFile.length > 0 ? docFile[0].name : 'Select The Document'}
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
                        )}

                </View>

            </View>



            <View style={[styles.fullWidth, styles.Row, styles.Left]}>
                <TouchableOpacity style={styles.PrevButton} onPress={onprevBankDetails}>
                    <ArrowLeftIcon width={14} height={14} color={'#0A62F1'} />
                    <Text style={styles.PrevButtonText}>
                        Previous
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.NextButton}>
                    <Text style={styles.NextButtonText}>
                        Submit
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.PrevButton}>
                    <Text style={styles.PrevButtonText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>


        </View>

    )
}

export default Documents;