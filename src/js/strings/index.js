import LocalizedStrings from 'react-localization'
import localizationSetter from './../tools/localizationSetter'

import en from './en'
//import es from './es'
import ja from './ja'
//import ch from './ch'
import global from './global'


let strings = new LocalizedStrings({ en, /*es, */ja, /*ch*/ });
strings.global = global;

strings.languageCodes = [ 'en', 'ja' ];
localizationSetter.addLocalizedStrings(strings);
export default strings