

import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
let alert=0;
function Register() {
    const [userData, setUserData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        isAdmin: false
    });

    const [errors, setErrors] = useState({
        emailError: "", 
        usernameError: "",
        passwordError: "",
        confirmPasswordError: ""
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
        }else if (name === "confirmPassword") {
            setErrors({
                ...errors,
                confirmPasswordError: value !== userData.password ? "Passwords do not match" : ""
            });
        }
    };
    const showPasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.setItem("userData", JSON.stringify(userData));

        // Clear form fields
        setUserData({
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            isAdmin: false
        });
        alert=1;

};
React.useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
        setUserData(JSON.parse(savedUserData));
    }
}, []);

    return (
           
        <div className="container p-5"  style={{ color: ' white' }}>
            {alert === 1 && (
    <div className="alert alert-success" role="alert">
      submit is success
    </div>
)}

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
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    <p className="text-danger">{errors.emailError}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username" 
                        className={`form-control ${errors.usernameError ? "border-danger" : "border-success"}`}  
                        value={userData.username}
                        onChange={handleChange}
                        name="username"
                    />
                    <p className="text-danger">{errors.usernameError}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <div className="input-group">
                        <Form.Control 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            className={`form-control ${errors.passwordError ? "border-danger" : "border-success"}`}  
                            value={userData.password} 
                            onChange={handleChange}
                            name="password"
                        />
                        <Button variant="outline-secondary" onClick={showPasswordToggle}>
                            {showPassword ? "Hide" : "Show"}
                        </Button>
                    </div>
                    <p className="text-danger">{errors.passwordError}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Confirm Password" 
                        className={`form-control ${errors.confirmPasswordError ? "border-danger" : "border-success"}`}  
                        value={userData.confirmPassword} 
                        onChange={handleChange}
                        name="confirmPassword"
                    />
                    <p className="text-danger">{errors.confirmPasswordError}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button disabled={Object.values(userData).some(value => value.length === 0) || Object.values(errors).some(error => error)} type="submit" className="btn "  style={{ backgroundColor: ' black', border:'none'}}>Submit</Button>
            </Form>
           
        </div>

);
}

export default Register;

