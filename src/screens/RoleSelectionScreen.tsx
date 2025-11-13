import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { Button } from '../components/Button';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RoleSelection'>;

export const RoleSelectionScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <View className="flex-1 bg-background relative">
        {/* Blob decorations */}
        <View 
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
          style={{ backgroundColor: '#2563EB' }}
        />
        <View 
          className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full opacity-15"
          style={{ backgroundColor: '#7C3AED' }}
        />
        <View 
          className="absolute top-1/3 -right-16 w-64 h-64 rounded-full opacity-10"
          style={{ backgroundColor: '#EC4899' }}
        />

        {/* Content */}
        <View className="flex-1 items-center justify-center px-8 z-10">
        <Text className="mb-2 text-3xl font-bold text-textPrimary">ChercheAppart</Text>
        <Text className="mb-12 text-center text-base text-textSecondary">
          Trouvez la location idéale ou accompagnez les locataires dans leur recherche.
        </Text>

        <View className="w-full space-y-4">
          <Button
            label="Je cherche un appart"
            onPress={() => navigation.navigate('ClientForm')}
          />
          <Button
            label="Je suis chasseur d’appart"
            variant="secondary"
            onPress={() => navigation.navigate('HunterList')}
          />
        </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

