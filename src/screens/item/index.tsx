import React, { useState, useLayoutEffect } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation';
import * as ImagePicker from 'expo-image-picker';
import { TextInput, Subheading, Switch } from 'react-native-paper';
import { Avatar, Snackbar } from 'react-native-paper';
import Item from '../../models/item/Item';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import * as Location from 'expo-location';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Item'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const index: React.FunctionComponent<Props> = ({ navigation }) => {
  const [title, setTitle] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [dateRemind, setDateRemind] = useState('');
  const [hourRemind, setHourRemind] = useState('');
  const [latLng, setLatLng] = useState<string>('');

  const [isSwitchGPSOn, setIsSwitchGPSOn] = React.useState(false);
  const [isSwitchRemindOn, setIsSwitchRemindOn] = React.useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showHourPicker, setShowHourPicker] = useState(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => saveItem()}>
          <AntDesign
            name="check"
            style={{ marginRight: 12 }}
            size={26}
            color="black"
          />
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    title,
    image,
    notes,
    dateRemind,
    hourRemind,
    latLng,
    isSwitchGPSOn,
    isSwitchRemindOn,
    snackBarMessage,
  ]);

  const saveItem = () => {
    if (isSwitchGPSOn && latLng === '') {
      console.log('deu ruim no GPS');
      return;
    }
    if (isSwitchRemindOn && (hourRemind === '' || dateRemind === '')) {
      setSnackBarVisible(true);
    }
    console.log(title, image, notes, dateRemind, hourRemind, latLng);
    // navigation.goBack();
    // const item = new Item(title, image, notes);
    // item.insertItem();
  };

  const checkPermissionAndTakePhoto = async () => {
    const responsePermission = await ImagePicker.requestCameraPermissionsAsync();
    if (responsePermission.status === 'granted') {
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowEditing: true,
        quality: 0.5,
        base64: false,
        exif: false,
      };
      const cameraResponse = await ImagePicker.launchCameraAsync(options);
      if (!cameraResponse.cancelled) {
        setImage(cameraResponse.uri);
      }
    }
  };

  const handleSwitchLocation = async () => {
    if (isSwitchGPSOn) {
      setIsSwitchGPSOn(false);
      setLatLng('');
    } else {
      setIsSwitchGPSOn(true);
      await checkPermissionAndGetLocation();
    }
  };

  const checkPermissionAndGetLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      await Location.getCurrentPositionAsync().then((location) => {
        const latituteLongitude = `${location.coords.latitude},${location.coords.longitude}`;
        setLatLng(latituteLongitude);
      });
    }
  };

  const openGoogleMapsPosition = () => {
    const scheme = 'geo:0,0?q=';
    const label = 'Custom Label';
    const url = `${scheme}${latLng}(${label})`;

    Linking.openURL(url);
  };

  const handleDateRemindChange = (date: any) => {
    if (date.type === 'dismissed') {
      setShowDatePicker(false);
    }
    if (date.type === 'set') {
      setShowDatePicker(false);
      setDateRemind(Moment(date.nativeEvent.timestamp).format('DD/MM/YYYY'));
    }
  };

  const handleHourRemindChange = (date: any) => {
    if (date.type === 'dismissed') {
      setShowHourPicker(false);
    }
    if (date.type === 'set') {
      setShowHourPicker(false);
      setHourRemind(Moment(date.nativeEvent.timestamp).format('HH:mm'));
    }
  };

  const deleteImage = () => {
    setImage('');
  };

  return (
    <KeyboardAvoidingView
      style={{
        marginHorizontal: 10,
        marginVertical: 10,
      }}
    >
      <ScrollView>
        <View style={image !== '' && { height: windowHeight * 0.35 }}>
          {image === '' ? (
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={() => checkPermissionAndTakePhoto()}
            >
              <Avatar.Text
                size={(windowWidth * 40) / 100}
                label={title ? title[0] : '?'}
              />
              <FontAwesome5
                name="camera"
                style={{
                  alignSelf: 'flex-end',
                  paddingLeft: 80,
                  position: 'absolute',
                }}
                size={24}
                color="#95f252"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Image', {
                  uri: image,
                  deleteImage: deleteImage,
                })
              }
            >
              <Image
                source={{ uri: image }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        </View>
        <TextInput
          label="Title*"
          mode="outlined"
          theme={{ colors: { primary: 'black' } }}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          label="Notes"
          mode="outlined"
          multiline={true}
          numberOfLines={5}
          theme={{ colors: { primary: 'black' } }}
          value={notes}
          onChangeText={(text) => setNotes(text)}
        />
        <View style={styles.buttonsContainer}>
          <Subheading>Mark Position</Subheading>
          <Switch
            value={isSwitchGPSOn}
            onValueChange={async () => await handleSwitchLocation()}
            color="purple"
          />
        </View>
        {isSwitchGPSOn && (
          <TouchableOpacity onPress={() => openGoogleMapsPosition()}>
            <Text style={{ textDecorationLine: 'underline', marginTop: 12 }}>
              Open on Google Maps
            </Text>
          </TouchableOpacity>
        )}
        <View style={styles.buttonsContainer}>
          <Subheading>Remind me</Subheading>
          <Switch
            value={isSwitchRemindOn}
            onValueChange={() => setIsSwitchRemindOn(!isSwitchRemindOn)}
            color="purple"
          />
        </View>
        {isSwitchRemindOn && (
          <View style={styles.dateContainer}>
            <TouchableOpacity
              style={{ width: '45%' }}
              onPress={() => setShowDatePicker(true)}
            >
              <TextInput
                value={dateRemind}
                label="Select Date"
                dense
                disabled={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: '45%' }}
              onPress={() => setShowHourPicker(true)}
            >
              <TextInput
                value={hourRemind}
                label="Select Hour"
                dense
                disabled={true}
              />
            </TouchableOpacity>
          </View>
        )}
        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            mode="date"
            value={new Date()}
            display="default"
            onChange={handleDateRemindChange}
          />
        )}
        {showHourPicker && (
          <DateTimePicker
            testID="timePicker"
            mode="time"
            value={new Date()}
            display="default"
            onChange={handleHourRemindChange}
          />
        )}
          <Snackbar
            visible={snackBarVisible}
            onDismiss={() => setSnackBarVisible(false)}
            action={{
              label: 'Undo',
              onPress: () => {
                setSnackBarVisible(false);
              },
            }}
          >
            {snackBarMessage}
          </Snackbar>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
