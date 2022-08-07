import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { MARGIN, COLORS, ICONS, FONTS, RADIUS, PADDING } from '../../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import Dialog from "react-native-dialog";
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios'

export class Splash extends React.Component {
    constructor() {
        super();
        this.state = {
            reviews: [{
                id: 1,
                profile_img: '',
                name: 'اسراء رضا',
                email: 'EsraaReda53',
                rate: 1,
                opinion: 'good'
            }, {
                id: 2,
                profile_img: '',
                name: 'عبدالرحمن عياد',
                email: 'abdelrahmanayad74',
                rate: 4,
                opinion: 'very talanted'
            }, {
                id: 3,
                profile_img: '',
                name: 'محمد مطحنه',
                email: 'Mohamed70',
                rate: 3,
                opinion: 'he do a great job'
            }, {
                id: 3,
                profile_img: '',
                name: 'عبدالرحمن الشازلى',
                email: 'abdelrahman37',
                rate: 2,
                opinion: 'he do a great job'
            }],
            visible: false,
            id: 0,
            profile_img: '',
            name: 'مروه السودانى',
            email: 'MarwaElsodany89',
            rate: 4,
            opinion: '',
            stars: [{
                id: 1,
                color: '#000',
                icon: 'staro',
                selected: false
            }, {
                id: 2,
                color: '#000',
                icon: 'staro',
                selected: false
            }, {
                id: 3,
                color: '#000',
                icon: 'staro',
                selected: false
            }, {
                id: 4,
                color: '#000',
                icon: 'staro',
                selected: false
            }, {
                id: 5,
                color: '#000',
                icon: 'staro',
                selected: false
            }]
        }
    }
    addReview() {
        let my_id = this.state.id
        let my_img = this.state.profile_img
        let my_name = this.state.name
        let my_email = this.state.email
        let my_rate = this.state.rate
        let my_opinion = this.state.opinion
        let obj = {}
        my_id = this.state.reviews.length + 1
        obj = {
            id: my_id,
            profile_img: my_img,
            name: my_name,
            email: my_email,
            rate: my_rate,
            opinion: my_opinion
        }
        let arr = this.state.reviews
        arr.push(obj)
        this.setState({ reviews: arr })

    }
    rating_fun(index) {
        let arr = this.state.stars
        for (let i = 0; i < arr.length; i = i + 1) {
            arr[i].selected = false
        }
        for (let i = 0; i < index; i = i + 1) {
            arr[i].selected = true
        }
        this.setState({ stars: arr })
    }
    render_rating() {
        return this.state.stars.map((item, index) => {
            return (
                <TouchableOpacity onPress={() => { this.setState({ rate: index + 1 }), this.rating_fun(index + 1) }}>
                    <AntDesign name={item.selected ? 'star' : 'staro'} size={20} color={item.selected ? '#FDCC0D' : '#000'} />
                </TouchableOpacity>
            )
        })

    }

