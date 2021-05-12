import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
//basic layout components
import Col from "../../components/Col";
import Container from "../../components/Container";
import Row from "../../components/Row";
// other components
import { Input, FormBtn } from "../../components/Form";
//import front end api
import API from "../../utils/API"
import './style.css'

function Login(){
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
                    console.log(res);
                    history.push("/discover");
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
            <h1>Welcome back!</h1>
            <Row>
                <Col size='sm-6'>
                    <div className='full-height d-flex flex-column justify-content-center'>
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
                    </div>
                </Col>
                <Col size='sm-6'>

                </Col>
            </Row>
        </Container>
    );
}

export default Login;