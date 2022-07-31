import {Text, View,StyleSheet,TouchableOpacity,Image,ScrollView} from 'react-native';
import React, {Component} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {
  COLORS,
  FONTS,
  ICONS,
  PADDING,
  RADIUS,
  IconsView,
} from '../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {MARGIN} from '../constants';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      highlights:[{
        id:1,
        img:require('../assets/Images/photo.jpg'),
      },{
      id:2,
      img:require('../assets/Images/photo.jpg'),
     },{
      id:3,
      img:require('../assets/Images/photo.jpg'),
     },{
      id:4,
      img:require('../assets/Images/photo.jpg'),
     },{
      id:5,
      img:require('../assets/Images/photo.jpg'),
     },{
      id:6,
      img:require('../assets/Images/photo.jpg'),
     },{
      id:7,
      img:require('../assets/Images/photo.jpg'),
     }
  ],posts:[{
    id:1,
    profile_img:require('../assets/Images/photo.jpg'),
    post_img:require('../assets/Images/post.jpg'),
    name:"اسراء الجز",
    email:"esraaelgiz",
    favourite:false,
    saved:false

  },{
    id:2,
    profile_img:require('../assets/Images/photo.jpg'),
    post_img:require('../assets/Images/post2.jpg'),
    name:"مروه السوداني",
    email:"marwaelsodany",
    discribtion:"",
    favourite:false,
    saved:false

  },{
    id:3,
    profile_img:require('../assets/Images/photo.jpg'),
    post_img:require('../assets/Images/post.jpg'),
    name:"اسراء الجز",
    email:"esraaelgiz",
    discribtion:"",
    favourite:false,
    saved:false
  }
]
    }
  }
  favouritepress(item,index){
    let posts_arr=this.state.posts
    let fav=posts_arr[index].favourite
    posts_arr[index].favourite=!posts_arr[index].favourite
    this.setState({fav:!fav})

  }
  savedpress(item,index){
    let posts_arr=this.state.posts
    let save=posts_arr[index].saved
    posts_arr[index].saved=!posts_arr[index].saved
    this.setState({save:!save})

  }
  renderhighlights(){
    return this.state.highlights.map((item,index)=>{
      return(
        <TouchableOpacity style={{width:RFValue(60),height:RFValue(60),borderRadius:RFValue(RADIUS.xlRadius),marginHorizontal:RFValue(5)}}>
                 <Image source={item.img} style={{width:"100%",height:"100%",borderRadius:RFValue(RADIUS.xlRadius)}}/>
        </TouchableOpacity>
      )

    })
  }
  renderposts(){
    return this.state.posts.map((item,index)=>{
      return(
        <View style={styles.view_for_each_post_style}>
                        <View style={styles.view_for_profilenameandimg_in_each_post}>
                             <TouchableOpacity style={styles.button_of_img_in_the_header_of_each_post_style}>
                                   <Image source={item.profile_img} style={styles.img_in_the_header_of_each_post_style}/>
                               </TouchableOpacity>
                        <View>
                          <View>
                          <Text style={{fontSize:FONTS.h4,fontWeight:'bold'}}>{item.name}</Text>
                          </View>
                          <View>
                          <Text >منذ دقيقه واحدة</Text>
                          </View>
                         
                         
                        </View>
                        </View>
                        
                        <View style={styles.view_for_img_in_post_style}>
                              <Image source={item.post_img} style={styles.img_in_post_style} />
                         </View>
                        <View style={styles.view_for_icons_in_post_style}>
                            <TouchableOpacity onPress={()=>{this.favouritepress(item,index)}} >
                              {item.favourite==false? <AntDesign name="hearto" color={COLORS.gray} size={ICONS.lIcon}  />: <AntDesign name="heart" color={COLORS.primary} size={ICONS.lIcon}  />}
                            </TouchableOpacity>
                            <TouchableOpacity >
                              <FontAwesome name="comment-o" color={COLORS.gray} size={ICONS.lIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.savedpress(item,index)}}>
                              <FontAwesome name="bookmark" color={item.saved==true?COLORS.primary:COLORS.gray} size={ICONS.lIcon} />
                             </TouchableOpacity>
                         </View>
                         <View>
                          <Text>{item.discribtion}</Text>
                         </View>
                         

                         </View>

      )
    })
  }
  render() {
    return (
      <View style={styles.main_view_style}>
        <View style={styles.header}>
                       
                        <View style={{width:'12%',backgroundColor:"#0f0"}}></View>
                        <View style={{width:"65%",alignItems:'center',justifyContent:'center'}}>
                        <Text style={styles.titleStyle}>الصفحة الرئيسية</Text>
                        </View>
                        <View style={{width:'18%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginRight:RFValue(MARGIN.xsMargin)}}>
                        <TouchableOpacity >
                            <EvilIcons name="camera" color={COLORS.gray} size={ICONS.xlIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <EvilIcons name="heart" color={COLORS.gray} size={ICONS.xlIcon} />
                        </TouchableOpacity>
                        </View>
          </View>
                    <ScrollView>
                  <View >
                       <ScrollView horizontal={true}>
                          <View style={styles.highlight_view_style}>
                          <TouchableOpacity style={styles.add_highlight_button_style}>
                             <AntDesign name='plus' size={ICONS.mIcon} />
                           </TouchableOpacity>
                          
                               {this.renderhighlights()}

                          </View>
                       </ScrollView>
                       
                              <View>
                                {this.renderposts()}
                              </View>
                    </View>
                </ScrollView>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  main_view_style:{
    width:'100%'
    ,marginBottom:height*.1

  },
  header:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    margin: RFValue(MARGIN.xsMargin),
    marginBottom:RFValue(20)
    
  },
  titleStyle: {
    fontSize: RFValue(FONTS.h3),
    color: COLORS.black,
    fontWeight: 'bold',
  },highlight_view_style:{
    width:'100%',
    flexDirection:'row',
    //marginBottom:RFValue(MARGIN.xsMargin)


  },add_highlight_button_style:{
    width:RFValue(60),
    height:RFValue(60),
    alignItems:'center',
    justifyContent:'center',
    borderRadius:RFValue(RADIUS.xlRadius),
    marginLeft:RFValue(MARGIN.xsMargin),
    marginRight:RFValue(5),
    backgroundColor:"#ddd",
  },each_highlight_style:{
    width:RFValue(60),
    height:RFValue(60),
    borderRadius:RFValue(RADIUS.xlRadius),
    marginHorizontal:RFValue(5)
  },each_img_in_highlight_style:{
    width:"100%",
    height:"100%",
    borderRadius:RFValue(RADIUS.xlRadius)
  },view_for_each_post_style:{
    marginTop:RFValue(MARGIN.xsMargin),
    marginRight:RFValue(MARGIN.xsMargin),
    marginLeft:RFValue(MARGIN.xsMargin),
    //height:RFValue(330),
    
  
  },view_for_profilenameandimg_in_each_post:{
    flexDirection:'row',
    marginBottom:RFValue(10),
    alignItems:'center',
    
  },button_of_img_in_the_header_of_each_post_style:{
    width:RFValue(60),
    height:RFValue(60),
    borderRadius:RFValue(RADIUS.xlRadius),
    marginRight:'5%'
  },img_in_the_header_of_each_post_style:{
    width:"100%",
    height:"100%",
    borderRadius:RFValue(RADIUS.xlRadius)
  },view_for_img_in_post_style:{
    width:'100%',
    height:RFValue(200)
    //height:'63%',
   , marginBottom:RFValue(MARGIN.xsMargin),
   //marginBottom:'4%'
   
    
    
  },img_in_post_style:{
    height:"100%",
    width:"100%",
    borderRadius:RFValue(RADIUS.xsRadius)
  },view_for_icons_in_post_style:{
    width:'35%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  }
});
export default HomeScreen;
