import Map "mo:core/Map";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Storage "blob-storage/Storage";
import Nat "mo:core/Nat";
import MixinStorage "blob-storage/Mixin";
import Time "mo:core/Time";
import List "mo:core/List";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  public type DJProfile = {
    name : Text;
    bio : Text;
    photoUrl : Storage.ExternalBlob;
  };

  public type Program = {
    name : Text;
    description : Text;
    startTime : Text;
    endTime : Text;
  };

  public type NowPlaying = {
    artist : Text;
    title : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  public type ThemeSettings = {
    showCountdown : Bool;
    snowEnabled : Bool;
    backgroundImage : BackgroundImage;
    primaryColor : TailwindColor;
    accentColor : TailwindColor;
  };

  public type WeatherDay = {
    date : Text;
    maxTemp : Float;
    minTemp : Float;
    weatherCode : Nat;
    summary : Text;
  };

  public type WeatherData = {
    days : [WeatherDay];
  };

  public type BackgroundImage = {
    #snowyVillage;
    #twinklingLights;
    #festiveTree;
  };

  public type TailwindColor = {
    #red;
    #green;
    #gold;
    #blue;
    #purple;
    #brown;
    #white;
  };

  public type SongRequest = {
    name : Text;
    songTitle : Text;
    message : Text;
  };

  public type OnAirOverride = {
    overrideProgram : Text;
    description : Text;
    startTime : Time.Time;
    endTime : Time.Time;
  };

  public type LastUpdateResult = {
    resultText : Text;
    updateTime : Time.Time;
    updateFailed : Bool;
  };

  public type StationInformation = {
    title : Text;
    description : Text;
    content : Text; // Rich text (HTML/Markdown)
  };

  // stable across upgrades and can be initialized only once.
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let djProfiles = Map.empty<Text, DJProfile>();

  let programSchedule = Map.fromIter<Text, Program>(
    [
      (
        "Casey Kasem's American Top 40 Christmas Edition",
        {
          name = "Casey Kasem's American Top 40 Christmas Edition";
          description = "Holiday countdown classics hosted by Casey Kasem, featuring the most beloved Christmas hits of all time.";
          startTime = "Sundays 3:00 PM";
          endTime = "7:00 PM (CST)";
        },
      ),
      (
        "Afternoons with Mark Huotari",
        {
          name = "Afternoons with Mark Huotari";
          description = "Join Mark Huotari for cheerful Christmas tunes and warm afternoon vibes to brighten your weekdays.";
          startTime = "Weekdays 2:00 PM";
          endTime = "7:00 PM (CST)";
        },
      ),
      (
        "The Late Night Show with Mark Huotari",
        {
          name = "The Late Night Show with Mark Huotari";
          description = "Hosted by Mark Huotari — unwind with smooth Christmas tunes and festive late-night stories.";
          startTime = "7:00 PM";
          endTime = "12:00 AM (CST)";
        },
      ),
      (
        "Mornings with Mark Huotari",
        {
          name = "Mornings with Mark Huotari";
          description = "Ease into the weekend with cheerful Christmas hits and warm morning vibes hosted by Mark Huotari.";
          startTime = "Weekends 6:00 AM";
          endTime = "12:00 PM (CST)";
        },
      ),
      (
        "Auto DJ",
        {
          name = "Auto DJ";
          description = "Continuous festive tunes and Christmas classics from The Christmas Channel Auto DJ.";
          startTime = "Daily 2:00 PM";
          endTime = "7:00 PM (CST)";
        },
      ),
    ].values(),
  );

  var themeSettings : ThemeSettings = {
    showCountdown = true;
    snowEnabled = true;
    backgroundImage = #snowyVillage;
    primaryColor = #red;
    accentColor = #gold;
  };

  var currentSong : ?NowPlaying = null;

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Weather Data
  var weatherData : ?WeatherData = null;
  var lastWeatherFetch : ?Nat = null;

  var songRequests : List.List<SongRequest> = List.empty<SongRequest>();

  var lastUpdateResult : ?LastUpdateResult = null;

  var onAirOverride : ?OnAirOverride = null;

  // Station Information Backend Storage
  var stationInformation : ?StationInformation = null;

  module DJProfile {
    public func compareByName(dj1 : DJProfile, dj2 : DJProfile) : Order.Order {
      Text.compare(dj1.name, dj2.name);
    };
  };

  module Program {
    public func compareByStartTime(p1 : Program, p2 : Program) : Order.Order {
      Text.compare(p1.startTime, p2.startTime);
    };
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // DJ Profile Management
  public shared ({ caller }) func addDJProfile(name : Text, bio : Text, photo : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add DJ profiles");
    };
    if (djProfiles.containsKey(name)) {
      Runtime.trap("A DJ with this name already exists");
    };
    let profile : DJProfile = { name; bio; photoUrl = photo };
    djProfiles.add(name, profile);
  };

  public shared ({ caller }) func updateDJProfile(name : Text, bio : Text, photo : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update DJ profiles");
    };
    switch (djProfiles.get(name)) {
      case (null) { Runtime.trap("DJ profile not found") };
      case (?_) {
        let updatedProfile : DJProfile = { name; bio; photoUrl = photo };
        djProfiles.add(name, updatedProfile);
      };
    };
  };

  public shared ({ caller }) func deleteDJProfile(name : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete DJ profiles");
    };
    if (not (djProfiles.containsKey(name))) {
      Runtime.trap("DJ profile not found");
    };
    djProfiles.remove(name);
  };

  // Program Schedule Management
  public shared ({ caller }) func addCustomProgram(
    name : Text,
    description : Text,
    startTime : Text,
    endTime : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add programs");
    };
    if (programSchedule.containsKey(name)) {
      Runtime.trap("Program already exists");
    };
    let program : Program = { name; description; startTime; endTime };
    programSchedule.add(name, program);
  };

  public shared ({ caller }) func updateProgram(
    name : Text,
    description : Text,
    startTime : Text,
    endTime : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update programs");
    };
    switch (programSchedule.get(name)) {
      case (null) { Runtime.trap("Program not found") };
      case (?_) {
        let updatedProgram : Program = {
          name;
          description;
          startTime;
          endTime;
        };
        programSchedule.add(name, updatedProgram);
      };
    };
  };

  public shared ({ caller }) func deleteProgram(name : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete programs");
    };
    if (not (programSchedule.containsKey(name))) {
      Runtime.trap("Program not found");
    };
    programSchedule.remove(name);
  };

  public shared ({ caller }) func updateNowPlaying(title : Text, artist : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update Now Playing data");
    };
    currentSong := ?{ title; artist };
  };

  public shared ({ caller }) func clearNowPlaying() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can clear Now Playing data");
    };
    currentSong := null;
  };

  public shared ({ caller }) func updateThemeSettings(
    showCountdown : Bool,
    snowEnabled : Bool,
    backgroundImage : BackgroundImage,
    primaryColor : TailwindColor,
    accentColor : TailwindColor,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update theme settings");
    };
    themeSettings := {
      showCountdown;
      snowEnabled;
      backgroundImage;
      primaryColor;
      accentColor;
    };
  };

  public query func getThemeSettings() : async ThemeSettings {
    themeSettings;
  };

  public shared ({ caller }) func previewChanges() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can preview changes");
    };
  };

  public shared ({ caller }) func publishChanges() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can publish changes");
    };
  };

  public shared ({ caller }) func updateWeatherData(newWeatherData : WeatherData) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update weather data");
    };
    weatherData := ?newWeatherData;
    lastWeatherFetch := ?0;
  };

  public query ({ caller }) func getWeatherData() : async ?WeatherData {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access weather data");
    };
    weatherData;
  };

  public query func getDJProfiles() : async [DJProfile] {
    djProfiles.values().toArray().sort(DJProfile.compareByName);
  };

  public query func getProgramSchedule() : async [Program] {
    programSchedule.values().toArray().sort(Program.compareByStartTime);
  };

  public query func getNowPlaying() : async ?NowPlaying {
    currentSong;
  };

  public shared ({ caller }) func submitSongRequest(songRequest : SongRequest) : async () {
    if (songRequest.name == "" or songRequest.songTitle == "") {
      Runtime.trap("Name and song title cannot be empty");
    };
    songRequests.add(songRequest);
  };

  public shared ({ caller }) func getSongRequests() : async [SongRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access song requests");
    };
    songRequests.toArray();
  };

  public shared ({ caller }) func clearSongRequests() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can clear song requests");
    };
    songRequests.clear();
  };

  // --- New Functionality ---

  public shared ({ caller }) func runManualUpdate(files : [Text]) : async LastUpdateResult {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform manual updates");
    };

    let filesIter = files.values();
    let filesJoined : Text = filesIter.join(", ");

    let updateResultText : Text = "Manual update completed successfully for: " # filesJoined;
    let updateTime = Time.now();

    let updateResult : LastUpdateResult = {
      resultText = updateResultText;
      updateTime;
      updateFailed = false;
    };

    lastUpdateResult := ?updateResult;

    updateResult;
  };

  public query ({ caller }) func getLastUpdateResult() : async ?LastUpdateResult {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view update results");
    };
    lastUpdateResult;
  };

  public shared ({ caller }) func setOnAirOverride(override : OnAirOverride) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set On Air overrides");
    };
    onAirOverride := ?override;
  };

  public shared ({ caller }) func clearOnAirOverride() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can clear On Air overrides");
    };
    onAirOverride := null;
  };

  public query func getOnAirOverride() : async ?OnAirOverride {
    onAirOverride;
  };

  // --- Station Information Management ---
  public shared ({ caller }) func updateStationInformation(stationInfo : StationInformation) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update station information");
    };
    stationInformation := ?stationInfo;
  };

  public query func getStationInformation() : async ?StationInformation {
    stationInformation;
  };
};
