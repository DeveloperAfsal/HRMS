import React, { useEffect, useState } from "react";
import styles from "./style";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import numberToWords from 'number-to-words';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const SalesInvoiceView = ({ route, navigation }) => {

    // route

    const SpecId = route.params.Id.id;

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    // getApi 

    const [invoiceData, setInvoiceData] = useState('');
    const [invoiceItem, setInvoiceItem] = useState([]);

    const getApi = async () => {

        try {
            const apiUrl = `https://ocean21.in/api/public/api/pdfview_saleinvoice/${SpecId}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const responseData = response.data.data;
            setInvoiceData(responseData.involicedata || {});
            setInvoiceItem(Array.isArray(responseData.invoiceitem) ? responseData.invoiceitem : []);

        } catch (error) {
            console.error('Error fetching getApi data:', error);
        }

    }

    useEffect(() => {
        getApi();
    }, [])

    const amountString = invoiceData.overall_amount;
    const amountNumber = parseFloat(amountString);
    const [numberWords, setNumberWords] = useState(0)

    useEffect(() => {
        if (isNaN(amountNumber)) {
            console.error("Invalid number:", amountString);
        } else {
            const words = numberToWords.toWords(amountNumber.toFixed(0));
            console.log(words, "words");
            setNumberWords(words)
        }
    }, [amountNumber])


    const exportToPDF = async () => {

        const htmlContent = `
    <!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .container {
            width: 90%;
            margin: auto;
            padding-top: 90px; /* Space for header */
            padding-bottom: 30px;
            page-break-inside: always;
        }

        .header,
        .footer {
            text-align: center;
            font-weight: bold;
            position: fixed;
            left: 0;
        right: 0;
        background: #fff;
        z-index: 10;
        }

          .header {
                    top: 0;
        padding-bottom: 10px;

        }

        .footer {
         bottom: 0;
        padding-top: 10px;
        }

        .row {
            display: flex;
            margin: 0;
            padding: 0;
             page-break-inside: avoid;
        }

        .page-break {
            page-break-inside: always;
        }

        .c {
        display: flex;
        flex-direction: 'column';
        }

        .col {
            width: 50%;
            border: 1px solid #000;
            text-align: right;
            padding: 5px;
        }

        .col-1 {
            width: 20%;
            padding: 5px;
            border: 1px solid #000;
        }

        .col-2 {
            width: 50%;
            padding: 5px;
            border: 1px solid #000;
        }

        .col-3 {
            width: 30%;
            padding: 5px;
            border: 1px solid #000;
        }

        .col-4 {
            width: 25%;
            padding: 5px;
            border: 1px solid #000;
        }

        .col-5 {
            width: 75%;
            padding: 5px;
            border: 1px solid #000;
        }

        .one{
            width:50%;
            margin: 0;
            padding: 0;
        }

        .sno {
            width:20%;
            padding: 5px;
            border: 1px solid #000;
        }

        .Descriptional{
            width:50%;
            padding: 5px;
            border: 1px solid #000;
        }

        .Descriptionals{
            width:50%;
            padding: 5px;
            border: 1px solid #000;
            text-align: right;
        }

        .HSC {
            width:30%;
            padding: 5px;
            border: 1px solid #000;
        }

        .quantity{
            width:25%;
            padding: 5px;
            border: 1px solid #000;
        }

        .rate {
        width:25%;
        padding: 5px;
            border: 1px solid #000;
        }

        .per {
        width:25%;
        padding: 5px;
            border: 1px solid #000;
        }

        .Amount{
        width:25%;
        padding: 5px;
            border: 1px solid #000;
        }

        p {
        margin: 0;
        padding: 0;
    }

    .top {
        margin-top: 10px;
    }

    @page {
        margin: 20px 0;
    }

    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>INVOICE</h1>
        </div>

        <div class="row">
            <div class="col-2">
                <strong>${invoiceData.from_companyname}</strong><br />
                ${invoiceData.from_companyaddress}<br />
                GSTIN/UIN : ${invoiceData.from_companygstin_uin}<br />
                State Name : ${invoiceData.from_statename}
            </div>
            <div class="col-2">
                <strong>Invoice No.</strong><br />
                ${invoiceData.sales_invoice_number}<br/>
                <br/>
                  <strong>Dated</strong><br />
                ${invoiceData.date}
            </div>
         
        </div>

        <div class="row">
            <div class="col-2">
                <strong>Buyer (Bill to)</strong><br />
                <strong>${invoiceData.to_companyname}</strong><br />
                ${invoiceData.to_companyaddress}<br />
                GSTIN/UIN : ${invoiceData.to_companygstin_uin}<br />
                State Name : ${invoiceData.to_statename}
            </div>
            <div class="col-2">
                
            </div>
        </div>

        <div class="row">
            <div class="row one">
                <p class="sno">S.no</p>
                <p class="Descriptional">Description Of Goods</p>
                <p class="HSC">HSN/SAC</p>
            </div>
            <div class="row one">
                <p class="quantity">Quantity</p>
                <p class="rate">Rate</p>
                <p class="per">Per</p>
                <p class="Amount">Amount</p>
            </div>
        </div>

        ${invoiceItem.map((item, index) => `
        <div class="row page-break">
            <div class="row one">
                <p class="sno">${index + 1}.</p>
                <p class="Descriptional">${item.good_service_name}<br />
                ${item.description}<br /><p/>
                <p class="HSC">${item.hsn_sac}</p>
            </div>
            <div class="row one">
                <p class="quantity">${item.quantity}</p>
                <p class="rate">${item.rate}</p>
                <p class="per">${item.per}</p>
                <p class="Amount">${item.amount}</p>
            </div>
        </div>
        `).join('')}

        <div class="row">
            <div class="row one">
                <p class="sno"></p>
                <p class="Descriptionals">
                <strong>Output IGST ${invoiceData.igst_percentage}%<br /></strong>
                <strong>Output CGST ${invoiceData.cgst_percentage}%<br /></strong>
                <strong>Output SGST ${invoiceData.sgst_percentage}%</strong>
                <p/>
                <p class="HSC"></p>
            </div>
            <div class="row one">
                <p class="quantity"></p>
                <p class="rate"></p>
                <p class="per"></p>
                <p class="Amount"></p>
            </div>
        </div>

        <div class="row">
             <div class="col">
                <strong>Total</strong>
            </div>
            <div class="col">
                <strong>${invoiceData.overall_amount}</strong>
            </div>
        </div>

        <div class="row">
            <div class="col-5">
                <strong>Amount Chargeable (in words)</strong><br />
                ${numberWords}
            </div>
            <div class="col-5">
                <strong>Company’s Bank Details</strong><br />
                A/c Holder’s Name : ${invoiceData.from_accountholdername}<br />
                Bank Name : ${invoiceData.from_bank_name}<br />
                A/c No : ${invoiceData.from_account_number}<br />
                Branch & IFS Code : ${invoiceData.from_branch_name}, ${invoiceData.from_ifsccode}
            </div>
        </div>

        <div class="row">
            <div class="col-5">
                <strong>Declaration</strong><br />
                We declare that this invoice shows the actual price of the goods described and that all particulars are
                true and correct.
            </div>
            <div class="col-5">
                for ${invoiceData.to_companyname}<br />
                Authorised Signatory
            </div>
        </div>
        
        <div class="footer">
            <h3>This is Computer Generated Invoice</h3>
        </div>
    </div>
</body>

</html>
    `;

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


    return (

        <ScrollView>

            <View style={{ alignItems: 'center', marginVertical: '10%' }}>

                <View style={{ width: '95%', borderWidth: 1, borderColor: '#000' }}>

                    <View style={{ alignItems: 'center', paddingVertical: 5, borderBottomWidth: 1, borderColor: '#000' }}>
                        <Text style={{ fontWeight: '600', fontSize: 8 }}>INVOICE</Text>
                    </View>

                    <View style={{ paddingHorizontal: 5, borderBottomWidth: 1, borderColor: '#000', flexDirection: 'row' }}>
                        <View style={{ width: '50%', padding: 10, borderRightWidth: 1, borderColor: '#000' }}>
                            <Text style={{ fontWeight: '600', fontSize: 8, paddingBottom: 5 }}>
                                {invoiceData.from_companyname}
                            </Text>
                            <Text style={{ fontWeight: '400', fontSize: 8 }}>
                                {invoiceData.from_companyaddress}
                            </Text>
                            <Text style={{ fontWeight: '400', fontSize: 8 }}>
                                GSTIN/UIN : {invoiceData.from_companygstin_uin}
                            </Text>
                            <Text style={{ fontWeight: '400', fontSize: 8 }}>
                                State Name : {invoiceData.from_statename}
                            </Text>
                        </View>
                        <View style={{ width: '25%', padding: 10, borderRightWidth: 1, borderColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '600', fontSize: 8 }}>
                                Invoice No.
                            </Text>
                            <Text style={{ fontWeight: '400', fontSize: 8 }}>
                                {invoiceData.sales_invoice_number}
                            </Text>
                        </View>
                        <View style={{ width: '25%', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '600', fontSize: 8 }}>
                                Dated
                            </Text>
                            <Text style={{ fontWeight: '400', fontSize: 8 }}>
                                {invoiceData.date}
                            </Text>
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 5, borderBottomWidth: 1, borderColor: '#000', flexDirection: 'row' }}>
                        <View style={{ width: '50%', padding: 10, borderRightWidth: 1, borderColor: '#000' }}>
                            <Text style={{ fontWeight: '600', fontSize: 8 }}>Buyer (Bill to)</Text>
                            <Text style={{ fontWeight: '600', fontSize: 8, paddingBottom: 5 }}>{invoiceData.to_companyname}</Text>
                            <Text style={{ fontWeight: '400', fontSize: 8 }}>
                                {invoiceData.to_companyaddress}
                            </Text>
                            <Text style={{ fontWeight: '400', fontSize: 8 }}>
                                GSTIN/UIN : {invoiceData.to_companygstin_uin}
                            </Text>
                            <Text style={{ fontWeight: '400', fontSize: 8 }}>
                                State Name : {invoiceData.to_statename}
                            </Text>
                        </View>
                        <View style={{ width: '50%', }}>

                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000' }}>
                        <View style={{ width: '50%', borderRightWidth: 1, borderColor: '#000', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ width: '20%', fontSize: 8, padding: 5, borderRightWidth: 1, borderColor: '#000' }}>S.No</Text>
                            <Text style={{ width: '50%', fontSize: 8, padding: 5, borderRightWidth: 1, borderColor: '#000' }}>Description Of Goods</Text>
                            <Text style={{ width: '30%', fontSize: 8, padding: 5 }}>HSN/SAC</Text>
                        </View>
                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ width: '25%', fontSize: 8, padding: 5, borderRightWidth: 1, borderColor: '#000' }}>Quantity</Text>
                            <Text style={{ width: '25%', fontSize: 8, padding: 5, borderRightWidth: 1, borderColor: '#000' }}>Rate</Text>
                            <Text style={{ width: '25%', fontSize: 8, padding: 5, borderRightWidth: 1, borderColor: '#000' }}>Per</Text>
                            <Text style={{ width: '25%', fontSize: 8, padding: 5 }}>Amount</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column' }}>
                        {
                            invoiceItem.map((item, index) => (
                                <View key={item.id} style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '50%', borderRightWidth: 1, borderColor: '#000', flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: '20%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                            <Text style={{ fontSize: 8 }}>{index + 1}</Text>
                                        </View>
                                        <View style={{ width: '50%', padding: 5, borderRightWidth: 1, borderColor: '#000' }}>
                                            <Text style={{ fontSize: 8 }}>{item.good_service_name}</Text>
                                            <Text style={{ fontSize: 8 }}>{item.description}</Text>
                                        </View>
                                        <View style={{ width: '30%', padding: 5, height: '100%' }}>
                                            <Text style={{ fontSize: 8 }}>{item.hsn_sac}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                            <Text style={{ fontSize: 8 }}>{item.quantity}</Text>
                                        </View>
                                        <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                            <Text style={{ fontSize: 8 }}>{item.rate}</Text>
                                        </View>
                                        <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                            <Text style={{ fontSize: 8 }}>{item.per}</Text>
                                        </View>
                                        <View style={{ width: '25%', padding: 5, height: '100%' }}>
                                            <Text style={{ fontSize: 8 }}>{item.amount}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))
                        }

                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ width: '50%', borderRightWidth: 1, borderColor: '#000', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: '20%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '50%', padding: 5, borderRightWidth: 1, borderColor: '#000' }}>
                                <Text style={{ fontSize: 8, textAlign: 'right' }}>Output IGST {invoiceData.igst_percentage}%</Text>
                            </View>
                            <View style={{ width: '30%', padding: 5, height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                        </View>
                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '25%', padding: 5, height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ width: '50%', borderRightWidth: 1, borderColor: '#000', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: '20%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '50%', padding: 5, borderRightWidth: 1, borderColor: '#000' }}>
                                <Text style={{ fontSize: 8, textAlign: 'right' }}>Output CGST {invoiceData.cgst_percentage}%</Text>
                            </View>
                            <View style={{ width: '30%', padding: 5, height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                        </View>
                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '25%', padding: 5, height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#000' }}>
                        <View style={{ width: '50%', borderRightWidth: 1, borderColor: '#000', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: '20%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '50%', padding: 5, borderRightWidth: 1, borderColor: '#000' }}>
                                <Text style={{ fontSize: 8, textAlign: 'right' }}>Output SGST {invoiceData.sgst_percentage}%</Text>
                            </View>
                            <View style={{ width: '30%', padding: 5, height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                        </View>
                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '25%', padding: 5, height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 0.5, borderColor: '#000' }}>
                        <View style={{ width: '50%', borderRightWidth: 1, borderColor: '#000', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: '20%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '50%', padding: 5, borderRightWidth: 1, borderColor: '#000' }}>
                                <Text style={{ fontSize: 8, textAlign: 'right' }}>Total</Text>
                            </View>
                            <View style={{ width: '30%', padding: 5, height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                        </View>
                        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '25%', padding: 5, borderRightWidth: 1, borderColor: '#000', height: '100%' }}>
                                <Text style={{ fontSize: 8 }}></Text>
                            </View>
                            <View style={{ width: '25%', padding: 5, height: '100%' }}>
                                <Text style={{ fontSize: 8 }}>{invoiceData.overall_amount}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 5, borderBottomWidth: 1, borderColor: '#000', flexDirection: 'row' }}>
                        <View style={{ width: '50%', padding: 10, borderRightWidth: 1, borderColor: '#000' }}>
                            <Text style={{ fontWeight: '600', paddingBottom: 5, fontSize: 8 }}>Amount Chargeable (in words)</Text>
                            <Text style={{ fontWeight: '400', fontSize: 8 }}>
                                {numberWords}
                            </Text>
                        </View>
                        <View style={{ width: '50%', padding: 10 }}>
                            <Text style={{ fontWeight: '600', paddingBottom: 5, fontSize: 8 }}>
                                Company’s Bank Details
                            </Text>
                            <Text style={{ fontWeight: '600', fontSize: 8 }}>
                                A/c Holder’s Name : <Text style={{ fontWeight: '400', fontSize: 8 }}>{invoiceData.from_accountholdername}</Text>
                            </Text>
                            <Text style={{ fontWeight: '600', fontSize: 8 }}>
                                Bank Name : <Text style={{ fontWeight: '400', fontSize: 8 }}>{invoiceData.from_bank_name}</Text>
                            </Text>
                            <Text style={{ fontWeight: '600', fontSize: 8 }}>
                                A/c No : <Text style={{ fontWeight: '400', fontSize: 8 }}>{invoiceData.from_account_number}</Text>
                            </Text>
                            <Text style={{ fontWeight: '600', fontSize: 8 }}>
                                Branch & IFS Code  : <Text style={{ fontWeight: '400', fontSize: 8 }}>{invoiceData.from_branch_name},{invoiceData.from_ifsccode}</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 5, borderBottomWidth: 1, borderColor: '#000', flexDirection: 'row' }}>
                        <View style={{ width: '50%', padding: 10, borderRightWidth: 1, borderColor: '#000' }}>
                            <Text style={{ fontWeight: '600', paddingBottom: 5, fontSize: 8 }}>Declaration</Text>
                            <Text style={{ fontWeight: '400', fontSize: 8 }}>
                                We declare that this invoice shows the actual price of
                                the goods described and that all particulars are true
                                and correct.
                            </Text>
                        </View>
                        <View style={{ width: '50%', padding: 10, flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Text style={{ textAlign: 'right', fontSize: 8, fontWeight: '400' }}>for {invoiceData.to_companyname}</Text>
                            <Text style={{ textAlign: 'right', fontSize: 8, fontWeight: '400' }}>Authorised Signatory</Text>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', paddingVertical: 5 }}>
                        <Text style={{ fontWeight: '400', fontSize: 8 }}>This is Computer Generated Invoice</Text>
                    </View>
                </View>

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

export default SalesInvoiceView;