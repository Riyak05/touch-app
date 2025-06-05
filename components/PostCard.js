import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  FlatList,
  Modal,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Mock data for share contacts
const shareContacts = [
  { id: "1", name: "John Smith", avatar: "https://picsum.photos/id/1010/200" },
  {
    id: "2",
    name: "Anu",
    avatar: "https://picsum.photos/id/1011/200",
  },
  {
    id: "3",
    name: "M",
    avatar: "https://picsum.photos/id/1012/200",
  },
  { id: "4", name: "Sarah Davis", avatar: "https://picsum.photos/id/1013/200" },
  {
    id: "5",
    name: "David Wilson",
    avatar: "https://picsum.photos/id/1014/200",
  },
];

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [saved, setSaved] = useState(false);
  const [following, setFollowing] = useState(false);
  const [comments, setComments] = useState(post.comments || 0);
  const [shares, setShares] = useState(post.shares || 0);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentsList, setCommentsList] = useState(
    post.commentsList || [
      { id: "1", username: "user1", text: "Great post!", time: "2h ago" },
      { id: "2", username: "user2", text: "Love this!", time: "1h ago" },
    ]
  );
  const [showShareModal, setShowShareModal] = useState(false);

  // Animated values for button effects
  const [likeScale] = useState(new Animated.Value(1));
  const [commentScale] = useState(new Animated.Value(1));
  const [shareScale] = useState(new Animated.Value(1));
  const [saveScale] = useState(new Animated.Value(1));
  const [followScale] = useState(new Animated.Value(1));

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

  const handleLike = () => {
    animateButton(likeScale);
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleFollow = () => {
    animateButton(followScale);
    setFollowing(!following);
    Alert.alert(
      following ? "Unfollowed" : "Following",
      following
        ? `You unfollowed ${post.username}`
        : `You are now following ${post.username}`
    );
  };

  const handleComment = () => {
    animateButton(commentScale);
    if (showCommentInput) {
      // If comment input is already showing, hide it and show comments
      setShowCommentInput(false);
      setShowComments(!showComments);
    } else {
      // If comment input is not showing, show it
      setShowCommentInput(true);
      setShowComments(true);
    }
  };

  const submitComment = () => {
    if (commentText.trim()) {
      // Create new comment
      const newComment = {
        id: Date.now().toString(),
        username: "You",
        text: commentText,
        time: "Just now",
      };

      // Add to comments list
      setCommentsList([newComment, ...commentsList]);
      setComments(comments + 1);
      setCommentText("");
      Alert.alert("Comment Posted", "Your comment has been added");
      setShowCommentInput(false);
    } else {
      Alert.alert("Empty Comment", "Please write something before posting");
    }
  };

  const handleShare = () => {
    animateButton(shareScale);
    setShowShareModal(true);
  };

  const handleSave = () => {
    animateButton(saveScale);
    setSaved(!saved);
  };

  const shareWithContact = (contact) => {
    setShares(shares + 1);
    setShowShareModal(false);
    Alert.alert("Shared", `Post shared with ${contact.name}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
          <Text style={styles.username}>{post.username}</Text>
        </View>
        <Animated.View style={{ transform: [{ scale: followScale }] }}>
          <TouchableOpacity
            style={styles.followButton}
            onPress={handleFollow}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.followButtonText,
                following && styles.followingButtonText,
              ]}
            >
              {following ? "Following" : "Follow"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Image source={{ uri: post.imageUrl }} style={styles.postImage} />

      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <Animated.View style={{ transform: [{ scale: likeScale }] }}>
            <TouchableOpacity
              onPress={handleLike}
              style={styles.actionItem}
              activeOpacity={0.6}
            >
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                size={24}
                color={liked ? "#FF00B8" : "#000"}
              />
              <Text style={styles.statsText}>{likes}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.rightActions}>
          <Animated.View style={{ transform: [{ scale: commentScale }] }}>
            <TouchableOpacity
              onPress={handleComment}
              style={styles.actionItem}
              activeOpacity={0.6}
            >
              <Ionicons name="chatbubble-outline" size={22} color="#000" />
              <Text style={styles.statsText}>{comments}</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ scale: saveScale }] }}>
            <TouchableOpacity
              onPress={handleSave}
              style={styles.actionItem}
              activeOpacity={0.6}
            >
              <Ionicons
                name={saved ? "bookmark" : "bookmark-outline"}
                size={24}
                color="#000"
              />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ scale: shareScale }] }}>
            <TouchableOpacity
              onPress={handleShare}
              style={styles.actionItem}
              activeOpacity={0.6}
            >
              <Ionicons name="paper-plane-outline" size={22} color="#000" />
              <Text style={styles.statsText}>{shares}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      <View style={styles.captionContainer}>
        <Text style={styles.username}>{post.username}</Text>
        <Text style={styles.caption}>{post.caption}</Text>
      </View>

      {showComments && (
        <View style={styles.commentsContainer}>
          {commentsList.length > 0 ? (
            commentsList.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <Text style={styles.commentUsername}>{comment.username}</Text>
                <Text style={styles.commentText}>{comment.text}</Text>
                <Text style={styles.commentTime}>{comment.time}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noCommentsText}>No comments yet</Text>
          )}
        </View>
      )}

      {showCommentInput && (
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={commentText}
            onChangeText={setCommentText}
            autoFocus
          />
          <TouchableOpacity
            style={styles.postCommentButton}
            onPress={submitComment}
            activeOpacity={0.7}
          >
            <Text style={styles.postCommentText}>Post</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Share Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showShareModal}
        onRequestClose={() => setShowShareModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Share with</Text>
              <TouchableOpacity
                onPress={() => setShowShareModal(false)}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {shareContacts.map((contact) => (
              <TouchableOpacity
                key={contact.id}
                style={styles.contactItem}
                onPress={() => shareWithContact(contact)}
                activeOpacity={0.7}
              >
                <Image
                  source={{ uri: contact.avatar }}
                  style={styles.contactAvatar}
                />
                <Text style={styles.contactName}>{contact.name}</Text>
                <View style={styles.shareIconContainer}>
                  <Ionicons name="paper-plane" size={20} color="#FF00B8" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  followButton: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "#FF00B8",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  followButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  followingButtonText: {
    color: "#fff",
  },
  postImage: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  leftActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    padding: 5,
  },
  statsText: {
    marginLeft: 5,
    fontWeight: "500",
    fontSize: 12,
  },
  captionContainer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  caption: {
    fontSize: 14,
    lineHeight: 18,
  },
  commentsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  commentItem: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  commentUsername: {
    fontWeight: "bold",
    fontSize: 13,
  },
  commentText: {
    fontSize: 13,
    marginTop: 2,
  },
  commentTime: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  noCommentsText: {
    fontStyle: "italic",
    color: "#999",
    textAlign: "center",
    padding: 10,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  postCommentButton: {
    backgroundColor: "#FF00B8",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    elevation: 2,
  },
  postCommentText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  contactName: {
    flex: 1,
    fontSize: 16,
  },
  shareIconContainer: {
    padding: 8,
  },
});

export default PostCard;
