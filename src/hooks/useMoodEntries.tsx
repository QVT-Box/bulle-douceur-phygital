import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface MoodEntry {
  id: string;
  date: string;
  energy_level: number;
  stress_level: number;
  motivation: number;
  social_connection: number;
  work_satisfaction: number;
  comment?: string;
  created_at: string;
}

interface DailyBubble {
  id: string;
  date: string;
  bubble_type: string;
  intensity: number;
  message: string;
  ritual_suggestion?: string;
  created_at: string;
}

export const useMoodEntries = () => {
  const { user } = useAuth();
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [dailyBubbles, setDailyBubbles] = useState<DailyBubble[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMoodEntries();
      fetchDailyBubbles();
    }
  }, [user]);

  const fetchMoodEntries = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching mood entries:', error);
        return;
      }

      setMoodEntries(data || []);
    } catch (error) {
      console.error('Mood entries fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDailyBubbles = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('daily_bubbles')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching daily bubbles:', error);
        return;
      }

      setDailyBubbles(data || []);
    } catch (error) {
      console.error('Daily bubbles fetch error:', error);
    }
  };

  const createMoodEntry = async (moodData: Omit<MoodEntry, 'id' | 'created_at'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .upsert({
          user_id: user.id,
          ...moodData
        }, {
          onConflict: 'user_id,date'
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      await fetchMoodEntries();
      await fetchDailyBubbles();
      
      return data;
    } catch (error) {
      console.error('Error creating mood entry:', error);
      throw error;
    }
  };

  return {
    moodEntries,
    dailyBubbles,
    loading,
    createMoodEntry,
    refetch: () => {
      fetchMoodEntries();
      fetchDailyBubbles();
    }
  };
};