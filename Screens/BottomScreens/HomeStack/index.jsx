import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import HomeScreen from "../HomeScreen/index";
import { White } from "../../../Assets/Colors";
import AddShiftSlot from "./AttendancePolicy/AddShiftSlot";
import LevelCategory from "./OrganizationStructure/EmployeeLevelCategory";
import DocumentType from "./OrganizationStructure/EmployeeDocumentType";
import AttendancePolicy from "./AttendancePolicy/AttendancePolicy";
import RoleList from "./OrganizationStructure/RolesList";
import AddRole from "./OrganizationStructure/AddRole";
import EditPolicy from "./AttendancePolicy/AttendancePolicy/EditPolicy";
import EditRole from "./OrganizationStructure/EditRole";
import AttendanceType from "./AttendancePolicy/AttendanceType";
import AttendanceLocation from "./AttendancePolicy/AttendanceLocation";
import LeaveType from "./AttendancePolicy/LeaveType";
import LeaveCategory from "./AttendancePolicy/LeaveCategory";
import AddEmployeeShift from "./AttendancePolicy/AddEmployeeShift";
import EditEmployeeShift from "./AttendancePolicy/EditEmployeeShift";
import SupervisorList from "./OrganizationStructure/SupervisorList";
import LeavePolicy from "./AttendancePolicy/LeavePolicy";
import EditSupervisorList from "./OrganizationStructure/EditSupervisorList";
import EditLeavePolicy from "./AttendancePolicy/EditLeavePolicy";
import AddEmployee from "./Employee/AddEmployee";
import EmployeeDetails from "./Employee/AddEmployee/EmployeeDetails";
import BasicDetails from "./Employee/AddEmployee/BasicDetails";
import EmployeeRole from "./Employee/AddEmployee/EmployeeRole";
import BankDetails from "./Employee/AddEmployee/BankDetails";
import Documents from "./Employee/AddEmployee/Documents";
import EmployeeList from "./Employee/EmployeeList";
import ViewProfile from "./Employee/ViewProfile";
import EditEmployee from "./Employee/EditEmployee";
import EmpConfirmation from "./Employee/EmpConfirmation";
import ApprovalList from "./HrSupport/ApprovalList";
import AttendanceRequest from "./HrSupport/ApprovalList/AttendanceRequest";
import LeaveRequest from "./HrSupport/ApprovalList/LeaveRequest";
import PermissionRequest from "./HrSupport/ApprovalList/PermissionRequest";
import HalfDayRequest from "./HrSupport/ApprovalList/HalfDayRequest";
import OverTimeRequest from "./HrSupport/ApprovalList/OverTimeRequest";
import AddLeavePermissionHalfDay from "./HrSupport/ApprovalList/AddLeavePermissionHalfDay";
import AddAttendance from "./HrSupport/ApprovalList/AddAttendance";
import AddOvertime from "./HrSupport/ApprovalList/AddOverTime";
import TLApprovalList from "./TLApproval";
import TLLeaveRequest from "./TLApproval/LeaveRequest";
import TLPermissionRequest from "./TLApproval/PermissionRequest";
import TLHalfDayRequest from "./TLApproval/HalfDayRequest";
import TLOtRequest from "./TLApproval/OTAppproval";
import Template from "./HrSupport/Templates";
import JobOpenings from "./HrSupport/JobOpenings";
import ViewJob from "./HrSupport/ViewJob";
import Holiday from "./Holiday";
import DailyAttendance from "./Attendance/DailyAttendance";
import MonthlyAttendance from "./Attendance/MonthlyAttendance";
import MonthlyList from "./Attendance/Monthlylist";
import Indvidual from "./Attendance/Indvidual";
import ActivityLog from "./Logs/ActivityLog";
import EMPActiveLog from "./Logs/EmployeeLog";
import Announcement from "../HomeScreen/Announcement";
import AddVisitor from "./VisitorManagement/AddVisitor";
import VisitorLog from "./VisitorManagement/VisitorLog";
import ViewDeatails from "./VisitorManagement/Details";
import Eventlist from "./Event/EventList";
import MeetingList from "./Meeting/MeetingList";
import Addmeeting from "./Meeting/AddMeeting";
import AddEvent from "./Event/AddEvent";
import Editmeeting from "./Meeting/EditMeeting";
import EditEvent from "./Event/EditEvent";
import AssetsList from "./Assets/AssetList";
import AssetType from "./Assets/AssetType";
import AddAsset from "./Assets/AddAsset";
import EditAsset from "./Assets/EditAsset";

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
        fill={White}
        d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
    </Svg>
  );
};

