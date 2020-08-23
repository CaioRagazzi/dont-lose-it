import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation';
import { RouteProp } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import storeItem from '../../redux/item/store';

import FloatingButton from '../../components/floatingActionButton';
import { ADD_IMAGE } from '../../redux/item/actionTypes';
import { addImage, removeImage } from '../../redux/item/actions';
import { useSelector, useDispatch } from 'react-redux';
import { ItemsInterface } from '../../redux/item/reducer';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Image'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Image'
>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const index: React.FunctionComponent<Props> = ({ route, navigation }) => {
  const image = useSelector<ItemsInterface, ItemsInterface["image"]>((state) => state.image);
  const imageDispatch = useDispatch()

  const handleDeleteImage = () => {
    imageDispatch(removeImage());
    navigation.goBack();
  };

  return (
    <View>
      <Image
        source={{ uri: image }}
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
