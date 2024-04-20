import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import HomeScreen from "../HomeScreen/index";
import LoginScreen from "../../Login/LoginScreen";
import ForgotPassword from "../../Login/ForgotPass";
import ResetPassword from "../../Login/ResetPass";
import Otp from "../../Login/OtpScreen";
import { White } from "../../../Assets/Colors";
import AddShiftSlot from "./AttendancePolicy/AddShiftSlot";
import LevelCategory from "./OrganizationStructure/EmployeeLevelCategory";
import DocumentType from "./OrganizationStructure/EmployeeDocumentType";
import AttendancePolicy from "./AttendancePolicy/AttendancePolicy";

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
        name="Home1" component={HomeScreen} options={({ navigation }) => {
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

      {/*  */}

      <Stack.Screen name="Employee Level Category" component={LevelCategory} />
      <Stack.Screen name="Employee Document Type" component={DocumentType} />

      {/*  */}

      <Stack.Screen name="Add Shift slot" component={AddShiftSlot} />
      <Stack.Screen name="Attendance Policy" component={AttendancePolicy} />
      

    </Stack.Navigator>
  );

}

export default HomeStack;