import React, {useState, useEffect, useContext} from "react";
import { useParams, Link } from "react-router-dom";
import { userContext } from "../../utils/Context.js";
//components
import Container from '../Container';
import Row from '../Row';
import Col from '../Col';
//style
import "./style.css"

import API from "../../utils/API.js";
import { get } from "mongoose";

const axios = require('axios');

function ShelfDetail(props) {
    const [currentUser, setCurrentUser] = useContext(userContext);

    //store search results
    const [booksArray, setBooksArray] = useState([])

    const [currentShelf, setCurrentShelf] = useState('no shelf');
    const {id}=useParams();

    //scroll page to top
    useEffect(() => {
        window.scrollTo(0, 0);
        setBooksArray([]);
        console.log('re rendering use effect')
        if(currentUser.shelves){
            const getShelf = currentUser.shelves.find(item => item._id === id);
            console.log(getShelf._id);
            setCurrentShelf(getShelf);
            //api call here
            API.getShelfInfo({id:getShelf._id}).then((res)=>{
                setBooksArray(res.data);
                console.log(res.data)
            });
        }
      }, [id, currentUser]);

      function handleRemove(e){
          e.preventDefault();
          API.removeBook(
              {
                  bookid: e.target.getAttribute("data-bookid"),
                  shelfid: e.target.getAttribute("data-shelfid")
                }).then((res)=>{
                    console.log(res);
                    window.location.reload();
                })
      }
      

  return (
    <Container>
            <h1>{currentShelf.name}</h1> 
            <Row>
                {booksArray.length>0 ? booksArray.map((book,index)=>(
                    <Col key={index} size='sm-3'>
                        <div className='book-preview'>
                            <img src={book.thumbnail} alt={`${book.title} cover.`} className='book-thumbnail'></img>
                            <h4>{book.title}</h4>
                            <p>{book.author}</p>
                            <button className='remove-btn' onClick={handleRemove} data-bookid={book.googleId} data-shelfid={currentShelf._id}><i className="far fa-times-circle"></i> Remove from shelf</button>
                        </div>
                    </Col>
                )) :
                <p>Looks like you don't have any books in  this shelf! <Link to='discover' className='link'>Find some books to add.</Link></p>}
            </Row>
    </Container>
    );
}

export default ShelfDetail;