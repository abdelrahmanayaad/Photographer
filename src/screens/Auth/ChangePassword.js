{/*import * as React from 'react'
import {Text,StyleSheet,View, TextInput, TouchableOpacity,Image, StatusBar, ScrollView} from 'react-native'
import { Dimensions } from "react-native"
const { width, height } = Dimensions.get("screen")
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, FONTS, ICONS, PADDING, RADIUS} from '../../constants';
import GeneralButton from '../../components/GeneralButton'
import Input from '../../components/Input';
import {RFValue} from 'react-native-responsive-fontsize';




export default class App extends React.Component{
    constructor(props){
        super();
        this.state={
             old_password:"1234567",
             check_old_pass:"",
             text_check_old_pass:"",
             text_check_old_pass_text_color:"",
             new_password:"",
             new_password_msg:"",
             new_password_msg_color:"",
             confirm_new_password:"",
             confirm_new_password_msg:"",
             confirm_new_password_msg_color:""
             
             
        }
    
    }
    
    old_pass_matches_endtyping(){
        if(this.state.old_password==this.state.check_old_pass){
            this.setState({text_check_old_pass:"كلمه المرور مطابقه لكلمه المرور الحاليه",text_check_old_pass_text_color:COLORS.success})
        }else if(this.state.old_password!=this.state.check_old_pass&&this.state.check_old_pass.length>0){
            this.setState({text_check_old_pass:" كلمه المرور غير مطابقه لكلمه المرور الحاليه" ,text_check_old_pass_text_color:COLORS.error})

        }else{
            this.setState({text_check_old_pass:"",text_check_old_pass_text_color:""})
 
        }

    }
    new_password_check(){
        if(this.state.new_password.length>=6&&this.state.new_password!=this.state.old_password){
            this.setState({new_password_msg:"كلمه المرور الجديده قويه",new_password_msg_color:COLORS.success})
        }else if(this.state.new_password.length>=6&&this.state.new_password==this.state.old_password){
            this.setState({new_password_msg:"كلمه المرور الجديده يجب ان تكون مختلفه عن الحاليه",new_password_msg_color:COLORS.error})
        }else if(this.state.new_password.length>0&&this.state.new_password.length<6){
            this.setState({new_password_msg:"يجب ان تحتوي كلمه المرور علي 6 احرف علي الاقل",new_password_msg_color:COLORS.error})
        }else{
            this.setState({new_password_msg:"",new_password_msg_color:""})

        }
    }
    confirm_password(){
        if(this.state.new_password.length>0&&this.state.confirm_new_password.length>0&&this.state.confirm_new_password==this.state.new_password){
            if(this.state.confirm_new_password!=this.state.old_password&&this.state.new_password!=this.state.old_password&&this.state.new_password.length>=6&&this.state.confirm_new_password.length>=6){
                  this.setState({confirm_new_password_msg:"كلمه المرور متطابقه",confirm_new_password_msg_color:COLORS.success})
            }else if(this.state.confirm_new_password==this.state.old_password||this.state.new_password==this.state.old_password){
                this.setState({confirm_new_password_msg:"كلمه المرور الجديده يجب ان تكون مختلفه عن الحاليه",confirm_new_password_msg_color:COLORS.error})
            }else if(this.state.confirm_new_password!=this.state.old_password&&this.state.new_password!=this.state.old_password&&this.state.new_password.length<6&&this.state.confirm_new_password.length<6){
                this.setState({confirm_new_password_msg:"كلمه المرور يجب ان تحتوي علي 6 احرف علي الاقل",confirm_new_password_msg_color:COLORS.error})
            }
        }else if(this.state.confirm_new_password.length>0&&this.state.confirm_new_password!=this.state.new_password){
            this.setState({confirm_new_password_msg:"كلمه المرور غير متطابقه",confirm_new_password_msg_color:COLORS.error})

        }else{
            this.setState({confirm_new_password_msg:"",confirm_new_password_msg_color:""})
        } 

    }
    
  render(){
   return( 
    <View style={styles.main_view_style}>
        <ScrollView>
        <StatusBar
         backgroundColor={COLORS.background}        
        />
        <View style={styles.header_viewstyle}>
            <TouchableOpacity style={styles.right_arrow_button_style}>
               <AntDesign name="arrowright" size={ICONS.xlIcon} color={COLORS.gray}/>
           </TouchableOpacity>  
          <View style={styles.view_for_text_in_header_style}>
            <Text style={styles.text_header_style}>تغيير كلمه السر</Text>
          </View>
                    
        </View>
        
        <View style={{alignItems:'center'}}>
        
        <View style={styles.each_textinput_viewstyle}>
                     <Input placeholder="كلمه السر القديمه " 
                     check_old_pass={this.state.check_old_pass}
                     onChangeText={(value)=>{this.setState({check_old_pass:value})}} onBlur={()=>{this.old_pass_matches_endtyping()}}
                     />
            <Text style={{color:this.state.text_check_old_pass_text_color}}>{this.state.text_check_old_pass}</Text>
        </View>
        <View style={styles.each_textinput_viewstyle}>
             <Input placeholder="كلمه السر الجديده"
             new_password={this.state.new_password}
             onChangeText={(value)=>{this.setState({new_password:value})}}
             onBlur={()=>{this.new_password_check()}}
             />
            <Text style={{color:this.state.new_password_msg_color}}>{this.state.new_password_msg}</Text>
        </View>
        <View style={styles.each_textinput_viewstyle}>
            <Input placeholder="تاكيد كلمه السر الجديده"
            confirm_new_password={this.state.confirm_new_password}
            onChangeText={(value)=>{this.setState({confirm_new_password:value})}}
            onBlur={()=>{this.confirm_password()}}
            />
            <Text style={{color:this.state.confirm_new_password_msg_color}}>{this.state.confirm_new_password_msg}</Text>
        </View>
        <GeneralButton
        title={"غير كلمه السر"}
         bgcolor={COLORS.primary}/>
         </View>
         </ScrollView>

    </View>
    )
  }
}
//3
const styles=StyleSheet.create({
main_view_style:{
    height:height,
    width:'100%',
    backgroundColor:COLORS.background
},
text_header_style:{
    fontSize:RFValue(FONTS.h4),
    fontWeight:"bold",
    color:COLORS.black,
    marginLeft:'15%'
},
header_viewstyle:{
    flexDirection:'row',
    height:height*.07,
    alignItems:'center',
    marginBottom:height*.04,
    width:'70%',
    justifyContent:'space-around',
    marginLeft:'2%'
},
each_textinput_viewstyle:{
    marginBottom:height*.02
},text_style:{
    color:COLORS.gray,
    fontSize:RFValue(FONTS.h3)
},right_arrow_button_style:{
    height:'60%',
    width:"20%",
    alignItems:'center',
    justifyContent:'center'
},view_for_text_in_header_style:{
    width:'50%',
    marginRight:'5%',
    alignItems:'center',
    justifyContent:'center'
}
}

)*/}

import * as React from 'react'
import { View, Text } from 'react-native'
export default class Login extends React.Component{
    render(){
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text>Hello</Text>
            </View>
        )
    }
}