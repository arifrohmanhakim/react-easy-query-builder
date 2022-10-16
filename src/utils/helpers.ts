import _ from "lodash";

export function removeEmptyObjects(obj: any): any {
  return _(obj)
    .pickBy(_.isObject) // pick objects only
    .mapValues(removeEmptyObjects) // call only for object values
    .omitBy(_.isEmpty) // remove all empty objects
    .assign(_.omitBy(obj, _.isObject)) // assign back primitive values
    .value();
}

/**
 * remove empty nested array object
 *
 * @param obj
 * @returns
 */
export function removeEmptyArrayObject(obj: any): any {
  const finalObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      const nestedObj = removeEmptyArrayObject(obj[key]);
      if (Object.keys(nestedObj).length) {
        //@ts-ignore
        finalObj[key] = nestedObj;
      }
    } else if (Array.isArray(obj[key])) {
      if (obj[key].length) {
        //@ts-ignore
        obj[key].forEach((x) => {
          const nestedObj = removeEmptyArrayObject(x);
          if (Object.keys(nestedObj).length) {
            //@ts-ignore
            finalObj[key] = finalObj[key]
              ? //@ts-ignore
                [...finalObj[key], nestedObj]
              : [nestedObj];
          }
        });
      }
    } else if (obj[key] !== "" && obj[key] !== undefined && obj[key] !== null) {
      //@ts-ignore
      finalObj[key] = obj[key];
    }
  });
  return finalObj;
}
