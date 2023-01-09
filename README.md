# Study Buddy

## Table of Contents
1. [Title](#title)
2. [Project](#project)
3. [Description](#description)
4. [Working](#working)
5. [Usage](#usage)
6. [User Story](#user-story)
7. [Acceptance Criteria](#acceptance-criteria)
8. [Project Outline](#project-outline)
9. [Wireframe](#wireframe)
10. [Preview of Web Application](#video-preview-of-web-application)
11. [Technology](#technology)
12. [Contribution](#contribution)
13. [Source](#source)

## Title :
### Bootcamp Group Project 2

## Project :
### *Studdy Buddy*

## Description :
* This is a group project created using Handlebars, CSS, Javascript, Bootstrap, Express, Handlebars, Sequelize, and Bcrypt
* Studdy Buddy is an application that pairs users looking to partner with a peer to work through a selected course topic, based on how they match up via a self ranking system.


## Working :
* "Create Account" field stores users credentials and redirects to the assessment page
* "Login to Profile" field redirects user to their user profile
* "Update Assessments" field stores users entered scores (both initial and updated) into a database
* Database compares scores and matches user who is seeking a buddy (when "Find a Buddy" button is selected) to user who is waiting to help a buddy (when "Help a Buddy" button is selected) and is scored above the user who is seeking a buddy 
* Chat box deploys between the paired users once a match is made
* "Logout" button allows user to leave the chat conversation and/or to logout of the application

## Usage :
* Open the intial interface deployed through Heroku
* The user can then create an account in the login page by completing the username and password fields
* They'll complete a self-assessment, ranking their confidence level among the listed course topics
* They'll click "find a buddy" to be paired with a peer who is ranked above them in the selected topic, to provide sufficent thought-partnering support
* They can click "help a buddy" to be put in a queue that will match them with someone who is looking for a buddy
* When there is a match they will be automatically moved into a chat conversation to start working with their partner
* They can click "logout" once they would like to leave the conversation
* The user can also update their assessment scores as often as they advance through any listed course topic, using the "update assessment" button
* They can also log back in with their user credentials when they would like to open a new buddy search or chat session


## User Story :
As a student, I want to be paired with a study partner to work together on a topic that I am struggling with and they can provide support in

## Acceptance Criteria :
- Given I open the Studdy Buddy application, then I am prompted to create a user account
- When I provide my credentials
- Then I am taken to a topic assessment page
- When I select my topic scores
- Then those scores are stored in a database and compared to other users' scores
- When I select "find a buddy"
- Then the database pairs me with a partner that is scored above me in the selected topic and I am automatically moved into a chat conversation with my matched partner
- When I have received the support I needed 
- Then I can leave the conversation
- When I want to return to a session
- Then I can log back in to my account where my scores are stored
- When I have advanced in a particular topic
- Then I can update my scores
- When I want to lend support to somebody else
- Then I can click "help a buddy" to be in queue to help the next person in need of study support

## Project Outline :
[Link to PowerPoint Presentation](https://docs.google.com/presentation/d/1DWARNOaXLr5_0c3B3QhhrRVVkA12Ernlen_EvyX3j14/edit#slide=id.g1c2c22b2bdb_0_1)

## Wireframe :
[Link to Wireframe](https://www.figma.com/file/ecH6V9VV64Y8h0Zg77uk92/Untitled?node-id=0%3A1&t=cGEf3qLriIdzacSN-1)

## Preview of Web Application :
![Alt text](./public/images/Screenshot%202023-01-08%20at%208.24.56%20PM.png)


## Technology :
 <img src="https://th.bing.com/th/id/OIP.pqcPskVdTrJqfhZ-Z49AtQHaHn?w=170&h=180&c=7&r=0&o=5&pid=1.7" width="100" height="100"> 
<img src="https://th.bing.com/th/id/OIP.R1E9EGEO11Qn7XMvQjX4AAHaDt?w=339&h=174&c=7&r=0&o=5&pid=1.7" width="100" height="100">
<img src="https://www.clipartmax.com/png/small/147-1474351_javascript-icon.png" width="100" height="100">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEfZ43wDjP6ZmPt9W_rPP1dRwDqOcfv9CdArew5kywPYG-8IPKsCdU&usqp=CAU" width="100" height="100">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2Ot35ezBtUIU6VCf7q0qUniU6MLknlIjc-g&usqp=CAU" width="100" height="100">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcOTaBv6Pk2ej7l71iPB2LlwzfUofio8qRL-O0rJrsDQ&s" width="100" height="100">
<img src="https://miro.medium.com/max/1400/1*_SmZzhgGpZ5tHeUM8toUWQ.jpeg" width="100" height="100">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLHEUJTRdLY3ZoTgdflYcNNNVxjvbgHauq6w&usqp=CAU" width="100" height="100">
<!-- Add the remaining technology we would like to note was used -->


## Contribution :
- Amauri Rodriguez - Home Page and Chat Page (structure, style, and functionality)
- Hailey Loechler - Assessments Page (structure, style, and functionality)
- Shayna Murphy - Profile Page (structure, style, and functionality)
- Alison Paia - Login Page (structure, style, and functionality)

## Source :
<!-- - github_link
- deployed link -->
