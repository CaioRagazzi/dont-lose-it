import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ListItem from "./listItem";

interface ListData {
  id: string;
  title: string;
  img: string;
  text: string;
}

const Index: React.FunctionComponent<{ data: ListData[] }> = (props) => {
  return (
    <View>
      <FlatList
        data={props.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem title={item.title} img={item.img} text={item.text} />}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
