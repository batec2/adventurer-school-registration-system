# Adventurer Registration App

## Deployed Page Link

<a>https://batec2.github.io/adventurer-school-registration-system/</a>

## Installation

```
cd back-end
npm i
npm run dev
```

```
cd front-end
npm i
npm run dev
```

```
- Create database
- Create collections named courses and students in mongodb
Import data from dataset\courses.json and dataset\students.json
into mondodb using compass or mongosh
```

## .env

Required in back-end root

```
for local:
comment out: atlas url in back-end\database\ConnectDatabase.js
and replace with
const url = `mongodb://127.0.0.1:27017/${process.env.DB_NAME} `;
```

```
For atlas:
DB_NAME="Your DB name"
DB_USER="Your Username"
DB_PASS="Your Pass Word"
```

## Architecture

### Frontend:

- React w/ github pages
- Axios to send requests

### Backend:

- Nodejs w/ render
- Mongoose to query the database

### Database:

- MongoDb w/ atlas

### Connections

Front-end sends axios requests to the Nodejs api to get data, the backend then sends a query to through mongoose
the database where depending on the result, it will send a response back to the front-end.

## Database Schema

Courses:

```
{
  courseSymbol: { type: String, required: true },
  courseNumber: { type: String, required: true },
  startTime: Number,
  description: String,
  teacher: {
    firstName: String,
    lastName: String,
  },
  capacity: Number,
  students: [
    {
      type: ObjectId,
      ref: "students",
    },
  ],
};
```

Students:

```
{
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  age: Number,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
    },
  ],
}
```

## Links to assets used

<a href="https://world-of-babel.fandom.com/wiki/Etera%27s_Adventuring_Guild?file=Guild.jpg">Background</a>
<a href="https://inkarnate.com/m/VXK2EO--quest-board/">List Background</a>
<a href="https://www.fontspace.com/shine-typewriter-font-f86822">Font</a>
