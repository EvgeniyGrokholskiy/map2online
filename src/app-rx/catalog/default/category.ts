import {Catalog, Categories, Category, CategoryProps, ID, Route} from '../index';
import {KV} from '../../../kv-rx';
import {routesFactory} from './route';
import {makeId} from '../../../l10n/id';
import T from '../../../l10n';
import {map} from 'rxjs/operators';
import reorder from '../../../lib/reorder';

export const CATEGORY_ID_PREFIX = "c";

export const newCategoryProps = (): CategoryProps => ({
  id: makeId(),
  description: '',
  summary: '',
  title: T`New category`,
  visible: true,
});

interface Updateable {
  update: () => void;
}

export const categoryFactory = (storage: KV, catalog: Catalog, props: CategoryProps | null): Category & Updateable | null => {
  const p: CategoryProps = props === null ? newCategoryProps() : {...props};
  const key = `${CATEGORY_ID_PREFIX}@${p.id}`;

  const th: Category & Updateable = {
    get description() {
      return p.description
    },
    set description(value) {
      p.description = value;
      this.update();
    },
    id: p.id,
    get summary() {
      return p.summary
    },
    set summary(value) {
      p.summary = value;
      this.update();
    },
    get title() {
      return p.title
    },
    set title(value) {
      p.title = value;
      this.update();
    },
    get visible() {
      return p.visible
    },
    set visible(value) {
      p.visible = value;
      this.update();
    },
    delete: function () {
      for (const route of Array.from(this.routes)) {
        this.routes.remove(route);
      }
      storage.delete(key);
      storage.delete(`vis@${p.id}`); // visibility
    },
    hasRoute: function (route: Route) {
      return this.routes.hasRoute(route)
    },
    observable: () => storage.observable<CategoryProps | null>(key)
      .pipe(
        map(props => props === null ? null : catalog.categoryById(props.id))
      ),
    routes: null,
    update: function () {
      storage.set(key, {...p});
    },
  };
  th.routes = routesFactory(storage, catalog, th);
  return th;
};

export const categoriesFactory = (storage: KV, catalog: Catalog): Categories => {
  let ids0 = storage.get<ID[]>('cats', []);
  const updateIds = (ids: ID[]) => {
    if (ids !== ids0) {
      ids0 = ids;
      storage.set('cats', ids);
    }
  };
  if (ids0.length === 0) {
    const category = newCategoryProps();
    storage.set(`${CATEGORY_ID_PREFIX}@${category.id}`, category);
    updateIds([category.id]);
  }
  return {
    add: function (props: CategoryProps | null, position?: number): Promise<Category> {
      const category = categoryFactory(storage, catalog, props);
      category.update();
      const pos = position || ids0.length;
      updateIds(ids0.slice(0, pos).concat(category.id).concat(ids0.slice(pos)));
      return Promise.resolve(category);
    },
    byPos: (index: number): Category | null => catalog.categoryById(ids0[index]),
    get length() {
      return ids0.length
    },
    observable: function () {
      return storage.observable('cats').pipe(map(() => this))
    },
    remove: function (category: Category): number {
      const pos = ids0.indexOf(category.id);
      if (pos === -1) return -1;
      updateIds(ids0.slice(0, pos).concat(ids0.slice(pos + 1)));
      category.delete();
    },
    reorder: function (from: number, to: number) {
      updateIds(reorder(ids0, from, to));
    },
    [Symbol.iterator]: function () {
      const _ids = [...ids0];
      let _current = 0;
      return {
        next: () => {
          return _current >= _ids.length
            ? {done: true, value: null,}
            : {done: false, value: this.byPos(_current++)};
        }
      };
    }
  }
};