import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState("grid");

  // Mock user data
  const user = {
    username: "pankaj",
    name: "Pankaj",
    avatar: "https://picsum.photos/id/1005/200",
    posts: 24,
    followers: 1452,
    following: 348,
    bio: "Photography enthusiast | Travel lover | Coffee addict",
    website: "www.pankaj.com",
  };

  // Mock posts data
  const posts = Array(9)
    .fill()
    .map((_, i) => ({
      id: i.toString(),
      imageUrl: `https://picsum.photos/id/${20 + i}/500/500`,
    }));

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Edit profile screen would open here");
  };

  const handleFollowers = () => {
    Alert.alert("Followers", `View all ${user.followers} followers`);
  };

  const handleFollowing = () => {
    Alert.alert("Following", `View all ${user.following} people you follow`);
  };

  const handleWebsite = () => {
    Alert.alert("Website", `Opening ${user.website} in browser`);
  };

  const handlePostPress = (postId) => {
    Alert.alert("Post", `Viewing post ${postId}`);
  };

  const handleSettings = () => {
    Alert.alert("Settings", "Settings screen would open here");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "grid":
        return (
          <View style={styles.postsGrid}>
            {posts.map((post) => (
              <TouchableOpacity
                key={post.id}
                style={styles.postThumbnail}
                onPress={() => handlePostPress(post.id)}
              >
                <Image
                  source={{ uri: post.imageUrl }}
                  style={styles.postImage}
                />
              </TouchableOpacity>
            ))}
          </View>
        );
      case "saved":
        return (
          <View style={styles.emptyState}>
            <Ionicons name="bookmark" size={40} color="#ccc" />
            <Text style={styles.emptyStateText}>No saved posts yet</Text>
          </View>
        );
      case "tagged":
        return (
          <View style={styles.emptyState}>
            <Ionicons name="person" size={40} color="#ccc" />
            <Text style={styles.emptyStateText}>No tagged posts yet</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with settings */}
      <View style={styles.headerBar}>
        <Text style={styles.headerUsername}>{user.username}</Text>
        <TouchableOpacity onPress={handleSettings}>
          <Ionicons name="menu-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: user.avatar }} style={styles.profileImage} />

          <View style={styles.profileStats}>
            <TouchableOpacity style={styles.statItem}>
              <Text style={styles.statNumber}>{user.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.statItem} onPress={handleFollowers}>
              <Text style={styles.statNumber}>{user.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.statItem} onPress={handleFollowing}>
              <Text style={styles.statNumber}>{user.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
          <TouchableOpacity onPress={handleWebsite}>
            <Text style={styles.website}>{user.website}</Text>
          </TouchableOpacity>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Posts Grid Header */}
        <View style={styles.gridHeader}>
          <TouchableOpacity
            style={[styles.gridTab, activeTab === "grid" && styles.activeTab]}
            onPress={() => setActiveTab("grid")}
          >
            <Ionicons
              name="grid-outline"
              size={24}
              color={activeTab === "grid" ? "#000" : "#888"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.gridTab, activeTab === "saved" && styles.activeTab]}
            onPress={() => setActiveTab("saved")}
          >
            <Ionicons
              name="bookmark-outline"
              size={24}
              color={activeTab === "saved" ? "#000" : "#888"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.gridTab, activeTab === "tagged" && styles.activeTab]}
            onPress={() => setActiveTab("tagged")}
          >
            <Ionicons
              name="person-outline"
              size={24}
              color={activeTab === "tagged" ? "#000" : "#888"}
            />
          </TouchableOpacity>
        </View>

        {/* Posts Grid */}
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
  },
  headerUsername: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileHeader: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileStats: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  profileInfo: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
  },
  bio: {
    fontSize: 14,
    marginTop: 4,
  },
  website: {
    fontSize: 14,
    color: "#3897f0",
    marginTop: 4,
  },
  editButton: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#dbdbdb",
    borderRadius: 4,
    paddingVertical: 6,
    alignItems: "center",
  },
  editButtonText: {
    fontWeight: "600",
  },
  gridHeader: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#dbdbdb",
    marginTop: 16,
  },
  gridTab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  postsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  postThumbnail: {
    width: "33.33%",
    aspectRatio: 1,
    padding: 1,
  },
  postImage: {
    flex: 1,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    marginTop: 10,
    color: "#666",
  },
});

export default ProfileScreen;
