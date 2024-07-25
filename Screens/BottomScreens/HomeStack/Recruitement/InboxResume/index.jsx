import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import SearchIcon from '../../../../../Assets/Icons/Search.svg';
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg";
import MailOpenIcon from "../../../../../Assets/Icons/mailOpen.svg";
import MailCloseIcon from "../../../../../Assets/Icons/mailClosed.svg";
import ArrowRightIcon from "../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../Assets/Icons/leftarrow.svg";
import styles from "./style";

const InboxResume = () => {

    const [loadData, setLoadData] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    const filteredData = datalist.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase()));
    });

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const renderPagination = () => {
        const pagination = [];
        const showEllipsis = totalPages > 5;

        if (!showEllipsis) {
            for (let i = 1; i <= totalPages; i++) {
                pagination.push(i);
            }
        } else {
            pagination.push(1);
            if (currentPage > 3) {
                pagination.push('...');
            }
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pagination.push(i);
            }
            if (currentPage < totalPages - 2) {
                pagination.push('...');
            }
            pagination.push(totalPages); // Always show the last page
        }

        return pagination.map((page, index) => (
            typeof page === 'number' ? (
                <Text
                    key={index}
                    style={[styles.pageNo, currentPage === page ? styles.PageActive : null]}
                    onPress={() => onPageChange(page)}
                >
                    {page}
                </Text>
            ) : (
                <Text key={index} style={styles.pageNo}>...</Text>
            )
        ));
    };

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (

        <ScrollView>

            <View style={styles.Page}>

                <View style={styles.filterInput}>

                    <TextInput
                        style={styles.search}
                        placeholder="Search"
                    />

                    <View style={styles.searchIcon}>
                        <SearchIcon color={"#1AD0FF"} />
                    </View>

                </View>

                <View style={styles.ButtonView}>
                    <TouchableOpacity style={styles.Button}>

                        <Text style={styles.ButtonText}>
                            Read  <View style={styles.ButtonCount}>
                                <Text style={styles.ButtonCountText}>148</Text>
                            </View>
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Button}>

                        <Text style={styles.ButtonText}>
                            Unread <View style={styles.ButtonCount}>
                                <Text style={styles.ButtonCountText}>14</Text>
                            </View>
                        </Text>

                    </TouchableOpacity>

                </View>

                <View style={styles.ButtonView1}>

                    <TouchableOpacity style={styles.Button1}>
                        <MailCloseIcon width={18} height={18} />
                        <Text style={styles.ButtonText1}>
                            Mark as unread
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Button1}>
                        <MailOpenIcon width={18} height={18} />
                        <Text style={styles.ButtonText1}>
                            Mark as read
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Button2}>
                        <DeleteIcon width={14} height={14} color={"#BD0000"} />
                        <Text style={styles.ButtonText2}>
                            Delete
                        </Text>
                    </TouchableOpacity>

                </View>

                <ScrollView horizontal={true}>

                    <View style={styles.Tablecontainer}>
                        {loadData ? (
                            <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                        ) : (
                            <View>

                                <View style={[styles.row, styles.listHeader]}>
                                    <Text style={[styles.header, styles.cell, styles.sno]}>S.No</Text>
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Designation</Text>
                                    <Text style={[styles.header, styles.cell, styles.EmployeeName]}>Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Mobile No</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Email</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Key Skills</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Resume</Text>
                                    <Text style={[styles.header, styles.cell, styles.Action]}>Action</Text>
                                </View>

                                {paginatedData.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <Text style={[styles.cell, styles.sno]}>{index + 1}</Text>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.created_name}</Text>
                                            <Text style={[styles.cell, styles.EmployeeName]}>{item.message}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.created_at}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.updated_at}</Text>
                                        </View>
                                    ))
                                )}

                            </View>
                        )
                        }
                    </View>

                </ScrollView>

                <View style={{ alignItems: 'center' }}>
                    <View style={styles.pagination}>
                        <TouchableOpacity
                            style={styles.prev}
                            onPress={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ArrowLeftIcon width={14} height={14} color={'#737373'} />
                            <Text style={styles.prevText}>Prev</Text>
                        </TouchableOpacity>
                        {renderPagination()}
                        <TouchableOpacity
                            style={styles.Next}
                            onPress={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <Text style={styles.NextText}>Next</Text>
                            <ArrowRightIcon width={14} height={14} color={'#0A62F1'} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </ScrollView>

    )

}

export default InboxResume;