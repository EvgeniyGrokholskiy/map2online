import {RichText} from '../richtext';

if (!Array.prototype.serializeRichText) {
  // eslint-disable-next-line no-extend-native,func-names
  Array.prototype.serializeRichText = function (this: RichText, ...args): string {
    return JSON.stringify(this);
  };
}
