import * as React from 'react';
import {useCallback} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import log from '../../../log';
import {getCatalogUI, getWording} from '../../../di-default';
import useObservable from '../../hooks/useObservable';
import RouteView from './RouteView';
import {Category} from '../../../app-rx/catalog';
import RouteEdit from './RouteEdit';
import ConfirmDialog from '../Confirm';

const getClassName = (isDraggingOver: boolean): string => `list${isDraggingOver ? ' dragging-over' : ''}`;

const getDraggingStyle = (isDragging: boolean, draggableStyle: object): object => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  /*
   *  padding: grid2,
   * margin: `0 0 ${grid}px 0`,
   */

  /*
   * change background colour if dragging
   * background: isDragging ? 'lightgreen' : 'grey',
   */

  // styles we need to apply on draggables
  ...draggableStyle,
});

const catalogUI = getCatalogUI();
const wording = getWording();

const RoutesView: React.FunctionComponent<{ category: Category; }> = ({category}): React.ReactElement => {
  log.render('Routes');

  const routes = useObservable(category.routes.observable(), category.routes);
  const routeEdit = useObservable(catalogUI.routeEditObservable(), catalogUI.routeEdit);
  const routeDelete = useObservable(catalogUI.routeDeleteObservable(), catalogUI.routeDelete);
  const handleDragEnd = useCallback(
    ({source: {index: indexS}, destination: {index: indexD}}): void => routes.reorder(indexS, indexD),
    []);
  const handleAdd = useCallback(() => {
    category.routes.add(null).then(route => catalogUI.startEditRoute(route))
  }, []);

  return <div className={'folders level-1'} >
    <DragDropContext onDragEnd={handleDragEnd} >
      <Droppable droppableId={'catalog-droppableFolder-level-1'} >
        {(providedDroppable, snapshotDroppable): React.ReactElement => <div
          className={getClassName(snapshotDroppable.isDraggingOver)}
          ref={providedDroppable.innerRef}
        >
          {Array.from(routes).map((item, index): React.ReactElement =>
            <Draggable draggableId={item.id} index={index} key={item.id} >
              {(provided, snapshot): React.ReactElement => <div
                className={'draggable folder-level-1'}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getDraggingStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                <RouteView canDelete={routes.length > 1} category={category} route={item} />
              </div >
              }
            </Draggable >)}
        </div >
        }
      </Droppable >
    </DragDropContext >
    <button className="add" onClick={handleAdd} type="button" >
      Add
    </button >
    {routeEdit && <RouteEdit route={routeEdit} />}
    {routeDelete && <ConfirmDialog
      onConfirm={() => {
        const c = routeDelete;
        catalogUI.endDeleteRoute();
        category.routes.remove(c.route);
      }}
      onCancel={catalogUI.endDeleteRoute}
      title={wording.R('Delete route')}
      message={wording.R('Delete route warning')}
      confirm={wording.R('Yes, delete the route')}
    />}
  </div >;
};

export default RoutesView;
