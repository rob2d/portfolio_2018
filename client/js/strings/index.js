import LocalizedStrings from 'react-localization'
import localizationSetter from 'tools/localizationSetter'
import getUrlParam from 'tools/getUrlParam'

import en from './en'
//import es from './es'
//import ja from './ja'
//import ch from './ch'
import global from './global'

// TODO : remove multi-language support;
// not worth hassle of manually updating
// in several languages (and can move to
// an automated i118 solution soon if needed)

let strings = new LocalizedStrings({ en });
strings.global = global;

strings.languageCodes = [ 'en' ];
localizationSetter.addLocalizedStrings(strings);
const currentLanguage = getUrlParam('language') || 'en';

// set initial language to either that of url params or english
localizationSetter.setLanguage(currentLanguage);

export default strings