import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Animated,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ExploreScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("For You");
  const [refreshing, setRefreshing] = useState(false);
  const [searchScale] = useState(new Animated.Value(1));
  const [showTrending, setShowTrending] = useState(true);
  const [showSuggested, setShowSuggested] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock categories
  const categories = [
    "For You",
    "Travel",
    "Food",
    "Fashion",
    "Art",
    "Music",
    "Sports",
    "Technology",
    "Nature",
  ];

  // Mock trending hashtags
  const trendingHashtags = [
    { tag: "#summer2023", posts: "2.3M" },
    { tag: "#foodie", posts: "1.8M" },
    { tag: "#fitness", posts: "4.5M" },
    { tag: "#travel", posts: "3.2M" },
    { tag: "#photography", posts: "5.1M" },
  ];

  // Mock trending users
  const trendingUsers = [
    {
      id: "1",
      username: "travel_addict",
      name: "Travel Enthusiast",
      avatar: "https://picsum.photos/id/1001/200",
      followers: "1.2M",
      isVerified: true,
    },
    {
      id: "2",
      username: "food_lover",
      name: "Culinary Explorer",
      avatar: "https://picsum.photos/id/1002/200",
      followers: "856K",
      isVerified: true,
    },
    {
      id: "3",
      username: "fitness_guru",
      name: "Fitness Coach",
      avatar: "https://picsum.photos/id/1003/200",
      followers: "2.1M",
      isVerified: false,
    },
    {
      id: "4",
      username: "photo_master",
      name: "Photography Expert",
      avatar: "https://picsum.photos/id/1004/200",
      followers: "943K",
      isVerified: true,
    },
  ];

  // Mock explore posts with different sizes
  const explorePosts = [
    {
      id: "1",
      imageUrl: "https://picsum.photos/id/30/500/500",
      isLarge: true,
      likes: 12453,
      username: "travel_addict",
      description: "Amazing sunset view! #travel #sunset",
      location: "Bali, Indonesia",
      category: "Travel",
    },
    {
      id: "2",
      imageUrl: "https://picsum.photos/id/31/500/500",
      isLarge: false,
      likes: 8765,
      username: "food_lover",
      description: "Delicious brunch today #foodie #brunch",
      location: "Paris, France",
      category: "Food",
    },
    {
      id: "3",
      imageUrl: "https://picsum.photos/id/32/500/500",
      isLarge: false,
      likes: 5432,
      username: "fitness_guru",
      description: "Morning workout done! #fitness #motivation",
      location: "New York, USA",
      category: "Sports",
    },
    {
      id: "4",
      imageUrl: "https://picsum.photos/id/33/500/500",
      isLarge: false,
      likes: 9876,
      username: "photo_master",
      description: "Perfect lighting for this shot #photography",
      location: "Tokyo, Japan",
      category: "Art",
    },
    {
      id: "5",
      imageUrl: "https://picsum.photos/id/34/500/500",
      isLarge: false,
      likes: 7654,
      username: "art_creator",
      description: "My latest creation #art #creative",
      location: "Berlin, Germany",
      category: "Art",
    },
    {
      id: "6",
      imageUrl: "https://picsum.photos/id/35/500/500",
      isLarge: true,
      likes: 15678,
      username: "nature_lover",
      description: "Beautiful mountains #nature #hiking",
      location: "Swiss Alps",
      category: "Nature",
    },
    {
      id: "7",
      imageUrl: "https://picsum.photos/id/36/500/500",
      isLarge: false,
      likes: 6543,
      username: "tech_geek",
      description: "New gadget unboxing #tech #gadgets",
      location: "San Francisco, USA",
      category: "Technology",
    },
    {
      id: "8",
      imageUrl: "https://picsum.photos/id/37/500/500",
      isLarge: false,
      likes: 4321,
      username: "music_fan",
      description: "Amazing concert last night #music #live",
      location: "London, UK",
      category: "Music",
    },
    {
      id: "9",
      imageUrl: "https://picsum.photos/id/38/500/500",
      isLarge: true,
      likes: 11234,
      username: "fashion_icon",
      description: "Today's outfit #fashion #style",
      location: "Milan, Italy",
      category: "Fashion",
    },
    {
      id: "10",
      imageUrl: "https://picsum.photos/id/39/500/500",
      isLarge: false,
      likes: 8765,
      username: "travel_addict",
      description: "Beautiful beach day #travel #beach",
      location: "Maldives",
      category: "Travel",
    },
    {
      id: "11",
      imageUrl: "https://picsum.photos/id/40/500/500",
      isLarge: false,
      likes: 5432,
      username: "food_lover",
      description: "Homemade pasta #food #cooking",
      location: "Rome, Italy",
      category: "Food",
    },
    {
      id: "12",
      imageUrl: "https://picsum.photos/id/41/500/500",
      isLarge: false,
      likes: 7890,
      username: "fitness_guru",
      description: "New workout routine #fitness #health",
      location: "Los Angeles, USA",
      category: "Sports",
    },
  ];

  // Filter posts based on active category
  const filteredPosts =
    activeCategory === "For You"
      ? explorePosts
      : explorePosts.filter((post) => post.category === activeCategory);

  // Animation function for button press
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(searchScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(searchScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSearch = () => {
    animateButton();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search results
      const results = explorePosts.filter(
        (post) =>
          post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setSearchResults([]);
  };

  const handleCategoryPress = (category) => {
    setActiveCategory(category);
  };

  const handlePostPress = (post) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  const handleHashtagPress = (hashtag) => {
    // Simulate searching for hashtag
    setSearchQuery(hashtag.tag);
    setIsSearching(true);
    const results = explorePosts.filter((post) =>
      post.description.toLowerCase().includes(hashtag.tag.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleUserPress = (user) => {
    // Simulate viewing user profile
    setSearchQuery(user.username);
    setIsSearching(true);
    const results = explorePosts.filter(
      (post) => post.username === user.username
    );
    setSearchResults(results);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert("Refreshed", "Explore feed has been refreshed");
    }, 1500);
  };

  const toggleSection = (section) => {
    if (section === "trending") {
      setShowTrending(!showTrending);
    } else if (section === "suggested") {
      setShowSuggested(!showSuggested);
    }
  };

  // Render trending hashtags section
  const renderTrendingHashtags = () => {
    return (
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection("trending")}
          activeOpacity={0.7}
        >
          <Text style={styles.sectionTitle}>Trending Hashtags</Text>
          <Ionicons
            name={showTrending ? "chevron-up" : "chevron-down"}
            size={20}
            color="#333"
          />
        </TouchableOpacity>

        {showTrending && (
          <View style={styles.hashtagsContainer}>
            {trendingHashtags.map((hashtag, index) => (
              <TouchableOpacity
                key={index}
                style={styles.hashtagItem}
                onPress={() => handleHashtagPress(hashtag)}
                activeOpacity={0.7}
              >
                <Text style={styles.hashtagText}>{hashtag.tag}</Text>
                <Text style={styles.hashtagCount}>{hashtag.posts} posts</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  // Render trending users section
  const renderTrendingUsers = () => {
    return (
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection("suggested")}
          activeOpacity={0.7}
        >
          <Text style={styles.sectionTitle}>Suggested for You</Text>
          <Ionicons
            name={showSuggested ? "chevron-up" : "chevron-down"}
            size={20}
            color="#333"
          />
        </TouchableOpacity>

        {showSuggested && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.usersScrollView}
          >
            {trendingUsers.map((user) => (
              <TouchableOpacity
                key={user.id}
                style={styles.userItem}
                onPress={() => handleUserPress(user)}
                activeOpacity={0.7}
              >
                <Image
                  source={{ uri: user.avatar }}
                  style={styles.userAvatar}
                />
                <View style={styles.userInfo}>
                  <View style={styles.usernameContainer}>
                    <Text style={styles.username}>{user.username}</Text>
                    {user.isVerified && (
                      <Ionicons
                        name="checkmark-circle"
                        size={14}
                        color="#FF00B8"
                        style={styles.verifiedIcon}
                      />
                    )}
                  </View>
                  <Text style={styles.userFollowers}>
                    {user.followers} followers
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.followButton}
                  onPress={() =>
                    Alert.alert(
                      "Follow",
                      `You are now following ${user.username}`
                    )
                  }
                  activeOpacity={0.7}
                >
                  <Text style={styles.followButtonText}>Follow</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    );
  };

  // Render explore posts in a grid with varying sizes
  const renderExploreGrid = (posts) => {
    return (
      <View style={styles.exploreGrid}>
        {posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={[
              styles.exploreItem,
              post.isLarge ? styles.largeItem : styles.smallItem,
            ]}
            onPress={() => handlePostPress(post)}
            activeOpacity={0.9}
          >
            <Image
              source={{ uri: post.imageUrl }}
              style={styles.exploreImage}
            />
            <View style={styles.postOverlay}>
              <Text style={styles.postUsername}>{post.username}</Text>
              <View style={styles.postStats}>
                <Ionicons name="heart" size={14} color="#fff" />
                <Text style={styles.postLikes}>
                  {post.likes.toLocaleString()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Render search results
  const renderSearchResults = () => {
    return (
      <View style={styles.searchResultsContainer}>
        <View style={styles.searchResultsHeader}>
          <Text style={styles.searchResultsTitle}>
            Search Results for "{searchQuery}"
          </Text>
          <TouchableOpacity
            onPress={clearSearch}
            style={styles.clearSearchButton}
          >
            <Text style={styles.clearSearchText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {searchResults.length > 0 ? (
          renderExploreGrid(searchResults)
        ) : (
          <View style={styles.noResultsContainer}>
            <Ionicons name="search-outline" size={50} color="#ccc" />
            <Text style={styles.noResultsText}>No results found</Text>
            <Text style={styles.noResultsSubtext}>
              Try a different search term
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Animated.View
          style={[styles.searchBar, { transform: [{ scale: searchScale }] }]}
        >
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#FF00B8"]}
          />
        }
      >
        {/* If searching, show search results, otherwise show regular content */}
        {isSearching ? (
          renderSearchResults()
        ) : (
          <>
            {/* Categories */}
            <View style={styles.categoriesContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoryItem,
                      activeCategory === category && styles.activeCategoryItem,
                    ]}
                    onPress={() => handleCategoryPress(category)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        activeCategory === category &&
                          styles.activeCategoryText,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Trending Hashtags Section */}
            {renderTrendingHashtags()}

            {/* Suggested Users Section */}
            {renderTrendingUsers()}

            {/* Explore Grid */}
            {renderExploreGrid(filteredPosts)}
          </>
        )}
      </ScrollView>

      {/* Post Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPostModal}
        onRequestClose={() => setShowPostModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setShowPostModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Post Details</Text>
              <View style={{ width: 24 }} />
            </View>

            {selectedPost && (
              <ScrollView>
                <View style={styles.postUserHeader}>
                  <Image
                    source={{
                      uri: `https://picsum.photos/id/${
                        1000 + parseInt(selectedPost.id)
                      }/200`,
                    }}
                    style={styles.modalUserAvatar}
                  />
                  <View>
                    <Text style={styles.modalUsername}>
                      {selectedPost.username}
                    </Text>
                    <Text style={styles.modalLocation}>
                      {selectedPost.location}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.followButtonSmall}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.followButtonTextSmall}>Follow</Text>
                  </TouchableOpacity>
                </View>

                <Image
                  source={{ uri: selectedPost.imageUrl }}
                  style={styles.modalImage}
                />

                <View style={styles.modalActions}>
                  <View style={styles.modalLeftActions}>
                    <TouchableOpacity style={styles.modalActionButton}>
                      <Ionicons name="heart-outline" size={28} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalActionButton}>
                      <Ionicons
                        name="chatbubble-outline"
                        size={26}
                        color="#000"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalActionButton}>
                      <Ionicons
                        name="paper-plane-outline"
                        size={26}
                        color="#000"
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity>
                    <Ionicons name="bookmark-outline" size={28} color="#000" />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalPostInfo}>
                  <Text style={styles.modalLikes}>
                    {selectedPost.likes.toLocaleString()} likes
                  </Text>
                  <View style={styles.modalCaptionContainer}>
                    <Text style={styles.modalCaptionUsername}>
                      {selectedPost.username}
                    </Text>
                    <Text style={styles.modalCaption}>
                      {selectedPost.description}
                    </Text>
                  </View>
                  <Text style={styles.modalTimestamp}>2 hours ago</Text>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginTop: 40,
    backgroundColor: "#FF00B8",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  categoriesContainer: {
    paddingVertical: 12,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 6,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    marginLeft: 12,
  },
  activeCategoryItem: {
    backgroundColor: "#FF00B8",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
  activeCategoryText: {
    color: "#fff",
  },
  sectionContainer: {
    marginVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  hashtagsContainer: {
    marginBottom: 10,
  },
  hashtagItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  hashtagText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FF00B8",
  },
  hashtagCount: {
    fontSize: 14,
    color: "#999",
  },
  usersScrollView: {
    marginBottom: 15,
  },
  userItem: {
    width: 150,
    marginRight: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  userAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 8,
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  userFollowers: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  followButton: {
    backgroundColor: "#FF00B8",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  followButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  exploreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 1,
  },
  exploreItem: {
    padding: 1,
    position: "relative",
  },
  smallItem: {
    width: "33.33%",
    aspectRatio: 1,
  },
  largeItem: {
    width: "66.66%",
    aspectRatio: 1,
  },
  exploreImage: {
    width: "100%",
    height: "100%",
  },
  postOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postUsername: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  postStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  postLikes: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 4,
  },
  searchResultsContainer: {
    flex: 1,
    padding: 16,
  },
  searchResultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  searchResultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  clearSearchButton: {
    padding: 8,
  },
  clearSearchText: {
    color: "#FF00B8",
    fontWeight: "bold",
  },
  noResultsContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  closeButton: {
    padding: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postUserHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  modalUsername: {
    fontWeight: "bold",
    fontSize: 16,
  },
  modalLocation: {
    fontSize: 12,
    color: "#666",
  },
  followButtonSmall: {
    backgroundColor: "#FF00B8",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: "auto",
  },
  followButtonTextSmall: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  modalImage: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalLeftActions: {
    flexDirection: "row",
  },
  modalActionButton: {
    marginRight: 16,
  },
  modalPostInfo: {
    padding: 12,
  },
  modalLikes: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalCaptionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  modalCaptionUsername: {
    fontWeight: "bold",
    marginRight: 4,
  },
  modalCaption: {
    flex: 1,
    flexWrap: "wrap",
  },
  modalTimestamp: {
    fontSize: 12,
    color: "#666",
  },
});

export default ExploreScreen;
