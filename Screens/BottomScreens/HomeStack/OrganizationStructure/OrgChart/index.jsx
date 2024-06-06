import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import EmployeeIcon from '../../../../../Assets/Icons/Employee.svg';
import axios from "axios";
import { useSelector } from "react-redux";
import styles from "./style";

const OrgChart = () => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // state for managing fetched data

    const [datalist, setDatalist] = useState([]);
    const [datalistAdmin, setDatalistAdmin] = useState([]);

    // function to fetch data

    const fetchDataAdmin = async () => {

        try {
            const apiUrl = 'https://ocean21.in/api/public/api/orgchart_superadmin';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            const responseData = response.data.data;
            setDatalistAdmin(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchData = async () => {

        try {
            const apiUrl = 'https://ocean21.in/api/public/api/orgchart_list/1';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            const responseData = response.data.data;
            setDatalist(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchDataAdmin();
    }, []);

    const renderEmployee = (employee, level) => (
        <View key={employee.id} style={{ marginLeft: `${level * 20}%`, marginTop: level === 0 ? 0 : '3%' }}>
            <TouchableOpacity style={styles.Card1}>
                <View style={styles.ImgCard}>
                    {employee.profile_img ? (
                        <Image source={{ uri: `https://ocean21.in/api/storage/app/${employee.profile_img}` }} style={styles.Img} />
                    ) : (
                        <EmployeeIcon width={22} height={22} color={'#000'} />
                    )}
                </View>
                <View>
                    <Text style={styles.Name}>{employee.first_name} {employee.last_name}</Text>
                    <Text style={styles.Role}>{employee.role_name}</Text>
                </View>
            </TouchableOpacity>
            {employee.subordinates && employee.subordinates.length > 0 && (
                employee.subordinates.map(subordinate => renderEmployee(subordinate, level + 1))
            )}
        </View>
    );

    return (

        <ScrollView>

            <View style={{ margin: '5%' }}>

                <View style={styles.Card}>
                    <View style={styles.ImgCard}>
                        {datalistAdmin.profile_img ? (
                            <Image source={{ uri: `https://ocean21.in/api/storage/app/${datalistAdmin.profile_img}` }} style={styles.Img} />
                        ) : (
                            <EmployeeIcon width={22} height={22} color={'#000'} />
                        )}
                    </View>
                    <View>
                        <Text style={styles.Name}>{datalistAdmin.first_name} {datalistAdmin.last_name}</Text>
                        <Text style={styles.Role}>{datalistAdmin.role_name}</Text>
                    </View>
                </View>

            </View>

            <View style={{ marginLeft: '15%' }}>
                {datalist.map(employee => renderEmployee(employee, 0))}
            </View>

        </ScrollView>
    );
}

export default OrgChart;

