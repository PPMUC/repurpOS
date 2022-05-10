import { notification } from "uikit";

/**
 * Capitalizes first letters of words in string.
 * @param {string} str String to be modified
 * @param {boolean=false} lower Whether all other letters should be lowercased
 * @return {string}
 * @usage
 *   capitalize('fix this string');     // -> 'Fix This String'
 *   capitalize('javaSCrIPT');          // -> 'JavaSCrIPT'
 *   capitalize('javaSCrIPT', true);    // -> 'Javascript'
 */
export const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

/**
 * Shows an error in a notification on screen
 * @param {string} err Error string to be shown
 * @usage
 *   showError('Error text');
 */
export const showError = (err) => {
  notification({
    message: err,
    status: "danger",
    pos: "top-right",
    timeout: 5000,
  });
};

/**
 * Returns the closest object below with a selected property
 * @param {Array} data Array of objects to search through
 * @param {string} property Name of property to find closest to
 * @param {number} target Number to find closest to
 * @return {Array} Object lower and index
 * @usage
 *   let result = getClosestObjects([...], "time", 100);
 */
export const getClosestObjectBelow = (data, property, target) => {
  let index = 0;
  let itemSmaller = null;
  let largestNum = -Infinity;
  for (let i = 0; i < data.length; i++) {
    let newNum = data[i][property] - target;

    if (newNum > largestNum - target && newNum <= 0) {
      largestNum = data[i][property];
      itemSmaller = data[i];
      index = i;
    }
  }
  return [itemSmaller, index];
};

/**
 * Linearly extrapolates data
 * @param {Number} lowProfileX x coordinate of point 1
 * @param {Number} lowProfileY y coordinate of point 1
 * @param {Number} highProfileX x coordinate of point 2
 * @param {Number} highProfileY y coordinate of point 2
 * @param {Number} newX new x coordinate to find y of
 * @return {Number} The y value at the given x
 * @usage
 *   let result = linearExtrapolateData(1, 1, 2, 2, 3);
 *  //Result = 3;
 */
export const linearExtrapolateData = (
  lowProfileX,
  lowProfileY,
  highProfileX,
  highProfileY,
  newX
) => {
  let linearM = (highProfileY - lowProfileY) / (highProfileX - lowProfileX);
  let linearC = highProfileY - linearM * highProfileX;
  linearC = isFinite(linearC) ? linearC : 0;
  linearM = isFinite(linearM) ? linearM : 0;

  return linearM * newX + linearC;
};
