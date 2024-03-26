## 1.1.1

#### Version 1.1.1 Updates

- **Package and Distribution:**

  - Added a new section in `package.json` for specifying which files should be included when publishing the package. This includes the `dist` directory, `README.md`, `LICENSE`, and `CHANGELOG.md`.

- **Code Enhancements:**
  - In `src/localization.ts`, added bindings in the constructor for key methods (`t`, `init`, `addLanguage`, `detectAndSetLocale`, `setLanguage`) to ensure they maintain the correct `this` context when used. This helps avoid common issues related to `this` keyword in JavaScript when the context might inadvertently change, for example, when passing methods as callbacks.

## 1.1.0

#### New Features

- Added `lodash` as a dependency for utilizing its `get` method for accessing nested translation strings.
- Enhanced the `Localization` class to support namespaced translation keys using lodash's `get` method, allowing for dot notation (e.g., 'namespace.key').
- Introduced an option (`detectLocale`) in the initialization of the `Localization` system to automatically detect and set the user's locale.
- Implemented a method (`detectAndSetLocale`) within the `Localization` class to automatically detect the browser's language and set it as the current language, with a fallback to the default language if the browser's language isn't supported.

#### Updates

- Updated the licensing from ISC to MIT in the `package-lock.json` to align with the `package.json` license specification.
- Updated the initialization function of the `Localization` class to allow for a more flexible setup, including default settings and the new `detectLocale` option.
- Improved the `t` method (translation string retrieval and formatting) to support namespaced keys, enabling the use of dot notation for accessing nested strings and enhancing its flexibility in managing translations.

#### Dependency Changes

- Added `lodash` and `@types/lodash` to both dependencies and development dependencies, respectively, enabling the new features regarding namespaced translation keys and enhancing the code's capability to handle object paths.

#### Enhancements

- Enhanced code comments and documentation within the `Localization` class to better describe the functionality, including the new features regarding locale detection and namespaced translation keys.

This changelog was generated with [@weirdscience/version](https://www.npmjs.com/package/@weirdscience/version).
