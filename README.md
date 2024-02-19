# Adventurer Registration App

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

### Backend:

- Nodejs w/ render

### Database:

- MongoDb w/ mongoose

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
