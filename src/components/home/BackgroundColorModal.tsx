import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../../style/theme";

export interface BackgroundConfig {
  type: 'solid' | 'gradient';
  colors: string[];
  direction?: 'horizontal' | 'vertical' | 'diagonal';
}

interface BackgroundColorModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (background: BackgroundConfig) => void;
  currentBackground?: BackgroundConfig;
}

const SOLID_COLORS = [
  '#FFFFFF', '#F5F5F5', '#E8E8E8', '#D3D3D3', '#A9A9A9', '#696969', '#2F2F2F', '#000000',
  '#FFE4E1', '#FFC0CB', '#FF69B4', '#FF1493', '#DC143C', '#B22222', '#8B0000', '#4B0000',
  '#FFF8DC', '#FFFFE0', '#FFFF00', '#FFD700', '#FFA500', '#FF8C00', '#FF4500', '#8B4513',
  '#F0FFF0', '#98FB98', '#90EE90', '#32CD32', '#228B22', '#006400', '#2E8B57', '#8FBC8F',
  '#E0FFFF', '#87CEEB', '#87CEFA', '#4169E1', '#0000FF', '#0000CD', '#00008B', '#191970',
  '#DDA0DD', '#DA70D6', '#BA55D3', '#9370DB', '#8A2BE2', '#9400D3', '#4B0082', '#6A0DAD',
];

const GRADIENT_PRESETS = [
  { name: 'Sunset', colors: ['#FF6B6B', '#FFE66D'] },
  { name: 'Ocean', colors: ['#667eea', '#764ba2'] },
  { name: 'Pink Dream', colors: ['#f093fb', '#f5576c'] },
  { name: 'Green Valley', colors: ['#11998e', '#38ef7d'] },
  { name: 'Purple Night', colors: ['#8B5CF6', '#3B82F6'] },
  { name: 'Orange Crush', colors: ['#ff9a56', '#ff6b95'] },
  { name: 'Blue Sky', colors: ['#74b9ff', '#0984e3'] },
  { name: 'Warm Fire', colors: ['#fd79a8', '#fdcb6e'] },
];