const HomeStack = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#20DDFE',
        },
        headerTitleStyle: { fontWeight: 'bold' }
      }}>

      <Stack.Screen
        name="Dashboard" component={HomeScreen} options={({ navigation }) => {
          return {
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ paddingLeft: 5 }}>
                <MenuIcon />
              </TouchableOpacity>

            ),
            headerTitle: () => (
              <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 10, color: White }}>Logo</Text>
              </View>
            ),
          };
        }}
      />

      <Stack.Screen name="Announcement" component={Announcement} />

      {/*  */}

      <Stack.Screen name="Add Role" component={AddRole} />
      <Stack.Screen name="Edit Role" component={EditRole} />
      <Stack.Screen name="Roles List" component={RoleList} />
      <Stack.Screen name="Employee Level Category" component={LevelCategory} />
      <Stack.Screen name="Employee Document Type" component={DocumentType} />
      <Stack.Screen name="Supervisor List" component={SupervisorList} />
      <Stack.Screen name="Edit Supervisor List" component={EditSupervisorList} />

      {/*  */}

      <Stack.Screen name="Add Shift slot" component={AddShiftSlot} />
      <Stack.Screen name="Assign Employee shift" component={AddEmployeeShift} />
      <Stack.Screen name="Edit Employee shift" component={EditEmployeeShift} />
      <Stack.Screen name="Attendance Policy" component={AttendancePolicy} />
      <Stack.Screen name="Edit Policy" component={EditPolicy} />
      <Stack.Screen name="Attendance Type" component={AttendanceType} />
      <Stack.Screen name="Attendance Location" component={AttendanceLocation} />
      <Stack.Screen name="Leave Type" component={LeaveType} />
      <Stack.Screen name="Leave category" component={LeaveCategory} />
      <Stack.Screen name="Leave Policy" component={LeavePolicy} />
      <Stack.Screen name="Edit Leave Policy" component={EditLeavePolicy} />

      {/*  */}

      <Stack.Screen name="Add Employee" component={AddEmployee} />
      <Stack.Screen name="Employee List" component={EmployeeList} />
      <Stack.Screen name="View Profile" component={ViewProfile} />
      <Stack.Screen name="Edit Employee" component={EditEmployee} />
      <Stack.Screen name="Employee Confirmation" component={EmpConfirmation} />

      {/*  */}

      <Stack.Screen name="Daily Attendance" component={DailyAttendance} />
      <Stack.Screen name="Monthly Attendance" component={MonthlyAttendance} />
      <Stack.Screen name="Monthly List" component={MonthlyList} />
      <Stack.Screen name="Indvidual" component={Indvidual} />

      {/*  */}

      <Stack.Screen name="Approvals List" component={ApprovalList} />

      <Stack.Screen name="Add Leave Permission Half Day" component={AddLeavePermissionHalfDay} />
      <Stack.Screen name="Add Attendance" component={AddAttendance} />
      <Stack.Screen name="Add Over Time" component={AddOvertime} />
      <Stack.Screen name="Attendance Request" component={AttendanceRequest} />
      <Stack.Screen name="Leave Request" component={LeaveRequest} />
      <Stack.Screen name="Permission Request" component={PermissionRequest} />
      <Stack.Screen name="HalfDay Request" component={HalfDayRequest} />
      <Stack.Screen name="OverTime Request" component={OverTimeRequest} />

      <Stack.Screen name="Templates" component={Template} />
      <Stack.Screen name="Job Openings" component={JobOpenings} />

      <Stack.Screen name="View Job" component={ViewJob} />

      {/*  */}

      <Stack.Screen name="TL Approvals List" component={TLApprovalList} />
      <Stack.Screen name="TL Leave Request" component={TLLeaveRequest} />
      <Stack.Screen name="TL Permission Request" component={TLPermissionRequest} />
      <Stack.Screen name="TL HalfDay Request" component={TLHalfDayRequest} />

      <Stack.Screen name="TL Ot Request" component={TLOtRequest} />

      {/*  */}

      <Stack.Screen name="Asset List" component={AssetsList} />
      <Stack.Screen name="Add Asset" component={AddAsset} />
      <Stack.Screen name="Edit Asset" component={EditAsset} />
      <Stack.Screen name="Assets Type" component={AssetType} />

      {/*  */}

      <Stack.Screen name="Add Event" component={AddEvent} />
      <Stack.Screen name="Edit Event" component={EditEvent} />
      <Stack.Screen name="Event List" component={Eventlist} />

      {/*  */}

      <Stack.Screen name="Add Meeting" component={Addmeeting} />
      <Stack.Screen name="Edit Meeting" component={Editmeeting} />
      <Stack.Screen name="Meeting List" component={MeetingList} />

      {/*  */}

      <Stack.Screen name="Holiday" component={Holiday} />

      {/*  */}

      <Stack.Screen name="Add visitor" component={AddVisitor} />
      <Stack.Screen name="Visitor log" component={VisitorLog} />

      {/*  */}

      <Stack.Screen name="Activity Log" component={ActivityLog} />
      <Stack.Screen name="Employee Activity Log" component={EMPActiveLog} />
      <Stack.Screen name="ViewDeatails" component={ViewDeatails} />

    </Stack.Navigator>
  );

}

export default HomeStack;