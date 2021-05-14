import React, {useState, useEffect, useContext} from "react";
import { userContext } from "../../utils/Context.js";
//basic layout components
import Col from "../../components/Col";
import Container from "../../components/Container";
import Row from "../../components/Row";
// other components
import { Input, FormBtn } from "../../components/Form";
import { ResultListItem, Thumbnail } from "../../components/BookSearchRes";

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
                console.log(resp.data.items[0].volumeInfo.title);
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
        const userId = currentUser.id;
        console.log('book saved! User: ' + userId);
      }
    
    return (
        <Container>
            <Row>
                <h1>Discover Page</h1>
                <form onSubmit={handleFormSubmit}>
                    <Input
                        onChange={handleSearchChange}
                        name="search"
                        placeholder="Search"
                        value={formObject.search}
                    />
                    <FormBtn
                    disabled={!(formObject.search)}
                    onClick={handleFormSubmit}>
                        Search
                    </FormBtn>
                </form>
            </Row>
            {booksArray.length > 0 ? booksArray.map((book,index)=>(
                <ResultListItem 
                    key={book.id}
                    bookId={book.id}
                    title={book.volumeInfo.title}
                    author={book.volumeInfo.authors[0]}
                    snippet={book.searchInfo ? book.searchInfo.textSnippet : 'no description available'} 
                    thumbnail={book.volumeInfo.imageLinks.smallThumbnail}
                    onClick={handleSaveBtn}
                />
            )) : <h2>no results to show</h2>}
        </Container>
    );
}

export default Discover;