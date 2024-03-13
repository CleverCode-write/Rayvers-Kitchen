import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ForgotPass,
  Login,
  Onboard,
  Register,
  RouteSelection,
  VerifyCode,
} from "../../../screens";

const StackAuth = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <StackAuth.Navigator
      initialRouteName="Login"
      screenOptions={() => ({ headerShown: false })}
    >
      <StackAuth.Screen name="RouteSelection" component={RouteSelection} />
      <StackAuth.Screen name="Login" component={Login} />
      <StackAuth.Screen name="Register" component={Register} />
      {/* @ts-ignore */}
      <StackAuth.Screen name="VerifyCode" component={VerifyCode} />
      <StackAuth.Screen name="ForgotPass" component={ForgotPass} />
      <StackAuth.Screen name="Onboard" component={Onboard} />
    </StackAuth.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
