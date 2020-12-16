import React,{useState} from "react";
import {StyleSheet, View} from "react-native";
import {Input, Button, Card} from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import {AuthContext} from "../providers/AuthProvider";

import {getDataJSON} from "../functions/AsyncStorageFunctions";

import * as firebase from "firebase";

const SignInScreen=(props)=>{
    console.log(props)
    const[Email,setEmail]=useState("");
    const[Password,setPassword]=useState("");
  return(
    <AuthContext.Consumer>
    {(auth)=>(<View style={styles.viewstyle}>
      <Card>
         <Card.Title> welcome</Card.Title>
         <Card.Divider/>
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

         <Button
         icon={<AntDesign name="login" size={24} color="white" />}
         title="  Sign in"
         type="solid"
         onPress={()=>{
           firebase.auth().signInWithEmailAndPassword(Email,Password).
           then((userCreds)=>{
             auth.setIsLoggedIn(true);
             auth.setCurrentUser(userCreds.user);

           })
           .catch((error)=>{
             alert(error);
           });
         }
           }
         />

         <Button
         type='clear'
         icon={<AntDesign name="user" size={24} color="dodgerblue" />}
         title="  Don't have an account?"
         onPress={
             function(){
                 props.navigation.navigate("SignUp");
                
             }
         }
        
         />
      </Card>
        
        

    </View>)}
    </AuthContext.Consumer>
  );
}

const styles = StyleSheet.create({
    viewstyle:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#4bacb8',
    },
    
    
});

export default SignInScreen;