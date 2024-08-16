import React, { useEffect, useState } from "react";
import styles from "./style";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import numberToWords from 'number-to-words';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const ViewReliveingLetter = ({ route, navigation }) => {

    // route

    const SpecId = route.params.Id.id;

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // getApi 

    const [invoiceData, setInvoiceData] = useState('');

    const getApi = async () => {

        try {
            const apiUrl = `https://ocean21.in/api/public/api/edit_relieving_list/${SpecId}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setInvoiceData(responseData || {});

        } catch (error) {
            console.error('Error fetching getApi data:', error);
        }

    }

    useEffect(() => {
        getApi();
    }, [])


    const exportToPDF = async () => {

        const htmlContent = ``;

        const { filePath } = await RNHTMLtoPDF.convert({
            html: htmlContent,
            fileName: 'Sales_Invoice',
            directory: RNFS.DocumentDirectoryPath,
        });

        Share.open({
            url: `file://${filePath}`,
            type: 'application/pdf',
            title: 'Export to PDF',
        });
    };

    const Header = `https://ocean21.in/api/storage/app/${invoiceData.header_attachment}`;
    const Footer = `https://ocean21.in/api/storage/app/${invoiceData.footer_attached}`;

    return (

        <ScrollView>

            <View style={styles.imageview}>
                <Image
                    source={{ uri: Header }}
                    style={styles.imageStyle}
                />
            </View>

            <View style={{ paddingHorizontal: '10%' }}>

                <View style={{ alignItems: 'center', marginTop: '1%' }}>
                    <Text style={{ fontWeight: '700', color: '#000', fontSize: 10 }}>RELIEVING LETTER</Text>
                </View>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: '5%' }}>

                    <View style={{ width: '50%' }}>

                    </View>

                    <View style={{ width: '50%', alignItems: 'flex-end' }}>
                        <Text style={{ fontWeight: '600', fontSize: 10, color: '#000' }}>{invoiceData.date}</Text>
                    </View>

                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        This is to certify that Jarvis was employed with Stark Industries from <Text style={{ fontWeight: '600' }}>{invoiceData.joining_date} </Text>
                        to <Text style={{ fontWeight: '600' }}> {invoiceData.last_working_day}</Text>.
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        Throughout this tenure, <Text style={{ fontWeight: '600' }}>{invoiceData.employee_name}</Text> has diligently fulfilled their responsibilities as a
                        <Text style={{ fontWeight: '600' }}> {invoiceData.designation}</Text>. Your dedication and contribution to the team has been valuable.
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        We acknowledge that you have returned any and all properties of the Company
                        and have completed all formalities with respect to your cessation of employment
                        with the Company.
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        We wish you all the best for your future endeavors.
                    </Text>
                </View>

                <View style={{ marginTop: '5%', marginBottom: '15%' }}>
                    <Text style={{ fontWeight: '600', fontSize: 10 }}>
                        For {invoiceData.company_name}
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '600', fontSize: 10 }}>
                        {invoiceData.authorised_person_name}
                    </Text>
                    <Text style={{ fontWeight: '600', fontSize: 10 }}>
                        {invoiceData.authorised_person_designation}
                    </Text>
                </View>

            </View>

            <View style={styles.imageview}>
                <Image
                    source={{ uri: Footer }}
                    style={styles.imageStyle}
                />
            </View>

            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <TouchableOpacity style={styles.buttonstyles} onPress={exportToPDF}>
                    <Text style={styles.text}>
                        Download
                    </Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

export default ViewReliveingLetter;