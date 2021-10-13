import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { ListItem,Card,Header,Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class ReceiverDetailsScreen extends Component{
    constructor(){
      super();
      this.state={
        userId:firebase.auth().currentUser.email,
        receiverId:this.props.navigation.getParam('details')["user_id"],
        bookName:this.props.navigation.getParam('details')["book_name"],
        reason_for_requesting:this.props.navigation.getParam('details')["reason_to_requesting"],
        requestId:this.props.navigation.getParam('details')["request_id"],
        receiverName:'',
        receiverContact:'',
        receiverAddress:'',
        receiverRequestDocId:'',
      }
    }
    updateBookStatus=()=>{
      db.collection('all_donations').add({
        book_name:this.state.booName,
        request_id:this.state.requestId,
        request_by:this.state.receiverName,
        donor_id:this.state.userId,
        request_status:'Donor Interested',
      })
    }
    componentDidMount(){
      this.getReceiverDetails()
    }
    getReceiverDetails=()=>{
      db.collection("users").where('emailId','==',this.state.receiverId).get()
      .then(snap=>{
        snap.forEach(doc=>{
          this.setState({
            receiverName:doc.data().first_name,
            receiverContact:doc.data().contact,
            receiverAddress:doc.data().address
          })
        })
      })
      db.collection("requested_books").where("request_id",'==',this.state.requestId).get()
      .then(snap=>{
        snap.forEach(doc=>{
          this.setState({
            receiverRequestDocId:doc.id
          })
        })
      })
    }
    render(){
      return(
        <View style={styles.container}>
          <View style={{flex:0.1}}>
            <Header leftComponent={<Icon name="arrow-left" type="feather" color="#696969" onPress={()=>{this.props.navigation.goBack()}}></Icon>}
            centerComponent={{text:"Donate Books",style:{color:'#90a5a9',fontSize:20,fontWeight:'bold'}}}
            backgroundColor="#eaf8fe"
            ></Header>
          </View>
          <View style={{flex:0.3}}>
          <Card title={"Book Information"} titleStyle={{fontSize:20}}>
            <Card><Text style={{fontWeight:'bold'}}>Name:{this.state.bookName}</Text></Card>
            <Card><Text style={{fontWeight:'bold'}}>Reason:{this.state.reason_for_requesting}</Text></Card>
          </Card>
          </View>
          <View style={{flex:0.3}}>
          <Card title={"Receiver Information"} titleStyle={{fontSize:20}}>
            <Card><Text style={{fontWeight:'bold'}}>Name:{this.state.receiverName}</Text></Card>
            <Card><Text style={{fontWeight:'bold'}}>Contact:{this.state.receiverContact}</Text></Card>
            <Card><Text style={{fontWeight:'bold'}}>Address:{this.state.receiverAddress}</Text></Card>
          </Card>
          </View>
          <View style={styles.buttonContainer}>
            {
              this.state.receiverId !== this.state.userId
              ?(
                <TouchableOpacity style={styles.button} onPress={()=>{this.updateBookStatus(), this.props.navigation.navigate('MyDonations')} }>
                  <Text>I Want To Donate</Text></TouchableOpacity>
              ):null
            }
          </View>
        </View>
      )
    }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  }
})
