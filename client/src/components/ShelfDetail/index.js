import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../../utils/Context.js";
//components
import Container from '../Container';
import Row from '../Row';
import Col from '../Col';
//style
import "./style.css"

import API from "../../utils/API.js";

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
            console.log(getShelf.books);
            setCurrentShelf(getShelf);
            setBooksArray(getShelf.books);
        }
      }, [id, currentUser]);

      //this is not running
      

  return (
    <Container>
            <h1>{currentShelf.name}</h1> 
            <Row>
                {booksArray.map((book,index)=>(
                    <Col key={index} size='sm-3'>
                        <div className='book-preview'>
                            <h4>{book}</h4>
                        </div>
                    </Col>
                ))}
            </Row>
    </Container>
    );
}

export default ShelfDetail;