import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // send a post request to the backend API
    axios
      .post('http://192.168.1.4:8000/register', user)
      .then(message => {
        console.log(message);
        Alert.alert('Thông báo', 'Đăng ký tài khoản thành công');
        setName('');
        setEmail('');
        setPassword('');
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert('Lỗi', 'Đăng ký tài khoản thất bại');
        console.log('registration failed', error);
        console.log(name, email, password);
      });
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
            marginTop: 10,
            color: '#041E42',
          }}>
          Đăng ký tài khoản của bạn
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
            <Entypo
              style={{marginLeft: 8}}
              name="user"
              size={24}
              color="gray"
            />
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: name ? 16 : 16,
              }}
              placeholder="Nhập tên người dùng"
            />
          </View>
        </View>

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
            <Entypo
              style={{marginLeft: 8}}
              name="lock"
              size={24}
              color="gray"
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="Nhập Password"
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text>Lưu thông tin</Text>
        </View>

        <View style={{marginTop: 20}} />

        <Pressable
          onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: '#428bca',
            borderRadius: 6,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 15,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Đăng ký
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={{marginTop: 15}}>
          <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
            Bạn đã có tài khoản ? Đăng nhập
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
