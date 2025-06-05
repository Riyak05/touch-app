import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NotificationsScreen = () => {
  // Mock notification data
  const notifications = [
    {
      id: "1",
      type: "like",
      username: "Rohit",
      userAvatar: "https://picsum.photos/id/1002/200",
      content: "liked your photo",
      time: "2m ago",
      postImage: "https://picsum.photos/id/10/100/100",
    },
    {
      id: "2",
      type: "follow",
      username: "Manish",
      userAvatar: "https://picsum.photos/id/1003/200",
      content: "started following you",
      time: "15m ago",
    },
    {
      id: "3",
      type: "comment",
      username: "Kajal",
      userAvatar: "https://picsum.photos/id/1004/200",
      content: 'commented: "Great shot!"',
      time: "1h ago",
      postImage: "https://picsum.photos/id/11/100/100",
    },
    {
      id: "4",
      type: "mention",
      username: "Mohit",
      userAvatar: "https://picsum.photos/id/1005/200",
      content: "mentioned you in a comment",
      time: "3h ago",
    },
    {
      id: "5",
      type: "like",
      username: "Rita",
      userAvatar: "https://picsum.photos/id/1006/200",
      content: "liked your photo",
      time: "5h ago",
      postImage: "https://picsum.photos/id/12/100/100",
    },
    {
      id: "6",
      type: "follow",
      username: "Ajay",
      userAvatar: "https://picsum.photos/id/1007/200",
      content: "started following you",
      time: "1d ago",
    },
    {
      id: "7",
      type: "comment",
      username: "Ramu",
      userAvatar: "https://picsum.photos/id/1008/200",
      content: 'commented: "Awesome view!"',
      time: "2d ago",
      postImage: "https://picsum.photos/id/13/100/100",
    },
  ];

  // Render notification item
  const renderNotificationItem = ({ item }) => {
    // Icon based on notification type
    let icon;
    switch (item.type) {
      case "like":
        icon = <Ionicons name="heart" size={16} color="#FF5E3A" />;
        break;
      case "comment":
        icon = <Ionicons name="chatbubble" size={16} color="#0095F6" />;
        break;
      case "follow":
        icon = <Ionicons name="person-add" size={16} color="#5851DB" />;
        break;
      case "mention":
        icon = <Ionicons name="at" size={16} color="#0095F6" />;
        break;
      default:
        icon = <Ionicons name="notifications" size={16} color="#999" />;
    }

    return (
      <TouchableOpacity style={styles.notificationItem}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
          <View style={styles.iconBadge}>{icon}</View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.notificationText}>
            <Text style={styles.username}>{item.username}</Text> {item.content}
          </Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>

        {item.postImage && (
          <Image source={{ uri: item.postImage }} style={styles.postImage} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  iconBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  notificationText: {
    fontSize: 14,
    lineHeight: 18,
  },
  username: {
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  postImage: {
    width: 44,
    height: 44,
    borderRadius: 4,
    marginLeft: 12,
  },
});

export default NotificationsScreen;
