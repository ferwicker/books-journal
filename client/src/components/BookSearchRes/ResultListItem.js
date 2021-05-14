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
          <Col size='sm-2'>
            {props.title} 
            {props.author}
          </Col>
          <Col size='sm-6'>
            <Snippet
              snippet={props.snippet}
            />
          </Col>
          <Col size='sm-2'>
            <div className="dropdown">
              <button className=" dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown button
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>
            <SaveBtn 
              data-bookid= {props.bookId}
              onClick= {props.onClick}
            />
          </Col>
      </Row>
    </div>
  );
}