// src/components/LazyImage.tsx
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  /**
   * Affiché avant le chargement de l'image réelle.
   * Par défaut : petit SVG gris inline (très léger).
   */
  placeholder?: string;
  /**
   * Dimensions facultatives pour réduire le CLS.
   * (sinon gère la taille via les classes Tailwind)
   */
  width?: number;
  height?: number;
  /**
   * Forward de l'événement onLoad (uniquement quand la VRAIE image est chargée).
   */
  onLoad?: () => void;
  /**
   * Options avancées : srcSet/sizes pour responsive images
   */
  srcSet?: string;
  sizes?: string;
};

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E",
  width,
  height,
  onLoad,
  srcSet,
  sizes,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // <- chargement de l'IMAGE RÉELLE seulement
  const [hadError, setHadError] = useState(false);

  // Lazy observe
  useEffect(() => {
    if (!imgRef.current) return;

    // Fallback si IntersectionObserver non dispo
    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );

    io.observe(imgRef.current);
    return () => io.disconnect();
  }, []);

  // OnLoad : on ignore le placeholder (data:) et on ne valide que la vraie image
  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const current = e.currentTarget;
    if (current.currentSrc.startsWith("data:")) return; // ignore le placeholder
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    // En cas d’erreur réseau, on bascule sur le placeholder et on “termine”
    setHadError(true);
    setIsLoaded(true);
  };

  // On alimente la balise avec placeholder tant qu’elle n’est pas dans le viewport
  const effectiveSrc = isInView && !hadError ? src : placeholder;
  const effectiveSrcSet = isInView && !hadError ? srcSet : undefined;

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        // si width/height fournis, fixe la boîte pour limiter le CLS
        width && height ? "inline-block" : undefined
      )}
      style={width && height ? { width, height } : undefined}
    >
      {/* Skeleton doux tant que l’image réelle n’est pas chargée */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted/60 animate-pulse" aria-hidden="true" />
      )}

      <img
        ref={imgRef}
        src={effectiveSrc}
        srcSet={effectiveSrcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          // léger effet “blur-up” et fade-in
          "transition-all duration-500 ease-out will-change-transform",
          isLoaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-[1.02]",
          className
        )}
        // Accessibilité : indique l’état de chargement
        aria-busy={!isLoaded}
      />
    </div>
  );
};

export default LazyImage;
