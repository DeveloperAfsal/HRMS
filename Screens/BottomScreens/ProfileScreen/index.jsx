import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, View } from "react-native";
import axios from "axios";
import styles from "./style"
import ProfileIcon from "../../../assets/EPK CRM Icons/Profile.svg"
import { useSelector } from "react-redux";
import { PrimaryBlue } from "../../../assets/Colors";

const ProfileScreen = () => {

    // data from redux store

    const { data } = useSelector((state) => state.login)

    // states 

    const [employee, setEmployee] = useState([]);
    const [loading, setLoading] = useState(true);

    // Api Call for setEmployee

    const fetchData = async () => {
        setLoading(true);
        try {
            const apiUrl = 'https://officeinteriorschennai.com/api/public/api/viewemployeelist'
            const response = await axios.post(apiUrl, {
                viewemployeelist: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            if (response.data && response.data.data) {
                setEmployee(response.data.data);
            } else {
                console.log('Invalid response format:', response.data);
            }
        }
        catch (error) {
            console.log('Error fetching data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // refresh

    const [refreshing, setRefreshing] = useState(false);

    const HandleRefresh = () => {
        setRefreshing(true);
        fetchData();
        setRefreshing(false);
    };


    return (
        <View style={styles.container}>

            <>
                <View style={styles.profileimage}>

                    <View style={styles.iconStyle}>
                        {data.userimage != '' || null ? <Image source={{
                            uri: `https://officeinteriorschennai.com/api/storage/app/${data.userimage}`
                        }} style={styles.imageStyle} />
                            : <View style={styles.iconStyle}>
                                <ProfileIcon width={75} height={75} color={PrimaryBlue} />
                            </View>
                        }
                    </View>

                    <Text style={styles.name}>{data.username}</Text>
                    <Text style={styles.role}>{data.userdepartmentname}</Text>

                </View>

                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={HandleRefresh} />}>

                    {loading ? (
                        <ActivityIndicator style={styles.loader} size="large" color={PrimaryBlue} />
                    ) : (
                        employee.map((emp, index) => (
                            <View key={index} style={{ padding: 20 }}>
                                <View style={styles.subContainer}>
                                    <Text style={styles.subHeading}>Basic Details</Text>
                                    <Text style={styles.detailsText}>{`Employee ID: ${emp.epkemployee_id}`}</Text>
                                    <Text style={styles.detailsText}>{`Name: ${emp.first_name} ${emp.last_name}`}</Text>
                                    <Text style={styles.detailsText}>{`Date of Birth: ${emp.dob}`}</Text>
                                    <Text style={styles.detailsText}>{`Gender: ${emp.gender}`}</Text>
                                    <Text style={styles.detailsText}>{`Phone Number: ${emp.phone_no}`}</Text>
                                    <Text style={styles.detailsText}>{`WhatsApp: ${emp.whatsapp}`}</Text>
                                    <Text style={styles.detailsText}>{`Email: ${emp.email}`}</Text>
                                </View>

                                <View style={styles.subContainer}>
                                    <Text style={styles.subHeading}>Address Details</Text>
                                    <Text style={styles.detailsText}>{`Address: ${emp.address}, ${emp.city}, ${emp.state} ${emp.pincode}`}</Text>
                                    <Text style={styles.detailsText}>{`Current Address: ${emp.current_address}, ${emp.current_city}, ${emp.current_state} ${emp.current_pincode}`}</Text>
                                </View>

                                <View style={styles.subContainer}>
                                    <Text style={styles.subHeading}>Personal Details</Text>
                                    <Text style={styles.detailsText}>{`Marital Status: ${emp.marital_status}`}</Text>
                                    <Text style={styles.detailsText}>{`Date of Join: ${emp.doj}`}</Text>
                                    <Text style={styles.detailsText}>{`Spouse Name: ${emp.spouse_name}`}</Text>
                                    <Text style={styles.detailsText}>{`Department Name: ${emp.department_name}`}</Text>
                                    <Text style={styles.detailsText}>{`PAN Number : ${emp.pan_number}`}</Text>
                                    <Text style={styles.detailsText}>{`UAN Number: ${emp.uan_number}`}</Text>
                                    <Text style={styles.detailsText}>{`Salary: ${emp.emp_salary}`}</Text>
                                </View>

                                <View style={styles.subContainer}>
                                    <Text style={styles.subHeading}>Bank Account Details</Text>
                                    <Text style={styles.detailsText}>{`Bank Account Number: ${emp.bank_accountnumber}`}</Text>
                                    <Text style={styles.detailsText}>{`Bank Name: ${emp.bank_name}`}</Text>
                                    <Text style={styles.detailsText}>{`Bank Branch: ${emp.bank_branch}`}</Text>
                                    <Text style={styles.detailsText}>{`IFSC Code: ${emp.ifsc_code}`}</Text>
                                    <Text style={styles.detailsText}>{`Account Type: ${emp.ac_type}`}</Text>
                                </View>
                            </View>
                        ))
                    )}


                </ScrollView>
            </>

        </View>
    );
}



export default ProfileScreen;