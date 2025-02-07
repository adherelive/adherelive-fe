class TranslationManager {
    constructor() {
        this.translations = {};
        this.currentLanguage = 'en';
    }

    addTranslation(language, key, value) {
        if (!this.translations[language]) {
            this.translations[language] = {};
        }
        this.translations[language][key] = value;
    }

    setLanguage(language) {
        if (this.translations[language]) {
            this.currentLanguage = language;
        } else {
            console.warn(`Language ${language} not found. Falling back to default language.`);
        }
    }

    translate(key) {
        return this.translations[this.currentLanguage]?.[key] || key;
    }
}

// Example usage:
const manager = new TranslationManager();
manager.addTranslation('en', 'greeting', 'Hello');
manager.addTranslation('es', 'greeting', 'Hola');
manager.addTranslation('fr', 'greeting', 'Bonjour');

manager.setLanguage('es');
console.log(manager.translate('greeting')); // Output: Hola

manager.setLanguage('fr');
console.log(manager.translate('greeting')); // Output: Bonjour

manager.setLanguage('de');
console.log(manager.translate('greeting')); // Output: greeting (fallback to key)
