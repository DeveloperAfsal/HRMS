import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { useSelector } from "react-redux";
import axios from "axios";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const JobOpenings = ({ navigation }) => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [load, setload] = useState(false);
    const [loadData, setLoadData] = useState(false);
    const [designation, setDesignation] = useState('');
    const [nofVacancies, setNofVacancies] = useState('');
    const [description, setDescription] = useState('');
    const [designationError, setDesignationError] = useState('');
    const [nofVacanciesError, setNofVacanciesError] = useState('');
    const [datalist, setDatalist] = useState([]);

    // Add

    const HandleSubmit = async () => {
        setload(true);
        try {

            const apiUrl = 'https://ocean21.in/api/public/api/add_jobopening';

            const response = await axios.post(apiUrl, {
                designation: designation,
                no_of_vacancies: nofVacancies,
                description: description,
                created_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            const ResData = response.data;
            console.log(ResData, "ResData")

            if (ResData.status === "success") {
                Alert.alert("Successfull", ResData.message)
                fetchData();
                setDesignation('');
                setNofVacancies('');
                setDescription('');
                setload(false);
            } else {
                Alert.alert("Successfull", ResData.message)
                setload(false);
            }

        } catch (error) {
            console.log(error)
        }
    }

    // list 

    const fetchData = async () => {
        setLoadData(true);
        try {
            const apiUrl = `https://ocean21.in/api/public/api/jobopening_list`;

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setDatalist(responseData);
            setLoadData(false);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const renderJobCards = () => {
        return datalist.map((job, index) => (
            <View key={index} style={styles.Card}>
                <Text style={styles.Designation}>{job.designation}</Text>
                <Text style={styles.Vaccancies}>No. of vacancies: {job.no_of_vacancies}</Text>
                <View>
                    <Text style={styles.Description}>Description</Text>
                    <Text style={styles.Des}>
                        {/* Remove HTML tags from description */}
                        {job.description.replace(/<[^>]+>/g, '')}
                    </Text>
                </View>
                <View style={styles.ButtonView}>
                    <TouchableOpacity style={styles.Button}
                        onPress={() => navigation.navigate('View Job', {
                            Item: job
                        })}
                    >
                        <Text style={styles.ButtonText}>View Job</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ));
    };

    return (

        <ScrollView>

            <View style={styles.ShiftSlotContainer}>
                {
                    (data.userrole == 1 || data.userrole == 2) ?
                        <>
                            <View style={styles.ShiftSlotContainerTitle}>
                                <Text style={styles.ShiftSlotContainerTitleText}>Add Job</Text>
                            </View>

                            <View style={styles.Inputcontainer}>

                                <Text style={styles.ShiftSlotText}>
                                    Designation
                                </Text>

                                <TextInput
                                    value={designation}
                                    onChangeText={(txt) => setDesignation(txt)}
                                    style={styles.ShiftSlotTextInput}
                                />

                                <Text style={styles.errorText}>
                                    {designationError}
                                </Text>

                                <Text style={styles.ShiftSlotText}>
                                    No. of Vacancies
                                </Text>

                                <TextInput
                                    value={nofVacancies}
                                    onChangeText={(txt) => setNofVacancies(txt)}
                                    style={styles.ShiftSlotTextInput}
                                />

                                <Text style={styles.errorText}>
                                    {nofVacanciesError}
                                </Text>

                                <Text style={styles.ShiftSlotText}>
                                    Description
                                </Text>

                                <TextInput
                                    value={description}
                                    onChangeText={(txt) => setDescription(txt)}
                                    style={styles.ShiftSlotTextInput}
                                />
                                {/* react-native-pell-rich-editor */}

                                <View style={styles.buttonview}>
                                    <TouchableOpacity style={styles.submitbutton}
                                        onPress={HandleSubmit}
                                    >
                                        {
                                            load ?
                                                <ActivityIndicator size={"small"} color={"#fff"} /> :
                                                <Text style={styles.submitbuttonText}>
                                                    Submit
                                                </Text>
                                        }
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.cancelbutton}
                                        onPress={() => navigation.navigate('Dashboard')}
                                    >
                                        <Text style={styles.cancelbuttontext}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </> : null
                }


                <View style={styles.ShiftSlotContainerTitle}>
                    <Text style={styles.ShiftSlotContainerTitleText}>Jobs</Text>
                </View>

                {loadData ? (
                    <ActivityIndicator size="large" color="#0879F6" style={styles.activityIndicator} />
                ) : (
                    renderJobCards()
                )}

            </View>

        </ScrollView>

    )
}

export default JobOpenings;