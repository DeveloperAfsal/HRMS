import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import EditIcon from "../../../../../Assets/Icons/Edit.svg";
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg"
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg"
import styles from "./style";
import axios from 'axios';
import { useSelector } from "react-redux";

const LeaveCategory = () => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // states

    const [shiftError, setShiftError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [editedshiftError, setEditedShiftError] = useState('');
    const [editedstatusError, setEditedstatusError] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModalDropdown, setShowModalDropdown] = useState(false);
    const [shiftSlot, setShiftSlot] = useState('');
    const [Datalist, setDatalist] = useState([]);
    const [load, setLoad] = useState(false);
    const [loadData, setLoadData] = useState(false);
    const [DelData, setDelData] = useState(false);
    const [EditLoad, setEditLoad] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [slotToDelete, setSlotToDelete] = useState(null);
    const [Reason, setReason] = useState('')
    const [ReasonError, setReasonError] = useState('')
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedShiftSlot, setEditedShiftSlot] = useState('');
    const [editedStatus, setEditedStatus] = useState(null);
    const [selectedSlotId, setSelectedSlotId] = useState('');

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleModalDropdown = () => {
        setShowModalDropdown(!showModalDropdown);
    };

    const selecModaltStatus = (status) => {
        setEditedStatus(status);
        setShowModalDropdown(false);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdown(false);
    };

    // Api Call For Add Shift 

    const HandleSubmit = async () => {

        setLoad(true)

        try {
            if (!shiftSlot) {
                setShiftError('Leave category is required');
                setLoad(false);
                return;
            } else {
                setShiftError('');
            }

            if (!selectedStatus) {
                setStatusError('Status is required');
                setLoad(false);
                return;
            } else {
                setStatusError('');
            }

            const apiUrl = 'https://ocean21.in/api/public/api/leavecategoryinsert';

            const response = await axios.post(apiUrl, {
                category_name: shiftSlot,
                category_status: selectedStatus,
                created_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                setLoad(false);
                setShiftSlot('');
                setSelectedStatus("Selected Status");
                fetchData();
            } else {
                setLoad(false);
                Alert.alert("Failed To Add");
                console.error('Failed To Add:', response.data.error);
            }

        } catch (error) {
            setLoad(false);
            Alert.alert("Error during submit", "Check The Input Credentials");
            console.error('Error during submit:', error);
        }

        closeEditModal();
    }

    const HandleCancel = () => {
        setShiftSlot('');
        setStatusError('');
        setShiftError('');
        setSelectedStatus("Select Status");
    }

    // Api call for list Shifts

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://ocean21.in/api/public/api/view_leavecategory';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            setLoadData(false)
            const responseData = response.data.data;
            setDatalist(responseData);
        } catch (error) {
            setLoadData(false)
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Api call for Delete

    const HandleDelete = (slotId) => {
        setSlotToDelete(slotId);
        setModalVisible(true);
    }

    const cancelDelete = () => {
        setSlotToDelete(null);
        setModalVisible(false);
        setReasonError('');
        setReason('');
        setDelData(false);
    }

    const confirmDelete = async () => {
        setDelData(true)
        if (slotToDelete) {

            try {

                if (!Reason) {
                    setReasonError('Reason Required');
                    setDelData(false);
                    return;
                } else {
                    setReasonError('');
                    setReason('');
                }

                const apiUrl = `https://ocean21.in/api/public/api/delete_leavecategory`;
                const response = await axios.post(apiUrl, {
                    id: slotToDelete,
                    updated_by: data.userempid,
                    reason: Reason,
                }, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                if (response.data.status === "success") {
                    const updatedDataList = Datalist.filter(slot => slot.id !== slotToDelete);
                    setDatalist(updatedDataList);
                    setDelData(false)
                } else {
                    Alert.alert("Failed", "Failed to delete shift slot");
                    setDelData(false)
                }
            } catch (error) {
                Alert.alert("Error", "Error while deleting shift slot");
                console.error('Error deleting shift slot:', error);
                setDelData(false)
            }
            setSlotToDelete(null);
            setModalVisible(false);
        }
    }

    // Api call For EditButton

    // Function to open edit modal and populate data

    const openEditModal = (slot) => {
        setEditedShiftSlot(slot.category_name);
        setEditedStatus(slot.status);
        setEditModalVisible(true);
        setSelectedSlotId(slot.id);
    };

    // Function to close edit modal

    const closeEditModal = () => {
        setEditModalVisible(false);
        setEditedShiftError('');
        setEditedstatusError('');
        setEditedStatus(null);
    };

    // Function to handle edit submission

    const handleEditSubmit = async () => {
        setEditLoad(true);
        try {
            if (!editedShiftSlot) {
                setEditedShiftError('Leave category is required');
                setEditLoad(false);
                return;
            } else {
                setEditedShiftError('');
            }

            if (!editedStatus) {
                setEditedstatusError('Status is required');
                setEditLoad(false);
                return;
            } else {
                setEditedstatusError('');
            }

            const apiUrl = 'https://ocean21.in/api/public/api/update_leavecategory';

            const response = await axios.put(apiUrl, {
                id: selectedSlotId,
                category_name: editedShiftSlot,
                category_status: editedStatus,
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                setEditLoad(false);
                setEditedShiftSlot('');
                setEditedStatus(null);
                fetchData();
            } else {
                setEditLoad(false);
                Alert.alert("Failed To Update");
                console.error('Failed To Update:', response.data.error);
            }

        } catch (error) {
            setEditLoad(false);
            Alert.alert("Error during submit", "Check The Input Credentials");
            console.error('Error during submit:', error);
        }

        closeEditModal();
    };


    return (
        <ScrollView>

            <View style={styles.ShiftSlotContainer}>

                <View style={styles.ShiftSlotContainerTitle}>
                    <Text style={styles.ShiftSlotContainerTitleText}>Leave category Form</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.ShiftSlotText}>
                        Leave category
                    </Text>

                    <TextInput
                        value={shiftSlot}
                        onChangeText={(text) => setShiftSlot(text)}
                        style={styles.ShiftSlotTextInput}
                    />

                    <Text style={styles.errorText}>
                        {shiftError}
                    </Text>

                    <Text style={styles.StatusText}>
                        Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus || "Selected Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {/* Dropdown to show the options */}

                    {showDropdown && (

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
                        {statusError}
                    </Text>

                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.submitbutton} onPress={HandleSubmit}>
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.submitbuttonText}>
                                        Submit
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton} onPress={HandleCancel}>
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <>
                    <View style={styles.ShiftSlotContainerTitle}>
                        <Text style={styles.ShiftSlotContainerTitleText}>Leave category List</Text>
                    </View>

                    <View style={styles.listContainer}>

                        {
                            loadData ?
                                <ActivityIndicator size={"small"} color={"#20DDFE"} style={styles.Activeindicator} /> :
                                <>
                                    <View style={styles.listHeader}>
                                        <Text style={styles.sno}>S.No</Text>
                                        <Text style={styles.shift}>Shift</Text>
                                        <Text style={styles.status}>Status</Text>
                                        <Text style={styles.Action}>Action</Text>
                                    </View>

                                    {Datalist.length === 0 ? (
                                        <Text style={{ textAlign: 'center', paddingVertical: '3%' }}>No data available</Text>
                                    ) : (
                                        Datalist.map((slot, index) => (
                                            <View style={styles.listcontent} key={index}>
                                                <Text style={styles.listcontentsno}>{index + 1}</Text>
                                                <Text style={styles.listcontentShift}>{slot.category_name}</Text>
                                                <Text style={styles.listcontentstatus}>{slot.status}</Text>

                                                <View style={styles.listcontentButtonview}>
                                                    <TouchableOpacity style={styles.listcontenteditbutton} onPress={() => openEditModal(slot)}>
                                                        <EditIcon width={14} height={14} color={"#000"} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.listcontentdelbutton} onPress={() => HandleDelete(slot.id)}>
                                                        <DeleteIcon width={14} height={14} color={"#000"} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        ))
                                    )}

                                </>
                        }



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

                                <Text style={styles.Heading}>Edit Request Type</Text>
                                <Text style={styles.modalLabelText}>Request Type</Text>

                                <TextInput
                                    value={editedShiftSlot}
                                    onChangeText={setEditedShiftSlot}
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

                                <View style={styles.buttoncontainer}>

                                    <TouchableOpacity style={styles.modalCancelButton} onPress={closeEditModal}>
                                        <Text style={styles.modalCancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.modalSubmitButton} onPress={handleEditSubmit}>
                                        {
                                            EditLoad ?
                                                <ActivityIndicator size={"small"} color={"#fff"} /> :
                                                <Text style={styles.modalSubmitButtonText}>Submit</Text>
                                        }
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

export default LeaveCategory;