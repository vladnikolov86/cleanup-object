var cachedItem = {};

/**
 * Check if current object is of type array
 * @param {Object} obj - object to be checked
 */
function checkIfObjectIsArray(obj) {
  return obj && typeof obj === 'object' && obj instanceof Array;
}

/**
 * Check if current object is not of type array
 * @param {Object} obj - object to be checked
 */
function checkIfNormalObject(obj) {
  return obj && typeof obj === 'object' && !(obj instanceof Array);
}

/**
 * Check if current object is not of type array and is not a datetime object
 * @param {Object} obj - object to be checked
 */
function checkIfNormalObjectIncludingDates(obj) {
  return obj && typeof obj === 'object' && typeof obj.getMonth !== 'function';
}

/**
 * Check if current argument is not an object 
 * @param {Any} val - object to be checked
 */
function checkForPrimitiveValue(val) {
  return val && typeof val !== 'object';
}

/**
 * Check if current argument is empty value - empty string, null object or undefined. THose values must be cleared.
 * @param {Any} val - object to be checked
 */
function checkForEmptyValues(val) {
  return val === null || val === '' || val === undefined;
}

/**
 * Iterates over an array. If current element is array and has no entries, it should be deleted
 * @param {Array} arr - array which is used for the iteration
 * @param {string} propertyName - property name under which the array could be found within the originalCollection
 * @param {Object} originalCollection - collection in which the array was found. Could be any of the inner nested object within the parent object or on the root level.
 */
function checkForEmptyArrays(arr, propertyName, originalCollection) {
  for (var i = 0; i < arr.length; i++) {
    if (checkIfObjectIsArray(arr[i])) {
      checkForEmptyArrays(arr[i], i.toString(), arr);
    }

    if (checkIfNormalObject(arr[i])) {
      checkForObjectWithNullValues(arr[i]);
    }

    if (checkForPrimitiveValue(arr[i])) {
      continue;
    }
    if (arr[i]) {
      var keys = Object.keys(arr[i]);
      if (keys.length === 0) {
        arr.splice(i, 1);
        i--;
      }
    }
  }
  var keysInOriginalArray = Object.keys(arr);
  if (keysInOriginalArray.length === 0) {
    delete originalCollection[propertyName];
  }
}

/**
 * Iterates over an object with key - value pairs. In case empty value is found => it is deleted
 * @param {Object} obj - array which is used for the iteration
 */
function checkForObjectWithNullValues(obj) {
  for (var prop in obj) {
    if (checkIfNormalObject(obj[prop])) {
      checkForObjectWithNullValues(obj[prop]);
    }
    if (checkIfObjectIsArray(obj[prop])) {
      if (obj[prop].length === 0) {
        delete obj[prop];
        continue;
      }
      else {
        checkForEmptyArrays(obj[prop], prop, obj);
      }
    }
    if (checkForEmptyValues(obj[prop])) {
      delete obj[prop];
      continue;
    }
    if (checkIfNormalObjectIncludingDates(obj[prop])) {
      var keys = Object.keys(obj[prop]);
      if (keys.length === 0) {
        delete obj[prop];
        checkForObjectWithNullValues(cachedItem);
      }
    }
  }
  return obj;
}

/**
 * Main function to be executed for processing the object
 * @param {Object} obj - original object for checking
 */

module.exports = function (obj) {
  cachedItem = obj;
  obj = checkForObjectWithNullValues(obj);
  return obj;
}


