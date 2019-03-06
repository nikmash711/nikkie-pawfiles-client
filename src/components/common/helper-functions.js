export function isLeapYear(year) {
  let d = new Date(year, 1, 28);
  d.setDate(d.getDate() + 1);
  return d.getMonth() == 1;
}

export function calculateAge(date) {
  let d = new Date(date),
      now = new Date();
  let years = now.getFullYear() - d.getFullYear();
  d.setFullYear(d.getFullYear() + years);
  if (d > now) {
      years--;
      d.setFullYear(d.getFullYear() - 1);
  }
  let days = (now.getTime() - d.getTime()) / (3600 * 24 * 1000);
  let weeks= Math.floor(days/7);
  let age_in_years= Math.floor(years + days / (isLeapYear(now.getFullYear()) ? 366 : 365))
  ;
  let final_age = age_in_years;

  if(age_in_years===0){
    final_age= `~ ${weeks} weeks`
  }
  if(weeks===0){
    final_age=` ~ ${Math.floor(days)} days`
  }
  return final_age;
}

export function todaysDate (){
  let date = new Date().toLocaleDateString();
  let dateArr = date.split('/');
  let year = dateArr[2];
  let month = dateArr[0].length===1 ? "0" + dateArr[0] : dateArr[0] ;
  let day = dateArr[1].length===1 ? "0" + dateArr[1] : dateArr[1] ;
  let finalDate = year + "-" + month + "-" + day;
  return finalDate;
}

export function formatDate(dateString){
  let dateArr = dateString.split('-');
  return new Date(dateArr[0], dateArr[1]-1, dateArr[2]);
}

function unabbreviated(str){
  switch(str) {
    case "Mon":
      return "Monday"
    case "Tue":
      return "Tuesday"
    case "Wed":
      return "Wednesday"
    case "Thu":
      return "Thursday"
    case "Fri":
      return "Friday"
    case "Sat":
      return "Saturday"
    case "Sun":
      return "Sunday";
    
    case "Jan":
      return "January"
    case "Feb":
      return "February"
    case "Mar":
      return "March"
    case "Apr":
      return "April"
    case "May":
      return "May"
    case "Jun":
      return "June"
    case "Jul":
      return "July";
    case "Aug":
      return "August"
    case "Sep":
      return "September"
    case "Oct":
      return "October"
    case "Nov":
      return "November";
    case "Dec":
      return "December";
    default:
      return str;
  }
}

export function formatLongDate(dateString){
  let dateArr = dateString.split('-');
  let newDate = new Date(dateArr[0], dateArr[1]-1, dateArr[2]).toDateString();
  //newdate is Wed Jan 02 2019
  dateArr = newDate.split(' ');
  let nameDay = dateArr[0];
  let month = dateArr[1];
  let day = dateArr[2];
  let year = dateArr[3];

  nameDay=unabbreviated(nameDay);
  month = unabbreviated(month);

  return `${nameDay}, ${month} ${day}, ${year}`
}

export function changeMilitaryFormat(military_time){
    let hours24 = parseInt(military_time.substring(0,2));
    let hours = ((hours24 + 11) % 12) + 1;
    let amPm = hours24 > 11 ? 'PM' : 'AM';
    let minutes = military_time.substring(2);
    minutes = minutes.split(':').join('');
    return hours + ':' + minutes + amPm;
}

export function stringToArrayList(str){
  if(str.trim()===""){
    return [];
  }
  const arr = str.split(',');
  let result = arr.map(item=>item.trim());
  console.log('THE RESULT IS,', result);
  return result;
}

export function arrayToString(arr){
  return arr.join(', ');
}

//global variable: 
let globalArrayOfSearchTerms=[];

