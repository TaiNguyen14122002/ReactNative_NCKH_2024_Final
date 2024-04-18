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
import React, {useEffect,useContext, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserType} from '../UserContext';

const LoginScreen = () => {
  
  const [password, setPassword] = useState('');
  const [ComfirmPassword, setComfirmPassword] = useState('');
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);
  

  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.4:8000/profile/${userId}`,
        );
        const {user} = response.data;
        setUser(user);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchUserProfile();
  }, []);
  


  
  const handleEdit = () => {
    if (!password || !ComfirmPassword) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    
    if (password !== ComfirmPassword) {
      Alert.alert('Mật khẩu không khớp');
      return;
    }
  
    const userData = {
      Email: user?.Email,
      password: password,
      confirmPassword: ComfirmPassword, // Change to match backend field name
    };
  
    axios
      .post('http://192.168.1.4:8000/changepassword', userData)
      .then(response => {
        console.log("TTT")
        console.log(response.data.message); // Output success message from server
        Alert.alert(response.data.message);
        navigation.navigate('Main');

      })
      .catch(error => {
        console.error('There was a problem with your Axios request:', error);
        if (error.response && error.response.data) {
          console.error('Server error message:', error.response.data);
        }
        Alert.alert('Đã xảy ra lỗi khi đổi mật khẩu');
      });
  };
  
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        {/* <Image
            style={{width: 300, height: 150, marginTop: 20}}
            source={{
              uri: 'https://res.klook.com/image/upload/q_85/c_fill,w_750/v1692178730/nzwespti6zcfe6h3ljwy.jpg',
            }}
          /> */}
        <Text
          style={{
            marginTop: 50,
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
          Đổi mật khẩu của bạn
        </Text>
      </View>
      <KeyboardAvoidingView>
        

        <View style={{marginTop: 0}}>
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
            <AntDesign
              style={{marginLeft: 8}}
              name="lock"
              size={24}
              color="gray"
            />
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="Nhập mật khẩu mới"
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
            <AntDesign
              style={{marginLeft: 8}}
              name="lock"
              size={24}
              color="gray"
            />
            <TextInput
              
              onChangeText={text => setComfirmPassword(text)}
              secureTextEntry={true}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: ComfirmPassword ? 16 : 16,
              }}
              placeholder="Nhập lại mật khẩu mới"
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
          onPress={handleEdit}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Đổi mật khẩu
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
