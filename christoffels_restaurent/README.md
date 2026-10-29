# Christoffel's Restaurant - Menu Manager

A React Native (Expo Router) app that lets the chef manage the restaurant menu.

**Where the app is:** all the app code is in the `christoffels_restaurent` folder of this repository.

**Video demo:** PASTE YOUR YOUTUBE LINK HERE

## How to run

1. Open the `christoffels_restaurent` folder in a terminal.
2. Run `npm install`.
3. Run `npx expo start --web`.
4. Open the address shown in the terminal and go to `/menu`.

## Features

- Add, edit and delete menu items
- Search by dish name
- Filter by course (Starters, Main courses, Desserts) and clear the search or filter
- Menu statistics: total items, average price and number of items per course
- Validation and clear success and error messages on the add and edit forms
- Consistent header on every screen

## Change log (since Part 2)

### New features
- Added Edit and Delete buttons to every dish, with a delete confirmation.
- Added search by dish name only.
- Added course filter buttons and a "Clear search and filter" link.
- Added a Menu Statistics box showing total items, average price and the count per course. It updates when dishes are added, edited or deleted.

### Refactoring and improvements
- Moved repeated inline styles into the StyleSheet (statistics box and filter buttons).
- Renamed unclear variables, for example `c` became `courseName`.
- Fixed a bug where the add form used course names (Starter, Main, Dessert) that did not match the menu filters, so new dishes were missed by the filters and statistics.
- Replaced the free-text course box on the edit screen with course buttons.
- Added price validation to the edit screen (must be a number above 0).
- Added one shared blue header with proper screen titles in `_layout.tsx`.
- Removed duplicate headers and the black accent line from all screens for a consistent look.

## References

Expo, 2026. Expo Router: File-based routing for React Native. Available at: expo.dev [Accessed 10 September 2026].
Meta Open Source, 2026. React Native Core Components and APIs. Available at: reactnative.dev [Accessed 10 September 2026].
React Core Team, 2026. React Documentation: Managing State Hooks. Available at: react.dev [Accessed 10 September 2026].
GitHub, Inc., 2026. GitHub Desktop User Guide: Committing and syncing changes. Available at: github.com [Accessed 10 September 2026].