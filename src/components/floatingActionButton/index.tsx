import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

type Props = {
  color: string;
  icon: any;
  onPress: Function;
};

const Index: React.FunctionComponent<Props> = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => props.onPress()}
      style={[
        styles.TouchableOpacityStyle,
        { backgroundColor: props.color ? props.color : '#32ADB5' },
      ]}
    >
      <View>{props.icon}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    borderRadius: 30,
    elevation: 5,
  },
});

export default Index;
