import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import SearchIcon from '../../../../../assets/EPK CRM Icons/Search.svg';
import PhoneIcon from "../../../../../assets/EPK CRM Icons/Phone.svg";
import MailIcon from "../../../../../assets/EPK CRM Icons/MailorMessage.svg";
import ProfileIcon from "../../../../../assets/EPK CRM Icons/Profile.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import { Grey, PrimaryBlue } from "../../../../../assets/Colors";

const EmployeeList = ({ navigation }) => {

    // data from redux

    const { data } = useSelector((state) => state.login);

    // states

    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inactive, setInactive] = useState('Active');
    const [refreshing, setRefreshing] = useState(false);
    const [filterText, setFilterText] = useState('');

    // toggle function

    const toggleActive = () => {
        setInactive(inactive === 'Active' ? 'In-Active' : 'Active');
    };

    const filteredData = employeeData.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase()));
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://officeinteriorschennai.com/api/public/api/employeeliststatus/${inactive}`, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            const employeeData = response.data.data;

            employeeData.sort((a, b) => {
                const firstNameA = a.first_name.toUpperCase();
                const firstNameB = b.first_name.toUpperCase();

                if (firstNameA < firstNameB) {
                    return -1;
                }
                if (firstNameA > firstNameB) {
                    return 1;
                }
                return 0;
            });

            setEmployeeData(employeeData);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [inactive]);

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}>

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

            <View style={styles.ActiveInactiveContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={toggleActive}>
                    <Text style={styles.Text}>{inactive === 'Active' ? 'ACTIVE' : 'INACTIVE'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color={PrimaryBlue} style={styles.activityIndicator} />
                ) : (
                    <>
                        {
                            filteredData.map((employee, index) =>

                            (
                                <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate('User Profile', { id: employee.id })} >
                                    <View key={employee.id} >
                                        <View style={styles.cardtop}>
                                            <View>
                                                {employee.image ? (
                                                    <Image
                                                        source={{ uri: `https://officeinteriorschennai.com/api/storage/app/${employee.image}` }}
                                                        style={styles.imageStyle}

                                                    />
                                                ) : (
                                                    <View style={styles.iconStyle}>
                                                        <ProfileIcon width={22} height={22} color={PrimaryBlue} />
                                                    </View>
                                                )}


                                                <View style={styles.NameContainer}>
                                                    <Text style={styles.name}>{employee.first_name} {employee.last_name}</Text>
                                                    <Text style={styles.depname}>{employee.department_name}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={styles.phoneEmail}>
                                            <View style={styles.gap} >
                                                <PhoneIcon width={22} height={22} color={PrimaryBlue} />
                                                <MailIcon width={22} height={22} color={PrimaryBlue} />
                                            </View>
                                            <View style={styles.gap} >
                                                <Text style={styles.fontsize}>   {employee.phone_no}</Text>
                                                <Text style={styles.fontsize}>   {employee.email}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }

                    </>
                )}
            </View>

        </ScrollView>
    )
}

export default EmployeeList;