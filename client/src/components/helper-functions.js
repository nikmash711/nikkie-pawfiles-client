export function todaysDate (){
  let date = new Date().toISOString();
  let dateArr = date.split('T');
  let final = dateArr[0];
  return final;
}

export function formatDate(dateString){
  let dateArr = dateString.split('-');
  return new Date(dateArr[0], dateArr[1]-1, dateArr[2]);
}