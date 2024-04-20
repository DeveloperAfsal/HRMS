import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
// import ProfileIcon from "../../assets/EPK CRM Icons/Profile.svg";
import styles from "./style";
// import HomeIcon from '../../assets/EPK CRM Icons/Home.svg';
// import MeetingIcon from "../../assets/EPK CRM Icons/Meeting.svg";
// import DropdownIcon from "../../assets/EPK CRM Icons/Dropdowndownarrow.svg";
// import DropupIcon from "../../assets/EPK CRM Icons/DropdownUparrow.svg";
// import AttendanceIcon from "../../assets/EPK CRM Icons/Attendance.svg";
// import RaiserequestIcon from '../../assets/EPK CRM Icons/RaiseRequest.svg';
// import PayrollIcon from "../../assets/EPK CRM Icons/Payroll.svg";
// import NotificationIcon from '../../assets/EPK CRM Icons/Notification.svg';
// import LogoutIcon from "../../assets/EPK CRM Icons/Logout.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CustomAlert from '../../Components/CustomAlert/index';

const CustomDrawerContent = ({ navigation }) => {

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

    const { data } = useSelector((state) => state.login)

    // API call

    // const [conditionDisplay, setConditionDisplay] = useState('')

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`https://officeinteriorschennai.com/api.php?userrolenavigation`);
    //             setConditionDisplay(response.data.data);
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //     };
    //     fetchData();
    // }, []);

    // API call

    // const [conditionDisplayAdmin, setConditionDisplayAdmin] = useState('');

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`https://officeinteriorschennai.com/api.php?dashboardcountview`);
    //             setConditionDisplayAdmin(response.data.data);
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //     };
    //     fetchData();
    // }, []);

    // API call

    // const [conditionDisplayMeeting, setConditionDisplayMeeting] = useState('')

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`https://officeinteriorschennai.com/api.php?userrolemeeting`);
    //             setConditionDisplayMeeting(response.data.data);
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //     };
    //     fetchData();
    // }, []);

    // API call

    // const [conditionDisplayAccounts, setConditionDisplayAccounts] = useState('')

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`https://officeinteriorschennai.com/api.php?accountsrole`);
    //             setConditionDisplayAccounts(response.data.data);
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //     };
    //     fetchData();
    // }, []);

    // API call

    // const [TLapproval, setTLapproval] = useState('');

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('https://officeinteriorschennai.com/api/public/api/teamlead_access', {
    //                 headers: {
    //                     Authorization: `Bearer ${data.token}`
    //                 }
    //             });
    //             const supervisorsString = response.data.data[0].all_supervisors;
    //             const supervisorsArray = supervisorsString.split(',');
    //             setTLapproval(supervisorsArray);
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //     };
    //     fetchData();

    // }, []);

    // Log out

    const signout = async () => {

        try {
            await AsyncStorage.removeItem('userData');

            // Clear user data from the Redux store

            const val = {};
            dispatch({ type: 'REMOVE_USER_DATA', payload: val });

        } catch (error) {
            console.error('Error signing out:', error);
        }

    }

    // Image URL  

    const imageUrl = `http://officeinteriorschennai.com/api/storage/app/${data.userimage}`;

    return (

        <DrawerContentScrollView style={styles.DrawerContentScrollView}>

            <View>

                {/* header */}

                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <View style={styles.profileview}>

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

                    </View>
                </TouchableOpacity>

                {/* Home */}

                <DrawerItem
                    style={styles.forSingle}
                    label="Dashboard"
                    labelStyle={styles.forsinglelable}
                    // icon={() => <HomeIcon width={20} height={20} color={PrimaryPurple} />}
                    onPress={() => navigation.navigate('Dashboard')}
                />

                {/* Employee */}

                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('OrganisationStructure')}>
                    <View style={styles.Tab}>
                        {/* <MeetingIcon width={20} height={20} color={PrimaryPurple} /> */}
                        <Text style={styles.dropdownText}>Organisation Structure</Text>
                    </View>
                    {/* {
                            dropdowns.employee ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                                <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                        } */}
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

                {/* Attendance */}

                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('AttendancePolicy')}>
                    <View style={styles.Tab}>
                        {/* <AttendanceIcon width={22} height={22} color={PrimaryPurple} /> */}
                        <Text style={styles.dropdownText}>Leave & Attendance Policy</Text>
                    </View>
                    {/* {
                        dropdowns.attendance ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                            <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                    } */}
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
                            label="Leave Policy Type"
                            onPress={() => navigation.navigate('Leave Policy Type')}
                        />

                        <DrawerItem
                            label="Leave policy category"
                            onPress={() => navigation.navigate('Leave policy category')}
                        />

                    </>
                )}

                {/* Raise Request */}

                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Employee')}>
                    <View style={styles.Tab}>
                        {/* <RaiserequestIcon width={22} height={22} color={PrimaryPurple} /> */}
                        <Text style={styles.dropdownText}>Employee</Text>
                    </View>

                    {/* {
                            dropdowns.raiseRequest ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                                <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                        } */}
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

                {/* Hr support */}

                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Attendance')}>
                    <View style={styles.Tab}>
                        {/* <ProfileIcon width={20} height={20} color={PrimaryPurple} /> */}
                        <Text style={styles.dropdownText}>Attendance</Text>
                    </View>
                    {/* {
                        dropdowns.hrsupport ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                            <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                    } */}
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
                            label="Monthly Attendance Calendar View"
                            onPress={() => navigation.navigate('Monthly Attendance Calendar View')}
                        />

                        <DrawerItem
                            label="Monthly List"
                            onPress={() => navigation.navigate('Monthly List')}
                        />
                    </>
                )}

                {/* accounts */}

                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('HRSupport')}>
                    <View style={styles.Tab}>
                        {/* <PayrollIcon width={20} height={20} color={PrimaryPurple} /> */}
                        <Text style={styles.dropdownText}>HR Support</Text>
                    </View>
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
                        {/* <ProfileIcon width={20} height={20} color={PrimaryPurple} /> */}
                        <Text style={styles.dropdownText}>TL Approval</Text>
                    </View>
                    {/* {
                                dropdowns.TLapproval ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                                    <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                            } */}
                </TouchableOpacity>

                {dropdowns.TLapproval && (

                    <>

                        <DrawerItem
                            label="Leave Approval"
                            onPress={() => navigation.navigate('LeaveApproval')}
                        />

                        <DrawerItem
                            label="OT Approval"
                            onPress={() => navigation.navigate('OTApproval')}
                        />

                    </>

                )}

                <DrawerItem
                    style={styles.forSingle}
                    label="HelpDesk"
                    labelStyle={styles.forsinglelable}
                    // icon={() => <NotificationIcon width={20} height={20} color={PrimaryPurple} />}
                    onPress={() => navigation.navigate('HelpDesk')}
                />

                {/* Payroll */}

                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Assets')}>

                    <View style={styles.Tab}>
                        {/* <PayrollIcon width={20} height={20} color={PrimaryPurple} /> */}
                        <Text style={styles.dropdownText}>Assets</Text>
                    </View>

                    {/* {
                        dropdowns.PayRoll ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                            <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                    } */}
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

                {/* Meeting */}

                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Events')}>
                    <View style={styles.Tab}>
                        {/* <MeetingIcon width={20} height={20} color={PrimaryPurple} /> */}
                        <Text style={styles.dropdownText}>Events</Text>
                    </View>
                    {/* {
                        dropdowns.meeting ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                            <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                    } */}
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

                {/*  */}

                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Meeting')}>
                    <View style={styles.Tab}>
                        {/* <MeetingIcon width={20} height={20} color={PrimaryPurple} /> */}
                        <Text style={styles.dropdownText}>Meeting</Text>
                    </View>
                    {/* {
                        dropdowns.meeting ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                            <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                    } */}
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

                {/*  */}

                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('TeamTask')}>
                    <View style={styles.Tab}>
                        {/* <MeetingIcon width={20} height={20} color={PrimaryPurple} /> */}
                        <Text style={styles.dropdownText}>Team Task</Text>
                    </View>
                    {/* {
                        dropdowns.meeting ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                            <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                    } */}
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

                {/*  */}

                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Payroll')}>
                    <View style={styles.Tab}>
                        {/* <MeetingIcon width={20} height={20} color={PrimaryPurple} /> */}
                        <Text style={styles.dropdownText}>Payroll</Text>
                    </View>
                    {/* {
                        dropdowns.meeting ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                            <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                    } */}
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

                {/* Notification */}

                <DrawerItem
                    style={styles.forSingle}
                    label="Holiday"
                    labelStyle={styles.forsinglelable}
                    // icon={() => <NotificationIcon width={20} height={20} color={PrimaryPurple} />}
                    onPress={() => navigation.navigate('Holiday')}
                />

                {/*  */}

                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Visitormanagement')}>
                    <View style={styles.Tab}>
                        {/* <MeetingIcon width={20} height={20} color={PrimaryPurple} /> */}
                        <Text style={styles.dropdownText}>Visitor management</Text>
                    </View>
                    {/* {
                        dropdowns.meeting ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                            <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                    } */}
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

                {/*  */}

                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('Logs')}>
                    <View style={styles.Tab}>
                        {/* <MeetingIcon width={20} height={20} color={PrimaryPurple} /> */}
                        <Text style={styles.dropdownText}>Logs</Text>
                    </View>
                    {/* {
                        dropdowns.meeting ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                            <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                    } */}
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
                    style={styles.forSingle}
                    label="logout"
                    labelStyle={styles.forsinglelable}
                    // icon={() => <LogoutIcon width={20} height={20} color={PrimaryPurple} />}
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

    )
}

export default CustomDrawerContent;
