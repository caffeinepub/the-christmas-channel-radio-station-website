# Specification

## Summary
**Goal:** Add weekday-specific (Monday–Friday) program slots to the Program Schedule feature.

**Planned changes:**
- Update the backend Program data model to include a `day` field supporting Monday through Friday weekday values
- Update the ManagePrograms admin page add/edit dialog to include a day-of-week selector with Monday–Friday options
- Persist weekday selections to the backend and display the day label in the program list
- Update the public Schedule page to display and group/sort programs by weekday (Mon–Fri), with an empty state when no programs exist for a day
- Ensure OnAirDisplay and UpcomingShows components match programs against the current weekday and time

**User-visible outcome:** Admins can create, edit, and delete program slots for specific weekdays, and visitors can browse the Schedule page to see what shows are scheduled on each day of the week (Monday–Friday).
