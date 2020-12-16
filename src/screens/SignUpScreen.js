import React,{useState} from "react";
import {StyleSheet, View,ImageBackground} from "react-native";
import {Input, Button, Card} from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import * as firebase from "firebase";
import "firebase/firestore";

import { Entypo } from '@expo/vector-icons';

const SignUpScreen=(props)=>{
    console.log(props)

    const[Name,setName]=useState("");
    const[SID,setSID]=useState("");
    const[Email,setEmail]=useState("");
    const[Password,setPassword]=useState("");
    const[PhoneNumber,setPhoneNumber]=useState("");

  return(
    <View style={styles.viewstyle}>
        {/* <ImageBackground source={require("./../../assets/leaf.jpg")}></ImageBackground> */}
    <Card>
       <Card.Title> welcome</Card.Title>
       <Card.Divider/>

       <Input
       leftIcon={<Ionicons name="md-person" size={24} color="black" />}
       placeholder="Name"
       onChangeText={
           function(currentInput){
               setName(currentInput);

       }}

       />

       <Input
       placeholder="Student ID"
       leftIcon={<Ionicons name="ios-school" size={24} color="black" />}
       onChangeText={
        function(currentInput){
            setSID(currentInput);

    }}
       />

       <Input
       leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
       placeholder="Email Address"
       onChangeText={
        function(currentInput){
            setEmail(currentInput);

    }}
       />

       <Input
       placeholder="Password"
       leftIcon={<Ionicons name="md-key" size={24} color="black" />}
       secureTextEntry={true}
       onChangeText={
        function(currentInput){
            setPassword(currentInput);

    }}
       />

        <Input
       placeholder="PhoneNumber"
       leftIcon={<Entypo name="old-phone" size={24} color="black" />}
       
       onChangeText={
        function(currentInput){
            setPhoneNumber(currentInput);

    }}
       />

       <Button
       icon={<AntDesign name="user" size={24} color="white" />}
       title="  Sign up"
       type="solid"
       onPress={()=>{
           if(Name && SID && Email && Password && PhoneNumber){
               firebase
               .auth()
               .createUserWithEmailAndPassword(Email,Password)
               .then((userCreds)=>{
                   userCreds.user.updateProfile({displayName: Name})
                   firebase
                   .firestore()
                   .collection("users")
                   .doc(userCreds.user.uid)
                   .set({
                       name:Name,
                       sid: SID,
                       email: Email,
                       phoneNumber:PhoneNumber,

                   }).then(()=>{
                       alert("Account created successfully");
                       console.log(userCreds.user);
                       props.navigation.navigate("SignIn");
                       alert("UserID:" + userCreds.user.uid);
                   })
                   .catch((error)=>{
                       alert(error);
                   });
               })
               .catch((error)=>{
                   alert(error);
               });
           }
           else{
               alert("Fields can't be empty!");
           }
       }}
       />

       <Button
       type='clear'
       icon={<AntDesign name="login" size={24} color="dodgerblue" />}
       title="  Already have an account?"
       onPress={
           function(){
               props.navigation.navigate("SignIn");
           }
       }
      
       />
    </Card>
      
      

  </View>
  );
}

const styles = StyleSheet.create({
    viewstyle:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#4bacb8',
    },
    
    
});

export default SignUpScreen;