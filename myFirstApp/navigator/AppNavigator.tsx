import React from "react";
import { HomeScreen } from "@/screens/HomeScreen";
import { AppStackParamList } from "@/types/navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProductScreen } from "@/screens/ProductScreen";
import { Ionicons } from "@expo/vector-icons";
import { ProfileScreen } from "@/screens/ProfileScreen";

const Tab = createBottomTabNavigator<AppStackParamList>();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Ionicons name="home" size={24} color={focused ? "black" : "gray"} />;
          },
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Ionicons name="list" size={24} color={focused ? "black" : "gray"} />;
          },
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Ionicons name="person-circle-sharp" size={24} color={focused ? "black" : "gray"} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
