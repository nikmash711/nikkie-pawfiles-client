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

export function stringToArrayList(str){
  return str.split(',');
}

export function filterBySearch(searchTerm, posts){
  console.log('the posts in theh helper are', posts);
  return posts.filter(post=>
    post.props.title.toLowerCase().includes(searchTerm) || post.props.date.toLowerCase().includes(searchTerm) || 
    (post.props.description && post.props.description.toLowerCase().includes(searchTerm)) || 
    (post.props.notes && post.props.notes.toLowerCase().includes(searchTerm)) || 
    (post.props.doctor && post.props.doctor.toLowerCase().includes(searchTerm)) || 
    (post.props.symptoms && post.props.symptoms.find(symptom=>symptom.toLowerCase().includes(searchTerm))) || 
    (post.props.prescriptions && post.props.prescriptions.find(prescription=>prescription.toLowerCase().includes(searchTerm))) || 
    (post.props.vaccinations && post.props.vaccinations.find(vaccination=>vaccination.toLowerCase().includes(searchTerm)))
    )
}

export function sortNewestToOldest(posts){
  return posts.sort((postA, postB)=> new Date(postB.props.date) - new Date(postA.props.date));
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
