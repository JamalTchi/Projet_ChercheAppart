import { Text, TextInput, TextInputProps, View } from 'react-native';

type FormFieldProps = {
  label: string;
  error?: string;
} & TextInputProps;

export const FormField = ({ label, error, ...inputProps }: FormFieldProps) => {
  return (
    <View className="mb-5">
      <Text className="mb-2 text-sm font-semibold text-textPrimary">{label}</Text>
      <TextInput
        placeholderTextColor="#9CA3AF"
        className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-textPrimary"
        {...inputProps}
      />
      {error ? <Text className="mt-1 text-sm text-red-500">{error}</Text> : null}
    </View>
  );
};

