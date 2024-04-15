import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import HomeScreen from "../HomeScreen";
import DailyAttendance from "./ATTENDANCE/DailyAttendance/index";
import DirectDashboard from "./INITIAL/DirectDashboard/index";
import MonthlyAttendanceCount from "./ATTENDANCE/MonthlyAttendance";
import AddEmployee from "./EMPLOYEE/AddEmployee";
import EmployeeList from "./EMPLOYEE/EmployyeeDetails";
import ViewEmployee from "./INITIAL/UserProfile";
import MonthlyEmployeeAttendance from "./ATTENDANCE/MonthlyEmployeeCalender";
import LeaveRequest from "./RAISEREQUEST/LeaveRequest";
import AttendanceRequest from "./RAISEREQUEST/AttendanceRequest";
import PayRollAdmin from "./PAYROLL/PayRoll";
import PayRollGenerate from "./PAYROLL/GeneratePaySlip";
import AddMeeting from "./MEETING/AddMeeting";
import MeetingList from "./MEETING/ViewMeeting";
import MeetingListEmployee from "./MEETING/ViewMeetingEmployee";
import PayRollDetails from "./PAYROLL/PayRollDetails";
import NotificationsScreen from "./NOTIFICATION/AttendanceNotification";
import EditEmployee from "./EMPLOYEE/EditEmployee";
import IndividualMonthlyEmployeeAttendance from "./ATTENDANCE/MonthlyEmployeeCalender/MonthlyEmployeeIndividual";
import EditMeeting from "./MEETING/ViewMeeting/EditMeeting";
import StatusUpdate from "./MEETING/ViewMeeting/StatusUpdate";
import Payslip from "./PAYROLL/PayRollDetails/PaySlip";
import AddAttendance from "./HR-SUPPORT/AddAttendance";
import AddLeavePermission from "./HR-SUPPORT/AddLeavePermission";
import HRLeaveRequest from "./HR-SUPPORT/LeaveRequestList";
import HRPermissionRequest from "./HR-SUPPORT/PermissionRequestList";
import HRHalfDayRequest from "./HR-SUPPORT/HalfDayRequestList";
import HRAttendanceRequest from "./HR-SUPPORT/AttendanceRequestList";
import AddEvent from "./HR-SUPPORT/AddEvent";
import EventList from "./HR-SUPPORT/EventList";
import HolidayList from "./HR-SUPPORT/HolidayList";
import EditEvent from "./HR-SUPPORT/EventList/EditEvent";
import ViewEvent from "./HR-SUPPORT/EventList/ViewEvent";
import YearlyAttendanceCount from "./ACCOUNTS";
import LoginScreen from "../../LoginScreen";
import TLPermissionRequest from "./TLAPPROVAL/PermissionRequestList";
import TLLeaveRequest from "./TLAPPROVAL/LeaveRequestList";
import { PrimaryAshPurple } from "../../../assets/Colors";


const Stack = createNativeStackNavigator();

const MenuIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      width={35}
      height={35}
    >
      <Path
        fill={"#A0A0A0"}
        d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
    </Svg>
  );
};

const HomeStack = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: PrimaryAshPurple, elevation: 0, shadowOpacity: 0,
        },
        headerTitleStyle: { fontWeight: 'bold' }
      }}>

      <Stack.Screen
        name="Home1" component={HomeScreen} options={({ navigation }) => {
          const notificationCount = 3;
          return {
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ paddingLeft: 5 }}>
                <MenuIcon />
              </TouchableOpacity>

            ),
            headerTitle: () => (
              <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 10 }}>EPK Group</Text>
              </View>
            ),
          };
        }}
      />

      {/* Initial */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Today Dashboard" component={DirectDashboard} />


      {/* nested in userprofile */}

      <Stack.Screen name="Edit Employee" component={EditEmployee} />

      {/* Employee */}

      <Stack.Screen name="Add Employee" component={AddEmployee} />
      <Stack.Screen name="Employee Detail" component={EmployeeList} />
      <Stack.Screen name="User Profile" component={ViewEmployee} />

      {/* Attendance */}

      <Stack.Screen name="Daily Attendance" component={DailyAttendance} />
      <Stack.Screen name="Monthly Attendance" component={MonthlyAttendanceCount} />
      <Stack.Screen name="Monthly Employee Calendar" component={MonthlyEmployeeAttendance} />

      {/* Nested in Monthly Employee Calendar */}

      <Stack.Screen name="Monthly Employee Individual" component={IndividualMonthlyEmployeeAttendance} />

      {/* Raise Request */}

      <Stack.Screen name="Leave Request" component={LeaveRequest} />
      <Stack.Screen name="Attendance Request" component={AttendanceRequest} />

      {/* HR Support */}

      <Stack.Screen name="Add Leave/Permission" component={AddLeavePermission} />
      <Stack.Screen name="Add Attendance" component={AddAttendance} />
      <Stack.Screen name="Leave Request List" component={HRLeaveRequest} />
      <Stack.Screen name="Permission Request List" component={HRPermissionRequest} />
      <Stack.Screen name="Half Day Request List" component={HRHalfDayRequest} />
      <Stack.Screen name="Attendance Request List" component={HRAttendanceRequest} />
      <Stack.Screen name="Add Event" component={AddEvent} />
      <Stack.Screen name="Event List" component={EventList} />
      <Stack.Screen name="Holiday List" component={HolidayList} />

      {/* Nested in Event List */}

      <Stack.Screen name="Edit Event" component={EditEvent} />
      <Stack.Screen name="View Event" component={ViewEvent} />

      {/* Accounts */}

      <Stack.Screen name="Yearly Employee Calendar" component={YearlyAttendanceCount} />

      {/* TLAPPROVAL  */}

      <Stack.Screen name="TLPermissionRequest" component={TLPermissionRequest} />
      <Stack.Screen name="TLHalfDayRequest" component={TLLeaveRequest} />
      <Stack.Screen name="TLLeaveRequest" component={TLLeaveRequest} />

      {/* PayRoll */}

      <Stack.Screen name="Pay Roll" component={PayRollAdmin} />
      <Stack.Screen name="Pay Roll Detail" component={PayRollDetails} />
      <Stack.Screen name="Generate Pay Slip" component={PayRollGenerate} />

      {/* Nested in Pay Roll Detail */}

      <Stack.Screen name="Pay Slip" component={Payslip} />

      {/* Meeting */}

      <Stack.Screen name="Add Meeting" component={AddMeeting} />
      <Stack.Screen name="View Meeting" component={MeetingList} />
      <Stack.Screen name="View Meeting Employee" component={MeetingListEmployee} />

      {/* Nested in View Meeting */}

      <Stack.Screen name="Edit Meeting" component={EditMeeting} />
      <Stack.Screen name="Remarks Update" component={StatusUpdate} />

      {/* Notification */}

      <Stack.Screen name="Attendance Notification" component={NotificationsScreen} />

    </Stack.Navigator>
  );

}

export default HomeStack;