import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DocumentPicker from 'react-native-document-picker';
import { useSelector } from "react-redux";
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg";
import ViewIcon from "../../../../../Assets/Icons/eyeopen.svg";
import EditIcon from "../../../../../Assets/Icons/Edit.svg";
import DownloadIcon from "../../../../../Assets/Icons/Download.svg";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import axios from "axios";
import { WebView } from 'react-native-webview';

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
        const apiUrl = 'https://ocean21.in/api/public/api/hr_templatelist';

        try {
            const response = await axios.get(apiUrl, {
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
            } else {
                Alert.alert("Error", "Error While Submitting")
                setModalVisible(false);
                setDelData(false);
                setReasonError('');
                setReason('');
            }

        } catch (error) {
            console.log(error, "error");
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

    const toggleDropdownstatus = () => {
        setShowDropdownstatus(!showDropdownstatus);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdownstatus(false);
    };

    // 

    const HandleSubmit = async () => {

        setLoad(true);

        const formData = new FormData();

        formData.append('title', title);
        formData.append('status', selectedStatus);
        formData.append('created_by', data.userempid);
        if (docFile.length > 0) {
            docFile.map((docFile, index) => {
                formData.append(`template_file`, {
                    uri: docFile.uri,
                    name: docFile.name,
                    type: docFile.type,
                });
            });
        }
        else {
            formData.append('template_file', docFile);
        }

        try {

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
                Alert.alert("success", responsedata.message);
                setTitle('');
                setSelectedStatus(null);
                setDocFile(null);
                fetchData();
            } else {
                setLoad(false);
                Alert.alert("Error", responsedata.message)
            }

        } catch (error) {
            console.log(error, "error");
            setLoad(false);
        }
    }

    // 

    const [fileUrl, setFileUrl] = useState('');

    const handleDownload = (filePath) => {
        const fullUrl = `https://ocean21.in/api/storage/app/${filePath}`;
        setFileUrl(fullUrl);
    };

    // 

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedtitle, setEditedtitle] = useState('');
    const [editedStatus, setEditedStatus] = useState(null);
    const [editedshiftError, setEditedShiftError] = useState('');
    const [editedstatusError, setEditedstatusError] = useState('');
    const [EditLoad, setEditLoad] = useState(false);
    const [showModalDropdown, setShowModalDropdown] = useState(false);
    const [EdocFile, setEdocFile] = useState([]);
    const [EditedocFile, seteditedocFile] = useState([]);
    const [selectedId, setSelectedId] = useState();

    const filePath = typeof EditedocFile === 'string' ? EditedocFile : '';
    const fileName = filePath.split('/').pop();
    console.log(fileName, "EdocFile")

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
        seteditedocFile(slot.template_file);
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
        formData.append('id', selectedId);
        formData.append('title', editedtitle);
        formData.append('status', editedStatus);
        formData.append('updated_by', data.userempid);

        if (EdocFile.length > 0) {
            EdocFile.map((file, index) => {
                formData.append(`template_file`, {
                    uri: file.uri,
                    name: file.name,
                    type: 'image/jpeg',
                });
            });
        } else {
            formData.append('template_file', EdocFile);
        }

        formData.append('old_templatepath', EditedocFile);

        try {

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
                Alert.alert("success", responsedata.message);
                fetchData();
                setEdocFile(null);
            } else {
                setEditLoad(false);
                Alert.alert("Error", responsedata.message)
            }

        } catch (error) {
            setEditLoad(false);
            Alert.alert("Error during submit", "Check The Input Credentials");
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

                        <Text style={styles.StatusTouchableText}>{selectedStatus || "Selected Status"}</Text>
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
                        {/* {titleError} */}
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
                            onPress={() => navigation.navigate('Dashboard')}
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

                    <View>

                        <View style={styles.listContainer}>

                            <View style={styles.listHeader}>
                                <Text style={styles.sno}>S.No</Text>
                                <Text style={styles.RoleName}>Title</Text>
                                <Text style={styles.Action}>Action</Text>
                            </View>

                            {
                                loadData ? <ActivityIndicator size={"large"} color={"#0A62F1"} style={styles.Activeindicator} /> :
                                    templatelist.length === 0 ? (
                                        <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                    ) : (
                                        <>
                                            {
                                                templatelist.map((doc, index) => (
                                                    <View key={index} style={styles.listcontent}>
                                                        <Text style={styles.listcontentsno}>{index + 1}</Text>
                                                        <Text style={styles.listcontentRoleName}>{doc.title}</Text>
                                                        <View style={styles.listcontentButtonview}>

                                                            <TouchableOpacity
                                                                // onPress={() => handlePreview(doc.template_file)}
                                                                style={styles.listcontentviewbutton}>
                                                                <ViewIcon width={14} height={14} color={"#000"} />
                                                            </TouchableOpacity>

                                                            <TouchableOpacity
                                                                onPress={() => openEditModal(doc)}
                                                                style={styles.listcontentdownloadbutton}>
                                                                <EditIcon width={14} height={14} color={"#000"} />
                                                            </TouchableOpacity>

                                                            <TouchableOpacity
                                                                onPress={() => handleDownload(doc.template_file)}
                                                                style={styles.listcontenteditbutton}>
                                                                <DownloadIcon width={14} height={14} color={"#000"} />
                                                            </TouchableOpacity>

                                                            <TouchableOpacity
                                                                onPress={() => HandleDelete(doc.id)}
                                                                style={styles.listcontentdelbutton}>
                                                                <DeleteIcon width={14} height={14} color={"#000"} />
                                                            </TouchableOpacity>

                                                        </View>
                                                    </View>
                                                ))
                                            }
                                        </>
                                    )
                            }
                        </View>

                    </View>

                    <View>
                        <WebView source={{ uri: fileUrl }} style={styles.webView} />
                    </View>

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
                                    <TouchableOpacity style={styles.modalCancelButton} onPress={cancelDelete}>
                                        <Text style={styles.modalCancelButtonText}>Cancel</Text>
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
                                    {editedshiftError}
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

                                    <TouchableOpacity style={styles.modalCancelButton} onPress={closeEditModal}>
                                        <Text style={styles.modalCancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </View>
                    </Modal>

                </>

            </View>

        </ScrollView>
    )
}

export default Template;