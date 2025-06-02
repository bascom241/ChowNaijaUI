import React from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ThemedView from '../../components/themes/themedView';
import { useRestaurantStore } from '../../store/useRestaurants';

const RestaurantDetails = () => {
  const { singleRetaurantContainer, loadingRestaurant } = useRestaurantStore();

  if (loadingRestaurant) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00cc66" />
        <Text style={styles.loadingText}>Bringing the flavors to you... Hang tight!</Text>
      </ThemedView>
    );
  }

  if (!singleRetaurantContainer || !singleRetaurantContainer.restaurantId) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00cc66" />
        <Text style={styles.loadingText}>Loading restaurant details...</Text>
      </ThemedView>
    );
  }

  const { width } = Dimensions.get('window');
  const {
    restaurantName,
    restaurantDescription,
    restaurantImageType,
    restaurantImageData,
    restaurantRating,
    restaurantLocation,
  } = singleRetaurantContainer;

  return (
    <ThemedView style={styles.container} safe={true}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `data:${restaurantImageType};base64,${restaurantImageData}` }}
            style={{ width: width * 0.9, height: 250, borderRadius: 15 }}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.name}>{restaurantName}</Text>
        <Text style={styles.description}>{restaurantDescription}</Text>

        {/* Feature Highlights */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>🍽️ Our Signature Experience</Text>
          <Text style={styles.sectionText}>
            Dive into an extraordinary dining journey where each plate is crafted to perfection. From sizzling steaks to vegan delights, we cater to every palate.
          </Text>
          <Text style={styles.sectionText}>✨ Must-Try: Truffle Risotto, Seafood Paella, and Chocolate Lava Cake.</Text>
          <Text style={styles.sectionText}>🎉 Special Deals: 15% off for couples, Free dessert on your birthday, and Kids eat free on Sundays!</Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Reserve Your Table</Text>
          </TouchableOpacity>
        </View>

        {/* Chef's Note */}
        <View style={styles.chefsNote}>
          <Text style={styles.chefsNoteTitle}>👨‍🍳 Chef's Note</Text>
          <Text style={styles.chefsNoteText}>
            "Each dish is a celebration of passion, tradition, and innovation. We invite you to experience a symphony of flavors that will leave you craving more."
          </Text>
        </View>

        {/* Location & Rating */}
        <View style={styles.detailsRow}>
          <Text style={styles.rating}>
            {restaurantRating ? `⭐ ${restaurantRating}/5` : '⭐ Be the first to review!'}
          </Text>
          <Text style={styles.location}>📍 {restaurantLocation}</Text>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 18, color: '#00cc66', marginTop: 10 },
  scrollContent: { alignItems: 'center', paddingBottom: 50 },
  imageContainer: {
    marginTop: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  name: { fontSize: 30, fontWeight: 'bold', marginTop: 20, textAlign: 'center', color: '#222' },
  description: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 10, marginHorizontal: 20, lineHeight: 22 },
  featuresSection: {
    marginTop: 30,
    paddingHorizontal: 20,
    backgroundColor: '#f0fdf4',
    borderRadius: 15,
    paddingVertical: 20,
    width: '90%',
    shadowColor: '#00cc66',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#00cc66', textAlign: 'center' },
  sectionText: { fontSize: 16, color: '#555', marginBottom: 8, textAlign: 'center' },
  ctaButton: {
    marginTop: 15,
    backgroundColor: '#00cc66',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  ctaButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  chefsNote: {
    marginTop: 30,
    paddingHorizontal: 20,
    backgroundColor: '#fff7ed',
    borderRadius: 15,
    paddingVertical: 20,
    width: '90%',
    shadowColor: '#ff9800',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  chefsNoteTitle: { fontSize: 18, fontWeight: 'bold', color: '#ff9800', marginBottom: 8, textAlign: 'center' },
  chefsNoteText: { fontSize: 16, color: '#444', textAlign: 'center', fontStyle: 'italic' },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  rating: { fontSize: 18, color: '#00cc66', fontWeight: 'bold' },
  location: { fontSize: 16, color: '#333' },
});

export default RestaurantDetails;
