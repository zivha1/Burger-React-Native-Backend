import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "@/context/authContext";
import { RootNavigator } from "@/navigator/RootNavigator";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
