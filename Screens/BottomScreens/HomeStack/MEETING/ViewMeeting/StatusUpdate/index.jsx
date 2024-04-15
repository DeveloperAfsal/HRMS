import React, { useEffect, useState } from "react";
import styles from "./style";
import { ActivityIndicator, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Table, Row } from 'react-native-table-component';
import SearchIcon from '../../../../../../assets/EPK CRM Icons/Search.svg';
import RightArrowIcon from '../../../../../../assets/EPK CRM Icons/Arrow2.svg';
import LeftArrowIcon from '../../../../../../assets/EPK CRM Icons/Arrow2Leftside.svg';
import axios from "axios";
import { useSelector } from "react-redux";
import { Grey, PrimaryBlue, White } from "../../../../../../assets/Colors";

const StatusUpdate = ({ route }) => {

    // data from redux-store

    const { data } = useSelector((state) => state.login);

    // route

    const { item, status } = route.params;

    // states

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // API call

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://officeinteriorschennai.com/api/public/api/meeting_status_list/${item.id}/${status}`, {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            });
            setTableData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // table data

    const renderTableRows = () => {
        return visibleData.map((item, index) => (
            <Row key={index}
                data={[
                    <Text style={styles.cellText}>{(currentPage - 1) * itemsPerPage + index + 1}</Text>,
                    <Text style={styles.cellText}>{item.membername}</Text>,
                    <Text style={styles.cellText}>{item.remarks}</Text>]}
                style={styles.row}
                textStyle={styles.rowText}
                widthArr={[100, 150, 200]}
            />
        ));
    };

    // filteredData

    const [filterText, setFilterText] = useState('');

    const filteredData = tableData.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase()));
    });

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleData = filteredData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);


    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}>

            <View style={styles.container}>

                <View>
                    <Text style={styles.heading}>Remarks Update :</Text>
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


                {loading ? (
                    <ActivityIndicator size="large" color={PrimaryBlue} style={styles.activityIndicator} />
                ) : (
                    <>
                        <View>
                            <ScrollView horizontal>
                                <View style={styles.tableContainer}>
                                    <Table borderStyle={styles.tableBorder}>
                                        <Row
                                            data={['S.No', 'Name', 'Reason']}
                                            style={styles.tableHeader}
                                            textStyle={styles.headerText}
                                            widthArr={[100, 150, 200]}
                                        />
                                        {visibleData.length === 0 ? (
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
                                <Text style={styles.paginationText}>Page
                                    {currentPage} off {totalPages} </Text>
                                <TouchableOpacity
                                    style={styles.arrowstyle}
                                    disabled={endIndex >= filteredData.length}
                                    onPress={() => setCurrentPage(currentPage + 1)}
                                >
                                    <RightArrowIcon color={White} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )}

            </View>
        </ScrollView>
    )
}

export default StatusUpdate;