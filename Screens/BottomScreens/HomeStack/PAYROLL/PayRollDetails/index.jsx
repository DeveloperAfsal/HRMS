import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { Table, Row } from 'react-native-table-component';
import SearchIcon from '../../../../../assets/EPK CRM Icons/Search.svg';
import RightArrowIcon from '../../../../../assets/EPK CRM Icons/Arrow2.svg';
import LeftArrowIcon from '../../../../../assets/EPK CRM Icons/Arrow2Leftside.svg';
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Grey, White } from "../../../../../assets/Colors";

const PayRollDetails = ({ navigation }) => {

    // data from redux store

    const { data } = useSelector((state) => state.login)

    // route

    const route = useRoute();
    const { id } = route.params;

    // states

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // Api call for setTableData

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://officeinteriorschennai.com/api/public/api/list_all_single_payslip/${id}`, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            setTableData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // navigation

    const ViewPayslip = (item) => {
        navigation.navigate('Pay Slip', { item })
    }

    // Table Data

    const renderTableRows = () => {
        return visibleData.map((item, index) => (
            <Row key={index}
                data={[
                    <Text style={styles.cellText}>{(currentPage - 1) * itemsPerPage + index + 1}</Text>,
                    <Text style={styles.cellText}>{item.payslipmonthyear}</Text>,
                    <Text style={styles.cellText}>{item.emp_lop}</Text>,
                    <Text style={styles.cellText}>{Number(item.basicda_amount).toFixed(0)}</Text>,
                    <Text style={styles.cellText}>{Number(item.hra_amount).toFixed(0)}</Text>,
                    <Text style={styles.cellText}>{Number(item.transportallowance_amount).toFixed(0)}</Text>,
                    <Text style={styles.cellText}>{Number(item.conveyanceallowance_amount).toFixed(0)}</Text>,
                    <Text style={styles.cellText}>{Number(item.otherallowances_amount).toFixed(0)}</Text>,
                    <Text style={styles.cellText}>{Number(item.totalnetpay_amount).toFixed(0)}</Text>,
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => ViewPayslip(item)}>
                            <Text style={styles.rejectButton}>View Payslip</Text>
                        </TouchableOpacity>
                    </View>,
                ]}
                style={styles.row}
                textStyle={styles.rowText}
                widthArr={[100, 100, 100, 100, 100, 100, 100, 100, 100, 200]}
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

    // exportToExcel

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Month', 'Loss of Pay', 'Basic + DA', 'HRA', 'Transport Allowwance', 'Conveyance Allowance', 'Other Allowance', 'Net Pay'];

        const tableData1 = filteredData.map((item, index) => [
            index + 1,
            item.payslipmonthyear,
            item.emp_lop,
            item.basicda_amount,
            item.hra_amount,
            item.transportallowance_amount,
            item.conveyanceallowance_amount,
            item.otherallowances_amount,
            item.totalnetpay_amount
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
        const tableHead = ['S.No', 'Month', 'Loss of Pay', 'Basic + DA', 'HRA', 'Transport Allowwance', 'Conveyance Allowance', 'Other Allowance', 'Net Pay'];

        const tableData1 = filteredData.map((item, index) => [
            index + 1,
            item.payslipmonthyear,
            item.emp_lop,
            item.basicda_amount,
            item.hra_amount,
            item.transportallowance_amount,
            item.conveyanceallowance_amount,
            item.otherallowances_amount,
            item.totalnetpay_amount
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
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.heading}>Pay Roll Details :</Text>
                </View>
                <View style={styles.exportContainer}>
                    <TouchableOpacity style={styles.exportButton}
                        onPress={exportToExcel}
                    >
                        <Text style={styles.exportButtonText}>Export to Excel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.exportButton}
                        onPress={exportToPDF}
                    >
                        <Text style={styles.exportButtonText}>Export to PDF</Text>
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

                <ScrollView horizontal>
                    <View style={styles.tableContainer}>
                        <Table borderStyle={styles.tableBorder}>
                            <Row
                                data={['S.No', 'Month', 'Loss of Pay', 'Basic + DA', 'HRA', 'Transport Allowwance', 'Conveyance Allowance', 'Other Allowance', 'Net Pay', 'Action']}
                                style={styles.tableHeader}
                                textStyle={styles.headerText}
                                widthArr={[100, 100, 100, 100, 100, 100, 100, 100, 100, 200]}
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
        </ScrollView>
    )
}

export default PayRollDetails;