# Specification

## Summary
**Goal:** Add a bio/description field to each program/show in the Christmas Channel Radio schedule, allowing admins to enter bios and visitors to see them displayed publicly.

**Planned changes:**
- Add a `bio` text field to the Program data type in the backend; existing programs default to an empty string
- Update create/update/query endpoints to accept and return the bio field
- Add a bio textarea input to the add/edit program dialog in the ManagePrograms admin page
- Display each show's bio on the public SchedulePage beneath the show name/time (only when non-empty)
- Display each show's bio in the UpcomingShows component beneath the show name (only when non-empty)

**User-visible outcome:** Admins can add a plain-text bio to each show in the schedule, and visitors will see those bios displayed on the schedule page and in the upcoming shows section.
