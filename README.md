# w9999gold.com

This is is README of this project.

Explanatory of this project and plan will be revealed below.

# Name and categories

w9999gold is composited by many Apps.

- General 
  1. Comp - NavBar
  2. Comp - Footer

- AppHome
  1. Comp - MetaPost

- AppProduct
  1. Product Categories
  2. Product Requirement Form (will generate total price)
  3. Product Viewer (It is a canvas)

- AppMarket
  1. Comp - Chart
  2. Price(Public future and exchange rate API)

- AppAbout
  1. Comp - Article


## note

In this project frontend and backend are put all together.
Everything in folder `src/` are sorce code of react-app, wharae every files in root directory are backend part.
The frontend part needed to be built before deploy.
Backend part will start a nginx engine in charge of responding and receving http request.
Backend will only respond built frontend in folder `build/`.
To use node package like this way. 
We can serve both frontend and backend on the same server.

