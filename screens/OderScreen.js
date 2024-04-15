import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native';

const OderScreen = () => {
  const navigation = useNavigation();
  useEffect(()=>{
    setTimeout(()=> {
      navigation.replace("Main");
    }, 1300 )
  }, [])
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <LottieView
        source={require('../assets/thumbs.json')}
        // ref={animation}
        style={{
          height: 260,
          width: 300,
          alignSelf: 'center',
          marginTop: 40,
          justifyContent: 'center',
        }}
        autoPlay
        loop={false}
        speed={1.2}
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 19,
          fontWeight: '600',
          textAlign: 'center',
        }}>
        Bạn đã đặt hàng thành công
      </Text>
      <LottieView
        source={require('../assets/sparkle.json')}
        style={{
          height: 300,
          position: 'absolute',
          top: 100,
          width: 300,
          alignSelf: 'center',
        }}
        autoPlay
        loop={false}
        speed={1.2}
      />
    </SafeAreaView>
  );
};

export default OderScreen;

const styles = StyleSheet.create({});
