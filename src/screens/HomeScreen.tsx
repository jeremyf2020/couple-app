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
import { useTheme } from "../theme/ThemeProvider";
import * as ImagePicker from "expo-image-picker";

const HomeScreen = () => {
  const theme = useTheme();
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    content: {
      padding: theme.spacing.md,
      alignItems: "center",
      backgroundColor: "#c0c0c0",
      position: "relative",
    },
    filmStripContainer: {
      flex: 1,
      width: "100%",
      backgroundColor: "#c0c0c0",
      position: "relative",
    },
    filmStripBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#c0c0c0",
    },
    filmHoles: {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: 20,
      backgroundColor: "transparent",
    },
    filmHolesLeft: {
      left: 0,
    },
    filmHolesRight: {
      right: 0,
    },
    filmHole: {
      width: 12,
      height: 15,
      borderRadius: 1,
      backgroundColor: "#000000",
      marginVertical: 6,
      marginHorizontal: 4,
    },
    filmContentArea: {
      marginHorizontal: 30,
      paddingVertical: theme.spacing.md,
      alignItems: "center",
      backgroundColor: "#000000",
    },
    filmStrip: {
      marginHorizontal: 30,
      backgroundColor: "#000000",
    },
    topStrip: {
      height: "10%",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 4,
    },
    currentStrip: {
      height: "80%",
      paddingVertical: theme.spacing.md,
      marginVertical: 2,
    },
    bottomStrip: {
      height: "10%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 4,
    },
    stripLabel: {
      color: "#666666",
      fontSize: theme.typography.sizes.sm,
      fontStyle: "italic",
    },
    noContentText: {
      fontSize: theme.typography.sizes.md,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing.lg,
    },
    image: {
      width: "100%",
      height: 200,
      marginBottom: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
    },
    addButton: {
      position: "absolute",
      bottom: theme.spacing.lg,
      right: theme.spacing.lg,
    },
  });

  return (
    <View style={styles.container}>
      {/* Main Content - Film Strip Background */}
      <View style={styles.filmStripContainer}>
        <View style={styles.filmStripBackground} />

        {/* Film holes on the left */}
        <View style={[styles.filmHoles, styles.filmHolesLeft]}>
          {Array.from({ length: 50 }, (_, i) => (
            <View key={`left-${i}`} style={styles.filmHole} />
          ))}
        </View>

        {/* Film holes on the right */}
        <View style={[styles.filmHoles, styles.filmHolesRight]}>
          {Array.from({ length: 50 }, (_, i) => (
            <View key={`right-${i}`} style={styles.filmHole} />
          ))}
        </View>

        {/* Top Strip - Previous */}
        <View style={[styles.filmStrip, styles.topStrip]}>
          <Text style={styles.stripLabel}>Previous memories...</Text>
        </View>

        {/* Current Strip - Main content */}
        <ScrollView style={[styles.filmStrip, styles.currentStrip]} contentContainerStyle={{ alignItems: "center" }}>
          {images.length === 0 ? (
            <Text style={[styles.noContentText, { color: "#ffffff" }]}>
              No photos yet. Add some memories!
            </Text>
          ) : (
            images.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.image} />
            ))
          )}
        </ScrollView>

        {/* Bottom Strip - Next */}
        <View style={[styles.filmStrip, styles.bottomStrip]}>
          <Text style={styles.stripLabel}>Next strip...</Text>
        </View>
      </View>

      {/* Add Button at Bottom Right (above nav bar) */}
      <TouchableOpacity style={styles.addButton} onPress={addImage}>
        <Ionicons
          name="add-circle"
          size={50}
          color={theme.colors.accent.main}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
