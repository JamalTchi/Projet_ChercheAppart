import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { useRequests } from '../context/RequestsContext';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RequestDetail'>;

const formatValue = (value?: string | null) => value ?? 'Non précisé';

export const RequestDetailScreen = ({ route, navigation }: Props) => {
  const { getRequestById } = useRequests();
  const request = getRequestById(route.params.requestId);

  const handleContact = () => {
    if (!request) return;
    const subject = encodeURIComponent(`Recherche appartement - ${request.city}`);
    const body = encodeURIComponent(
      `Bonjour,\n\nJe suis chasseur d’appart et je souhaite en savoir plus sur votre recherche à ${request.city}.`,
    );
    Linking.openURL(`mailto:${request.email}?subject=${subject}&body=${body}`);
  };

  if (!request) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
        <View className="flex-1 items-center justify-center bg-background px-6">
          <Text className="mb-4 text-lg font-semibold text-textPrimary">
            Oups, cette demande n’existe plus.
          </Text>
          <Button label="Retour à la liste" onPress={() => navigation.navigate('HunterList')} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <View className="flex-1 bg-background">
        {/* Bouton retour */}
        <View className="px-5 pt-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex-row items-center"
          >
            <Text className="text-2xl text-primary">←</Text>
            <Text className="ml-2 text-base font-semibold text-primary">Retour</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="rounded-3xl bg-white p-6 shadow-sm">
            <Text className="text-2xl font-bold text-textPrimary">
              {request.city} · {request.budget} €
            </Text>
            <Text className="mt-2 text-sm text-textSecondary">
              Publié le {new Date(request.created_at).toLocaleDateString('fr-FR')}
            </Text>

            <View className="mt-6 space-y-4">
              <View>
                <Text className="text-xs uppercase tracking-wide text-textSecondary">Type</Text>
                <Text className="mt-1 text-base text-textPrimary">{formatValue(request.type || undefined)}</Text>
              </View>
              <View>
                <Text className="text-xs uppercase tracking-wide text-textSecondary">Meublé</Text>
                <Text className="mt-1 text-base text-textPrimary">
                  {formatValue(request.furnished || undefined)}
                </Text>
              </View>
              <View>
                <Text className="text-xs uppercase tracking-wide text-textSecondary">
                  Date d'entrée souhaitée
                </Text>
                <Text className="mt-1 text-base text-textPrimary">
                  {formatValue(request.move_in_date || undefined)}
                </Text>
              </View>
              <View>
                <Text className="text-xs uppercase tracking-wide text-textSecondary">
                  Description
                </Text>
                <Text className="mt-1 text-base leading-6 text-textPrimary">
                  {formatValue(request.description || undefined)}
                </Text>
              </View>
              <View>
                <Text className="text-xs uppercase tracking-wide text-textSecondary">
                  Contact email
                </Text>
                <Text className="mt-1 text-base text-textPrimary">{request.email}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View className="absolute bottom-0 left-0 right-0 bg-background px-5 pb-8">
          <Button label="Contacter le client" onPress={handleContact} />
        </View>
      </View>
    </SafeAreaView>
  );
};

