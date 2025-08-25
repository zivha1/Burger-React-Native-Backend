import React from "react";
import { HomeScreen } from "@/screens/HomeScreen";
import { AppStackParamList } from "@/types/navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProductScreen } from "@/screens/ProductScreen";
import { Ionicons } from "@expo/vector-icons";
import { ProfileScreen } from "@/screens/ProfileScreen";
import CartScreen from "@/screens/CartScreen";
import { AdminMenuScreen } from "@/screens/AdminMenuScreen";
import { useAuth } from "@/context/authContext";

const Tab = createBottomTabNavigator<AppStackParamList>();

export const AppNavigator = () => {
  const { isAdmin } = useAuth();

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
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Ionicons name="person-circle-sharp" size={24} color={focused ? "black" : "gray"} />;
          },
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Ionicons name="cart" size={24} color={focused ? "black" : "gray"} />;
          },
        }}
      />
      {isAdmin && (
        <Tab.Screen
          name="Menu"
          component={AdminMenuScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return <Ionicons name="menu" size={24} color={focused ? "red" : "red"} />;
            },
          }}
        />
      )}
    </Tab.Navigator>
  );
};
