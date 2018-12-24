const initialState = {
  user: {firstName: 'Nikkie', lastName: "Mashian"},
  pawfiles: [
    {
      name: "Mushy",
      species: "Cat",
      gender: "Female",
      breed: "Domestic Mix",
      birthday: "October 2016",
      bio: "Meow. I'm a cute troublemaker. I'll purr then hiss. Give me scritches?",
      img: "https://i.ibb.co/y8hFnkL/2.jpg",
    },
    {
      name: "Muffin",
      species: "Dog",
      gender: "Male",
      breed: "Pom/Yorkie Mix",
      birthday: "January 2010",
      bio: "Ruff. I want to always play and go on walks. Did you say snack?",
      img: "https://i.ibb.co/y8hFnkL/2.jpg",
    },
  ]
};

export default function reducer(state = initialState, action) {
  return state;
}