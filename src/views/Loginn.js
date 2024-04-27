import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

function Loginn(props) {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        isAdmin: false
    });

    const [errors, setErrors] = useState({
        emailError: "", 
        passwordError: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const emailvalidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const passwordvalidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });

        if (name === "email") {
            setErrors({
                ...errors,
                emailError: value.length === 0 ? "This field is required" : (!emailvalidation.test(value) && "Please insert a valid email")
            });
        } else if (name === "password") {
            setErrors({
                ...errors,
                passwordError: value.length === 0 ? "This field is required" : (!passwordvalidation.test(value) && "Password must be 6-20 characters long, contain at least one digit, one lowercase letter, and one uppercase letter.")
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const savedUserData = JSON.parse(localStorage.getItem("userData"));
        if((savedUserData.email === userData.email) && (savedUserData.password === userData.password)){
          props.history.push("/");
         console.log("data is submeted")
        }else{
            console.log("not valid email or password")

        }
    };

    const showpasword = () => {
        setShowPassword(!showPassword);
    };

    return (
<div className="container p-5" style={{ color: 'white' }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        className={`form-control ${errors.emailError ? "border-danger" : "border-success"}`}  
                        value={userData.email}
                        onChange={handleChange}
                        name="email"
                    />
                    {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text> */}
                    <p className="text-danger">{errors.emailError}</p> {/* Display email error */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <div className="input-group">
                        <Form.Control 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            onChange={handleChange}
                            value={userData.password} 
                            name="password"
                        />
                        <Button variant="outline-secondary" onClick={showpasword}>
                            {showPassword ? "Hide" : "Show"}
                        </Button>
                    </div>
                    <p className="text-danger">{errors.passwordError}</p> 
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button disabled={userData.email.length === 0 || userData.password.length === 0 || errors.passwordError || errors.emailError} type="submit" className="btn "  style={{ backgroundColor: 'primary', border:'none'}}>Submit</Button>
            </Form>
        </div>
    );
}

export default Loginn;
