import Map "mo:core/Map";
import Storage "blob-storage/Storage";
import Text "mo:core/Text";

module {
  type OldDJProfile = {
    name : Text;
    bio : Text;
    photoUrl : Storage.ExternalBlob;
  };

  type OldProgram = {
    name : Text;
    description : Text;
    startTime : Text;
    endTime : Text;
  };

  type OldProgramDaySlot = {
    day : Text;
    program : OldProgram;
  };

  type OldProgramEntry = {
    program : OldProgram;
    days : [Text];
  };

  type OldActor = {
    djProfiles : Map.Map<Text, OldDJProfile>;
    programSchedule : Map.Map<Text, [OldProgramDaySlot]>;
  };

  // New types matching updated actor's structure
  type NewProgram = {
    name : Text;
    description : Text;
    bio : Text;
    startTime : Text;
    endTime : Text;
  };

  type NewProgramDaySlot = {
    day : Text;
    program : NewProgram;
  };

  type NewActor = {
    djProfiles : Map.Map<Text, OldDJProfile>;
    programSchedule : Map.Map<Text, [NewProgramDaySlot]>;
  };

  public func run(old : OldActor) : NewActor {
    // Convert old programs to new programs with bio field
    let convertedProgramSchedule = old.programSchedule.map<Text, [OldProgramDaySlot], [NewProgramDaySlot]>(
      func(_id, oldDaySlots) {
        oldDaySlots.map(
          func(oldSlot) {
            {
              day = oldSlot.day;
              program = {
                oldSlot.program with
                bio = ""; // Default bio for existing data
              };
            };
          }
        );
      }
    );

    {
      djProfiles = old.djProfiles;
      programSchedule = convertedProgramSchedule;
    };
  };
};

