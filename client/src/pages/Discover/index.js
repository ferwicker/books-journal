import React, {useState, useEffect, useContext} from "react";
import { userContext } from "../../utils/Context.js";
//basic layout components
//import Col from "../../components/Col";
import Container from "../../components/Container";
import Row from "../../components/Row";
// other components
import { Input, SearchBtn } from "../../components/Form";
import { ResultListItem } from "../../components/BookSearchRes";
import API from "../../utils/API.js";

const axios = require('axios');

function Discover(){
    const [currentUser, setCurrentUser] = useContext(userContext);
    //set state for search terms
    const [formObject, setFormObject] = useState({
        search: "",
        param: ""
      })

    //store search results
    const [booksArray, setBooksArray] = useState([])

    //scroll page to top
    useEffect(() => {
        window.scrollTo(0, 0);
        setBooksArray([]);
        console.log(currentUser);
      }, []);

      //handle change
      function handleSearchChange (event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
      }

      //handle submit
      function handleFormSubmit (e) {
        e.preventDefault();
        if(formObject.search !== '') {
            //call the API with the search parameter
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${formObject.search}`).then(resp => {
                console.log(resp.data.items);
                setBooksArray(resp.data.items);
                setFormObject({
                    search: "",
                    param: "" 
                })
            });
        }
    }

      //handle save button
      function handleSaveBtn (e) {
        e.preventDefault();
        const shelfId = e.target.getAttribute("data-shelfid") || ''; 
        const bookId = e.target.getAttribute("data-bookid");
        const index = e.target.getAttribute("data-index");

        if(shelfId === ''){
            alert('Please select a shelf to save to!')
        } else {
            API.saveBook({
                shelf: shelfId,
                book: bookId
            }).then((res)=>{
                console.log(res);
                if(res.data === 'already in shelf'){
                    alert('This book is already saved to this shelf')
                } else {
                    const thisshelf = currentUser.shelves.find(item => item._id === shelfId);
                    thisshelf.books.push(bookId);
                    API.saveShelfToBook({
                        shelf: shelfId,
                        book: bookId,
                        title:booksArray[index].volumeInfo.title,
                        author:booksArray[index].volumeInfo.authors[0],
                        thumbnail:booksArray[index].volumeInfo.imageLinks.smallThumbnail || '',
                        snippet:booksArray[index].searchInfo.textSnippet || 'no description available'
                    }).then(()=>{
                        console.log('book saved! Shelf: ' + shelfId + ' Book: ' + bookId);
                        //need to let user know somehow
                    }).catch((bookerr)=>console.log(bookerr))
                }
            }).catch((err)=>console.log(err))
        }
      }
    
    return (
        <Container>
            <Row>
                <div className='page-top'>
                    <h1>Discover Your Next Favourite Read</h1>
                    <form className='d-sm-flex align-items-center search-form' onSubmit={handleFormSubmit}>
                        <Input
                            className='search-input'
                            onChange={handleSearchChange}
                            name="search"
                            placeholder="Search"
                            value={formObject.search}
                        />
                        <SearchBtn
                        disabled={!(formObject.search)}
                        onClick={handleFormSubmit}>
                            Search
                        </SearchBtn>
                    </form>
                </div>
            </Row>
            {booksArray.length > 0 ? booksArray.map((book,index)=>(
                <ResultListItem 
                    key={book.id}
                    index={index}
                    bookId={book.id}
                    title={book.volumeInfo.title}
                    author={book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'no author'}
                    snippet={book.searchInfo ? book.searchInfo.textSnippet : 'no description available'} 
                    thumbnail={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : ''}
                    shelves={currentUser.shelves}
                    onClick={handleSaveBtn}
                />
            )) : <h2>Whoops! No results to show.</h2>}
        </Container>
    );
}

export default Discover;