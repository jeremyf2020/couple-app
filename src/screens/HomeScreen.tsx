import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const HomeScreen = () => {
  const [daysTogether, setDaysTogether] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  // Calculate days together
  useEffect(() => {
    const startDate = new Date("2022-01-01");
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - startDate.getTime();
    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    setDaysTogether(days);
  }, []);

  // Function to add image
  const addImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }

    // Pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prev) => [...prev, result.assets[0].uri]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Ionicons name="man" size={32} color="blue" />
        <Text style={styles.daysText}>Together {daysTogether} Days</Text>
        <Ionicons name="woman" size={32} color="pink" />
      </View>

      {/* Main Content - Scrollable area for images/reminders */}
      <ScrollView contentContainerStyle={styles.content}>
        {images.length === 0 ? (
          <Text style={styles.noContentText}>
            No photos yet. Add some memories!
          </Text>
        ) : (
          images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))
        )}
      </ScrollView>

      {/* Add Button at Bottom Right (above nav bar) */}
      <TouchableOpacity style={styles.addButton} onPress={addImage}>
        <Ionicons name="add-circle" size={50} color="blue" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  daysText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
    alignItems: "center",
  },
  noContentText: {
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default HomeScreen;
