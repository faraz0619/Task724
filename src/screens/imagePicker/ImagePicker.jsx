import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const asset = response.assets[0];
        setSelectedImage({
          uri: asset.uri,
          name: asset.fileName,
          type: asset.type,
        });
      }
    });
  };

  const uploadPhoto = async () => {
    if (!selectedImage) {
      Alert.alert('No image selected', 'Please select an image first.');
      return;
    }

    setUploading(true);

    const data = new FormData();
    data.append('file', {
      uri: selectedImage.uri,
      name: selectedImage.name,
      type: selectedImage.type,
    });

    try {
      const response = await fetch('url', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': '',
        },
      });

      const responseJson = await response.json();
      if (response.ok) {
        Alert.alert('Upload Successful', 'Photo uploaded successfully.');
      } else {
        Alert.alert('Upload Failed', responseJson.message);
      }
    } catch (error) {
      Alert.alert('Upload Error', error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Image</Text>
      </TouchableOpacity>
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage.uri }} style={styles.image} />
        </View>
      )}
      <TouchableOpacity
        style={[styles.button, uploading && styles.buttonDisabled]}
        onPress={uploadPhoto}
        disabled={uploading}
      >
        <Text style={styles.buttonText}>{uploading ? 'Uploading...' : 'Upload Photo'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  button: {
    backgroundColor: '#4c85e0',
    padding: 10,
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
  },
});
