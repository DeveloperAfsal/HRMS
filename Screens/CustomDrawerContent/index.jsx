import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View, } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import LinearGradient from 'react-native-linear-gradient';
import styles from "./style";
import DropdownIcon from "../../Assets/Icons/Dropdowndownarrow.svg";
import DropupIcon from "../../Assets/Icons/DropdownUparrow.svg";
import HomeIcon from '../../Assets/Icons/Home.svg';
import OrgIcon from '../../Assets/Icons/Org.svg';
import LeavePolicyIcon from '../../Assets/Icons/leavpolicy.svg';
import EmployeeIcon from '../../Assets/Icons/Employee.svg';
import AttendanceIcon from '../../Assets/Icons/Attendance.svg';
import HrSupportIcon from '../../Assets/Icons/HRSupport.svg';
import TLApprovalIcon from '../../Assets/Icons/TLApproval.svg';
import HelpDeskIcon from '../../Assets/Icons/helpdesk.svg';
import AssetsIcon from '../../Assets/Icons/Assets.svg';
import EventsIcon from '../../Assets/Icons/Events.svg';
import MeetingIcon from '../../Assets/Icons/meeting.svg';
import TeamTaskIcon from '../../Assets/Icons/teamtask.svg';
import PayrollIcon from '../../Assets/Icons/Payroll.svg';
import HolidayIcon from '../../Assets/Icons/Holiday.svg';
import VistitorManageIcon from '../../Assets/Icons/visitorManagement.svg';
import LogsIcon from '../../Assets/Icons/Logs.svg';
import LogoutIcon from '../../Assets/Icons/logout.svg';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CustomAlert from '../../Components/CustomAlert/index';
import { useIsFocused } from "@react-navigation/native";

