import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";


const ProfileScreen = (props) => {
  return (
    
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "Blog App", style: { color: "#fff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}
          />
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center",
              justifyContent: 'center',
          }}>
              <Avatar
                size="large"
                containerStyle={{ backgroundColor: "#ffab91" }}
                rounded
                icon={{ name: "user", type: "font-awesome", color: "black" }}
                activeOpacity={1}
                
              />
        
              
            </View>
            
            <Text style={{ paddingHorizontal: 10,paddingBottom:2 ,marginTop:10,size:20,textAlign:"center" }}>
              {auth.CurrentUser.displayName}
              </Text>
              {/* <Text style={{ paddingHorizontal: 10,paddingBottom:2 ,marginTop:0,size:20,textAlign:"center"  }}>
              Student ID : {auth.CurrentUser.sid}
              </Text> */}
              <Text style={{ paddingHorizontal: 10,paddingBottom:2 ,marginTop:0,size:20,textAlign:"center"  }}>
              Email : {auth.CurrentUser.email}
              </Text>
              <Text style={{ paddingHorizontal: 10,paddingBottom:2 ,marginTop:0,size:20,textAlign:"center"  }}>
              Born on : 9 February 1990
              </Text>
              <Text style={{ paddingHorizontal: 10,paddingBottom:2 ,marginTop:0,size:20,textAlign:"center" }}>
              Address : Dhaka
              </Text>
              <Text style={{ paddingHorizontal: 10,paddingBottom:2 ,marginTop:0,size:20,textAlign:"center" }}>
              Works at : IUT
              
              </Text>
            
          </Card>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default ProfileScreen;