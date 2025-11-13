import { Pressable, Text } from 'react-native';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary',
  secondary: 'bg-white border border-primary',
};

const textVariantClasses: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-primary',
};

export const Button = ({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  fullWidth = true,
  className = '',
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`${fullWidth ? 'w-full' : ''} rounded-full py-3.5 px-4 items-center justify-center ${
        variantClasses[variant]
      } ${disabled ? 'opacity-60' : ''} ${className}`}
      accessibilityRole="button"
    >
      <Text className={`text-base font-semibold ${textVariantClasses[variant]}`}>{label}</Text>
    </Pressable>
  );
};

