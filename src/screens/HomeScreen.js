import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
} from "react-native";
import {
  Card,
  Button,
  Text,
  Avatar,
  Input,
  Header,
} from "react-native-elements";
import PostCard from "./../components/PostCard";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";

import {useNetInfo} from "@react-native-community/netinfo";

import {storeDataJSON} from "../functions/AsyncStorageFunctions";
import {getDataJSON} from "../functions/AsyncStorageFunctions";
import * as firebase from "firebase";
import "firebase/firestore";

const HomeScreen = (props) => {

  const netinfo = useNetInfo();
  if(netinfo.type!="unknown" && !netinfo.isInternetReachable){
    alert("No Internet");
  }
  const [posts, setPosts] = useState("");
  const [loading, setLoading] = useState(false);
  const [input,setInput] = useState("");
  const [data, setData] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    firebase.firestore().collection("post").orderBy("created_at","desc")
    .onSnapshot((querySnapshot)=>{
      let temp_posts = []
      querySnapshot.forEach((doc)=>{
        temp_posts.push({
          id : doc.id,
          data : doc.data(),
        });
      });
      setPosts(temp_posts);
      setLoading(false);
    }).catch((error)=>{
      setLoading(false);
      alert(error);
    });
  };
  
 
  useEffect(() => {
    loadPosts();
  }, []);

  if (!loading) {
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
            
              <Input
                multiline
                placeholder="What's On Your Mind?"
                onChangeText={(currentText)=>{
                  setInput(currentText)}}

              
                leftIcon={<Entypo name="pencil" size={24} color="black" />}
              />
              <Button title="Post" type="outline" onPress={function(){
                setLoading(true);
                firebase.firestore().collection("post").add({
                  userId: auth.CurrentUser.uid,
                  body:input,
                  author: auth.CurrentUser.displayName,
                  created_at: firebase.firestore.Timestamp.now(),
                  likes:[],
                  comments:[],
                }).then(()=>{
                  setLoading(false);
                  alert("PostId : " + auth.CurrentUser.uid);
                }).catch((error)=>{
                  setLoading(false);
                  alert(error);
                });               
              }} />
            </Card>
            <FlatList
              data={posts}
              renderItem = {function ({item}){
                return ( 
                  <PostCard
                  
                    author={item.data.author}
                    //title={item.title} 
                    
                    body={item.data.body}
                  />
                );
              }}
            />
          </View>
        )}
      </AuthContext.Consumer>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#338AFF" animating={true} />
      </View>
    );
  }
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

export default HomeScreen;