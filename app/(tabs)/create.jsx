import React, { useState } from 'react';
import { StyleSheet, TextInput, ScrollView, Image, Alert, ActivityIndicator, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Linking from 'expo-linking';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedView from '../../components/themes/themedView';
import ThemedText from '../../components/themes/themedText';
import ThemeButton from '../../components/themes/themeButton';
import ThemeButtonText from '../../components/themes/themeButtonText';
import { Colors } from '../../constants/Color';
import { useRestaurantStore } from '../../store/useRestaurants';

const Create = () => {
  const [restaurant, setRestaurant] = useState({
    restaurantName: '',
    restaurantDescription: '',
    restaurantLocation: '',
    restaurantRating: '',
    restaurantImage: null,
  });

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const { createRestaurant, addingRestaurant } = useRestaurantStore();

  const handleInputChange = (field, value) => {
    setRestaurant((prev) => ({ ...prev, [field]: value }));
  };
const handleImagePick = async () => {
  const { status, canAskAgain } = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    if (canAskAgain) {
      const { status: newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (newStatus !== 'granted') {
        Alert.alert('Permission Denied', 'Enable access in settings.');
        return;
      }
    } else {
      Alert.alert('Permission Required', 'Open settings to grant access.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ]);
      return;
    }
  }

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const image = result.assets[0];

      // Check file size (500KB = 512000 bytes)
      if (image.fileSize && image.fileSize > 512000) {
        Alert.alert('Image Too Large', 'Please select an image smaller than 500KB.');
        return;
      }

      setRestaurant((prev) => ({
        ...prev,
        restaurantImage: image,
      }));
    }
  } catch (error) {
    console.error('Image Picker Error:', error);
    Alert.alert('Error', 'Image selection failed.');
  }
};

  const handleSubmit = async () => {
    const { restaurantName, restaurantDescription, restaurantLocation, restaurantRating, restaurantImage } = restaurant;

    if (!restaurantName || !restaurantDescription || !restaurantLocation || !restaurantRating || !restaurantImage) {
      Alert.alert('Missing Fields', 'Please fill all fields and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('restaurant', JSON.stringify({ restaurantName, restaurantDescription, restaurantLocation, restaurantRating }));
    formData.append('image', {
      uri: restaurantImage.uri,
      name: 'photo.jpg',
      type: restaurantImage.type || 'image/jpeg',
    });

    const success = await createRestaurant(formData);

    if (success === true) {
      setRestaurant({ restaurantName: '', restaurantDescription: '', restaurantLocation: '', restaurantRating: '', restaurantImage: null });
      Alert.alert('Success', 'Restaurant created successfully!');
    } else {
      Alert.alert('Error', 'Failed to create restaurant.');
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]} safe={true}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.headerContainer}>
          <ThemedText title={true} style={styles.headerTitle}>Add a New Restaurant</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Share your favorite dining spots with the world!</ThemedText>
        </View>

        <View style={[styles.card, { backgroundColor: theme.uiBackground }]}>
          <ThemedText style={styles.label}>Restaurant Name</ThemedText>
          <TextInput
            style={[styles.input, { borderColor: theme.text }]}
            placeholder="e.g., Mama Put"
            placeholderTextColor={theme.text}
            value={restaurant.restaurantName}
            onChangeText={(text) => handleInputChange('restaurantName', text)}
          />

          <ThemedText style={styles.label}>Description</ThemedText>
          <TextInput
            style={[styles.input, styles.textArea, { borderColor: theme.text }]}
            placeholder="Brief description..."
            placeholderTextColor={theme.text}
            value={restaurant.restaurantDescription}
            onChangeText={(text) => handleInputChange('restaurantDescription', text)}
            multiline
          />

          <ThemedText style={styles.label}>Location</ThemedText>
          <TextInput
            style={[styles.input, { borderColor: theme.text }]}
            placeholder="City, State"
            placeholderTextColor={theme.text}
            value={restaurant.restaurantLocation}
            onChangeText={(text) => handleInputChange('restaurantLocation', text)}
          />

          <ThemedText style={styles.label}>Rating (1-5)</ThemedText>
          <TextInput
            style={[styles.input, { borderColor: theme.text }]}
            placeholder="4.5"
            placeholderTextColor={theme.text}
            keyboardType="numeric"
            value={restaurant.restaurantRating}
            onChangeText={(text) => handleInputChange('restaurantRating', text)}
          />

          <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
            <Ionicons name="image-outline" size={24} color={theme.text} />
            <ThemedText style={{ marginLeft: 8 }}>Select an Image</ThemedText>
          </TouchableOpacity>

          {restaurant.restaurantImage && (
            <Image
              source={{ uri: restaurant.restaurantImage.uri }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          )}

          <ThemeButton style={styles.submitButton} onPress={handleSubmit}>
            <ThemeButtonText>
              {addingRestaurant ? <ActivityIndicator size="small" color="white" /> : "Add Restaurant"}
            </ThemeButtonText>
          </ThemeButton>
        </View>

      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  headerContainer: { marginBottom: 20, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  headerSubtitle: { fontSize: 16, textAlign: 'center', marginTop: 6, color: '#888' },
  card: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  label: { marginBottom: 4, fontSize: 14, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  submitButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#5C6BC0',
  },
});

export default Create;
