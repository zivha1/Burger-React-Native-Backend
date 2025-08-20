import React, { useState } from "react";
import { StyleSheet, View, Text, StatusBar, ScrollView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ProductCard from "./components/ProductCard";
import Header from "./components/Header";
import MenuPage from "./Pages/MenuPage";
import CartPage from "./Pages/CartPage";

export type RootTypeParamsList = {
  Menu: { itemId: number };
  Cart: { itemId: number };
  Info: { itemId: number };
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState();

  const Tab = createBottomTabNavigator<RootTypeParamsList>();

  return (
    <>
      <StatusBar hidden={false} barStyle={"dark-content"} />
      <Header />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Menu"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              const icons: any = {
                Menu: "fast-food-outline",
                Cart: "cart-outline",
                Info: "information",
              };
              return (
                <Ionicons name={icons[route.name]} size={size} color={color} />
              );
            },
            tabBarInactiveTintColor: "#ffffffff",
            tabBarActiveTintColor: "#000000ff",

            tabBarStyle: {
              backgroundColor: "#efb359fe",
            },
            tabBarLabelStyle: {
              fontWeight: "bold",
              fontSize: 15,
            },
          })}
        >
          <Tab.Screen
            name="Menu"
            component={MenuPage}
            options={{
              title: "Menu",
            }}
          />
          <Tab.Screen
            name="Cart"
            component={CartPage}
            options={{
              title: "Cart",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2d3436",
    letterSpacing: 2,
  },
});
registerRootComponent(App);
