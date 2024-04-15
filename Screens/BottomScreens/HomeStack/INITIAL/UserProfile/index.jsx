import React, { useEffect, useState } from "react";
import styles from "./style";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ProfileIcon from "../../../../../assets/EPK CRM Icons/Profile.svg";
import EditIcon from "../../../../../assets/EPK CRM Icons/Edit.svg";
import { useSelector } from "react-redux";
import axios from "axios";
import { PrimaryBlue, White } from "../../../../../assets/Colors";

const ViewEmployee = ({ route, navigation }) => {

    const { id } = route.params;
    const { data } = useSelector((state) => state.login)
    const [employee, setEmployee] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.post(
                    `https://officeinteriorschennai.com/api/public/api/viewemployeelist`,
                    { viewemployeelist: id },
                    {
                        headers: {
                            Authorization: `Bearer ${data.token}`
                        }
                    }
                );
                setEmployee(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [id]);


    return (
        <View style={styles.container}>

            {loading ? (
                <ActivityIndicator size="large" color={PrimaryBlue} style={styles.activityIndicator} />
            ) : (
                <>
                    {
                        employee.map((emp, index) => (
                            <View key={index}>

                                <TouchableOpacity onPress={() => navigation.navigate("Edit Employee", { emp: emp })}>
                                    <View style={styles.editbuttonview}>
                                        <View style={styles.editbutton}>
                                            <Text style={styles.text}> Edit</Text>
                                            <EditIcon width={13} height={13} color={White} />
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <View style={styles.profileimage}>
                                    {emp.userimage != '' || null ? <Image source={{ uri: `https://officeinteriorschennai.com/api/storage/app/${emp.image}` }} style={styles.imageStyle} />
                                        : <View style={styles.iconStyle}>
                                            <ProfileIcon width={40} height={40} color={PrimaryBlue} />
                                        </View>
                                    }

                                    <Text style={styles.name}>{emp.first_name} {emp.last_name}</Text>
                                </View>

                            </View>
                        ))
                    }

                    <ScrollView >

                        {
                            employee.map((emp, index) => (
                                <View key={index}>
                                    <>
                                        <View style={styles.contentcontainer}>
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
                                    </>

                                </View>
                            ))
                        }

                    </ScrollView>

                </>)}

        </View>
    )
}

export default ViewEmployee;