import React, { useState } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { editModeStyles } from "../../style/home/editMode";
import { colors } from "../../style/theme";
import { handlePhotoUpload } from "../../utils/imageUpload";
import { TextInputModal } from "./TextInputModal";
import { CounterInputModal } from "./CounterInputModal";
import { BackgroundColorModal, BackgroundConfig } from "./BackgroundColorModal";

interface ToolboxProps {
  opacity: Animated.Value;
  onImageUpload: (uri: string) => void;
  onTextAdd: (text: string) => void;
  onCounterAdd: (title: string, targetDate: Date) => void;
  onBackgroundChange: (background: BackgroundConfig) => void;
  currentBackground?: BackgroundConfig;
  onSave?: () => void;
}

export const Toolbox = ({ opacity, onImageUpload, onTextAdd, onCounterAdd, onBackgroundChange, currentBackground, onSave }: ToolboxProps) => {
  const [showTextModal, setShowTextModal] = useState(false);
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [showBackgroundModal, setShowBackgroundModal] = useState(false);
  const onPhotoUpload = async () => {
    const imageUri = await handlePhotoUpload();
    if (imageUri) {
      onImageUpload(imageUri);
    }
  };

  const handleSave = () => {
    onSave?.();
  };

  const handleTextAdd = () => {
    setShowTextModal(true);
  };

  const handleTextSubmit = (text: string) => {
    onTextAdd(text);
    setShowTextModal(false);
  };

  const handleCounterAdd = () => {
    setShowCounterModal(true);
  };

  const handleCounterSubmit = (title: string, targetDate: Date) => {
    onCounterAdd(title, targetDate);
    setShowCounterModal(false);
  };

  const handleBackgroundChange = () => {
    setShowBackgroundModal(true);
  };

  const handleBackgroundSubmit = (background: BackgroundConfig) => {
    onBackgroundChange(background);
    // Don't close modal - let user continue making changes
  };

  return (
    <Animated.View style={[editModeStyles.toolbox, { opacity }]}>
      <View style={editModeStyles.toolboxInner}>
        <View style={editModeStyles.toolboxButtons}>
          <TouchableOpacity
            style={editModeStyles.toolboxButton}
            onPress={onPhotoUpload}
          >
            <Ionicons name="camera" size={24} color={"white"} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={editModeStyles.toolboxButton}
            onPress={handleTextAdd}
          >
            <Ionicons name="text" size={24} color={"white"} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={editModeStyles.toolboxButton}
            onPress={handleCounterAdd}
          >
            <Ionicons name="timer" size={24} color={"white"} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={editModeStyles.toolboxButton}
            onPress={handleBackgroundChange}
          >
            <Ionicons name="color-palette" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={editModeStyles.saveButton}
          onPress={handleSave}
        >
          <Ionicons name="save" size={20} color={"white"} />
        </TouchableOpacity>
      </View>
      
      <TextInputModal
        visible={showTextModal}
        onClose={() => setShowTextModal(false)}
        onSubmit={handleTextSubmit}
      />
      
      <CounterInputModal
        visible={showCounterModal}
        onClose={() => setShowCounterModal(false)}
        onSubmit={handleCounterSubmit}
      />
      
      <BackgroundColorModal
        visible={showBackgroundModal}
        onClose={() => setShowBackgroundModal(false)}
        onSubmit={handleBackgroundSubmit}
        currentBackground={currentBackground}
      />
    </Animated.View>
  );
};
1;
