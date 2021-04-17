let user;
let accountDetails;
let mySystem;
let backlogGames;
let backlogPF;
let beatenGames;
let beatenPF;
let completeGames;
let completePF;
let backendURL = 'https://backlogtracker-backend-01.herokuapp.com';

if (localStorage.getItem('user'))
{
  user = JSON.parse(localStorage.getItem('user'));
  accountDetails = JSON.parse(localStorage.getItem('accountDetails'));
  mySystem = JSON.parse(localStorage.getItem('mySystem'));
  backlogGames = JSON.parse(localStorage.getItem('backlogGames'));
  backlogPF = JSON.parse(localStorage.getItem('backlogPF'));
  beatenGames = JSON.parse(localStorage.getItem('beatenGames'));
  beatenPF = JSON.parse(localStorage.getItem('beatenPF'));
  completeGames = JSON.parse(localStorage.getItem('completeGames'));
  completePF = JSON.parse(localStorage.getItem('completePF'));
}
else
{
  user = null;
  accountDetails = null;
  mySystem = [];
  backlogGames = [];
  backlogPF = [];
  beatenGames = [];
  beatenPF = [];
  completeGames = [];
  completePF = [];
}

const initialState = {
  user: user,
  acc: accountDetails,
  allPlatforms: [],
  myPlatforms: mySystem,
  myBacklogPF: backlogPF,
  myBeatenPF: beatenPF,
  myCompletedPF: completePF,
  myBacklogGames: backlogGames,
  myBeatenGames: beatenGames,
  myCompletedGames: completeGames,
  allGames: [],
  backend: backendURL
};

function removeDuplicates(list)
{
  let uniqueOutput = [];
  list.forEach(el =>{
    if(!uniqueOutput.includes(el))
    {
      uniqueOutput.push(el);
    }
  });
  return uniqueOutput;
}


const reducer = (state = initialState, action) =>
{
  if(action.type === 'LOGIN')
  {
    console.log(action);
    localStorage.setItem('user', JSON.stringify(action.payload));
    return{
      ...state,
      user: action.payload,
    };
  }
  if(action.type === 'LOGOUT')
  {
    //console.log(`you are logged out`);
    localStorage.removeItem('user');
    localStorage.removeItem('accountDetails');
    localStorage.removeItem('mySystem');
    localStorage.removeItem('backlogGames');
    localStorage.removeItem('backlogPF');
    localStorage.removeItem('beatenGames');
    localStorage.removeItem('beatenPF');
    localStorage.removeItem('completeGames');
    localStorage.removeItem('completePF');

    return{
      ...state,
      user: null,
      acc: null,
      myPlatforms: [],
      myBacklogPF: [],
      myBeatenPF: [],
      myCompletedPF: [],
      myBacklogGames: [],
      myBeatenGames: [],
      myCompletedGames: [],
    };
  }
  if(action.type === 'LOAD_INFO')
  {
    localStorage.setItem('accountDetails', JSON.stringify(action.payload));

    let myGamesList = action.payload.mygames.map(games => {
      return(games.platform);
    });
    localStorage.setItem('mySystem', JSON.stringify(removeDuplicates(myGamesList)));

    let myBacklog = action.payload.mygames.filter(games => {
      return(games.status === "Backlog/Unfinished");
    });
    localStorage.setItem('backlogGames', JSON.stringify(myBacklog));

    let myBacklogPlatforms = myBacklog.map(games =>{
      return(games.platform);
    });
    localStorage.setItem('backlogPF', JSON.stringify(removeDuplicates(myBacklogPlatforms)));

    let myBeaten = action.payload.mygames.filter(games => {
      return(games.status === "Beaten/Finished");
    });
    localStorage.setItem('beatenGames', JSON.stringify(myBeaten));

    let myBeatenPlatforms = myBeaten.map(games =>{
      return(games.platform);
    });
    localStorage.setItem('beatenPF', JSON.stringify(removeDuplicates(myBeatenPlatforms)));

    let myCompleted = action.payload.mygames.filter(games => {
      return(games.status === "Completed");
    });
    localStorage.setItem('completeGames', JSON.stringify(myCompleted));

    let myCompletedPlatforms = myCompleted.map(games =>{
      return(games.platform);
    });
    localStorage.setItem('completePF', JSON.stringify(removeDuplicates(myCompletedPlatforms)));

    
    return{
      ...state,
      acc: action.payload,
      myPlatforms: removeDuplicates(myGamesList),
      myBacklogPF: removeDuplicates(myBacklogPlatforms),
      myBeatenPF: removeDuplicates(myBeatenPlatforms),
      myCompletedPF: removeDuplicates(myCompletedPlatforms),
      myBacklogGames: myBacklog,
      myBeatenGames: myBeaten,
      myCompletedGames: myCompleted,
    };
  }
  if(action.type === 'LOAD_PLATFORM')
  {
    return{
      ...state,
      allPlatforms: action.payload
    }
  }
 
  else
  {
    return state;
  }
};

export default reducer;

