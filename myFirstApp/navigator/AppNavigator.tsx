import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "@/screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

export const AppNavigator = () => {
  //Tab navigator
  const Tab = createBottomTabNavigator();

  function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#8E8E93",
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeContent}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  // Home content component - just a picture
  const HomeContent = () => (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/icon.png")}
        style={styles.homeImage}
        resizeMode="cover"
      />
      <Text style={styles.welcomeText}>Welcome to Burger App!</Text>
      <Text style={styles.subtitle}>Delicious burgers await you!</Text>
    </View>
  );

  return <TabNavigator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  homeImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginTop: 10,
  },
});
