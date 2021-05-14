import React, {useState, useEffect, useContext} from "react";
//import { userContext } from "../../utils/Context.js";
//components
import Row from '../Row';
import Col from '../Col';
import { Thumbnail } from "./Thumbnail";
import { Snippet } from "./Snippet";
import { SaveBtn } from "./SaveBtn";
//style
import './style.css'

export function ResultListItem(props) {
  //const [currentUser, setCurrentUser] = useContext(userContext);

  return (
    <div className='container-fluid list-item'>
      <Row>
          <Col size='sm-2'>
            <Thumbnail
              alt={props.title}
              src={props.thumbnail}
            />
          </Col>
          <Col size='sm-3'>
            <h4>{props.title}</h4>
            <p>{props.author}</p>
          </Col>
          <Col size='sm-5'>
            <Snippet
              snippet={props.snippet}
            />
          </Col>
          <Col size='sm-2'>
            <select className="form-select select-shelf" aria-label="Default select example">
              <option value="shelfid">Wishlist</option>
              <option value="shelfid">Books I own</option>
              <option value="2">TBR</option>
              <option value="3">All time faves</option>
            </select>
            <SaveBtn 
              className='save-btn'
              data-bookid= {props.bookId}
              onClick= {props.onClick}
            />
          </Col>
      </Row>
    </div>
  );
}