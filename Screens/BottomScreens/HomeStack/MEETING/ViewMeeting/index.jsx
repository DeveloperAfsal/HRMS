import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { Table, Row } from 'react-native-table-component';
import SearchIcon from '../../../../../assets/EPK CRM Icons/Search.svg';
import RightArrowIcon from '../../../../../assets/EPK CRM Icons/Arrow2.svg';
import LeftArrowIcon from '../../../../../assets/EPK CRM Icons/Arrow2Leftside.svg';
import DeleteIcon from '../../../../../assets/EPK CRM Icons/Delete.svg';
import EditIcon from '../../../../../assets/EPK CRM Icons/Edit.svg';
import { useSelector } from "react-redux";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Black, Grey, PrimaryBlue, White } from "../../../../../assets/Colors";

const MeetingList = ({ navigation }) => {

    // data from redux-store

    const { data } = useSelector((state) => state.login);

    // states

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Api call for setConditionDisplay

    const [conditionDisplay, setConditionDisplay] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://officeinteriorschennai.com/api/public/api/userrolenavigation',
                    {
                        headers: {
                            Authorization: `Bearer ${data.token}`,
                        },
                    }
                );
                setConditionDisplay(response.data.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    // Navigations

    const handleEdit = (item) => {
        navigation.navigate('Edit Meeting', { Id: item.id })
    }

    const handleNavigateToStatusUpdate = (item, status) => {
        navigation.navigate('Remarks Update', { item: item, status: status });
    };

    // Delete Handler

    const handleDelete = async (item) => {

        Alert.alert(
            'Confirmation',
            'Are you sure you want to delete this?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            const response = await fetch(`https://officeinteriorschennai.com/api/public/api/deletemeeting/${item.id}`, {
                                method: 'GET',
                                headers: {
                                    Authorization: `Bearer ${data.token}`,
                                },
                            });
                            console.log(response, "Delete-response")
                            if (response.ok) {
                                Alert.alert('Success', 'Data deleted successfully');
                                fetchTableData();
                            } else {
                                Alert.alert('Error', 'Failed to delete data. Please try again.');
                            }
                        } catch (error) {
                            console.error('Error:', error);
                            Alert.alert('Error', 'An error occurred. Please try again.');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    // Table Data

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
                    <TouchableOpacity onPress={() => { handleNavigateToStatusUpdate(item, 'Approved') }}>
                        <Text style={styles.cellText}>{item.approved_approval}</Text>
                    </TouchableOpacity>,
                    <TouchableOpacity onPress={() => { handleNavigateToStatusUpdate(item, 'Rejected') }}>
                        <Text style={styles.cellText}>{item.rejected_approval}</Text>
                    </TouchableOpacity>,
                    conditionDisplay.includes(data.userrole) ? (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => handleEdit(item)}>
                                <EditIcon width={15} height={15} color={Black} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item)}>
                                <DeleteIcon width={15} height={15} color={Black} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text style={styles.cellText}>{item.emp_status}</Text>
                    )
                ]}
                style={styles.row}
                textStyle={styles.rowText}
                widthArr={[100, 100, 100, 200, 200, 100, 100, 100, 200, 150, 150, 150, 200]}
            />
        ));
    };

    // Filtering

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

    // isFocused

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            fetchTableData();
        }
    }, [isFocused]);

    // Handle Refresh

    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        fetchTableData();
    }

    // Api call setTableData

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

    // exportToExcel

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Title', 'Created by', 'Teams', 'Members', 'Date', 'Start Time', 'End Time', 'Agenda', 'Remarks', 'Action'];

        const tableData1 = filteredData.map((item, index) => [
            index + 1,
            item.meeting_title,
            item.hrname,
            item.teamname,
            item.membername,
            item.meeting_date,
            item.start_time,
            item.end_time,
            item.meeting_reason,
            item.meeting_remarks,
        ]);

        const csvString = tableHead.join(',') + '\n' +
            tableData1.map(row => row.join(',')).join('\n');

        const ws = XLSX.utils.aoa_to_sheet([tableHead, ...tableData1]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        try {
            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
            const fileUri = RNFS.CachesDirectoryPath + '/Attendance_list.xlsx';

            await RNFS.writeFile(fileUri, wbout, 'base64');

            // Check if file is correctly written
            console.log('File written to:', fileUri);

            // Share the file
            const options = {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                url: 'file://' + fileUri,
                title: 'Share Excel File',
            };
            await Share.open(options);
        } catch (error) {
            console.error('Error exporting to Excel:', error);
        }
    };

    // exportToPDF

    const exportToPDF = async () => {
        const tableHead = ['S.No', 'Title', 'Created by', 'Teams', 'Members', 'Date', 'Start Time', 'End Time', 'Agenda', 'Remarks'];

        const tableData1 = filteredData.map((item, index) => [
            index + 1,
            item.meeting_title,
            item.hrname,
            item.teamname,
            item.membername,
            item.meeting_date,
            item.start_time,
            item.end_time,
            item.meeting_reason,
            item.meeting_remarks,
        ]);

        const htmlContent = `
          <html>
            <head>
              <style>
              @page {
                size: landscape; /* Set the page to landscape mode */
              }
                table {
                  border-collapse: collapse;
                  width: 100%;
                }
                th, td {
                  border: 1px solid black;
                  padding: 8px;
                  text-align: center;
                }
              </style>
            </head>
            <body>
              <table>
                <thead>
                  <tr>
                    ${tableHead.map(column => `<th>${column}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${tableData1.map(row => `<tr>${row.map(cell =>
            `<td>${cell}</td>`).join('')}</tr>`).join('')}
                </tbody>
              </table>
            </body>
          </html>
        `;

        const { filePath } = await RNHTMLtoPDF.convert({
            html: htmlContent,
            fileName: 'Attendance_list',
            directory: RNFS.DocumentDirectoryPath,
        });

        Share.open({
            url: `file://${filePath}`,
            type: 'application/pdf',
            title: 'Export to PDF',
        });
    };

    return (

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>

            <View style={styles.container}>

                <View>
                    <Text style={styles.heading}>View Meeting :</Text>
                </View>

                <View style={styles.exportContainer}>
                    <TouchableOpacity style={styles.exportButton}
                        onPress={exportToExcel}
                    >
                        <Text style={styles.exportButtonText}>Export
                            to Excel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.exportButton}
                        onPress={exportToPDF}
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
                                            data={['S.No', 'Title', 'Created by', 'Teams', 'Members', 'Date', 'Start Time', 'End Time', 'Agenda', 'Remarks', 'Approved List', 'Rejected List', 'Action']}
                                            style={styles.tableHeader}
                                            textStyle={styles.headerText}
                                            widthArr={[100, 100, 100, 200, 200, 100, 100, 100, 200, 150, 150, 150, 200]}
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
            </View>

        </ScrollView>

    )
}

export default MeetingList;