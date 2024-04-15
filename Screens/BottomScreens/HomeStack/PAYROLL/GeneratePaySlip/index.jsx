import React, { useEffect, useState } from "react";
import styles from "./style";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View, TextInput, ActivityIndicator, Alert } from "react-native";
import EditIcon from "../../../../../assets/EPK CRM Icons/Edit.svg";
import { useSelector } from "react-redux";
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import { Grey, PrimaryBlue, PrimaryGreen, White } from "../../../../../assets/Colors";

const PayRollGenerate = ({ navigation }) => {

    // data from redux-store

    const { data } = useSelector((state) => state.login);

    //  States

    const [person, setPerson] = useState('');
    const [late, setLate] = useState('');
    const [absent, setAbsent] = useState('');
    const [permission, setPermission] = useState('');
    const [halfDays, setHalfDays] = useState('');
    const [totalWorkingDays, setTotalWorkingDays] = useState('');
    const [workedDays, setWorkedDays] = useState('');
    const [lossofPay, setLossofPay] = useState('');
    const [emppf, setEmppf] = useState('');
    const [salary, setSalary] = useState('');
    const [perDaySalary, setPerDaySalary] = useState('');
    const [basicDA, setBasicDA] = useState('');
    const [basicDAPercent, setBasicDAPercent] = useState('');
    const [hra, setHra] = useState('');
    const [hraPercent, setHraPercent] = useState('');
    const [convenience, setConvenience] = useState('');
    const [transport, setTransport] = useState('');
    const [specialAllowance, setSpecialAllowance] = useState('');
    const [specialAllowancePercent, setSpecialAllowancePercent] = useState('');
    const [netPay, setNetPay] = useState('');
    const [errors, setErrors] = useState({});
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);

    // Api call for setConditionDisplay

    const [conditionDisplay, setConditionDisplay] = useState('')

    const fetchData = async () => {
        try {
            const response = await axios.get('https://officeinteriorschennai.com/api/public/api/edit_payslip_generator_role', {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            setConditionDisplay(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])


    // validation

    const validateInput = (input, fieldName, errorMessage) => {
        if (!input.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage }));
            return false;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
        return true;
    };

    // API call for setDatas

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.get('https://officeinteriorschennai.com/api/public/api/employeelist', {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                setDatas([{ id: "0", first_name: "Select", last_name: "Employee" }, ...response.data.data]);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    // datas Mapping

    const NameArray = datas.map(employee => ({
        id: employee.id,
        name: `${employee.first_name} ${employee.last_name}`,
    }));

    // Handler

    const Handlesetperson = (itemValue) => {
        setPerson(itemValue)
    }

    const handleMonthChange = (month) => {
        setSelectedMonth(month);
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    // generate months

    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const yearRange = 2;

    const months = [
        { label: 'Select Month', value: 0 },
        { label: 'January', value: '01' },
        { label: 'February', value: '02' },
        { label: 'March', value: '03' },
        { label: 'April', value: '04' },
        { label: 'May', value: '05' },
        { label: 'June', value: '06' },
        { label: 'July', value: '07' },
        { label: 'August', value: '08' },
        { label: 'September', value: '09' },
        { label: 'October', value: 10 },
        { label: 'November', value: 11 },
        { label: 'December', value: 12 }
    ];

    // generateYears

    const generateYears = (range) => {
        const currentYear = new Date().getFullYear();
        const years = [{ label: "Select Year", value: 0 }];
        for (let i = currentYear - range; i <= currentYear + range; i++) {
            years.push({ label: `${i}`, value: i });
        }
        return years;
    };

    // 

    const [refreshing, setRefreshing] = useState(false);

    const HandleRefresh = () => {
        setPerson(null);
        setErrors({});
        setLate('');
        setSelectedMonth(0);
        setSelectedYear(0)
        setPermission('');
        setAbsent('');
        setHalfDays('');
        setTotalWorkingDays('');
        setWorkedDays('');
        setLossofPay('');
        setEmppf('');
        setSalary('');
        setPerDaySalary('');
        setBasicDA('');
        setBasicDAPercent('');
        setHra('');
        setHraPercent('');
        setConvenience('');
        setTransport('');
        setSpecialAllowance('');
        setSpecialAllowancePercent('');
        setNetPay('');
        setErrors({});
    };

    // Api call for person && selectedMonth && selectedYear

    useEffect(() => {
        if (person && selectedMonth && selectedYear) {
            setLoading(true);
            const fetchData = async () => {
                try {
                    const res = await axios.get(`https://officeinteriorschennai.com/api/public/api/select_employee_payslip_monthyear/${person}/${selectedYear}-${selectedMonth}`, {
                        headers: {
                            Authorization: `Bearer ${data.token}`
                        }
                    });
                    if (res.status === 200) {
                        let values = res.data;
                        setLate(values.latecount !== undefined ? values.latecount.toString() : '');
                        setAbsent(values.absentcount !== undefined ? values.absentcount.toString() : '');
                        setPermission(values.permissioncount !== undefined ? values.permissioncount.toString() : '');
                        setHalfDays(values.halfdaycount !== undefined ? values.halfdaycount.toString() : '')
                        setTotalWorkingDays(values.totalmonthlyworkingdays !== undefined ? values.totalmonthlyworkingdays.toString() : '');
                        setWorkedDays(values.totalworkeddays !== undefined ? values.totalworkeddays.toString() : '');
                        setLossofPay(values.totallopdays !== undefined ? values.totallopdays.toString() : '');
                        setSalary(values.empsalary !== undefined ? values.empsalary.toString() : '');
                        setEmppf(values.emppf !== undefined ? values.emppf.toString() : '')
                        setPerDaySalary(values.empsalaryperday !== undefined ? values.empsalaryperday.toString() : '');
                        setBasicDA(values.basicdaamount !== undefined ? values.basicdaamount.toString() : '');
                        setBasicDAPercent(values.basicdapercentage !== undefined ? values.basicdapercentage.toString() : '');
                        setHra(values.hraamount !== undefined ? values.hraamount.toString() : '');
                        setHraPercent(values.hrapercentage !== undefined ? values.hrapercentage.toString() : '');
                        setConvenience(values.conveyanceAllowance !== undefined ? values.conveyanceAllowance.toString() : '');
                        setTransport(values.transportAllowance !== undefined ? values.transportAllowance.toString() : '');
                        setSpecialAllowance(values.otherAllowancesamount !== undefined ? values.otherAllowancesamount.toString() : '');
                        setSpecialAllowancePercent(values.otherAllowancespercentage !== undefined ? values.otherAllowancespercentage.toString() : '');
                        setNetPay(values.totalnetpayamount !== undefined ? values.totalnetpayamount.toString() : '');
                        setLoading(false);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [person, selectedMonth, selectedYear]);


    //  LOP

    const [lopEdit, setLopEdit] = useState(false);

    const toggleLopEdit = () => {
        setLopEdit(!lopEdit);
    };

    const HandleLopSave = async () => {
        setLopEdit(!lopEdit);
        try {
            const value = {
                payslipemployeeempid: person,
                payslipemployeedate: `${selectedYear}-${selectedMonth}`,
                payslipemployeelop: lossofPay,
                payslipemployeebasicdapercentage: basicDAPercent,
                payslipemployeehrapercentage: hraPercent,
                payslipemployeeconveyanceamount: convenience,
                payslipemployeetransportamount: transport,
                payslipemployeepfamount: emppf
            };

            const res = await axios.post('https://officeinteriorschennai.com/api/public/api/edit_payslip_onchangeoption', value, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            if (res.status === 200) {
                let values = res.data;
                setLate(values.latecount !== undefined ? values.latecount.toString() : '');
                setAbsent(values.absentcount !== undefined ? values.absentcount.toString() : '');
                setPermission(values.permissioncount !== undefined ? values.permissioncount.toString() : '');
                setHalfDays(values.halfdaycount !== undefined ? values.halfdaycount.toString() : '')
                setTotalWorkingDays(values.totalmonthlyworkingdays !== undefined ? values.totalmonthlyworkingdays.toString() : '');
                setWorkedDays(values.totalworkeddays !== undefined ? values.totalworkeddays.toString() : '');
                setLossofPay(values.totallopdays !== undefined ? values.totallopdays.toString() : '');
                setSalary(values.empsalary !== undefined ? values.empsalary.toString() : '');
                setEmppf(values.emppf !== undefined ? values.emppf.toString() : '')
                setPerDaySalary(values.empsalaryperday !== undefined ? values.empsalaryperday.toString() : '');
                setBasicDA(values.basicdaamount !== undefined ? values.basicdaamount.toString() : '');
                setBasicDAPercent(values.basicdapercentage !== undefined ? values.basicdapercentage.toString() : '');
                setHra(values.hraamount !== undefined ? values.hraamount.toString() : '');
                setHraPercent(values.hrapercentage !== undefined ? values.hrapercentage.toString() : '');
                setConvenience(values.conveyanceAllowance !== undefined ? values.conveyanceAllowance.toString() : '');
                setTransport(values.transportAllowance !== undefined ? values.transportAllowance.toString() : '');
                setSpecialAllowance(values.otherAllowancesamount !== undefined ? values.otherAllowancesamount.toString() : '');
                setSpecialAllowancePercent(values.otherAllowancespercentage !== undefined ? values.otherAllowancespercentage.toString() : '');
                setNetPay(values.totalnetpayamount !== undefined ? values.totalnetpayamount.toString() : '');
            }
        } catch (error) {
            console.log(error);
        }
    };


    // Basic + DA

    const [basicDaPercentEdit, setBasicDAPercentEdit] = useState(false);

    const togglebasicDaPercentEdit = () => {
        setBasicDAPercentEdit(!basicDaPercentEdit);
    };

    const HandlebasicDaSave = async () => {
        setBasicDAPercentEdit(!basicDaPercentEdit);
        try {

            const value = {
                payslipemployeeempid: person,
                payslipemployeedate: `${selectedYear}-${selectedMonth}`,
                payslipemployeelop: lossofPay,
                payslipemployeebasicdapercentage: basicDAPercent,
                payslipemployeehrapercentage: hraPercent,
                payslipemployeeconveyanceamount: convenience,
                payslipemployeetransportamount: transport,
                payslipemployeepfamount: emppf
            };

            const res = await axios.post('https://officeinteriorschennai.com/api/public/api/edit_payslip_onchangeoption', value, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            if (res.status === 200) {
                let values = res.data;
                setLate(values.latecount !== undefined ? values.latecount.toString() : '');
                setAbsent(values.absentcount !== undefined ? values.absentcount.toString() : '');
                setHalfDays(values.halfdaycount !== undefined ? values.halfdaycount.toString() : '')
                setPermission(values.permissioncount !== undefined ? values.permissioncount.toString() : '');
                setTotalWorkingDays(values.totalmonthlyworkingdays !== undefined ? values.totalmonthlyworkingdays.toString() : '');
                setWorkedDays(values.totalworkeddays !== undefined ? values.totalworkeddays.toString() : '');
                setLossofPay(values.totallopdays !== undefined ? values.totallopdays.toString() : '');
                setSalary(values.empsalary !== undefined ? values.empsalary.toString() : '');
                setEmppf(values.emppf !== undefined ? values.emppf.toString() : '')
                setPerDaySalary(values.empsalaryperday !== undefined ? values.empsalaryperday.toString() : '');
                setBasicDA(values.basicdaamount !== undefined ? values.basicdaamount.toString() : '');
                setBasicDAPercent(values.basicdapercentage !== undefined ? values.basicdapercentage.toString() : '');
                setHra(values.hraamount !== undefined ? values.hraamount.toString() : '');
                setHraPercent(values.hrapercentage !== undefined ? values.hrapercentage.toString() : '');
                setConvenience(values.conveyanceAllowance !== undefined ? values.conveyanceAllowance.toString() : '');
                setTransport(values.transportAllowance !== undefined ? values.transportAllowance.toString() : '');
                setSpecialAllowance(values.otherAllowancesamount !== undefined ? values.otherAllowancesamount.toString() : '');
                setSpecialAllowancePercent(values.otherAllowancespercentage !== undefined ? values.otherAllowancespercentage.toString() : '');
                setNetPay(values.totalnetpayamount !== undefined ? values.totalnetpayamount.toString() : '');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // HRA

    const [hraEdit, setHraEdit] = useState(false);

    const togglehraEdit = () => {
        setHraEdit(!hraEdit);
    };

    const HandlehraSave = async () => {

        setHraEdit(!hraEdit);

        try {
            const value = {
                payslipemployeeempid: person,
                payslipemployeedate: `${selectedYear}-${selectedMonth}`,
                payslipemployeelop: lossofPay,
                payslipemployeebasicdapercentage: basicDAPercent,
                payslipemployeehrapercentage: hraPercent,
                payslipemployeeconveyanceamount: convenience,
                payslipemployeetransportamount: transport,
                payslipemployeepfamount: emppf
            };
            const res = await axios.post('https://officeinteriorschennai.com/api/public/api/edit_payslip_onchangeoption', value, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            if (res.status === 200) {
                let values = res.data;
                setLate(values.latecount !== undefined ? values.latecount.toString() : '');
                setAbsent(values.absentcount !== undefined ? values.absentcount.toString() : '');
                setHalfDays(values.halfdaycount !== undefined ? values.halfdaycount.toString() : '')
                setPermission(values.permissioncount !== undefined ? values.permissioncount.toString() : '');
                setTotalWorkingDays(values.totalmonthlyworkingdays !== undefined ? values.totalmonthlyworkingdays.toString() : '');
                setWorkedDays(values.totalworkeddays !== undefined ? values.totalworkeddays.toString() : '');
                setLossofPay(values.totallopdays !== undefined ? values.totallopdays.toString() : '');
                setSalary(values.empsalary !== undefined ? values.empsalary.toString() : '');
                setEmppf(values.emppf !== undefined ? values.emppf.toString() : '')
                setPerDaySalary(values.empsalaryperday !== undefined ? values.empsalaryperday.toString() : '');
                setBasicDA(values.basicdaamount !== undefined ? values.basicdaamount.toString() : '');
                setBasicDAPercent(values.basicdapercentage !== undefined ? values.basicdapercentage.toString() : '');
                setHra(values.hraamount !== undefined ? values.hraamount.toString() : '');
                setHraPercent(values.hrapercentage !== undefined ? values.hrapercentage.toString() : '');
                setConvenience(values.conveyanceAllowance !== undefined ? values.conveyanceAllowance.toString() : '');
                setTransport(values.transportAllowance !== undefined ? values.transportAllowance.toString() : '');
                setSpecialAllowance(values.otherAllowancesamount !== undefined ? values.otherAllowancesamount.toString() : '');
                setSpecialAllowancePercent(values.otherAllowancespercentage !== undefined ? values.otherAllowancespercentage.toString() : '');
                setNetPay(values.totalnetpayamount !== undefined ? values.totalnetpayamount.toString() : '');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Convenience Amount

    const [convenienceEdit, setConvenienceEdit] = useState(false);

    const toggleconvenienceEdit = () => {
        setConvenienceEdit(!convenienceEdit);
    };

    const HandleconvenienceSave = async () => {

        setConvenienceEdit(!convenienceEdit);

        try {

            const value = {
                payslipemployeeempid: person,
                payslipemployeedate: `${selectedYear}-${selectedMonth}`,
                payslipemployeelop: lossofPay,
                payslipemployeebasicdapercentage: basicDAPercent,
                payslipemployeehrapercentage: hraPercent,
                payslipemployeeconveyanceamount: convenience,
                payslipemployeetransportamount: transport,
                payslipemployeepfamount: emppf
            };

            const res = await axios.post('https://officeinteriorschennai.com/api/public/api/edit_payslip_onchangeoption', value, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            if (res.status === 200) {
                let values = res.data;
                setLate(values.latecount !== undefined ? values.latecount.toString() : '');
                setAbsent(values.absentcount !== undefined ? values.absentcount.toString() : '');
                setHalfDays(values.halfdaycount !== undefined ? values.halfdaycount.toString() : '')
                setPermission(values.permissioncount !== undefined ? values.permissioncount.toString() : '');
                setTotalWorkingDays(values.totalmonthlyworkingdays !== undefined ? values.totalmonthlyworkingdays.toString() : '');
                setWorkedDays(values.totalworkeddays !== undefined ? values.totalworkeddays.toString() : '');
                setLossofPay(values.totallopdays !== undefined ? values.totallopdays.toString() : '');
                setSalary(values.empsalary !== undefined ? values.empsalary.toString() : '');
                setEmppf(values.emppf !== undefined ? values.emppf.toString() : '')
                setPerDaySalary(values.empsalaryperday !== undefined ? values.empsalaryperday.toString() : '');
                setBasicDA(values.basicdaamount !== undefined ? values.basicdaamount.toString() : '');
                setBasicDAPercent(values.basicdapercentage !== undefined ? values.basicdapercentage.toString() : '');
                setHra(values.hraamount !== undefined ? values.hraamount.toString() : '');
                setHraPercent(values.hrapercentage !== undefined ? values.hrapercentage.toString() : '');
                setConvenience(values.conveyanceAllowance !== undefined ? values.conveyanceAllowance.toString() : '');
                setTransport(values.transportAllowance !== undefined ? values.transportAllowance.toString() : '');
                setSpecialAllowance(values.otherAllowancesamount !== undefined ? values.otherAllowancesamount.toString() : '');
                setSpecialAllowancePercent(values.otherAllowancespercentage !== undefined ? values.otherAllowancespercentage.toString() : '');
                setNetPay(values.totalnetpayamount !== undefined ? values.totalnetpayamount.toString() : '');
            }
        } catch (error) {
            console.log(error);
        }
    };


    // Transport Amount

    const [transportEdit, setTransportEdit] = useState(false);

    const toggletransportEdit = () => {
        setTransportEdit(!transportEdit);
    };

    const HandletransportSave = async () => {

        setTransportEdit(!transportEdit);

        try {

            const value = {
                payslipemployeeempid: person,
                payslipemployeedate: `${selectedYear}-${selectedMonth}`,
                payslipemployeelop: lossofPay,
                payslipemployeebasicdapercentage: basicDAPercent,
                payslipemployeehrapercentage: hraPercent,
                payslipemployeeconveyanceamount: convenience,
                payslipemployeetransportamount: transport,
                payslipemployeepfamount: emppf
            };

            const res = await axios.post('https://officeinteriorschennai.com/api/public/api/edit_payslip_onchangeoption', value, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            if (res.status === 200) {
                let values = res.data;
                setLate(values.latecount !== undefined ? values.latecount.toString() : '');
                setAbsent(values.absentcount !== undefined ? values.absentcount.toString() : '');
                setHalfDays(values.halfdaycount !== undefined ? values.halfdaycount.toString() : '')
                setPermission(values.permissioncount !== undefined ? values.permissioncount.toString() : '');
                setTotalWorkingDays(values.totalmonthlyworkingdays !== undefined ? values.totalmonthlyworkingdays.toString() : '');
                setWorkedDays(values.totalworkeddays !== undefined ? values.totalworkeddays.toString() : '');
                setLossofPay(values.totallopdays !== undefined ? values.totallopdays.toString() : '');
                setSalary(values.empsalary !== undefined ? values.empsalary.toString() : '');
                setEmppf(values.emppf !== undefined ? values.emppf.toString() : '')
                setPerDaySalary(values.empsalaryperday !== undefined ? values.empsalaryperday.toString() : '');
                setBasicDA(values.basicdaamount !== undefined ? values.basicdaamount.toString() : '');
                setBasicDAPercent(values.basicdapercentage !== undefined ? values.basicdapercentage.toString() : '');
                setHra(values.hraamount !== undefined ? values.hraamount.toString() : '');
                setHraPercent(values.hrapercentage !== undefined ? values.hrapercentage.toString() : '');
                setConvenience(values.conveyanceAllowance !== undefined ? values.conveyanceAllowance.toString() : '');
                setTransport(values.transportAllowance !== undefined ? values.transportAllowance.toString() : '');
                setSpecialAllowance(values.otherAllowancesamount !== undefined ? values.otherAllowancesamount.toString() : '');
                setSpecialAllowancePercent(values.otherAllowancespercentage !== undefined ? values.otherAllowancespercentage.toString() : '');
                setNetPay(values.totalnetpayamount !== undefined ? values.totalnetpayamount.toString() : '');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Employee PF Edit

    const [employeepfEdit, setEmployeepfEdit] = useState(false);

    const toggleemployeepfEdit = () => {
        setEmployeepfEdit(!employeepfEdit);
    };

    const HandleemployeepfSave = async () => {

        setEmployeepfEdit(!employeepfEdit);

        try {
            const value = {
                payslipemployeeempid: person,
                payslipemployeedate: `${selectedYear}-${selectedMonth}`,
                payslipemployeelop: lossofPay,
                payslipemployeebasicdapercentage: basicDAPercent,
                payslipemployeehrapercentage: hraPercent,
                payslipemployeeconveyanceamount: convenience,
                payslipemployeetransportamount: transport,
                payslipemployeepfamount: emppf
            };

            const res = await axios.post('https://officeinteriorschennai.com/api/public/api/edit_payslip_onchangeoption', value, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            if (res.status === 200) {
                let values = res.data;
                setLate(values.latecount !== undefined ? values.latecount.toString() : '');
                setAbsent(values.absentcount !== undefined ? values.absentcount.toString() : '');
                setHalfDays(values.halfdaycount !== undefined ? values.halfdaycount.toString() : '')
                setPermission(values.permissioncount !== undefined ? values.permissioncount.toString() : '');
                setTotalWorkingDays(values.totalmonthlyworkingdays !== undefined ? values.totalmonthlyworkingdays.toString() : '');
                setWorkedDays(values.totalworkeddays !== undefined ? values.totalworkeddays.toString() : '');
                setLossofPay(values.totallopdays !== undefined ? values.totallopdays.toString() : '');
                setSalary(values.empsalary !== undefined ? values.empsalary.toString() : '');
                setEmppf(values.emppf !== undefined ? values.emppf.toString() : '')
                setPerDaySalary(values.empsalaryperday !== undefined ? values.empsalaryperday.toString() : '');
                setBasicDA(values.basicdaamount !== undefined ? values.basicdaamount.toString() : '');
                setBasicDAPercent(values.basicdapercentage !== undefined ? values.basicdapercentage.toString() : '');
                setHra(values.hraamount !== undefined ? values.hraamount.toString() : '');
                setHraPercent(values.hrapercentage !== undefined ? values.hrapercentage.toString() : '');
                setConvenience(values.conveyanceAllowance !== undefined ? values.conveyanceAllowance.toString() : '');
                setTransport(values.transportAllowance !== undefined ? values.transportAllowance.toString() : '');
                setSpecialAllowance(values.otherAllowancesamount !== undefined ? values.otherAllowancesamount.toString() : '');
                setSpecialAllowancePercent(values.otherAllowancespercentage !== undefined ? values.otherAllowancespercentage.toString() : '');
                setNetPay(values.totalnetpayamount !== undefined ? values.totalnetpayamount.toString() : '');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // 

    const handleSubmit = async () => {

        setLoad(true)

        const isValidLate = validateInput(late, 'late', 'This value is required');
        const isValidAbsent = validateInput(absent, 'absent', 'This value is required');
        const isValidTotalWorkingDays = validateInput(totalWorkingDays, 'totalWorkingDays', 'This value is required');
        const isValidWorkedDays = validateInput(workedDays, 'workedDays', 'This value is required');
        const isValidHalfDay = validateInput(halfDays, 'halfDays', 'This value is required');
        const isValidlossofPay = validateInput(lossofPay, 'lossofPay', 'This value is required');
        const isvalidPermission = validateInput(permission, 'permission', 'This value is required');
        const isValidBasicDAPercent = validateInput(basicDAPercent, 'basicDAPercent', 'This value is required');
        const isValidHRAPercent = validateInput(hraPercent, 'hraPercent', 'This value is required');
        const isValidConvenience = validateInput(convenience, 'convenience', 'This value is required');
        const isValidTransport = validateInput(transport, 'transport', 'This value is required');
        // const leave = 3;

        if (person != '' && selectedMonth != '' && selectedYear != '' && isValidlossofPay && isValidBasicDAPercent
            && isValidHRAPercent && isValidConvenience && isValidTransport && isValidLate && isValidHalfDay &&
            isValidAbsent && isvalidPermission && isValidTotalWorkingDays && isValidWorkedDays != false) {

            const formData = new FormData();


            formData.append('emppf', emppf);
            formData.append('addpayslipempid', person);
            formData.append('updateloginhrid', data.userempid);
            formData.append('addpayslipdate', `${selectedYear}-${selectedMonth}`);
            formData.append('addpayslipemplop', lossofPay);
            formData.append('addpayslipbasicdapercentage', basicDAPercent);
            formData.append('addpayslippercentage', hraPercent);
            formData.append('addpayslipconveyanceamount', convenience);
            formData.append('addpaysliptransportamount', transport);
            formData.append('late_count', late);
            // formData.append('leave_count', leave);
            formData.append('halfday_count', halfDays);
            formData.append('absent_count', absent);
            formData.append('permission_count', permission);
            formData.append('present_count', workedDays);
            formData.append('total_days_in_month', totalWorkingDays);

            try {
                const response = await fetch('https://officeinteriorschennai.com/api/public/api/insertpayslip', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${data.token}`
                    },
                    body: formData,
                });

                const responsedata = await response.json();
                console.log(responsedata, "responsedata")

                if (responsedata.status == 'success') {
                    setLoad(false)

                    // handleShowAlert();
                    setPerson(null);
                    setErrors({});
                    setLate('');
                    setSelectedMonth(0);
                    setSelectedYear(0)
                    setPermission('');
                    setAbsent('');
                    setHalfDays('');
                    setTotalWorkingDays('');
                    setWorkedDays('');
                    setLossofPay('');
                    setEmppf('');
                    setSalary('');
                    setPerDaySalary('');
                    setBasicDA('');
                    setBasicDAPercent('');
                    setHra('');
                    setHraPercent('');
                    setConvenience('');
                    setTransport('');
                    setSpecialAllowance('');
                    setSpecialAllowancePercent('');
                    setNetPay('');
                    setErrors({});
                }
                else {
                    // handleShowAlert1()
                    setLoad(false)
                    Alert.alert("Failed to Generate Pay Slip");
                }
            } catch (error) {
                console.log('reason', error)
                setLoad(false)
                Alert.alert("Failed to Generate Pay Slip");
                // handleShowAlert1();
            }
        }
        else {
            // handleShowAlert2();
            Alert.alert("Please fill all the details");
            setLoad(false)
            console.log("error1")
        }
    }


    return (

        <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={HandleRefresh} />}>

            <View style={[styles.input, { paddingLeft: 0 }]}>
                <Picker
                    selectedValue={person}
                    onValueChange={(itemValue) => {
                        Handlesetperson(itemValue);
                    }}>
                    {NameArray.map((option, index) => (
                        <Picker.Item key={index} label={option.name} value={option.id} color={Grey} />
                    ))}

                </Picker>
            </View>
            {errors.person && <Text style={styles.errorText}>{errors.person}</Text>}

            <View style={[styles.input, { paddingLeft: 0 }]}>
                <Picker
                    selectedValue={selectedMonth}
                    style={styles.picker}
                    onValueChange={handleMonthChange}>
                    {months.map((month, index) => (
                        <Picker.Item key={index} label={month.label} value={month.value} color={Grey} />
                    ))}
                </Picker>
            </View>


            <View style={[styles.input, { paddingLeft: 0 }]}>
                <Picker
                    selectedValue={selectedYear}
                    style={styles.picker}
                    onValueChange={handleYearChange}>
                    {generateYears(yearRange).map((year, index) => (
                        <Picker.Item key={index} label={year.label} value={year.value} color={Grey} />
                    ))}
                </Picker>
            </View>

            <TextInput
                placeholder="No of Late"
                value={late}
                onChangeText={(text) => setLate(text)}
                style={styles.input}
                keyboardType="numeric"
                editable={false}
            />
            {errors.late ? <Text style={styles.errorText}>{errors.late}</Text> : null}

            <TextInput
                placeholder="No of Absent"
                value={absent}
                onChangeText={(text) => setAbsent(text)}
                style={styles.input}
                keyboardType="numeric"
                editable={false}
            />
            {errors.absent ? <Text style={styles.errorText}>{errors.absent}</Text> : null}


            <TextInput
                placeholder="No of Permission"
                value={permission}
                onChangeText={(text) => setPermission(text)}
                style={styles.input}
                keyboardType="numeric"
                editable={false}
            />
            {errors.permission ? <Text style={styles.errorText}>{errors.permission}</Text> : null}


            <TextInput
                placeholder="No of Half Days"
                value={halfDays}
                onChangeText={(text) => setHalfDays(text)}
                style={styles.input}
                keyboardType="numeric"
                editable={false}
            />
            {errors.halfDays ? <Text style={styles.errorText}>{errors.halfDays}</Text> : null}

            <TextInput
                placeholder="Total Working Days in Month"
                value={totalWorkingDays}
                onChangeText={(text) => setTotalWorkingDays(text)}
                style={styles.input}
                keyboardType="numeric"
                editable={false}
            />
            {errors.totalWorkingDays ? <Text style={styles.errorText}>{errors.totalWorkingDays}</Text> : null}

            <TextInput
                placeholder="No of Days Worked"
                value={workedDays}
                onChangeText={(text) => setWorkedDays(text)}
                style={styles.input}
                keyboardType="numeric"
                editable={false}
            />
            {errors.workedDays ? <Text style={styles.errorText}>{errors.workedDays}</Text> : null}

            <View style={styles.editable}>

                <TextInput
                    placeholder="Loss of Pay"
                    value={lossofPay}
                    onChangeText={(text) => setLossofPay(text)}
                    style={[styles.input, { width: conditionDisplay.includes(data.userrole) ? '90%' : '100%' }]}
                    keyboardType="numeric"
                    editable={lopEdit}
                />

                {conditionDisplay.includes(data.userrole) ?
                    !lopEdit ? (
                        <TouchableOpacity onPress={toggleLopEdit} style={styles.iconContainer}>
                            <View style={{ marginTop: 10 }}><EditIcon width={20} height={20} color={PrimaryBlue} /></View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={HandleLopSave} style={styles.iconContainer}>
                            <View style={{ backgroundColor: PrimaryGreen, padding: 10, marginTop: 15, borderRadius: 10, marginLeft: 3 }}><EditIcon width={20} height={20} color={White} /></View>
                        </TouchableOpacity>
                    )
                    : null}

            </View>
            {errors.lossofPay ? <Text style={styles.errorText}>{errors.lossofPay}</Text> : null}


            <View style={styles.editable}>

                <TextInput
                    placeholder="Employee PF"
                    value={emppf}
                    onChangeText={(text) => setEmppf(text)}
                    style={[styles.input, { width: conditionDisplay.includes(data.userrole) ? '90%' : '100%' }]}
                    keyboardType="numeric"
                    editable={employeepfEdit}
                />

                {conditionDisplay.includes(data.userrole) ?
                    !employeepfEdit ? (
                        <TouchableOpacity onPress={toggleemployeepfEdit} style={styles.iconContainer}>
                            <View style={{ marginTop: 10 }}><EditIcon width={20} height={20} color={PrimaryBlue} /></View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={HandleemployeepfSave} style={styles.iconContainer}>
                            <View style={{ backgroundColor: PrimaryGreen, padding: 10, marginTop: 15, borderRadius: 10, marginLeft: 3 }}><EditIcon width={20} height={20} color={White} /></View>
                        </TouchableOpacity>
                    )
                    : null}

            </View>

            {errors.emppf ? <Text style={styles.errorText}>{errors.emppf}</Text> : null}


            <TextInput
                placeholder="Salary"
                value={salary}
                onChangeText={(text) => setSalary(text)}
                style={styles.input}
                keyboardType="numeric"
                editable={false}
            />

            {errors.salary ? <Text style={styles.errorText}>{errors.salary}</Text> : null}

            <TextInput
                placeholder="Per Day Salary"
                value={perDaySalary !== undefined && !isNaN(perDaySalary) ? Number(perDaySalary).toFixed(1) : ''}
                onChangeText={(text) => setPerDaySalary(text)}
                style={styles.input}
                keyboardType="numeric"
                editable={false}
            />
            {errors.perDaySalary ? <Text style={styles.errorText}>{errors.perDaySalary}</Text> : null}



            <View style={styles.editable}>
                <TextInput
                    placeholder="Basic DA Percentage"
                    value={basicDAPercent}
                    onChangeText={(text) => setBasicDAPercent(text)}
                    style={[styles.input, { width: conditionDisplay.includes(data.userrole) ? '90%' : '100%' }]}
                    keyboardType="numeric"
                    editable={basicDaPercentEdit}
                />

                {conditionDisplay.includes(data.userrole) ?
                    !basicDaPercentEdit ? (
                        <TouchableOpacity onPress={togglebasicDaPercentEdit} style={styles.iconContainer}>
                            <View style={{ marginTop: 10 }}><EditIcon width={20} height={20} color={PrimaryBlue} /></View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={HandlebasicDaSave} style={styles.iconContainer}>
                            <View style={{ backgroundColor: PrimaryGreen, padding: 10, marginTop: 15, borderRadius: 10, marginLeft: 3 }}><EditIcon width={20} height={20} color={White} /></View>
                        </TouchableOpacity>
                    ) : null}

            </View>
            {errors.basicDAPercent ? <Text style={styles.errorText}>{errors.basicDAPercent}</Text> : null}


            <TextInput
                placeholder="Basic DA"
                value={basicDA !== undefined && !isNaN(basicDA) ? Number(basicDA).toFixed(0) : ''}
                onChangeText={(text) => setBasicDA(text)}
                style={styles.input}
                keyboardType="numeric"
                editable={false}
            />
            {errors.basicDA ? <Text style={styles.errorText}>{errors.basicDA}</Text> : null}


            <View style={styles.editable}>

                <TextInput
                    placeholder="HRA Percentage"
                    value={hraPercent}
                    onChangeText={(text) => setHraPercent(text)}
                    style={[styles.input, { width: conditionDisplay.includes(data.userrole) ? '90%' : '100%' }]}
                    keyboardType="numeric"
                    editable={hraEdit}
                />

                {conditionDisplay.includes(data.userrole) ?
                    !hraEdit ? (
                        <TouchableOpacity onPress={togglehraEdit} style={styles.iconContainer}>
                            <View style={{ marginTop: 10 }}><EditIcon width={20} height={20} color={PrimaryBlue} /></View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={HandlehraSave} style={styles.iconContainer}>
                            <View style={{ backgroundColor: PrimaryGreen, padding: 10, marginTop: 15, borderRadius: 10, marginLeft: 3 }}><EditIcon width={20} height={20} color={White} /></View>
                        </TouchableOpacity>
                    ) : null}

            </View>
            {errors.hraPercent ? <Text style={styles.errorText}>{errors.hraPercent}</Text> : null}


            <TextInput
                placeholder="HRA"
                value={hra !== undefined && !isNaN(hra) ? Number(hra).toFixed(0) : ''}
                onChangeText={(text) => setHra(text)}
                style={styles.input}
                keyboardType="numeric"
                editable={false}
            />
            {errors.hra ? <Text style={styles.errorText}>{errors.hra}</Text> : null}


            <View style={styles.editable}>

                <TextInput
                    placeholder="Conveyance"
                    value={convenience}
                    onChangeText={(text) => setConvenience(text)}
                    style={[styles.input, { width: conditionDisplay.includes(data.userrole) ? '90%' : '100%' }]}
                    keyboardType="numeric"
                    editable={convenienceEdit}
                />

                {conditionDisplay.includes(data.userrole) ?
                    !convenienceEdit ? (
                        <TouchableOpacity onPress={toggleconvenienceEdit} style={styles.iconContainer}>
                            <View style={{ marginTop: 10 }}><EditIcon width={20} height={20} color={PrimaryBlue} /></View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={HandleconvenienceSave} style={styles.iconContainer}>
                            <View style={{ backgroundColor: PrimaryGreen, padding: 10, marginTop: 15, borderRadius: 10, marginLeft: 3 }}><EditIcon width={20} height={20} color={White} /></View>
                        </TouchableOpacity>
                    ) : null}

            </View>
            {errors.convenience ? <Text style={styles.errorText}>{errors.convenience}</Text> : null}


            <View style={styles.editable}>

                <TextInput
                    placeholder="Transport"
                    value={transport}
                    onChangeText={(text) => setTransport(text)}
                    style={[styles.input, { width: conditionDisplay.includes(data.userrole) ? '90%' : '100%' }]}
                    keyboardType="numeric"
                    editable={transportEdit}
                />

                {conditionDisplay.includes(data.userrole) ?
                    !transportEdit ? (
                        <TouchableOpacity onPress={toggletransportEdit} style={styles.iconContainer}>
                            <View style={{ marginTop: 10 }}><EditIcon width={20} height={20} color={PrimaryBlue} /></View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={HandletransportSave} style={styles.iconContainer}>
                            <View style={{ backgroundColor: PrimaryGreen, padding: 10, marginTop: 15, borderRadius: 10, marginLeft: 3 }}><EditIcon width={20} height={20} color={White} /></View>
                        </TouchableOpacity>
                    ) : null}

            </View>
            {errors.transport ? <Text style={styles.errorText}>{errors.transport}</Text> : null}


            <TextInput
                placeholder="Other Percentage"
                value={specialAllowancePercent}
                onChangeText={(text) => setSpecialAllowancePercent(text)}
                style={styles.input}
                keyboardType="numeric"
                editable={false}
            />
            {errors.specialAllowancePercent ? <Text style={styles.errorText}>{errors.specialAllowancePercent}</Text> : null}

            <TextInput
                placeholder="Other Allowance"
                value={specialAllowance !== undefined && !isNaN(specialAllowance) ? Number(specialAllowance).toFixed(0) : ''}
                onChangeText={(text) => setSpecialAllowance(text)}
                style={styles.input}
                keyboardType="numeric"
                editable={false}
            />
            {errors.specialAllowance ? <Text style={styles.errorText}>{errors.specialAllowance}</Text> : null}


            <TextInput
                placeholder="Net Pay"
                value={netPay}
                onChangeText={(text) => setNetPay(text)}
                style={styles.input}
                keyboardType="numeric"
                editable={false}
            />
            {errors.netPay ? <Text style={styles.errorText}>{errors.netPay}</Text> : null}

            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                {
                    load ?
                        <ActivityIndicator
                            color={White}
                            size={"small"}
                        /> :
                        <Text style={styles.text}>
                            Generate Pay Slip
                        </Text>
                }
            </TouchableOpacity>

        </ScrollView>
    )
}

export default PayRollGenerate;