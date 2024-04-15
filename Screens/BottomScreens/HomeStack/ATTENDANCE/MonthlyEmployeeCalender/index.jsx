import React, { useEffect, useState } from "react";
import styles from "./style";
import { ActivityIndicator, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Table, Row } from 'react-native-table-component';
import SearchIcon from '../../../../../assets/EPK CRM Icons/Search.svg';
import RightArrowIcon from '../../../../../assets/EPK CRM Icons/Arrow2.svg';
import LeftArrowIcon from '../../../../../assets/EPK CRM Icons/Arrow2Leftside.svg';
import { useSelector } from "react-redux";
import axios from "axios";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import { Ash, PrimaryBlue, PrimaryPurple } from "../../../../../assets/Colors";

const MonthlyEmployeeAttendance = ({ navigation }) => {

    // data from redux-store

    const { data } = useSelector((state) => state.login);

    // states

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

    // handling prev - next

    const HandleNextPrevious = async (value) => {
        let newMonth = currentMonth;
        let newYear = currentYear;

        if (value === 'Next') {
            newMonth = currentMonth + 1;
        } else {
            if (currentMonth === 1) {
                newMonth = 12;
                newYear = currentYear - 1;
            } else {
                newMonth = currentMonth - 1;
            }
        }
        if (newMonth === 13) {
            newMonth = 1;
            newYear = currentYear + 1;
        }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    }

    const headers = tableData.length > 0 ? Object.keys(tableData[0]).filter(header => header !== 'id') : [];
    const columnWidth = Array.from({ length: headers.length + 1 }, () => 100);

    // filter data

    const [filterText, setFilterText] = useState('');

    const filteredData = tableData.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase()));
    });

    // navigate to indvidual id 

    const handleFirstNameClick = (item) => {
        const itemId = item['id'];
        const name = item['first_name']
        navigation.navigate('Monthly Employee Individual', { id: itemId, name: name, currentMonth: currentMonth, currentYear: currentYear });
    };

    // to get the month

    const getMonthName = (monthNumber) => {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "June",
            "July", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        return months[monthNumber - 1];
    };

    const monthName = getMonthName(currentMonth);

    //Api call

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                'https://officeinteriorschennai.com/api/public/api/monthlyemployeelistrole',
                {
                    monthlyemployeelistrole: data.userrole,
                    testmonthlyallloginempid: data.userempid
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
    }, [currentMonth, currentYear]);

    // Export-Excel

    const exportToExcel = async () => {

        const tableHead = ['S.No', ...headers];

        const tableData1 = filteredData.map((rowData, index) => [
            index + 1,
            ...headers.map(key => rowData[key] === null ? '-' : `"${rowData[key]}"`)
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

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}>

            <View style={styles.container}>

                <View style={styles.indicationContainer}>
                    <View>
                        <Text style={styles.indicationText}>P - Present</Text>
                        <Text style={styles.indicationText}>PR - Permission</Text>
                        <Text style={styles.indicationText}>HL - Half Day Leave</Text>
                    </View>

                    <View>
                        <Text style={styles.indicationText}>A - Absent</Text>
                        <Text style={styles.indicationText}>LA - Late</Text>
                    </View>
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

                <View style={styles.exportContainer}>
                    <TouchableOpacity style={styles.exportButton}
                        onPress={exportToExcel}
                    >
                        <Text style={styles.exportButtonText}>Export
                            to Excel</Text>
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color={PrimaryBlue} style={styles.activityIndicator} />
                ) : (<>

                    {currentMonth && currentYear ?
                        <View style={styles.NextPrevButtonContainer}>

                            <TouchableOpacity style={styles.NextButton}
                                onPress={() => { HandleNextPrevious('Previous') }}
                            >
                                <LeftArrowIcon width={22} height={22} color={PrimaryPurple} />
                                <Text style={styles.NextButtonText}>Prev</Text>
                            </TouchableOpacity>

                            <Text style={styles.MonthYear}> {monthName} - {currentYear} </Text>

                            <TouchableOpacity style={styles.NextButton}
                                onPress={() => { HandleNextPrevious('Next') }}
                            >
                                <Text style={styles.NextButtonText}>Next</Text>

                                <RightArrowIcon width={22} height={22} color={PrimaryPurple} />
                            </TouchableOpacity>

                        </View> : null}

                    <ScrollView horizontal>
                        <View style={styles.tableContainer}>
                            <Table borderStyle={styles.tableBorder}>
                                <Row
                                    data={['S.No', ...headers]}
                                    style={styles.tableHeader}
                                    textStyle={styles.headerText}
                                    widthArr={columnWidth}
                                />

                                {filteredData.map((rowData, index) => (
                                    <Row
                                        key={index}
                                        onPress={() => handleFirstNameClick(rowData)}
                                        data={[index + 1, ...headers.map(key => rowData[key] === null ? '-' : rowData[key])]}
                                        style={styles.row}
                                        textStyle={styles.rowText}
                                        widthArr={columnWidth}
                                    />
                                ))}

                            </Table>
                        </View>
                    </ScrollView>

                </>)}

            </View>

        </ScrollView>
    )
}

export default MonthlyEmployeeAttendance;