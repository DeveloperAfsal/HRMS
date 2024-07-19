import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View, PermissionsAndroid } from "react-native";
import styles from "./style";
import DocumentPicker from 'react-native-document-picker';
import { useSelector } from "react-redux";
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg";
import ViewIcon from "../../../../../Assets/Icons/eyeopen.svg";
import EditIcon from "../../../../../Assets/Icons/Edit.svg";
import DownloadIcon from "../../../../../Assets/Icons/Download.svg";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import axios from "axios";
import RNFS from "react-native-fs";
import RNFetchBlob from 'rn-fetch-blob';
import { Linking } from 'react-native';
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const Template = ({ navigation }) => {

    // 

    const { data } = useSelector((state) => state.login);

    // 

    const [load, setLoad] = useState(false);
    const [loadData, setLoadData] = useState(false);
    const [DelData, setDelData] = useState(false);
    const [title, setTitle] = useState();
    const [titleError, setTitleError] = useState();
    const [docFile, setDocFile] = useState();
    const [docFileErr, setDocFileErr] = useState();
    const [Reason, setReason] = useState('');
    const [slotToDelete, setSlotToDelete] = useState(null);
    const [templatelist, setTemplatelist] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [ReasonError, setReasonError] = useState('');

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

    // Api call for list

    const fetchData = async () => {

        setLoadData(true);

        try {
            const apiUrl = 'https://ocean21.in/api/public/api/hr_templatelist';
            const response = await axios.post(apiUrl, {
                user_roleid: data.userrole,
                emp_id: data.userempid
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setTemplatelist(responseData);
            setLoadData(false);

        } catch (error) {
            console.error('Error fetching data:', error);
            setLoadData(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 

    const confirmDelete = async () => {

        setDelData(true)

        try {

            if (!Reason) {
                setReasonError('Reason Required');
                setDelData(false);
                return;
            } else {
                setReasonError('');
                setReason('');
            }

            const apiUrl = `https://ocean21.in/api/public/api/hr_template_delete`;

            const response = await axios.post(apiUrl, {
                id: slotToDelete,
                updated_by: data.userempid,
                reason: Reason,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const ResData = response.data

            if (ResData.status === "success") {
                const updatedDataList = templatelist.filter(slot => slot.id !== slotToDelete);
                setTemplatelist(updatedDataList);
                setModalVisible(false);
                setDelData(false);
                setReasonError('');
                setReason('');
                // Alert.alert("Successfull", ResData.message)
                handleShowAlert(ResData.message);
            } else {
                // Alert.alert("Failed", ResData.message)
                handleShowAlert1(ResData.message);
                setModalVisible(false);
                setDelData(false);
                setReasonError('');
                setReason('');
            }

        } catch (error) {
            // console.log(error, "error");
            handleShowAlert2();
            setDelData(false);
        }
    }

    const HandleDelete = (Id) => {
        setSlotToDelete(Id);
        setModalVisible(true);
    }

    const cancelDelete = () => {
        setSlotToDelete(null);
        setModalVisible(false);
        setReasonError('');
        setReason('');
    }

    // 

    const [selectedStatus, setSelectedStatus] = useState(null);
    const [showDropdownstatus, setShowDropdownstatus] = useState(false);
    const [statusErr, setStatusErr] = useState('');

    const toggleDropdownstatus = () => {
        setShowDropdownstatus(!showDropdownstatus);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdownstatus(false);
    };

    // 

    const validateFields = () => {
        let isValid = true;
    
        if (!title) {
            setTitleError('Select Title');
            isValid = false;
        } else {
            setTitleError('');
        }
    
        if (!selectedStatus) {
            setStatusErr('Select Status');
            isValid = false;
        } else {
            setStatusErr('');
        }
    
        if (!docFile) {
            setDocFileErr('Select Document File');
            isValid = false;
        } else {
            setDocFileErr('');
        }
    
        return isValid;
    };

    const HandleSubmit = async () => {

        setLoad(true);

        const formData = new FormData();

        try {

            if (!validateFields()) {
                setLoad(false);
                return;
            }

            formData.append('title', title);
            formData.append('status', selectedStatus);
            formData.append('created_by', data.userempid);
            // formData.append('template_file', docFile);

            if (docFile.length > 0) {
                docFile.map((item, index) => {
                    formData.append(`template_file`, {
                        uri: item.uri,
                        name: item.name,
                        type: item.type,
                    });
                });
            }
            else {
                formData.append('template_file', docFile);
            }


            const response = await fetch('https://ocean21.in/api/public/api/hr_addtemplates', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${data.token}`
                },
                body: formData,
            });

            const responsedata = await response.json();

            if (responsedata.status === "success") {
                setLoad(false);
                // Alert.alert("success", responsedata.message);
                handleShowAlert(responsedata.message);
                setTitle('');
                setSelectedStatus(null);
                setDocFile(null);
                fetchData();
            } else {
                setLoad(false);
                // Alert.alert("Error", responsedata.message)
                handleShowAlert1(responsedata.message);
            }

        } catch (error) {
            // console.log(error, "error");
            handleShowAlert2();
            setLoad(false);
        }
    }

    // 

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedtitle, setEditedtitle] = useState('');
    const [editedtitleErr, setEditedtitleErr] = useState('');
    const [editedStatus, setEditedStatus] = useState(null);
    const [editedshiftError, setEditedShiftError] = useState('');
    const [editedstatusError, setEditedstatusError] = useState('');
    const [EditLoad, setEditLoad] = useState(false);
    const [showModalDropdown, setShowModalDropdown] = useState(false);

    const [EdocFile, setEdocFile] = useState([]);
    console.log(EdocFile, "EdocFile")

    const [EditedocFile, seteditedocFile] = useState([]);
    console.log(EditedocFile, "EditedocFile")

    const [selectedId, setSelectedId] = useState();

    const filePath = typeof EditedocFile === 'string' ? EditedocFile : '';
    const fileName = filePath.split('/').pop();
    console.log(fileName, "fileName")

    // Api call For EditButton

    const handleEditDocumentSelection = async () => {

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setEdocFile(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Document picker is cancelled');
            } else {
                console.error('Error while picking the document:', err);
            }
        }
    };

    // Function to open edit modal and populate data

    const openEditModal = (slot) => {
        setEditedtitle(slot.title);
        setEditedStatus(slot.status);
        seteditedocFile(slot?.template_file);
        setEditModalVisible(true);
        setSelectedId(slot.id);
    };

    // Function to close edit modal

    const closeEditModal = () => {
        setEditModalVisible(false);
        setEdocFile(null);
    };

    // Function to handle edit submission

    const handleEditSubmit = async () => {

        setEditLoad(true);

        const formData = new FormData();

        try {

            if (!editedtitle) {
                setEditedtitleErr('Select Title');
                setEditLoad(false);
                return;
            } else {
                setEditedtitleErr('');
            }

            formData.append('id', selectedId);
            formData.append('title', editedtitle);
            formData.append('status', editedStatus);
            formData.append('updated_by', data.userempid);

            if (EdocFile) {
                if (EdocFile.length > 0) {
                    EdocFile.map((file, index) => {
                        formData.append(`template_file`, {
                            uri: file.uri,
                            name: file.name,
                            type: 'image/jpeg',
                        });
                    });
                }
            } else {
                formData.append('template_file', EdocFile);
            }

            formData.append('old_templatepath', EditedocFile);

            const response = await fetch('https://ocean21.in/api/public/api/hr_template_update', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${data.token}`
                },
                body: formData,
            });

            const responsedata = await response.json();

            if (responsedata.status === "success") {
                setEditLoad(false);
                // Alert.alert("success", responsedata.message);
                handleShowAlert(responsedata.message);
                fetchData();
                setEdocFile(null);
            } else {
                setEditLoad(false);
                // Alert.alert("Error", responsedata.message);
                handleShowAlert1(responsedata.message);
            }

        } catch (error) {
            setEditLoad(false);
            // Alert.alert("Error during submit", "Check The Input Credentials");
            handleShowAlert2();
            console.error('Error during submit:', error);
        }

        closeEditModal();
    };

    const toggleModalDropdown = () => {
        setShowModalDropdown(!showModalDropdown);
    };

    const selecModaltStatus = (status) => {
        setEditedStatus(status);
        setShowModalDropdown(false);
    };

    // 

    useEffect(() => {
        // Optional: Delete the file if it exists before downloading
        const filePath = RNFS.DocumentDirectoryPath + '/example.pdf';
        RNFS.unlink(filePath)
            .then(() => {
                console.log('Previous file deleted');
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    // const DownloadFile = async (URLlink) => {
    //     const baseUrl = `https://ocean21.in/api/storage/app/`;
    //     const url = baseUrl + URLlink;
    //     const filePath = RNFS.DocumentDirectoryPath + '/' + URLlink.split('/').pop();

    //     console.log(`Downloading from: ${url}`);
    //     console.log(`Saving to: ${filePath}`);

    //     try {
    //         const response = await RNFS.downloadFile({
    //             fromUrl: url,
    //             toFile: filePath,
    //             background: true, // Enable downloading in the background (iOS only)
    //             discretionary: true, // Allow the OS to control the timing and speed (iOS only)
    //             headers: {
    //                 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual token if needed
    //                 'Content-Type': 'application/json',
    //             },
    //             progress: (res) => {
    //                 // Handle download progress updates if needed
    //                 const progress = (res.bytesWritten / res.contentLength) * 100;
    //                 console.log(`Progress: ${progress.toFixed(2)}%`);
    //             },
    //         }).promise;

    //         console.log('File downloaded!', response);
    //     } catch (err) {
    //         console.log('Download error:', err);
    //     }
    // };

    const handlePreview = (UrlLink) => {
        const baseUrl = 'https://ocean21.in/api/storage/app/';
        const filePath = UrlLink;
        const url = `${baseUrl}${filePath}`;
        if (filePath && filePath !== "-") {
            Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
        } else {
            Alert.alert('No File Located')
        }
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
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

    const refresh = () => {
        setTitle('');
        setSelectedStatus(null);
        setDocFile('');
    }

    const actualDownload = async (URLlink) => {
        const { dirs } = RNFetchBlob.fs;
        const dirToSave = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
        const fileName = URLlink.split('/').pop();
        const configfb = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mediaScannable: true,
                title: fileName,
                path: `${dirToSave}/${fileName}`,
            },
            path: `${dirToSave}/${fileName}`,
        };

        const configOptions = Platform.select({
            ios: configfb,
            android: configfb,
        });

        try {
            const response = await RNFetchBlob.config(configOptions)
                .fetch('GET', `https://ocean21.in/api/storage/app/${URLlink}`, {
                    'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual token if needed
                    'Content-Type': 'application/json',
                });

            if (Platform.OS === 'ios') {
                RNFetchBlob.fs.writeFile(configfb.path, response.data, 'base64');
                RNFetchBlob.ios.previewDocument(configfb.path);
            } else if (Platform.OS === 'android') {
                console.log('File downloaded successfully:', response.path());
                // Alert.alert('Successfull', 'File downloaded successfully');
                handleShowAlert('File downloaded successfully')
            }
        } catch (e) {
            console.log('Download error:', e);
        }
    };

    const getPermission = async (URLlink) => {
        if (Platform.OS === 'ios') {
            actualDownload(URLlink);
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    actualDownload(URLlink);
                } else {
                    console.log("Please grant permission to download the file.");
                }
            } catch (err) {
                console.log("Permission request error:", err);
            }
        }
    };

    return (

        <ScrollView>

            <View style={styles.ShiftSlotContainer}>

                {(data.userrole == 1 || data.userrole == 2) ?
                    <>
                        <View style={styles.ShiftSlotContainerTitle}>
                            <Text style={styles.ShiftSlotContainerTitleText}>Add Template</Text>
                        </View>

                        <View style={styles.Inputcontainer}>

                            <Text style={styles.ShiftSlotText}>
                                Title
                            </Text>

                            <TextInput
                                value={title}
                                onChangeText={(txt) => setTitle(txt)}
                                style={styles.ShiftSlotTextInput}
                            />

                            <Text style={styles.errorText}>
                                {titleError}
                            </Text>

                            <Text style={styles.ShiftSlotText}>
                                Status
                            </Text>

                            <TouchableOpacity onPress={toggleDropdownstatus} style={styles.StatusTouchable}>

                                <Text style={styles.StatusTouchableText}>{selectedStatus || "Select Status"}</Text>
                                <DropdownIcon width={14} height={14} color={"#000"} />

                            </TouchableOpacity>

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
                                {statusErr}
                            </Text>

                            <Text style={styles.ShiftSlotText}>
                                Upload File
                            </Text>

                            <Text style={docFile ? styles.DocFileName : styles.DocFileNameHolder}>
                                {docFile ? docFile[0].name : 'Select The Document'}
                            </Text>

                            <View style={styles.fullWidth}>
                                <TouchableOpacity style={styles.UploadButton}
                                    onPress={handleDocumentSelection}
                                >
                                    <Text style={styles.UploadButtonText}>
                                        Choose File
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.errorText}>
                                {docFileErr}
                            </Text>

                            <View style={styles.buttonview}>
                                <TouchableOpacity style={styles.submitbutton}
                                    onPress={HandleSubmit}
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
                                    onPress={() => refresh()}
                                >
                                    <Text style={styles.cancelbuttontext}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </> : null
                }

                <>

                    <View style={styles.ShiftSlotContainerTitle}>
                        <Text style={styles.ShiftSlotContainerTitleText}>Template List</Text>
                    </View>

                    <ScrollView horizontal={true}>

                        <View style={styles.Tablecontainer}>
                            {loadData ? (
                                <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                            ) : (
                                <View>

                                    <View style={[styles.row, styles.listHeader]}>
                                        <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                        <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Title</Text>
                                        <Text style={[styles.header, styles.cell, styles.EmployeeName]}>Status</Text>
                                        <Text style={[styles.header, styles.cell, styles.StartDate]}>Action</Text>
                                    </View>

                                    {templatelist.length === 0 ? (
                                        <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                    ) : (
                                        templatelist.map((item, index) => (
                                            <View key={index} style={[styles.row, styles.listBody]}>
                                                <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                                <Text style={[styles.cell, styles.DepartmentName]}>{item.title}</Text>
                                                <Text style={[styles.cell, styles.EmployeeName]}>{item.status}</Text>
                                                <View style={styles.listcontentButtonview}>

                                                    <TouchableOpacity
                                                        onPress={() => handlePreview(item.template_file)}
                                                        style={styles.listcontentviewbutton}>
                                                        <ViewIcon width={14} height={14} color={"#000"} />
                                                    </TouchableOpacity>

                                                    {(data.userrole == 1 || data.userrole == 2) ? <TouchableOpacity
                                                        onPress={() => openEditModal(item)}
                                                        style={styles.listcontentdownloadbutton}>
                                                        <EditIcon width={14} height={14} color={"#000"} />
                                                    </TouchableOpacity> : null}

                                                    <TouchableOpacity
                                                        onPress={() => getPermission(item.template_file)}
                                                        style={styles.listcontenteditbutton}>
                                                        <DownloadIcon width={14} height={14} color={"#000"} />
                                                    </TouchableOpacity>

                                                    {(data.userrole == 1 || data.userrole == 2) ? <TouchableOpacity
                                                        onPress={() => HandleDelete(item.id)}
                                                        style={styles.listcontentdelbutton}>
                                                        <DeleteIcon width={14} height={14} color={"#000"} />
                                                    </TouchableOpacity> : null}

                                                </View>
                                            </View>
                                        ))
                                    )}

                                </View>
                            )
                            }
                        </View>

                    </ScrollView>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTextHeading}>Are You Sure You Want To Delete This !</Text>
                                <Text style={styles.modalText}>Reason:</Text>
                                <TextInput
                                    value={Reason}
                                    onChangeText={(text) => setReason(text)}
                                    style={styles.Reason}
                                />
                                <Text style={styles.errorTextDelete}>
                                    {ReasonError}
                                </Text>

                                <View style={styles.modalButtonContainer}>
                                    <TouchableOpacity style={styles.modalCancelButton1} onPress={cancelDelete}>
                                        <Text style={styles.modalCancelButtonText1}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalDeleteButton} onPress={confirmDelete}>


                                        {
                                            DelData ?
                                                <ActivityIndicator size={"small"} color={"#fff"} /> :
                                                <Text style={styles.modalDeleteButtonText}>Delete</Text>
                                        }


                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={editModalVisible}
                        onRequestClose={closeEditModal}
                    >
                        <View style={styles.modalContainer}>

                            <View style={styles.modalContent}>

                                <Text style={styles.Heading}>Edit Template</Text>
                                <Text style={styles.modalLabelText}>Title</Text>

                                <TextInput
                                    value={editedtitle}
                                    onChangeText={setEditedtitle}
                                    style={styles.modalInput}
                                />

                                <Text style={styles.ModalerrorText}>
                                    {editedtitleErr}
                                </Text>

                                <Text style={styles.modalLabelText}>Status</Text>

                                <TouchableOpacity onPress={toggleModalDropdown} style={styles.modalInput}>

                                    <Text style={styles.StatusTouchableText}>{editedStatus}</Text>
                                    <DropdownIcon width={14} height={14} color={"#000"} />

                                </TouchableOpacity>

                                {/* Dropdown to show the options */}

                                {showModalDropdown && (

                                    <View style={styles.modaldropdown}>

                                        <TouchableOpacity onPress={() => selecModaltStatus("Active")} style={styles.dropdownOption}>
                                            <Text style={styles.dropdownOptionText}>Active</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => selecModaltStatus("In-Active")} style={styles.dropdownOption}>
                                            <Text style={styles.dropdownOptionText}>In-Active</Text>
                                        </TouchableOpacity>

                                    </View>

                                )}

                                <Text style={styles.ModalerrorText}>
                                    {editedstatusError}
                                </Text>

                                <Text style={styles.ShiftSlotText}>
                                    Upload File
                                </Text>

                                <Text
                                    style={styles.MDocFileName}
                                >
                                    {EdocFile ? EdocFile[0]?.name : fileName}
                                </Text>


                                <View style={styles.MfullWidth}>
                                    <TouchableOpacity style={styles.UploadButton}
                                        onPress={handleEditDocumentSelection}
                                    >
                                        <Text style={styles.UploadButtonText}>
                                            Choose File
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.Mbuttoncontainer}>

                                    <TouchableOpacity style={styles.modalSubmitButton} onPress={handleEditSubmit}>
                                        {
                                            EditLoad ?
                                                <ActivityIndicator size={"small"} color={"#fff"} /> :
                                                <Text style={styles.modalSubmitButtonText}>Submit</Text>
                                        }
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.modalCancelButton1} onPress={closeEditModal}>
                                        <Text style={styles.modalCancelButtonText1}>Cancel</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </View>
                    </Modal>

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

                </>

            </View>

        </ScrollView>
    )
}

export default Template;