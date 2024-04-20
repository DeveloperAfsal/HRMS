import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import EditIcon from "../../../../../Assets/Icons/Edit.svg";
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg"
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import ClockIcon from "../../../../../Assets/Icons/Clock.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import { format, parse } from 'date-fns';

const AttendancePolicy = () => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [Datalist, setDatalist] = useState([]);
    const [loadData, setLoadData] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [fromTime, setFromTime] = useState('00:00:00');
    const [toTime, setToTime] = useState('00:00:00');

    const handleTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = format(time, 'HH:mm:ss');
            setFromTime(formattedTime);
        }
        setShowTimePicker(Platform.OS === 'ios');
    };

    const showTimepicker = () => {
        setShowTimePicker(true);
    };

    // Api call for list Shifts

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://ocean21.in/api/public/api/view_attendancepolicy';
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
    }, []);

    // Api call for Handle Submit

    const HandleSubmit = async () => {

        try {

            const apiUrl = 'https://ocean21.in/api/public/api/attendancepolicyinsert';

            const response = await axios.post(apiUrl, {
                shift_slot: "1",
                form_time: "09:00:00",
                to_time: "18:30:00",
                total_hrs: "09:30:00",
                late_form_time: "09:15:59",
                late_to_time: "09:59:59",
                fp_form_time: "10:00:00",
                fp_to_time: "11:15:59",
                ap_form_time: "16:00:00",
                ap_to_time: "17:30:00",
                fhalf_day_form_time: "09:00:00",
                fhalf_day_to_time: "13:29:59",
                ahalf_day_form_time: "13:30:00",
                ahalf_day_to_time: "18:30:00",
                late1: "4",
                late2: "5",
                late3: "6",
                late1_deduction: "0.5",
                late2_deduction: "1",
                late3_deduction: "3",
                policy_status: "Active",
                created_by: "1"
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            if (!response.ok) {
                fetchData();
            } else {
                Alert.alert("Failed To Add");
                console.error('Failed To Add:', response.data.error);
            }

        } catch (error) {
            Alert.alert("Error during submit", "Check The Input Credentials");
            console.error('Error during submit:', error);
        }

    }

    // 

    const [errors, setErrors] = useState({

    });


    return (
        <ScrollView>
            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Attendance Policy Form</Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.TimeSlotText}>
                        Add Time Slot
                    </Text>

                    <TouchableOpacity style={styles.TimeSlotTouchable}>

                        <Text style={styles.TimeSlotTouchableText}>Afs</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    <View style={styles.DoubleInputs}>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                From Time
                            </Text>
                            <TextInput style={styles.input} />
                        </View>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                To Time
                            </Text>
                            <TextInput style={styles.input} />
                        </View>

                    </View>

                    <View style={styles.averageWidth}>
                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                To Time
                            </Text>
                            <TextInput style={styles.input} />
                        </View>
                    </View>

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Late</Text>
                    </View>

                    <View style={styles.DoubleInputs}>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                From :
                            </Text>
                            <TextInput style={styles.input} />
                        </View>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                To :
                            </Text>
                            <TextInput style={styles.input} />
                        </View>

                    </View>

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Permission ( 1st Half )</Text>
                    </View>

                    <View style={styles.DoubleInputs}>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                From :
                            </Text>
                            <TextInput style={styles.input} />
                        </View>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                To :
                            </Text>
                            <TextInput style={styles.input} />
                        </View>

                    </View>

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Permission ( 2nd Half )</Text>
                    </View>

                    <View style={styles.DoubleInputs}>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                From :
                            </Text>
                            <TextInput style={styles.input} />
                        </View>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                To :
                            </Text>
                            <TextInput style={styles.input} />
                        </View>

                    </View>

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Half Day ( 1st Half )</Text>
                    </View>

                    <View style={styles.DoubleInputs}>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                From :
                            </Text>
                            <TextInput style={styles.input} />
                        </View>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                To :
                            </Text>
                            <TextInput style={styles.input} />
                        </View>

                    </View>

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Half Day ( 2nd Half )</Text>
                    </View>

                    <View style={styles.DoubleInputs}>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                From :
                            </Text>
                            <TextInput style={styles.input} />
                        </View>

                        <View style={styles.shortInputs}>
                            <Text style={styles.Text}>
                                To :
                            </Text>
                            <TextInput style={styles.input} />
                        </View>

                    </View>

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Late 1</Text>
                    </View>

                    <TextInput style={styles.inputs} />

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Late 1 Deduction</Text>
                    </View>

                    <TextInput style={styles.inputs} />

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Late 2</Text>
                    </View>

                    <TextInput style={styles.inputs} />

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Late 2 Deduction</Text>
                    </View>

                    <TextInput style={styles.inputs} />

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Late 3</Text>
                    </View>

                    <TextInput style={styles.inputs} />

                    <View style={styles.PolicyContainerTitle}>
                        <Text style={styles.TimeSlotText}>Late 3 Deduction</Text>
                    </View>

                    <TextInput style={styles.inputs} />

                    <View style={styles.buttonview}>
                        <TouchableOpacity style={styles.submitbutton}>
                            {/* {
                                load ? */}
                            {/* <ActivityIndicator size={"small"} color={"#fff"} /> : */}
                            <Text style={styles.submitbuttonText}>
                                Submit
                            </Text>
                            {/* } */}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton}>
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/*  */}

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Attendance Policy List</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.Tablecontainer}>

                        <ScrollView horizontal={true}>
                            {
                                loadData ?
                                    <ActivityIndicator size={"small"} color={"#20DDFE"} style={styles.Activeindicator} /> :
                                    <View style={styles.table}>
                                        <View style={styles.listHeader}>
                                            <Text style={styles.header}>S.No</Text>
                                            <Text style={styles.header}>Shift</Text>
                                            <Text style={styles.header}>From time</Text>
                                            <Text style={styles.header}>To time</Text>
                                            <Text style={styles.header}>Status</Text>
                                            <Text style={styles.header}>Action</Text>
                                        </View>
                                        {Datalist.length === 0 ?
                                            <Text style={{ textAlign: 'center', paddingVertical: '3%' }}>No data available</Text> :
                                            Datalist.map((item, index) => (
                                                <View key={index} style={styles.row}>
                                                    <Text style={styles.cell}>{item.sno}</Text>
                                                    <Text style={styles.cell}>{item.shift}</Text>
                                                    <Text style={styles.cell}>{item.fromTime}</Text>
                                                    <Text style={styles.cell}>{item.toTime}</Text>
                                                    <Text style={styles.cell}>{item.status}</Text>
                                                    <View style={styles.listcontentButtonview}>
                                                        <TouchableOpacity style={styles.listcontenteditbutton}>
                                                            <EditIcon width={14} height={14} color={"#000"} />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={styles.listcontentdelbutton}>
                                                            <DeleteIcon width={14} height={14} color={"#000"} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            ))}
                                    </View>
                            }
                        </ScrollView>

                    </View>
                </ScrollView>

            </View>
        </ScrollView>
    )
}

export default AttendancePolicy;