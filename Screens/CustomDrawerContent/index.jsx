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
        Logs: false,
        Visitormanagement: false,
        Payroll: false,
        TeamTask: false,
        Meeting: false,
        Events: false,
        Assets: false,
        AttendancePolicy: false,
        Attendance: false,
        raiseRequest: false,
        Employee: false,
        hrsupport: false,
        PayRoll: false,
        meeting: false,
        accounts: false,
        TLapproval: false,
        OrganisationStructure: false,
        HRSupport: false,
        HelpDesk: false,
        Recruitment: false,
        SalesManagement: false,
        SalesManagementLead: false,
        PreSalesDropdown: false,
        SalesDropdown: false,
        Account: false,
    });

    const [openDropdown, setOpenDropdown] = useState(null);

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

        setOpenDropdown((prevDropdown) =>
            prevDropdown === dropdown ? null : dropdown
        );

        setDropdowns((prevDropdowns) => {
            // Create a copy of the previous state
            const newDropdowns = { ...prevDropdowns };

            // Handle top-level dropdowns
            if (['SalesManagement', 'PreSalesDropdown', 'SalesDropdown'].includes(dropdown)) {
                newDropdowns[dropdown] = !prevDropdowns[dropdown];
                // Close other top-level dropdowns
                Object.keys(newDropdowns).forEach((key) => {
                    if (key !== dropdown && !key.includes('SalesManagement') && !key.includes('PreSalesDropdown') && !key.includes('SalesDropdown')) {
                        newDropdowns[key] = false;
                    }
                });
            }
            // Handle nested dropdowns
            else if (['SalesManagementLead'].includes(dropdown)) {
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

    const [checkedNames, setCheckedNames] = useState({
        'Dashboard': [],
        'ORGStructure': [],
        'LeaveAndAttendancePolicy': [],
        'Employee': [],
        'Attendance': [],
        'HRSupport': [],
        'TLApproval': [],
        'HelpDesk': [],
        'Assets': [],
        'Events': [],
        'Meeting': [],
        'TeamTask': [],
        'Payroll': [],
        'Holiday': [],
        'Visitiormanagement': [],
        'Logs': [],
    });

    useEffect(() => {
        axios.get(`https://ocean21.in/api/public/api/editview_role/${data.userrole}`, {
            headers: {
                'Authorization': `Bearer ${data.token}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    const roleData = res.data.data;

                    let parsedPermissions;
                    try {
                        parsedPermissions = JSON.parse(roleData.permission);
                    } catch (error) {
                        console.error('Error parsing permissions JSON:', error);
                        parsedPermissions = {};
                    }

                    // Additional check to ensure parsedPermissions is an object

                    if (typeof parsedPermissions === 'string') {
                        parsedPermissions = JSON.parse(parsedPermissions);
                    }

                    if (typeof parsedPermissions === 'object' && parsedPermissions !== null) {
                        setCheckedNames(parsedPermissions);
                    } else {
                        console.error('Parsed permissions are not in the expected format:', parsedPermissions);
                    }

                    // setLoading(false);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [data.userempid, data.token]);

    const DashboardPermissions = ['Dashboard'];

    const hasAccessToDashboard = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return checkedNames.Dashboard && DashboardPermissions.some(permission => checkedNames.Dashboard.includes(permission));
        }
        return false;
    };

    const orgStructurePermissions = ['add_Role', 'roles_list', 'supervisor_list', 'empLevel_Category', 'emp_DocumentType', 'org_Chart'];

    const hasAccessToorgStructure = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return checkedNames.ORGStructure && orgStructurePermissions.some(permission => checkedNames.ORGStructure.includes(permission));
        }
        return false;
    };

    const LeaveAndAttendancePolicyPermissions = ['addShiftSlot', 'assignEmployeeShift', 'attendancePolicy', 'attendanceType', 'attendanceLocation', 'leavePolicyType', 'leavePolicyCategory', 'leavePolicy'];

    const hasAccessToLeaveAndAttendancePolicy = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return checkedNames.LeaveAndAttendancePolicy && LeaveAndAttendancePolicyPermissions.some(permission => checkedNames.LeaveAndAttendancePolicy.includes(permission));
        }
        return false;
    };

    const EmployeePermissions = ['Add_Employee', 'Emp_loyeeList', 'Employee_Confirmation'];

    const hasAccessToEmployee = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return checkedNames.Employee && EmployeePermissions.some(permission => checkedNames.Employee.includes(permission));
        }
        return false;
    };

    const AttendancePermissions = ['DailyAttendance', 'Monthly_Attendance', 'Monthly_AttendanceCalendar', 'Monthly_List'];

    const hasAccessToAttendance = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return checkedNames.Attendance && AttendancePermissions.some(permission => checkedNames.Attendance.includes(permission));
        }
        return false;
    };

    const HRSupportPermissions = ['Approval_List', 'Template', 'Job_Opening'];

    const hasAccessToHRSupport = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return checkedNames.HRSupport && HRSupportPermissions.some(permission => checkedNames.HRSupport.includes(permission));
        }
        return false;
    };

    const TLApprovalPermissions = ['Leave_Approval', 'OT_Approval'];

    const hasAccessToTLApproval = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return checkedNames.TLApproval && TLApprovalPermissions.some(permission => checkedNames.TLApproval.includes(permission));
        }
        return false;
    };

    const HelpDeskPermissions = ['Issue_Type', 'Raise_Ticket', 'Tickets_List', 'Assigned_List'];

    const hasAccessToHelpDesk = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return checkedNames.HelpDesk && HelpDeskPermissions.some(permission => checkedNames.HelpDesk.includes(permission));
        }
        return false;
    };

    const AssetsPermissions = ['Assets_Type', 'Assign_Asset', 'Asset_List'];

    const hasAccessToAssets = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return checkedNames.Assets && AssetsPermissions.some(permission => checkedNames.Assets.includes(permission));
        }
        return false;
    };

    const EventsPermissions = ['Add_Event', 'Event_List'];

    const hasAccessToEvents = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return checkedNames.Events && EventsPermissions.some(permission => checkedNames.Events.includes(permission));
        }
        return false;
    };

    const MeetingPermissions = ['Add_Meeting', 'Meeting_List'];

    const hasAccessToMeeting = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return checkedNames.Meeting && MeetingPermissions.some(permission => checkedNames.Meeting.includes(permission));
        }
        return false;
    };

    const teamTaskPermissions = ['Add_Project', 'Project_List', 'Add_task', 'Task_List', 'Assigned_Task', 'TL_Assigned_Task'];

    const hasAccessToTeamTask = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return checkedNames.TeamTask && teamTaskPermissions.some(permission => checkedNames.TeamTask.includes(permission));
        }
        return false;
    };

    const PayrollPermissions = ['OverTimeCalculation', 'Assign Employee Salary', 'Salarycalculation', 'Generate_payslip', 'Payslip_list'];

    const hasAccessToPayroll = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return checkedNames.Payroll && PayrollPermissions.some(permission => checkedNames.Payroll.includes(permission));
        }
        return false;
    };

    const HolidayPermissions = ['Holiday'];

    const hasAccessToHoliday = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return checkedNames.Holiday && HolidayPermissions.some(permission => checkedNames.Holiday.includes(permission));
        }
        return false;
    };

    const VisitiormanagementPermissions = ['Add_visitor', 'Visitor_log'];

    const hasAccessToVisitiormanagement = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return checkedNames.Visitiormanagement && VisitiormanagementPermissions.some(permission => checkedNames.Visitiormanagement.includes(permission));
        }
        return false;
    };

    const LogsPermissions = ['Activity_Log', 'Employee_ActivityLog']

    const hasAccessToLogs = () => {
        if (!data.userrole.includes('1') || !data.userrole.includes('2')) {
            return checkedNames.Logs && LogsPermissions.some(permission => checkedNames.Logs.includes(permission));
        }
        return false;
    };

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

                    {/* header */}

                    {/* Home */}

                    {hasAccessToDashboard() && checkedNames.Dashboard && checkedNames.Dashboard.length > 0 && (
                        <>
                            {checkedNames.Dashboard.includes('Dashboard') && (
                                <DrawerItem
                                    style={styles.forSingle}
                                    label="Dashboard"
                                    labelStyle={[styles.forsinglelable, isFocused && { color: '#0A60F1' }]}
                                    icon={() => <HomeIcon width={20} height={20} color={isFocused ? '#0A60F1' : '#000'} />}
                                    onPress={() => navigation.navigate('Dashboard')}
                                />
                            )}
                        </>
                    )}

                    {/* Organisation Structure */}

                    {hasAccessToorgStructure() && checkedNames.ORGStructure && checkedNames.ORGStructure.length > 0 && (
                        <>
                            <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('OrganisationStructure')}>
                                <View style={styles.Tab}>
                                    <OrgIcon width={20} height={20} color={'#000'} />
                                    <Text style={styles.dropdownText}>Organisation Structure</Text>
                                </View>
                                {
                                    dropdowns.OrganisationStructure ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                }
                            </TouchableOpacity>


                            {dropdowns.OrganisationStructure && (
                                <View>
                                    {checkedNames.ORGStructure.includes('add_Role') && (
                                        <DrawerItem
                                            label="Add Role"
                                            onPress={() => navigation.navigate('Add Role')}
                                        />
                                    )}
                                    {checkedNames.ORGStructure.includes('roles_list') && (
                                        <DrawerItem
                                            label="Roles List"
                                            onPress={() => navigation.navigate('Roles List')}
                                        />
                                    )}
                                    {checkedNames.ORGStructure.includes('supervisor_list') && (
                                        <DrawerItem
                                            label="Supervisor List"
                                            onPress={() => navigation.navigate('Supervisor List')}
                                        />
                                    )}
                                    {checkedNames.ORGStructure.includes('empLevel_Category') && (
                                        <DrawerItem
                                            label="Employee Level Category"
                                            onPress={() => navigation.navigate('Employee Level Category')}
                                        />
                                    )}
                                    {checkedNames.ORGStructure.includes('emp_DocumentType') && (
                                        <DrawerItem
                                            label="Employee Document Type"
                                            onPress={() => navigation.navigate('Employee Document Type')}
                                        />
                                    )}
                                    {checkedNames.ORGStructure.includes('org_Chart') && (
                                        <DrawerItem
                                            label="ORG chart"
                                            onPress={() => navigation.navigate('ORG chart')}
                                        />
                                    )}
                                </View>
                            )}
                        </>
                    )}

                    {/* Leave & Attendance Policy */}

                    {hasAccessToLeaveAndAttendancePolicy() && checkedNames.LeaveAndAttendancePolicy.length > 0 && (
                        <>
                            <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('AttendancePolicy')}>
                                <View style={styles.Tab}>
                                    <LeavePolicyIcon width={22} height={22} color={'#000'} />
                                    <Text style={styles.dropdownText}>Leave & Attendance Policy</Text>
                                </View>
                                {
                                    dropdowns.AttendancePolicy ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                }
                            </TouchableOpacity>


                            {dropdowns.AttendancePolicy && (
                                <>
                                    {checkedNames.LeaveAndAttendancePolicy.includes('addShiftSlot') && (
                                        <DrawerItem
                                            label="Add Shift slot"
                                            onPress={() => navigation.navigate('Add Shift slot')}
                                        />
                                    )}
                                    {checkedNames.LeaveAndAttendancePolicy.includes('assignEmployeeShift') && (
                                        <DrawerItem
                                            label="Assign Employee shift"
                                            onPress={() => navigation.navigate('Assign Employee shift')}
                                        />
                                    )}
                                    {checkedNames.LeaveAndAttendancePolicy.includes('attendancePolicy') && (
                                        <DrawerItem
                                            label="Attendance Policy"
                                            onPress={() => navigation.navigate('Attendance Policy')}
                                        />
                                    )}
                                    {checkedNames.LeaveAndAttendancePolicy.includes('attendanceType') && (
                                        <DrawerItem
                                            label="Attendance Type"
                                            onPress={() => navigation.navigate('Attendance Type')}
                                        />
                                    )}
                                    {checkedNames.LeaveAndAttendancePolicy.includes('attendanceLocation') && (
                                        <DrawerItem
                                            label="Attendance Location"
                                            onPress={() => navigation.navigate('Attendance Location')}
                                        />
                                    )}
                                    {checkedNames.LeaveAndAttendancePolicy.includes('leavePolicyType') && (
                                        <DrawerItem
                                            label="Leave Type"
                                            onPress={() => navigation.navigate('Leave Type')}
                                        />
                                    )}
                                    {checkedNames.LeaveAndAttendancePolicy.includes('leavePolicyCategory') && (
                                        <DrawerItem
                                            label="Leave category"
                                            onPress={() => navigation.navigate('Leave category')}
                                        />
                                    )}
                                    {checkedNames.LeaveAndAttendancePolicy.includes('leavePolicy') && (
                                        <DrawerItem
                                            label="Leave Policy"
                                            onPress={() => navigation.navigate('Leave Policy')}
                                        />
                                    )}

                                    <DrawerItem
                                        label="Overtime Type"
                                        onPress={() => navigation.navigate('Overtime Type')}
                                    />

                                </>
                            )}
                        </>
                    )}

                    {/* Employee */}

                    {hasAccessToEmployee() && checkedNames.Employee.length > 0 && (
                        <>
                            <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Employee')}>
                                <View style={styles.Tab}>
                                    <EmployeeIcon width={22} height={22} color={'#000'} />
                                    <Text style={styles.dropdownText}>Employee</Text>
                                </View>

                                {
                                    dropdowns.Employee ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                }
                            </TouchableOpacity>


                            {dropdowns.Employee && (
                                <>
                                    {checkedNames.Employee.includes('Add_Employee') && (
                                        <DrawerItem
                                            label="Add Employee"
                                            onPress={() => navigation.navigate('Add Employee')}
                                        />
                                    )}

                                    {checkedNames.Employee.includes('Emp_loyeeList') && (
                                        <DrawerItem
                                            label="Employee List"
                                            onPress={() => navigation.navigate('Employee List')}
                                        />
                                    )}

                                    {checkedNames.Employee.includes('Employee_Confirmation') && (
                                        <DrawerItem
                                            label="Employee Confirmation"
                                            onPress={() => navigation.navigate('Employee Confirmation')}
                                        />
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {/* Attendance */}

                    {hasAccessToAttendance() && checkedNames.Attendance.length > 0 && (
                        <>
                            <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Attendance')}>
                                <View style={styles.Tab}>
                                    <AttendanceIcon width={20} height={20} color={'#000'} />
                                    <Text style={styles.dropdownText}>Attendance</Text>
                                </View>
                                {
                                    dropdowns.Attendance ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                }
                            </TouchableOpacity>


                            {dropdowns.Attendance && (
                                <>
                                    {checkedNames.Attendance.includes('DailyAttendance') && (
                                        <DrawerItem
                                            label="Daily Attendance"
                                            onPress={() => navigation.navigate('Daily Attendance')}
                                        />
                                    )}
                                    {checkedNames.Attendance.includes('Monthly_Attendance') && (
                                        <DrawerItem
                                            label="Monthly Attendance"
                                            onPress={() => navigation.navigate('Monthly Attendance')}
                                        />
                                    )}
                                    {checkedNames.Attendance.includes('Monthly_List') && (
                                        <DrawerItem
                                            label="Monthly List"
                                            onPress={() => navigation.navigate('Monthly List')}
                                        />
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {/* HR Support */}

                    {hasAccessToHRSupport() && checkedNames.HRSupport.length > 0 && (
                        <>
                            <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('HRSupport')}>
                                <View style={styles.Tab}>
                                    <HrSupportIcon width={20} height={20} color={'#000'} />
                                    <Text style={styles.dropdownText}>HR Support</Text>
                                </View>
                                {
                                    dropdowns.HRSupport ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                }
                            </TouchableOpacity>

                            {dropdowns.HRSupport && (
                                <>
                                    {checkedNames.HRSupport.includes('Approval_List') && (
                                        <DrawerItem
                                            label="Approvals List"
                                            onPress={() => navigation.navigate('Approvals List')}
                                        />
                                    )}

                                    {checkedNames.HRSupport.includes('Template') && (
                                        <DrawerItem
                                            label="Templates"
                                            onPress={() => navigation.navigate('Templates')}
                                        />
                                    )}

                                    {checkedNames.HRSupport.includes('Job_Opening') && (
                                        <DrawerItem
                                            label="Job Openings"
                                            onPress={() => navigation.navigate('Job Openings')}
                                        />
                                    )}

                                </>
                            )}
                        </>
                    )}


                    {/* TLapproval  */}

                    {hasAccessToTLApproval() && checkedNames.TLApproval.length > 0 && (
                        <>
                            <TouchableOpacity onPress={() => toggleDropdown('TLapproval')} style={styles.dropdown}>
                                <View style={styles.Tab}>
                                    <TLApprovalIcon width={20} height={20} color={'#000'} />
                                    <Text style={styles.dropdownText}>TL Approval</Text>
                                </View>
                                {
                                    dropdowns.TLapproval ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                }
                            </TouchableOpacity>

                            {dropdowns.TLapproval && (

                                <>
                                    {checkedNames.TLApproval.includes('Leave_Approval') && (
                                        <DrawerItem
                                            label="Leave Approval"
                                            onPress={() => navigation.navigate('TL Approvals List')}
                                        />
                                    )}

                                    {checkedNames.TLApproval.includes('OT_Approval') && (
                                        <DrawerItem
                                            label="OT Approval"
                                            onPress={() => navigation.navigate('TL OT Request')}
                                        />
                                    )}
                                </>

                            )}
                        </>
                    )}

                    {/* Help Desk */}

                    {hasAccessToHelpDesk() && checkedNames.HelpDesk.length > 0 && (
                        <>
                            <TouchableOpacity onPress={() => toggleDropdown('HelpDesk')} style={styles.dropdown}>
                                <View style={styles.Tab}>
                                    <HelpDeskIcon width={20} height={20} color={'#000'} />
                                    <Text style={styles.dropdownText}>HelpDesk</Text>
                                </View>
                                {
                                    dropdowns.HelpDesk ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                }
                            </TouchableOpacity>

                            {dropdowns.HelpDesk && (

                                <>
                                    {checkedNames.HelpDesk.includes('Issue_Type') && (
                                        <DrawerItem
                                            label="Issue Type"
                                            onPress={() => navigation.navigate('Issue Type')}
                                        />
                                    )}

                                    {checkedNames.HelpDesk.includes('Raise_Ticket') && (
                                        <>
                                            {
                                                ((data.userrole == 1 || data.userrole == 2) ?
                                                    <DrawerItem
                                                        label="Raise Ticket"
                                                        onPress={() => navigation.navigate('Raise Ticket')}
                                                    /> :
                                                    <DrawerItem
                                                        label="Raise Ticket Employee"
                                                        onPress={() => navigation.navigate('Raise Ticket Emp')}
                                                    />

                                                )
                                            }
                                        </>
                                    )}


                                    {/* <DrawerItem
                                label="Raise Ticket Employee"
                                onPress={() => navigation.navigate('Raise Ticket Emp')}
                            /> */}

                                    {checkedNames.HelpDesk.includes('Tickets_List') && (
                                        <DrawerItem
                                            label="Tickets List"
                                            onPress={() => navigation.navigate('Tickets List')}
                                        />
                                    )}

                                    {checkedNames.HelpDesk.includes('Assigned_List') && (
                                        <DrawerItem
                                            label="Assigned List"
                                            onPress={() => navigation.navigate('Assigned List')}
                                        />
                                    )}
                                </>

                            )}
                        </>
                    )}

                    {/* Assets */}

                    {hasAccessToAssets() && checkedNames.Assets.length > 0 && (
                        <>
                            <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Assets')}>

                                <View style={styles.Tab}>
                                    <AssetsIcon width={20} height={20} color={'#000'} />
                                    <Text style={styles.dropdownText}>Assets</Text>
                                </View>

                                {
                                    dropdowns.Assets ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                }
                            </TouchableOpacity>

                            {dropdowns.Assets && (
                                <>
                                    {checkedNames.Assets.includes('Assets_Type') && (
                                        <DrawerItem
                                            label="Assets Type"
                                            onPress={() => navigation.navigate('Assets Type')}
                                        />
                                    )}

                                    {checkedNames.Assets.includes('Assign_Asset') && (
                                        <DrawerItem
                                            label="Assign Assets"
                                            onPress={() => navigation.navigate('Assign Assets')}
                                        />
                                    )}

                                    {checkedNames.Assets.includes('Asset_List') && (
                                        <DrawerItem
                                            label="Asset List"
                                            onPress={() => navigation.navigate('Asset List')}
                                        />
                                    )}
                                </>
                            )}
                        </>
                    )}


                    {/* Events */}

                    {hasAccessToEvents() && checkedNames.Events.length > 0 && (
                        <>
                            <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Events')}>
                                <View style={styles.Tab}>
                                    <EventsIcon width={20} height={20} color={'#000'} />
                                    <Text style={styles.dropdownText}>Events</Text>
                                </View>
                                {
                                    dropdowns.Events ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                }
                            </TouchableOpacity>


                            {dropdowns.Events && (
                                <>
                                    {checkedNames.Events.includes('Add_Event') && (
                                        < DrawerItem
                                            label="Add Event"
                                            onPress={() => navigation.navigate('Add Event')}
                                        />
                                    )}

                                    {checkedNames.Events.includes('Event_List') && (
                                        < DrawerItem
                                            label="Event List"
                                            onPress={() => navigation.navigate('Event List')}
                                        />
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {/* Meeting */}

                    {hasAccessToMeeting() && checkedNames.Meeting.length > 0 && (
                        <>
                            <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Meeting')}>
                                <View style={styles.Tab}>
                                    <MeetingIcon width={20} height={20} color={'#000'} />
                                    <Text style={styles.dropdownText}>Meeting</Text>
                                </View>
                                {
                                    dropdowns.Meeting ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                }
                            </TouchableOpacity>


                            {dropdowns.Meeting && (
                                <>
                                    {checkedNames.Meeting.includes('Add_Meeting') && (
                                        < DrawerItem
                                            label="Add Meeting"
                                            onPress={() => navigation.navigate('Add Meeting')}
                                        />
                                    )}
                                    {checkedNames.Meeting.includes('Meeting_List') && (
                                        < DrawerItem
                                            label="Meeting List"
                                            onPress={() => navigation.navigate('Meeting List')}
                                        />
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {/* Team Task */}

                    {hasAccessToTeamTask() && checkedNames.TeamTask.length > 0 && (
                        <>
                            <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('TeamTask')}>
                                <View style={styles.Tab}>
                                    <TeamTaskIcon width={20} height={20} color={'#000'} />
                                    <Text style={styles.dropdownText}>Team Task</Text>
                                </View>
                                {
                                    dropdowns.TeamTask ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                }
                            </TouchableOpacity>

                            {dropdowns.TeamTask && (
                                <>
                                    {checkedNames.TeamTask.includes('Add_Project') && (
                                        < DrawerItem
                                            label="Add Project"
                                            onPress={() => navigation.navigate('Add Project')}
                                        />
                                    )}

                                    {checkedNames.TeamTask.includes('Project_List') && (
                                        < DrawerItem
                                            label="Projects List"
                                            onPress={() => navigation.navigate('Projects List')}
                                        />
                                    )}

                                    {checkedNames.TeamTask.includes('Add_task') && (
                                        < DrawerItem
                                            label="Add Task"
                                            onPress={() => navigation.navigate('Add Task')}
                                        />
                                    )}

                                    {checkedNames.TeamTask.includes('Task_List') && (
                                        < DrawerItem
                                            label="Task List"
                                            onPress={() => navigation.navigate('Task List')}
                                        />
                                    )}

                                    {checkedNames.TeamTask.includes('Assigned_Task') && (
                                        < DrawerItem
                                            label="Assigned Task"
                                            onPress={() => navigation.navigate('Assigned Task')}
                                        />
                                    )}

                                    {/* {checkedNames.TeamTask.includes('TL_Assigned_Task') && (
      )} */}
                                </>
                            )}
                        </>
                    )}

                    {/* Payroll */}

                    {hasAccessToPayroll() && checkedNames.Payroll.length > 0 && (
                        <>
                            <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Payroll')}>
                                <View style={styles.Tab}>
                                    <PayrollIcon width={20} height={20} color={'#000'} />
                                    <Text style={styles.dropdownText}>Payroll</Text>
                                </View>
                                {
                                    dropdowns.Payroll ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                }
                            </TouchableOpacity>


                            {dropdowns.Payroll && (
                                <>
                                    {checkedNames.Payroll.includes('OverTimeCalculation') && (
                                        < DrawerItem
                                            label="Overtime Calculation"
                                            onPress={() => navigation.navigate('Overtime Calculation')}
                                        />
                                    )}

                                    {checkedNames.Payroll.includes('Assign Employee Salary') && (
                                        < DrawerItem
                                            label="Assign Employee Salary"
                                            onPress={() => navigation.navigate('Assign Employee Salary')}
                                        />
                                    )}

                                    {checkedNames.Payroll.includes('Salarycalculation') && (
                                        < DrawerItem
                                            label="Salary Calculation"
                                            onPress={() => navigation.navigate('Salary Calculation')}
                                        />
                                    )}

                                    {checkedNames.Payroll.includes('Generate_payslip') && (
                                        < DrawerItem
                                            label="Generate Payslip"
                                            onPress={() => navigation.navigate('Generate Payslip')}
                                        />
                                    )}

                                    {checkedNames.Payroll.includes('Payslip_list') && (
                                        (data.userrole == "1" || data.userrole == "2") ?
                                            < DrawerItem
                                                label="Payslip List"
                                                onPress={() => navigation.navigate('Payslip List')}
                                            /> : null
                                    )}

                                    {(data.userrole == "1" || data.userrole == "2") ? null :
                                        < DrawerItem
                                            label="Employee Payslip"
                                            onPress={() => navigation.navigate('Employee Payslip')}
                                        />}

                                </>
                            )}
                        </>
                    )}

                    {/* Holiday */}

                    {hasAccessToHoliday() && checkedNames.Holiday.length > 0 && (
                        <DrawerItem
                            style={styles.forSingle}
                            label="Holiday"
                            labelStyle={styles.forsinglelable}
                            icon={() => <HolidayIcon width={20} height={20} color={'#000'} />}
                            onPress={() => navigation.navigate('Holiday')}
                        />)}

                    {/* Visitor Management */}

                    {hasAccessToVisitiormanagement() && checkedNames.Visitiormanagement.length > 0 && (
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
                                    {checkedNames.Visitiormanagement.includes('Add_visitor') && (
                                        < DrawerItem
                                            label="Add visitor"
                                            onPress={() => navigation.navigate('Add visitor')}
                                        />
                                    )}
                                    {checkedNames.Visitiormanagement.includes('Visitor_log') && (
                                        < DrawerItem
                                            label="Visitor log"
                                            onPress={() => navigation.navigate('Visitor log')}
                                        />
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {/* Logs */}

                    {hasAccessToLogs() && checkedNames.Logs.length > 0 && (
                        <>
                            <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Logs')}>
                                <View style={styles.Tab}>
                                    <LogsIcon width={20} height={20} color={'#000'} />
                                    <Text style={styles.dropdownText}>Logs</Text>
                                </View>
                                {
                                    dropdowns.meeting ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                }
                            </TouchableOpacity>

                            {dropdowns.Logs && (
                                <>
                                    {checkedNames.Logs.includes('Activity_Log') && (
                                        < DrawerItem
                                            label="Activity Log"
                                            onPress={() => navigation.navigate('Activity Log')}
                                        />
                                    )}

                                    {checkedNames.Logs.includes('Employee_ActivityLog') && (
                                        < DrawerItem
                                            label="Employee Activity Log"
                                            onPress={() => navigation.navigate('Employee Activity Log')}
                                        />
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {/* Recruitment */}

                    <>
                        <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Recruitment')}>
                            <View style={styles.Tab}>
                                <VistitorManageIcon width={20} height={20} color={'#000'} />
                                <Text style={styles.dropdownText}>Recruitment</Text>
                            </View>
                            {
                                dropdowns.Recruitment ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                    <DropdownIcon width={15} height={15} color={'#000'} />
                            }
                        </TouchableOpacity>

                        {dropdowns.Recruitment && (
                            <>

                                < DrawerItem
                                    label="Post Job"
                                    onPress={() => navigation.navigate('Post Job')}
                                />


                                < DrawerItem
                                    label="List Job"
                                    onPress={() => navigation.navigate('List Job')}
                                />

                                < DrawerItem
                                    label="Add Resume"
                                    onPress={() => navigation.navigate('Add Resume')}
                                />

                                < DrawerItem
                                    label="Candidate Status"
                                    onPress={() => navigation.navigate('Candidate Resume')}
                                />

                                < DrawerItem
                                    label="Inbox Resume"
                                    onPress={() => navigation.navigate('Inbox Resume')}
                                />

                                < DrawerItem
                                    label="Search Resume"
                                    onPress={() => navigation.navigate('Search Resume')}
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
                                <VistitorManageIcon width={20} height={20} color={'#000'} />
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
                                    {openDropdown === 'SalesManagementLead' ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {openDropdown === 'SalesManagementLead' && (
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
                                    {openDropdown === 'PreSalesDropdown' ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {openDropdown === 'PreSalesDropdown' && (
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
                                    {openDropdown === 'SalesDropdown' ? (
                                        <DropupIcon width={15} height={15} color={'#000'} />
                                    ) : (
                                        <DropdownIcon width={15} height={15} color={'#000'} />
                                    )}
                                </TouchableOpacity>

                                {openDropdown === 'SalesDropdown' && (
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

                    {/*  */}

                    <>
                        <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Account')}>
                            <View style={styles.Tab}>
                                <LogsIcon width={20} height={20} color={'#000'} />
                                <Text style={styles.dropdownText}>Account</Text>
                            </View>
                            {
                                dropdowns.Account ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                    <DropdownIcon width={15} height={15} color={'#000'} />
                            }
                        </TouchableOpacity>

                        {dropdowns.Account && (
                            <>
                                < DrawerItem
                                    label="Good & Services"
                                    onPress={() => navigation.navigate('Good & Services')}
                                />

                                < DrawerItem
                                    label="Add Company"
                                    onPress={() => navigation.navigate('Add Company')}
                                />

                                < DrawerItem
                                    label="Company List"
                                    onPress={() => navigation.navigate('Company List')}
                                />

                                < DrawerItem
                                    label="Daily Account"
                                    onPress={() => navigation.navigate('Daily Account')}
                                />
                            </>
                        )}
                    </>

                    {/* Logout */}

                    <DrawerItem
                        style={[styles.forSingle, { borderBottomWidth: 0 }]}
                        label="logout"
                        labelStyle={[styles.forsinglelable]}
                        icon={() => <LogoutIcon width={20} height={20} color={'#000'} />}
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
