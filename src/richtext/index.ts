import {RichTextElement} from '../slate/types';

type RichTextDescendant = RichTextElement

export type RichText = RichTextDescendant[];

export interface RichTextInterface {
  stringify: (this: RichText) => string;
}

export const RichText: RichTextInterface = {
  stringify: function (this: RichText) {return JSON.stringify(this)}
};
