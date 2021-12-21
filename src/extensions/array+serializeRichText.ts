import {RichText} from '../richtext';

if (!Array.prototype.serializeRichText) {
  Array.prototype.serializeRichText = function (this: RichText, ...args): string {
    return JSON.stringify(this)
  };
}
