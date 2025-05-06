# Changelog

All notable changes to this project will be documented in this file, starting
with 1.0.0beta.

## [1.2-notifications] Unmerged (branched from `1.2-dev`)

- Add: Notifications with count badge for displaying if a a starred profile has been updated.

## [1.2-structure] Unmerged (branched from `1.2-dev`)

- Change: `<Page>` is now `<Shell>` so we can call WP static pages "Pages."
- Improve: Page and template structure and styling.
- Improve: Stop using silly `prop={'some-string'}` notation. Just do normal quotes: `prop='some-string'`.

## [1.2-jobs] - Unmerged (branched from `1.2-dev`)

- Add: Single Job route
- Improve: `prepareUserProfileForGraphQL()` --> `prepareUserProfileForGQL()` for naming convention.
- Improve: Update Props TS from Index Signature (e.g. `[key: string]: any;`) format to intersection types \(`Props & ListProps`\) where possible.
- Improve: Minor styling tweaks
- Improve: Make WP Post retrieval more robust. `ContentView` --> is now `PageContent` and `usePostContent` is now `usePage`, which returns a `WPPost` item. This pattern can be reused for other post types!
- Improve: Use the Rise 'star' glyph more liberally.
- Improve: Global style fixes (ahhh branch drift......)

## \[1.2-dev] - Unreleased

- Merge: 1.1.13-dashWidgetView

## \[1.1.13-dashWidgetView] - (Up to) 2024-10-14

- Add: Delete account confirmation button and confirmation dialog. **Requires backend version 1.1.10**
- Improve: Remove 'cancel' button on profile slug change.
- Improve: Fix alignments and spacing of profile slug change.
- Improve: query name MUTATE_TOGGLE_SEARCH_ONLY -> MUTATE_TOGGLE_DISABLE_PROFILE
- Improve: ProfileNotice padding and font sizing.

- Add: Dashboard grid layout with widgets.
- Add: Profile completion %.
- Add: Widgets: Mini Profile, Saved Searches, Following, News.

## \[1.1.10] - 2024-09-06

- Add: Success and error toasts for editing credits.
- Add: `<RequiredAsterisk>` component.
- Fix: Form text field spacing.
- Fix: Toast typo.
- Improve: <TextInput> and <TextareaInput> debounce added for significant performance increase.
- Improve: Move EditCreditButtons into EditCreditView for simplicity.
- Improve: Remove redirects from LoginView, since `<LoggedIn>` component takes care of view control.
- Improve: Make Department and Job required on credit edit modal.

## \[1.1.9 - 1.1.91] - 2024-07-20

- Fix: Search results sometimes not loading on first attempt.
- Add: "Multilingual" local checkbox with simple "languages spoken" field.
- Add: `<DevMode>` component for dev branch display.
- Add: Import version from package.json.
- Add: Saved Searches button to header nav
- Add: `TooltipIconButton` component to show a styled tooltip on icon buttons.
- Change: Fast-forward backend to match versions starting with **v1.1.9**.
- Change: Bookmark terminology is now more appropriately "Starred".
- Change: `updateStarredProfiles` mutation now has different inputs/outputs.
- Improve: `useUserId` -> `useUserIdBySlug`.
- Improve: `useSavedSearches()` can now take an array of IDs to include.
- Change: Remove text labels on header buttons
- Improve: `<Menu>` extracted to new `<MainMenu>` component.
- Improve: Refactor header and main menu.
- Improve: Refactor star/unstar profiles UX/UI.
- Improve: @aliases for hooks/queries and hooks/mutations.
- Deprecate: `ReponsiveButton` component, in favor of new `TooltipIconButton`.
- Deprecate: `RemoveStarIcon` component, refactored into `StarToggleIcon`.

## \[1.1.8] - 2024-07-10

- Add: Autocomplete for finding and populating departments/jobs on the search form.
- Fix: Add display case for workStart === workEnd for Credit display.
- Improve: Saved Search UI/UX -> updating, saving, editing.
- Improve: Minor UI enhancements.
- Improve: Simplify `SearchFilterSet` (and related) classes, types, and interfaces.
- Improve: Simplify `SearchFilterSet` and related classes and interfaces.
- Improve: Refactor Saved Searches and Saved Search Items.
- Change: 'SearchFilterSetRaw' -> 'QueryableSearchFilterSet'. **Requires backend version 1.1.5**

## \[1.1.7] - 2024-06-22

- Add: Conflict Dates calendar and job search dates. **Backend version 1.1.4**
- Change: Reusing a saved search no longer automatically searches, but rather populates filters for re-running when ready.
- Change: "Quick Actions" --> "Options".
- Improve: Remove redundant `sortCreditsByIndex()` from useUserProfile hook.
- Improve: More toasts!
- Improve: Saved Search styling
- Improve: @common component file organization
- Improve: Minor UI fixes and improvements
- Fix: Toast label on updating user handle

