import './sass/main.scss';
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import { defaults } from '@pnotify/core';

defaultModules.set(PNotifyMobile, {});

alert({
  text: 'ошибка бла бла бла!',
});

defaults.styling = 'material';