export const BackgroundColorModal = ({ visible, onClose, onSubmit, currentBackground }: BackgroundColorModalProps) => {
  const [selectedType, setSelectedType] = useState<'solid' | 'gradient'>(currentBackground?.type || 'solid');
  const [selectedDirection, setSelectedDirection] = useState<'horizontal' | 'vertical' | 'diagonal'>(
    currentBackground?.direction || 'vertical'
  );
  const [customColor1, setCustomColor1] = useState('#FF6B6B');
  const [customColor2, setCustomColor2] = useState('#4ECDC4');
  const [selectingColorFor, setSelectingColorFor] = useState<'color1' | 'color2'>('color1');
  
  // Track current selections separately for each type
  const [selectedSolidColor, setSelectedSolidColor] = useState<string | null>(
    currentBackground?.type === 'solid' ? currentBackground.colors[0] : null
  );
  const [selectedGradientColors, setSelectedGradientColors] = useState<string[] | null>(
    currentBackground?.type === 'gradient' ? currentBackground.colors : null
  );

  const handleSubmit = () => {
    const colors = selectedType === 'solid' 
      ? selectedSolidColor ? [selectedSolidColor] : ['#FFFFFF']
      : selectedGradientColors || [customColor1, customColor2];
    
    const background: BackgroundConfig = {
      type: selectedType,
      colors: colors,
      ...(selectedType === 'gradient' && { direction: selectedDirection })
    };
    onSubmit(background);
    onClose();
  };

  // Apply background immediately
  const applyBackground = (background: BackgroundConfig) => {
    onSubmit(background);
  };

  const handleSolidColorSelect = (color: string) => {
    setSelectedSolidColor(color);
    setSelectedType('solid');
    applyBackground({
      type: 'solid',
      colors: [color],
    });
  };

  const handleGradientSelect = (gradient: typeof GRADIENT_PRESETS[0]) => {
    setSelectedGradientColors(gradient.colors);
    setSelectedType('gradient');
    applyBackground({
      type: 'gradient',
      colors: gradient.colors,
      direction: selectedDirection,
    });
  };

  const handleCustomColorSelect = (color: string) => {
    if (selectingColorFor === 'color1') {
      setCustomColor1(color);
      const newColors = [color, customColor2];
      setSelectedGradientColors(newColors);
      setSelectedType('gradient');
      applyBackground({
        type: 'gradient',
        colors: newColors,
        direction: selectedDirection,
      });
    } else {
      setCustomColor2(color);
      const newColors = [customColor1, color];
      setSelectedGradientColors(newColors);
      setSelectedType('gradient');
      applyBackground({
        type: 'gradient',
        colors: newColors,
        direction: selectedDirection,
      });
    }
  };

  const handleDirectionChange = (direction: 'horizontal' | 'vertical' | 'diagonal') => {
    setSelectedDirection(direction);
    if (selectedType === 'gradient' && selectedGradientColors) {
      applyBackground({
        type: 'gradient',
        colors: selectedGradientColors,
        direction: direction,
      });
    }
  };

  const handleTypeChange = (type: 'solid' | 'gradient') => {
    setSelectedType(type);
    // Don't clear selections, just switch type
  };

  // Helper function to convert HSV to hex
  const hsvToHex = (h: number, s: number, v: number): string => {
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;
    
    let r = 0, g = 0, b = 0;
    
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    
    const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');
    
    return `#${rHex}${gHex}${bHex}`.toUpperCase();
  };

  const handleHueBarTouch = (event: any, barWidth: number) => {
    const x = event.nativeEvent.locationX;
    const hue = Math.max(0, Math.min(360, (x / barWidth) * 360));
    const newColor = hsvToHex(hue, 1, 1);
    handleCustomColorSelect(newColor);
  };

  const handleBrightnessBarTouch = (event: any, barWidth: number) => {
    const x = event.nativeEvent.locationX;
    const brightness = Math.max(0, Math.min(1, x / barWidth));
    
    // Get current color and adjust brightness
    const currentColor = selectingColorFor === 'color1' ? customColor1 : customColor2;
    const hex = currentColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    const newR = Math.round(r * brightness * 255).toString(16).padStart(2, '0');
    const newG = Math.round(g * brightness * 255).toString(16).padStart(2, '0');
    const newB = Math.round(b * brightness * 255).toString(16).padStart(2, '0');
    
    const newColor = `#${newR}${newG}${newB}`.toUpperCase();
    handleCustomColorSelect(newColor);
  };

  const renderSolidColors = () => (
    <View style={styles.colorGrid}>
      {SOLID_COLORS.map((color) => (
        <TouchableOpacity
          key={color}
          style={[
            styles.colorButton,
            { backgroundColor: color },
            selectedSolidColor === color && styles.selectedColor
          ]}
          onPress={() => handleSolidColorSelect(color)}
        />
      ))}
    </View>
  );

  const renderGradients = () => (
    <View>
      {/* Direction Selector */}
      <View style={styles.directionSelector}>
        <Text style={styles.sectionTitle}>Direction</Text>
        <View style={styles.directionButtons}>
          {(['vertical', 'horizontal', 'diagonal'] as const).map((direction) => (
            <TouchableOpacity
              key={direction}
              style={[
                styles.directionButton,
                selectedDirection === direction && styles.selectedDirectionButton
              ]}
              onPress={() => handleDirectionChange(direction)}
            >
              <Text style={[
                styles.directionButtonText,
                selectedDirection === direction && styles.selectedDirectionButtonText
              ]}>
                {direction === 'vertical' ? '↓' : direction === 'horizontal' ? '→' : '↗'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Custom Gradient */}
      <View style={styles.customGradientSection}>
        <Text style={styles.sectionTitle}>Custom Gradient</Text>
        
        {/* Gradient Preview */}
        <View style={styles.gradientPreview}>
          <LinearGradient
            colors={[customColor1, customColor2]}
            start={
              selectedDirection === 'horizontal' ? [0, 0.5] :
              selectedDirection === 'vertical' ? [0.5, 0] :
              [0, 0]
            }
            end={
              selectedDirection === 'horizontal' ? [1, 0.5] :
              selectedDirection === 'vertical' ? [0.5, 1] :
              [1, 1]
            }
            style={styles.previewGradient}
          />
          <Text style={styles.previewLabel}>Preview</Text>
        </View>

        {/* Color Selection Buttons */}
        <View style={styles.colorSelectors}>
          <TouchableOpacity
            style={[
              styles.colorSelectorButton,
              selectingColorFor === 'color1' && styles.activeColorSelector
            ]}
            onPress={() => setSelectingColorFor('color1')}
          >
            <View style={[styles.colorIndicator, { backgroundColor: customColor1 }]} />
            <Text style={[
              styles.colorSelectorText,
              selectingColorFor === 'color1' && styles.activeColorSelectorText
            ]}>
              Start Color
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.colorSelectorButton,
              selectingColorFor === 'color2' && styles.activeColorSelector
            ]}
            onPress={() => setSelectingColorFor('color2')}
          >
            <View style={[styles.colorIndicator, { backgroundColor: customColor2 }]} />
            <Text style={[
              styles.colorSelectorText,
              selectingColorFor === 'color2' && styles.activeColorSelectorText
            ]}>
              End Color
            </Text>
          </TouchableOpacity>
        </View>

        {/* Color Picker */}
        <Text style={styles.colorPickerLabel}>
          Select {selectingColorFor === 'color1' ? 'Start' : 'End'} Color:
        </Text>
        
        {/* Color Bar - Hue Selection */}
        <View style={styles.colorBarContainer}>
          <Text style={styles.colorBarLabel}>Hue</Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={(event) => handleHueBarTouch(event, 300)} // Approximate width
            style={styles.touchableColorBar}
          >
            <LinearGradient
              colors={[
                '#FF0000', '#FF7F00', '#FFFF00', '#7FFF00', '#00FF00', '#00FF7F',
                '#00FFFF', '#007FFF', '#0000FF', '#7F00FF', '#FF00FF', '#FF007F', '#FF0000'
              ]}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.colorBar}
            />
          </TouchableOpacity>
        </View>

        {/* Brightness Bar */}
        <View style={styles.colorBarContainer}>
          <Text style={styles.colorBarLabel}>Brightness</Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={(event) => handleBrightnessBarTouch(event, 300)} // Approximate width
            style={styles.touchableColorBar}
          >
            <LinearGradient
              colors={['#000000', selectingColorFor === 'color1' ? customColor1 : customColor2]}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.colorBar}
            />
          </TouchableOpacity>
        </View>

        {/* Quick Color Presets */}
        <Text style={styles.colorBarLabel}>Quick Colors</Text>
        <View style={styles.quickColors}>
          {SOLID_COLORS.slice(0, 16).map((color) => (
            <TouchableOpacity
              key={`quick-${color}`}
              style={[
                styles.quickColorButton,
                { backgroundColor: color },
                ((selectingColorFor === 'color1' && customColor1 === color) || 
                 (selectingColorFor === 'color2' && customColor2 === color)) && styles.selectedQuickColor
              ]}
              onPress={() => handleCustomColorSelect(color)}
            />
          ))}
        </View>

      </View>

      {/* Gradient Presets */}
      <Text style={styles.sectionTitle}>Presets</Text>
      <View style={styles.gradientGrid}>
        {GRADIENT_PRESETS.map((gradient, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.gradientButton,
              selectedGradientColors && 
              JSON.stringify(selectedGradientColors) === JSON.stringify(gradient.colors) &&
              styles.selectedGradient
            ]}
            onPress={() => handleGradientSelect(gradient)}
          >
            <LinearGradient
              colors={gradient.colors as [string, string, ...string[]]}
              start={
                selectedDirection === 'horizontal' ? [0, 0.5] :
                selectedDirection === 'vertical' ? [0.5, 0] :
                [0, 0]
              }
              end={
                selectedDirection === 'horizontal' ? [1, 0.5] :
                selectedDirection === 'vertical' ? [0.5, 1] :
                [1, 1]
              }
              style={styles.gradientFill}
            />
            <Text style={styles.gradientName}>{gradient.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Background Color</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[styles.typeButton, selectedType === 'solid' && styles.selectedTypeButton]}
              onPress={() => handleTypeChange('solid')}
            >
              <Text style={[styles.typeButtonText, selectedType === 'solid' && styles.selectedTypeButtonText]}>
                Solid Colors
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeButton, selectedType === 'gradient' && styles.selectedTypeButton]}
              onPress={() => handleTypeChange('gradient')}
            >
              <Text style={[styles.typeButtonText, selectedType === 'gradient' && styles.selectedTypeButtonText]}>
                Gradients
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {selectedType === 'solid' ? renderSolidColors() : renderGradients()}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
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
    maxHeight: "80%" as const,
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
  typeSelector: {
    flexDirection: "row" as const,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: spacing.sm,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.sm - 4,
    alignItems: "center" as const,
  },
  selectedTypeButton: {
    backgroundColor: colors.primary,
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: "500" as const,
    color: colors.text.secondary,
  },
  selectedTypeButtonText: {
    color: colors.background,
  },
  content: {
    maxHeight: 400,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  directionSelector: {
    marginBottom: spacing.lg,
  },
  directionButtons: {
    flexDirection: "row" as const,
    gap: spacing.sm,
  },
  directionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  selectedDirectionButton: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  directionButtonText: {
    fontSize: 20,
    color: colors.text.secondary,
  },
  selectedDirectionButtonText: {
    color: colors.background,
  },
  customGradientSection: {
    marginBottom: spacing.lg,
  },
  gradientPreview: {
    alignItems: "center" as const,
    marginBottom: spacing.md,
  },
  previewGradient: {
    width: "100%" as const,
    height: 80,
    borderRadius: spacing.sm,
    marginBottom: spacing.xs,
  },
  previewLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: "500" as const,
  },
  colorSelectors: {
    flexDirection: "row" as const,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  colorSelectorButton: {
    flex: 1,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    padding: spacing.sm,
    borderRadius: spacing.sm,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  activeColorSelector: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "20",
  },
  colorIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  colorSelectorText: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: colors.text.secondary,
  },
  activeColorSelectorText: {
    color: colors.primary,
    fontWeight: "600" as const,
  },
  colorPickerLabel: {
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: "center" as const,
  },
  colorBarContainer: {
    marginBottom: spacing.md,
  },
  colorBarLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    fontWeight: "500" as const,
  },
  touchableColorBar: {
    borderRadius: spacing.sm,
  },
  colorBar: {
    height: 40,
    borderRadius: spacing.sm,
  },
  quickColors: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    justifyContent: "space-between" as const,
    marginBottom: spacing.md,
  },
  quickColorButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginBottom: spacing.xs,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedQuickColor: {
    borderColor: colors.primary,
    borderWidth: 3,
  },
  customButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignSelf: "center" as const,
    marginTop: spacing.sm,
  },
  customButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: "600" as const,
  },
  colorGrid: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    justifyContent: "space-between" as const,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedColor: {
    borderColor: colors.primary,
    borderWidth: 3,
  },
  gradientGrid: {
    gap: spacing.md,
  },
  gradientButton: {
    height: 60,
    borderRadius: spacing.sm,
    overflow: "hidden" as const,
    borderWidth: 2,
    borderColor: "transparent",
    position: "relative" as const,
  },
  selectedGradient: {
    borderColor: colors.primary,
    borderWidth: 3,
  },
  gradientFill: {
    flex: 1,
  },
  gradientName: {
    position: "absolute" as const,
    bottom: 8,
    left: 12,
    color: "white",
    fontSize: 14,
    fontWeight: "600" as const,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
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