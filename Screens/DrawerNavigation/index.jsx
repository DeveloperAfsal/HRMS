import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from "../CustomDrawerContent";
import BottomTabNavigator from "../BottomNavigation";

const Drawer = createDrawerNavigator();

const AppNavigator = () => {

  return (
    <Drawer.Navigator
      drawerContent={(drawerProps) => <CustomDrawerContent {...drawerProps} />} 
    >
      <Drawer.Screen name="EPK Group" options={{ headerShown: false }} component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}

export default AppNavigator;

