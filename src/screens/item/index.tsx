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
import { TextInput, Subheading, Switch, Snackbar } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import * as Location from 'expo-location';
import {
  addImage,
  changeTitle,
  changeNotes,
  changeDateRemind,
  changeHourRemind,
  changeLatLng,
} from '../../redux/item/actions';
import { useSelector, useDispatch } from 'react-redux';
import { ItemsInterface } from '../../redux/item/reducer';

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
  const title = useSelector<ItemsInterface, ItemsInterface['title']>(
    (state) => state.title
  );
  const image = useSelector<ItemsInterface, ItemsInterface['image']>(
    (state) => state.image
  );
  const notes = useSelector<ItemsInterface, ItemsInterface['notes']>(
    (state) => state.notes
  );
  const showImage = useSelector<ItemsInterface, ItemsInterface['showImage']>(
    (state) => state.showImage
  );
  const dateRemind = useSelector<ItemsInterface, ItemsInterface['dateRemind']>(
    (state) => state.dateRemind
  );
  const hourRemind = useSelector<ItemsInterface, ItemsInterface['hourRemind']>(
    (state) => state.hourRemind
  );
  const latLng = useSelector<ItemsInterface, ItemsInterface['latLng']>(
    (state) => state.latLng
  );

  const dispatch = useDispatch();

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [isSwitchGPSOn, setIsSwitchGPSOn] = useState(false);
  const [isSwitchRemindOn, setIsSwitchRemindOn] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showHourPicker, setShowHourPicker] = useState(false);

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
  ]);

  const saveItem = () => {
    if (!title) {
      setSnackBarMessage('Title is required!');
      setSnackBarOpen(true);
      return;
    }
    if (isSwitchGPSOn && latLng === '') {
      setSnackBarMessage('GPS beeing selected');
      setSnackBarOpen(true);
      return;
    }
    if (isSwitchRemindOn && (hourRemind === '' || dateRemind === '')) {
      setSnackBarMessage('Select Date/Hour');
      setSnackBarOpen(true);
      return;
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
        dispatch(addImage(cameraResponse.uri));
      }
    }
  };

  const handleSwitchLocation = async (event: any) => {
    if (!event) {
      setIsSwitchGPSOn(false);
      dispatch(changeLatLng(''));
    } else {
      setIsSwitchGPSOn(true);
      await checkPermissionAndGetLocation();
    }
  };

  const checkPermissionAndGetLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();

    if (status === 'granted') {
      Location.getCurrentPositionAsync().then((location) => {
        const latituteLongitude = `${location.coords.latitude},${location.coords.longitude}`;
        dispatch(changeLatLng(latituteLongitude));
      });
    }
  };

  const openGoogleMapsPosition = () => {
    const scheme = 'geo:0,0?q=';
    const label = 'Custom Label';
    const url = `${scheme}${latLng}(${label})`;

    Linking.openURL(url);
  };

  const handleSwitchDate = (event: boolean) => {
    if (!event) {
      dispatch(changeDateRemind(''));
      dispatch(changeHourRemind(''));
      setIsSwitchRemindOn(false);
      return;
    }
    setIsSwitchRemindOn(true);
  };

  const handleDateRemindChange = (date: any) => {
    if (date.type === 'dismissed') {
      setShowDatePicker(false);
    }
    if (date.type === 'set') {
      setShowDatePicker(false);
      dispatch(
        changeDateRemind(
          Moment(date.nativeEvent.timestamp).format('DD/MM/YYYY')
        )
      );
    }
  };

  const handleHourRemindChange = (date: any) => {
    if (date.type === 'dismissed') {
      setShowHourPicker(false);
    }
    if (date.type === 'set') {
      setShowHourPicker(false);
      dispatch(
        changeHourRemind(Moment(date.nativeEvent.timestamp).format('HH:mm'))
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        marginHorizontal: 10,
        marginVertical: 10,
        flexGrow: 1,
      }}
    >
      <ScrollView>
        <View style={showImage && { height: windowHeight * 0.35 }}>
          {!showImage ? (
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
            <TouchableOpacity onPress={() => navigation.navigate('Image')}>
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
          onChangeText={(text) => dispatch(changeTitle(text))}
        />
        <TextInput
          label="Notes"
          mode="outlined"
          multiline={true}
          numberOfLines={5}
          theme={{ colors: { primary: 'black' } }}
          value={notes}
          onChangeText={(text) => dispatch(changeNotes(text))}
        />
        <View style={styles.buttonsContainer}>
          <Subheading>Mark Position</Subheading>
          <Switch
            value={isSwitchGPSOn}
            onValueChange={(event) => handleSwitchLocation(event)}
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
            onValueChange={(event) => handleSwitchDate(event)}
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
      </ScrollView>
      <Snackbar
        visible={snackBarOpen}
        onDismiss={() => setSnackBarOpen(false)}
        duration={3000}
        action={{
          label: 'Close',
          onPress: () => {
            setSnackBarOpen(false);
          },
        }}
      >
        {snackBarMessage}
      </Snackbar>
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
