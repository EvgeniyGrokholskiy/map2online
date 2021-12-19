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

import * as React from 'react';
import log from '../../../log';
import './style.scss';
import {useCallback, useMemo, useState} from 'react';
import {Descendant, createEditor} from 'slate';
import {Editable, ReactEditor, Slate, withReact} from 'slate-react';
import {withHistory} from 'slate-history';
import {Toolbar} from './Toolbar';
import MarkButton from './Toolbar/MarkButton';
import Leaf from './Editor/Leaf';
import Element from './Editor/Element';
import BlockButton from './Toolbar/BlockButton';
import InsertImageButton from './Toolbar/InsertImageButton';
import withImages from './Editor/Image/withImage';
import {EmptyText, RichTextElement} from './types';
import AddLinkButton from './Toolbar/AddLinkButton';
import RemoveLinkButton from './Toolbar/RemoveLinkButton';
import withInlines from './Editor/Inlines/withInlines';

const initialValue: (RichTextElement | EmptyText)[] = [
  {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    type: 'paragraph',
    children: [{text: 'This is editable plain text, just like a <textarea>!'}],
  },
  {
    type: 'image',
    url: 'https://source.unsplash.com/kFrdX5IeQzI',
    children: [{ text: '' }],
  },
];

const RichText: React.FunctionComponent<{value?: string, onChange?: (value: string) => void}> = (): React.ReactElement => {
  log.render('RichText Editor');

  const [value, setValue] = useState<Descendant[]>(initialValue);
  const editor = useMemo(() => withInlines(withImages(withHistory(withReact(createEditor() as ReactEditor)))), []);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  return <div className="rich-text" >
    <Slate editor={editor} onChange={v => setValue(v)} value={value} >
      <Toolbar >
        <MarkButton format="bold" icon="format_bold" />

        <MarkButton format="italic" icon="format_italic" />

        <MarkButton format="underline" icon="format_underlined" />

        <MarkButton format="code" icon="code" />

        <BlockButton format="heading-one" icon="looks_one" />

        <BlockButton format="heading-two" icon="looks_two" />

        {
          /* TODO: wraps every P in its own quote
        <BlockButton format="block-quote" icon="format_quote" />
*/
        }

        <BlockButton format="numbered-list" icon="format_list_numbered" />

        <BlockButton format="bulleted-list" icon="format_list_bulleted" />

        <InsertImageButton />

        <AddLinkButton />

        <RemoveLinkButton />

      </Toolbar >

      <Editable
        className="rich-textarea"
        placeholder="Enter some plain text..."
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
    </Slate >
  </div >;
};

export default RichText;
