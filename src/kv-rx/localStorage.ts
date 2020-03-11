import {KV} from './index';
import {Subject} from 'rxjs';
import {persistedLocal} from '../persist/local';
import {filter, map} from 'rxjs/operators';

interface LocalStorage {
  subject: Subject<{ key: string; value: any }>
}

const localStorageSingleton: KV & LocalStorage = {
  get: function <T>(key: string, defaultValue: T, forcedJSON?: string) {
    if (forcedJSON) {
      return JSON.parse(forcedJSON);
    }
    const serialized = window.localStorage.getItem(key);
    return serialized ? JSON.parse(serialized) : defaultValue;
  },
  subject: new Subject<{ key: string, value: any }>(),
  set: function <T>(key: string, value: T) {
    if (value === undefined) {
      window.localStorage.removeItem(key);
    } else {
      const valueToStore = value instanceof Function ? value(persistedLocal(key, value)) : value;
      window.localStorage.setItem(
        key,
        JSON.stringify(valueToStore)
      );
    }
    this.subject.next({key, value})
  },
  delete: function <T>(key: string) {
    window.localStorage.removeItem(key);
    this.subject.next({key, value: null})
  },
  observable: function <T>(key?: string) {
    return key
      ? this.subject.pipe(
        filter<{ key: string; value: any }>((r): boolean => r.key === key),
        map<{ key: string; value: any }, any>((r) => r.value)
      )
      : this.subject;
  },
};

export default localStorageSingleton;