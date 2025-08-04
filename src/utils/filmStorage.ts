import AsyncStorage from '@react-native-async-storage/async-storage';
import { FilmItem } from '../types/filmItems';
import { BackgroundConfig } from '../components/home/BackgroundColorModal';

const FILM_ITEMS_KEY = 'film_items';
const BACKGROUND_CONFIG_KEY = 'background_config';

export const saveFilmItems = async (filmItems: FilmItem[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(filmItems);
    await AsyncStorage.setItem(FILM_ITEMS_KEY, jsonValue);
    console.log('Film items saved successfully');
  } catch (error) {
    console.error('Error saving film items:', error);
    throw error;
  }
};

export const loadFilmItems = async (): Promise<FilmItem[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(FILM_ITEMS_KEY);
    if (jsonValue != null) {
      const filmItems = JSON.parse(jsonValue);
      console.log('Film items loaded successfully:', filmItems.length, 'items');
      return filmItems;
    }
    return [];
  } catch (error) {
    console.error('Error loading film items:', error);
    return [];
  }
};

export const clearFilmItems = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(FILM_ITEMS_KEY);
    console.log('Film items cleared successfully');
  } catch (error) {
    console.error('Error clearing film items:', error);
    throw error;
  }
};

export const saveBackgroundConfig = async (backgroundConfig: BackgroundConfig): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(backgroundConfig);
    await AsyncStorage.setItem(BACKGROUND_CONFIG_KEY, jsonValue);
    console.log('Background config saved successfully');
  } catch (error) {
    console.error('Error saving background config:', error);
    throw error;
  }
};

export const loadBackgroundConfig = async (): Promise<BackgroundConfig | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(BACKGROUND_CONFIG_KEY);
    if (jsonValue != null) {
      const backgroundConfig = JSON.parse(jsonValue);
      console.log('Background config loaded successfully');
      return backgroundConfig;
    }
    return null;
  } catch (error) {
    console.error('Error loading background config:', error);
    return null;
  }
};