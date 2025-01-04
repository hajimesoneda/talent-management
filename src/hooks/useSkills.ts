import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Skill {
  id: string;
  name: string;
  category: string;
}

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('available_skills')
          .select('*')
          .order('name');

        if (error) throw error;
        setSkills(data || []);
      } catch (err) {
        console.error('Error fetching skills:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch skills');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { skills, isLoading, error };
};