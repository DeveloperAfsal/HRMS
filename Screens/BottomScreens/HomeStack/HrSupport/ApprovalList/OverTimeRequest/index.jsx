import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import SearchIcon from "../../../../../../Assets/Icons/Search.svg";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";
import EditIcon from '../../../../../../Assets/Icons/eyeopen.svg';
import styles from "../AttendanceRequest/style";
import axios from "axios";
import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const HalfDayRequest = () => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [loadData, setLoadData] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [filterText, setFilterText] = useState('');

    const filteredData = datalist.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase()));
    });

    // 

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const totalItems = datalist.length;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = [...Array(totalPages).keys()].map(num => num + 1);

    // 

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://ocean21.in/api/public/api/hr_ot_approvallist';
            const response = await axios.post(apiUrl, {
                emp_id: data.userempid,
                user_roleid: data.userrole,
            }, {
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

    return (

        <View style={styles.Container}>

            <View style={styles.ButtonContainer}>
                <TouchableOpacity style={[styles.Button, { marginRight: '5%' }]}
                // onPress={exportToExcel}
                >
                    <Text style={styles.ButtonText}>
                        Export to Excel
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Button}
                // onPress={exportToPDF}
                >
                    <Text style={styles.ButtonText}>
                        Export to PDF
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.InputContainer}>
                <TextInput
                    style={styles.Input}
                    // value={filterText}
                    onChangeText={text => {
                        // setFilterText(text);
                    }}
                />
                <View style={styles.IconBg}>
                    <SearchIcon color={'#474747'} width={24} height={24} />
                </View>
            </View>

            <ScrollView horizontal={true}>

                <View style={styles.Tablecontainer}>
                    {loadData ? (
                        <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                    ) : (
                        <View>

                            <View style={[styles.row, styles.listHeader]}>
                                <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Name</Text>
                                <Text style={[styles.header, styles.cell, styles.EmployeeName]}>Department</Text>
                                <Text style={[styles.header, styles.cell, styles.StartDate]}>Type</Text>
                                <Text style={[styles.header, styles.cell, styles.EndDate]}>Location</Text>
                                <Text style={[styles.header, styles.cell, styles.ShiftSlot]}>Shift Slot</Text>
                                <Text style={[styles.header, styles.cell, styles.WeekOff]}>Date</Text>
                                <Text style={[styles.header, styles.cell, styles.WeekOff]}>From Time</Text>
                                <Text style={[styles.header, styles.cell, styles.WeekOff]}>To Time</Text>
                                <Text style={[styles.header, styles.cell, styles.WeekOff]}>Total Hours</Text>
                                <Text style={[styles.header, styles.cell, styles.Status]}>Reason</Text>
                                <Text style={[styles.header, styles.cell, styles.Status]}>Status</Text>
                            </View>

                            {filteredData.length === 0 ? (
                                <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                            ) : (
                                filteredData.map((item, index) => (
                                    <View key={index} style={[styles.row, styles.listBody]}>
                                        <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                        <Text style={[styles.cell, styles.DepartmentName]}>{item.e_name}</Text>
                                        <Text style={[styles.cell, styles.EmployeeName]}>{item.departmentName}</Text>
                                        <Text style={[styles.cell, styles.StartDate]}>{item.request_type_name}</Text>
                                        <Text style={[styles.cell, styles.EndDate]}>{item.request_location}</Text>
                                        <Text style={[styles.cell, styles.EndDate]}>{item.shift_slot}</Text>
                                        <Text style={[styles.cell, styles.ShiftSlot]}>{item.request_date}</Text>
                                        <Text style={[styles.cell, styles.WeekOff]}>{item.request_fromtime}</Text>
                                        <Text style={[styles.cell, styles.Status]}>{item.request_totime}</Text>
                                        <Text style={[styles.cell, styles.Status]}>{item.total_hrs}</Text>
                                        <Text style={[styles.cell, styles.Status]}>{item.request_reason}</Text>
                                        <View style={styles.listcontentButtonview}>
                                            <TouchableOpacity style={styles.listcontenteditbutton}
                                            // onPress={() => Handlenavigate(slot)}
                                            >
                                                <EditIcon width={14} height={14} color={"#000"} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.listcontentdelbutton}
                                            // onPress={() => HandleDelete(slot.id)}
                                            >
                                                <EditIcon width={14} height={14} color={"#000"} />
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

export default HalfDayRequest;