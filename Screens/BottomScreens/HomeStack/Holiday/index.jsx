import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import SearchIcon from "../../../../Assets/Icons/Search.svg";
import ArrowRightIcon from "../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../Assets/Icons/leftarrow.svg";
import EditIcon from "../../../../Assets/Icons/Edit.svg";
import DropdownIcon from "../../../../Assets/Icons/Dropdowndownarrow.svg";
import DeleteIcon from "../../../../Assets/Icons/Delete.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./style";
import axios from "axios";
import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';


const AttendanceRequest = () => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [loadData, setLoadData] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [EditLoad, setEditLoad] = useState(false);
    const [holidayname, setHolidayname] = useState('');
    const [Addholidayname, setAddHolidayname] = useState('');
    const [WeekoffError, setWeekoffError] = useState('');
    const [showWeekoff, setShowWeekoff] = useState(false);
    const [showWeekoff1, setShowWeekoff1] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [AddselectedDay, setAddSelectedDay] = useState('');
    const [selectedDayId, setSelectedDayId] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedStatus1, setSelectedStatus1] = useState(null);
    const [showDropdownstatus, setShowDropdownstatus] = useState(false);
    const [showDropdownstatus1, setShowDropdownstatus1] = useState(false);
    const [statusError, setStatusError] = useState('');
    const [DelData, setDelData] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [Reason, setReason] = useState('')
    const [ReasonError, setReasonError] = useState('')
    const [slotToDelete, setSlotToDelete] = useState(null);
    const [filterText, setFilterText] = useState('');
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedSlotId, setSelectedSlotId] = useState('');

    const itemsPerPage = 6;

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
            const apiUrl = 'https://ocean21.in/api/public/api/viewholidaylist';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            setLoadData(false)
            const responseData = response.data.data;
            setDatalist(responseData);
        } catch (error) {
            setLoadData(false)
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    // Export-Excel 

    const exportToExcel = async () => {
        const tableHead = ['S.No', 'Holiday', 'Date', 'Day', 'Type'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.h_name,
            rowData.h_date,
            rowData.h_day,
            rowData.h_type,
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
        const tableHead = ['S.No', 'Holiday', 'Date', 'Day', 'Type'];
        const tableData1 = datalist.map((rowData, index) => [
            index + 1,
            rowData.h_name,
            rowData.h_date,
            rowData.h_day,
            rowData.h_type,
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

    // Handler for Add holiday

    const [isModalVisible, setIsModalVisible] = useState(false);

    // handleDateChange

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

    const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;

    // 

    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [startDate1, setStartDate1] = useState(new Date());

    const handleDateChange1 = (event, date) => {
        if (date !== undefined) {
            setStartDate1(date);
        }
        setShowDatePicker1(Platform.OS === 'ios');
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    const formattedStartDate1 = `${startDate1.getFullYear()}-${startDate1.getMonth() + 1}-${startDate1.getDate()}`;

    // 

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleEditSubmit = async () => {
        setEditLoad(true);
        const formData = new FormData();

        formData.append('h_name', Addholidayname);
        formData.append('h_date', formattedStartDate1);
        formData.append('h_day', AddselectedDay);
        formData.append('created_by', data.userempid);
        formData.append('h_type', selectedStatus1);


        try {
            const response = await fetch('https://ocean21.in/api/public/api/add_holiday', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${data.token}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const responsedata = await response.json();

            if (responsedata.status === "success") {
                setEditLoad(false);
                Alert.alert("Successfull", responsedata.message);
                setIsModalVisible(false);
                setHolidayname('');
                setStartDate(new Date());
                setSelectedDay('');
                setSelectedStatus('Selected Type');
                fetchData();
            } else {
                setEditLoad(false);
                Alert.alert("Failed", responsedata.message);
            }

        } catch (error) {
            Alert.alert("Failed", responsedata.error);
        }
    };

    const HandleCancel = () => {
        setIsModalVisible(!isModalVisible);
    }

    // 

    const handleToggleDay = (day, id) => {
        if (selectedDay === day) {
            setSelectedDay('');
            setSelectedDayId('');
        } else {
            setSelectedDay(day);
            setSelectedDayId(id);
        }
        setShowWeekoff(false);
    };

    const ADDhandleToggleDay = (day, id) => {
        if (selectedDay === day) {
            setAddSelectedDay('');
        } else {
            setAddSelectedDay(day);
        }
        setShowWeekoff1(false);
    };

    // 

    const toggleDropdownstatus = () => {
        setShowDropdownstatus(!showDropdownstatus);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdownstatus(false);
    };

    const toggleDropdownstatus1 = () => {
        setShowDropdownstatus1(!showDropdownstatus1);
    };

    const selectStatus1 = (status) => {
        setSelectedStatus1(status);
        setShowDropdownstatus1(false);
    };

    // 

    // Api call for Delete

    const HandleDelete = (item) => {
        setSlotToDelete(item.id);
        setModalVisible(true);
    }

    const cancelDelete = () => {

        setModalVisible(false);

        setDelData(false);
    }

    const confirmDelete = async () => {

        setDelData(true)

        try {

            const apiUrl = `https://ocean21.in/api/public/api/delete_holiday`;
            const response = await axios.post(apiUrl, {
                id: slotToDelete,
                updated_by: data.userempid,
                reason: Reason,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            if (response.data.status === "success") {
                fetchData();
                setReason('');
                setDelData(false);
            } else {
                Alert.alert("Failed", response.data.message);
                setDelData(false)
            }
        } catch (error) {
            Alert.alert("Error", response.data.message);
            setDelData(false)
        }
        setSlotToDelete(null);
        setModalVisible(false);

    }

    // Function to open edit modal and populate data

    const openEditModal = (item) => {
        setHolidayname(item.h_name);
        setSelectedStatus(item.h_type);
        setSelectedDay(item.h_day);
        setEditModalVisible(true);
        setSelectedSlotId(item.id);
        const parsedDate = new Date(item.h_date.split('-').reverse().join('-'));
        setStartDate(parsedDate);
    };

    // Function to close edit modal

    const closeEditModal = () => {
        setEditModalVisible(false);
        // setEditedShiftError('');
        // setEditedstatusError('');
        // setEditedStatus(null);
    };

    // Function to handle edit submission

    const handleEdit = async () => {

        setEditLoad(true);

        try {

            const apiUrl = 'https://ocean21.in/api/public/api/edit_holiday';

            const response = await axios.put(apiUrl, {
                id: selectedSlotId,
                h_name: holidayname,
                h_date: formattedStartDate,
                h_day: selectedDay,
                h_type: selectedStatus,
                updated_by: data.userempid
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (response.data.status === "success") {
                Alert.alert("Successfull", response.data.message);
                setEditLoad(false);
                setHolidayname('');
                setStartDate(new Date());
                setSelectedDay('');
                setSelectedStatus('Selected Type');
                fetchData();
            } else {
                setEditLoad(false);
                Alert.alert("Failed To Update", response.data.message);
            }

        } catch (error) {
            setEditLoad(false);
            Alert.alert("Error during submit", error);
        }

        closeEditModal();
    };

    return (

        <View style={styles.Container}>

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

            <View style={styles.AddHoliday}>
                <TouchableOpacity style={styles.AddHolidayButton}
                    onPress={toggleModal}
                >
                    <Text style={styles.AddHolidayText}>
                        Add Holiday
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal={true}>

                <View style={styles.Tablecontainer}>
                    {loadData ? (
                        <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                    ) : (
                        <View>

                            <View style={[styles.row, styles.listHeader]}>
                                <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Holiday</Text>
                                <Text style={[styles.header, styles.cell, styles.EmployeeName]}>Date</Text>
                                <Text style={[styles.header, styles.cell, styles.StartDate]}>Day</Text>
                                <Text style={[styles.header, styles.cell, styles.EndDate]}>Action</Text>
                            </View>

                            {paginatedData.length === 0 ? (
                                <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                            ) : (
                                paginatedData.map((item, index) => (
                                    <View key={index} style={[styles.row, styles.listBody]}>
                                        <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                        <Text style={[styles.cell, styles.DepartmentName]}>{item.h_name}</Text>
                                        <Text style={[styles.cell, styles.EmployeeName]}>{item.h_date}</Text>
                                        <Text style={[styles.cell, styles.StartDate]}>{item.h_day}</Text>
                                        <View style={[styles.listcontentButtonview, styles.EndDate]}>
                                            <TouchableOpacity
                                                onPress={() => openEditModal(item)}
                                                style={styles.listcontenteditbutton}>
                                                <EditIcon width={14} height={14} color={"#000"} />
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={() => HandleDelete(item)}
                                                style={styles.listcontentdelbutton}>
                                                <DeleteIcon width={14} height={14} color={"#000"} />
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                ))
                            )}

                        </View>
                    )
                    }
                </View>

            </ScrollView>

            {/* Add Modal */}

            <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible}
                onRequestClose={toggleModal}>
                <View style={styles.modalContainer}>

                    <View style={styles.modalContent}>

                        <Text style={styles.Heading}>Add Holiday</Text>
                        <Text style={styles.modalLabelText}>Holiday</Text>

                        <TextInput
                            value={Addholidayname}
                            onChangeText={(txt) => setAddHolidayname(txt)}
                            style={styles.modalInput}
                        />

                        <Text style={styles.ModalerrorText}>
                            {/* {editedshiftError} */}
                        </Text>

                        <Text style={styles.modalLabelText}>Date</Text>

                        <View style={styles.modalInput} >
                            <Text onPress={showDatepicker1}>
                                {startDate1.toDateString()} &nbsp;
                            </Text>
                            {showDatePicker1 && (
                                <DateTimePicker
                                    value={startDate1}
                                    mode="date"
                                    display="default"
                                    onChange={handleDateChange1}
                                />
                            )}
                        </View>

                        <Text style={styles.modalLabelText}>Day</Text>

                        <TouchableOpacity style={styles.modalInput} onPress={() => setShowWeekoff1(!showWeekoff1)}>
                            <View>
                                {AddselectedDay ? (
                                    <Text style={styles.selectedays}>{AddselectedDay}</Text>
                                ) : (
                                    <Text>Select Day</Text>
                                )}
                            </View>
                            <DropdownIcon width={14} height={14} color={"#000"} />
                        </TouchableOpacity>

                        {showWeekoff1 && (
                            <View style={styles.dropdown}>
                                <TouchableOpacity
                                    style={[
                                        styles.dropdownOption,
                                        AddselectedDay === 'Sunday'
                                    ]}
                                    onPress={() => ADDhandleToggleDay('Sunday', '1')}
                                >
                                    <Text style={styles.dropdownOptionText}>Sunday</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.dropdownOption,
                                        AddselectedDay === 'Monday'
                                    ]}
                                    onPress={() => ADDhandleToggleDay('Monday', '2')}>
                                    <Text style={styles.dropdownOptionText}>Monday</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.dropdownOption,
                                        AddselectedDay === 'Tuesday'
                                    ]}
                                    onPress={() => ADDhandleToggleDay('Tuesday', '3')}>
                                    <Text style={styles.dropdownOptionText}>Tuesday</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.dropdownOption,
                                        AddselectedDay === 'Wednesday'
                                    ]}
                                    onPress={() => ADDhandleToggleDay('Wednesday', '4')}>
                                    <Text style={styles.dropdownOptionText}>Wednesday</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.dropdownOption,
                                        AddselectedDay === 'Thursday'
                                    ]}
                                    onPress={() => ADDhandleToggleDay('Thursday', '5')}>
                                    <Text style={styles.dropdownOptionText}>Thursday</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.dropdownOption,
                                        AddselectedDay === 'Friday'
                                    ]}
                                    onPress={() => ADDhandleToggleDay('Friday', '6')}>
                                    <Text style={styles.dropdownOptionText}>Friday</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.dropdownOption,
                                        AddselectedDay === 'Saturday'
                                    ]}
                                    onPress={() => ADDhandleToggleDay('Saturday', '7')}>
                                    <Text style={styles.dropdownOptionText}>Saturday</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <Text style={styles.errorText}>
                            {WeekoffError}
                        </Text>

                        <Text style={styles.modalLabelText}>Select Holiday Type</Text>

                        <TouchableOpacity onPress={toggleDropdownstatus1} style={styles.modalInput}>

                            <Text style={styles.StatusTouchableText}>{selectedStatus1 || "Selected Type"}</Text>
                            <DropdownIcon width={14} height={14} color={"#000"} />

                        </TouchableOpacity>

                        {/* Dropdown to show the options */}

                        {showDropdownstatus1 && (

                            <View style={styles.dropdown}>

                                <TouchableOpacity onPress={() => selectStatus1("Public Holiday")} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>Public Holiday</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => selectStatus1("Declared Holiday")} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>Declared Holiday</Text>
                                </TouchableOpacity>

                            </View>

                        )}

                        <Text style={styles.errorText}>
                            {statusError}
                        </Text>

                        <View style={styles.buttoncontainer}>

                            <TouchableOpacity style={styles.modalSubmitButton}
                                onPress={handleEditSubmit}
                            >
                                {
                                    EditLoad ?
                                        <ActivityIndicator size={"small"} color={"#fff"} /> :
                                        <Text style={styles.modalSubmitButtonText}>Submit</Text>
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalCancelButton}
                                onPress={HandleCancel}
                            >
                                <Text style={styles.modalCancelButtonText}>Cancel</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </Modal>

            {/*  */}

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTextHeading}>Are You Sure You Want To Delete This !</Text>
                        <Text style={styles.modalText}>Reason:</Text>
                        <TextInput
                            value={Reason}
                            onChangeText={(text) => setReason(text)}
                            style={styles.Reason}
                        />
                        <Text style={styles.errorTextDelete}>
                            {ReasonError}
                        </Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.modalCancelButton} onPress={cancelDelete}>
                                <Text style={styles.modalCancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalDeleteButton} onPress={confirmDelete}>


                                {
                                    DelData ?
                                        <ActivityIndicator size={"small"} color={"#fff"} /> :
                                        <Text style={styles.modalDeleteButtonText}>Delete</Text>
                                }


                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/*  */}

            <Modal
                animationType="fade"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={closeEditModal}
            >
                <View style={styles.modalContainer}>

                    <View style={styles.modalContent}>

                        <Text style={styles.Heading}>Edit Holiday</Text>
                        <Text style={styles.modalLabelText}>Holiday</Text>

                        <TextInput
                            value={holidayname}
                            onChangeText={(txt) => setHolidayname(txt)}
                            style={styles.modalInput}
                        />

                        <Text style={styles.ModalerrorText}>
                            {/* {editedshiftError} */}
                        </Text>

                        <Text style={styles.modalLabelText}>Date</Text>

                        <View style={styles.modalInput} >
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

                        <Text style={styles.modalLabelText}>Day</Text>

                        <TouchableOpacity style={styles.modalInput} onPress={() => setShowWeekoff(!showWeekoff)}>
                            <View>
                                {selectedDay ? (
                                    <Text style={styles.selectedays}>{selectedDay}</Text>
                                ) : (
                                    <Text>Select Day</Text>
                                )}
                            </View>
                            <DropdownIcon width={14} height={14} color={"#000"} />
                        </TouchableOpacity>

                        {showWeekoff && (
                            <View style={styles.dropdown}>
                                <TouchableOpacity
                                    style={[
                                        styles.dropdownOption,
                                        selectedDay === 'Sunday'
                                    ]}
                                    onPress={() => handleToggleDay('Sunday', '1')}
                                >
                                    <Text style={styles.dropdownOptionText}>Sunday</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.dropdownOption,
                                        selectedDay === 'Monday'
                                    ]}
                                    onPress={() => handleToggleDay('Monday', '2')}>
                                    <Text style={styles.dropdownOptionText}>Monday</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.dropdownOption,
                                        selectedDay === 'Tuesday'
                                    ]}
                                    onPress={() => handleToggleDay('Tuesday', '3')}>
                                    <Text style={styles.dropdownOptionText}>Tuesday</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.dropdownOption,
                                        selectedDay === 'Wednesday'
                                    ]}
                                    onPress={() => handleToggleDay('Wednesday', '4')}>
                                    <Text style={styles.dropdownOptionText}>Wednesday</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.dropdownOption,
                                        selectedDay === 'Thursday'
                                    ]}
                                    onPress={() => handleToggleDay('Thursday', '5')}>
                                    <Text style={styles.dropdownOptionText}>Thursday</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.dropdownOption,
                                        selectedDay === 'Friday'
                                    ]}
                                    onPress={() => handleToggleDay('Friday', '6')}>
                                    <Text style={styles.dropdownOptionText}>Friday</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.dropdownOption,
                                        selectedDay === 'Saturday'
                                    ]}
                                    onPress={() => handleToggleDay('Saturday', '7')}>
                                    <Text style={styles.dropdownOptionText}>Saturday</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <Text style={styles.errorText}>
                            {WeekoffError}
                        </Text>

                        <Text style={styles.modalLabelText}>Select Holiday Type</Text>

                        <TouchableOpacity onPress={toggleDropdownstatus} style={styles.modalInput}>

                            <Text style={styles.StatusTouchableText}>{selectedStatus || "Selected Type"}</Text>
                            <DropdownIcon width={14} height={14} color={"#000"} />

                        </TouchableOpacity>

                        {/* Dropdown to show the options */}

                        {showDropdownstatus && (

                            <View style={styles.dropdown}>

                                <TouchableOpacity onPress={() => selectStatus("Public Holiday")} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>Public Holiday</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => selectStatus("Declared Holiday")} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>Declared Holiday</Text>
                                </TouchableOpacity>

                            </View>

                        )}

                        <Text style={styles.errorText}>
                            {statusError}
                        </Text>

                        <View style={styles.buttoncontainer}>

                            <TouchableOpacity style={styles.modalSubmitButton}
                                onPress={handleEdit}
                            >
                                {
                                    EditLoad ?
                                        <ActivityIndicator size={"small"} color={"#fff"} /> :
                                        <Text style={styles.modalSubmitButtonText}>Update</Text>
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalCancelButton}
                                onPress={closeEditModal}
                            >
                                <Text style={styles.modalCancelButtonText}>Cancel</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </Modal>

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

    )
}

export default AttendanceRequest;