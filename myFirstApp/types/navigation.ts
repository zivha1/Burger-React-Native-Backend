import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  profile: undefined;
  Products: undefined;
};

// Screen Props Types
export type RootScreenProps = NativeStackScreenProps<RootStackParamList>;
export type AuthScreenProps = NativeStackScreenProps<AuthStackParamList>;
export type AppScreenProps = NativeStackScreenProps<AppStackParamList>;

// Specific Screen Props
export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, "Login">;
export type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, "Register">;
export type HomeScreenProps = NativeStackScreenProps<AppStackParamList, "Home">;

export type ProductScreenProps = NativeStackScreenProps<AppStackParamList, "Products">;
