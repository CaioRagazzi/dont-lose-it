import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation';
import { RouteProp } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import FloatingButton from '../../components/floatingActionButton';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Image'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Image'
>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
  uri: string;
};

const index: React.FunctionComponent<Props> = ({ route, navigation }) => {
  const handleDeleteImage = () => {
    route.params.deleteImage('');
    navigation.goBack();
  };

  return (
    <View>
      <Image
        source={{ uri: route.params.uri }}
        style={{ width: '100%', height: '100%' }}
        resizeMode="contain"
      />
      <FloatingButton
        color="red"
        onPress={() => handleDeleteImage()}
        icon={<AntDesign name="delete" size={24} color="#fff" />}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
