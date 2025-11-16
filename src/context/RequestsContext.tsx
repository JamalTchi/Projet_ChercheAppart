import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';

export type Request = {
  id: string;
  city: string;
  budget: string;
  type?: string | null;
  furnished?: string | null;
  move_in_date?: string | null;
  description?: string | null;
  email: string;
  created_at: string;
};

type RequestInput = Omit<Request, 'id' | 'created_at'>;

type RequestsContextValue = {
  requests: Request[];
  addRequest: (payload: RequestInput) => Promise<void>;
  getRequestById: (id: string) => Request | undefined;
  loading: boolean;
};

const RequestsContext = createContext<RequestsContextValue | undefined>(undefined);

export const RequestsProvider = ({ children }: { children: ReactNode }) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les demandes au démarrage
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const addRequest = useCallback(async (payload: RequestInput) => {
    try {
      const { data, error } = await supabase
        .from('requests')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setRequests((prev) => [data, ...prev]);
      }
    } catch (error) {
      console.error('Error adding request:', error);
      throw error;
    }
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
      loading,
    }),
    [requests, addRequest, getRequestById, loading],
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

