import {RichText} from '../richtext';

if (!String.prototype.toRichText) {
  // eslint-disable-next-line no-extend-native,func-names
  String.prototype.toRichText = function (this: string, ...args): RichText {
    return JSON.parse(this)
  };
}
