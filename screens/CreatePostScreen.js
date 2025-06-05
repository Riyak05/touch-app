import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CreatePostScreen = () => {
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(
    "https://picsum.photos/id/237/500/500"
  );
  const [selectedFilter, setSelectedFilter] = useState(0);

  // Mock filters
  const filters = [
    { name: "Normal", value: "normal" },
    { name: "Clarendon", value: "clarendon" },
    { name: "Gingham", value: "gingham" },
    { name: "Moon", value: "moon" },
    { name: "Lark", value: "lark" },
    { name: "Reyes", value: "reyes" },
    { name: "Juno", value: "juno" },
    { name: "Slumber", value: "slumber" },
  ];

  const handleClose = () => {
    Alert.alert("Discard Post", "Are you sure you want to discard this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Discard",
        style: "destructive",
        onPress: () => Alert.alert("Discarded", "Post discarded"),
      },
    ]);
  };

  const handleShare = () => {
    if (!caption.trim()) {
      Alert.alert("Add Caption", "Please add a caption to your post");
      return;
    }
    Alert.alert("Success", "Your post has been shared!");
  };

  const handleSelectImage = () => {
    Alert.alert("Select Image", "Choose image source", [
      {
        text: "Camera",
        onPress: () => Alert.alert("Camera", "Opening camera..."),
      },
      {
        text: "Gallery",
        onPress: () => Alert.alert("Gallery", "Opening gallery..."),
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleAddLocation = () => {
    Alert.alert("Location", "Add a location to your post");
  };

  const handleTagPeople = () => {
    Alert.alert("Tag People", "Tag people in your post");
  };

  const handleAdvancedSettings = () => {
    Alert.alert("Advanced Settings", "Configure advanced post settings");
  };

  // Filter styles (simplified for demo)
  const getFilterStyle = (filter) => {
    switch (filter) {
      case "clarendon":
        return { contrast: 1.2, saturation: 1.35 };
      case "gingham":
        return { brightness: 1.05, hue: 350 };
      case "moon":
        return { grayscale: 1 };
      case "lark":
        return { brightness: 1.2, saturation: 1.1 };
      case "reyes":
        return { sepia: 0.4, brightness: 1.1 };
      case "juno":
        return { contrast: 1.1, saturation: 1.4 };
      case "slumber":
        return { brightness: 0.9, saturation: 0.85 };
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity style={styles.nextButton} onPress={handleShare}>
          <Text style={styles.nextButtonText}>Share</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Image Preview */}
        <TouchableOpacity
          style={styles.imagePreviewContainer}
          onPress={handleSelectImage}
          activeOpacity={0.9}
        >
          <Image
            source={{ uri: selectedImage }}
            style={[
              styles.imagePreview,
              { filter: filters[selectedFilter].value },
            ]}
          />
          <View style={styles.changePhotoButton}>
            <Ionicons name="camera" size={20} color="#fff" />
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </View>
        </TouchableOpacity>

        {/* Caption Input */}
        <View style={styles.captionContainer}>
          <Image
            source={{ uri: "https://picsum.photos/id/1005/200" }}
            style={styles.userAvatar}
          />
          <TextInput
            style={styles.captionInput}
            placeholder="Write a caption..."
            multiline
            value={caption}
            onChangeText={setCaption}
          />
        </View>

        {/* Filters */}
        <Text style={styles.sectionTitle}>Filters</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          {filters.map((filter, index) => (
            <TouchableOpacity
              key={filter.value}
              style={[
                styles.filterItem,
                selectedFilter === index && styles.selectedFilter,
              ]}
              onPress={() => setSelectedFilter(index)}
            >
              <Image
                source={{ uri: selectedImage }}
                style={styles.filterPreview}
              />
              <Text style={styles.filterName}>{filter.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={handleAddLocation}
          >
            <Ionicons name="location-outline" size={22} color="#000" />
            <Text style={styles.optionText}>Add Location</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={handleTagPeople}>
            <Ionicons name="pricetag-outline" size={22} color="#000" />
            <Text style={styles.optionText}>Tag People</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionItem}
            onPress={handleAdvancedSettings}
          >
            <Ionicons name="settings-outline" size={22} color="#000" />
            <Text style={styles.optionText}>Advanced Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    paddingTop: 50,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#FF00B8",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  nextButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  nextButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  imagePreviewContainer: {
    width: "100%",
    height: 300,
    position: "relative",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  changePhotoButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  changePhotoText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 12,
  },
  captionContainer: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  captionInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 16,
    marginBottom: 8,
  },
  filtersContainer: {
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  filterItem: {
    marginHorizontal: 4,
    alignItems: "center",
  },
  selectedFilter: {
    borderWidth: 2,
    borderColor: "#FF00B8",
    borderRadius: 8,
    padding: 2,
  },
  filterPreview: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  filterName: {
    fontSize: 12,
    marginTop: 4,
  },
  optionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 12,
  },
});

export default CreatePostScreen;
