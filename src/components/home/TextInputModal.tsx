import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../../style/theme";

interface TextInputModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

export const TextInputModal = ({ visible, onClose, onSubmit }: TextInputModalProps) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
      onClose();
    }
  };

  const handleCancel = () => {
    setText("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        style={styles.flex} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Add Text</Text>
              <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.textInput}
              value={text}
              onChangeText={setText}
              placeholder="Enter your text..."
              placeholderTextColor={colors.text.light}
              multiline={true}
              numberOfLines={4}
              autoFocus={true}
              textAlignVertical="top"
            />
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Add Text</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = {
  flex: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end" as const,
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: spacing.lg,
    borderTopRightRadius: spacing.lg,
    padding: spacing.lg,
    minHeight: "50%",
  },
  header: {
    flexDirection: "row" as const,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: "600" as const,
    color: colors.text.primary,
  },
  closeButton: {
    padding: spacing.xs,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.sm,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text.primary,
    backgroundColor: colors.surface,
    minHeight: 120,
    marginBottom: spacing.lg,
  },
  buttonContainer: {
    flexDirection: "row" as const,
    justifyContent: "space-between",
    gap: spacing.md,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: spacing.sm,
    padding: spacing.md,
    alignItems: "center" as const,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButtonText: {
    color: colors.text.secondary,
    fontSize: 16,
    fontWeight: "600" as const,
  },
  submitButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
    padding: spacing.md,
    alignItems: "center" as const,
  },
  submitButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "600" as const,
  },
};