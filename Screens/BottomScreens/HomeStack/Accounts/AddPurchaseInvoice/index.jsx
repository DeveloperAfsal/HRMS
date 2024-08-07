import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import DropdownIcon from "../../../../../Assets/Icons/Dropdowndownarrow.svg";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";

const AddPurchaseInvoice = ({ navigation }) => {

    const { data } = useSelector((state) => state.login);

    // state

    const [invNumber, setInvNumber] = useState('');
    const [deliveryNote, setDeliveryNote] = useState('');
    const [paymentMode, setPaymentMode] = useState('');
    const [referenceNo, setReferenceNo] = useState('');
    const [otherReference, setOtherReference] = useState('');
    const [orderNo, setOrderNo] = useState('');
    const [dispatchNo, setDispatchNo] = useState('');
    const [dispatchThrough, setDispatchThrough] = useState('');
    const [designation, setDesignation] = useState('');
    const [termsDelivery, setTermsDelivery] = useState('');
    const [otherDelivery, setOtherDelivery] = useState('');
    const [CGST, setCGST] = useState('');
    const [SGST, setSGST] = useState('');
    const [IGST, setIGST] = useState('');

    const [quality, setQuality] = useState('');
    const [rate, setRate] = useState('');
    const [per, setPer] = useState('');
    const [amount, setAmount] = useState('');

    const [totalValueAmount, setTotalValueAmount] = useState('');
    const [CGSTAmount, setCGSTAmount] = useState('');
    const [SGSTAmount, setSGSTAmount] = useState('');
    const [IGSTAmount, setIGSTAmount] = useState('');
    const [totalInvoiceAmount, setTotalInvoiceAmount] = useState('');
    const [roundOff, setRoundoff] = useState('');
    const [reason, setReason] = useState('');

    const [invNumberErr, setInvNumberErr] = useState('');
    const [reasonErr, setReasonErr] = useState('');

    // 

    const [descriptional, setDescriptional] = useState([]);
    const [showDropdownDescriptional, setShowDropdownDescriptional] = useState(false);
    const [selectedDescriptional, setSelectedDescriptional] = useState([]);
    const [selectedDescriptionalErr, setSelectedDescriptionalErr] = useState();
    const [selectedDescriptionalId, setSelectedDescriptionalId] = useState(null);

    const selectDescriptional = (File) => {
        setSelectedDescriptional(File.good_service_name);
        setSelectedDescriptionalId(File.id);
        setShowDropdownDescriptional(false);
    };

    const toggleDropdownDescriptional = () => {
        setShowDropdownDescriptional(!showDropdownDescriptional);
    }

    const DescriptionalApi = async () => {

        try {
            const apiUrl = 'https://ocean21.in/api/public/api/sales_item_list';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setDescriptional(responseData);

        } catch (error) {
            console.error('Error fetching companyList data:', error);
        }

    }

    useEffect(() => {
        DescriptionalApi();
    }, [])

    const [hsn, setHsn] = useState('');
    const [hsnId, setHsnId] = useState('');

    const HsnApi = async () => {

        try {
            const apiUrl = `https://ocean21.in/api/public/api/sales_hsn_sac/${selectedDescriptionalId}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setHsn(responseData.hsn_sac);
            setHsnId(responseData.id);

        } catch (error) {
            console.error('Error fetching companyList data:', error);
        }

    }

    useEffect(() => {
        HsnApi();
    }, [selectedDescriptionalId])

    // 

    const [showDropdownStatus, setShowDropdownStatus] = useState(false);
    const [statusError, setStatusError] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(null);

    const toggleDropdownStatus = () => {
        setShowDropdownStatus(!showDropdownStatus);
    };

    const selectStatus = (status) => {
        setSelectedStatus(status);
        setShowDropdownStatus(false);
    };

    // 

    const [showDropdownPayStatus, setShowDropdownPayStatus] = useState(false);
    const [payStatusError, setPayStatusError] = useState('');
    const [selectedPayStatus, setSelectedPayStatus] = useState(null);

    const toggleDropdownPayStatus = () => {
        setShowDropdownPayStatus(!showDropdownPayStatus);
    };

    const selectPayStatus = (status) => {
        setSelectedPayStatus(status);
        setShowDropdownPayStatus(false);
    };

    // 

    const [showDropdownPayMethod, setShowDropdownPayMethod] = useState(false);
    const [payMethodError, setPayMethodError] = useState('');
    const [selectedPayMethod, setSelectedPayMethod] = useState(null);

    const toggleDropdownPayMethod = () => {
        setShowDropdownPayMethod(!showDropdownPayMethod);
    };

    const selectPayMethod = (status) => {
        setSelectedPayMethod(status);
        setShowDropdownPayMethod(false);
    };

    // 

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [startDateErr, setStartDateErr] = useState(null);
    const formattedStartDate = startDate ?
        `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}` :
        "";

    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [startDate1, setStartDate1] = useState(null);
    const [startDateErr1, setStartDateErr1] = useState(null);
    const formattedStartDate1 = startDate1 ?
        `${startDate1.getFullYear()}-${String(startDate1.getMonth() + 1).padStart(2, '0')}-${String(startDate1.getDate()).padStart(2, '0')}` :
        "";

    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [startDate2, setStartDate2] = useState(null);
    const [startDateErr2, setStartDateErr2] = useState(null);
    const formattedStartDate2 = startDate2 ?
        `${startDate2.getFullYear()}-${String(startDate2.getMonth() + 1).padStart(2, '0')}-${String(startDate2.getDate()).padStart(2, '0')}` :
        "";

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (event, date) => {
        if (event.type === "set" && date) {
            setStartDate(date);
        }
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const handleDateChange1 = (event, date) => {
        if (event.type === "set" && date) {
            setStartDate1(date);
        }
        setShowDatePicker1(false);
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    const handleDateChange2 = (event, date) => {
        if (event.type === "set" && date) {
            setStartDate2(date);
        }
        setShowDatePicker2(false);
    };

    const showDatepicker2 = () => {
        setShowDatePicker2(true);
    };


    // company list

    const [showDropdown, setShowDropdown] = useState(false);
    const [documentList, setDocumentList] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [selectedDocumentErr, setSelectedDocumentErr] = useState();
    const [selectedDocumentId, setSelectedDocumentId] = useState(null);

    const [showDropdown1, setShowDropdown1] = useState(false);
    const [documentList1, setDocumentList1] = useState([]);
    const [selectedDocument1, setSelectedDocument1] = useState([]);
    const [selectedDocumentErr1, setSelectedDocumentErr1] = useState();
    const [selectedDocumentId1, setSelectedDocumentId1] = useState(null);

    const [showDropdown2, setShowDropdown2] = useState(false);
    const [documentList2, setDocumentList2] = useState([]);
    const [selectedDocument2, setSelectedDocument2] = useState([]);
    const [selectedDocumentErr2, setSelectedDocumentErr2] = useState();
    const [selectedDocumentId2, setSelectedDocumentId2] = useState(null);

    const filteredDocumentList1 = documentList1.filter(File => File.id !== selectedDocumentId);
    const filteredDocumentList2 = documentList1.filter(File => File.id !== selectedDocumentId);

    const CompanyApi = async () => {

        try {
            const apiUrl = 'https://ocean21.in/api/public/api/sales_company_list';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setDocumentList(responseData);
            setDocumentList1(responseData);

        } catch (error) {
            console.error('Error fetching companyList data:', error);
        }

    }

    const selectDocument = (File) => {
        setSelectedDocument(File.company_name);
        setSelectedDocumentId(File.id);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const selectDocument1 = (File) => {
        setSelectedDocument1(File.company_name);
        setSelectedDocumentId1(File.id);
        setShowDropdown1(false);
    };

    const toggleDropdown1 = () => {
        setShowDropdown1(!showDropdown1);
    }

    const selectDocument2 = (File) => {
        setSelectedDocument2(File.company_name);
        setSelectedDocumentId2(File.id);
        setShowDropdown2(false);
    };

    const toggleDropdown2 = () => {
        setShowDropdown2(!showDropdown2);
    }

    useEffect(() => {
        CompanyApi();
    }, [])

    const validateFields = () => {
        let isValid = true;

        if (selectedDocument.length == 0) {
            setSelectedDocumentErr('Select Vendor Name')
        } else {
            setSelectedDocumentErr('');
        }

        if (selectedDocument1.length == 0) {
            setSelectedDocumentErr1('Select Ship To')
        } else {
            setSelectedDocumentErr1('');
        }

        if (selectedDocument2.length == 0) {
            setSelectedDocumentErr2('Select Bill To')
        } else {
            setSelectedDocumentErr2('');
        }

        if (!invNumber) {
            setInvNumberErr('Invoice Number Required')
        } else {
            setInvNumberErr('');
        }

        if (!startDate) {
            setStartDateErr('Date Required');
        } else {
            setStartDateErr('');
        }

        if (selectedDescriptional.length == 0) {
            setSelectedDescriptionalErr('At least one Descriptional Goods is required.')
        } else {
            setSelectedDescriptionalErr('');
        }

        if (!reason) {
            setReasonErr('Reason Required');
        } else {
            setReasonErr('');
        }

        if (!selectedPayMethod) {
            setPayMethodError('Payment Method required.')
        } else {
            setPayMethodError('');
        }

        if (!selectedPayStatus) {
            setPayStatusError('Payment Status required.')
        } else {
            setPayStatusError('');
        }

        if (!selectedStatus) {
            setStatusError('Status required.')
        } else {
            setStatusError('');
        }


        return isValid;
    };

    const [load, SetLoad] = useState(false);

    const HandleSubmit = async () => {

        SetLoad(true);

        if (!validateFields()) {
            Alert.alert('Invalid Fields', 'Enter all required fields')
            SetLoad(false);
            return;
        }

        // try {

        //     const apiUrl = '';

        //     const response = await axios.post(apiUrl, {
        //         created_by: data.userempid,

        //     }, {
        //         headers: {
        //             Authorization: `Bearer ${data.token}`
        //         }
        //     });

        //     const responseData = response.data;

        //     if (responseData.status === "success") {
        //         handleShowAlert(responseData.message);
        //         SetLoad(false);
        //         refresh();
        //     } else {
        //         handleShowAlert1(responseData.message);
        //         SetLoad(false);
        //     }

        // } catch (error) {
        //     handleShowAlert2();
        //     SetLoad(false);
        // }

    }

    const refresh = () => {

    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Purchase Invoice List');
        }, 2500);
    };

    const [isAlertVisible1, setAlertVisible1] = useState(false);
    const [resMessageFail, setResMessageFail] = useState('');

    const handleShowAlert1 = (res) => {
        setAlertVisible1(true);
        setResMessageFail(res);
        setTimeout(() => {
            setAlertVisible1(false);
        }, 2500);
    };

    const [isAlertVisible2, setAlertVisible2] = useState(false);

    const handleShowAlert2 = () => {
        setAlertVisible2(true);
        setTimeout(() => {
            setAlertVisible2(false);
        }, 3000);
    };


    return (

        <ScrollView>

            <View style={styles.PolicyContainer}>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}>Add Purchase Invoice</Text>
                </View>

                <View style={styles.Inputcontainer}>


                    <Text style={styles.StatDateText}>
                        Vendor Name
                    </Text>

                    <TouchableOpacity onPress={toggleDropdown} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDocument && selectedDocument.length > 0 ? selectedDocument : "Select Document Type"}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown && (
                        <View style={styles.dropdown}>
                            {documentList.map((File, index) => (
                                <TouchableOpacity key={index} onPress={() => selectDocument(File)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{File.company_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedDocumentErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Ship To
                    </Text>

                    <TouchableOpacity onPress={toggleDropdown1} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDocument1 && selectedDocument1.length > 0 ? selectedDocument1 : "Select Document Type"}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown1 && (
                        <View style={styles.dropdown}>
                            {filteredDocumentList1.map((File, index) => (
                                <TouchableOpacity key={index} onPress={() => selectDocument1(File)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{File.company_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedDocumentErr1}
                    </Text>


                    <Text style={styles.StatDateText}>
                        Bill To
                    </Text>

                    <TouchableOpacity onPress={toggleDropdown2} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDocument2 && selectedDocument2.length > 0 ? selectedDocument2 : "Select Document Type"}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdown2 && (
                        <View style={styles.dropdown}>
                            {filteredDocumentList2.map((File, index) => (
                                <TouchableOpacity key={index} onPress={() => selectDocument2(File)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{File.company_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedDocumentErr2}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Invoice Number
                    </Text>

                    <TextInput
                        value={invNumber}
                        onChangeText={(txt) => setInvNumber(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        {invNumberErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker}>
                            {startDate ? formatDate(startDate) : "Select Date"} &nbsp;
                        </Text>
                        {showDatePicker && (
                            <DateTimePicker
                                value={startDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        {startDateErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Delivery Note
                    </Text>

                    <TextInput
                        value={deliveryNote}
                        onChangeText={(txt) => setDeliveryNote(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Delivery Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker}>
                            {startDate1 ? formatDate(startDate1) : "Select Date"} &nbsp;
                        </Text>
                        {showDatePicker1 && (
                            <DateTimePicker
                                value={startDate1 || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange1}
                            />
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        {startDateErr1}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Mode Of Payment
                    </Text>

                    <TextInput
                        value={paymentMode}
                        onChangeText={(txt) => setPaymentMode(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Reference No & Dates
                    </Text>

                    <TextInput
                        value={referenceNo}
                        onChangeText={(txt) => setReferenceNo(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>


                    <Text style={styles.StatDateText}>
                        Other Reference
                    </Text>

                    <TextInput
                        value={otherReference}
                        onChangeText={(txt) => setOtherReference(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>


                    <Text style={styles.StatDateText}>
                        Buyer’s Order No
                    </Text>

                    <TextInput
                        value={orderNo}
                        onChangeText={(txt) => setOrderNo(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Buyer’s Order Date
                    </Text>

                    <View style={styles.inputs} >
                        <Text onPress={showDatepicker}>
                            {startDate2 ? formatDate(startDate2) : "Select Date"} &nbsp;
                        </Text>
                        {showDatePicker2 && (
                            <DateTimePicker
                                value={startDate2 || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange2}
                            />
                        )}
                    </View>

                    <Text style={styles.errorText}>
                        {startDateErr2}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Dispatch Document No
                    </Text>

                    <TextInput
                        value={dispatchNo}
                        onChangeText={(txt) => setDispatchNo(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>


                    <Text style={styles.StatDateText}>
                        Dispatch Through
                    </Text>

                    <TextInput
                        value={dispatchThrough}
                        onChangeText={(txt) => setDispatchThrough(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>


                    <Text style={styles.StatDateText}>
                        Designation
                    </Text>

                    <TextInput
                        value={designation}
                        onChangeText={(txt) => setDesignation(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>


                    <Text style={styles.StatDateText}>
                        Terms of Delivery
                    </Text>

                    <TextInput
                        value={termsDelivery}
                        onChangeText={(txt) => setTermsDelivery(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Other Details
                    </Text>

                    <TextInput
                        value={otherDelivery}
                        onChangeText={(txt) => setOtherDelivery(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        CGST Percentage
                    </Text>

                    <TextInput
                        value={CGST}
                        onChangeText={(txt) => setCGST(txt)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        SGST Percentage
                    </Text>

                    <TextInput
                        value={SGST}
                        onChangeText={(txt) => setSGST(txt)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>


                    <Text style={styles.StatDateText}>
                        IGST Percentage
                    </Text>

                    <TextInput
                        value={IGST}
                        onChangeText={(txt) => setIGST(txt)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                </View>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}></Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Descriptional Goods
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownDescriptional} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>
                            {selectedDescriptional && selectedDescriptional.length > 0 ? selectedDescriptional : "Select Descriptional Goods"}
                        </Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {showDropdownDescriptional && (
                        <View style={styles.dropdown}>
                            {descriptional.map((File, index) => (
                                <TouchableOpacity key={index} onPress={() => selectDescriptional(File)} style={styles.dropdownOption}>
                                    <Text style={styles.dropdownOptionText}>{File.good_service_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <Text style={styles.errorText}>
                        {selectedDescriptionalErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        HSN / ASC
                    </Text>

                    <TextInput
                        value={hsn}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Quantity
                    </Text>

                    <TextInput
                        value={quality}
                        onChangeText={(txt) => setQuality(txt)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Rate
                    </Text>

                    <TextInput
                        value={rate}
                        onChangeText={(txt) => setRate(txt)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Per
                    </Text>

                    <TextInput
                        value={per}
                        onChangeText={(txt) => setPer(txt)}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Amount
                    </Text>

                    <TextInput
                        value={amount}
                        onChangeText={(txt) => setAmount(txt)}
                        style={styles.inputs}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: '5%' }}>
                        <TouchableOpacity style={styles.HeaderButtonActive} >
                            <Text style={styles.HeaderButtonTextActive}>
                                Add +
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.PolicyContainerTitleHeader}>
                    <Text style={styles.PolicyContainerTitleText}></Text>
                </View>

                <View style={styles.Inputcontainer}>

                    <Text style={styles.StatDateText}>
                        Total Value Amount
                    </Text>

                    <TextInput
                        value={totalValueAmount}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        IGST Amount
                    </Text>

                    <TextInput
                        value={IGSTAmount}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        CGST Amount
                    </Text>

                    <TextInput
                        value={CGSTAmount}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        SGST Amount
                    </Text>

                    <TextInput
                        value={SGSTAmount}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Total Invoice Amount
                    </Text>

                    <TextInput
                        value={totalInvoiceAmount}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Round Off
                    </Text>

                    <TextInput
                        value={roundOff}
                        editable={false}
                        style={styles.inputs}
                    />

                    <Text style={styles.errorText}>
                        { }
                    </Text>

                    <Text style={styles.StatDateText}>
                        Payment Method
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownPayMethod} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedPayMethod || "Select Payment Method"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {/* Dropdown to show the options */}

                    {showDropdownPayMethod && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectPayMethod("Credit Card")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Credit Card</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectPayMethod("Bank Transfer")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Bank Transfer</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectPayMethod("PayPal")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>PayPal</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {payMethodError}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Payment Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownPayStatus} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedPayStatus || "Select Payment Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {/* Dropdown to show the options */}

                    {showDropdownPayStatus && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectPayStatus("Paid")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Paid</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectPayStatus("Unpaid")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Unpaid</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectPayStatus("Pending")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Pending</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {payStatusError}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Reason
                    </Text>

                    <TextInput
                        value={reason}
                        onChangeText={(txt) => setReason(txt)}
                        style={styles.inputs1}
                        textAlignVertical="top"
                        multiline={true}
                    />

                    <Text style={styles.errorText}>
                        {reasonErr}
                    </Text>

                    <Text style={styles.StatDateText}>
                        Status
                    </Text>

                    <TouchableOpacity onPress={toggleDropdownStatus} style={styles.StatusTouchable}>

                        <Text style={styles.StatusTouchableText}>{selectedStatus || "Select Status"}</Text>
                        <DropdownIcon width={14} height={14} color={"#000"} />

                    </TouchableOpacity>

                    {/* Dropdown to show the options */}

                    {showDropdownStatus && (

                        <View style={styles.dropdown}>

                            <TouchableOpacity onPress={() => selectStatus("Active")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>Active</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectStatus("In-Active")} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>In-Active</Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    <Text style={styles.errorText}>
                        {statusError}
                    </Text>

                </View>

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: '5%' }}>
                <TouchableOpacity style={styles.HeaderButtonActive} onPress={HandleSubmit}>
                    {
                        load ?
                            <ActivityIndicator size={"small"} color={"#fff"} /> :
                            <Text style={styles.HeaderButtonTextActive}>
                                Add Purchase Invoice
                            </Text>
                    }
                </TouchableOpacity>

                <TouchableOpacity style={styles.HeaderButton} onPress={refresh}>
                    <Text style={styles.HeaderButtonText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>

            <LottieAlertSucess
                visible={isAlertVisible}
                animationSource={require('../../../../../Assets/Alerts/tick.json')}
                title={resMessage}
            />

            <LottieAlertError
                visible={isAlertVisible1}
                animationSource={require('../../../../../Assets/Alerts/Close.json')}
                title={resMessageFail}
            />

            <LottieCatchError
                visible={isAlertVisible2}
                animationSource={require('../../../../../Assets/Alerts/Catch.json')}
                title="Error While Fetching Data"
            />

        </ScrollView>

    )
}

export default AddPurchaseInvoice;

