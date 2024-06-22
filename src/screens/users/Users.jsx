import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {deleteUser} from '../../redux/UserSlice';

const Users = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const users = useSelector(state => state.user);
  // console.log('Users: ', users);

  const renderItems = ({item, index}) => {
    return (
      <View key={index} style={styles.renderItemsView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={styles.itemText}>
              {item.firstName} {item.lastName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 30,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AddUser', {
                  type: 'edit',
                  data: item,
                  index: index,
                })
              }
              style={{
                marginHorizontal: 30,
              }}>
              <AntDesign name="edit" size={25} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(deleteUser(index));
              }}>
              <AntDesign name="delete" size={25} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.mainView}>
      {users.data.length === 0 ? (
        <Text
          style={{
            color: 'grey',
            textAlign: 'center',
            paddingTop: 50,
            fontSize: 20,
          }}>
          No User Available {'\n'} Please Add User First
        </Text>
      ) : (
        <FlatList data={users.data} renderItem={renderItems} />
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('AddUser', {type: 'add'})}
        style={styles.Btn}>
        <Text style={styles.BtnText}>Add New Users</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  Btn: {
    width: '100%',
    height: 50,
    backgroundColor: '#62b1e3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  renderItemsView: {
    width: '95%',
    height: 50,
    borderWidth: 1,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 18,
    color: 'black',
    paddingLeft: 10,
  },
});
