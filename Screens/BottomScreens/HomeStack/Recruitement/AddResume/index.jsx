import React, { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import styles from "./style";
import AddGeneral from "./General";
import AddCareer from "./Career";
import DocumentPicker from 'react-native-document-picker';

const AddResume = ({ route, navigation }) => {

    const [activeComponent, setActiveComponent] = useState('General');

    const renderComponent = (componentName) => {
        setActiveComponent(componentName);
    }

    const [docFile, setDocFile] = useState();
    const [docFileErr, setDocFileErr] = useState();

    const [docFile1, setDocFile1] = useState();
    const [docFileErr1, setDocFileErr1] = useState();

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

    const handleDocumentSelection1 = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setDocFile1(res);
            // handleFieldsChange('selectedFile', res);
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

            <View style={styles.Page}>

                <View style={styles.container}>

                    {
                        activeComponent === 'General' &&
                        <AddGeneral
                            docFile={docFile}
                            docFileErr={docFileErr}
                            handleDocumentSelection={handleDocumentSelection}
                        />
                    }

                    {
                        activeComponent === 'Career' &&
                        <AddCareer
                            docFile1={docFile1}
                            docFileErr1={docFileErr1}
                            handleDocumentSelection1={handleDocumentSelection1}
                        />
                    }

                    <View style={styles.HeaderButtonView}>

                        {activeComponent === 'Career' ? <TouchableOpacity
                            style={

                                styles.HeaderButton
                            }
                            onPress={() => renderComponent('General')}
                        >
                            <Text
                                style={

                                    styles.HeaderButtonText
                                }
                            >
                                Previous
                            </Text>
                        </TouchableOpacity> : null}

                        {activeComponent === 'General' ? <TouchableOpacity
                            style={

                                styles.HeaderButtonActive
                            }
                            onPress={() => renderComponent('Career')}
                        >
                            <Text
                                style={

                                    styles.HeaderButtonTextActive
                                }
                            >
                                Next
                            </Text>
                        </TouchableOpacity> : null}

                        {activeComponent === 'Career' ? <TouchableOpacity style={

                            styles.HeaderButtonActive
                        }>
                            <Text
                                style={
                                    styles.HeaderButtonTextActive
                                }
                            >
                                Submit
                            </Text>
                        </TouchableOpacity> : null}

                        {activeComponent === 'Career' ? <TouchableOpacity style={
                            styles.HeaderButton
                        }>
                            <Text
                                style={
                                    styles.HeaderButtonText
                                }
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity> : null}


                    </View>


                </View>

            </View>

        </ScrollView>
    )
}

export default AddResume;