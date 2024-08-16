import React, { useEffect, useState } from "react";
import styles from "./style";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import numberToWords from 'number-to-words';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const ViewAppointmentLetter = ({ route, navigation }) => {

    // route

    const SpecId = route.params.Id.id;

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // getApi 

    const [invoiceData, setInvoiceData] = useState('');

    const getApi = async () => {

        try {
            const apiUrl = `https://ocean21.in/api/public/api/edit_appointment_list/${SpecId}`;
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
                    <Text style={{ fontWeight: '700', color: '#000', fontSize: 10 }}>EMPLOYMENT APPOINTMENT LETTER</Text>
                </View>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: '5%' }}>

                    <View style={{ width: '50%' }}>
                        <Text style={{ fontWeight: '600', fontSize: 10, color: '#000' }}>{invoiceData.select_salutation}{invoiceData.name}</Text>
                        <Text style={{ fontWeight: '600', fontSize: 10, color: '#000' }}>{invoiceData.address_line1}</Text>
                        <Text style={{ fontWeight: '600', fontSize: 10, color: '#000' }}>{invoiceData.address_line2}</Text>
                    </View>

                    <View style={{ width: '50%', alignItems: 'flex-end' }}>
                        <Text style={{ fontWeight: '600', fontSize: 10, color: '#000' }}>{invoiceData.date}</Text>
                    </View>

                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        This letter serves as your official appointment to the position of <Text style={{ fontWeight: '600' }}>{invoiceData.designation} </Text>
                        with effect from <Text style={{ fontWeight: '600' }}>{invoiceData.start_date} </Text> after careful consideration of your application and
                        the subsequent interviews you had with us. We are confident that your
                        contributions will greatly enhance our team and contribute to the
                        success of <Text style={{ fontWeight: '600' }}>{invoiceData.company_name}</Text>
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        You are appointed on the basis of the representation made or facts disclosed in
                        your application for appointment. In case of any fact or representation is found
                        to be wrong or considered to be connected to be concealed, it shall invalidate
                        the appointment and shall deem to be automatically cancelled.
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        You will be under probation for a period of <Text style={{ fontWeight: '600' }}>{invoiceData.probation_period}</Text> month during which your
                        performance will be assessed. On satisfactory completion of the probation
                        period, you will be confirmed in service. If not confirmed after six months, this
                        order will continue to be in operation, and the probation period will stand
                        extended automatically till further notice.
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        On confirmation of employment, this appointment may be terminated by either
                        side by giving <Text style={{ fontWeight: '600' }}>{invoiceData.noties_period_text}</Text> days notice or <Text style={{ fontWeight: '600' }}>{invoiceData.noties_period_text}</Text> days’ salary in lieu of notice period.
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        You will be liable to be transferred to any other department or establishment
                        or branch or subsidiary of the Company. In such a case, you will be governed
                        by the terms and conditions of service as applicable to the new assignment.
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        We welcome you to the <Text style={{ fontWeight: '600' }}>{invoiceData.company_name}</Text> family and trust we will have a long
                        and mutually rewarding association.
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '600', fontSize: 10 }}>
                        Employment Terms & Conditions
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        {invoiceData.employment_tc}
                    </Text>
                </View>

                <View style={{ marginTop: '5%', marginBottom: '15%' }}>
                    <Text style={{ fontWeight: '600', fontSize: 10 }}>
                        For {invoiceData.company_name}
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '600', fontSize: 10 }}>
                        {invoiceData.authroised_person_name}
                    </Text>
                    <Text style={{ fontWeight: '600', fontSize: 10 }}>
                        {invoiceData.authroised_designation}
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10 }}>
                        I hereby accept this position of UX UI Designer under the terms and conditions
                        stated in this Appointment Letter.
                    </Text>
                </View>

                <View style={{ marginTop: '5%' }}>
                    <Text style={{ fontWeight: '400', fontSize: 10, marginTop: '1%' }}>Employee signature: ­­­­­­­­­­­_____________ </Text>
                    <Text style={{ fontWeight: '400', fontSize: 10, marginTop: '1%' }}>Date: ____________</Text>
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

export default ViewAppointmentLetter;