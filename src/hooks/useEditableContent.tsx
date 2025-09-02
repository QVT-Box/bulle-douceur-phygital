import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface EditableContentItem {
  id: string;
  page_name: string;
  section_name: string;
  content_key: string;
  content_type: string;
  content_value: any;
  default_value: any;
  description?: string;
  created_at: string;
  updated_at: string;
}

export const useEditableContent = (pageName?: string) => {
  const [contents, setContents] = useState<EditableContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchContent = async () => {
    try {
      setLoading(true);
      let query = supabase.from('editable_content').select('*');
      
      if (pageName) {
        query = query.eq('page_name', pageName);
      }
      
      const { data, error } = await query.order('section_name', { ascending: true });
      
      if (error) throw error;
      setContents(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement du contenu:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger le contenu éditable.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (id: string, newValue: any) => {
    try {
      const { error } = await supabase
        .from('editable_content')
        .update({ 
          content_value: newValue,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      // Mettre à jour l'état local
      setContents(prev => prev.map(item => 
        item.id === id 
          ? { ...item, content_value: newValue, updated_at: new Date().toISOString() }
          : item
      ));

      toast({
        title: "Succès",
        description: "Contenu mis à jour avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le contenu.",
        variant: "destructive",
      });
    }
  };

  const createContent = async (contentData: Omit<EditableContentItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('editable_content')
        .insert(contentData)
        .select()
        .single();

      if (error) throw error;

      setContents(prev => [...prev, data]);
      toast({
        title: "Succès",
        description: "Nouveau contenu créé avec succès.",
      });
      
      return data;
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le contenu.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchContent();
  }, [pageName]);

  return {
    contents,
    loading,
    updateContent,
    createContent,
    refetch: fetchContent
  };
};