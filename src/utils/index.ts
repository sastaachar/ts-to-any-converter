import * as fs from 'fs';

const fileService = fs.promises;

/**
 * Writes content to a file asynchronously using UTF-8 encoding
 * @param {string} path - The file path where content will be written
 * @param {string} content - The string content to write to the file
 * @returns {Promise<void>} Promise that resolves when the write operation completes
 */
export const writeToFileAsync = async (path: string, content: string): Promise<void> => fileService.writeFile(path, content, 'utf8');

export const appPrevKey = '_prev';
/**
 * Recursively adds a '_prev' reference to each nested object and array element in the
 * given object, pointing to its parent object.
 * @template T - The type of the input object
 * @param {T} obj - The object to process
 * @returns {T} The processed object with '_prev' references added
 * @example
 * const data = {
 *   a: { b: 1 },
 *   c: [{ d: 2 }]
 * };
 * const result = addPrev(data);
 * // result.a._prev === data
 * // result.c[0]._prev === result.c
 */
export const addPrev = <T>(obj: T): T => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (obj[appPrevKey]) {
    return obj;
  }

  Object.keys(obj).forEach((key) => {
    const child = obj[key];

    if (Array.isArray(child)) {
      child.forEach((item, idx) => {
        obj[key][idx] = addPrev(item);
        obj[key][idx][appPrevKey] = obj;
      });
    } else if (typeof child === 'object' && child !== null) {
      obj[key] = addPrev(obj[key]);
      obj[key][appPrevKey] = obj;
    }
  });
  return obj;
};

export const addKeyRecursively = <T>(obj: T, key: string, value: unknown): T => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (key in obj) {
    return obj;
  }

  obj[key] = value;

  Object.keys(obj).forEach((objKey) => {
    
    if (objKey === key) return;
    
    const child = obj[objKey];

    if (Array.isArray(child)) {
      child.forEach((item, idx) => {
        obj[objKey][idx] = addKeyRecursively(item, key, value);
      });
    } else if (typeof child === 'object' && child !== null) {
      obj[objKey] = addKeyRecursively(obj[objKey], key, value);
    }
  });

  return obj;
}


export const getRandomString = (length: number = 5) => {
  return Math.random().toString(36).substring(2, 2 + length);
};
