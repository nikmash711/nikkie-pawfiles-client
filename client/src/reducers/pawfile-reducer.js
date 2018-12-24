const initialState = {
  user: {firstName: 'Nikkie', lastName: "Mashian"},
  pawfiles: [
    {
      id: 1,
      name: "Mushy",
      species: "Cat",
      gender: "Female",
      breed: "Domestic Mix",
      birthday: "October 2016",
      bio: "Meow. I'm a cute troublemaker. I'll purr then hiss. Give me scritches?",
      img: "https://i.ibb.co/y8hFnkL/2.jpg",
      reminders: [
        {
          note: "Trim Nails",
          date: "12/24/18"
        },
        {
          note: "Vet Appointment",
          date: "12/30/18",
        }
      ]
    },
    {
      id: 2,
      name: "Muffin",
      species: "Dog",
      gender: "Male",
      breed: "Pom/Yorkie Mix",
      birthday: "January 2010",
      bio: "Ruff. I want to always play and go on walks. Did you say snack?",
      img: "https://i.ibb.co/y8hFnkL/2.jpg",
      reminders: [
        {
          note: "Give Shot",
          date: "Daily"
        },
      ]
    },
  ]
};

export default function reducer(state = initialState, action) {
  return state;
}