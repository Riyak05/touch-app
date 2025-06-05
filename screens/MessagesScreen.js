import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Mock data for conversations
const conversations = [
  {
    id: "1",
    user: {
      name: "Ammu",
      avatar: "https://picsum.photos/id/1010/200",
    },
    lastMessage: "Hey, how are you doing?",
    time: "10:30 AM",
    unread: 2,
  },
  {
    id: "2",
    user: {
      name: "Manisha",
      avatar: "https://picsum.photos/id/1011/200",
    },
    lastMessage: "Did you see the new post?",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "3",
    user: {
      name: "Ritu",
      avatar: "https://picsum.photos/id/1012/200",
    },
    lastMessage: "Thanks for the help!",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "4",
    user: {
      name: "Aditya",
      avatar: "https://picsum.photos/id/1013/200",
    },
    lastMessage: "Let's meet up tomorrow",
    time: "Monday",
    unread: 1,
  },
  {
    id: "5",
    user: {
      name: "Rahul",
      avatar: "https://picsum.photos/id/1014/200",
    },
    lastMessage: "Check out this new place!",
    time: "Sunday",
    unread: 0,
  },
];

// Mock messages for a conversation
const mockMessages = [
  {
    id: "1",
    text: "Hey, how are you doing?",
    sender: "them",
    time: "10:30 AM",
  },
  {
    id: "2",
    text: "I'm good! Just checking out this new app.",
    sender: "me",
    time: "10:32 AM",
  },
  {
    id: "3",
    text: "It looks really cool! Have you tried the filters?",
    sender: "them",
    time: "10:33 AM",
  },
  {
    id: "4",
    text: "Not yet, but I will soon!",
    sender: "me",
    time: "10:34 AM",
  },
  {
    id: "5",
    text: "Let me know what you think of them.",
    sender: "them",
    time: "10:35 AM",
  },
];

const MessagesScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showChatModal, setShowChatModal] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(mockMessages);

  const handleOpenChat = (conversation) => {
    setCurrentChat(conversation);
    setShowChatModal(true);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: "me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setChatMessages([...chatMessages, message]);
      setNewMessage("");
    }
  };

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => handleOpenChat(item)}
    >
      <Image source={{ uri: item.user.avatar }} style={styles.avatar} />

      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.username}>{item.user.name}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>

        <View style={styles.messagePreviewContainer}>
          <Text
            style={[
              styles.messagePreview,
              item.unread > 0 && styles.unreadMessage,
            ]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>

          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderChatMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "me" ? styles.myMessage : styles.theirMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversationItem}
        contentContainerStyle={styles.conversationsList}
      />

      {/* Chat Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showChatModal}
        onRequestClose={() => setShowChatModal(false)}
      >
        <SafeAreaView style={styles.chatContainer}>
          {currentChat && (
            <>
              <View style={styles.chatHeader}>
                <TouchableOpacity onPress={() => setShowChatModal(false)}>
                  <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Image
                  source={{ uri: currentChat.user.avatar }}
                  style={styles.chatAvatar}
                />
                <Text style={styles.chatUsername}>{currentChat.user.name}</Text>
                <TouchableOpacity style={styles.chatOptions}>
                  <Ionicons name="ellipsis-vertical" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <FlatList
                data={chatMessages}
                keyExtractor={(item) => item.id}
                renderItem={renderChatMessage}
                contentContainerStyle={styles.messagesContainer}
                inverted={false}
              />

              <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.attachButton}>
                  <Ionicons
                    name="add-circle-outline"
                    size={24}
                    color="#FF00B8"
                  />
                </TouchableOpacity>
                <TextInput
                  style={styles.messageInput}
                  placeholder="Type a message..."
                  value={newMessage}
                  onChangeText={setNewMessage}
                  multiline
                />
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleSendMessage}
                >
                  <Ionicons name="send" size={24} color="#FF00B8" />
                </TouchableOpacity>
              </View>
            </>
          )}
        </SafeAreaView>
      </Modal>
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
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  conversationsList: {
    paddingHorizontal: 16,
  },
  conversationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  timeText: {
    color: "#999",
    fontSize: 12,
  },
  messagePreviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  messagePreview: {
    flex: 1,
    color: "#666",
    fontSize: 14,
  },
  unreadMessage: {
    fontWeight: "bold",
    color: "#000",
  },
  unreadBadge: {
    backgroundColor: "#FF00B8",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  unreadCount: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  // Chat Modal Styles
  chatContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#FF00B8",
    paddingTop: 40,
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 16,
    marginRight: 12,
  },
  chatUsername: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  chatOptions: {
    padding: 8,
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 16,
  },
  messageContainer: {
    maxWidth: "80%",
    marginBottom: 12,
    padding: 12,
    borderRadius: 20,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#FF00B8",
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: "#fff",
  },
  messageTime: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.7)",
    alignSelf: "flex-end",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  attachButton: {
    padding: 8,
  },
  messageInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    fontSize: 16,
  },
  sendButton: {
    padding: 8,
  },
});

export default MessagesScreen;
