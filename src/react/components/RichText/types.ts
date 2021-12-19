/*
 * Copyright 2021 s4y.solutions
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Descendant, Element as SlateElement} from 'slate';

export type EmptyText = {
  text: string
}
export type BlockQuoteElement = { type: 'block-quote'; children: Descendant[] }
export type BulletedListElement = { type: 'bulleted-list'; children: Descendant[] }
export type HeadingOneElement = { type: 'heading-one'; children: Descendant[] }
export type EditableVoidElement = { type: 'editable-void'; children: EmptyText[] }
export type HeadingTwoElement = { type: 'heading-two'; children: Descendant[] }
export type ImageElement = { type: 'image'; url: string; children: EmptyText[] }
export type LinkElement = { type: 'link'; url: string; children: Descendant[] }
export type ListItemElement = { type: 'list-item'; url: string; children: Descendant[] }
export type NumberedListElement = { type: 'numbered-list'; children: Descendant[] }
export type ParagraphElement = { type: 'paragraph'; children: Descendant[] }

export type RichTextElement =
  | BlockQuoteElement
  | BulletedListElement
  | EditableVoidElement
  | HeadingOneElement
  | HeadingTwoElement
  | ImageElement
  | LinkElement
  | ListItemElement
  | NumberedListElement
  | ParagraphElement

export type StyledText = {
  bold?: boolean
  italic?: boolean
  code?: boolean
  underline?: boolean
  text: string
}

export interface RichTextElementInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isElement: (value: any) => value is RichTextElement;
}

export const RichTextElement: RichTextElementInterface = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isElement: (value: any): value is RichTextElement => SlateElement.isElement(value) && ((value as RichTextElement).type !== undefined),
};

