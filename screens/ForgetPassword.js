import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  
  const navigation = useNavigation();

  const handleforget = () =>{
    navigation.navigate('ForgetPassword');
  }

  

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://192.168.1.4:8000/forgot-password', { email });

      if (response.status === 200) {
        Alert.alert('Success', response.data.message);
        console.log("tai")
        navigation.navigate('Login')
      } else {
        Alert.alert('Error', response.data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{width: 300, height: 150, marginTop: 20}}
          source={{
            uri: 'https://res.klook.com/image/upload/q_85/c_fill,w_750/v1692178730/nzwespti6zcfe6h3ljwy.jpg',
          }}
        />
        <Text
          style={{
            marginTop: 10,
            fontWeight: '900',
            fontSize: 40,
            color: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          MUSEUM
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            marginTop: 30,
            color: '#041E42',
          }}>
          Nhập Email với tài khoản của bạn
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#D0D0D0',
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}>
            <MaterialCommunityIcons
              style={{marginLeft: 8}}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              placeholder="Nhập email"
            />
          </View>
        </View>

        

        

        <View style={{marginTop: 50}} />

        <Pressable
          style={{
            width: 200,
            backgroundColor: '#428bca',
            borderRadius: 6,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 15,
          }}
          onPress={handleForgotPassword}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Quên mật khẩu
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Register')}
          style={{marginTop: 15}}>
          <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
            {' '}
            Trở về trang đăng nhập
          </Text>
        </Pressable>

        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({});
