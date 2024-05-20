import React, { useState } from "react";
import { ActivityIndicator, Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DocumentPicker from 'react-native-document-picker';

const Template = () => {

    const [load, setLoad] = useState(false);
    const [loadData, setLoadData] = useState(false);
    const [Datalist, setDatalist] = useState([]);
    const [docFile, setDocFile] = useState();
    const [documentFile, setDocumentFile] = useState();

    // 

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
        <ScrollView>
            <View style={styles.ShiftSlotContainer}>

                <View style={styles.ShiftSlotContainerTitle}>
                    <Text style={styles.ShiftSlotContainerTitleText}>Add Template</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.ShiftSlotText}>
                        Title
                    </Text>

                    <TextInput
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {/* {shiftError} */}
                    </Text>

                    <Text style={styles.ShiftSlotText}>
                        Select File
                    </Text>

                    <Text style={docFile ? styles.DocFileName : styles.DocFileNameHolder}>
                        {docFile ? docFile[0].name : 'Select The Document'}
                    </Text>

                    <View style={styles.fullWidth}>
                        <TouchableOpacity style={styles.UploadButton}
                            onPress={handleDocumentSelection}
                        >
                            <Text style={styles.UploadButtonText}>
                                Select Document
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.submitbutton}
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
                        >
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <>

                    <View style={styles.ShiftSlotContainerTitle}>
                        <Text style={styles.ShiftSlotContainerTitleText}>Template List</Text>
                    </View>

                </>

            </View>

        </ScrollView>
    )
}

export default Template;