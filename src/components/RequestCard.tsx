import { Text, View } from 'react-native';
import type { Request } from '../context/RequestsContext';

type RequestCardProps = {
  request: Request;
};

export const RequestCard = ({ request }: RequestCardProps) => {
  return (
    <View className="mb-4 rounded-2xl bg-white p-5 shadow-sm">
      <Text className="text-lg font-semibold text-textPrimary">
        {request.city} · {request.budget} €
      </Text>
      {(request.type || request.furnished) && (
        <Text className="mt-1 text-sm text-textSecondary">
          {request.type ?? 'Type indifférent'}
          {request.furnished ? ` · ${request.furnished}` : ''}
        </Text>
      )}
      {request.description ? (
        <Text className="mt-3 text-sm text-textPrimary" numberOfLines={2}>
          {request.description}
        </Text>
      ) : null}
    </View>
  );
};

