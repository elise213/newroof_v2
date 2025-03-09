"use client";
import React, { useContext, useRef, useEffect } from "react";
import { Context } from "../store/appContext";
import styles from "./contact.css";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import Link from "next/link";
// import { Navbar } from "../component/navbar";
// import { Footer } from "../component/footer";

const Contact = () => {
  const { actions } = useContext(Context);
  const form = useRef();
  const SERVICE_ID = "service_6b1j8hf";
  const TEMPLATE_ID = "template_uv8sudi";
  const PUBLIC_KEY = "DuDgQFK3iKc6gJEYw";

  // Function to send an email
  const sendEmail = (e) => {
    e.preventDefault();
    console.log(SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY);
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
      (result) => {
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully",
        });
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Ooops, something went wrong",
          text: error.text,
        });
      }
    );
    e.target.reset();
  };

  return (
    <div className="contact-page">
      {/* <Navbar /> */}
      <div className="contact-div">
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <div className="contact-call">
            <Link href="/" passHref>
              <span className="close-contact">
                <i className="fa-solid fa-x"></i>
              </span>
            </Link>
          </div>
          <div className="contact-form-div">
            <div className="form-col">
              <input
                type="text"
                id="nameInput"
                name="name"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="form-col">
              <input
                type="text"
                id="emailInput"
                name="email"
                className="form-control"
                placeholder="Email address"
              />
            </div>
          </div>
          <div className="contact-form-div">
            <div className="form-col">
              <input
                type="text"
                id="subjectInput"
                name="subject"
                className="form-control"
                placeholder="Subject"
              />
            </div>
          </div>
          <div className="contact-form-div">
            <div className="form-col-full">
              <textarea
                id="contactTextArea"
                name="message"
                className="form-control"
                placeholder="Message"
                style={{ minHeight: "130px" }}
              ></textarea>
            </div>
          </div>
          <div className="form-col-full">
            <button className="send-button" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Contact;
