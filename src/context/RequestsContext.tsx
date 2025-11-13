import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';

export type Request = {
  id: string;
  city: string;
  budget: string;
  type?: string;
  furnished?: string;
  moveInDate?: string;
  description?: string;
  email: string;
  createdAt: string;
};

type RequestInput = Omit<Request, 'id' | 'createdAt'>;

type RequestsContextValue = {
  requests: Request[];
  addRequest: (payload: RequestInput) => void;
  getRequestById: (id: string) => Request | undefined;
};

const initialRequests: Request[] = [
  {
    id: 'initial-1',
    city: 'Paris',
    budget: '1500',
    type: 'T2',
    furnished: 'Meublé',
    moveInDate: 'Janvier 2026',
    description: 'Couple de jeunes actifs recherchant un appartement lumineux proche des transports.',
    email: 'marie.dupont@example.com',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'initial-2',
    city: 'Lyon',
    budget: '1200',
    type: 'T3',
    furnished: 'Non meublé',
    moveInDate: 'Février 2026',
    description: 'Famille avec un enfant, souhaite un quartier calme avec écoles à proximité.',
    email: 'pierre.martin@example.com',
    createdAt: new Date().toISOString(),
  },
];

const RequestsContext = createContext<RequestsContextValue | undefined>(undefined);

export const RequestsProvider = ({ children }: { children: ReactNode }) => {
  const [requests, setRequests] = useState<Request[]>(initialRequests);

  const addRequest = useCallback((payload: RequestInput) => {
    setRequests((prev) => [
      {
        ...payload,
        id: `request-${Date.now()}`,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  }, []);

  const getRequestById = useCallback(
    (id: string) => requests.find((request) => request.id === id),
    [requests],
  );

  const value = useMemo(
    () => ({
      requests,
      addRequest,
      getRequestById,
    }),
    [requests, addRequest, getRequestById],
  );

  return <RequestsContext.Provider value={value}>{children}</RequestsContext.Provider>;
};

export const useRequests = () => {
  const context = useContext(RequestsContext);
  if (!context) {
    throw new Error('useRequests must be used within a RequestsProvider');
  }
  return context;
};

export type { RequestInput };

