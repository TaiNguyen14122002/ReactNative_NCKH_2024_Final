import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {UserType} from '../UserContext';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {cleanCart} from '../redux/CartReducer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Alert} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {equestBillingAgreement} from 'react-native-paypal';
import {requestOneTimePayment} from 'react-native-paypal';
import DocCircCleO from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Calendar} from 'react-native-calendars';
import {Button} from 'react-native';

const ConfirmationScreen = () => {
  const steps = [
    {title: 'Nhập Mail', content: 'Mail'},
    {title: 'Chọn thời gian', content: 'DataTime'},
    {title: 'Thanh toán', content: 'Payment'},
  ];
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const handleDayPress = day => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [email, setEmail] = useState('');
  const {userId, setUserId} = useContext(UserType);
  const cart = useSelector(state => state.cart.cart);
  const handleSave = () => {
    // Handle saving the selected date
    console.log('Selected date:', selectedDate);
    setCurrentStep(2)
  };

  const total = cart
    ?.map(item => item.Price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const formattedTotal = total?.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }); // Đổi 'VND' nếu đơn vị tiền tệ khác

  const amountInCent = parseInt(parseFloat(formattedTotal) * 100);

  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.4:8000/addresses/${userId}`,
      );
      const {addresses} = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log('error', error);
    }
  };
  // const fetchAddresses = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://192.168.1.4:8000/mail/${userId}`,
  //     );
  //     const {mail} = response.data;

  //     setAddresses(mail);
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAdress] = useState('');
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const Mail = () => {
    console.log(email);
    setCurrentStep(1)
  };
  console.log(cart);
  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        totalPrice: amountInCent * 10,
        // shippingAddress: selectedAddress,
        Mail: email,
        DateTime: selectedDate,
        paymentMethod: selectedOption,
        cartItems: cart,
      };
      console.log('orderData:', orderData);

      const response = await axios.post(
        'http://192.168.1.4:8000/orders',
        orderData,
      );
      if (response.status === 200) {
        navigation.navigate('Order');
        dispatch(cleanCart());
        console.log('order created successfully', response.data);
      } else {
        console.log('error creating order', response.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const pay = async () => {
    try {
      const options = {
        description: 'Adding To Wallet',
        currency: 'USD',
        name: 'Museum_HCM',
        key: 'rzp_test_E3GWYimxN7YMk8',
        amount: amountInCent / 25,
        prefill: {
          email: 'void@razorpay.com',
          contact: '9191919191',
          name: 'Tai Nguyen',
        },
        theme: {color: '#F37254'},
      };

      const data = await RazorpayCheckout.open(options);

      //console.log(data);

      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: amountInCent * 10,
        // shippingAddress: selectedAddress,
        Mail: email,
        DateTime: selectedDate,
        paymentMethod: 'card',
      };

      const response = await axios.post(
        'http://192.168.1.4:8000/orders',
        orderData,
      );
      if (response.status === 200) {
        navigation.navigate('Order');
        dispatch(cleanCart());
        console.log('order created successfully', response.data);
      } else {
        console.log('error creating order', response.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  return (
    <ScrollView style={{}}>
      <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 40}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 20,
            justifyContent: 'space-between',
          }}>
          {steps?.map((step, index) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: '#ccc',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  index < currentStep && {backgroundColor: 'green'},
                ]}>
                {index < currentStep ? (
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 8,
                  color: 'black',
                  marginTop: 10,
                }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
            Nhập Mail gửi đơn hàng
          </Text>

          <Pressable>
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: '#D0D0D0',

                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                paddingBottom: 17,
                marginVertical: 7,
                borderRadius: 6,
              }}>
              <View style={{marginLeft: 6}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: -15,
                  }}>
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

                <View>
                  <Pressable
                    // onPress={() => setCurrentStep(1)}
                    onPress={Mail}
                    style={{
                      backgroundColor: '#008397',
                      padding: 10,
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Text style={{textAlign: 'center', color: 'black'}}>
                      Sửa dụng Mail này
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          </Pressable>
        </View>
      )}

      {currentStep == 1 && (
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
            Chọn thời gian đến thăm
          </Text>

          <View style={{}}>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowCalendar(true)}>
              <Text
                style={{
                  padding: 10,
                  borderColor: '#D0D0D0',
                  borderWidth: 1,
                  borderRadius: 5,
                  width: 100,
                  marginTop: 10,
                }}>
                {selectedDate || 'Enter date (DD/MM/YYYY)'}
              </Text>
            </TouchableOpacity>
            {showCalendar && (
              <View style={styles.calendarContainer}>
                <Calendar onDayPress={handleDayPress} />
                <Button title="Close" onPress={() => setShowCalendar(false)} />
              </View>
            )}
            
          </View>

          <Pressable
            onPress={handleSave}
            style={{
              backgroundColor: '#1d1d1f',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Text style={{color: 'white'}}>Tiếp tục</Text>
          </Pressable>
        </View>
      )}

      {currentStep == 2 && (
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
            Chọn phương thức thanh toán
          </Text>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginTop: 12,
            }}>
            {selectedOption === 'cash' ? (
              <DocCircCleO name="dot-circle-o" size={20} color="#008397" />
            ) : (
              <Icon
                onPress={() => setSelectedOption('cash')}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text style={{color: 'black'}}>Thanh toán khi nhận hàng</Text>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginTop: 12,
            }}>
            {selectedOption === 'paypal' ? (
              <DocCircCleO name="dot-circle-o" size={20} color="#008397" />
            ) : (
              <Icon
                onPress={() => {
                  setSelectedOption('paypal');
                  Alert.alert('UPI/Debit paypal', 'Pay Online', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel is pressed'),
                    },
                    {
                      text: 'OK',
                      onPress: () => pay(),
                    },
                  ]);
                }}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text style={{color: 'black'}}>
              Napas / Thêm thẻ thanh toán quốc tế Visa
            </Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(3)}
            style={{
              backgroundColor: '#1d1d1f',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Text style={{color: 'black'}}>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep === 3 && selectedOption === 'cash' && (
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
            Tiến hành đặt hàng
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}>
            <View>
              <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>
                Mã khuyến mãi
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: 'gray',
                  marginTop: 5,
                  color: 'black',
                }}>
                Chọn mã khuyến mãi
              </Text>
            </View>

            <Icon name="keyboard-arrow-right" size={24} color="black" />
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}>
            <Text style={{color: 'black'}}>
              Đơn hàng vận chuyển tới {selectedAddress?.name}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
                Giá sản phẩm
              </Text>

              <Text style={{color: 'black', fontSize: 16}}>{total}đ</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
                Giá vận chuyển
              </Text>

              <Text style={{color: 'black', fontSize: 16}}>0đ</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Thành tiền</Text>

              <Text
                style={{color: '#C60C30', fontSize: 17, fontWeight: 'bold'}}>
                {total}đ
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}>
            <Text style={{fontSize: 16, color: 'black'}}>Thanh toán với</Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginTop: 7,
                color: 'black',
              }}>
              Thanh toán khi nhận hàng (Cash)
            </Text>
          </View>

          <Pressable
            onPress={handlePlaceOrder}
            style={{
              backgroundColor: '#1d1d1f',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: 'white'}}>Đặt hàng</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
