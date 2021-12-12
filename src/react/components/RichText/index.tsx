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
import {useMemo, useState} from 'react';
import {Descendant, createEditor} from 'slate';
import {Editable, ReactEditor, Slate, withReact} from 'slate-react';
import {withHistory} from 'slate-history';

const initialValue: Descendant[] = [
  {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    type: 'paragraph',
    children: [{text: 'This is editable plain text, just like a <textarea>!'}],
  },
];

const RichText: React.FunctionComponent = (): React.ReactElement => {
  log.render('RichText');

  const [value, setValue] = useState<Descendant[]>(initialValue);
  const editor = useMemo(() => withHistory(withReact(createEditor() as ReactEditor)), []);
  return (
      <Slate editor={editor} onChange={v => setValue(v)} value={value} >
        <Editable className="rich-text" placeholder="Enter some plain text..." />
      </Slate >
  );

};

export default RichText;
