import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Array "mo:core/Array";

module {
  type DJProfile = {
    name : Text;
    bio : Text;
    photoUrl : Blob;
  };

  // Old types (pre-migration)
  type OldActor = {
    djProfiles : Map.Map<Text, DJProfile>;
    programSchedule : Map.Map<Text, OldProgram>;
    // ... (other fields remain unchanged)
  };

  type OldProgram = {
    name : Text;
    description : Text;
    startTime : Text;
    endTime : Text;
  };

  // New types (post-migration)
  type NewActor = {
    djProfiles : Map.Map<Text, DJProfile>;
    programSchedule : Map.Map<Text, [NewProgramDaySlot]>;
    // ... (other fields remain unchanged)
  };

  type NewProgramDaySlot = {
    day : Text;
    program : OldProgram;
  };

  public func run(old : OldActor) : NewActor {
    let newProgramSchedule = old.programSchedule.map<Text, OldProgram, [NewProgramDaySlot]>(
      func(_, oldProgram) {
        [
          { day = "Monday"; program = oldProgram },
          { day = "Tuesday"; program = oldProgram },
          { day = "Wednesday"; program = oldProgram },
          { day = "Thursday"; program = oldProgram },
          { day = "Friday"; program = oldProgram },
        ];
      }
    );

    {
      old with
      programSchedule = newProgramSchedule;
    };
  };
};
