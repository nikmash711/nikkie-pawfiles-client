export const required = value => 
    (value ? undefined : 'Required');

export const nonEmpty = value => {
  return value.trim() !== '' ? undefined : 'Cannot be empty';
}

export const unSelected = value => {
  if (value === undefined) value = '';
  return value.trim() !== '' ? undefined : 'Please select';
}

// export const validURL = value => {
//   return value.trim() !== '' ? undefined : 'Valid URL required';
// }