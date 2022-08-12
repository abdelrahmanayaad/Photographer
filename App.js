// import React, {Component} from 'react';
// import {Dimensions, StyleSheet, Text, View} from 'react-native';
// import {COLORS, FONTS, ICONS, RADIUS, PADDING} from './src/constants';
// import GeneralButton from './src/components/GeneralButton';
// import Input from './src/components/Input';
// import Entypo from 'react-native-vector-icons/Entypo';
// import {ForgetPassword, Verification} from './src/screens';
// const {width, height} = Dimensions.get('window');
// import messaging from '@react-native-firebase/messaging';

// export class App extends Component {

//   componentDidMount(){
//     messaging()
//     .getToken()
//     .then(token => {
//         alert(token)
//         // setToken(token)

//     });


// return messaging().onTokenRefresh(token => {
//     // setToken(token)
//     console.log(token)

// });
//   }
//   render() {
//     return <ForgetPassword />;
//   }
// }
// const styles = StyleSheet.create({});
// export default App;



import React, { Component } from 'react';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
GoogleSignin.configure();

GoogleSignin.configure({

    androidClientId: '960653629673-fosk6ikk47hkktmbkiebdmdhn5apelvn.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER

})
export class LoginWithG extends Component {


    // signIn = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         alert(userInfo)
    //     } catch (error) {
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             // user cancelled the login flow
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             // operation (e.g. sign in) is in progress already
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             // play services not available or outdated
    //         } else {
    //             // some other error happened
    //         }
    //     }
    // };

    async SignIn() {



      try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          // console.log(JSON.stringify(userInfo))
          //  console.log(userInfo)
          // console.log(userInfo.user)
          let data_to_send = {
              user_name: userInfo.user.name,
              user_email: userInfo.user.email,
              user_password: "//**GOOGLE**//",
              user_phone: " ",
              user_token: "jfdbgjkfbgkjfbgkjfbgkjfdb",
              type: "GOOGLE"
          }

          alert(JSON.stringify(userInfo))

          // setUserGoogleInfo(userInfo)
          // //  console.log(userInfo)
          // setLoaded(true)
          // SendUser(data_to_send)
          // // save_Login_status(userInfo)
          // props.navigation.navigate('Restrunt')

      } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
              // console.log('play services not available or outdated')
          } else {
              // some other error happened
              // console.log("some other error happened" + error)
          }
      }
  }

    render() {
        return (
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this.SignIn}
                // disabled={this.state.isSigninInProgress}
            />
        )
    }
}
export default LoginWithG;
