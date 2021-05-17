# ♾️TBR
logo

Infinite TBR is a web app that helps users manage their personal libraries. Created with avid readers in mind, the app aims to create a simple user friendly experience in a modern app. Currently a library management app, the aim is to in the near future add a social interaction element to it.

### [See deployed app.](https://blooming-falls-68032.herokuapp.com/)

## Table of contents
  - [Built with](#built-with)
  - [Motivation](#motivation)
  - [Process](#process)
  - [Features](#features)
  - [Roadmap](#roadmap)
  - [Credits](#credits)

## Built With

- React
- Bootstrap
- MongoDB
- Node
- Express
- Passport
- react-router-dom
- styled-components
- react-animations

## Motivation
As an avid reader, I have been a Goodreads user for years. While the app does reasonably well in some areas, and has some pretty cool features (such as the ability to use the camera to scan a book to search its info), it has some major pain points that have not been addressed in years.

### **Goodreads pain points**
The main pain points for Goodreads users identified are:
- *Shelves*: Goodreads has three default shelves: Want to Read, Read and Currently Reading. That's it. Users can create custom shelves, but for a book to be saved to them , it first needs to be saved to one of the three 'base' bookshelves. This is truly a pain and it makes management of large collections convoluted and complicated.
- *Groups*: Goodreads groups remind me of forums my mum used to frequent in the nineties, on our big old desktop in 'the computer room'. Yes, we're that old folks... Jokes aside, this is a major pain point.
- *UI*: Goodreads's UI looks like it has not had a major update since the oughts. It is DULL and crowded. The mobile app UI is somewhat better, they've removed much of the useless functionalities, but it is still quite outdated.

### Alternatives to Goodreads
- *Storygraph*: a nice alternative that focuses on tailored book recommendations. It encourages users to import their Goodreads data. It uses user generated 'mood' tags to help readers choose books. The UI is very simple, a bit too much so, and it is not the simplest to use. It also has 4 'base' shelves (they've added a 'did-not-finish' shelf to Goodreads base shelves). The review 'form' is very detailed, but that also makes it overwhelming. 
- *Bookly*: this is a more 'playful' kind of platform, focusing on a cartoon 'assistant', daily reading goals, and stats. It has a LOT of paid only features. On the bright side, it allows you to add shelves or 'collections' freely.
- *BookSloth*:

## Process
As a designer, I usually start planning my projects and find inspiration in working on the UI design first. This app was different. The back/front end functionality took centre stage and was the first priority for development. Once the basics were underway, the look and feel (kept as simple as possible) was added and coded into the app.

### Research
Research included making accounts at the above Goodreads alternatives and exploring their functionalities.
I also made a post on a Facebook group for readers called Page Turners (over 16k members), asking for everyone's pain points with Goodreads, which is by far the most used book management app used.

Answers included the UI (dark mode was one of the requests), how antiquated and hard to use Groups are, request for search filters and half-star ratings, private notes, searching books by tags, etc.

Some of these answers have been taken into account and will be incorporated into the app.

### Challenges
User authentication with Passport was one of the main challenges of building this app. 
Other challenges included re rendering mapped lists and complex api routes.

### Wins
Small wins but nevertheless important! The real time update of the shelves in the nav when a new shelf is created, and the re-rendering of the book list in a shelf when a book is removed. 

## Features
- User authentication with Passport and bcrypt
- Basic shelves are created and assigned to the user on sign-up
- Database management with MongoDB
- Conditional rendering for logged in and not logged in users
- Book search from Google Books API
- Saving books to your shelves
- Creating new shelves
- Removing books from shelves
- Seeing all books in a shelf

## Roadmap
### Short Term
- Improving alerts for success/errors in the authentication section
- Improving alerts for success/error when saving a book
- The ability to save a book to another shelf from the 'shelf detail' page
- Editing and removing shelves

### Long Term
- Adding the 'social' element to the app:
  - Allowing users to add their information to their profile
  - Users can tag books, and search and find books by tag
  - Users can review books, reviews are available to all
  - Users have a private 'reading journal' to make notes related to books
  - Users can follow other users and see their public reviews and shelves

## Credits
- All icons from Fontawesome
- Fonts from Adobe Fonts
- Illustrations from Shutterstock
