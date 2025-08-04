import { Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export const handlePhotoUpload = async (): Promise<string | null> => {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    Alert.alert(
      "Permission required",
      "Permission to access camera roll is required!"
    );
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "images",
    allowsEditing: false,
    quality: 1,
  });

  if (!result.canceled) {
    const selectedImageUri = result.assets[0].uri;

    // On web, return the selected URI directly as FileSystem.copyAsync is not available
    if (Platform.OS === "web") {
      return selectedImageUri;
    }

    // On mobile, save to local storage
    const filename = `uploaded_image_${Date.now()}.jpg`;
    const localUri = `${FileSystem.documentDirectory}${filename}`;

    try {
      await FileSystem.copyAsync({
        from: selectedImageUri,
        to: localUri,
      });

      return localUri;
    } catch (error) {
      console.error("Error saving image locally:", error);
      Alert.alert("Error", "Failed to save image locally");
      return null;
    }
  }

  return null;
};
