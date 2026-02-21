import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { DJProfile, Program, NowPlaying, UserProfile, ThemeSettings, BackgroundImage, TailwindColor, SongRequest, LastUpdateResult, OnAirOverride, StationInformation } from '../backend';
import { ExternalBlob } from '../backend';

// Query: Get all DJ profiles
export function useGetDJProfiles() {
  const { actor, isFetching } = useActor();

  return useQuery<DJProfile[]>({
    queryKey: ['djProfiles'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDJProfiles();
    },
    enabled: !!actor && !isFetching,
  });
}

// Query: Get program schedule
export function useGetProgramSchedule() {
  const { actor, isFetching } = useActor();

  return useQuery<Program[]>({
    queryKey: ['programSchedule'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProgramSchedule();
    },
    enabled: !!actor && !isFetching,
  });
}

// Query: Get now playing
export function useGetNowPlaying() {
  const { actor, isFetching } = useActor();

  return useQuery<NowPlaying | null>({
    queryKey: ['nowPlaying'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getNowPlaying();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000, // Refetch every 10 seconds for live updates
  });
}

// Query: Get theme settings
export function useGetThemeSettings() {
  const { actor, isFetching } = useActor();

  return useQuery<ThemeSettings>({
    queryKey: ['themeSettings'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getThemeSettings();
    },
    enabled: !!actor && !isFetching,
  });
}

// Query: Get caller user profile
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

// Query: Check if caller is admin
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// Query: Get song requests (admin only)
export function useGetSongRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<SongRequest[]>({
    queryKey: ['songRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSongRequests();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  });
}

// Query: Get last update result (admin only)
export function useGetLastUpdateResult() {
  const { actor, isFetching } = useActor();

  return useQuery<LastUpdateResult | null>({
    queryKey: ['lastUpdateResult'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getLastUpdateResult();
    },
    enabled: !!actor && !isFetching,
  });
}

// Query: Get on-air override
export function useGetOnAirOverride() {
  const { actor, isFetching } = useActor();

  return useQuery<OnAirOverride | null>({
    queryKey: ['onAirOverride'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getOnAirOverride();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000, // Refetch every 10 seconds for live updates
  });
}

// Query: Get station information
export function useGetStationInformation() {
  const { actor, isFetching } = useActor();

  return useQuery<StationInformation | null>({
    queryKey: ['stationInformation'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStationInformation();
    },
    enabled: !!actor && !isFetching,
  });
}

// Mutation: Save caller user profile
export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Mutation: Submit song request
export function useSubmitSongRequest() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (songRequest: SongRequest) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitSongRequest(songRequest);
    },
  });
}

// Mutation: Clear all song requests (admin only)
export function useClearSongRequests() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.clearSongRequests();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songRequests'] });
    },
  });
}

// Mutation: Update now playing (admin function)
export function useUpdateNowPlaying() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, artist }: { title: string; artist: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateNowPlaying(title, artist);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nowPlaying'] });
    },
  });
}

// Mutation: Clear now playing
export function useClearNowPlaying() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.clearNowPlaying();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nowPlaying'] });
    },
  });
}

// Mutation: Update theme settings
export function useUpdateThemeSettings() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      showCountdown,
      snowEnabled,
      backgroundImage,
      primaryColor,
      accentColor,
    }: {
      showCountdown: boolean;
      snowEnabled: boolean;
      backgroundImage: BackgroundImage;
      primaryColor: TailwindColor;
      accentColor: TailwindColor;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateThemeSettings(showCountdown, snowEnabled, backgroundImage, primaryColor, accentColor);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['themeSettings'] });
    },
  });
}

// Mutation: Add DJ profile
export function useAddDJProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, bio, photo }: { name: string; bio: string; photo: ExternalBlob }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addDJProfile(name, bio, photo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['djProfiles'] });
    },
  });
}

// Mutation: Update DJ profile
export function useUpdateDJProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, bio, photo }: { name: string; bio: string; photo: ExternalBlob }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateDJProfile(name, bio, photo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['djProfiles'] });
    },
  });
}

// Mutation: Delete DJ profile
export function useDeleteDJProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deleteDJProfile(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['djProfiles'] });
    },
  });
}

// Mutation: Add custom program
export function useAddCustomProgram() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, description, startTime, endTime }: { name: string; description: string; startTime: string; endTime: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addCustomProgram(name, description, startTime, endTime);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programSchedule'] });
    },
  });
}

// Mutation: Update program
export function useUpdateProgram() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, description, startTime, endTime }: { name: string; description: string; startTime: string; endTime: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateProgram(name, description, startTime, endTime);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programSchedule'] });
    },
  });
}

// Mutation: Delete program
export function useDeleteProgram() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deleteProgram(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programSchedule'] });
    },
  });
}

// Mutation: Run manual update (admin only)
export function useRunManualUpdate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (files: string[]) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.runManualUpdate(files);
    },
    onSuccess: () => {
      // Invalidate all relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['djProfiles'] });
      queryClient.invalidateQueries({ queryKey: ['programSchedule'] });
      queryClient.invalidateQueries({ queryKey: ['nowPlaying'] });
      queryClient.invalidateQueries({ queryKey: ['songRequests'] });
      queryClient.invalidateQueries({ queryKey: ['themeSettings'] });
      queryClient.invalidateQueries({ queryKey: ['lastUpdateResult'] });
    },
  });
}

// Mutation: Set on-air override (admin only)
export function useSetOnAirOverride() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (override: OnAirOverride) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.setOnAirOverride(override);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onAirOverride'] });
    },
  });
}

// Mutation: Clear on-air override (admin only)
export function useClearOnAirOverride() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.clearOnAirOverride();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onAirOverride'] });
    },
  });
}

// Mutation: Update station information (admin only)
export function useUpdateStationInformation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (stationInfo: StationInformation) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateStationInformation(stationInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stationInformation'] });
    },
  });
}
