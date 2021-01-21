import React from "react";
import emailjs from 'emailjs-com'

function ReportBug() {

    function sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm('service_6c5tgmt', 'template_cy4jtnd', e.target, 'user_QKkF0jVBqIQOb8Ow7qeIY')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      }




  return (
    <div>
      <div></div>
    </div>
  );
}

export default ReportBug;
