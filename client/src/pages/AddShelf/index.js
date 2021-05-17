import React, {useState, useEffect, useContext} from "react";
import { userContext } from "../../utils/Context.js";
import { Link  } from "react-router-dom";
//basic layout components
import Col from "../../components/Col";
import Container from "../../components/Container";
import Row from "../../components/Row";
// other components
import { Input, FormBtn } from "../../components/Form";
//import front end api
import API from "../../utils/API"
import '../style.css'

function AddShelf(){
    const [currentUser, setCurrentUser] = useContext(userContext);
    const [shelfAdded, setShelfAdded] = useState(false);
    //add a state for conditional rendering if the new shelf has been added or not

    const [formObject, setFormObject] = useState({
        shelfname: ""
      })

    //scroll page to top
    useEffect(() => {
        window.scrollTo(0, 0)
        setShelfAdded(false);
      }, []);

    //on change handler
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value.trim()})
    };

    // on submit handler
    function handleFormSubmit(e) {
        e.preventDefault();
        if(formObject.shelfname) {
            //to add shelf
            API.createShelf({
                name: formObject.shelfname,
                user: currentUser.id
              })
              .then((res) => {
                if(res.status === 200){
                    console.log(res.data._id);
                    //add shelf to user in current user context
                    setCurrentUser({
                        id: currentUser.id,
                        shelves:[...currentUser.shelves, res.data],
                        username: currentUser.username
                    });
                    setFormObject({
                        shelfname: ''
                    })
                    setShelfAdded(true);
                } else {
                    alert('There was an error adding the shelf!');
                }
            }).then(()=>{console.log(currentUser.shelves)})
                .catch(err => console.log(err));
           
        } 
    }
    
    return (
        <Container>
            <Row>
                <Col size='sm-6'>
                    <div className='tall-text-container d-flex flex-column justify-content-center'>
                        <h1>Add a new shelf to your collection:</h1>
                        <form>
                            <Input
                                onChange={handleInputChange}
                                name="shelfname"
                                label="Shelf Name"
                                placeholder="Name your shelf"
                                value={formObject.shelfname}
                            />
                            <FormBtn
                                disabled={!(formObject.shelfname)}
                                onClick={handleFormSubmit}
                            >
                            Create Shelf
                            </FormBtn>
                        </form>
                        {shelfAdded ? 
                            <div className='success'>Hooray! Your new shelf has been added to your collection. <Link to='/discover'>Add some books.</Link>
                            </div> : ''}
                    </div>
                </Col>
                <Col size='sm-6'>
                    <div className='d-flex justify-content-center align-items-center' style={{height:'100%'}}>
                        <img src='./images/new-shelf.svg' alt='add a new shelf' className='book-stack'></img>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AddShelf;