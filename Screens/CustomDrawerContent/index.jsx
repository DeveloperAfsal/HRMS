import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import ProfileIcon from "../../assets/EPK CRM Icons/Profile.svg";
import styles from "./style";
import HomeIcon from '../../assets/EPK CRM Icons/Home.svg';
import MeetingIcon from "../../assets/EPK CRM Icons/Meeting.svg";
import DropdownIcon from "../../assets/EPK CRM Icons/Dropdowndownarrow.svg";
import DropupIcon from "../../assets/EPK CRM Icons/DropdownUparrow.svg";
import AttendanceIcon from "../../assets/EPK CRM Icons/Attendance.svg";
import RaiserequestIcon from '../../assets/EPK CRM Icons/RaiseRequest.svg';
import PayrollIcon from "../../assets/EPK CRM Icons/Payroll.svg";
import NotificationIcon from '../../assets/EPK CRM Icons/Notification.svg';
import LogoutIcon from "../../assets/EPK CRM Icons/Logout.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CustomAlert from '../../Components/CustomAlert/index';
import { PrimaryPurple } from "../../assets/Colors";

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
        attendance: false,
        raiseRequest: false,
        employee: false,
        hrsupport: false,
        PayRoll: false,
        meeting: false,
        accounts: false,
        TLapproval: false,
    });

    const toggleDropdown = (dropdown) => {
        setDropdowns((prevDropdowns) => ({
            ...Object.fromEntries(Object.entries(prevDropdowns).map(([key, value]) => [key, key === dropdown ? !value : false])),
        }));
    };

    // Data from Redux Store

    const { data } = useSelector((state) => state.login)

    // API call

    const [conditionDisplay, setConditionDisplay] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://officeinteriorschennai.com/api.php?userrolenavigation`);
                setConditionDisplay(response.data.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    // API call

    const [conditionDisplayAdmin, setConditionDisplayAdmin] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://officeinteriorschennai.com/api.php?dashboardcountview`);
                setConditionDisplayAdmin(response.data.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    // API call

    const [conditionDisplayMeeting, setConditionDisplayMeeting] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://officeinteriorschennai.com/api.php?userrolemeeting`);
                setConditionDisplayMeeting(response.data.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    // API call

    const [conditionDisplayAccounts, setConditionDisplayAccounts] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://officeinteriorschennai.com/api.php?accountsrole`);
                setConditionDisplayAccounts(response.data.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    // API call

    const [TLapproval, setTLapproval] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://officeinteriorschennai.com/api/public/api/teamlead_access', {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const supervisorsString = response.data.data[0].all_supervisors;
                const supervisorsArray = supervisorsString.split(',');
                setTLapproval(supervisorsArray);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();

    }, []);

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
                    label="Home"
                    labelStyle={styles.forsinglelable}
                    icon={() => <HomeIcon width={20} height={20} color={PrimaryPurple} />}
                    onPress={() => navigation.navigate('Home')}
                />

                {/* Employee */}

                {conditionDisplay.includes(data.userrole) ?
                    <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('employee')}>
                        <View style={styles.Tab}>
                            <MeetingIcon width={20} height={20} color={PrimaryPurple} />
                            <Text style={styles.dropdownText}>Employee</Text>
                        </View>
                        {
                            dropdowns.employee ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                                <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                        }
                    </TouchableOpacity>
                    : null}

                {dropdowns.employee && (
                    <View>
                        <DrawerItem
                            label="Add Employee"
                            onPress={() => navigation.navigate('Add Employee')}
                        />
                        <DrawerItem
                            label="Employee Detail"
                            onPress={() => navigation.navigate('Employee Detail')}
                        />
                    </View>
                )}

                {/* Attendance */}

                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('attendance')}>
                    <View style={styles.Tab}>
                        <AttendanceIcon width={22} height={22} color={PrimaryPurple} />
                        <Text style={styles.dropdownText}>Attendance</Text>
                    </View>
                    {
                        dropdowns.attendance ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                            <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                    }
                </TouchableOpacity>

                {dropdowns.attendance && (
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
                            label="Monthly Employee Calendar"
                            onPress={() => navigation.navigate('Monthly Employee Calendar')}
                        />

                    </>
                )}

                {/* Raise Request */}

                {conditionDisplayAdmin.includes(data.userrole) ? null :
                    <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('raiseRequest')}>
                        <View style={styles.Tab}>
                            <RaiserequestIcon width={22} height={22} color={PrimaryPurple} />
                            <Text style={styles.dropdownText}>Raise Request</Text>
                        </View>

                        {
                            dropdowns.raiseRequest ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                                <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                        }
                    </TouchableOpacity>}

                {dropdowns.raiseRequest && (
                    <>
                        <DrawerItem
                            label="Leave / Permission Request"
                            onPress={() => navigation.navigate('Leave Request')}
                        />

                        <DrawerItem
                            label="Attendance Request"
                            onPress={() => navigation.navigate('Attendance Request')}
                        />
                    </>
                )}

                {/* Hr support */}

                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('hrsupport')}>
                    <View style={styles.Tab}>
                        <ProfileIcon width={20} height={20} color={PrimaryPurple} />
                        <Text style={styles.dropdownText}>HR Support</Text>
                    </View>
                    {
                        dropdowns.hrsupport ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                            <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                    }
                </TouchableOpacity>

                {dropdowns.hrsupport && (
                    <>
                        {conditionDisplay.includes(data.userrole) ?
                            <>

                                <DrawerItem
                                    label="Add Leave/Permission"
                                    onPress={() => navigation.navigate('Add Leave/Permission')}
                                />


                                <DrawerItem
                                    label="Add Attendance"
                                    onPress={() => navigation.navigate('Add Attendance')}
                                />

                            </> : null}

                        <DrawerItem
                            label="Leave Request List"
                            onPress={() => navigation.navigate('Leave Request List')}
                        />

                        <DrawerItem
                            label="Permission Request List"
                            onPress={() => navigation.navigate('Permission Request List')}
                        />

                        <DrawerItem
                            label="Half Day Request List"
                            onPress={() => navigation.navigate('Half Day Request List')}
                        />

                        <DrawerItem
                            label="Attendance Request List"
                            onPress={() => navigation.navigate('Attendance Request List')}
                        />

                        {conditionDisplay.includes(data.userrole) ?
                            <DrawerItem
                                label="Add Event"
                                onPress={() => navigation.navigate('Add Event')}
                            /> : null}

                        <DrawerItem
                            label="Event List"
                            onPress={() => navigation.navigate('Event List')}
                        />

                        <DrawerItem
                            label="Holiday List"
                            onPress={() => navigation.navigate('Holiday List')}
                        />

                    </>)}

                {/* accounts */}

                {
                    conditionDisplayAccounts.includes(data.userrole) ?
                        <TouchableOpacity style={styles.dropdown} onPress={() => navigation.navigate('Yearly Employee Calendar')}>
                            <View style={styles.Tab}>
                                <PayrollIcon width={20} height={20} color={PrimaryPurple} />
                                <Text style={styles.dropdownText}>Accounts</Text>
                            </View>
                        </TouchableOpacity> : null
                }

                {/* TLapproval  */}

                {
                    TLapproval.includes(data.userempid) ?
                        <TouchableOpacity onPress={() => toggleDropdown('TLapproval')} style={styles.dropdown}>
                            <View style={styles.Tab}>
                                <ProfileIcon width={20} height={20} color={PrimaryPurple} />
                                <Text style={styles.dropdownText}>TL Approval</Text>
                            </View>
                            {
                                dropdowns.TLapproval ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                                    <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                            }
                        </TouchableOpacity>
                        : null
                }

                {dropdowns.TLapproval && (

                    <>

                        <DrawerItem
                            label="Leave Request List"
                            onPress={() => navigation.navigate('TLLeaveRequest')}
                        />

                        <DrawerItem
                            label="Permission Request List"
                            onPress={() => navigation.navigate('TLPermissionRequest')}
                        />

                        <DrawerItem
                            label="Half Day Request List"
                            onPress={() => navigation.navigate('TLHalfDayRequest')}
                        />

                    </>

                )}

                {/* Payroll */}

                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('PayRoll')}>

                    <View style={styles.Tab}>
                        <PayrollIcon width={20} height={20} color={PrimaryPurple} />
                        <Text style={styles.dropdownText}>Pay Roll</Text>
                    </View>

                    {
                        dropdowns.PayRoll ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                            <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                    }
                </TouchableOpacity>

                {dropdowns.PayRoll && (
                    <>
                        {conditionDisplay.includes(data.userrole) ?
                            <DrawerItem
                                label="Generate Pay Slip"
                                onPress={() => navigation.navigate('Generate Pay Slip')}
                            />
                            : null}

                        <DrawerItem
                            label="Pay Roll"
                            onPress={() => {
                                if (conditionDisplay.includes(data.userrole)) {
                                    navigation.navigate('Pay Roll');
                                } else {
                                    navigation.navigate('Pay Roll Detail', { id: data.userempid });
                                }
                            }}
                        />


                    </>)}

                {/* Meeting */}

                <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('meeting')}>
                    <View style={styles.Tab}>
                        <MeetingIcon width={20} height={20} color={PrimaryPurple} />
                        <Text style={styles.dropdownText}>Meeting</Text>
                    </View>
                    {
                        dropdowns.meeting ? <DropupIcon width={15} height={15} color={PrimaryPurple} /> :
                            <DropdownIcon width={15} height={15} color={PrimaryPurple} />
                    }
                </TouchableOpacity>

                {dropdowns.meeting && (
                    <>

                        {conditionDisplayMeeting.includes(data.userdepartment) ?
                            < DrawerItem
                                label="Add Meeting"
                                onPress={() => navigation.navigate('Add Meeting')}
                            /> : null}

                        <DrawerItem
                            label="View Meeting"
                            onPress={() => {
                                if (conditionDisplay.includes(data.userrole)) {
                                    navigation.navigate('View Meeting');
                                } else {
                                    navigation.navigate('View Meeting Employee', { id: data.userempid });
                                }
                            }}
                        />
                    </>)}

                {/* Notification */}

                <DrawerItem
                    style={styles.forSingle}
                    label="Notification"
                    labelStyle={styles.forsinglelable}
                    icon={() => <NotificationIcon width={20} height={20} color={PrimaryPurple} />}
                    onPress={() => navigation.navigate('Attendance Notification')}
                />

                {/* Logout */}

                <DrawerItem
                    style={styles.forSingle}
                    label="logout"
                    labelStyle={styles.forsinglelable}
                    icon={() => <LogoutIcon width={20} height={20} color={PrimaryPurple} />}
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
