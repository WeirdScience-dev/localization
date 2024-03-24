# @weirdscience/localization

A TypeScript library designed for managing localization and translations. It supports multiple languages, dynamic language switching, and provides a straightforward API for translation retrieval and pluralization.

## Features

- **Multiple Languages Support**: Easily manage translations across multiple languages.
- **Dynamic Language Switching**: Switch languages on the fly without reloading.
- **Pluralization**: Automatically handle plural forms of words based on count.
- **Parameter Replacement**: Dynamically insert values into translations.

## Installation

Install the package using npm:

```bash
npm install @weirdscience/localization
```

Or using yarn:

```bash
yarn add @weirdscience/localization
```

## Usage

First, import the `localization` object from the package:

```typescript
import { localization } from "@weirdscience/localization";
```

### Initialization

Initialize the localization system with your default language, translations, and optionally a fallback language:

```typescript
localization.init({
  defaultLang: "en",
  languages: {
    en: {
      greeting: "Hello, {{name}}!",
    },
    fr: {
      greeting: "Bonjour, {{name}}!",
    },
  },
  fallbackLang: "en",
});
```

### Adding Translations

Add or update translations for a specific language:

```typescript
localization.addLanguage("es", {
  greeting: "Hola, {{name}}!",
});
```

### Setting the Current Language

Switch the current language:

```typescript
localization.setLanguage("fr");
```

### Retrieving Translations

Get a translated string, with optional parameter replacement and pluralization:

```typescript
// Simple translation
console.log(localization.t("greeting", { name: "John" }));

// Pluralization
console.log(localization.t("apples", {}, 5));
```

## API Reference

- `init(options: { defaultLang?: string; languages: Languages; fallbackLang?: string; })`: Initializes the localization system.
- `addLanguage(lang: string, translations: Translations)`: Adds or updates translations for a language.
- `setLanguage(lang: string)`: Sets the current language.
- `t(key: string, params?: Record<string, string | number>, count?: number)`: Retrieves and formats a translation string.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
