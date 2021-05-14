import React, {useState, useEffect, useContext} from "react";
import { userContext } from "../../utils/Context.js";
import { Link, useHistory } from "react-router-dom";
//basic layout components
import Col from "../../components/Col";
import Container from "../../components/Container";
import Row from "../../components/Row";
// other components
import { Input, FormBtn } from "../../components/Form";
//import front end api
import API from "../../utils/API"
import '../style.css'

function Login(){
    const [currentUser, setCurrentUser] = useContext(userContext);
    let history = useHistory();

    const [formObject, setFormObject] = useState({
        email: "",
        password: ""
      })

    //scroll page to top
    useEffect(() => {
        window.scrollTo(0, 0)
      }, []);

    //on change handler
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value.trim()})
    };

    // on submit handler
    function handleFormSubmit(e) {
        e.preventDefault();
        if(formObject.email && formObject.password) {
            //check credentials here, then set form object to blank
            API.userLogin({
                email: formObject.email,
                password: formObject.password
              })
              .then((res) => {

                if(res.status === 200){
                    //console.log(res);
                    const reqId = res.data.id //this returns the right object
                    const currentuser=res.data;
                    API.userShelves({id:reqId}).then((resshelves)=> {
                        //console.log('front end shelves: ' + resshelves.data)
                        currentuser.shelves=resshelves.data
                    }).then(()=>{
                        setCurrentUser(currentuser);
                        history.push("/discover");
                    })
                } else {
                    alert('Incorrect email or password');
                    setFormObject({
                        email: '',
                        password: ''
                    })
                }
            })
                .catch(err => console.log(err));
           
        } 
    }
    
    return (
        <Container>
            <Row>
                <Col size='sm-6'>
                    <div className='tall-text-container d-flex flex-column justify-content-center'>
                        <h1>Log into your account:</h1>
                        <form>
                            <Input
                                onChange={handleInputChange}
                                name="email"
                                label="Email"
                                placeholder="Email (required)"
                                value={formObject.email}
                            />
                            <Input
                                onChange={handleInputChange}
                                name="password"
                                label="Password"
                                placeholder="Password (required)"
                                value={formObject.password}
                            />
                            <FormBtn
                                disabled={!(formObject.email && formObject.password)}
                                onClick={handleFormSubmit}
                            >
                            Log in
                            </FormBtn>
                        </form>
                        <p className='login-alternative'>Don't have an account yet? <Link to="/signup">Sign up now</Link>.</p>
                    </div>
                </Col>
                <Col size='sm-6'>
                    <div className='d-flex justify-content-center align-items-center' style={{height:'100%'}}>
                        <img src='./images/login-page-04.svg' alt='cartoon book characters' className='book-stack'></img>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;