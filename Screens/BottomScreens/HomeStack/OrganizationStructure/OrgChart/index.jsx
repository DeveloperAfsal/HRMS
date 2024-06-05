import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import EmployeeIcon from '../../../../../Assets/Icons/Employee.svg';
import axios from "axios";
import { useSelector } from "react-redux";

const OrgChart = () => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // state for managing fetched data

    const [loadData, setLoadData] = useState(false);
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

        setLoadData(true);

        try {
            const apiUrl = 'https://ocean21.in/api/public/api/orgchart_list/1';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            setLoadData(false);
            const responseData = response.data.data;
            setDatalist(responseData);
        } catch (error) {
            setLoadData(false);
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchDataAdmin();
    }, []);

    const renderEmployee = (employee, level) => (
        <View key={employee.id} style={{ marginLeft: `${level * 10}%`, marginTop: level === 0 ? 0 : '3%' }}>
            <TouchableOpacity style={{ backgroundColor: '#00275C', width: 213, height: 60, borderRadius: 5, alignItems: 'center', flexDirection: 'row', gap: 10, paddingLeft: '3%', marginTop: '10%' }}>
                <View style={{ backgroundColor: '#fff', width: 41, height: 41, alignItems: 'center', justifyContent: 'center', borderRadius: 3 }}>
                    {employee.profile_img ? (
                        <Image source={{ uri: `https://ocean21.in/api/storage/app/${employee.profile_img}` }} style={{ width: 41, height: 41, borderColor: '#fff', borderWidth: 1 }} />
                    ) : (
                        <EmployeeIcon width={22} height={22} color={'#000'} />
                    )}
                </View>
                <View>
                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700' }}>{employee.first_name} {employee.last_name}</Text>
                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>{employee.role_name}</Text>
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

                <TouchableOpacity style={{ backgroundColor: '#00275C', width: 213, height: 60, borderRadius: 5, alignItems: 'center', gap: 10, paddingLeft: '3%', flexDirection: 'row' }}>
                    <View style={{ backgroundColor: '#fff', width: 41, height: 41, alignItems: 'center', justifyContent: 'center', borderRadius: 3 }}>
                        {datalistAdmin.profile_img ? (
                            <Image source={{ uri: `https://ocean21.in/api/storage/app/${datalistAdmin.profile_img}` }} style={{ width: 41, height: 41, borderColor: '#fff', borderWidth: 1 }} />
                        ) : (
                            <EmployeeIcon width={22} height={22} color={'#000'} />
                        )}
                    </View>
                    <View>
                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700' }}>{datalistAdmin.first_name} {datalistAdmin.last_name}</Text>
                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>{datalistAdmin.role_name}</Text>
                    </View>
                </TouchableOpacity>

            </View>

            <View style={{ marginLeft: '15%' }}>
                {datalist.map(employee => renderEmployee(employee, 0))}
            </View>

        </ScrollView>
    );
}

export default OrgChart;

