import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Index: React.FunctionComponent<{
  title: string;
  img: string;
  text: string;
}> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.img }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: '20%',
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  textContainer: {
    flexShrink: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  imageContainer: {
    width: '30%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: 'grey',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});
