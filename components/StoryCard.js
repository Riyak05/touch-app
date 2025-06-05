import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StoryCard = ({ story }) => {
  // Check if this is the user's own story
  const isOwnStory = story.username === "You";
  const [storyScale] = useState(new Animated.Value(1));

  // Animation function for button press
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(storyScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(storyScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleStoryPress = () => {
    animateButton();
    if (isOwnStory) {
      handleAddToStory();
    } else {
      Alert.alert("Story", `Viewing ${story.username}'s story`);
    }
  };

  const handleAddToStory = () => {
    Alert.alert("Add to Story", "Choose a source for your story", [
      {
        text: "Take Photo",
        onPress: () => Alert.alert("Camera", "Opening camera..."),
      },
      {
        text: "Choose from Gallery",
        onPress: () => Alert.alert("Gallery", "Opening gallery..."),
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  // For "Your Story", render a special add story button
  if (isOwnStory) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleAddToStory}
          style={[styles.storyButton, styles.addStoryButton]}
          activeOpacity={0.7}
        >
          <View style={styles.plusIconContainer}>
            <Ionicons name="add" size={32} color="#FF5E3A" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userInfo}>
          <Image source={{ uri: story.userAvatar }} style={styles.avatar} />
          <Text style={styles.username}>{story.username}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // For other stories, render the normal story view
  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: storyScale }] }}>
        <TouchableOpacity
          onPress={handleStoryPress}
          style={styles.storyButton}
          activeOpacity={0.7}
        >
          <Image source={{ uri: story.userAvatar }} style={styles.storyImage} />
        </TouchableOpacity>
      </Animated.View>
      <Text style={styles.username}>{story.username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    marginRight: 12,
    alignItems: "center",
  },
  storyButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FF00B8",
    overflow: "hidden",
    elevation: 2,
  },
  addStoryButton: {
    borderStyle: "dashed",
    backgroundColor: "#f8f8f8",
    height: 74,
    width: 74,
    justifyContent: "center",
    alignItems: "center",
  },
  plusIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  storyImage: {
    width: "100%",
    height: "100%",
  },
  userInfo: {
    alignItems: "center",
    marginTop: 4,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  username: {
    fontSize: 11,
    marginTop: 4,
    textAlign: "center",
    color: "#000",
  },
});

export default StoryCard;
