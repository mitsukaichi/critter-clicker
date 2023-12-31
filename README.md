# CRITTER CLICKER

### [View Live Project Here](https://critter-clicker-c6c973aed451.herokuapp.com/ "CRITTER CLICKER")<br />
![image of CRITTER CLICKER](/public/image/intro.gif "image of CRITTER CLICKER")
| Technology Used    | Resource URL |
| --------  | ------- |
| NodeJS      | https://nodejs.org/en |
| ExpressJS      | https://expressjs.com/ |
| Handlebars | https://handlebarsjs.com/ |
| dotenv      | https://www.npmjs.com/package/dotenv |
| bcrypt      | https://www.npmjs.com/package/bcrypt |
| Connect Session  | https://www.npmjs.com/package/connect-session-sequelize  |
| Boostrap      | https://getbootstrap.com/ |
| MySQL      | https://www.mysql.com/ |
| mysql2      | https://www.npmjs.com/package/mysql2 |
| Sequelize  | https://www.npmjs.com/package/sequelize |
| Nodemon  | https://www.npmjs.com/package/nodemon |
| Insomnia | https://insomnia.rest/ |
| Sequel Ace | https://sequel-ace.com/ |
| JavaScript | https://developer.mozilla.org/en-US/docs/Web/JavaScript |
| Git       | https://git-scm.com/ |
| GitHub     | https://github.com/ |
| VSCode    | https://code.visualstudio.com/ |
| Cloudinary    | https://cloudinary.com/ |
| Heroku    | https://www.heroku.com/ |


## Table of Contents

* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Authors](#authors)

## Description:
This project is a full stack project to share pet pics with the community. [4 authors](#authors) developed this app which allow users to see, like, comment on the pictures of other people's pets and post or delete the photo of your pet(s). User can sign up, sign in and log out from the page and some functionalities such as like, comment and post photos are limited to signed in users.<br />
<br />

### How to use this app:

* Click on the deployed link above 'View Live Project Here'
    * See photos with like counts on Home page
    * Click on the individual photo to see the comments and category
    * Click on the category name to see other photos in the same category
    * Click "Most liked" in the nav bar to see the photos ordered by the like counts

* Navigate to the "LOGIN" to sign up for more functionalities
    * Enter credentials
    * Navigate back to the home page and like posts
    * Click on the indivudual photo to leave comments
    * Go to Dashboard page from the link in the nav bar
    * Post your pet's photo
    * Delete your pet's photo if you need
    * Log out from the button in the nav bar

## Project Requirements

```md
Use Node.js and Express.js to create a RESTful API.
Use Handlebars.js as the templating engine.
Use MySQL and the Sequelize ORM for the database.
Have both GET and POST routes for retrieving and adding new data.
Be deployed using Heroku (with data).
Use at least one new library, package, or technology that we haven’t discussed.
Have a polished UI.
Be responsive.
Be interactive (i.e., accept and respond to user input).
Have a folder structure that meets the MVC paradigm.
Include authentication (express-session and cookies).
Protect API keys and sensitive information with environment variables.
Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).
Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).
```

### Lessons Learned

#### 1. Difference between event.target and event.currentTarget - by Minami
While I was working on Javascript function to like and unlike individual photo, grabbing the ID of the each post from the ID of the clicked element was not always successfull and post_id remained undefined. This was due to the [event bubbling](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_bubbling) - event bubbles up from the innermost element that was clicked to its parents. 

To explicitly get the ID of that the event listener is attached to, switching from event.target to event.currentTarget solved this problem.
<br />
Javascript
![lesson 1](https://github.com/mitsukaichi/critter-clicker/assets/45612744/3a725400-f59d-4680-af6e-addeab2d81a2)

HTML (Handlebar)
![lesson 1](https://github.com/mitsukaichi/critter-clicker/assets/45612744/64e56ae1-40cd-4d8a-aac0-2831734a33d9)

#### 2. Database Creation
This project gave us the opportunity to create a database from scratch. Creating the schema, models, seed data, and model associations was an extremely valuable experience. It was very helpful to see how good database design is an integral part of a full stack web application. Below you can see an overview of our database design with the table associations.
<br />

![Database schema](https://github.com/mitsukaichi/critter-clicker/assets/143736506/2bb70d19-37c4-43d6-af45-1ba98862ea3f)


#### 3. Cloudinary Platform
Our work, required a platform to retrieve and upload a picture and show it on our webpage. This gave me chance to explore the docs of the API was a good experience for me to learn about the platform and it's uses to integrate into our project. By installing their package and configuring the cloudinary object with the associated credentials. Below, shows the configuration and grabbing the image url from cloud required for our project to preview it.
<br />
![Cloudinary](https://github.com/mitsukaichi/critter-clicker/assets/144869976/4221189f-c6c3-44bb-9fbb-c9da63297053)

#### 4. Sequelize Literal
A key component to our project having the ability to like and unlike posts and display the like count came down to our sequelize literal statments. This way we were able to query the database to pull a sum of the amount of likes per post and also determine if a post had already been liked. Below shows one of our code snippets and images of how it functioned inside the controller route for our dashboard.
```
attributes: {
    include: [
        [
            sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE liked = true AND likes.posts_id = posts.id GROUP BY posts_id)`),
            'likedCount'
        ],
        [
            sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE users_id = ${req.session.users_id} AND liked = true AND likes.posts_id = posts.id)`),
            'isLiked'
        ]
    ]
}
```
<br />

![lesson 4](public/image/lesson4.png)
![lesson 4](public/image/lesson4b.png)

## Installation

1. Create a new repository on GitHub, to store this project.
2. Clone the repository to your computer.
3. Copy files to your own repository.
4. Follow the steps for "How to" above
5. Make changes to the code.
6. Commit the changes to the local repo.
7. Push the changes to the remote repo.

## Usage

This is a full stack project to share pet pics with the community. If you would like to update and use app follow the installation steps and curate it to your needs. If you would like to use this app, follow the steps under the description 'How to' above and click the link at the top of this page.

## License

MIT License
Copyright (c) 2023 Minami Mukai (Itsukaichi) / Anthony Nguyen / Aaron Torres / Janet Webster

<hr />

## Authors
### Minami Mukai (Itsukaichi)
- [GitHub](https://github.com/mitsukaichi/)
- [LinkedIn](https://www.linkedin.com/in/minami-itsukaichi/)

### Anthony Nguyen
- [GitHub](https://github.com/Blackswan1010)
- [LinkedIn](https://www.linkedin.com/in/anthony-nguyen-32261526a/)

### Aaron Torres
Certified Scrum Master and Software Engineer in training.
- [GitHub](https://github.com/aaront080) 
- [LinkedIn](https://www.linkedin.com/in/aaron-torres-003672b1/) 

### Janet Webster
Full Stack MERN Software Engineer in training.

- [GitHub](https://github.com/TwixmixyJanet/)
- [LinkedIn](https://www.linkedin.com/in/twixmixy/)
- [Twitter](https://twitter.com/Twixmixy)
- [WakaTime](https://wakatime.com/@Twixmixy)
