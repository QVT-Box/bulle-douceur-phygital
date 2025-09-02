import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface StorageImage {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: {
    eTag: string;
    size: number;
    mimetype: string;
    cacheControl: string;
    lastModified: string;
    contentLength: number;
    httpStatusCode: number;
  };
  publicUrl: string;
}

export const useImageStorage = () => {
  const [images, setImages] = useState<StorageImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data: files, error } = await supabase.storage
        .from('content-images')
        .list('content', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) throw error;

      const imagesWithUrls: StorageImage[] = files.map(file => ({
        name: file.name,
        id: file.id || file.name,
        updated_at: file.updated_at,
        created_at: file.created_at,
        last_accessed_at: file.last_accessed_at,
        metadata: {
          eTag: file.metadata?.eTag || '',
          size: file.metadata?.size || 0,
          mimetype: file.metadata?.mimetype || 'image/jpeg',
          cacheControl: file.metadata?.cacheControl || 'max-age=3600',
          lastModified: file.metadata?.lastModified || file.updated_at,
          contentLength: file.metadata?.contentLength || file.metadata?.size || 0,
          httpStatusCode: file.metadata?.httpStatusCode || 200
        },
        publicUrl: supabase.storage
          .from('content-images')
          .getPublicUrl(`content/${file.name}`).data.publicUrl
      }));

      setImages(imagesWithUrls);
    } catch (error) {
      console.error('Erreur lors du chargement des images:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les images.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<StorageImage | null> => {
    try {
      setUploading(true);

      // Validation du fichier
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Type de fichier non supporté",
          description: `Types acceptés: ${allowedTypes.join(', ')}`,
          variant: "destructive",
        });
        return null;
      }

      if (file.size > maxSize) {
        toast({
          title: "Fichier trop volumineux",
          description: "Taille maximum: 5MB",
          variant: "destructive",
        });
        return null;
      }

      // Génération du nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `content/${fileName}`;

      // Upload du fichier
      const { data, error } = await supabase.storage
        .from('content-images')
        .upload(filePath, file);

      if (error) throw error;

      // Récupération de l'URL publique
      const { data: publicUrl } = supabase.storage
        .from('content-images')
        .getPublicUrl(data.path);

      // Création de l'objet image
      const newImage: StorageImage = {
        name: fileName,
        id: data.id || fileName,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        last_accessed_at: new Date().toISOString(),
        metadata: {
          eTag: '',
          size: file.size,
          mimetype: file.type,
          cacheControl: 'max-age=3600',
          lastModified: new Date().toISOString(),
          contentLength: file.size,
          httpStatusCode: 200
        },
        publicUrl: publicUrl.publicUrl
      };

      // Ajout à la liste locale
      setImages(prev => [newImage, ...prev]);

      toast({
        title: "Image uploadée avec succès",
        description: file.name,
      });

      return newImage;
    } catch (error) {
      console.error('Erreur upload:', error);
      toast({
        title: "Erreur d'upload",
        description: "Impossible d'uploader l'image",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (imageName: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from('content-images')
        .remove([`content/${imageName}`]);

      if (error) throw error;

      // Suppression de la liste locale
      setImages(prev => prev.filter(img => img.name !== imageName));

      toast({
        title: "Image supprimée",
        description: imageName,
      });

      return true;
    } catch (error) {
      console.error('Erreur suppression:', error);
      toast({
        title: "Erreur de suppression",
        description: "Impossible de supprimer l'image",
        variant: "destructive",
      });
      return false;
    }
  };

  const getImageUrl = (imageName: string): string => {
    return supabase.storage
      .from('content-images')
      .getPublicUrl(`content/${imageName}`)
      .data.publicUrl;
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return {
    images,
    loading,
    uploading,
    uploadImage,
    deleteImage,
    getImageUrl,
    refetch: fetchImages
  };
};