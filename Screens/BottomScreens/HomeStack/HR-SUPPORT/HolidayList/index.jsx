import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Modal, TextInput, Alert, Platform, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Table, Row } from 'react-native-table-component';
import styles from "./style";
import { useSelector } from "react-redux";
import axios from "axios";
import CalenderIcon from "../../../../../assets/EPK CRM Icons/Calendar.svg";
import PlusIcon from "../../../../../assets/EPK CRM Icons/plussolid.svg";
import ClockIcon from "../../../../../assets/EPK CRM Icons/Clock.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import SearchIcon from '../../../../../assets/EPK CRM Icons/Search.svg';
import { Picker } from '@react-native-picker/picker';
import { Black, Grey, PrimaryBlue, PrimaryGreen, PrimaryPurple, button } from '../../../../../assets/Colors';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const HolidayList = () => {

    // data from redux-store

    const { data } = useSelector((state) => state.login);

    // states

    const [loading, setLoading] = useState(false);

    const [tableData, setTableData] = useState([]);

    const [holidaydate, setHolidaydate] = useState(new Date());
    const [holidayDay, setHolidayDay] = useState('');
    const [holidayName, setHolidayName] = useState('')


    const [holidaydateedit, setHolidaydateedit] = useState(new Date());
    const [holidayDayedit, setHolidayDayedit] = useState('');
    const [holidayNameedit, setHolidayNameedit] = useState('');

    const [holidayType, setHolidayType] = useState('');

    const HolidayTypeDropdown = ['Select Holiday Type', 'Public Holiday', 'Declared Holiday'];


    const [conditionDisplay, setConditionDisplay] = useState('');
    const [holidayTypeEdit, setHolidayTypeEdit] = useState('');

    const [tempid, setTempid] = useState('')

    // Api call setConditionDisplay

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

    // Api call for setTableData

    const fetchTableData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                'https://officeinteriorschennai.com/api/public/api/viewholidaylist',
                {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                }
            );
            setTableData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    // filtering

    const [filterText, setFilterText] = useState('');

    const filteredData = tableData.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase()));
    });

    // table data

    const renderTableRows = () => {
        return filteredData.map((item, index) => (
            <Row key={index}
                data={[
                    <Text style={[styles.cellText, item.status === 'Declared Holiday' ? { color: PrimaryGreen, fontWeight: 'bold' } : null]}>{index + 1}</Text>,
                    <Text style={[styles.cellText, item.status === 'Declared Holiday' ? { color: PrimaryGreen, fontWeight: 'bold' } : null]}>{item.h_name}</Text>,
                    <Text style={[styles.cellText, item.status === 'Declared Holiday' ? { color: PrimaryGreen, fontWeight: 'bold' } : null]}>{item.h_date}</Text>,
                    <Text style={[styles.cellText, item.status === 'Declared Holiday' ? { color: PrimaryGreen, fontWeight: 'bold' } : null]}>{item.h_day}</Text>,
                    conditionDisplay.includes(data.userrole) ?
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => toggleModal1(item)}>
                                <Text style={styles.approveButton}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item)}>
                                <Text style={styles.rejectButton}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        : <View style={styles.buttonContainer}>
                            <TouchableOpacity >
                                <Text style={styles.disabledapproveButton}>Edit</Text>
                            </TouchableOpacity>
                        </View>,
                ]}
                style={item.status === 'Declared Holiday' ? styles.rowHighlight : styles.row}
                widthArr={[100, 150, 150, 150, 150]}
            />
        ));
    };

    // Modal states

    const [visible, setVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible1, setIsModalVisible1] = useState(false);

    // error handlers

    const [errors, setErrors] = useState({});
    const [errors1, setErrors1] = useState({});

    // toggler for Module's

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const toggleModal1 = (item) => {
        setIsModalVisible1(!isModalVisible1);
        setTempid(item.h_id)
        setHolidayNameedit(item.h_name);
        setHolidayDayedit(item.h_day);
        setHolidaydateedit(new Date(item.h_date));
        setVisible(!visible);
        setHolidayTypeEdit(item.status)

    };

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
                            const response = await fetch(`https://officeinteriorschennai.com/api/public/api/deleteholiday/${item.h_id}`, {
                                method: 'DELETE',
                                headers: {
                                    Authorization: `Bearer ${data.token}`,
                                },
                            });

                            if (response.ok) {
                                Alert.alert('Success', 'Holiday deleted successfully');
                                fetchTableData();
                            } else {
                                Alert.alert('Error', 'Failed to delete Holiday. Please try again.');
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

    // formatter

    const formattedDate = `${holidaydate.getFullYear()}-${holidaydate.getMonth() + 1}-${holidaydate.getDate()}`;
    const formattedDate1 = `${holidaydateedit.getFullYear()}-${holidaydateedit.getMonth() + 1}-${holidaydateedit.getDate()}`;

    // Date pickers

    const [showDatePicker1, setShowDatePicker1] = useState(false);

    const handleDateChange1 = (event, date) => {
        if (date !== undefined) {
            setHolidaydateedit(date);
        }
        setShowDatePicker1(Platform.OS === 'ios');
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setHolidaydate(date);
        }
        setShowDatePicker(Platform.OS === 'ios');
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    // Handler for Edit holiday

    const HandleAddHolidayedit = async () => {

        const newErrors = {};

        if (!holidayNameedit && holidayNameedit.trim().length === 0) {
            newErrors.holidayNameedit = 'This field is required';
        }

        if (!holidayDayedit && holidayDayedit.trim().length === 0) {
            newErrors.holidayDayedit = 'This field is required';
        }

        if (!holidayTypeEdit && holidayTypeEdit.trim().length === 0) {
            newErrors.holidayTypeEdit = 'This field is required';
        }

        setErrors1(newErrors);

        if (Object.keys(newErrors).length === 0) {


            const formData = new FormData();

            formData.append('h_id', tempid);
            formData.append('h_name', holidayNameedit);
            formData.append('h_date', formattedDate1);
            formData.append('h_day', holidayDayedit);
            formData.append('updated_hr_id', data.userempid);
            formData.append('h_status', holidayTypeEdit);


            try {
                const response = await fetch('https://officeinteriorschennai.com/api/public/api/editholiday', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${data.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                });

                const responsedata = await response.json();
                console.log(responsedata, "responsedata")

                if (responsedata.status == 'success') {
                    // handleShowAlert3();
                    const newErrors = {};
                    setErrors1(newErrors);
                    setIsModalVisible1(!isModalVisible1);
                    setHolidayDayedit('');
                    setHolidayNameedit('');
                    setVisible(!visible);
                    fetchTableData('');
                    setHolidayType('');
                }
                else {
                    alert(data.message);
                    // handleShowAlert4();
                    fetchTableData();
                }
            } catch (error) {
                // handleShowAlert5();
                console.log("error4")
            }
        }
        else {
            // handleShowAlert2()
            console.log("error5")
        }
    };

    const HandleCanceledit = () => {
        const newErrors = {};
        setErrors1(newErrors);
        setIsModalVisible1(!isModalVisible1);
        setHolidayDayedit('');
        setHolidayNameedit('');
        setVisible(!visible);
    }

    // Handler for Add holiday

    const HandleAddHoliday = async () => {

        const newErrors = {};

        if (!holidayName && holidayName.trim().length === 0) {
            newErrors.HolidayName = 'This field is required';
        }

        if (!holidayDay && holidayDay.trim().length === 0) {
            newErrors.holidayDay = 'This field is required';
        }

        if (!holidayType && holidayType.trim().length === 0) {
            newErrors.holidayType = 'This field is required';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

            const formData = new FormData();

            formData.append('h_name', holidayName);
            formData.append('h_date', formattedDate);
            formData.append('h_day', holidayDay);
            formData.append('updated_hr_id', data.userempid);
            formData.append('h_status', holidayType);


            try {
                const response = await fetch('https://officeinteriorschennai.com/api/public/api/holidayinsert', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${data.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                });

                const responsedata = await response.json();
                console.log(responsedata, "responsedata")

                if (responsedata.status == 'success') {
                    // handleShowAlert();
                    const newErrors = {};
                    setErrors(newErrors);
                    setIsModalVisible(!isModalVisible);
                    setHolidayDay('');
                    setHolidayName('');
                    setHolidaydate(new Date());
                    fetchTableData('');
                    setHolidayType('');
                }
                else {
                    // handleShowAlert1();
                    console.log("error1")
                    fetchTableData();
                }
            } catch (error) {
                // handleShowAlert5();
                console.log("error2")
            }
        }
        else {
            // handleShowAlert2()
            console.log("error3")
        }
    };

    const HandleCancel = () => {
        const newErrors = {};
        setErrors(newErrors);
        setIsModalVisible(!isModalVisible);
        setHolidayDay('');
        setHolidayName('');
        setHolidaydate(new Date());
        setHolidayType('');
    }

    // refreshing

    const [refreshing, setRefreshing] = useState(false);

    const HandleRefresh = () => {
        setHolidayDay('');
        setHolidayName('');
        setHolidaydate(new Date());
        fetchTableData();
    }

    // Export-Excel 

    const exportToExcel = async () => {

        const tableHead = ['S.No', 'Holiday', 'Date', 'Day'];

        const tableData1 = filteredData.map((item, index) => [
            index + 1,
            item.h_name,
            item.h_date,
            item.h_day,
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
        const tableHead = ['S.No', 'Holiday', 'Date', 'Day',];

        const tableData1 = filteredData.map((item, index) => [
            index + 1,
            item.h_name,
            item.h_date,
            item.h_day,
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
              <h3>Holiday List</h3>
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

        <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={HandleRefresh} />}>

            <View >
                <Text style={styles.heading}>Holiday List :</Text>
            </View>

            {/* export's */}

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

            {/* Add Modal */}

            <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={toggleModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add Holiday</Text>

                        <TextInput
                            style={styles.modalInput}
                            placeholder="Holiday Name"
                            onChangeText={(text) => setHolidayName(text)}
                        />
                        {errors.HolidayName ? <Text style={styles.errorText}>{errors.HolidayName}</Text> : null}

                        <Text style={styles.header}>Holiday Date :</Text>
                        <View style={styles.modalInput} >
                            <Text onPress={showDatepicker}>
                                {holidaydate.toDateString()} &nbsp;
                                <CalenderIcon width={20} height={20} color={Black} />
                            </Text>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={holidaydate}
                                    mode="date"
                                    display="default"
                                    onChange={handleDateChange}
                                />
                            )}
                        </View>

                        <TextInput
                            style={styles.modalInput}
                            placeholder="Day"
                            onChangeText={(text) => setHolidayDay(text)}
                        />
                        {errors.holidayDay ? <Text style={styles.errorText}>{errors.holidayDay}</Text> : null}


                        <View style={[styles.modalInput, { paddingHorizontal: 0 }]}>
                            <Picker
                                selectedValue={holidayType}
                                onValueChange={(itemValue) => {
                                    setHolidayType(itemValue);
                                }}
                            >
                                {HolidayTypeDropdown.map((option, index) => (
                                    <Picker.Item key={index} label={option} value={option} color={Grey} />
                                ))}
                            </Picker>
                        </View>


                        <TouchableOpacity onPress={HandleAddHoliday}>
                            <Text style={styles.modalButton}>Add Holiday</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={HandleCancel}>
                            <Text style={styles.modalButton1}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            {/* Edit Modal */}

            <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible1}
                onRequestClose={toggleModal1}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Holiday</Text>

                        <TextInput
                            value={holidayNameedit}
                            style={styles.modalInput}
                            placeholder="Holiday Name"
                            onChangeText={(text) => setHolidayNameedit(text)}
                        />
                        {errors1.holidayNameedit ? <Text style={styles.errorText}>{errors1.holidayNameedit}</Text> : null}

                        {visible === true ?
                            <>
                                <Text style={styles.header}>Holiday Date :</Text>
                                <View style={styles.modalInput}>
                                    <Text onPress={showDatepicker1}>

                                        {holidaydateedit.toDateString()} &nbsp;
                                        <CalenderIcon width={20} height={20} color={Black} />
                                    </Text>
                                    {showDatePicker1 && (
                                        <DateTimePicker
                                            value={holidaydateedit}
                                            mode="date"
                                            display="default"
                                            onChange={handleDateChange1}
                                        />
                                    )}
                                </View>

                            </> : null}

                        <TextInput
                            value={holidayDayedit}
                            style={styles.modalInput}
                            placeholder="Day"
                            onChangeText={(text) => setHolidayDayedit(text)}
                        />
                        {errors1.holidayDayedit ? <Text style={styles.errorText}>{errors1.holidayDayedit}</Text> : null}


                        <View style={[styles.modalInput, { paddingHorizontal: 0 }]} >
                            <Picker
                                selectedValue={holidayTypeEdit}
                                onValueChange={(itemValue) => {
                                    setHolidayTypeEdit(itemValue);
                                }}
                            >
                                {HolidayTypeDropdown.map((option, index) => (
                                    <Picker.Item key={index} label={option} value={option} />
                                ))}
                            </Picker>
                        </View>

                        <TouchableOpacity onPress={HandleAddHolidayedit}>
                            <Text style={styles.modalButton}>Save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={HandleCanceledit}>
                            <Text style={styles.modalButton1}>Cancel</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            {/* filter */}

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
                    <SearchIcon color={Grey} />
                </View>
            </View>

            {/* toggle button */}

            {conditionDisplay.includes(data.userrole) ?

                <View style={styles.holidayView}>
                    <View style={styles.holidaytext}>
                        <TouchableOpacity onPress={toggleModal} style={styles.buttonDirection}>
                            <PlusIcon width={15} height={15} color={PrimaryPurple} />
                            <Text style={{ fontWeight: 500, color: PrimaryPurple }}>Add Holiday</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                : null}

            {/* table data */}

            {loading ? (
                <ActivityIndicator size="large" color={PrimaryBlue} style={styles.activityIndicator} />
            ) : (
                <>
                    <View>

                        <ScrollView horizontal>

                            <View style={{
                                ...styles.tableContainer,
                                width: conditionDisplay.includes(data.userrole) ? 701 : 551,
                            }}>

                                <Table borderStyle={styles.tableBorder}>
                                    <Row
                                        data={['S.No', 'Holiday', 'Date', 'Day', ...(conditionDisplay.includes(data.userrole) ? ['Action'] : [])]}
                                        style={styles.tableHeader}
                                        textStyle={styles.headerText}
                                        widthArr={[100, 150, 150, 150, ...(conditionDisplay.includes(data.userrole) ? [150] : [])]}
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
                </>
            )}

            <View style={styles.footer}></View>

        </ScrollView>

    )
}

export default HolidayList;