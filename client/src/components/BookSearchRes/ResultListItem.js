import React from "react";
//components
import Row from '../Row';
import Col from '../Col';
import { Thumbnail } from "./Thumbnail";
import { Snippet } from "./Snippet";
//style
import './style.css'

export function ResultListItem(props) {
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
      </Row>
    </div>
  );
}