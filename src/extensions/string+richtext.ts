import {RichText, RichTextElementType} from '../richtext';

if (!String.prototype.parseToRichText) {
  // eslint-disable-next-line no-extend-native,func-names
  String.prototype.parseToRichText = function (this: string): RichText {
    return JSON.parse(this);
  };
}

if (!String.prototype.convertToRichText) {
  // eslint-disable-next-line no-extend-native,func-names
  String.prototype.convertToRichText = function (this: string): RichText {
    return this.split(/\r?\n/u).map(para => ({
      type: RichTextElementType.Paragraph,
      children: [{text: para}],
    }));
  };
}
