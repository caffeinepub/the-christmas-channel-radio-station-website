import { useEffect, useState } from 'react';
import { useGetDJProfiles, useAddDJProfile, useClearNowPlaying } from '../hooks/useQueries';
import { ExternalBlob } from '../backend';

export default function InitializeDJProfiles() {
  const { data: djs } = useGetDJProfiles();
  const addDJProfile = useAddDJProfile();
  const clearNowPlaying = useClearNowPlaying();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Only run once and when DJs data is loaded
    if (initialized || !djs || addDJProfile.isPending || clearNowPlaying.isPending) return;

    // Check if Mark Huotari already exists
    const markExists = djs.some((dj) => dj.name === 'Mark Huotari');

    if (!markExists) {
      // Add Mark Huotari's profile
      const photo = ExternalBlob.fromURL('/assets/generated/vintage-mic.dim_400x400.jpg');
      
      addDJProfile.mutate({
        name: 'Mark Huotari',
        bio: "Mark Huotari brings cheerful holiday energy to The Christmas Channel! Whether it's afternoons full of warmth or relaxing late-night vibes, his shows keep the Christmas spirit alive around the clock.",
        photo,
      });
    }

    // Clear the now playing song
    clearNowPlaying.mutate();

    setInitialized(true);
  }, [djs, initialized, addDJProfile, clearNowPlaying]);

  return null; // This component doesn't render anything
}

