/*
    Wondering if  we can export all components .vue files
    from one file..
    So whenever we have to import then we can directly write
    `import {Component1} from "./Components"`
*/

import BaseButton from './BaseButton.vue';
import Loader from './Loader.vue';

export { Loader, BaseButton };