const CustomDrawerContent = ({ navigation }) => {

    // 

    const isFocused = useIsFocused();

    // dispatch

    const dispatch = useDispatch();

    // custom Alert

    const [showAlert, setShowAlert] = useState(false);

    const handleeLogout = () => {
        setShowAlert(true);
    };

    const handleeCancel = () => {
        setShowAlert(false);
    };

    const handleeConfirm = () => {
        setShowAlert(false);
        signout();
    };

    // dropdowns for tabs

    const [dropdowns, setDropdowns] = useState({

        // --------- Employee Management

        EmployeeManagement: false,
        // 
        OrganisationStructure: false,
        // 
        AttendancePolicy: false,
        // 
        EmployeeInfo: false,
        // 
        Template: false,

        OfferLetter: false,
        AppointmentLetter: false,
        RelivingLetter: false,

        // ------ Attendance Calculations

        AttendanceCalculations: false,

        // ------- Recruitment

        Recruitment: false,

        CandidateTracker: false,

        //  ------ Payroll

        PayRoll: false,

        // ----- Accounts

        Account: false,

        companyDetails: false,
        salesinvoice: false,
        purchaseinvoice: false,

        // ----- Sales Management

        SalesManagement: false,

        SalesManagementLead: false,
        PreSalesDropdown: false,
        SalesDropdown: false,

        //  ----- Visitor management

        Visitormanagement: false,

        // ----- Team Management

        Teammanagement: false,

        TeamTask: false,
        Meeting: false,
        Events: false,

        // ----- Asset Management

        Assetmanagement: false,

        // ------ HelpDesk

        HelpDesk: false,

        // ----- Logs

        Logs: false,

    });

    const toggleDropdown = (dropdown) => {
        setDropdowns((prevDropdowns) => ({
            ...Object.fromEntries(
                Object.entries(prevDropdowns).map(([key, value]) => [
                    key,
                    key === dropdown ? !value : false,
                ])
            ),
        }));
    };

    const toggleDropdown1 = (dropdown) => {
        setDropdowns(prevDropdowns => {
            const newDropdowns = { ...prevDropdowns };

            if (['SalesManagement', 'EmployeeManagement', 'Recruitment', 'Account', 'Teammanagement'].includes(dropdown)) {
                // Toggle top-level dropdown and close others
                newDropdowns[dropdown] = !prevDropdowns[dropdown];
                Object.keys(newDropdowns).forEach(key => {
                    if (key !== dropdown && (
                        key.includes('SalesManagement') ||
                        key.includes('EmployeeManagement') ||
                        key.includes('Recruitment') ||
                        key.includes('Account') ||
                        key.includes('Teammanagement')
                    )) {
                        newDropdowns[key] = false;
                    }
                });
            } else if ([
                'SalesManagementLead',
                'PreSalesDropdown',
                'SalesDropdown',

                'OrganisationStructure',
                'AttendancePolicy',
                'Template',
                'EmployeeInfo',
                'companyPolicy',
                'OfferLetter',
                'AppointmentLetter',
                'RelivingLetter',

                'CandidateTracker',

                'companyDetails',
                'salesinvoice',
                'purchaseinvoice',

                'TeamTask',
                'Meeting',
                'Events',


            ].includes(dropdown)) {
                // Toggle nested dropdown and keep parent open
                newDropdowns[dropdown] = !prevDropdowns[dropdown];
            }

            return newDropdowns;
        });
    };


    // Data from Redux Store

    const { data } = useSelector((state) => state.login);

    // Log out

    const signout = async () => {

        await AsyncStorage.removeItem('userData');
        const val = {};
        dispatch({ type: 'REMOVE_USER_DATA', payload: val });

        // try {
        //     const apiUrl = 'https://ocean21.in/api/public/api/logout';
        //     const response = await axios.post(apiUrl, {}, {
        //         headers: {
        //             Authorization: `Bearer ${data.token}`
        //         }
        //     });

        //     const ResData = response.data;

        //     if (ResData.status === "success") {
        //         Alert.alert("Successfull", ResData.message);
        //         await AsyncStorage.removeItem('userData');
        //         const val = {};
        //         dispatch({ type: 'REMOVE_USER_DATA', payload: val });
        //     } else {
        //         Alert.alert("Failed", ResData.message)
        //     }

        // } catch (error) {
        //     console.error('Error signing out:', error);
        // }
    }

    // Image URL  

    const imageUrl = `https://ocean21.in/api/storage/app/${data.userimage}`;

    return (

        <>

            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>

                <View style={styles.shadowContainer}>
                    <LinearGradient
                        colors={['#1FDAFD', '#0670F5']}
                        style={styles.profileview}

                    >
                        <View style={styles.imageview}>
                            <Image
                                source={{ uri: imageUrl }}
                                style={styles.imageStyle}
                            />
                        </View>

                        <View style={{ width: '70%' }}>
                            <Text style={styles.profileviewusername}>{data.username}</Text>
                            <Text style={styles.profileviewuserdepartmentname}>{data.userdepartmentname}</Text>
                        </View>
                    </LinearGradient>
                </View>

            </TouchableOpacity>

            <DrawerContentScrollView style={styles.DrawerContentScrollView}>

                <View>

                    {/* Home */}

                    <DrawerItem
                        style={styles.forSingle}
                        label="Dashboard"
                        labelStyle={[styles.forsinglelable, isFocused && { color: '#0A60F1' }]}
                        icon={() => <HomeIcon width={20} height={20} color={isFocused ? '#0A60F1' : '#000'} />}
                        onPress={() => navigation.navigate('Dashboard')}
                    />

                    {/* Employee Management */}

                    <>
                        <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => toggleDropdown('EmployeeManagement')}
                        >
                            <View style={styles.Tab}>
                                <OrgIcon width={20} height={20} color={'#000'} />
                                <Text style={styles.dropdownText}>Employee Management</Text>
                            </View>
                            {dropdowns.EmployeeManagement ? (
                                <DropupIcon width={15} height={15} color={'#000'} />
                            ) : (
                                <DropdownIcon width={15} height={15} color={'#000'} />
                            )}
                        </TouchableOpacity>

                        {dropdowns.EmployeeManagement && (

                            <>

                                {/*  */}

                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown1('OrganisationStructure')}
                                >
                                    <View style={styles.Tab}>
                                        <Text style={styles.dropdownText}>ORG Structure</Text>
                                    </View>
                                    {dropdowns.OrganisationStructure ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.OrganisationStructure && (
                                    <>
                                        <DrawerItem
                                            label="Add Role / designation"
                                            onPress={() => navigation.navigate('Add Role')}
                                        />
                                        <DrawerItem
                                            label="Role List"
                                            onPress={() => navigation.navigate('Roles List')}
                                        />
                                        <DrawerItem
                                            label="Supervisor List"
                                            onPress={() => navigation.navigate('Supervisor List')}
                                        />
                                        <DrawerItem
                                            label="org chart"
                                            onPress={() => navigation.navigate('ORG chart')}
                                        />
                                    </>
                                )}

                                {/*  */}

                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown1('AttendancePolicy')}
                                >
                                    <View style={styles.Tab}>
                                        <Text style={styles.dropdownText}>Attendance Policy</Text>
                                    </View>
                                    {dropdowns.AttendancePolicy ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.AttendancePolicy && (
                                    <>
                                        <DrawerItem
                                            label="Attendance Slot"
                                            onPress={() => navigation.navigate('Attendance Policy')}
                                        />
                                        <DrawerItem
                                            label="Leave Policy"
                                            onPress={() => navigation.navigate('Leave Policy')}
                                        />
                                        <DrawerItem
                                            label="Assign Employee shift"
                                            onPress={() => navigation.navigate('Assign Employee shift')}
                                        />
                                        <DrawerItem
                                            label="Holiday List"
                                            onPress={() => navigation.navigate('Holiday')}
                                        />
                                    </>
                                )}

                                {/*  */}

                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown1('Template')}
                                >
                                    <View style={styles.Tab}>
                                        <Text style={styles.dropdownText}>Template</Text>
                                    </View>
                                    {dropdowns.Template ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.Template && (
                                    <>
                                        <TouchableOpacity
                                            style={styles.dropdown}
                                            onPress={() => toggleDropdown1('OfferLetter')}
                                        >
                                            <View style={styles.Tab}>
                                                <Text style={styles.dropdownText}>Offer Letter</Text>
                                            </View>
                                            {dropdowns.OfferLetter ? (
                                                <DropupIcon width={15} height={15} color={'#000'} />
                                            ) : (
                                                <DropdownIcon width={15} height={15} color={'#000'} />
                                            )}
                                        </TouchableOpacity>

                                        {dropdowns.OfferLetter && (
                                            <>
                                                <DrawerItem
                                                    label="Add Offer Letter"
                                                    onPress={() => navigation.navigate('Add Offer Letter')}
                                                />
                                                <DrawerItem
                                                    label="Offer Letter List"
                                                    onPress={() => navigation.navigate('Offer Letter List')}
                                                />
                                            </>
                                        )}

                                        <TouchableOpacity
                                            style={styles.dropdown}
                                            onPress={() => toggleDropdown1('AppointmentLetter')}
                                        >
                                            <View style={styles.Tab}>
                                                <Text style={styles.dropdownText}>Appointment Letter</Text>
                                            </View>
                                            {dropdowns.AppointmentLetter ? (
                                                <DropupIcon width={15} height={15} color={'#000'} />
                                            ) : (
                                                <DropdownIcon width={15} height={15} color={'#000'} />
                                            )}
                                        </TouchableOpacity>

                                        {dropdowns.AppointmentLetter && (
                                            <>
                                                <DrawerItem
                                                    label="Add Appointment Letter"
                                                    onPress={() => navigation.navigate('Add Appointment Letter')}
                                                />

                                                <DrawerItem
                                                    label="Appointment Letter List"
                                                    onPress={() => navigation.navigate('Appointment Letter List')}
                                                />
                                            </>
                                        )}

                                        <TouchableOpacity
                                            style={styles.dropdown}
                                            onPress={() => toggleDropdown1('RelivingLetter')}
                                        >
                                            <View style={styles.Tab}>
                                                <Text style={styles.dropdownText}>Reliving Letter</Text>
                                            </View>
                                            {dropdowns.RelivingLetter ? (
                                                <DropupIcon width={15} height={15} color={'#000'} />
                                            ) : (
                                                <DropdownIcon width={15} height={15} color={'#000'} />
                                            )}
                                        </TouchableOpacity>

                                        {dropdowns.RelivingLetter && (
                                            <>
                                                <DrawerItem
                                                    label="Add Relieving Letter"
                                                    onPress={() => navigation.navigate('Add Relieving Letter')}
                                                />

                                                <DrawerItem
                                                    label="Relieving Letter List"
                                                    onPress={() => navigation.navigate('Relieving Letter List')}
                                                />
                                            </>
                                        )}
                                    </>
                                )}

                                {/*  */}

                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => navigation.navigate('Templates')}
                                >
                                    <View style={styles.Tab}>
                                        <Text style={styles.dropdownText}>Company Policy</Text>
                                    </View>
                                </TouchableOpacity>

                                {/*  */}

                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown1('EmployeeInfo')}
                                >
                                    <View style={styles.Tab}>
                                        <Text style={styles.dropdownText}>Employee Info</Text>
                                    </View>
                                    {dropdowns.Template ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.EmployeeInfo && (
                                    <>
                                        <DrawerItem
                                            label="Add Employee"
                                            onPress={() => navigation.navigate('Add Employee')}
                                        />
                                        <DrawerItem
                                            label="Employee List"
                                            onPress={() => navigation.navigate('Employee List')}
                                        />
                                        <DrawerItem
                                            label="Probation Completion"
                                            onPress={() => navigation.navigate('Employee Confirmation')}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </>

                    {/* Attendance Calculation */}

                    <>
                        <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => toggleDropdown('AttendanceCalculations')}
                        >
                            <View style={styles.Tab}>
                                <LeavePolicyIcon width={22} height={22} color={'#000'} />
                                <Text style={styles.dropdownText}>Attendance Calculations</Text>
                            </View>
                            {dropdowns.AttendanceCalculations ? (
                                <DropupIcon width={15} height={15} color={'#000'} />
                            ) : (
                                <DropdownIcon width={15} height={15} color={'#000'} />
                            )}
                        </TouchableOpacity>

                        {dropdowns.AttendanceCalculations && (

                            <>
                                <DrawerItem
                                    label="Daily Attendance"
                                    onPress={() => navigation.navigate('Daily Attendance')}
                                />
                                <DrawerItem
                                    label="Monthly Attendance"
                                    onPress={() => navigation.navigate('Monthly Attendance')}
                                />
                                <DrawerItem
                                    label="Monthly List"
                                    onPress={() => navigation.navigate('Monthly List')}
                                />
                                <DrawerItem
                                    label="HR Approval list"
                                    onPress={() => navigation.navigate('Approvals List')}
                                />
                                <DrawerItem
                                    label="TL Approval List"
                                    onPress={() => navigation.navigate('TL Approvals List')}
                                />
                            </>

                        )}
                    </>

                    {/* Recruitment */}

                    <>
                        <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => toggleDropdown('Recruitment')}
                        >
                            <View style={styles.Tab}>
                                <EmployeeIcon width={22} height={22} color={'#000'} />
                                <Text style={styles.dropdownText}>Recruitment</Text>
                            </View>
                            {dropdowns.Recruitment ? (
                                <DropupIcon width={15} height={15} color={'#000'} />
                            ) : (
                                <DropdownIcon width={15} height={15} color={'#000'} />
                            )}
                        </TouchableOpacity>

                        {dropdowns.Recruitment && (

                            <>
                                <DrawerItem
                                    label="Post Job"
                                    onPress={() => navigation.navigate('Post Job')}
                                />

                                <DrawerItem
                                    label="List Job"
                                    onPress={() => navigation.navigate('List Job')}
                                />

                                <DrawerItem
                                    label="Inbox Webmail"
                                    onPress={() => navigation.navigate('Inbox Resume')}
                                />

                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown1('CandidateTracker')}
                                >
                                    <View style={styles.Tab}>
                                        <Text style={styles.dropdownText}>Candidate Tracker</Text>
                                    </View>
                                    {dropdowns.CandidateTracker ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.CandidateTracker && (
                                    <>
                                        <DrawerItem
                                            label="Call Tracker"
                                            onPress={() => navigation.navigate('Add Resume')}
                                        />
                                        <DrawerItem
                                            label="View Tracker"
                                            onPress={() => navigation.navigate('Candidate Resume')}
                                        />
                                    </>
                                )}

                                <DrawerItem
                                    label="Search Resume"
                                    onPress={() => navigation.navigate('Search Resume')}
                                />
                            </>

                        )}
                    </>

                    {/* Payroll */}

                    <>
                        <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => toggleDropdown('PayRoll')}
                        >
                            <View style={styles.Tab}>
                                <PayrollIcon width={20} height={20} color={'#000'} />
                                <Text style={styles.dropdownText}>Payroll</Text>
                            </View>
                            {dropdowns.PayRoll ? (
                                <DropupIcon width={15} height={15} color={'#000'} />
                            ) : (
                                <DropdownIcon width={15} height={15} color={'#000'} />
                            )}
                        </TouchableOpacity>

                        {dropdowns.PayRoll && (

                            <>
                                <DrawerItem
                                    label="Overtime Calculation"
                                    onPress={() => navigation.navigate('Overtime Calculation')}
                                />

                                <DrawerItem
                                    label="Assign Employee Salary"
                                    onPress={() => navigation.navigate('Assign Employee Salary')}
                                />

                                <DrawerItem
                                    label="Salary Calculation"
                                    onPress={() => navigation.navigate('Salary Calculation')}
                                />

                                <DrawerItem
                                    label="Generate Payslip"
                                    onPress={() => navigation.navigate('Generate Payslip')}
                                />

                                <DrawerItem
                                    label="Payslip List"
                                    onPress={() => navigation.navigate('Payslip List')}
                                />

                            </>

                        )}
                    </>

                    {/* Accounts */}

                    <>
                        <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => toggleDropdown('Account')}
                        >
                            <View style={styles.Tab}>
                                <HrSupportIcon width={20} height={20} color={'#000'} />
                                <Text style={styles.dropdownText}>Account</Text>
                            </View>
                            {dropdowns.Account ? (
                                <DropupIcon width={15} height={15} color={'#000'} />
                            ) : (
                                <DropdownIcon width={15} height={15} color={'#000'} />
                            )}
                        </TouchableOpacity>

                        {dropdowns.Account && (

                            <>
                                <DrawerItem
                                    label="Good & Services"
                                    onPress={() => navigation.navigate('Good & Services')}
                                />

                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown1('companyDetails')}
                                >
                                    <View style={styles.Tab}>
                                        <Text style={styles.dropdownText}>Company Details</Text>
                                    </View>
                                    {dropdowns.companyDetails ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.companyDetails && (
                                    <>
                                        <DrawerItem
                                            label="Add Company"
                                            onPress={() => navigation.navigate('Add Company')}
                                        />
                                        <DrawerItem
                                            label="Company List"
                                            onPress={() => navigation.navigate('Company List')}
                                        />
                                    </>
                                )}

                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown1('salesinvoice')}
                                >
                                    <View style={styles.Tab}>
                                        <Text style={styles.dropdownText}>Sales Invoice</Text>
                                    </View>
                                    {dropdowns.salesinvoice ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.salesinvoice && (
                                    <>
                                        <DrawerItem
                                            label="Add Sales Invoice"
                                            onPress={() => navigation.navigate('Add Sales Invoice')}
                                        />
                                        <DrawerItem
                                            label="Sales Invoice List"
                                            onPress={() => navigation.navigate('Sales Invoice List')}
                                        />
                                    </>
                                )}

                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown1('purchaseinvoice')}
                                >
                                    <View style={styles.Tab}>
                                        <Text style={styles.dropdownText}>Purchase Invoice</Text>
                                    </View>
                                    {dropdowns.purchaseinvoice ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.purchaseinvoice && (
                                    <>
                                        <DrawerItem
                                            label="Add Purchase Invoice"
                                            onPress={() => navigation.navigate('Add Purchase Invoice')}
                                        />
                                        <DrawerItem
                                            label="Purchase Invoice List"
                                            onPress={() => navigation.navigate('Purchase Invoice List')}
                                        />
                                    </>
                                )}

                                <DrawerItem
                                    label="Daily Account"
                                    onPress={() => navigation.navigate('Daily Account')}
                                />

                            </>

                        )}
                    </>

                    {/* SalesManagement */}

                    <>
                        <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => toggleDropdown('SalesManagement')}
                        >
                            <View style={styles.Tab}>
                                <AttendanceIcon width={20} height={20} color={'#000'} />
                                <Text style={styles.dropdownText}>Sales Management</Text>
                            </View>
                            {dropdowns.SalesManagement ? (
                                <DropupIcon width={15} height={15} color={'#000'} />
                            ) : (
                                <DropdownIcon width={15} height={15} color={'#000'} />
                            )}
                        </TouchableOpacity>

                        {dropdowns.SalesManagement && (
                            <>
                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown1('SalesManagementLead')}
                                >
                                    <View style={styles.Tab}>
                                        <Text style={styles.dropdownText}>Lead</Text>
                                    </View>
                                    {dropdowns.SalesManagementLead ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.SalesManagementLead && (
                                    <>
                                        <DrawerItem
                                            label="Enquiry List"
                                            onPress={() => navigation.navigate('Enquiry List')}
                                        />
                                        <DrawerItem
                                            label="Add Lead"
                                            onPress={() => navigation.navigate('Add Lead')}
                                        />
                                        <DrawerItem
                                            label="Lead List"
                                            onPress={() => navigation.navigate('Lead List')}
                                        />
                                    </>
                                )}

                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown1('PreSalesDropdown')}
                                >
                                    <View style={styles.Tab}>
                                        <Text style={styles.dropdownText}>Pre Sales</Text>
                                    </View>
                                    {dropdowns.PreSalesDropdown ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.PreSalesDropdown && (
                                    <>
                                        <DrawerItem
                                            label="Enquiry List"
                                            onPress={() => navigation.navigate('Pre Enquiry List')}
                                        />
                                        <DrawerItem
                                            label="Add Lead"
                                            onPress={() => navigation.navigate('Pre Add Lead')}
                                        />
                                        <DrawerItem
                                            label="Lead List"
                                            onPress={() => navigation.navigate('Pre Lead List')}
                                        />
                                    </>
                                )}

                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown1('SalesDropdown')}
                                >
                                    <View style={styles.Tab}>
                                        <Text style={styles.dropdownText}>Sales</Text>
                                    </View>
                                    {dropdowns.SalesDropdown ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.SalesDropdown && (
                                    <>
                                        <DrawerItem
                                            label="Lead List"
                                            onPress={() => navigation.navigate('Sales Lead List')}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </>

                    {/* Visitor Management */}

                    <>
                        <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Visitormanagement')}>
                            <View style={styles.Tab}>
                                <VistitorManageIcon width={20} height={20} color={'#000'} />
                                <Text style={styles.dropdownText}>Visitor management</Text>
                            </View>
                            {
                                dropdowns.Visitormanagement ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                    <DropdownIcon width={15} height={15} color={'#000'} />
                            }
                        </TouchableOpacity>

                        {dropdowns.Visitormanagement && (
                            <>
                                < DrawerItem
                                    label="Add visitor"
                                    onPress={() => navigation.navigate('Add visitor')}
                                />
                                < DrawerItem
                                    label="Visitor log"
                                    onPress={() => navigation.navigate('Visitor log')}
                                />
                            </>
                        )}
                    </>

                    {/* Team management */}

                    <>
                        <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => toggleDropdown('Teammanagement')}
                        >
                            <View style={styles.Tab}>
                                <TLApprovalIcon width={20} height={20} color={'#000'} />
                                <Text style={styles.dropdownText}>Team Management</Text>
                            </View>
                            {dropdowns.Teammanagement ? (
                                <DropupIcon width={15} height={15} color={'#000'} />
                            ) : (
                                <DropdownIcon width={15} height={15} color={'#000'} />
                            )}
                        </TouchableOpacity>

                        {dropdowns.Teammanagement && (
                            <>
                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown1('Events')}
                                >
                                    <View style={styles.Tab}>
                                        <Text style={styles.dropdownText}>Events</Text>
                                    </View>
                                    {dropdowns.Events ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.Events && (
                                    <>
                                        <DrawerItem
                                            label="Add Event"
                                            onPress={() => navigation.navigate('Add Event')}
                                        />
                                        <DrawerItem
                                            label="Event List"
                                            onPress={() => navigation.navigate('Event List')}
                                        />
                                    </>
                                )}

                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown1('Meeting')}
                                >
                                    <View style={styles.Tab}>
                                        <Text style={styles.dropdownText}>Meeting</Text>
                                    </View>
                                    {dropdowns.Meeting ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.Meeting && (
                                    <>
                                        <DrawerItem
                                            label="Add Meeting"
                                            onPress={() => navigation.navigate('Add Meeting')}
                                        />
                                        <DrawerItem
                                            label="Meeting List"
                                            onPress={() => navigation.navigate('Meeting List')}
                                        />
                                    </>
                                )}

                                <TouchableOpacity
                                    style={styles.dropdown}
                                    onPress={() => toggleDropdown1('TeamTask')}
                                >
                                    <View style={styles.Tab}>
                                        <Text style={styles.dropdownText}>Team Task</Text>
                                    </View>
                                    {dropdowns.TeamTask ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {dropdowns.TeamTask && (
                                    <>
                                        <DrawerItem
                                            label="Add Project"
                                            onPress={() => navigation.navigate('Add Project')}
                                        />

                                        <DrawerItem
                                            label="Projects List"
                                            onPress={() => navigation.navigate('Projects List')}
                                        />

                                        <DrawerItem
                                            label="Add Task"
                                            onPress={() => navigation.navigate('Add Task')}
                                        />

                                        <DrawerItem
                                            label="Task List"
                                            onPress={() => navigation.navigate('Task List')}
                                        />

                                        <DrawerItem
                                            label="Assigned Task"
                                            onPress={() => navigation.navigate('Assigned Task')}
                                        />

                                    </>
                                )}
                            </>
                        )}
                    </>

                    {/* Asset Management */}

                    <>
                        <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Assetmanagement')}>
                            <View style={styles.Tab}>
                                <AssetsIcon width={20} height={20} color={'#000'} />
                                <Text style={styles.dropdownText}>Asset management</Text>
                            </View>
                            {
                                dropdowns.Assetmanagement ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                    <DropdownIcon width={15} height={15} color={'#000'} />
                            }
                        </TouchableOpacity>

                        {dropdowns.Assetmanagement && (
                            <>
                                < DrawerItem
                                    label="Assets Type"
                                    onPress={() => navigation.navigate('Assets Type')}
                                />

                                < DrawerItem
                                    label="Assign Assets"
                                    onPress={() => navigation.navigate('Assign Assets')}
                                />

                                < DrawerItem
                                    label="Asset List"
                                    onPress={() => navigation.navigate('Asset List')}
                                />
                            </>
                        )}
                    </>

                    {/* Help deskS */}

                    <>
                        <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('HelpDesk')}>
                            <View style={styles.Tab}>
                                <HelpDeskIcon width={20} height={20} color={'#000'} />
                                <Text style={styles.dropdownText}>Help Desk</Text>
                            </View>
                            {
                                dropdowns.HelpDesk ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                    <DropdownIcon width={15} height={15} color={'#000'} />
                            }
                        </TouchableOpacity>

                        {dropdowns.HelpDesk && (
                            <>
                                < DrawerItem
                                    label="Issue Type"
                                    onPress={() => navigation.navigate('Issue Type')}
                                />

                                < DrawerItem
                                    label="Raise Ticket"
                                    onPress={() => navigation.navigate('Raise Ticket')}
                                />

                                < DrawerItem
                                    label="Tickets List"
                                    onPress={() => navigation.navigate('Tickets List')}
                                />

                                < DrawerItem
                                    label="Assigned List"
                                    onPress={() => navigation.navigate('Assigned List')}
                                />
                            </>
                        )}
                    </>

                    {/* Logs */}

                    <>
                        <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Logs')}>
                            <View style={styles.Tab}>
                                <LogsIcon width={20} height={20} color={'#000'} />
                                <Text style={styles.dropdownText}>Logs</Text>
                            </View>
                            {
                                dropdowns.Logs ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                    <DropdownIcon width={15} height={15} color={'#000'} />
                            }
                        </TouchableOpacity>

                        {dropdowns.Logs && (
                            <>

                                < DrawerItem
                                    label="Activity Log"
                                    onPress={() => navigation.navigate('Activity Log')}
                                />

                                < DrawerItem
                                    label="Employee Activity Log"
                                    onPress={() => navigation.navigate('Employee Activity Log')}
                                />
                            </>
                        )}
                    </>

                    {/* Logout */}

                    <DrawerItem
                        style={[styles.forSingle, { borderBottomWidth: 0 }]}
                        label="logout"
                        labelStyle={[styles.forsinglelable]}
                        icon={() => <EmployeeIcon width={22} height={22} color={'#000'} />}
                        onPress={handleeLogout}
                    />

                    {/* Alert */}

                    <CustomAlert
                        isVisible={showAlert}
                        headingmessage="Confirmation"
                        message="Are you sure you want to logout?"
                        onCancelText="Cancel"
                        onConfirmText="Confirm"
                        onCancel={handleeCancel}
                        onConfirm={handleeConfirm}
                    />

                </View>

            </DrawerContentScrollView>
        </>
    )
}

export default CustomDrawerContent;
