import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, } from 'react-native';
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
    });

    const toggleDropdown = (dropdown) => {
        setDropdowns((prevDropdowns) => ({
            ...Object.fromEntries(Object.entries(prevDropdowns).map(([key, value]) => [key, key === dropdown ? !value : false])),
        }));
    };

    // Data from Redux Store

    const { data } = useSelector((state) => state.login);

    // Log out

    const signout = async () => {

        try {

            // const apiUrl = 'https://ocean21.in/api/public/api/logout';
            // const response = await axios.post(apiUrl, {
            //     headers: {
            //         Authorization: `Bearer ${data.token}`
            //     }
            // });

            // console.log(response, "response")

            await AsyncStorage.removeItem('userData');

            // Clear user data from the Redux store

            const val = {};
            dispatch({ type: 'REMOVE_USER_DATA', payload: val });

        } catch (error) {
            console.error('Error signing out:', error);
        }

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

                        <View>
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

                    <DrawerItem
                        style={styles.forSingle}
                        label="Home"
                        labelStyle={[styles.forsinglelable, isFocused && { color: '#0A60F1' }]}
                        icon={() => <HomeIcon width={20} height={20} color={isFocused ? '#0A60F1' : '#000'} />}
                        onPress={() => navigation.navigate('Dashboard')}
                    />

                    {/* Organisation Structure */}

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
                            <DrawerItem
                                label="Add Role"
                                onPress={() => navigation.navigate('Add Role')}
                            />
                            <DrawerItem
                                label="Roles List"
                                onPress={() => navigation.navigate('Roles List')}
                            />
                            <DrawerItem
                                label="Supervisor List"
                                onPress={() => navigation.navigate('Supervisor List')}
                            />
                            <DrawerItem
                                label="Employee Level Category"
                                onPress={() => navigation.navigate('Employee Level Category')}
                            />
                            <DrawerItem
                                label="Employee Document Type"
                                onPress={() => navigation.navigate('Employee Document Type')}
                            />
                            <DrawerItem
                                label="ORG chart"
                                onPress={() => navigation.navigate('ORG chart')}
                            />
                        </View>
                    )}

                    {/* Leave & Attendance Policy */}

                    <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('AttendancePolicy')}>
                        <View style={styles.Tab}>
                            <LeavePolicyIcon width={22} height={22} color={'#000'} />
                            <Text style={styles.dropdownText}>Leave & Atten Policy</Text>
                        </View>
                        {
                            dropdowns.AttendancePolicy ? <DropupIcon width={15} height={15} color={'#000'} /> :
                                <DropdownIcon width={15} height={15} color={'#000'} />
                        }
                    </TouchableOpacity>

                    {dropdowns.AttendancePolicy && (
                        <>
                            <DrawerItem
                                label="Add Shift slot"
                                onPress={() => navigation.navigate('Add Shift slot')}
                            />

                            <DrawerItem
                                label="Assign Employee shift"
                                onPress={() => navigation.navigate('Assign Employee shift')}
                            />

                            <DrawerItem
                                label="Attendance Policy"
                                onPress={() => navigation.navigate('Attendance Policy')}
                            />

                            <DrawerItem
                                label="Attendance Type"
                                onPress={() => navigation.navigate('Attendance Type')}
                            />

                            <DrawerItem
                                label="Attendance Location"
                                onPress={() => navigation.navigate('Attendance Location')}
                            />

                            <DrawerItem
                                label="Leave Type"
                                onPress={() => navigation.navigate('Leave Type')}
                            />

                            <DrawerItem
                                label="Leave category"
                                onPress={() => navigation.navigate('Leave category')}
                            />

                            <DrawerItem
                                label="Leave Policy"
                                onPress={() => navigation.navigate('Leave Policy')}
                            />

                        </>
                    )}

                    {/* Employee */}

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
                            <DrawerItem
                                label="Add Employee"
                                onPress={() => navigation.navigate('Add Employee')}
                            />

                            <DrawerItem
                                label="Employee List"
                                onPress={() => navigation.navigate('Employee List')}
                            />

                            <DrawerItem
                                label="Employee Confirmation"
                                onPress={() => navigation.navigate('Employee Confirmation')}
                            />
                        </>
                    )}

                    {/* Attendance */}

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
                        </>
                    )}

                    {/* HR Support */}

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
                            <DrawerItem
                                label="Approvals List"
                                onPress={() => navigation.navigate('Approvals List')}
                            />

                            <DrawerItem
                                label="Templates"
                                onPress={() => navigation.navigate('Templates')}
                            />

                            <DrawerItem
                                label="Job Openings"
                                onPress={() => navigation.navigate('Job Openings')}
                            />

                        </>
                    )}


                    {/* TLapproval  */}

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

                            <DrawerItem
                                label="Leave Approval"
                                onPress={() => navigation.navigate('TL Approvals List')}
                            />

                            <DrawerItem
                                label="OT Approval"
                                onPress={() => navigation.navigate('TL Ot Request')}
                            />

                        </>

                    )}

                    {/* Help Desk */}

                    <DrawerItem
                        style={styles.forSingle}
                        label="HelpDesk"
                        labelStyle={styles.forsinglelable}
                        icon={() => <HelpDeskIcon width={20} height={20} color={'#000'} />}
                        onPress={() => navigation.navigate('HelpDesk')}
                    />

                    {/* Assets */}

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
                            <DrawerItem
                                label="Assets Type"
                                onPress={() => navigation.navigate('Assets Type')}
                            />
                            <DrawerItem
                                label="Add Asset"
                                onPress={() => navigation.navigate('Add Asset')}
                            />
                            <DrawerItem
                                label="Asset List"
                                onPress={() => navigation.navigate('Asset List')}
                            />

                        </>)}

                    {/* Events */}

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

                            < DrawerItem
                                label="Add Event"
                                onPress={() => navigation.navigate('Add Event')}
                            />

                            < DrawerItem
                                label="Event List"
                                onPress={() => navigation.navigate('Event List')}
                            />

                        </>)}

                    {/* Meeting */}

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

                            < DrawerItem
                                label="Add Meeting"
                                onPress={() => navigation.navigate('Add Meeting')}
                            />

                            < DrawerItem
                                label="Meeting List"
                                onPress={() => navigation.navigate('Meeting List')}
                            />

                        </>)}

                    {/* Team Task */}

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

                            < DrawerItem
                                label="Add Project"
                                onPress={() => navigation.navigate('Add Project')}
                            />

                            < DrawerItem
                                label="Projects List"
                                onPress={() => navigation.navigate('Projects List')}
                            />

                            < DrawerItem
                                label="Add Task"
                                onPress={() => navigation.navigate('Add Task')}
                            />

                            < DrawerItem
                                label="Tasks – Employee view"
                                onPress={() => navigation.navigate('Tasks – Employee view')}
                            />

                            < DrawerItem
                                label="Task List"
                                onPress={() => navigation.navigate('Task List')}
                            />

                            < DrawerItem
                                label="Task Progress"
                                onPress={() => navigation.navigate('Task Progress')}
                            />

                        </>)}

                    {/* Payroll */}

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

                            < DrawerItem
                                label="Salary Calculation"
                                onPress={() => navigation.navigate('Salary Calculation')}
                            />

                            < DrawerItem
                                label="Generate Payslip"
                                onPress={() => navigation.navigate('Generate Payslip')}
                            />

                            < DrawerItem
                                label="Payroll List"
                                onPress={() => navigation.navigate('Payroll List')}
                            />

                        </>)}

                    {/* Holiday */}

                    <DrawerItem
                        style={styles.forSingle}
                        label="Holiday"
                        labelStyle={styles.forsinglelable}
                        icon={() => <HolidayIcon width={20} height={20} color={'#000'} />}
                        onPress={() => navigation.navigate('Holiday')}
                    />

                    {/* Visitor Management */}

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

                        </>)}

                    {/* Logs */}

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

                            < DrawerItem
                                label="Activity Log"
                                onPress={() => navigation.navigate('Activity Log')}
                            />

                            < DrawerItem
                                label="Employee Activity Log"
                                onPress={() => navigation.navigate('Employee Activity Log')}
                            />

                        </>)}

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
