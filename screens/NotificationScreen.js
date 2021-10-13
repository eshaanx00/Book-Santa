import React, { Component } from 'react'
import {View,StyleSheet,Text,FlatList} from 'react-native'
import firebase from 'firebase'
import {ListItem,Icon} from 'react-native-elements'
import MyHeader from '../components/MyHeader'
import db from '../config'

export default class NotificationScreen extends Component {
    constructor(){
        super()
        this.state={
            allNotifications:[],
            userId:firebase.auth().currentUser.email,
        }
        this.notificationRef = null
    }
    getNotifications=()=>{
        this.requestRef = db.collection("all_notifications").where("notification_status" ,'==', "unread")
        .where("targeted_user_id",'==',this.state.userId)
        .onSnapshot((snapshot)=>{
            var allNotifications = []
            snapshot.docs.map((doc) => {var notification = doc.data()
            notification["doc_id"]=doc.id
            allNotifications.push(notification)
            });
            this.setState({
            allNotifications:allNotifications,
            });
        })
    }
    componentDidMount() {
        this.getNotifications()
    }
    componentWillUnmount() {
        this.notificationRef()
    }
    keyExtractor=(item,index) => index.toString()
    renderItem=({item,index}) => {
        return(
            <ListItem
            key={index}
            title={item.book_name}
            subtitle={"Requested By : " + item.requested_by +"\nStatus : " + item.request_status}
            leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            bottomDivider
        />
        )
    }
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:0.1}}>
                    <MyHeader title={"Notifications"} navigation={this.props.navigation}></MyHeader>
                </View>
                <View style={{flex:0.9}}>
                    {this.state.allNotifications.length===0?(
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:25}}>You Have No Notifications</Text>
                        </View>
                    ):(
                        <FlatList keyExtractor={this.keyExtractor} data={this.state.allNotifications} renderItem={this.renderItem}></FlatList>
                    )}
                </View>
            </View>
        )
    }
}
