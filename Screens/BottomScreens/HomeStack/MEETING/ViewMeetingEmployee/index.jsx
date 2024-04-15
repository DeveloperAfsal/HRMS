import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { Table, Row } from 'react-native-table-component';
import SearchIcon from '../../../../../assets/EPK CRM Icons/Search.svg';
import RightArrowIcon from '../../../../../assets/EPK CRM Icons/Arrow2.svg';
import LeftArrowIcon from '../../../../../assets/EPK CRM Icons/Arrow2Leftside.svg';
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Grey, PrimaryBlue, White } from "../../../../../assets/Colors";

const MeetingListEmployee = ({ navigation }) => {

    // data from redux-store

    const { data } = useSelector((state) => state.login);

    // states

    const [tableData, setTableData] = useState([]);
    const [tempId, setTempID] = useState('');
    const [reason, setReason] = useState('');

    // Api call handle Action Accept and Reject

    const handleActionAcceptandReject = async () => {
        try {
            const formData = new FormData();

            formData.append('meeting_id', tempId);
            formData.append('meetingemp_id', data.userempid);
            formData.append('meeting_status', approvalType);
            formData.append('meeting_remarks', reason);

            const response = await fetch('https://officeinteriorschennai.com/api/public/api/approvalmeetingrequest', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            });

            const responseData = await response.json();

            if (responseData.status === 'success') {
                alert('Submitted successful');
                fetchTableData();
            } else {
                alert('Submission failed');
            }
        } catch (error) {
            alert('Error in Submission');
        }
    };

    // EnterReason

    const [approvalType, setApprovalType] = useState('');

    const EnterReason = (item, status) => {
        setIsModalVisible(!isModalVisible);
        setApprovalType(status);
        setTempID(item.id)
    };

    // Table data

    const renderTableRows = () => {
        return visibleData.map((item, index) => (
            <Row key={index}
                data={[
                    <Text style={styles.cellText}>{(currentPage - 1) * itemsPerPage + index + 1}</Text>,
                    <Text style={styles.cellText}>{item.meeting_title}</Text>,
                    <Text style={styles.cellText}>{item.hrname}</Text>,
                    <Text style={styles.cellText}>{item.teamname}</Text>,
                    <Text style={styles.cellText}>{item.membername}</Text>,
                    <Text style={styles.cellText}>{item.meeting_date}</Text>,
                    <Text style={styles.cellText}>{item.start_time}</Text>,
                    <Text style={styles.cellText}>{item.end_time}</Text>,
                    <Text style={styles.cellText}>{item.meeting_reason}</Text>,
                    <Text style={styles.cellText}>{item.meeting_remarks}</Text>,
                    <Text style={styles.cellText}>{item.empreason}</Text>,
                    item.emp_status == null ? (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => EnterReason(item, 'Approved')} >
                                <Text style={styles.approveButton}>Approve</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => EnterReason(item, 'Rejected')}>
                                <Text style={styles.rejectButton}>Reject</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text style={styles.cellText}>{item.emp_status}</Text>
                    )
                    ,

                ]}
                style={styles.row}
                textStyle={styles.rowText}
                widthArr={[100, 100, 100, 200, 200, 100, 100, 100, 200, 150, 150, 200]}
            />
        ));
    };

    // FilterData

    const [filterText, setFilterText] = useState('');

    const filteredData = tableData.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase()));
    });

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleData = filteredData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Api call for setTableData

    const [loading, setLoading] = useState(false);

    const fetchTableData = async () => {
        setLoading(true);
        const apiUrl = 'https://officeinteriorschennai.com/api/public/api/view_meeting_list';
        const requestData = {
            meetinglistroleid: data.userrole,
            meetinglistempid: data.userempid,
        };
        try {
            const response = await axios.post(apiUrl, requestData, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            const responsedata = response.data.data;
            setTableData(responsedata);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    // refreshing

    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        fetchTableData();
    }

    // isFocused

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            fetchTableData();
        }
    }, [isFocused]);

    // isModalVisible

    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const HandleReasonSubmit = () => {
        toggleModal();
        handleActionAcceptandReject()
    }

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
            <View style={styles.container}>

                <View>
                    <Text style={styles.heading}>View Meeting :</Text>
                </View>

                <View style={styles.exportContainer}>
                    <TouchableOpacity style={styles.exportButton}
                    // onPress={exportToExcel}
                    >
                        <Text style={styles.exportButtonText}>Export
                            to Excel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.exportButton}
                    // onPress={exportToPDF}
                    >
                        <Text style={styles.exportButtonText}>Export
                            to PDF</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.filterInput}>
                    <TextInput
                        style={styles.search}
                        placeholder="Search"
                        value={filterText}
                        onChangeText={text => {
                            setFilterText(text);
                            setCurrentPage(1);
                        }}
                    />
                    <View style={styles.searchIcon}>
                        <SearchIcon color={Grey} />
                    </View>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color={PrimaryBlue} style={styles.activityIndicator} />
                ) : (
                    <>
                        <View>
                            <ScrollView horizontal>
                                <View style={styles.tableContainer}>
                                    <Table borderStyle={styles.tableBorder}>
                                        <Row
                                            data={['S.No', 'Title', 'Created by', 'Teams', 'Members', 'Date', 'Start Time', 'End Time', 'Agenda', 'Remarks', 'Reason', 'Action']}
                                            style={styles.tableHeader}
                                            textStyle={styles.headerText}
                                            widthArr={[100, 100, 100, 200, 200, 100, 100, 100, 200, 150, 150, 200]}
                                        />
                                        {visibleData.length === 0 ? (
                                            <Row
                                                data={['No search data found']}
                                                style={styles.noDataRow}
                                                textStyle={styles.noDataRowText}
                                                widthArr={[styles.tableContainer.width]}
                                            />
                                        ) : (
                                            renderTableRows()
                                        )}
                                    </Table>
                                </View>
                            </ScrollView>

                            <View style={styles.paginationContainer}>
                                <TouchableOpacity
                                    style={styles.arrowstyle}
                                    disabled={currentPage === 1}
                                    onPress={() => setCurrentPage(currentPage - 1)}
                                >
                                    <LeftArrowIcon color={White} />
                                </TouchableOpacity>
                                <Text style={styles.paginationText}>Page
                                    {currentPage} off {totalPages} </Text>
                                <TouchableOpacity
                                    style={styles.arrowstyle}
                                    disabled={endIndex >= filteredData.length}
                                    onPress={() => setCurrentPage(currentPage + 1)}
                                >
                                    <RightArrowIcon color={White} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </>
                )}


                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={isModalVisible}
                    onRequestClose={toggleModal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>


                            <Text style={styles.modalTitle}>Selected Type: {approvalType}</Text>

                            <Text style={styles.modalTitle}>Enter Reason</Text>

                            <TextInput
                                value={reason}
                                style={[styles.modalInput, { height: 4 * 25, textAlignVertical: 'top', padding: 10 }]} // Adjust the height as needed
                                placeholder="Enter Reason"
                                onChangeText={(text) => setReason(text)}
                                multiline
                                numberOfLines={4}
                            />

                            <TouchableOpacity onPress={HandleReasonSubmit}>
                                <Text style={styles.modalButton}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


            </View>
        </ScrollView>
    )
}

export default MeetingListEmployee;