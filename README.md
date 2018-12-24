
# Pawfiles

## Summary of App:
Wouldn't it be nice to keep a timeline of your pet's life?
From their medical records to remembering something hilarious they did
the other day, it can be easy to forget important things about your
furry best friend. Well now you can keep track of it all with
Pawfiles! Pawfiles helps you keep a simple timeline on your pet:
whether it's what the vet said at their last appointment, a record of
their vaccination schedule, or a cute memory you just don't want to
forget, this is the place to document it all :) P.S. When looking at
wireframes, please look at desktop version first since I've included
descriptions of each page there.

## User Stories/MVP: 
1. User can create an account for themselves with a first name, last name, username, and password
2. User will be directed to a home page where they see all their pets (if any) and can add a new pet pawfile by filling out a form (name, species, breed, gender, profile photo, brief bio.)
3. Single user can have as many "pawfiles" as they wish if they own more than one pet
4. User can add posts for each pet - it can be a memory post with a title, description, date, and a photo URL corresponding to the memory, OR a medical related post where they can include a title, description, symptoms, labs, vet, location, date, and a link to a file. Once posted, only the info filled out will show (empty fields will not be displayed).
5. Posts will be organized on the Pawfile chronologically
6. User can search for specific posts on the Pawfile, and filter it by category
7. There will be a sidebar on the Pawfile with a brief bio about the pet as well as a list of reminders for that pet: for
example, need to buy more litter, or go get groomed next week, etc.
8. The URL of the image the user links will show an actual image once posted, and the user can click on that image to see an enlarged version of it (images should be standard size) 
9. Navbar with Home/My Pets (shows all pets and can get to individual pawfile through here), settings, logout.

## Extension Features: 
1. User can change their password
2. Users can see other user's Pawfiles (read-only) via a link
3. Users can edit their posts, delete their posts, update their pet's profile photo, etc.
4. Users will only be logged out after a certain amount of time, not every time they refresh or leave the browser (implement auth stuff) 
5. When requests are sent via a GET method, they will be queried to the end of the url so the user can click back or search their history (use React Routers) 
6. Users can search for vets in their area (Yelp api?) 
7. User can directly upload a photo or file from their computer (for posts or profile photo) and not via an external link (that way they can upload files/records etc.) Can do this by either using GridFs, or saving that file to another db (like AWS), and storing a ref to it in my db. 
8. Reminders can include a time, and can even push notifications to the user (to their notification center) - like for daily pills 
9. Use some of these pet puns throughout the app: https://www.lifelearn.com/2016/02/24/the-jumbo-reference-list-of-pet-puns/
10. Parts of the design (and puns) will change based on whether it's a cat vs dog, male vs female. Design will hopefully look like an actual timeline
11. "See more" at bottom of timeline to load more posts so db doesn't load all of them at once
12. Make it an app for flex week!
13. Ability to change password when logged in
14. Ability to reset password (this would involve storing user's emails, a security issue. Or they would have to report a problem, and then I'd need some way of verifying their identity). https://nodemailer.com/about/, https://www.mailgun.com/blog/how-to-send-transactional-email-in-a-nodejs-app-using-the-mailgun-api, https://www.w3schools.com/nodejs/nodejs_email.asp
15. User can edit and delete their posts and info about their pets (and pictures). 
16. User can choose a date for each post so the posts can be chronologically sorted by that date rather than date created
17. Use an API for maps so when user types in address for vet, it loads and comes up and they can click it. It'll link to Google Maps 
18. User can filter by date 
19. User can add/edit/delete reminders from reminders list
20. Settings tab will lead to a settings page where user can update their name (not username), password, email(?), profile picture, etc. 

## Foreseeable Issues: 
1. Storing images/files in MongoDB (I think I'd have to use something called GridFS) 

## Competitors:
1. Vitusvet (mobile app)
2. Petly (web app) 
