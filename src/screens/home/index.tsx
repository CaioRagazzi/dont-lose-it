import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import InitialQueries from '../../sqlite/initialQueries';
import DropTables from '../../sqlite/dropTables';
import List from '../../components/list';
import { FloatingAction } from 'react-native-floating-action';
import { RootStackParamList } from '../../navigation';
import ItemQueries from '../../sqlite/item/queries';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MyList'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const Index: React.FunctionComponent<Props> = ({ navigation }) => {
  useEffect(() => {
    const initialQueries = new InitialQueries();
    const dropTables = new DropTables();
    // dropTables.dropAllTables();
    initialQueries.createInitialTables();
    const itemsQuery = new ItemQueries();
    itemsQuery.selectAllItems();    
  }, []);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      img:
        'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      text:
        'Pellentesque laoreet dolor at enim vestibulum, quis vulputate augue porta. Integer magna risus, ultrices ut blandit et, molestie ut elit. Quisque eu lectus ac nisi tempus commodo. Sed imperdiet nisl quis ultricies elementum. Duis venenatis.',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      img: 'https://www.finiteccanada.com/Images/Blogs/Large/8153.jpg',
      text:
        'Nam ac dolor porttitor, viverra mi sed, porta mi. Maecenas ac sem sed ligula aliquam eleifend. In purus orci, facilisis id tempus id, suscipit et quam. Cras purus elit, iaculis ac odio sed, laoreet iaculis enim. Nulla dapibus consectetur nisl, ut fermentum urna tempor ac. Morbi dignissim gravida ullamcorper.',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      img:
        'https://www.thedormyhouse.com/539/new-hampshire-modular-wardrobe.jpg',
      text:
        'Quisque eu metus vitae nunc placerat condimentum id id orci. Ut volutpat pulvinar dapibus. Proin auctor libero id pretium facilisis. Suspendisse in semper purus. Donec arcu libero, pretium eget egestas sed, aliquam vitae.',
    },
  ];

  const actions = [
    {
      text: 'Item',
      icon: require('../../../assets/package.png'),
      name: 'item',
      position: 1,
    },
    {
      text: 'Storage',
      icon: require('../../../assets/archive.png'),
      name: 'Storage',
      position: 2,
    },
    {
      text: 'Loan',
      icon: require('../../../assets/person.png'),
      name: 'Loan',
      position: 3,
    },
  ];

  return (
    <View style={styles.container}>
      <List data={DATA} />
      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          if (name === 'item') {
            navigation.navigate('Item');
          }
        }}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
