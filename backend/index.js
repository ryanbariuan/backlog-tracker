const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const User = require('./models/User.js');
const Game = require('./models/Game.js');
const Platform = require('./models/Platform.js');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/backlogtrackerdb',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());
app.use(bodyParser.json());


// --- User Registration ---
app.post('/register', (req, res) => {

  User.findOne({username: req.body.username}).then(account =>{
    if(account)
    {
      res.send({error: 'Username already exist'});
    }
    else
    {
      User.findOne({email: req.body.email}).then(emailAdd =>{
        if(emailAdd)
        {
          res.send({error: 'Email Address already exist'});
        }
        else
        {
          bcrypt.hash(req.body.password, 10).then(hashedPW => {
            let newUser = new User();
            newUser.username = req.body.username;
            newUser.password = hashedPW;
            newUser.email = req.body.email;
            newUser.save().then(data => {
              res.send(data);
            });
          });
        }
      });      
    }
  });
});

// --- User Login ---
app.post('/login', (req, res) => {
  User.findOne({username: req.body.username}).then(user =>{
    if(user)
    {
      bcrypt.compare(req.body.password, user.password).then(match =>{
        if(match)
        {
          res.send(user);
        }
        else
        {
          res.send({error: 'invalid username/password'});
        }
      });
    }
    else
    {
      res.send({error: 'invalid username/password'});
    }
  });
});


// check if object existing in array
function objectInArrayList(myObject, list)
{
  return list.some((collectionList) =>{
    return (myObject.game === collectionList.game && myObject.platform === collectionList.platform);
  });
}


// --- Add a game on user account game collection ---

app.post('/profile/addgame', (req, res) =>{
  User.findOne({username: req.body.userLogged}).then(user =>{
    let newAddGame = {
      game: req.body.game,
      platform: req.body.platform,
      ownership: req.body.ownership,
      status: req.body.status,
      boxart: req.body.boxart,
      progressnotes: [],
    };

    let getGameAndPlatformOnly = user.mygames.map(myCollection => {
      return({game: myCollection.game, platform: myCollection.platform});
    });

    if(!objectInArrayList({game: req.body.game, platform: req.body.platform}, getGameAndPlatformOnly))
    {
      user.mygames.push(newAddGame);
      user.save().then(user =>{
        
        Game.findOne({game: req.body.game}).then(gameDetails =>{
            if(!gameDetails)
            {
              let newGameEntry = new Game();
              newGameEntry.game = req.body.game;
              newGameEntry.platform = req.body.platform;
              newGameEntry.boxart = req.body.boxart;
              newGameEntry.gamereviews = [];

              newGameEntry.save();
            }
            else
            {
              Game.findByIdAndUpdate({_id: gameDetails._id}, req.body, {
                useFindAndModify: false
              }).then(gameSaved =>{
                gameSaved.boxart = req.body.boxart;
                gameSaved.save();
              });
            }
        });

        Platform.findOne({platform: req.body.platform}).then(pf =>{
           let getGameNameOnly = pf.games.map(gameItem =>{
              return gameItem.game;
           });
  
          if(!getGameNameOnly.includes(req.body.game))
          {
            let gameAddToPlatform = {
              game: req.body.game
            }
  
            pf.games.push(gameAddToPlatform);
            pf.save().then(pform => {
              res.send({user, pform});
            });
          }
          else
          {
            res.send({user});
          }
        });
        


      });
    }
    else
    {
      res.send({error: `You already owned the game in this platform: ${req.body.platform}`})
    }
    
  }); 
});

// --- Add Platform/Video Game Console
app.post('/profile/addplatform', (req, res) =>{
  Platform.findOne({platform: req.body.platform}).then(pf =>{
    if(pf)
    {
      res.send({error: 'Platform Already Exist'});
    }
    else
    {
      let platformEntry = new Platform();
      platformEntry.platform = req.body.platform;
      platformEntry.games = [];  
      platformEntry.save().then(newpf =>{
        res.send(newpf);
      });
    }
  });
});

// --- Load all platform details
app.get('/profile', (req, res) =>{
  Platform.find().then(data => res.send(data));
});

// --- Update user collection when a game is deleted

app.put('/profile/mygames/delete/:_id', (req,res) =>{
  User.findById(req.body._id).then(userDetails =>{
     userDetails.mygames = userDetails.mygames.filter(gameColl => {
      return(
        gameColl._id.toString() !== req.params._id
      );
    });
    userDetails.save();
    res.send(userDetails);
  })

});

// --- Update game details of user in their collection

app.put('/profile/mygames/update/:_id', (req,res) =>{
  User.findByIdAndUpdate({_id: req.body.userLogged}, req.body, {
    useFindAndModify: false
  }).then(user =>{
    
    let myColl = user.mygames.map(games =>{
      return(games);
    });

    let index = myColl.findIndex(i => i._id.toString() === req.params._id);

    let updates = {
      _id: req.params._id,
      game: req.body.game,
      platform: req.body.platform,
      ownership: req.body.ownership,
      status: req.body.status,
      boxart: req.body.boxart,
      progressnotes: user.mygames[index].progressnotes
    };

    user.mygames[index] = updates;
    user.save().then(data =>{
      res.send(data);
    });

    //updates boxart on Game collection/records when user updates boxart on his/her own collection
    Game.findOne({game: req.body.game}).then(gameDetails =>{
      Game.findByIdAndUpdate({_id: gameDetails._id}, req.body, {
        useFindAndModify: false
      }).then(gameSaved =>{
        gameSaved.boxart = req.body.boxart;
        gameSaved.save();
      });
    });


  });
});

// --- updates progressnotes on Game collection
app.put('/profile/mygames/:_id/addnotes', (req,res) =>{

  User.findByIdAndUpdate({_id: req.body.userLogged}, req.body, {
    useFindAndModify: false
  }).then(user =>{
    let myColl = user.mygames.map(games =>{
      return(games);
    });
    let index = myColl.findIndex(i => i._id.toString() === req.params._id);

    let desc = { description: req.body.description};
    user.mygames[index].progressnotes.push(desc);
    user.save().then(data =>{
      res.send(data);
    });
  });
});

// --- Delete progressnotes on Game collection
app.put('/profile/mygames/:game_id/deletenotes/:_id', (req,res) =>{

  User.findByIdAndUpdate({_id: req.body.userLogged}, req.body,{
    useFindAndModify: false
  }).then(user =>{
    let myColl = user.mygames.map(games =>{
      return(games);
    });
    let index = myColl.findIndex(i => i._id.toString() === req.params.game_id);
    user.mygames[index].progressnotes = user.mygames[index].progressnotes.filter(notes => {
      return(
        notes._id.toString() !== req.params._id
      );
    });
    user.save().then(data =>{
      res.send(data);
    });

  });

});



// Load consoles platform in Games Component
app.get('/games', (req, res) =>{
  Platform.find().then(pfdata => {
    // Load All games in Games Component
    Game.find().then(gamedata => {
      res.send({pfdata, gamedata}) //send both query result
    });
  });
});





app.listen(port, () => {
  console.log(`Backend App backlogtracker is running on port ${port}`);
});

