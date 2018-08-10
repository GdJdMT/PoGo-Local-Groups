Pokémon Go Local Groups 
=======================

This simple app helps local groups collect trainers' names, codes and nearby gyms.

Working demo at [https://volcano-okapi.glitch.me/](https://volcano-okapi.glitch.me/).

## Getting Started

### Prerequisites

You'll need Node 8.x and a mongoDB database.

### Installing

```
$ git clone https://github.com/GdJdMT/PoGo-Local-Groups.git
$ cd pokemongo
$ npm install
```
#### .env file

In the root folder create an '.env' file with these parameters.

```
DB=`standard-MongoDB-URI`
DEFCITY='default city'
CITIES=['default city','array','of','approved','cities']
```
DEFCITY is the city that will be loaded on when no path is given.

CITIES includes the local groups for which the app will actually work. For instance, if we have two local groups, one for Springfield and another for Shelbyville, we write this in our .env file:

```
DEFCITY='springfield'
CITIES=['springfield','shelbyville']
```

The app will get and post data for these groups for these urls.

```
http://localhost:3000/ // for springfield
http://localhost:3000/springfield
http://localhost:3000/shelbyville
```
The same app can manage multiple local groups as long as they are specified in env.CITIES.

For examplee, as "hogwarts" is not in env.CITIES, the following page will render, but will not work.

```
http://localhost:3000/hogwarts
```

### Running

```
$ node server.js
```

The app will run on http://localhost:3000/.

## Usage
Go to http://localhost:3000/.

### Add a trainer
Fill the form:
* Nickname (required)
* Team (required)
* Trainer code (optional)

Click submit. Done!

### Add the same trainer to another local group

Go to the local group path (for example http://localhost:3000/shelbyville).

Fill the form. If the trainer provided their code for another local group, there is no need to fill the "Trainer code field".

### Update trainer code

Fill the form using the same nickname and team provided on signup.

Add the new trainer code in the appropriate field.

### Add gyms

Logged in users can add gyms through a form.

#### Legacy
This part is quite picky, because it was a last minute addition...

There is no form to add gyms at the moment. They can be added to the database using the following **temporary** code in server.js.

```
/* CREATE AN ARRAY OF OBJECTS */
const gyms = [
  {name: 'test1', city: 'Springfield', coords ["34.01466338397385","-118.49057972431184"]},
  {name: 'test2', city: 'Shelbyville', coords:["34.01818941399172","-118.48386347293855"]}
  ...add other gyms here
];
/*INSERT IN THE DATABASE*/
Gym.insertMany(gyms, (err) => {
  if(err){throw err} else {console.log('seemsok...')};
});
```

*gyms* is an array of object with this format:
* name: (string) the name of the gym
* city: (string) the name of the city
* coords: (array of strings) the latitude and the longitude of the gym

If the local group covers more cities, you can edit the *findGyms* function in *controllers/conts.js*. 

Edit the *if* statement so that *cities* will be equal to an array of cities.

For instance, if the "Springfield local group" is also active in Shelbyville, make the variable "cities" equal to "['Sprinfield','Shelbyville']".

### Warning

The app is in a very early stage of development.

Currently the app assumes a lot of good faith from trainers, as anyone can change other trainers codes and add as many trainer as they want.

To delete a user, an admin has to delete their entry in the database.
## API

A basic, undertested API is available.

### localhost:3000/api/list?loc=city

Lists all trainers for the group "city" with name, team and trainer code, as an array of objects.

### localhost:3000/api/last?loc=city&limit=number
Lists the most recent updates (additions and edits) to the trainers database, with name, code and last modified date, as an array of objects.

The *limit* parameter defaults to 20.

### localhost:3000/api/gyms?loc=city

Lists all gyms for the group "city" (**not** the actual city), as an array of objects.

## Contributing

I am a beginner in nodeJS, so your comments and pull requests are very much welcome!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
