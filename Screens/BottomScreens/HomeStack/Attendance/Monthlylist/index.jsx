import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import SearchIcon from "../../../../../Assets/Icons/Search.svg"
import ArrowRightIcon from "../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../Assets/Icons/leftarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "../DailyAttendance/style";
import axios from "axios";
import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const MonthlyList = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setStartDate(date);
        }
        setShowDatePicker(Platform.OS === 'ios');
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}`;

    const [loadData, setLoadData] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [filterText, setFilterText] = useState('');

    const itemsPerPage = 8;

    const filteredData = datalist.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase()));
    });

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = [...Array(totalPages).keys()].map(num => num + 1);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    // 

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://ocean21.in/api/public/api/get_allmonthlyAttendanceList';
            const payload = {
                roleid: data.userrole,
                loginempid: data.userempid,
                yearmonth: formattedStartDate
            };

            const response = await axios.post(apiUrl, payload, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            setLoadData(false);

            const responseData = response.data.data;

            setDatalist(responseData);

        } catch (error) {
            setLoadData(false)
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [formattedStartDate])

    // Export-Excel 

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Employee Name', 'Date', 'In Time', 'Out Time', 'P/A/L/HL', 'LA', 'PR', 'OT', 'Total Hours'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.first_name,
            rowData.checkin_date,
            rowData.checkin_time,
            rowData.checkout_time,
            rowData.emp_present,
            rowData.emp_late,
            rowData.emp_permission,
            rowData.emp_onduty,
            rowData.checkout_total_hours,
        ]);

        const csvString = tableHead.join(',') + '\n' +
            tableData1.map(row => row.join(',')).join('\n');

        const ws = XLSX.utils.aoa_to_sheet([tableHead, ...tableData1]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

        try {
            const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
            const fileUri = RNFS.CachesDirectoryPath + '/Employee_Confirmation.xlsx';

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
        const tableHead = ['S.No', 'Employee Name', 'Date', 'In Time', 'Out Time', 'P/A/L/HL', 'LA', 'PR', 'OT', 'Total Hours'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.first_name,
            rowData.checkin_date,
            rowData.checkin_time,
            rowData.checkout_time,
            rowData.emp_present,
            rowData.emp_late,
            rowData.emp_permission,
            rowData.emp_onduty,
            rowData.checkout_total_hours,
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

        try {
            const { filePath } = await RNHTMLtoPDF.convert({
                html: htmlContent,
                fileName: 'Employee_Confirmation',
                directory: RNFS.DocumentDirectoryPath,
            });

            Share.open({
                url: `file://${filePath}`,
                type: 'application/pdf',
                title: 'Export to PDF',
            });
        } catch (error) {
            console.error('Error exporting to PDF:', error);
        }
    };


    // 

    const allKeys = paginatedData.reduce((keys, record) => {
        Object.keys(record).forEach(key => {
            if (!keys.includes(key) && key !== "Name" && key !== "id" && key !== "emp_status") {
                keys.push(key);
            }
        });
        return keys;
    }, []).sort((a, b) => a - b);

    return (
        <ScrollView>
            <View style={styles.Container}>

                <View style={styles.AgentaView}>

                    <View style={styles.top}>
                        <Text style={[styles.Agenta, { color: '#404040' }]}>P - Present</Text>
                        <Text style={[styles.Agenta, { color: '#FB5A00' }]}>LA - Late</Text>
                        <Text style={[styles.Agenta, { color: '#9BB500' }]}>PR - Permission</Text>
                        <Text style={[styles.Agenta, { color: '#6B057B' }]}>HL - Half Day</Text>
                        <Text style={[styles.Agenta1, { color: '#404040' }]}>OT - Over Time</Text>
                    </View>

                    <View >
                        <Text style={[styles.Agenta, { color: '#C20076' }]}>AB - Absent</Text>
                        <Text style={[styles.Agenta, { color: '#C0000C' }]}>L - Leave</Text>
                        <Text style={[styles.Agenta, { color: '#5E20C8' }]}>W - Week Off</Text>
                        <Text style={[styles.Agenta, { color: '#028A00' }]}>H - Holiday</Text>
                        
                    </View>

                </View>

                <View style={styles.ButtonContainer}>
                    <TouchableOpacity style={[styles.Button, { marginRight: '5%' }]}
                        onPress={exportToExcel}
                    >
                        <Text style={styles.ButtonText}>
                            Export to Excel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Button}
                        onPress={exportToPDF}
                    >
                        <Text style={styles.ButtonText}>
                            Export to PDF
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.InputContainer}>
                    <TextInput
                        style={styles.Input}
                        value={filterText}
                        onChangeText={text => {
                            setFilterText(text);
                            setCurrentPage(1);
                        }}
                    />
                    <View style={styles.IconBg}>
                        <SearchIcon color={'#474747'} width={24} height={24} />
                    </View>
                </View>

                <View style={styles.inputs} >
                    <Text onPress={showDatepicker}>
                        {startDate.toDateString()} &nbsp;
                    </Text>
                    {showDatePicker && (
                        <DateTimePicker
                            value={startDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </View>

                <ScrollView horizontal={true}>

                    <View style={styles.Tablecontainer}>
                        {loadData ? (
                            <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                        ) : (
                            <View>

                                <View style={[styles.row, styles.listHeader]}>
                                    <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Employee Name</Text>
                                    {allKeys.map((day, index) => (
                                        <Text key={index} style={[styles.header, styles.cell, styles.DepartmentName]}>{day}</Text>
                                    ))}
                                </View>

                                {paginatedData.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <TouchableOpacity key={index} style={[styles.row, styles.listBody]} onPress={() => navigation.navigate('Indvidual', {
                                            Id: item.id,
                                        })}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.Name}</Text>
                                            {allKeys.map((day, index) => (
                                                <View key={index} style={{
                                                    backgroundColor: item[day] === "HL" ? "#6B057B" :
                                                        item[day] === "LA" ? "#FB5A00" :
                                                            item[day] === "PR" ? "#9BB500" :
                                                                item[day] === "AB" ? "#C20076" :
                                                                    item[day] === "L" ? "#C0000C" :
                                                                        null,
                                                    borderRadius: 25,
                                                    width: 100,
                                                    borderWidth: 5,
                                                    borderColor: '#fff'
                                                }}>
                                                    <Text style={[styles.cell, {
                                                        color: item[day] === "HL" ? "#fff" :
                                                            item[day] === "LA" ? "#fff" :
                                                                item[day] === "L" ? "#fff" :
                                                                    item[day] === "PR" ? "#fff" :
                                                                        item[day] === "W" ? "#5E20C8" :
                                                                            item[day] === "P" ? "#404040" :
                                                                                item[day] === "H" ? "#028A00" :
                                                                                    null,
                                                    }]}>
                                                        {item[day]}
                                                    </Text>
                                                </View>
                                            ))}
                                        </TouchableOpacity>
                                    ))
                                )}

                            </View>
                        )
                        }
                    </View>

                </ScrollView>

                <View style={{ alignItems: 'center' }}>
                    <View style={styles.pagination}>

                        <TouchableOpacity style={styles.prev}
                            onPress={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ArrowLeftIcon width={14} height={14} color={'#737373'} />
                            <Text style={styles.prevText}>
                                Prev
                            </Text>
                        </TouchableOpacity>

                        {pages.map(page => (
                            <Text
                                key={page}
                                style={[styles.pageNo, currentPage === page ? styles.PageActive : null]}
                                onPress={() => onPageChange(page)}
                            >
                                {page}
                            </Text>
                        ))}

                        <TouchableOpacity style={styles.Next}
                            onPress={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <Text style={styles.NextText}>
                                Next
                            </Text>
                            <ArrowRightIcon width={14} height={14} color={'#0A62F1'} />
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

export default MonthlyList;