import React from "react";
import emailjs from 'emailjs-com'
import SideBar from "./header/SideBar"
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
    <div>
    <SideBar></SideBar>
</div>
    <div style={{display:"flex"}}>    
      <form className="contactForm" onSubmit={sendEmail} id="bugForm">
      <h3>Use this form to submit bugs. </h3> <h4>Please try to provide as much information as possible when submitting</h4>
        <input type="text" name="from_name"/>
          <label style={{color:"black", fontSize:'12px', marginBottom:"30px"}}>Name</label>
        <textarea type="text" name="message"/>
          <label style={{color:"black", fontSize:'12px', marginBottom:"30px"}}>Issue</label>
          <div><button type="submit" form="bugForm" value="Submit" 
                  style={{
                    display: "flex",
                    width: "135px",
                    height: "50px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    color: "black",
                    fontWeight: "900",
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Submit Bug
                </button>
                </div>      </form>
    </div>
    </div>
  );
}

export default ReportBug;
