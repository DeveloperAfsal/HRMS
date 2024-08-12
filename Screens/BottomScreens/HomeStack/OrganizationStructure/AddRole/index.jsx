import React, { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { useSelector } from "react-redux";
import CheckBox from '@react-native-community/checkbox';
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";
import axios from "axios";

const AddRole = ({ navigation }) => {

    // data from redux Store 

    const { data } = useSelector((state) => state.login);

    // states

    const [load, setLoad] = useState(false);
    const [roleName, setRoleName] = useState('');
    const [nameError, setNameError] = useState('');

    const [checkedNames, setCheckedNames] = useState({
        'Dashboard': ['Dashboard'],
        'EmployeeManagement': {
            'ORGStructure': ['add_Role','roles_list','supervisor_list','org_Chart'],
            'LeaveAndAttendancePolicy': ['attendancePolicy','assignEmployeeShift','leavePolicy','Holiday'],
            'CompanyPolicy': ['companypolicy'],
            'Employee': ['Add_Employee','Employee_Confirmation','Emp_loyeeList'],
            'Template': {
                'OfferLetter': ['Add_OfferLetter','Offer_LetterList'],
                'AppointmentLetter': ['Add_AppointmentLetter','Appoint_mentLetterList'],
                'RelievingLetter': ['Add_RelievingLetter','Relieving_LetterList'],
            }
        },
        'Attendance': ['DailyAttendance','Monthly_Attendance','Monthly_List','Approval_List','Leave_Approval'],
        'HRSupport': [],
        'TLApproval': [],
        'HelpDesk': ['Issue_Type','Raise_Ticket','Tickets_List','Assigned_List'],
        'Assets': ['Assets_Type','Assign_Asset','Asset_List'],
        'TeamManagement': {
            'Events': {
                'AddEvent': ['addevent'],
                'EventList': ['eventlist'],
            },
            'Meeting': {
                'AddMeeting': ['addmeeting'],
                'MeetingList': ['meetinglist'],
            },
            'TeamTask': {
                'AddProject': ['addproject'],
                'ProjectList': ['projectlist'],
                'AddTask': ['addtask'],
                'TaskList': ['tasklist'],
                'AssignedTask': ['assignedtask'],
                'TLAssignedTask': ['tlassignedtask'],
            }
        },
        'Payroll': ['OverTimeCalculation','Assign Employee Salary','Salarycalculation','Generate_payslip','Payslip_list'],
        'Holiday': [],
        'Visitiormanagement': ['Add_visitor','Visitor_log'],
        'Logs': ['Activity_Log','Employee_ActivityLog',''],
        'Recruitment': {
            'PostJob': ['Post_Job'],
            'ListJob': ['List_Job'],
            'InboxResume': ['Inbox_Resume'],
            'CandidateTracker': {
                'AddResume': ['Add_Resume'],
                'CandidateStatus': ['Candidate_Status'],
            },
            'SearchResume': ['Search_Resume'],
        },
        'Accounts': {
            'GoodsandServices': ['goodsandservices'],
            'CompanyDetails': {
                'AddCompany': ['addcompany'],
                'CompanyList': ['companylist'],
            },
            'Purchase': {
                'AddPurchase': ['addpurchase'],
                'PurchaseList': ['purchaselist'],
            },
            'Sales': {
                'AddSales': ['addsales'],
                'SalesList': ['saleslist'],
            },
            'DailyAccounts': ['dailyaccounts'],
        },

        'SalesManagement': {
            'Lead': {
                'EnquiryList': ['enquirylist'],
                'AddLead': ['addlead'],
                'LeadList': ['leadlist'],
            },
            'PreSales': {
                'EnquiryList': ['enquirylist'],
                'LeadList': ['leadlist'],
                'AddLead': ['addlead'],
            },
            'Sales': {
                'LeadList': ['leadlist'],
            }

        },

    });

    console.log(checkedNames,"setCheckedNames")

    const initializeCheckboxes = (subheadings) => {
        const checkboxes = {};
        for (const key in subheadings) {
            if (Array.isArray(subheadings[key])) {
                checkboxes[key] = subheadings[key].map(() => false);
            } else {
                checkboxes[key] = {};
                for (const nestedKey in subheadings[key]) {
                    checkboxes[key][nestedKey] = subheadings[key][nestedKey].map(() => false);
                }
            }
        }
        return checkboxes;
    };


    const initialFieldsState = [

        {
            name: 'Dashboard',
            isChecked: false,
            subheadings: [],
            checkboxes: []
        },

        {
            name: 'EmployeeManagement',
            isChecked: false,
            subheadings: {
                'ORGStructure': ['Add Role / Designation', 'Roles List', 'Supervisor List / Hierarchy', 'ORG chart'],
                'AttendancePolicy': ['Attendance Slot', 'Leave Policy', 'Assign Employee Shift', 'Holiday'],
                'CompanyPolicy': ['Company Policy'],
                'Employee': ['Add Employee', 'Employee List', 'Probation Completion'],
                // 'Template': {
                //     'OfferLetter': ['Add Offer Letter', 'Offer Letter List'],
                //     'AppointmentLetter': ['Add Appointment Letter', 'Appointment Letter List'],
                //     'RelievingLetter': ['Add Relieving Letter', 'Relieving Letter List'],
                // },
                'Template': ['Add Offer Letter', 'Offer Letter List', 'Add Appointment Letter', 'Appointment Letter List', 'Add Relieving Letter', 'Relieving Letter List']
            },
            checkboxes: initializeCheckboxes({
                'ORGStructure': ['Add Role / Designation', 'Roles List', 'Supervisor List / Hierarchy', 'ORG chart'],
                'AttendancePolicy': ['Attendance Slot', 'Leave Policy', 'Assign Employee Shift', 'Holiday'],
                'CompanyPolicy': ['Company Policy'],
                'Employee': ['Add Employee', 'Employee List', 'Probation Completion'],
                // 'Template': {
                //     'OfferLetter': ['Add Offer Letter', 'Offer Letter List'],
                //     'AppointmentLetter': ['Add Appointment Letter', 'Appointment Letter List'],
                //     'RelievingLetter': ['Add Relieving Letter', 'Relieving Letter List'],
                // },
                'Template': ['Add Offer Letter', 'Offer Letter List', 'Add Appointment Letter', 'Appointment Letter List', 'Add Relieving Letter', 'Relieving Letter List']
            })
        },

        {
            name: 'AttendanceCalculation',
            isChecked: false,
            subheadings: ['DailyAttendance', 'Monthly_Attendance', 'Monthly_List', 'HR_Approval_List', 'TL_Approval_List'],
            checkboxes: []
        },

        {
            name: 'Recruitment',
            isChecked: false,
            subheadings: {
                'Post Job': ['Post Job'],
                'List Job': ['List Job'],
                'Inbox Webmail': ['Inbox Webmail'],
                'Candidate Tracker': ['Call Tracker', 'View Tracker'],
                'Search Resume': ['Search Resume'],
            },
            checkboxes: initializeCheckboxes({
                'Post Job': ['Post Job'],
                'List Job': ['List Job'],
                'Inbox Webmail': ['Inbox Webmail'],
                'Candidate Tracker': ['Call Tracker', 'View Tracker'],
                'Search Resume': ['Search Resume'],
            })
        },

        {
            name: 'Payroll',
            isChecked: false,
            subheadings: ['OverTimeCalculation', 'Assign Employee Salary', 'Salarycalculation', 'Generate_payslip', 'Payslip_list'],
            checkboxes: []
        },

        {
            name: 'Accounts',
            isChecked: false,
            subheadings: {
                'Goods and Services': ['Goods and Services'],
                'Company Details': ['Add Company', 'Company List'],
                'Purchase': ['Add Purchase', 'Purchase List'],
                'Sales': ['Add Sales', 'Sales List'],
                'Daily Accounts': ['Daily Accounts'],
            },
            checkboxes: initializeCheckboxes({
                'Goods and Services': ['Goods and Services'],
                'Company Details': ['Add Company', 'Company List'],
                'Purchase': ['Add Purchase', 'Purchase List'],
                'Sales': ['Add Sales', 'Sales List'],
                'Daily Accounts': ['Daily Accounts'],
            })
        },

        {
            name: 'SalesManagement',
            isChecked: false,
            subheadings: {
                'Lead': ['Enquiry List', 'Add Lead', 'Lead List'],
                'PreSales': ['Enquiry List', 'Add Lead', 'Lead List'],
                'Sales': ['Lead List'],
            },
            checkboxes: initializeCheckboxes({
                'Lead': ['Enquiry List', 'Add Lead', 'Lead List'],
                'PreSales': ['Enquiry List', 'Add Lead', 'Lead List'],
                'Sales': ['Lead List'],
            })
        },

        {
            name: 'VisitiorManagement',
            isChecked: false,
            subheadings: ['Add_visitor', 'Visitor_log'],
            checkboxes: []
        },

        {
            name: 'TeamManagement',
            isChecked: false,
            subheadings: {
                'Events': ['Add Event', 'Event List'],
                'Meeting': ['Add Meeting', 'Meeting List'],
                'Team Task': ['Add Project', 'Project List', 'Add Task', 'Task List', 'Assigned Task']
            },
            checkboxes: initializeCheckboxes({
                'Events': ['Add Event', 'Event List'],
                'Meeting': ['Add Meeting', 'Meeting List'],
                'Team Task': ['Add Project', 'Project List', 'Add Task', 'Task List', 'Assigned Task']
            })
        },

        {
            name: 'AssetManagement',
            isChecked: false,
            subheadings: ['Assets_Type', 'Assign_Asset', 'Asset_List'],
            checkboxes: []
        },

        {
            name: 'Helpdesk',
            isChecked: false,
            subheadings: ['Issue_Type', 'Raise_Ticket', 'Tickets_List', 'Assigned_List'],
            checkboxes: []
        },

        {
            name: 'Logs',
            isChecked: false,
            subheadings: ['Activity_Log', 'Employee_ActivityLog'],
            checkboxes: []
        },
    ];

    const [fields, setFields] = useState(initialFieldsState);

    // checkbox Handler

    const toggleFieldCheckBox = (fieldIndex) => {
        const newFields = [...fields];
        const field = newFields[fieldIndex];
        field.isChecked = !field.isChecked;

        if (['EmployeeManagement', 'Recruitment', 'Accounts', 'SalesManagement', 'TeamManagement'].includes(field.name)) {
            if (field.isChecked) {
                field.checkboxes = initializeCheckboxes(field.subheadings);
            } else {
                field.checkboxes = Object.keys(field.subheadings).reduce((acc, key) => {
                    if (Array.isArray(field.subheadings[key])) {
                        acc[key] = field.subheadings[key].map(() => false);
                    } else {
                        acc[key] = Object.keys(field.subheadings[key]).reduce((subAcc, subKey) => {
                            subAcc[subKey] = field.subheadings[key][subKey].map(() => false);
                            return subAcc;
                        }, {});
                    }
                    return acc;
                }, {});
            }
        } else {
            field.checkboxes = field.subheadings.map(() => field.isChecked);
        }

        setFields(newFields);
        // updateCheckedNames(fieldIndex, field.isChecked);
    };


    const toggleSubheadingCheckBox = (fieldIndex, subheadingKey, subheadingIndex) => {
        const newFields = [...fields];
        const field = newFields[fieldIndex];

        if (['EmployeeManagement', 'Recruitment', 'Accounts', 'SalesManagement', 'TeamManagement'].includes(field.name)) {
            if (Array.isArray(field.checkboxes[subheadingKey])) {
                field.checkboxes[subheadingKey][subheadingIndex] = !field.checkboxes[subheadingKey][subheadingIndex];
            } else if (typeof field.checkboxes[subheadingKey] === 'object') {
                const nestedKey = Object.keys(field.checkboxes[subheadingKey])[0];
                field.checkboxes[subheadingKey][nestedKey][subheadingIndex] = !field.checkboxes[subheadingKey][nestedKey][subheadingIndex];
            }
        } else {
            field.checkboxes[subheadingIndex] = !field.checkboxes[subheadingIndex];
        }

        setFields(newFields);
        // updateCheckedNames(fieldIndex, field.checkboxes[subheadingKey]?.[subheadingIndex] || false, subheadingIndex, subheadingKey);
    };


    // const updateCheckedNames = (fieldIndex, isChecked, subheadingIndex = null, subheadingKey = null) => {
    //     const newCheckedNames = { ...checkedNames };
    //     const fieldName = fields[fieldIndex].name;

    //     if (fieldName === 'EmployeeManagement') {
    //         if (subheadingKey) {
    //             if (isChecked) {
    //                 if (!newCheckedNames[fieldName]) {
    //                     newCheckedNames[fieldName] = {};
    //                 }
    //                 newCheckedNames[fieldName][subheadingKey] = fields[fieldIndex].subheadings[subheadingKey][subheadingIndex];
    //             } else {
    //                 if (newCheckedNames[fieldName] && newCheckedNames[fieldName][subheadingKey]) {
    //                     delete newCheckedNames[fieldName][subheadingKey];
    //                 }
    //             }
    //         } else {
    //             if (isChecked) {
    //                 if (!newCheckedNames[fieldName]) {
    //                     newCheckedNames[fieldName] = [];
    //                 }
    //                 newCheckedNames[fieldName].push(fieldName);
    //             } else {
    //                 delete newCheckedNames[fieldName];
    //             }
    //         }
    //     } else {
    //         if (isChecked) {
    //             newCheckedNames[fieldName] = [fieldName];
    //         } else {
    //             delete newCheckedNames[fieldName];
    //         }
    //     }

    //     setCheckedNames(newCheckedNames);
    // };


    // HandleSubmit

    const HandleSubmit = async () => {

        setLoad(true);

        try {

            if (!roleName) {
                setNameError('Role Name Required ');
                Alert.alert('Missing', "Check The Role Name Field");
                setLoad(false);
                return;
            } else {
                setNameError('');
            }

            const apiUrl = 'https://ocean21.in/api/public/api/addroleinsert';

            const response = await axios.post(apiUrl, {
                role_name: roleName,
                permission: checkedNames,
                created_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                },
            });

            console.log(response.data, "response.data")

            if (response.data.status === "success") {
                setLoad(false);
                handleShowAlert(response.data);
                setFields(initialFieldsState);
                setRoleName('');
            } else if (response.data.status === "error") {
                setNameError(response.data.message);
                handleShowAlert1(response.data);
                setLoad(false);
            } else {
                setLoad(false);
                handleShowAlert1(response.data);
                console.error('Failed To Add:', response.data.error);
            }

        } catch (error) {
            setLoad(false);
            handleShowAlert2();
            console.error('Error during submit:', error);
        }
    }

    const HandleCancel = () => {
        setFields(initialFieldsState);
        setRoleName('');
        setNameError('');
    };

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res.message)
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Roles List');
        }, 2500);
    };

    const [isAlertVisible1, setAlertVisible1] = useState(false);
    const [resMessageFail, setResMessageFail] = useState('');

    const handleShowAlert1 = (res) => {
        setAlertVisible1(true);
        setResMessageFail(res.message);
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

            <View style={styles.AddroleContainer}>

                <View style={styles.Inputcontainer}>

                    <View style={styles.Row}>
                        <View style={{ width: "40%", alignItems: 'center' }}>
                            <Text style={styles.AddroleText}>
                                Add Role Name :
                            </Text>
                        </View>
                        <View style={{ width: "50%" }}>
                            <TextInput
                                style={styles.TextInput}
                                value={roleName}
                                onChangeText={(txt) => setRoleName(txt)} />
                            <Text style={styles.errorText}>
                                {nameError}
                            </Text>
                        </View>
                    </View>

                    {fields.map((field, fieldIndex) => (
                        <View key={fieldIndex}>
                            <View style={styles.checkView}>
                                {['Dashboard'].includes(field.name) && (
                                    <CheckBox
                                        disabled={false}
                                        value={field.isChecked}
                                        onValueChange={() => toggleFieldCheckBox(fieldIndex)}
                                        tintColors={{ true: '#20DDFE' }}
                                        style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                                    />
                                )}
                                <Text style={styles.FieldHeader}>{field.name}</Text>
                            </View>

                            <View style={styles.checkView1}>
                                {['EmployeeManagement', 'Recruitment', 'Accounts', 'SalesManagement', 'TeamManagement'].includes(field.name) ? (
                                    Object.keys(field.subheadings).map((subheadingKey) => (
                                        <View key={subheadingKey}>
                                            <Text style={styles.Subheading}>{subheadingKey}</Text>
                                            {Array.isArray(field.subheadings[subheadingKey]) ? (
                                                field.subheadings[subheadingKey].map((subheading, subheadingIndex) => (
                                                    <View key={subheadingIndex} style={styles.checkView}>
                                                        <CheckBox
                                                            disabled={false}
                                                            value={field.checkboxes[subheadingKey]?.[subheadingIndex] || false}
                                                            onValueChange={() => toggleSubheadingCheckBox(fieldIndex, subheadingKey, subheadingIndex)}
                                                            style={{ marginLeft: 20 }}
                                                            tintColors={{ true: '#20DDFE' }}
                                                        />
                                                        <Text style={styles.Subheading}>{subheading}</Text>
                                                    </View>
                                                ))
                                            ) : (
                                                Object.keys(field.subheadings[subheadingKey]).map((nestedKey) => (
                                                    <View key={nestedKey}>
                                                        <Text style={styles.Subheading}>{nestedKey}</Text>
                                                        {field.subheadings[subheadingKey][nestedKey].map((subheading, subheadingIndex) => (
                                                            <View key={subheadingIndex} style={styles.checkView}>
                                                                <CheckBox
                                                                    disabled={false}
                                                                    value={field.checkboxes[subheadingKey][nestedKey][subheadingIndex] || false}
                                                                    onValueChange={() => toggleSubheadingCheckBox(fieldIndex, subheadingKey, subheadingIndex)}
                                                                    style={{ marginLeft: 20 }}
                                                                    tintColors={{ true: '#20DDFE' }}
                                                                />
                                                                <Text style={styles.Subheading}>{subheading}</Text>
                                                            </View>
                                                        ))}
                                                    </View>
                                                ))
                                            )}
                                        </View>
                                    ))
                                ) : (
                                    field.subheadings.map((subheading, subheadingIndex) => (
                                        <View key={subheadingIndex} style={styles.checkView}>
                                            <CheckBox
                                                disabled={false}
                                                value={field.checkboxes[subheadingIndex]}
                                                onValueChange={() => toggleSubheadingCheckBox(fieldIndex, null, subheadingIndex)}
                                                style={{ marginLeft: 20 }}
                                                tintColors={{ true: '#20DDFE' }}
                                            />
                                            <Text style={styles.Subheading}>{subheading}</Text>
                                        </View>
                                    ))
                                )}
                            </View>
                        </View>
                    ))}




                    <View style={styles.buttonview}>

                        <TouchableOpacity style={styles.submitbutton} onPress={HandleSubmit}>
                            {
                                load ?
                                    <ActivityIndicator size={"small"} color={"#fff"} /> :
                                    <Text style={styles.submitbuttonText}>
                                        Submit
                                    </Text>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelbutton} onPress={HandleCancel}>
                            <Text style={styles.cancelbuttontext}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                    </View>

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

            </View>

        </ScrollView>

    )
}


export default AddRole;