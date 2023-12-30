import React from 'react';
import '../Style/Contact.css';
import emailIcon from "../Icons/gmail.png";
import linkedin from "../Icons/linkedin.png";
import github from "../Icons/github.png";
import leetcode from "../Icons/leetcode.png";
import replit from "../Icons/replit2.png";

const Contact = () => {
  const emailAddress = "siddharthsingh002018@gmail.com";
  const linkedinUrl = "https://www.linkedin.com/in/siddharth-singh15/";
  const githuburl = "https://github.com/SID102";
  const leetcodeurl = "https://leetcode.com/SID_15/";
  const repliturl = "https://replit.com/@Wistfulang";
  return (
    <div className="contact">
        <a  href={`mailto:${emailAddress}`} target="_blank" rel="noopener noreferrer">
          <img className="image3"src={emailIcon} alt="email" />
        </a>
      <a  href={linkedinUrl} target="_blank" rel="noopener noreferrer">
        <img className="image4"src={linkedin} alt="linkedin" />
      </a>
      <a  href={githuburl} target="_blank" rel="noopener noreferrer">
        <img className="image5"src={github} alt="Github" />
      </a>
      <a  href={leetcodeurl} target="_blank" rel="noopener noreferrer">
        <img className="image5"src={leetcode} alt="Github" />
      </a>
      <a  href={repliturl} target="_blank" rel="noopener noreferrer">
        <img className="image5"src={replit} alt="Github" />
      </a>
    </div>
  );
};

export default Contact;
