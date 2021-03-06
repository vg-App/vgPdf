import { defined } from '../util';

function geometryAccessor(name) {
    const fieldName = "_" + name;
    return function(value) {
        if (defined(value)) {
            this._observerField(fieldName, value);
            this.geometryChange();
            return this;
        }

        return this[fieldName];
    };
}

export default function defineGeometryAccessors(fn, names) {
    for (let i = 0; i < names.length; i++) {
        fn[names[i]] = geometryAccessor(names[i]);
    }
}