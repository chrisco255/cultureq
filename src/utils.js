export function immutablyReplaceElementInArray(array, element, index = array.length) {
  array = [
    ...array.slice(0, index),
    element,
    ...array.slice(index + 1)
  ];
  return array;
}

export function immutablyAddElementToArray(array, element, index = array.length) {
  array = [
    ...array.slice(0, index),
    element,
    ...array.slice(index)
  ];
  return array;
}

export function immutablyRemoveIndexFromArray(array, index) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}
