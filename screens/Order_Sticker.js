import {
  Animated,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Mic from 'react-native-vector-icons/Entypo';
import {SliderBase} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import axios from 'axios';
import ProductItem from '../components/ProductItem';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AddAddressScreen from './AddAddressScreen';
import {UserType} from '../UserContext';
import {BottomModal, SlideAnimation, ModalContent} from 'react-native-modals';
import Location from 'react-native-vector-icons/Entypo';
import HandleMap from './HandleMap';
import Ticketiem from '../components/Ticketitem'
const Order_Sticket = () => {
  const HandleYourOrder = () => {
    navigation.navigate('Select_ticket');
  };

  const [Ticket, setTicket] = useState([]);
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType)
  const products_2 = [
    {
      id: '1',
      ticket_Name: 'Vé trẻ em',
      Note: 'Dành cho trẻ em dưới 10 tuổi',
      Price: 25000,
      image:
        'https://halotravel.vn/wp-content/uploads/2020/11/bao-tang-dan-toc-hoc-viet-nam-8.jpg',
    },
    {
      id: '2',
      ticket_Name: 'Vé người lớn',
      Note: 'Dành cho người lớn',
      Price: 50000,
      image:
        'https://halotravel.vn/wp-content/uploads/2020/11/bao-tang-dan-toc-hoc-viet-nam-8.jpg',
    },
    {
      id: '3',
      ticket_Name: 'Vé sinh viên',
      Note: 'Dành cho học sinh, sinh viên',
      Price: 20000,
      image:
        'https://halotravel.vn/wp-content/uploads/2020/11/bao-tang-dan-toc-hoc-viet-nam-8.jpg',
    },
    {
      id: '4',
      ticket_Name: 'Vé ưu tiên',
      Note: 'Dành cho người có công với cách mạng',
      Price: 20000,
      image:
        'https://halotravel.vn/wp-content/uploads/2020/11/bao-tang-dan-toc-hoc-viet-nam-8.jpg',
    },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://192.168.1.4:8000/Tickets`);
        const orders = response.data;
        setTicket(orders);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  return (
    <>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === 'android' ? 0 : 0,
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View>
          <ScrollView style={{}}>
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
              }}></View>

            <View
              style={{
                padding: 10,
              }}>
              <Text style={{fontSize: 30, color: 'black', fontWeight: 'bold'}}>
                Đặt vé tham quan
              </Text>
              <View style={{marginTop: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      padding: 5,
                      fontSize: 16,
                      fontWeight: '800',
                      color: 'red',
                    }}>
                    !Note:
                  </Text>
                  <Text
                    style={{
                      padding: 5,
                      fontSize: 14,
                      fontWeight: '800',
                      color: 'blue',
                    }}>
                    Xin vui lòng chọn loại vé phù hợp với lứa tuổi
                  </Text>
                </View>

                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 16,
                    fontWeight: '800',
                    color: '#ccc',
                    marginBottom: 20,
                  }}
                  onPress={HandleYourOrder}>
                  👉👉Tham khảo cách chọn loại vé👈👈
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
              }}>
              <Pressable
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#0098FF',
                  borderRadius: 5,
                  paddingBottom: 10,
                  
                }}>
                  {products_2.map((item, index) => 
                (
                <Ticketiem item={item} key={index} />
              ))}
                </Pressable>
                

              
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Order_Sticket;

const styles = StyleSheet.create({});
