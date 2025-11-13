import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo } from 'react';
import { Button } from '../components/Button';
import { RequestCard } from '../components/RequestCard';
import { useRequests } from '../context/RequestsContext';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'HunterList'>;

export const HunterListScreen = ({ navigation }: Props) => {
  const { requests } = useRequests();

  const sortedRequests = useMemo(
    () => [...requests].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [requests],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <View className="flex-1 bg-background">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="px-5 pt-4 pb-2 flex-row items-center"
        >
          <Text className="text-2xl text-primary">←</Text>
          <Text className="ml-2 text-base text-primary font-medium">Retour</Text>
        </TouchableOpacity>
        <View className="flex-row items-center justify-between px-5 pt-2">
          <Text className="text-2xl font-bold text-textPrimary">Demandes de location</Text>
          <Button
            label="Déposer une demande"
            variant="secondary"
            fullWidth={false}
            className="px-5"
            onPress={() => navigation.navigate('ClientForm')}
          />
        </View>

        {sortedRequests.length === 0 ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-center text-base text-textSecondary">
              Aucune demande pour le moment. Encouragez vos clients à publier leur recherche !
            </Text>
          </View>
        ) : (
          <FlatList
            data={sortedRequests}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 24 }}
            renderItem={({ item }) => (
              <Pressable onPress={() => navigation.navigate('RequestDetail', { requestId: item.id })}>
                <RequestCard request={item} />
              </Pressable>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

