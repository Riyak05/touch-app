import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, StyleSheet, Animated } from "react-native";

// Import screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ExploreScreen from "../screens/ExploreScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import MessagesScreen from "../screens/MessagesScreen";

const Tab = createBottomTabNavigator();

// Custom tab button with animation
const TabButton = ({ children, onPress }) => {
  const [scale] = useState(new Animated.Value(1));

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    animateButton();
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={styles.tabButton}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Explore") {
            iconName = "search";
          } else if (route.name === "Create") {
            iconName = "add-circle";
          } else if (route.name === "Notifications") {
            iconName = "bookmark";
          } else if (route.name === "Profile") {
            iconName = "person-circle";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#000",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FF00B8",
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarShowLabel: false,
        tabBarButton: (props) => <TabButton {...props} />,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Create" component={CreatePostScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ tabBarButton: () => null }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomTabNavigator;