## \[1.1.6] - 2024-05-07

- Add: Change email address. **Requires backend version 1.1.3**
- Improve: Default link color is now the brand blue.
- Improve: Link underline hover transition.
- Improve: Clean up imports.
- Improve: Profile URL/handle interface and messaging.
- Improve: Minor UI improvements and nudges

## \[1.1.5] - 2024-04-22

- Improve: Saved Searches minor UI improvements.

## \[1.1.4] - 2024-04-14

- Add: Upload authorization message.
- Add: Quick Actions to Edit Profile screen.
- Add: Open to Work (Avail/Busy) badges and options.
- Improve: Simplified (removed) color on "Saved" button.
- Improve: ToggleOptionSwitch `icon` prop renamed to `iconLeft`.
- Improve: "Uploaded"/"Saved" words swapped in successful upload toast.
- Improve: Make IconButton styles and sizes more consistent.
- Improve: Upgrade Node to v20.12.0.

## \[1.1.3] - 2024-03-15

- Fix: refetchQuery on QUERY_PROFILE now using same variables and fires properly.
  Allowed removal of EditProfileContext credit update/delete actions.
- Change: Hide "Get Help" button on dashboard.
- Add: Alerts for "no credits" and "profile hidden" messages.

## \[1.1.2] - 2024-02-27

- Add: Page content to Login screen
- Improve: Remove edit profile 'cancel' button, useless really
- Fix: "Bookmarked! Your profile has been updated." text on Profile Saved alert.

## \[1.1.1] - 2023-01-03

- Improve: Color Mode switch in Menu
- Improve: Resume preview and download modal. Thanks @gacetta!
- Improve: ESLint configuration

## \[1.1.0] - 2023-11-21

- Feature: Scored search order. **Requires backend version 1.1** <https://github.com/roundhousedesigns/rise-backend/releases/tag/v1.1>
- Feature: Saved Searches (history removed) are active
- Feature: Search results shows currently active search filters
- Feature: Footer notice field moved to the backend (un-hardcoded)
- Improve: Internship/Fellowship credit and profile tags
- Improve: Vite + TS import aliases. Hello, pretty imports!
- Improve: Restore Additional Filters' accordion state on search restore
- Improve with Sadness: Fix Menu shudder by removing MenuButton transform :(
- Fix: Search: Additional filters no longer reset when changing jobs or departments
- Deprecate: `year` Credit field (never used, in favor of `workStart` and `workEnd`)

## \[1.0.9.3] - 2023-09-22

- Improve: Admins barred from frontend login
- Improve: Login and lost/reset password error handling

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
- Improve: WrapWithIcon -> IconContent. Text not required, all wrapped in a flexbox
  container.

## \[1.0.8-hotfix1] - 2023-08-17

- Fixed/Improved: Credits not updating. Fix involved more overt use of departments
  and jobs, instead of relying on the `position` term. Concurrent backend fix to match.
- Fixed: LinkedIn social links now reference full URL instead of handle

## \[1.0.8] - 2023-08-09

- Feature: Saved Profiles (bookmarked profiles)
- Feature: Dashboard updates/notices feed
- Feature: Basic password complexity enforcement
- Fixed: Deselection of a department also unselects any tied jobs and skills that
  are no longer tied to a selected department. Same applies to deselection of a job
  with tied skills. (Thanks @ari-denary)
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
- Improved: Changed website URL display to "View Website" to handle for overlong
  layout-breaking links
- Improved: Minor styling tweaks
- Improved: Credit Save/Cancel buttons no longer re-rendering unncessarily (flashing)
- Improved: Credits saved without `position` terms now show a reminder to add on
  the Edit screen
- Improved: Combined error handler hooks into one `useErrorMessage` hook
- Improved: deprecated.ts file to track deprecated code

## \[1.0.6] - 2023-06-12 - 2023-06-13

- Improved: Mobile search UI - scroll to Jobs after selecting Department to indicate
  user should continue to scroll
- Improved: Unified style of React event, element, and type imports
- Added: Profile slug editing
- Fixed: Clear resume button restored
- Hotfixed: Social inputs not saving
- Hotfixed: Authentication refactor
- Bugs squashed, layouts fixed, quirks handled

## \[1.0.5] - 2023-06-06

- Official Launcherino!
- Improved: Accessibility - Refactored CheckboxButton and RadioButton and respective
  groups to be simpler and more accessible
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
- Fixed: Search results now return a much longer list of results (pre-pagination
  support)
- Changed: Support email added to footer

## \[1.0.1beta] - 2023-05-16

- Added: Google reCAPTCHA v3 integration

## \[1.0.0beta] - 2023-05-15

- Beta launch!
- Added: changelog
