import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, TextInput } from 'react-native';
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
import styles from "./style"
import { Grey, PrimaryBlue, White } from "../../../../../assets/Colors";

const TLPermissionRequest = () => {

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

    // API call 

    const fetchTableData = async () => {

        setLoading(true);
        const apiUrl = 'https://officeinteriorschennai.com/api/public/api/tl_halfday_list_approval';

        const requestData = {
            halfdayapprovallistroleid: data.userempid,
            halfdayapprovallistempid: data.userrole,
        };

        try {
            const response = await axios.post(apiUrl, requestData, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            console.log(responseData, "leave")
            setTableData(responseData);
            setLoading(false);

        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };

    useEffect(() => {
        fetchTableData();
    }, []);

    // handler appending data

    const handleAction = async (item, value) => {

        try {
            const formData = new FormData();
            formData.append('id', item.id);
            formData.append('e_id', item.emp_id);
            formData.append('hr_id', userempid);
            formData.append('hrstatus', value);
            formData.append('request_date', item.permission_date);
            formData.append('request_fromtime', item.permission_timefrom);
            formData.append('request_totime', item.permission_timeto);

            const response = await fetch('https://officeinteriorschennai.com/api/public/api/approval_halfday_tl', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = await response.json();

            if (responseData.status == 'success') {
                Alert.alert('Success', `Leave Request ${value}`);
                fetchTableData();
            } else {
                Alert.alert('Failed', `Leave Request ${value}`);
            }
        } catch (error) {
            Alert.alert('Error', 'Cannot perform action, Try Again Later..');
        }

    };

    // table data

    const renderTableRows = () => {
        return visibleData.map((item, index) => (
            <Row key={index}
                data={[
                    <Text style={styles.cellText}>{(currentPage - 1) * itemsPerPage + index + 1}</Text>,
                    <Text style={styles.cellText}>{item.emp_name}</Text>,
                    <Text style={styles.cellText}>{item.category_name}</Text>,
                    <Text style={styles.cellText}>{item.from_date}</Text>,
                    <Text style={styles.cellText}>{item.to_date}</Text>,
                    <Text style={styles.cellText}>{item.leave_reason}</Text>,
                    conditionDisplay.includes(data.userrole) && item.emp_status == "Pending" ?
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => handleAction(item, 'Approved')}>
                                <Text style={styles.approveButton}>Approve</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleAction(item, 'Rejected')}>
                                <Text style={styles.rejectButton}>Reject</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <Text style={styles.cellText}>{item.emp_status}</Text>,
                ]}
                style={styles.row}
                textStyle={styles.rowText}
                widthArr={[100, 100, 150, 150, 150, 250, 200]}
            />
        ));
    };

    // filtering

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

    // refresh

    const [refreshing, setRefreshing] = useState(false);
    const HandleRefresh = () => {
        fetchTableData();
    }

    // Exporting Excel 

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Name', 'Category', 'Date', 'From Time', 'To Time', 'Reason'];

        const tableData1 = filteredData.map((item, index) => [
            index + 1,
            item.emp_name,
            item.category_name,
            item.permission_date,
            item.permission_timefrom,
            item.permission_timeto,
            item.leave_reason
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
        const tableHead = ['S.No', 'Name', 'Category', 'Date', 'From Time', 'To Time', 'Reason'];

        const tableData1 = filteredData.map((item, index) => [
            index + 1,
            item.emp_name,
            item.category_name,
            item.permission_date,
            item.permission_timefrom,
            item.permission_timeto,
            item.leave_reason
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
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={HandleRefresh} />}>

            <View style={styles.container}>

                <View>
                    <Text style={styles.heading}>Leave Request List :</Text>
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
                ) : (<>
                    <View>
                        <ScrollView horizontal>
                            <View style={styles.tableContainer}>
                                <Table borderStyle={styles.tableBorder}>
                                    <Row
                                        data={['S.No', 'Name', 'Category', 'From Date', 'To Date', 'Reason', 'Action']}
                                        style={styles.tableHeader}
                                        textStyle={styles.headerText}
                                        widthArr={[100, 100, 150, 150, 150, 250, 200]}
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
                </>)}

            </View>
        </ScrollView>
    )
}

export default TLPermissionRequest;