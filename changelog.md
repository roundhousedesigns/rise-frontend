# Changelog

All notable changes to this project will be documented in this file, starting with 1.0.0beta.

## \[1.0.9.2] - 2023-09-06

- Feature: Hidden profile checkbox. Enable or disable visibility on your public profile.

## \[1.0.9.1] - 2023-08-29

- Fix: Profile share/bookmark buttons zIndex
- Improve: Drag and Drop file upload styling

## \[1.0.9] - 2023-08-23

- Feature: Added Drag and Drop to file upload fields. (Thanks @gacetta)
- Fixed: Additional Filter state not resetting visually after clicking "Reset"
- Fixed: Search submit button bar bg color
- Improve: Settings page layout
- Added: Saved searches and search history
- Improve: WrapWithIcon -> IconContent. Text not required, all wrapped in a flexbox container.

## \[1.0.8-hotfix1] - 2023-08-17

- Fixed/Improved: Credits not updating. Fix involved more overt use of departments and jobs, instead of relying on the `position` term. Concurrent backend fix to match.
- Fixed: LinkedIn social links now reference full URL instead of handle

## \[1.0.8] - 2023-08-09

- Feature: Saved Profiles (bookmarked profiles)
- Feature: Dashboard updates/notices feed
- Feature: Basic password complexity enforcement
- Fixed: Deselection of a department also unselects any tied jobs and skills that are no longer tied to a selected department. Same applies to deselection of a job with tied skills. (Thanks @ari-denary)
- Improved: Added common `ConfirmActionDialog` component for confirmation dialogs
- Improved: Profile Share icon moved into Card component.
- Improved: Menu icon standout color
- Improved: Styling and layout

## \[1.0.7] - 2023-07-03

- Fixed: Mobile Safari's floating bottom URL bar blocks sticky Search buttons.
- Fixed: Credits without `position` terms were stuck infinitely loading
- Added: Back to Login button on Register page
- Added: Jump to Credits button (Edit Profile)
- Improved: Cache policy on related skills
- Improved: Changed website URL display to "View Website" to handle for overlong layout-breaking links
- Improved: Minor styling tweaks
- Improved: Credit Save/Cancel buttons no longer re-rendering unncessarily (flashing)
- Improved: Credits saved without `position` terms now show a reminder to add on the Edit screen
- Improved: Combined error handler hooks into one `useErrorMessage` hook
- Improved: deprecated.ts file to track deprecated code

## \[1.0.6] - 2023-06-12 - 2023-06-13

- Improved: Mobile search UI - scroll to Jobs after selecting Department to indicate user should continue to scroll
- Improved: Unified style of React event, element, and type imports
- Added: Profile slug editing
- Fixed: Clear resume button restored
- Hotfixed: Social inputs not saving
- Hotfixed: Authentication refactor
- Bugs squashed, layouts fixed, quirks handled

## \[1.0.5] - 2023-06-06

- Official Launcherino!
- Improved: Accessibility - Refactored CheckboxButton and RadioButton and respective groups to be simpler and more accessible
- Improved: Styling
- Improved: Mobile layouts and responsiveness

## \[1.0.4-beta] - 2023-06-05

- Added: Externally linked user taxonomy support (Partner Directories)
- Added: Email support button on Help page
- Improved: File/image uploading and removal UX
- Improved: Profile slugs! no more ID routing
- Removed: old AuthContext file (finally)
- Fixed: Socials not saving on profile edit

## \[1.0.3-beta.2] - 2023-05-31

- Improved: Semantic versioning
- Improved: Header is now sticky
- Fixed: Search results no longer sometimes appear blank after navigating

## \[1.0.3beta] - 2023-05-30

- Added: "account already exists" message for account creation
- Improved: header mobile layout
- Improved: login mobile responsiveness
- Improved: checkbox/radio button fonts
- Fixed: Deleting last credit now correctly shows the credit's deletion
- Improved: Mobile profile edit layout
- Improved: Input colors
- Fixed: social network links, sanitization, and instructions

## \[1.0.2beta] - 2023-05-24

- Added: Search by Name
- Added: ContentView component for displaying WP content
- Fixed: Search results now return a much longer list of results (pre-pagination support)
- Changed: Support email added to footer

## \[1.0.1beta] - 2023-05-16

- Added: Google reCAPTCHA v3 integration

## \[1.0.0beta] - 2023-05-15

- Beta launch!
- Added: changelog
