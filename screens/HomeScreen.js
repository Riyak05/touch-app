import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StoryCard from "../components/StoryCard";
import PostCard from "../components/PostCard";

// Mock data
const stories = [
  {
    id: "1",
    username: "You",
    imageUrl: "https://picsum.photos/id/1/200",
    userAvatar: "https://picsum.photos/id/1001/200",
  },
  {
    id: "2",
    username: "Rohit",
    imageUrl: "https://picsum.photos/id/2/200",
    userAvatar: "https://picsum.photos/id/1002/200",
  },
  {
    id: "3",
    username: "Manish",
    imageUrl: "https://picsum.photos/id/3/200",
    userAvatar: "https://picsum.photos/id/1003/200",
  },
  {
    id: "4",
    username: "Kajal",
    imageUrl: "https://picsum.photos/id/4/200",
    userAvatar: "https://picsum.photos/id/1004/200",
  },
  {
    id: "5",
    username: "Mohit",
    imageUrl: "https://picsum.photos/id/5/200",
    userAvatar: "https://picsum.photos/id/1005/200",
  },
  {
    id: "6",
    username: "Rita",
    imageUrl: "https://picsum.photos/id/6/200",
    userAvatar: "https://picsum.photos/id/1006/200",
  },
];

const posts = [
  {
    id: "1",
    username: "Rohit",
    userAvatar: "https://picsum.photos/id/1002/200",
    location: "New York, NY",
    imageUrl: "https://picsum.photos/id/1025/500/500",
    likes: 236,
    comments: 45,
    shares: 12,
    caption: "Enjoying the beautiful day in the city! #newyork #sunny",
    timestamp: "2 hours ago",
    commentsList: [
      { id: "1", username: "mike_jones", text: "Great shot!", time: "1h ago" },
      {
        id: "2",
        username: "Harsh",
        text: "Love the view!",
        time: "45m ago",
      },
      {
        id: "3",
        username: "Raju",
        text: "Where exactly is this?",
        time: "30m ago",
      },
    ],
  },
  {
    id: "2",
    username: "Kapil",
    userAvatar: "https://picsum.photos/id/1003/200",
    location: "Los Angeles, CA",
    imageUrl: "https://picsum.photos/id/1025/500/500",
    likes: 194,
    comments: 28,
    shares: 8,
    caption: "Beach day with friends ☀️🌊 #beach #summer",
    timestamp: "5 hours ago",
    commentsList: [
      { id: "1", username: "Rohit", text: "Looks amazing!", time: "4h ago" },
      {
        id: "2",
        username: "Nia",
        text: "Wish I was there!",
        time: "3h ago",
      },
    ],
  },
];

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [messageScale] = useState(new Animated.Value(1));

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert("Refreshed", "Feed has been refreshed");
    }, 1500);
  };

  const handleMessages = () => {
    animateButton(messageScale);
    navigation.navigate("Messages");
  };

  // Animation function for button press
  const animateButton = (animatedValue) => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profilePic}>
          <Image
            source={{ uri: "https://picsum.photos/id/1001/200" }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.logoText}>TOUCH</Text>
        <Animated.View style={{ transform: [{ scale: messageScale }] }}>
          <TouchableOpacity
            onPress={handleMessages}
            activeOpacity={0.6}
            style={styles.iconButton}
          >
            <Ionicons name="paper-plane" size={24} color="#000" />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      >
        {/* Stories */}
        <View style={styles.storiesContainer}>
          <FlatList
            data={stories}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <StoryCard story={item} />}
            contentContainerStyle={styles.storiesList}
          />
        </View>

        {/* Posts */}
        <View style={styles.postsContainer}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FF00B8",
    paddingTop: 40,
    paddingBottom: 15,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  iconButton: {
    padding: 5,
  },
  storiesContainer: {
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  storiesList: {
    paddingHorizontal: 16,
  },
  postsContainer: {
    padding: 0,
  },
});

export default HomeScreen;