//this fn is responsible for updating the global array which keeps track of the search terms and whether or not they were found in each post
//it accepts the id for the post, the part of the post being checked, and the array of search terms 
function contains(id, str, arr){
  for(let i =0; i<arr.length; i++){
    //if this word was already found for this post, or it now includes it, change this word's value to true for this post 
    if(globalArrayOfSearchTerms.find(item=>item.postId===id)[arr[i]]===true || str.toLowerCase().includes((arr[i]).toLowerCase())){
      //this means this search term was found somewhere in the post 
      globalArrayOfSearchTerms.find(item=>item.postId===id)[arr[i]] = true;
    }
    //if its not found in this part of the post, then return false for this post
    else{
      globalArrayOfSearchTerms.find(item=>item.postId===id)[arr[i]] = false;
    }
  }
  //dont care what it returns, the point of it is to update the global arr
  return null;
}

//This search fn will return any post that has ALL of the search terms (each space determines a new term) present somewhere in the post 
export function filterBySearch(terms, posts){
  let searchTerms = terms.toLowerCase();
  searchTerms = searchTerms.split(" ");

  //reset the global
  globalArrayOfSearchTerms =[];

  //set up the global to be an array of objects, each object having a postId
  for(let i = 0; i<posts.length; i++){
    globalArrayOfSearchTerms.push({"postId": posts[i].props.postId});
  }

  //for each post, run the contains function that will update the global array accordingly
  return posts.filter(post=>
    {
      let bool = true; 
      let date = formatLongDate(post.props.date).toLowerCase();

      contains(post.props.postId, post.props.title, searchTerms);
      contains(post.props.postId, date, searchTerms);
      (post.props.description && contains(post.props.postId, post.props.description, searchTerms)); 
      (post.props.notes && contains(post.props.postId, post.props.notes, searchTerms));
      (post.props.doctor && contains(post.props.postId, post.props.doctor, searchTerms));
      (post.props.symptoms && post.props.symptoms.find(symptom=>contains(post.props.postId, symptom, searchTerms))); 
      (post.props.prescriptions && post.props.prescriptions.find(prescription=>contains(post.props.postId, prescription, searchTerms)));
      (post.props.vaccinations && post.props.vaccinations.find(vaccination=>contains(post.props.postId, vaccination, searchTerms)))

      //grab the object in the array that corresponds to this specific post 
      let obj = globalArrayOfSearchTerms.find(item=>item.postId===post.props.postId)

      //if any of the words in the global array for this post were false, then it doesn't include that search term in the post. and we'll return false for this post
      for (var key in obj) {
        if(obj[key]===false){
          bool=false;
        }
      }
      return(  
        bool    
      );
    }
  )
}

export function filterPetsBySearch(searchTerm, pawfiles){
  return pawfiles.filter(pawfile=>pawfile.props.name.toLowerCase().includes(searchTerm.toLowerCase()));
}

export function sortNewestToOldest(posts){
  return posts.sort((postA, postB)=> new Date(postB.props.date) - new Date(postA.props.date));
}

export function sortOldestToNewest(items){
  return items.sort((itemA, itemB)=> new Date(itemA.props.date) - new Date(itemB.props.date));
}

export function sortByOldest(pawfiles_list){
  pawfiles_list.sort((a,b)=> new Date(a.props.birthday) - new Date(b.props.birthday))
}

export function sortByYoungest(pawfiles_list){
  pawfiles_list.sort((a,b)=> new Date(b.props.birthday) - new Date(a.props.birthday))
}

export function sortAtoZ(pawfiles_list){
  pawfiles_list.sort((a,b)=> a.props.name < b.props.name ? -1 : a.props.name < b.props.name ? 1 : 0)
}

export function sortZtoA(pawfiles_list){
  pawfiles_list.sort((a,b)=> a.props.name > b.props.name ? -1 : a.props.name > b.props.name ? 1 : 0)
}

export function filterByCategory(filter, posts){
  return posts.filter(post=>post.props.type===filter);
}

export function formatName(str) {
  //make it all lower case first
  str = str.toLowerCase();
  //make the first letter capital: 
  return str.charAt(0).toUpperCase() + str.slice(1);
}