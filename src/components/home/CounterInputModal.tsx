import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../../style/theme";

interface CounterInputModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (title: string, targetDate: Date) => void;
}

export const CounterInputModal = ({ visible, onClose, onSubmit }: CounterInputModalProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title.trim(), date);
      setTitle("");
      setDate(new Date());
      onClose();
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDate(new Date());
    onClose();
  };

  const onDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
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
              <Text style={styles.title}>Add Counter</Text>
              <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
              placeholder="e.g., Together xxx days, Days until anniversary..."
              placeholderTextColor={colors.text.light}
              multiline={true}
              numberOfLines={2}
              autoFocus={true}
              textAlignVertical="top"
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
              <Text style={styles.dateLabel}>Target Date</Text>
              <View style={styles.dateValue}>
                <Text style={styles.dateText}>{formatDate(date)}</Text>
                <Ionicons name="calendar" size={20} color={colors.text.secondary} />
              </View>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Add Counter</Text>
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
    minHeight: "60%" as const,
  },
  header: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
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
    minHeight: 80,
    marginBottom: spacing.lg,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.surface,
    marginBottom: spacing.lg,
  },
  dateLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  dateValue: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
  },
  dateText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  buttonContainer: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
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