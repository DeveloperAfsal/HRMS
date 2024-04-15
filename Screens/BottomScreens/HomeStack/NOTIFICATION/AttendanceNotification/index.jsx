import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
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
import { Grey, PrimaryBlue, PrimaryRed, White } from "../../../../../assets/Colors";

const NotificationsScreen = ({ }) => {

    // data from redux-store

    const { data } = useSelector((state) => state.login);

    // states

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Api call

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://officeinteriorschennai.com/api/public/api/view_notification/${data.userrole}/${data.userempid}`,
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
        fetchData();
    }, []);

    // table data

    const renderTableRows = () => {
        return visibleData.map((item, index) => {
            return (
                <Row
                    key={index}
                    data={[
                        <Text style={styles.cellText}>{(currentPage - 1) * itemsPerPage + index + 1}</Text>,
                        <Text style={styles.cellText}>{item.first_name}</Text>,
                        <Text style={styles.cellText}>{item.month}</Text>,
                        <Text style={{ ...styles.cellText, backgroundColor: (item.late_count > 3 ? PrimaryRed : 'transparent') }}>{item.late_count}</Text>,
                        <Text style={{ ...styles.cellText, backgroundColor: (item.permission_count > 2) ? PrimaryRed : 'transparent' }}>{item.permission_count}</Text>,
                        <Text style={{ ...styles.cellText, backgroundColor: (item.halfday_count > 2) ? PrimaryRed : 'transparent' }}>{item.halfday_count}</Text>,
                        <Text style={{ ...styles.cellText, backgroundColor: (item.absent_count > 1) ? PrimaryRed : 'transparent' }}>{item.absent_count}</Text>,
                    ]}
                    style={styles.row}
                    textStyle={styles.rowText}
                    widthArr={[100, 150, 100, 100, 100, 100, 100, 100]}
                />

            );
        });
    };

    // filter

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

    // Exporting Excel 

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Name', 'Month', 'Late', 'Permission', 'Half Day', 'Absent'];

        const tableData1 = filteredData.map((item, index) => [
            index + 1,
            item.first_name || '-',
            item.month || '-',
            item.late_count || '-',
            item.permission_count || '-',
            item.halfday_count || '-',
            item.absent_count || '-',
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
        const tableHead = ['S.No', 'Name', 'Month', 'Late', 'Permission', 'Half Day', 'Absent'];

        const tableData1 = filteredData.map((item, index) => [
            index + 1,
            item.first_name || '-',
            item.month || '-',
            item.late_count || '-',
            item.permission_count || '-',
            item.halfday_count || '-',
            item.absent_count || '-',
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
        <ScrollView>

            <View style={styles.container}>

                <View>
                    <Text style={styles.heading}>Attendance Notification: </Text>
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
                                        data={['S.No', 'Name', 'Month', 'Late', 'Permission', 'Half Day', 'Absent']}
                                        style={styles.tableHeader}
                                        textStyle={styles.headerText}
                                        widthArr={[100, 150, 100, 100, 100, 100, 100]}
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
                                off  </Text>
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

export default NotificationsScreen;