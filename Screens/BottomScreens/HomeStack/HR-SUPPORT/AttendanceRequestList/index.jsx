import React, { useEffect, useState } from "react";
import styles from "./style";
import { ActivityIndicator, Alert, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Table, Row } from 'react-native-table-component';
import SearchIcon from '../../../../../assets/EPK CRM Icons/Search.svg';
import RightArrowIcon from '../../../../../assets/EPK CRM Icons/Arrow2.svg';
import LeftArrowIcon from '../../../../../assets/EPK CRM Icons/Arrow2Leftside.svg';
import { useSelector } from "react-redux";
import axios from "axios";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Grey, PrimaryBlue, White } from "../../../../../assets/Colors";

const HRAttendanceRequest = () => {

    // data from redux-store

    const { data } = useSelector((state) => state.login);

    // states

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);

    // APi call - [1,2,4,7]

    const [conditionDisplay, setConditionDisplay] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://officeinteriorschennai.com/api/public/api/userrolenavigation', {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                setConditionDisplay(response.data.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    // Api Call - request-type

    const fetchTableData = async () => {
        setLoading(true);
        const apiUrl = 'https://officeinteriorschennai.com/api/public/api/attendance-request-lsit';
        const requestData = {
            attendancerequestlistempid: data.userempid,
            attendancerequestlistroleid: data.userrole
        };

        try {
            const response = await axios.post(apiUrl, requestData, {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                    'Content-Type': 'application/json'
                }
            });
            const responsedata = response.data.data;
            // console.log(responsedata, "responsedata1")

            setTableData(responsedata);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    // Api call for appending data

    const handleAction = async (item, value) => {

        try {

            const formData = new FormData();
            formData.append('a_id', item.a_id);
            formData.append('e_id', item.e_id);
            formData.append('hr_id', data.userempid);
            formData.append('hrstatus', value);
            formData.append('request_date', item.request_date);
            formData.append('request_fromtime', item.request_fromtime);
            formData.append('request_totime', item.request_totime);

            const response = await fetch('https://officeinteriorschennai.com/api/public/api/approval_attendance_request', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${data.token}`
                }
            });

            const responseData = await response.json();
            if (responseData.status === 'success') {
                Alert.alert('Success', `Attendance Request ${value}`);
                fetchTableData();
            } else {
                Alert.alert('Failed', `Attendance Request ${value}`);
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Cannot perform action, Try Again Later..');
        }
    };

    // Table Data

    const renderTableRows = () => {
        return visibleData.map((item, index) => (
            <Row key={index}
                data={[
                    <Text style={styles.cellText}>{(currentPage - 1) * itemsPerPage + index + 1}</Text>,
                    <Text style={styles.cellText}>{item.e_name}</Text>,
                    <Text style={styles.cellText}>{item.request_type_name}</Text>,
                    <Text style={styles.cellText}>{item.request_location}</Text>,
                    <Text style={styles.cellText}>{item.request_date}</Text>,
                    <Text style={styles.cellText}>{item.request_fromtime}</Text>,
                    <Text style={styles.cellText}>{item.request_totime}</Text>,
                    <Text style={styles.cellText}>{item.request_reason}</Text>,
                    conditionDisplay.includes(data.userrole) && item.request_status == "Pending" ?
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => handleAction(item, 'Approved')}>
                                <Text style={styles.approveButton}>Approve</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleAction(item, 'Rejected')}>
                                <Text style={styles.rejectButton}>Reject</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <Text style={styles.cellText}>{item.request_status}</Text>,
                ]}
                style={styles.row}
                textStyle={styles.rowText}
                widthArr={[100, 100, 100, 100, 150, 150, 150, 250, 200]}
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

    // pagination

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleData = filteredData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Refresh

    const [refreshing, setRefreshing] = useState(false);
    const HandleRefresh = () => {
        fetchTableData();
    }

    // Exporting Excel 

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Name', 'Type', 'Location', 'Date', 'From Time', 'To Time', 'Reason'];

        const tableData1 = filteredData.map(item, index => [
            index + 1,
            item.e_name,
            item.request_type_name,
            item.request_location,
            item.request_date,
            item.request_fromtime,
            item.request_totime,
            item.request_reason
        ]);

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

    // Exporting PDF

    const exportToPDF = async () => {
        const tableHead = ['S.No', 'Name', 'Type', 'Location', 'Date', 'From Time', 'To Time', 'Reason'];

        const tableData1 = filteredData.map(item, index => [
            index + 1,
            item.e_name,
            item.request_type_name,
            item.request_location,
            item.request_date,
            item.request_fromtime,
            item.request_totime,
            item.request_reason
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
                                ${tableData1.map(row => `<tr>${row.map((cell, index) =>
            `<td style="${index === 1 ? 'text-align: left;' : ''}">${cell}</td>`).join('')}</tr>`).join('')}
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
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={HandleRefresh} />}>
            <View style={styles.container} >

                <View>
                    <Text style={styles.heading}>Attendance Request List :</Text>
                </View>

                <View style={styles.exportContainer}>
                    <TouchableOpacity style={styles.exportButton}
                        onPress={exportToExcel}>
                        <Text style={styles.exportButtonText}>Export
                            to Excel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.exportButton}
                        onPress={exportToPDF}>
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
                ) : (<>
                    <View>
                        <ScrollView horizontal>
                            <View style={styles.tableContainer}>
                                <Table borderStyle={styles.tableBorder}>
                                    <Row
                                        data={['S.No', 'Name', 'Type', 'Location', 'Date', 'From Time', 'To Time', 'Reason', 'Status']}
                                        style={styles.tableHeader}
                                        textStyle={styles.headerText}
                                        widthArr={[100, 100, 100, 100, 150, 150, 150, 250, 200]}
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
                                <LeftArrowIcon color="white" />
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
                </>)}


            </View>
        </ScrollView>
    )
}

export default HRAttendanceRequest;