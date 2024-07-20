import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";


const Joined = ({ employeeData, loading, filteredData, navigation }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = [...Array(totalPages).keys()].map(num => num + 1);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color={"#0A60F1"} style={styles.activityIndicator} />
                ) : (
                    <>
                        {paginatedData.length === 0 ? (
                            <Text style={styles.name1}>No Data found</Text>
                        ) : (
                            paginatedData.map((employee, index) => (
                                <View key={index} style={[styles.card, styles.cardBottom]}>
                                    <View>
                                        <View style={styles.phoneEmail}>
                                            <View style={styles.gap}>
                                                <Text style={styles.fontsize1}>Name :</Text>
                                                <Text style={styles.fontsize1}>Designation :</Text>
                                                <Text style={styles.fontsize1}>Total Experience :</Text>
                                                <Text style={styles.fontsize1}>Current CTC :</Text>
                                                <Text style={styles.fontsize1}>Candidate Status :</Text>
                                            </View>
                                            <View style={styles.gap}>
                                                <Text style={styles.fontsize}>{employee.candidate_name}</Text>
                                                <Text style={styles.fontsize}>{employee.current_designation}</Text>
                                                <Text style={styles.fontsize}>{employee.total_exp}</Text>
                                                <Text style={styles.fontsize}>{employee.current_ctc}</Text>
                                                <View style={styles.ViewDetails1}>
                                                    <Text style={styles.DetailsText1}>{employee.status}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'center', paddingTop: '10%' }}>
                                            <TouchableOpacity style={styles.ViewDetails} onPress={() => navigation.navigate('Candidate View Details', { Id: employee.id })}
                                            >
                                                <Text style={styles.DetailsText}>View Details</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))
                        )}

                        {paginatedData.length === 0 ? null : <View style={{ alignItems: 'center' }}>
                            <View style={styles.pagination}>

                                <TouchableOpacity style={styles.prev}
                                    onPress={() => onPageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <ArrowLeftIcon width={14} height={14} color={'#737373'} />
                                    <Text style={styles.prevText}>
                                        Prev
                                    </Text>
                                </TouchableOpacity>

                                {pages.map(page => (
                                    <Text
                                        key={page}
                                        style={[styles.pageNo, currentPage === page ? styles.PageActive : null]}
                                        onPress={() => onPageChange(page)}
                                    >
                                        {page}
                                    </Text>
                                ))}

                                <TouchableOpacity style={styles.Next}
                                    onPress={() => onPageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    <Text style={styles.NextText}>
                                        Next
                                    </Text>
                                    <ArrowRightIcon width={14} height={14} color={'#0A62F1'} />
                                </TouchableOpacity>

                            </View>
                        </View>}

                    </>
                )}
            </View>


        </ScrollView >
    );
};

export default Joined;
