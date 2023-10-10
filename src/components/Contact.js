import { useState } from "react"
import { Container, Row } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import { response } from "express";

//Initializing form's fields
export const Contact = () => {
   const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message:""
   }
  
    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState("Send");
    const [status, setStatus] = useState({});
   	const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        })

        const handleSubmit = async (e) => {
            e.preventDefault();
            setButtonText("Sending...");
            let response = await fetch("http://localhost:5000/contact", {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify(formDetails),
            });
            setButtonText("Send");
            let result = await response.json();
            setFormDetails(formInitialDetails);
            if (result.code == 200) {
              setStatus({ succes: true, message: 'Message sent successfully'});
            } else {
              setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
            }
          };

    return (
      <section className="contact" id="connect">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img src={contactImg} alt="Contact Us" />
            </Col>
            <Col md={6}>
                <h2>Get in Touch</h2>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm={6} className="px-1">
                        <input type="text" value={formDetails.firstName} placeholder="Enter your first name" onChange={(e) => onFormUpdate ("firstName", e.target.value) }></input>
                        </Col>
                        <Col sm={6} className="px-1">
                        <input type="text" value={formDetails.lastName} placeholder="Enter your last name" onChange={(e) => onFormUpdate ("lastName", e.target.value) }></input>
                        </Col>
                        <Col sm={6} className="px-1">
                        <input type="email" value={formDetails.email} placeholder="Email Adress" onChange={(e) => onFormUpdate ("email", e.target.value) }></input>
                        </Col>
                        <Col sm={6} className="px-1">
                        <input type="phone" value={formDetails.phone} placeholder="Enter your phone No." onChange={(e) => onFormUpdate ("phone", e.target.value) }></input>
                        </Col>
                        <Col>
                           <textarea  rows="6" value={formDetails.message} placeholder="Write a Message" onChange={(e) => onFormUpdate ("message", e.target.value) }></textarea> 
                            <button type="submit"><span>{buttonText}</span></button>
                        </Col>
                        {
                            status.message && 
                            <Col>
                              <p className={status.success === false ? "danger" : "succes" }>{status.message}</p>
                            </Col>
                        }
                    </Row>
                </form>
            </Col>
          </Row>
        </Container>
      </section>
    );
}};