    reviews() {
        return this.state.reviews.map((item, index) => {
            return (
                <View style={styles.review_container}>
                    <View style={styles.photoAndName}>
                        <View style={styles.photoView}>
                            {/* <Image
                      resizeMode="contain"
                      source={require('../assets/Images/profileImage.jpg')}
                      style={styles.imageStyle}
                    /> */}
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ fontSize: RFValue(12), fontWeight: 'bold', color: '#313131' }}>{item.name}</Text>
                            <View style={{ alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: RFValue(10) }}>{item.email}</Text>
                            </View>
                        </View>
                    </View>
                    {item.rate == 0 ?
                        <View style={{ flexDirection: 'row', paddingVertical: RFValue(PADDING.xsPadding) }}>
                            <View >
                                <AntDesign name='staro' size={RFValue(18)} color='#313131' />
                            </View>
                            <View >
                                <AntDesign name='staro' size={RFValue(18)} color='#313131' />
                            </View>
                            <View >
                                <AntDesign name='staro' size={RFValue(18)} color='#313131' />
                            </View>
                            <View >
                                <AntDesign name='staro' size={RFValue(18)} color='#313131' />
                            </View>
                            <View >
                                <AntDesign name='staro' size={RFValue(18)} color='#313131' />
                            </View>
                        </View> :
                        item.rate == 1 ?
                            <View style={{ flexDirection: 'row', paddingVertical: RFValue(PADDING.xsPadding) }}>
                                <View >
                                    <AntDesign name='star' size={RFValue(18)} color='#FDCC0D' />
                                </View>
                                <View >
                                    <AntDesign name='staro' size={RFValue(18)} color='#313131' />
                                </View>
                                <View >
                                    <AntDesign name='staro' size={RFValue(18)} color='#313131' />
                                </View>
                                <View >
                                    <AntDesign name='staro' size={RFValue(18)} color='#313131' />
                                </View>
                                <View >
                                    <AntDesign name='staro' size={RFValue(18)} color='#313131' />
                                </View>
                            </View> :
                            item.rate == 2 ?
                                <View style={{ flexDirection: 'row', paddingVertical: RFValue(PADDING.xsPadding) }}>
                                    <View >
                                        <AntDesign name='star' size={RFValue(18)} color='#FDCC0D' />
                                    </View>
                                    <View >
                                        <AntDesign name='star' size={RFValue(18)} color='#FDCC0D' />
                                    </View>
                                    <View >
                                        <AntDesign name='staro' size={RFValue(18)} color='#313131' />
                                    </View>
                                    <View >
                                        <AntDesign name='staro' size={RFValue(18)} color='#313131' />
                                    </View>
                                    <View >
                                        <AntDesign name='staro' size={RFValue(18)} color='#313131' />
                                    </View>
                                </View> :
                                item.rate == 3 ?
                                    <View style={{ flexDirection: 'row', paddingVertical: RFValue(PADDING.xsPadding) }}>
                                        <View >
                                            <AntDesign name='star' size={RFValue(18)} color='#FDCC0D' />
                                        </View>
                                        <View >
                                            <AntDesign name='star' size={RFValue(18)} color='#FDCC0D' />
                                        </View>
                                        <View >
                                            <AntDesign name='star' size={RFValue(18)} color='#FDCC0D' />
                                        </View>
                                        <View >
                                            <AntDesign name='staro' size={RFValue(18)} color='#313131' />
                                        </View>
                                        <View >
                                            <AntDesign name='staro' size={RFValue(18)} color='#313131' />
                                        </View>
                                    </View> :
                                    item.rate == 4 ?
                                        <View style={{ flexDirection: 'row', paddingVertical: RFValue(PADDING.xsPadding) }}>
                                            <View >
                                                <AntDesign name='star' size={RFValue(18)} color='#FDCC0D' />
                                            </View>
                                            <View >
                                                <AntDesign name='star' size={RFValue(18)} color='#FDCC0D' />
                                            </View>
                                            <View >
                                                <AntDesign name='star' size={RFValue(18)} color='#FDCC0D' />
                                            </View>
                                            <View >
                                                <AntDesign name='star' size={RFValue(18)} color='#FDCC0D' />
                                            </View>
                                            <View >
                                                <AntDesign name='staro' size={RFValue(18)} color='#313131' />
                                            </View>
                                        </View> :
                                        <View style={{ flexDirection: 'row', paddingVertical: RFValue(PADDING.xsPadding) }}>
                                            <View >
                                                <AntDesign name='star' size={RFValue(18)} color='#FDCC0D' />
                                            </View>
                                            <View >
                                                <AntDesign name='star' size={RFValue(18)} color='#FDCC0D' />
                                            </View>
                                            <View >
                                                <AntDesign name='star' size={RFValue(18)} color='#FDCC0D' />
                                            </View>
                                            <View >
                                                <AntDesign name='star' size={RFValue(18)} color='#FDCC0D' />
                                            </View>
                                            <View >
                                                <AntDesign name='star' size={RFValue(18)} color='#FDCC0D' />
                                            </View>
                                        </View>
                    }
                    <View style={{ height: RFValue(80), justifyContent: 'center' }}>
                        <Text style={{ fontSize: RFValue(15), color: "#313131" }}>{item.opinion}</Text>
                    </View>
                </View>

            )
        })
    }


    render() {
        axios
            .get(
                'https://generation3.000webhostapp.com/project/Training/photographer_list.php'
            )
            .then(res => {
                if (res.status == 200) {
                    console.log(res.data)
                }
            });
        return (
            <View style={styles.container}>
                <View style={{ height: 200 }}>
                    <ScrollView horizontal={true}>
                        <TouchableOpacity
                            style={[styles.review_container, { backgroundColor: '#eee', justifyContent: 'center' }]}
                            onPress={() => { this.setState({ visible: true }) }}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>+</Text>
                        </TouchableOpacity>
                        <Dialog.Container visible={this.state.visible}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                                {this.render_rating()}
                            </View>
                            <Dialog.Input placeholder='ادخل رأيك عنا' style={{ marginTop: 10 }} value={this.state.opinion} onChangeText={(value) => { this.setState({ opinion: value }) }} />
                            <Dialog.Button label="تم" onPress={() => { this.addReview(), this.setState({ visible: false }) }} />
                        </Dialog.Container>
                        {this.reviews()}
                    </ScrollView>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    review_container: {
        alignItems: 'center',
        marginHorizontal: RFValue(5),
        padding: RFValue(10),
        width: RFValue(165),
        height: RFValue(170),
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.smRadius
    },
    container: {
        flex: 1,
        paddingVertical: '5%'
    },
    photoAndName: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
    },
    photoView: {
        width: RFValue(40),
        height: RFValue(40),
        borderRadius: RFValue(20),
        marginRight: RFValue(10),
        borderWidth: RFValue(1)
    }

})