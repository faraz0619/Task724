import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addUsers, updateUser} from '../../redux/UserSlice';
import {useNavigation, useRoute} from '@react-navigation/native';

const AddUsers = () => {
  const route = useRoute();

  const navigation = useNavigation();
  const [firstName, setFirstName] = useState(
    route.params.type === 'edit' ? route.params.data.firstName : '',
  );
  const [lastName, setLastName] = useState(
    route.params.type === 'edit' ? route.params.data.lastName : '',
  );
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const dispatch = useDispatch();

  const validateFields = () => {
    let valid = true;
    if (firstName.trim() === '') {
      setFirstNameError('First name is required');
      valid = false;
    } else {
      setFirstNameError('');
    }

    if (lastName.trim() === '') {
      setLastNameError('Last name is required');
      valid = false;
    } else {
      setLastNameError('');
    }

    return valid;
  };

  const saveUser = () => {
    if (validateFields()) {
      if (route.params.type == 'edit') {
        dispatch(
          updateUser({
            firstName: firstName,
            lastName: lastName,
            index: route.params.index,
          }),
        );
      } else {
        dispatch(
          addUsers({
            firstName,
            lastName,
          }),
        );
      }
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter first name"
        placeholderTextColor="grey"
        value={firstName}
        onChangeText={setFirstName}
      />
      {firstNameError ? (
        <Text style={styles.errorText}>{firstNameError}</Text>
      ) : null}

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter last name"
        placeholderTextColor="grey"
        value={lastName}
        onChangeText={setLastName}
      />
      {lastNameError ? (
        <Text style={styles.errorText}>{lastNameError}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={saveUser}>
        <Text style={styles.buttonText}>Save User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    color:"black",
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4c85e0',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
