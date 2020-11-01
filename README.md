# Tandem - Trivia!

A trivia game website.

`Tandem-Trivia` is a game where the user can get a set of 10 `questions`. Each question will have a respective set of `options`. Upon selection, if the answer from the user is correct, the score will increase 10 points. After the round of 10 questions and once the `submit` button is clicked, the final score will be displayed.

This project is base on tandem's questions data.

Built with `Python`/`Django`/`JavaScript`/ `Bootstrap4`.

## Setup

```
# views.py -the core of the project structure, connects the app with the database, and all the corresponding paths for each web page.
# urls.py -determines the paths for each view function. Connects the HTTPrequest waiting for a matching response from views.py. Here we define the routes and arguments that we would need in order to fetch the data.
# models.py -gives a perspective of how each table of the database looks like and what data types are referring to.
# templates folder -contains all HTML files.
# static folder -contains ` tandem ` folder which contains the css file with the stylesheet, all images using in the application, javascript file and a `readme` folder which contains the images for the readme file.
# main.js -connects the client-side with the server-side, here all the APIs calls are made to fetch information from the database. The path using in our fetch request has to match with the path on our urls.py to connect with the view function and retrieve information. AJAX calls are also to prevent refresh/ reloading the webpage which makes our app run fast. This file is where gets to work all the functionality of our app to be displayed and interact with the user.

```

## Enviroment

- `python3 -m venv venv` create a virtual python enviroment
- `$ . venv/bin/activate` activates the enviroment
- `git clone` with this repo url to get the code in local machine
- `pip install requirement.txt` to get all dependecies and packages
- `pip install django` to creat superuser and activate database
- `python manage.py makemigrations tandem` create tables and for our db
- `python manage.py migrate` migrate the tables
- `python manage.py runserver` activate localhost

## Home Page.

![](/tandem/static/tandem/readme/tandem-t-startQ.png)

## Shows selected option in alert box.

![](/tandem/static/tandem/readme/optSelectAlert.png)

## Disable next button and activate submit button.

![](/tandem/static/tandem/readme/lastSubmitBtn.png)

## Display final score.

![](/tandem/static/tandem/readme/finalScore.png)
