import React, { useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, Image, ActivityIndicator, Dimensions, Alert } from 'react-native';
import ThemedView from '../../components/themes/themedView';
import { useRestaurantStore } from '../../store/useRestaurants';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const Home = () => {
  const { fetchRestaurants, data, loading, error, fetchSingleRestaurant } = useRestaurantStore();
  const router = useRouter();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const cardColors = ['#FBBF24', '#60A5FA', '#34D399', '#F472B6', '#A78BFA'];

  const handlePress = async (id) => {
    try {
      await fetchSingleRestaurant(id);
      router.push(`/(tabs)/id`);
    } catch (error) {
      Alert.alert("Error Fetching Restaurant");
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Bringing delicious vibes...</Text>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.errorContainer}>
        <Text style={styles.errorText}>Oops! Couldn't load restaurants</Text>
        <Pressable onPress={fetchRestaurants} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container} safe={true}>
      <View style={styles.header}>
        <Text style={styles.title}>Chow Naija</Text>
        <Text style={styles.subtitle}>Your Food Adventure Starts Here</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.restaurantId.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Pressable style={styles.cardPressable} onPress={() => handlePress(item.restaurantId)}>
            <View style={[styles.card, { backgroundColor: cardColors[index % cardColors.length] }]}>
              <Image
                source={{ uri: `data:${item.restaurantImageType};base64,${item.restaurantImageData}` }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.overlay} />
              <View style={styles.cardContent}>
                <Text style={styles.restaurantName}>{item.restaurantName}</Text>
                <Text style={styles.description} numberOfLines={2}>{item.restaurantDescription}</Text>
                <View style={styles.footer}>
                  <Text style={styles.rating}>⭐ {item.restaurantRating}</Text>
                  <Text style={styles.location}>{item.restaurantLocation}</Text>
                </View>
              </View>
            </View>
          </Pressable>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ActivityIndicator size="large" color="#4F46E5" />
            <Text style={styles.loadingText}>Loading All Restaurants. Bear With Us</Text>
          </View>
        }
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, fontSize: 18, fontWeight: '600', color: '#4F46E5' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  errorText: { fontSize: 18, fontWeight: '600', color: '#EF4444', textAlign: 'center', marginBottom: 20 },
  retryButton: { backgroundColor: '#4F46E5', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  retryButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  header: { padding: 24, paddingTop: 50, alignItems: 'center', backgroundColor: '#F9FAFB', marginBottom: 12 },
  title: { fontSize: 34, fontWeight: '900', color: '#4F46E5', fontFamily: 'Trebuchet MS' },
  subtitle: { fontSize: 16, color: '#6B7280', marginTop: 6, textAlign: 'center' },
  listContent: { paddingBottom: 24 },
  cardPressable: { alignItems: 'center', marginBottom: 16 },
  card: {
    width: width * 0.9,
    height: 240,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: 'relative',
  },
  cardImage: { width: '100%', height: '100%', position: 'absolute' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  restaurantName: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 4 },
  description: { fontSize: 14, color: '#E5E7EB', marginBottom: 8 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rating: { fontSize: 14, color: '#fff', fontWeight: '700' },
  location: { fontSize: 12, color: '#D1D5DB', fontStyle: 'italic' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, marginTop: 30 },
});

export default Home;
