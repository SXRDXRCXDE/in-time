import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface CaseImage {
  url: string;
  alt: string;
}

export interface CaseChallenge {
  problem: string;
  solution: string;
}

export interface Case {
  id: string;
  slug: string;
  title: string;
  category: string;
  result: string;
  description: string;
  challenges: CaseChallenge[];
  images: CaseImage[];
}

export const useCases = () => {
  const { i18n } = useTranslation();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const lang = i18n.language.split('-')[0]; // Получаем 'ru' из 'ru-RU'
        const response = await fetch(`/api/cases/?lang=${lang}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch cases');
        }
        
        const data = await response.json();
        setCases(data.cases || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching cases:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setCases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [i18n.language]);

  return { cases, loading, error };
};

export const useCase = (id: string | undefined) => {
  const { i18n } = useTranslation();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchCase = async () => {
      try {
        setLoading(true);
        const lang = i18n.language.split('-')[0];
        const response = await fetch(`/api/cases/${id}/?lang=${lang}`);
        
        if (!response.ok) {
          throw new Error('Case not found');
        }
        
        const data = await response.json();
        setCaseData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching case:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setCaseData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [id, i18n.language]);

  return { caseData, loading, error };
};
