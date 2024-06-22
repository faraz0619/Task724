import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Dimensions} from 'react-native';
import Video from 'react-native-video';
import {useFocusEffect} from '@react-navigation/native';

const {height: screenHeight} = Dimensions.get('window');

const videoSources = [
  require('./assets/video1.mp4'),
  require('./assets/video2.mp4'),
  require('./assets/video3.mp4'),
];

const Videos = () => {
  const [paused, setPaused] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setPaused(false);
      return () => {
        setPaused(true);
      };
    }, []),
  );

  const renderItem = ({item}) => (
    <View style={styles.videoContainer}>
      <Video
        source={item}
        style={styles.video}
        controls={true}
        resizeMode="contain"
        paused={paused}
      />
    </View>
  );

  return (
    <FlatList
      data={videoSources}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      pagingEnabled
      horizontal={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Videos;

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    height: screenHeight,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  video: {
    width: '100%',
    height: '84%',
  },
});
