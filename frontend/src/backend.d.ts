import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface NowPlaying {
    title: string;
    artist: string;
}
export type Time = bigint;
export interface WeatherDay {
    minTemp: number;
    date: string;
    summary: string;
    weatherCode: bigint;
    maxTemp: number;
}
export interface WeatherData {
    days: Array<WeatherDay>;
}
export interface ThemeSettings {
    showNewsFeed: boolean;
    primaryColor: TailwindColor;
    showCountdown: boolean;
    accentColor: TailwindColor;
    backgroundImage: BackgroundImage;
    snowEnabled: boolean;
}
export interface DJProfile {
    bio: string;
    name: string;
    photoUrl: ExternalBlob;
}
export interface StationInformation {
    title: string;
    content: string;
    description: string;
}
export interface Program {
    bio: string;
    startTime: string;
    endTime: string;
    name: string;
    description: string;
}
export interface SongRequest {
    songTitle: string;
    name: string;
    message: string;
}
export interface LastUpdateResult {
    updateTime: Time;
    resultText: string;
    updateFailed: boolean;
}
export interface OnAirOverride {
    startTime: Time;
    overrideProgram: string;
    endTime: Time;
    description: string;
}
export interface ProgramDaySlot {
    day: string;
    program: Program;
}
export interface UserProfile {
    name: string;
}
export enum BackgroundImage {
    christmasLights = "christmasLights",
    festiveTree = "festiveTree",
    holidayDecorations = "holidayDecorations",
    twinklingLights = "twinklingLights",
    snowyVillage = "snowyVillage"
}
export enum TailwindColor {
    red = "red",
    blue = "blue",
    gold = "gold",
    purple = "purple",
    green = "green",
    silver = "silver",
    brown = "brown",
    white = "white"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCustomProgram(name: string, description: string, bio: string, startTime: string, endTime: string, days: Array<string>): Promise<void>;
    addDJProfile(name: string, bio: string, photo: ExternalBlob): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearNowPlaying(): Promise<void>;
    clearOnAirOverride(): Promise<void>;
    clearSongRequests(): Promise<void>;
    deleteDJProfile(name: string): Promise<void>;
    deleteProgram(name: string, day: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDJProfiles(): Promise<Array<DJProfile>>;
    getLastUpdateResult(): Promise<LastUpdateResult | null>;
    getNowPlaying(): Promise<NowPlaying | null>;
    getOnAirOverride(): Promise<OnAirOverride | null>;
    getProgramSchedule(): Promise<Array<[string, Array<ProgramDaySlot>]>>;
    getProgramsForDay(day: string): Promise<Array<Program>>;
    getSongRequests(): Promise<Array<SongRequest>>;
    getStationInformation(): Promise<StationInformation | null>;
    getThemeSettings(): Promise<ThemeSettings>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWeatherData(): Promise<WeatherData | null>;
    isCallerAdmin(): Promise<boolean>;
    previewChanges(): Promise<void>;
    publishChanges(): Promise<void>;
    runManualUpdate(files: Array<string>): Promise<LastUpdateResult>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setOnAirOverride(override: OnAirOverride): Promise<void>;
    submitSongRequest(songRequest: SongRequest): Promise<void>;
    updateDJProfile(name: string, bio: string, photo: ExternalBlob): Promise<void>;
    updateNowPlaying(title: string, artist: string): Promise<void>;
    updateProgram(name: string, description: string, bio: string, startTime: string, endTime: string, oldDay: string, newDay: string): Promise<void>;
    updateStationInformation(stationInfo: StationInformation): Promise<void>;
    updateThemeSettings(showCountdown: boolean, showNewsFeed: boolean, snowEnabled: boolean, backgroundImage: BackgroundImage, primaryColor: TailwindColor, accentColor: TailwindColor): Promise<void>;
    updateWeatherData(newWeatherData: WeatherData): Promise<void>;
}
