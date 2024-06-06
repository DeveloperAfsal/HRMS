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

    // function to fetch data

    const fetchData = async () => {

        try {
            const apiUrl = 'https://ocean21.in/api/public/api/orgchart_list/0';
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
    }, []);

    const renderEmployee = (employee, level) => (
        <View key={employee.id} style={{ marginLeft: `${level * 15}%`, marginTop: level === 0 ? 0 : '3%' }}>
            <TouchableOpacity style={styles.Card}>
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

            <View style={{ marginLeft: '5%' }}>
                {datalist.map(employee => renderEmployee(employee, 0))}
            </View>

        </ScrollView>
    );
}

export default OrgChart;

