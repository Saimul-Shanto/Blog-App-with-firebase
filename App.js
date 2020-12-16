import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import SignInScreen from "./src/screens/SignIn";
import SignUpScreen from "./src/screens/SignUpScreen";

import * as firebase from "firebase";

import {AuthContext,AuthProvider} from "./src/providers/AuthProvider";
import NotificationScreen from "./src/screens/NotificationScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import PostScreen from "./src/screens/PostScreen";


const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();




const firebaseConfig = {
  apiKey: "AIzaSyCA1pbwwVlj5ErggAZ3OVfBZh8Mq04wajU",
  authDomain: "blog-55504.firebaseapp.com",
  databaseURL: "https://blog-55504.firebaseio.com",
  projectId: "blog-55504",
  storageBucket: "blog-55504.appspot.com",
  messagingSenderId: "649162534789",
  appId: "1:649162534789:web:3a9ca27d74fd1e58321eec"
};
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}






const AppDrawerScreen=()=>{
  return(
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Home" component={HomeTabScreen}></AppDrawer.Screen>
      <AppDrawer.Screen name="Profile" component={ProfileScreen}></AppDrawer.Screen>
      {/* <AppDrawer.Screen name="Post" component={PostScreen}></AppDrawer.Screen> */}

    </AppDrawer.Navigator>
  );
  

};

const HomeTabScreen=()=>{
  return(
    <HomeTab.Navigator initialRouteName="Home">
      <HomeTab.Screen name="Home" component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" color="white" size={26} />
            ) : (
              <AntDesign name="home" color="white" size={22} />
            ),
        }}
      
      
      
      />
      <HomeTab.Screen name="Notification" component={NotificationScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="ios-notifications" size={26} color="white" />
            ) : (
              <Ionicons
                name="ios-notifications-outline"
                size={22}
                color="white"
              />
            ),
        }}
      
      />
    </HomeTab.Navigator>
  );

};

const AuthStackScreen=()=>{
  return(
    <AuthStack.Navigator initialRouteName="SignIn">
      <AuthStack.Screen name="SignIn" component={SignInScreen} options={{headerShown:false}}/>
      <AuthStack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}}/>
    </AuthStack.Navigator>
  );
};

function App(){
  return(
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth)=>(
          <NavigationContainer>
          {auth.IsLoggedIn ? <AppDrawerScreen/> : <AuthStackScreen/>}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;


