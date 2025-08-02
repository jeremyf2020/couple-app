import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { typography } from '../style/theme';
import { homeStyles } from '../style/home';

type ViewMode = 'default' | 'editMode';

export default function Home() {
  const [mode, setMode] = useState<ViewMode>('default');

  const toggleMode = () => {
    setMode(mode === 'default' ? 'editMode' : 'default');
  };

  const renderFilmHoles = () => {
    const holes = [];
    for (let i = 0; i < 30; i++) {
      holes.push(<View key={i} style={homeStyles.filmHole} />);
    }
    return holes;
  };

  if (mode === 'editMode') {
    return (
      <SafeAreaView style={homeStyles.filmStripMode}>
        <TouchableOpacity style={homeStyles.modeToggle} onPress={toggleMode}>
          <Text style={homeStyles.modeToggleText}>Default</Text>
        </TouchableOpacity>
        
        <View style={homeStyles.filmStripContainer}>
          <View style={homeStyles.filmHoles}>
            {renderFilmHoles()}
          </View>
          <View style={homeStyles.filmHolesRight}>
            {renderFilmHoles()}
          </View>
          <View style={homeStyles.filmStripBorder} />
          <View style={homeStyles.filmStripBorderBottom} />
          
          <View style={homeStyles.filmContent}>
            <Text style={typography.title}>Home</Text>
            <Text style={typography.body}>Welcome to your couple app!</Text>
            <Text style={[typography.caption, { marginTop: 20, textAlign: 'center' }]}>
              Edit Mode - Capture your memories together
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={homeStyles.backgroundMode}>
      <TouchableOpacity style={homeStyles.modeToggle} onPress={toggleMode}>
        <Text style={homeStyles.modeToggleText}>Edit Mode</Text>
      </TouchableOpacity>
      
      <Text style={[typography.title, homeStyles.lightText]}>Home</Text>
      <Text style={[typography.body, homeStyles.lightText]}>Welcome to your couple app!</Text>
      <Text style={[typography.caption, homeStyles.lightText, { marginTop: 20, textAlign: 'center' }]}>
        Default Mode - Your shared space
      </Text>
    </SafeAreaView>
  );
}