import React, { useEffect, useState } from "react";
import styles from "./style";
import { RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Table, Row } from 'react-native-table-component';
import SearchIcon from '../../../../../assets/EPK CRM Icons/Search.svg';
import RightArrowIcon from '../../../../../assets/EPK CRM Icons/Arrow2.svg';
import LeftArrowIcon from '../../../../../assets/EPK CRM Icons/Arrow2Leftside.svg';
import { useSelector } from "react-redux";
import axios from "axios";
import { Grey, White } from "../../../../../assets/Colors";

const PayRollAdmin = ({ navigation }) => {

    // data from redux-store

    const { data } = useSelector((state) => state.login);

    // states 

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const itemsPerPage = 15;

    // API call for setTableData

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://officeinteriorschennai.com/api/public/api/view_all_payslip_list', {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            setTableData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // navigations

    const ViewDetail = (empid) => {
        navigation.navigate('Pay Roll Detail', { id: empid });
    };

    // filtering

    const [filterText, setFilterText] = useState('');

    const filteredData = tableData.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase())
        );
    });

    // Pagination

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleData = filteredData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Table Data

    const renderTableRows = () => {
        return visibleData.map((item, index) => (
            <Row
                key={index}
                data={[
                    <Text style={styles.cellText}>{(currentPage - 1) * itemsPerPage + index + 1}</Text>,
                    <Text style={styles.cellText}>{item.emp_name}</Text>,
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => ViewDetail(item.empid)}>
                            <Text style={styles.Button}>View Details</Text>
                        </TouchableOpacity>
                    </View>,
                ]}
                style={styles.row}
                textStyle={styles.rowText}
                widthArr={[100, 150, 200]}
            />
        ));
    };


    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}>

            <View style={styles.container}>

                <View>
                    <Text style={styles.heading}>Pay Roll Employee Details:</Text>
                </View>

                <View style={styles.filterInput}>
                    <TextInput
                        style={styles.search}
                        placeholder="Search"
                        value={filterText}
                        onChangeText={text => {
                            setFilterText(text);
                            setCurrentPage(1);
                        }}
                    />
                    <View style={styles.searchIcon}>
                        <SearchIcon color={Grey} />
                    </View>
                </View>

                <ScrollView horizontal>
                    <View style={styles.tableContainer}>
                        <Table borderStyle={styles.tableBorder}>
                            <Row
                                data={['S.No', 'Name', 'Action']}
                                style={styles.tableHeader}
                                textStyle={styles.headerText}
                                widthArr={[100, 150, 200]}
                            />
                            {loading ? (
                                <Row
                                    data={['Loading...']}
                                    style={styles.noDataRow}
                                    textStyle={styles.noDataRowText}
                                    widthArr={[styles.tableContainer.width]}
                                />
                            ) : visibleData.length === 0 ? (
                                <Row
                                    data={['No search data found']}
                                    style={styles.noDataRow}
                                    textStyle={styles.noDataRowText}
                                    widthArr={[styles.tableContainer.width]}
                                />
                            ) : (
                                renderTableRows()
                            )}
                        </Table>
                    </View>
                </ScrollView>

                <View style={styles.paginationContainer}>
                    <TouchableOpacity
                        style={styles.arrowstyle}
                        disabled={currentPage === 1}
                        onPress={() => setCurrentPage(currentPage - 1)}
                    >
                        <LeftArrowIcon color={White} />
                    </TouchableOpacity>
                    <Text style={styles.paginationText}>
                        Page {currentPage} of {totalPages}
                    </Text>
                    <TouchableOpacity
                        style={styles.arrowstyle}
                        disabled={endIndex >= filteredData.length}
                        onPress={() => setCurrentPage(currentPage + 1)}
                    >
                        <RightArrowIcon color={White} />
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    )
}

export default PayRollAdmin;