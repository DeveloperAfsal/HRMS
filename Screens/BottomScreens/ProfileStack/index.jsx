import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ProfileScreen from "../ProfileScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
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

const ProfileStack = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: PrimaryAshPurple, elevation: 0, shadowOpacity: 0,
                },
                headerTitleStyle: { fontWeight: 'bold' }
            }}>

            <Stack.Screen name="Profile1" component={ProfileScreen}
                options={({ navigation }) => ({
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
                })}
            />

        </Stack.Navigator>
    );

}

export default ProfileStack