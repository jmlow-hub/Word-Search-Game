# Wor-l-d Search Game

This is my second javascript project I developed as a trainee with _nology. We were given free-reign to come up with an idea for a game and as I've alwasy enjoyed word games I decided to create a word search game.

I decided to use an API to generate the words and settled on an RESTful API, restcountries.eu, as it returned the right kind of data to allow me to select multiple words. In order to make the game I would need four key actions:
1. generate a list of country names from the API between 3 and 6 letters (to fit comfortably in a grid)
2. dynamically create a grid when the game is started
3. populate the grid with the list of words and then fill in the spaces
4. enable letters to be selected and either a right or wrong response returned

By far the biggest challenge was to place the words in the grid. I set up a loop which created a 15 x 15 grid in html each with an unique id so that I could target that id to place the words. Then, using a random number function I generated a random number based on the id and could loop over the letters and place them in the grid sequentially. 
To solve the problem of selecting the same square twice with the random function I came up with the idea of pre-planning the grid layout - that way I could define where words would be placed without overlap. The starting id's were placed in an array and I amended the random number function to pick from that array and then remove the selected id to avoid duplication.

Using a pre-defined layout gives me the ability for future versions to change-up the layout by changing the starting id's in the grid. Give it a go, I hope you enjoy!

Visit the live site here: https://jmlow-hub.github.io/Word-Search-Game/
