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
//style
import '../style.css'

function SignUp(){
    let history = useHistory();

    const [currentUser, setCurrentUser] = useContext(userContext);

    const [formObject, setFormObject] = useState({
        email: "",
        username: "",
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
        //API.findEmail({email: formObject.email});
        if(formObject.email && formObject.password && formObject.username) {
            if(formObject.password.length > 7){
                API.userSignup({
                    email: formObject.email,
                    username: formObject.username,
                    password: formObject.password
                  })
                    .then((res) => {
                        if(res.data === 'email already in use'){
                            alert('that email is already being used')
                        } else if (res.data === 'username already in use') {
                            alert('that username is already being used')
                        } else if(res.status === 200){
                        //log user in here
                        API.userLogin({
                            email: formObject.email,
                            password: formObject.password
                        }).then(()=>console.log('new user logged in'));
                        //setCurrentUser(res.data);
                        const currentuser=res.data;
                        API.createDefaultShelves({id: res.data.id}).then((response)=>{
                            if(response.status === 200){
                                currentuser.shelves=response.data;
                            }
                        }).then(()=>{
                            setCurrentUser(currentuser);
                            history.push("/discover");
                          }).catch(err => console.log('Shelves Error' + err));
                    }
                })
                    .catch(err => console.log('Error' + err));
            } else {
                alert('Password must be at least 8 characters long');
                return
            }
        }
    }
    
    return (
        <Container>
            <Row>
                <Col size='sm-6'>
                    <div className='tall-text-container d-flex flex-column justify-content-center'>
                        <h1>Start you book journey today:</h1>
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
                            name="username"
                            label="Username"
                            placeholder="Username (required)"
                            value={formObject.username}
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
                            Create account
                        </FormBtn>
                        {/* <div>alert</div> */}
                        </form>
                        <p className='login-alternative'>Already have an account? <Link to="/login">Log in instead</Link>.</p>
                    </div>
                </Col>
                <Col size='sm-6'>
                    <div className='d-flex justify-content-center align-items-center' style={{height:'100%'}}>
                        <img src='./images/signup-page-05.svg' alt='girl with pile of books' className='book-stack'></img>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default SignUp;