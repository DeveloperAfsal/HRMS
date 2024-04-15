import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { Table, Row } from 'react-native-table-component';
import SearchIcon from '../../../../../assets/EPK CRM Icons/Search.svg';
import RightArrowIcon from '../../../../../assets/EPK CRM Icons/Arrow2.svg';
import LeftArrowIcon from '../../../../../assets/EPK CRM Icons/Arrow2Leftside.svg';
import axios from "axios";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useSelector } from "react-redux";
import { Ash, PrimaryBlue, White } from "../../../../../assets/Colors";

const MonthlyAttendanceCount = () => {

    // data from redux-store

    const { data } = useSelector((state) => state.login);

    // states

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // Api call

    const fetchData = async () => {

        setLoading(true);

        try {
            const response = await axios.post(
                'https://officeinteriorschennai.com/api/public/api/monthlyemployeeattendancepresentcount',
                {
                    monthlyloginempid: data.userempid,
                    monthlyemployeeattendancepresentcount: data.userrole
                },
                {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                }
            );
            setTableData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // search filter

    const [filterText, setFilterText] = useState('');

    const filteredData = tableData.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase()));
    });

    // paginations

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleData = filteredData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Export-Excel 

    const exportToExcel = async () => {

        const tableHead = ['S.No', 'Name', 'No of Days Present', 'No of Days Absent', 'No of Leave', 'No of Half Days', 'No of Late', 'No of Permission'];

        const tableData1 = filteredData.map((item, index) => [
            index + 1,
            item.first_name || '-',
            item.days_present || '-',
            item.days_absent || '-',
            item.days_leave || '-',
            item.days_halfday || '-',
            item.days_late || '-',
            item.days_permission || '-',
        ]);

        const csvData = [tableHead, ...tableData1];

        // console.log('CSV Data:', csvData);

        const ws = XLSX.utils.aoa_to_sheet(csvData);
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

    // Export-PDF

    const exportToPDF = async () => {
        const tableHead = ['S.No', 'Name', 'No of Days Present', 'No of Days Absent', 'No of Leave', 'No of Half Days', 'No of Late', 'No of Permission'];

        const tableData1 = filteredData.map((item, index) => [
            index + 1,
            item.first_name || '-',
            item.days_present || '-',
            item.days_absent || '-',
            item.days_leave || '-',
            item.days_halfday || '-',
            item.days_late || '-',
            item.days_permission || '-',
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

    // table data

    const renderTableRows = () => {
        return visibleData.map((item, index) => (
            <Row key={index}
                data={[<Text style={styles.cellText}>{(currentPage - 1) * itemsPerPage + index + 1}</Text>,
                <Text style={styles.cellText}>{item.first_name}</Text>,
                <Text style={styles.cellText}>{item.days_present == null ? '-' : item.days_present}</Text>,
                <Text style={styles.cellText}>{item.days_absent == null ? '-' : item.days_absent}</Text>,
                <Text style={styles.cellText}>{item.days_leave == null ? '-' : item.days_leave}</Text>,
                <Text style={styles.cellText}>{item.days_halfday == null ? '-' : item.days_halfday}</Text>,
                <Text style={styles.cellText}>{item.days_late == null ? '-' : item.days_late}</Text>,
                <Text style={styles.cellText}>{item.days_permission == null ? '-' : item.days_permission}</Text>,
                ]}
                style={styles.row}
                textStyle={styles.rowText}
                widthArr={[100, 150, 100, 100, 100, 100, 100, 100]}
            />
        ));
    };


    return (
        <View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}>

                <View style={styles.container}>

                    <View>
                        <Text style={styles.heading}>Attendance List :</Text>
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
                            <SearchIcon color={Ash} />
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
                                                data={['S.No', 'Name', 'No of Days \n Present', 'No of Days \n Absent', 'No of Leave', 'No of Half Days', 'No of Late', 'No of Permission']}
                                                style={styles.tableHeader}
                                                textStyle={styles.headerText}
                                                widthArr={[100, 150, 100, 100, 100, 100, 100, 100]}
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
                                    <Text style={styles.paginationText}>
                                        Page  {currentPage} off {totalPages}
                                    </Text>
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
        </View>
    )

}

export default MonthlyAttendanceCount;