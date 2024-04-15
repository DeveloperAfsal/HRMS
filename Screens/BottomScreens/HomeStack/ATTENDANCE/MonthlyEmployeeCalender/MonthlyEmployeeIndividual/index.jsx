import React, { useEffect, useState } from "react";
import styles from "./style";
import { ActivityIndicator, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Table, Row } from 'react-native-table-component';
import SearchIcon from '../../../../../../assets/EPK CRM Icons/Search.svg';
import axios from "axios";
import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Ash, PrimaryBlue } from "../../../../../../assets/Colors";


const IndividualMonthlyEmployeeAttendance = ({ route }) => {

    // data from redux-store

    const { data } = useSelector((state) => state.login);

    // Routes

    const { id, name } = route.params;

    // states

    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    //Api call

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://officeinteriorschennai.com/api/public/api/viewmonthlyemployeelistempid/${id}`, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            setTableData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // table data

    const renderTableRows = () => {
        return filteredData.map((item, index) => (
            <Row key={index}
                data={[<Text style={styles.cellText}>{index + 1}</Text>,
                <Text style={styles.cellText}>{item.Date}</Text>,
                <Text style={styles.cellText}>{item.checkin_time ? item.checkin_time.slice(10, -3) : ''}</Text>,
                <Text style={styles.cellText}>{item.checkout_time ? item.checkout_time.slice(10, -3) : ''}</Text>,
                <Text style={styles.cellText}>{item.emp_present}</Text>,
                <Text style={styles.cellText}>{item.emp_late}</Text>,
                <Text style={styles.cellText}>{item.emp_permission}</Text>,
                <Text style={styles.cellText}>{item.emp_onduty}</Text>,
                <Text style={styles.cellText}>{item.checkout_total_hours}</Text>,
                ]}
                style={styles.row}
                textStyle={styles.rowText}
                widthArr={[100, 100, 100, 100, 100, 100, 100, 100, 100]}
            />
        ));
    };

    // Export-Excel

    const exportToExcel = async () => {

        const tableHead = ['S.No', 'Date', 'Check In', 'Check Out', 'Present', 'Late', 'Permission', 'On duty', 'Total Hours'];

        const tableData1 = filteredData.map((item, index) => [
            index + 1,
            item.first_name || '-',
            item.checkin_time || '-',
            item.checkout_time || '-',
            item.emp_present || '-',
            item.emp_late || '-',
            item.emp_permission || '-',
            item.emp_onduty || '-',
            item.checkout_total_hours || '-'
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

    // Export-PDF

    const exportToPDF = async () => {
        const tableHead = ['S.No', 'Date', 'Check In', 'Check Out', 'Present', 'Late', 'Permission', 'On duty', 'Total Hours'];

        const tableData1 = filteredData.map((item, index) => [
            index + 1,
            item.first_name || '-',
            item.checkin_time || '-',
            item.checkout_time || '-',
            item.emp_present || '-',
            item.emp_late || '-',
            item.emp_permission || '-',
            item.emp_onduty || '-',
            item.checkout_total_hours || '-'
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

    // search filter

    const [filterText, setFilterText] = useState('');

    const filteredData = tableData.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase()));
    });


    return (
        <View>
            {loading ? (
                <ActivityIndicator size="large" color={PrimaryBlue} style={styles.activityIndicator} />
            ) : (
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}>

                    <View style={styles.container}>

                        <View>
                            <Text style={styles.heading}>{name}'s Attendance List :</Text>
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
                                }}
                            />
                            <View style={styles.searchIcon}>
                                <SearchIcon color={Ash} />
                            </View>
                        </View>


                        {loading ? (
                            <ActivityIndicator size="large" color={PrimaryBlue}/>
                        ) : (<>
                            <View>
                                <ScrollView horizontal>
                                    <View style={styles.tableContainer}>
                                        <Table borderStyle={styles.tableBorder}>
                                            <Row
                                                data={['S.No', 'Date', 'Check In', 'Check Out', 'Present', 'Late', 'Permission', 'On duty', 'Total Hours']}
                                                style={styles.tableHeader}
                                                textStyle={styles.headerText}
                                                widthArr={[100, 100, 100, 100, 100, 100, 100, 100, 100]}
                                            />

                                            {filteredData.length === 0 ? (
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
                            </View>
                        </>)}

                    </View>
                </ScrollView>
            )}
        </View>
    )
}

export default IndividualMonthlyEmployeeAttendance;