import pluralize from "pluralize";
import { get } from "lodash";

export interface Translations {
	[key: string]: string;
}

export interface Languages {
	[lang: string]: Translations;
}

/**
 * A class for managing localization and translations.
 * It supports multiple languages, allowing for easy translation retrieval and language switching.
 * The class also provides functionality for adding new languages and translations dynamically.
 */
class Localization {
	languages: Languages;
	currentLang = "en";
	fallbackLang = "en";

	constructor() {
		this.languages = {};
	}

	/**
	 * Initializes the localization system with the provided settings or defaults.
	 * Sets the default and fallback languages, loads initial translations, and optionally detects the user's locale.
	 *
	 * @param defaultLang - The default language code (e.g., 'en'). If not specified, 'en' is used.
	 * @param languages - An object mapping language codes to their translations.
	 * @param fallbackLang - The fallback language code used when a translation is missing in the current language. Defaults to 'en' if not provided.
	 * @param detectLocale - A boolean indicating whether to automatically detect and set the user's locale as the current language. Defaults to false.
	 */
	init({
		defaultLang = "en",
		languages = {},
		fallbackLang = "en",
		detectLocale = false,
	}: {
		defaultLang?: string;
		languages: Languages;
		fallbackLang?: string;
		detectLocale?: boolean;
	}) {
		this.currentLang = defaultLang;
		this.fallbackLang = fallbackLang;

		for (const lang of Object.keys(languages)) {
			this.addLanguage(lang, languages[lang]);
		}

		if (detectLocale) {
			this.detectAndSetLocale();
		}
	}

	/**
	 * Adds or updates a language with translations.
	 * If the language does not exist, it is added to the library; otherwise, the existing translations are updated.
	 *
	 * @param lang The language code (e.g., 'en', 'fr').
	 * @param translations An object containing key-value pairs of translations.
	 */
	addLanguage(lang: string, translations: Translations) {
		if (!this.languages[lang]) {
			this.languages[lang] = {};
		}

		this.languages[lang] = {
			...this.languages[lang],
			...translations,
		};
	}

	/**
	 * Sets the current language for translations.
	 * If the specified language is not available, it falls back to the default language.
	 *
	 * @param lang The language code to set as the current language.
	 */
	setLanguage(lang: string) {
		if (this.languages[lang]) {
			this.currentLang = lang;
		} else {
			console.warn(
				`Language "${lang}" is not available. Falling back to default language.`,
			);
			this.currentLang = this.fallbackLang;
		}
	}

	/**
	 * Translates a word into its plural form based on the given count. Optionally includes the count in the returned string.
	 *
	 * This method leverages an external `pluralize` function to convert a singular word to its plural form
	 * based on the provided count. If `inclusive` is set to true, the count will be prepended to the returned string.
	 *
	 * @param word The word to pluralize.
	 * @param count The number of items, used to determine if the word should be singular or plural.
	 * @param inclusive Whether to include the count in the returned string.
	 * @returns The pluralized word, optionally prefixed with the count.
	 */
	pluralize(word: string, count: number, inclusive = false): string {
		return pluralize(word, count, inclusive);
	}

	/**
	 * Retrieves and formats a translation string with support for namespaced keys.
	 *
	 * This method looks up a translation key in the current language's translations using lodash's get method.
	 * This allows for accessing nested translation strings using a dot notation (e.g., 'namespace.key').
	 * If the key is not found, it attempts to find it in the fallback language's translations.
	 * If a count is provided, it will pluralize the translation accordingly.
	 * Additionally, it replaces any parameters in the translation string with the provided values.
	 *
	 * @param key The translation key to look up, supporting namespaced keys.
	 * @param params An optional object containing parameters to replace in the translation string.
	 * @param count An optional number used for pluralization.
	 * @returns The formatted translation string.
	 */
	t(key: string, params: Record<string, string | number> = {}, count?: number) {
		const translations = this.languages[this.currentLang] || {};
		let translation =
			get(translations, key) ||
			get(this.languages[this.fallbackLang], key) ||
			key;

		if (count !== undefined) {
			translation = this.pluralize(translation, count);
		}

		for (const param of Object.keys(params)) {
			const value = params[param];
			translation = translation.replace(
				new RegExp(`{{${param}}}`, "g"),
				String(value),
			);
		}

		return translation;
	}

	/**
	 * Automatically detects the browser's language and sets it as the current language.
	 * If the browser's language is not supported, it falls back to the default language.
	 */
	detectAndSetLocale() {
		const browserLang = navigator.language.split("-")[0];
		const isSupported = Object.keys(this.languages).includes(browserLang);

		this.setLanguage(isSupported ? browserLang : this.fallbackLang);
	}
}

export const localization = new Localization();
