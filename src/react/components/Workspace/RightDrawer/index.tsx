/*
 * Copyright 2019 s4y.solutions
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

import FileMenu from '../../FileMenu';
import MapSourcesMenu from '../../MapSourcesMenu';
import React from 'react';
import posed from 'react-pose';
import {tween} from 'popmotion';
import log from '../../../../log';
import {getWorkspace} from '../../../../di-default';
import useObservable from '../../../hooks/useObservable';
import SettingsMenu from '../../SettingsMenu';

const PosedMenu = posed.div({
  hide: {
    transition: tween,
    width: 0,
  },
  show: {
    transition: tween,
    width: 'auto',
  },
});

const workspace = getWorkspace();

const RightDrawer: React.FunctionComponent = (): React.ReactElement => {
  const stateFile = useObservable(workspace.fileObservable(), workspace.fileOpen);
  const stateSources = useObservable(workspace.sourcesObservable(), workspace.sourcesOpen);
  const stateSettings = useObservable(workspace.settingsObservable(), workspace.settingsOpen);
  log.render(`RightDrawer fileMenu=${stateFile} sourceMenu=${stateSources} settings=${stateSettings}`);
  return <PosedMenu className="right-drawer" pose={stateFile || stateSources || stateSettings ? 'show' : 'hide'} >
    {stateSources && <MapSourcesMenu />}
    {stateFile && <FileMenu />}
    {stateSettings && <SettingsMenu />}
  </PosedMenu >;
};

export default RightDrawer;

