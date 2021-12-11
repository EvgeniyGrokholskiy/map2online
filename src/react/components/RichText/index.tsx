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
import {Editor, EditorState} from 'draft-js';
import log from '../../../log';
import './style.scss';

const RichText: React.FunctionComponent = (): React.ReactElement => {
  log.render('RichText');
  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
  const [focusState, setFocusState] = React.useState<boolean>(editorState.getSelection().getHasFocus());

  const editor = React.useRef(null);

  const focusEditor = () => {
    editor.current.focus();
  };

  return <div
    className={`rich-text${focusState ? ' focused' : ''}`}
    onBlur={() => setFocusState(false)}
    onClick={focusEditor}
    onFocus={() => setFocusState(true)}
  >
    <Editor
      editorState={editorState}
      onChange={setEditorState}
      ref={editor}
    />
  </div >;
};

export default RichText;
