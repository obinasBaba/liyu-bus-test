export const removeElementFromArray = (array, itemIndex) => {
  if (itemIndex > -1) {
    // only splice array when item is found
    array.splice(itemIndex, 1); // 2nd parameter means remove one item only
  }
  return array;
};
