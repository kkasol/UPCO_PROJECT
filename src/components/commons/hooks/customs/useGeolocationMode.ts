import { useEffect, useState } from "react";

export const useGeolocationMode = (): {
  geolocationFn: () => void;
  position: GeolocationPosition | null;
} => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);

  const geolocationFn = (): void => {
    useEffect(() => {
      const watcher = navigator.geolocation.watchPosition(
        (position) => {
          setPosition(position);
        },

        (error) => {
          alert(error);
        },
        { enableHighAccuracy: true }
      );
      return () => {
        navigator.geolocation.clearWatch(watcher);
      };
    }, []);
  };

  return {
    position,
    geolocationFn,
  };
};
