import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { Table, Row } from 'react-native-table-component';
import SearchIcon from '../../../../assets/EPK CRM Icons/Search.svg';
import RightArrowIcon from '../../../../assets/EPK CRM Icons/Arrow2.svg';
import LeftArrowIcon from '../../../../assets/EPK CRM Icons/Arrow2Leftside.svg';
import { useSelector } from "react-redux";
import axios from "axios";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Ash, PrimaryBlue } from "../../../../assets/Colors";

const YearlyAttendanceCount = () => {

    // data from redux-store

    const { data } = useSelector((state) => state.login);

    // states

    const [loading, setLoading] = useState(false);
    const [attendanceData, setAttendanceData] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    // filter

    const [filterText, setFilterText] = useState('');

    const filteredData = attendanceData.filter(row => {
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

    // table data

    const columnWidths = [50, 200, 50, 50, 50, 50, 70, 90, 50, 70, 70];

    const renderTableRows = () => {
        return visibleData.map((item, index) => (
            <Row key={index}
                data={[<Text style={styles.cellText}>{(currentPage - 1) * itemsPerPage + index + 1}</Text>,
                <Text style={styles.cellText}>{item.first_name}</Text>,
                <Text style={styles.cellText}>{item.days_late == null ? '-' : item.days_late}</Text>,
                <Text style={styles.cellText}>{item.days_permission == null ? '-' : item.days_permission}</Text>,
                <Text style={styles.cellText}>{item.days_halfday == null ? '-' : item.days_halfday}</Text>,
                <Text style={styles.cellText}>{item.days_absent == null ? '-' : item.days_absent}</Text>,
                <Text style={styles.cellText}>{item.lop == null ? '-' : item.lop}</Text>,
                <Text style={styles.cellText}>{item.emp_salary == null ? '-' : '-'}</Text>,
                <Text style={styles.cellText}>{item.empgrosssalary == null ? '-' : '-'}</Text>,
                <Text style={styles.cellText}>{item.emppf == null ? '-' : '-'}</Text>,
                <Text style={styles.cellText}>-</Text>,
                ]}
                style={styles.row}
                textStyle={styles.rowText}
                widthArr={columnWidths}
            />
        ));
    };

    // Export-Excel 

    const exportToExcel = async () => {

        const tableHead = ['S.No', 'Name', 'LA', 'PR', 'HL', 'L', 'Overall LOP', 'Net-Salary', 'Gross-Salary', 'Pf'];

        const tableData1 = filteredData.map((item, index) => [
            index + 1,
            item.first_name || '-',
            item.days_late || '-',
            item.days_permission || '-',
            item.days_halfday || '-',
            item.days_absent || '-',
            item.lop || '-',
            item.emp_salary || '-',
            item.empgrosssalary || '-',
            item.emppf || '-',
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
        const tableHead = ['S.No', 'Name', 'LA', 'PR', 'HL', 'L', 'Overall LOP', 'Net-Salary', 'Gross-Salary', 'PF'];

        const tableData1 = filteredData.map((item, index) => [
            index + 1,
            item.first_name || '-',
            item.days_late || '-',
            item.days_permission || '-',
            item.days_halfday || '-',
            item.days_absent || '-',
            item.lop || '-',
            item.emp_salary || '-',
            item.empgrosssalary || '-',
            item.emppf || '-',
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
                td:nth-child(2) {
                    text-align: left; /* Left-align the second column */
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

    //  API call 

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                'https://officeinteriorschennai.com/api/public/api/account_lsit',
                {
                    lopmonth: currentMonth,
                    lopyear: currentYear
                }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            }


            );

            const responsedata = response.data.data;
            // responsedata.sort((a, b) => a.first_name.localeCompare(b.first_name));

            setAttendanceData(responsedata);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentMonth, currentYear]);

    // Prev - Next Handler

    const handlePrevMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear(prevYear => prevYear - 1);
        } else {
            setCurrentMonth(prevMonth => prevMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1);
            setCurrentYear(prevYear => prevYear + 1);
        } else {
            setCurrentMonth(prevMonth => prevMonth + 1);
        }
    };

    return (

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}>

            <View style={styles.container}>

                <View>
                    <Text style={styles.heading}>Attendance List :</Text>
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
                        <SearchIcon color={Ash} />
                    </View>
                </View>

                <View style={styles.MonthYearHeader}>
                    <Text style={styles.MonthYearHeaderText}>
                        {`${new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long' })} ${currentYear} Attendance Count`}
                    </Text>
                </View>


                <View style={styles.paginationContainer}>

                    <TouchableOpacity
                        style={styles.arrow}
                        onPress={handlePrevMonth}
                    >
                        <Text style={styles.Text}>Previous</Text>
                    </TouchableOpacity>

                    <Text style={styles.paginationText}> Previous Year  -  Next Year </Text>

                    <TouchableOpacity
                        style={styles.arrow}
                        onPress={handleNextMonth}
                    >
                        <Text style={styles.Text}>Next</Text>
                    </TouchableOpacity>

                </View>


                {loading ? (
                    <ActivityIndicator size="large" color={PrimaryBlue} style={styles.activityIndicator} />
                ) : (<>

                    <View>
                        <ScrollView horizontal>

                            <View style={styles.tableContainer}>

                                <Table borderStyle={styles.tableBorder}>
                                    <Row
                                        data={['S.No', 'Name', 'LA', 'PR', 'HL', 'L', 'Overall LOP', 'Gross-Salary', 'PF', 'Net-Salary', 'WA-days']}
                                        style={styles.tableHeader}
                                        textStyle={styles.headerText}
                                        widthArr={columnWidths}
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

                        <View style={styles.paginationContainer1}>

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
                                <RightArrowIcon color="white" />
                            </TouchableOpacity>

                        </View>

                    </View>

                </>)}

            </View>
        </ScrollView>
    )
}

export default YearlyAttendanceCount;