import { useState, useEffect } from "react";
import { getTwibbonDisplayUrl, getTwibbonUrl } from "@/lib/utils/url";

/**
 * Custom hook untuk handle URL dinamis
 * Menghindari hydration issues dengan client-side rendering
 */
export const useDynamicUrl = () => {
  const [isClient, setIsClient] = useState(false);
  const [displayUrl, setDisplayUrl] = useState("frame.id/id/twibbon/");

  useEffect(() => {
    setIsClient(true);
    setDisplayUrl(getTwibbonDisplayUrl());
  }, []);

  const getTwibbonUrlDynamic = (slug: string) => {
    if (!isClient) {
      // Server-side fallback
      return `/twibbon/${slug}`;
    }
    return getTwibbonUrl(slug);
  };

  const getDisplayUrlDynamic = () => {
    if (!isClient) {
      // Server-side fallback
      return "frame.id/id/twibbon/";
    }
    return displayUrl;
  };

  return {
    isClient,
    getTwibbonUrl: getTwibbonUrlDynamic,
    getDisplayUrl: getDisplayUrlDynamic,
  };
};
