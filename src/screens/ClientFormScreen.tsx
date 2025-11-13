import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormField } from '../components/FormField';
import { Button } from '../components/Button';
import { useRequests } from '../context/RequestsContext';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ClientForm'>;

type FormErrors = Partial<Record<'city' | 'budget' | 'email', string>>;

const furnishedOptions = ['Meublé', 'Non meublé', 'Indifférent'] as const;

export const ClientFormScreen = ({ navigation }: Props) => {
  const { addRequest } = useRequests();

  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');
  const [type, setType] = useState('');
  const [furnished, setFurnished] = useState<string | undefined>(undefined);
  const [moveInDate, setMoveInDate] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!city.trim()) {
      nextErrors.city = 'La ville est obligatoire.';
    }
    if (!budget.trim()) {
      nextErrors.budget = 'Le budget maximum est obligatoire.';
    }
    if (!email.trim()) {
      nextErrors.email = 'L’email de contact est obligatoire.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        nextErrors.email = 'Format d’email invalide.';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    addRequest({
      city: city.trim(),
      budget: budget.trim(),
      type: type.trim() || undefined,
      furnished,
      moveInDate: moveInDate.trim() || undefined,
      description: description.trim() || undefined,
      email: email.trim(),
    });

    setCity('');
    setBudget('');
    setType('');
    setFurnished(undefined);
    setMoveInDate('');
    setDescription('');
    setEmail('');
    setErrors({});

    Alert.alert(
      'Demande publiée',
      'Votre recherche est maintenant visible par les chasseurs d’appart.',
      [
        {
          text: 'Voir les demandes',
          onPress: () => navigation.navigate('HunterList'),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View className="flex-1 bg-background">
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mt-2 mb-4 flex-row items-center"
            >
              <Text className="text-2xl text-primary">←</Text>
              <Text className="ml-2 text-base text-primary font-medium">Retour</Text>
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-textPrimary">Publier ma recherche</Text>
            <Text className="mt-2 text-base text-textSecondary">
              Donnez le plus d’informations possible pour aider les chasseurs à vous contacter.
            </Text>

            <View className="mt-8">
              <FormField
                label="Ville *"
                value={city}
                onChangeText={setCity}
                placeholder="Paris, Lyon..."
                error={errors.city}
                autoCapitalize="words"
              />
              <FormField
                label="Budget max (€) *"
                value={budget}
                onChangeText={setBudget}
                placeholder="1500"
                keyboardType="numeric"
                error={errors.budget}
              />
              <FormField
                label="Type de logement"
                value={type}
                onChangeText={setType}
                placeholder="T2, Studio..."
              />

              <View className="mb-5">
                <Text className="mb-3 text-sm font-semibold text-textPrimary">Meublé</Text>
                <View className="flex-row flex-wrap gap-3">
                  {furnishedOptions.map((option) => {
                    const isActive = furnished === option;
                    return (
                      <Pressable
                        key={option}
                        onPress={() => setFurnished(option === furnished ? undefined : option)}
                        className={`rounded-full border px-4 py-2 ${
                          isActive ? 'border-primary bg-primary/10' : 'border-gray-200 bg-white'
                        }`}
                      >
                        <Text
                          className={`text-sm font-medium ${
                            isActive ? 'text-primary' : 'text-textSecondary'
                          }`}
                        >
                          {option}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <FormField
                label="Date d’entrée souhaitée"
                value={moveInDate}
                onChangeText={setMoveInDate}
                placeholder="Janvier 2026"
              />
              <FormField
                label="Description"
                value={description}
                onChangeText={setDescription}
                placeholder="Précisez vos critères, quartier, etc."
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              <FormField
                label="Email de contact *"
                value={email}
                onChangeText={setEmail}
                placeholder="vous@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.email}
              />

              <View className="mt-2 mb-4">
                <Button label="Publier ma recherche" onPress={handleSubmit} />
                <Text className="mt-3 text-center text-xs text-textSecondary">
                  * Champs obligatoires
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

