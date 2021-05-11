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

function SignUp(){
    let history = useHistory();

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
        if(formObject.email && formObject.password && formObject.username) {
            //api call here, then set form object to blank
            API.userSignup({
                email: formObject.email,
                username: formObject.username,
                password: formObject.password
              })
                .then((res) => {

                if(res.status === 200){
                    history.push("/discover");
                }
            })
                .catch(err => console.log(err));
        
        }
    }
    
    return (
        <Container>
            <h1>Sign Up Page</h1>
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

            </form>
        </Container>
    );
}

export default SignUp;