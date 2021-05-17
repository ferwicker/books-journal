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
  const [selectShelf, setSelectShelf] = useState();
  const selectEl = document.querySelector('#select-shelf');

  function HandleShelfChange (e){
    const {value} = e.target;
    setSelectShelf(value);
  }
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
            <select id='select-shelf' className="form-select select-shelf" aria-label="Shelf select" onChange={HandleShelfChange}>
              <option>Select a shelf</option>
              {props.shelves.map((shelf, index)=>
                <option key={index} value={shelf._id}>{shelf.name}</option>
              )}
            </select>
            <SaveBtn 
              className='save-btn'
              data-bookid= {props.bookId}
              data-shelfid={selectShelf}
              data-index={props.index}
              onClick= {props.onClick}
            />
          </Col>
      </Row>
    </div>
  );
}