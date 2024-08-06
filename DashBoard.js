import React ,{ useEffect, useState  }from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "./DashBoard.css";
import Modal from 'react-bootstrap/Modal';
import dashboard1 from "../Images/dashboard1.png"
import leaddetails from "../Images/leaddetails.png"
import source1 from "../Images/source1.png"
import status1 from "../Images/status1.png"
import status2 from "../Images/status2.png"
import { useNavigate } from "react-router";


export default function DashBoard(){
    const inputValue = sessionStorage.getItem("inputValue");
    const email = sessionStorage.getItem("email");


    const userName =email|| inputValue ;
  const name = userName ? userName.match(/^([^@]*)@/)?.[1] : "Guest";
    const [records, setRecords] = useState([]);
    const [showRecords, setShowRecords] = useState(false);



    const handleShowRecords = () => setShowRecords(true);
    const handleCloseRecords = () => setShowRecords(false);
    useEffect(() => {
        axios.post("http://localhost:3001/lead/get/api",
          { createdBy: userName, })
          .then((res) => {
            setRecords(res.data);
            // console.log(res.data)
          });
      }, [records]);

    


    const [sourceData, setSourceData] = useState([]);
    const [showSources, setShowSources] = useState(false);
    const handleShowSources = () => setShowSources(true);
    const handleCloseSources = () => setShowSources(false);
    useEffect(() => {
        axios
          .post("http://localhost:3001/source/get/api", { createdBy: userName })
          .then((res) => {
            setSourceData(res.data); // Set the data property into sourceData
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, [sourceData]);
      // console.log(sourceData)


      const [serviceData, setServiceData] = useState([]);
      const [showService, setShowService] = useState(false);

      const handleShowService= () => setShowService(true);
      const handleCloseService = () => setShowService(false);
      useEffect(() => {
        axios
          .post("http://localhost:3001/service/get/api", {
            createdBy: userName
          })
          .then((res) => {
            setServiceData(res.data); // Set the data property into sourceData
           
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, [serviceData]);
    //    console.log(serviceData)



    const [statusData, setStatusData] = useState([]);
    const [showStatus, setShowStatus] = useState(false);

      const handleShowStatus= () => setShowStatus(true);
      const handleCloseStatus = () => setShowStatus(false);
    useEffect(() => {
      axios
        .post("http://localhost:3001/status/get/api", {
          createdBy: userName
        })
        .then((res) => {
          setStatusData(res.data);
          // console.log(res.data); // Log the fetched data
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, [statusData]);
    //   console.log(statusData)


    const navigate = useNavigate();

    const sourceClick=()=>{
   navigate("/SourceGraph")
    }
    const serviceClick=()=>{
      navigate("/ServiceGraph")
    }
    const statusClick=()=>{
      navigate("/StatusGraph")
    }

    const leadClick=()=>{
      navigate("/Lead")
    }




    return(
        <div style={{overflow:"hidden",marginTop:"70px"}} >
                <h1 style={{textAlign:"center",fontFamily:"serif",color:"black"}}>DASH BOARD</h1>
               <span style={{color:"green"}}>   Signed in as: </span><a href="#login">{name}</a>

          
               <img src={dashboard1} className="images"></img>

<Row>

    <Col xs={12} md={6} xl={3}></Col>
    <Col xs={12} md={6} xl={4}>
    <Card className="text-center card-custom" style={{marginTop:"10px"}}>
            <Card.Header className="card-header-custom">
              <h4>Lead Details</h4>
            </Card.Header>
            <Card.Body className="card-body-custom">
              <Card.Text>
                <strong style={{color:"green"}}>Total Lead Count:</strong> {records.length}

               
              </Card.Text>
              <img className="dashboardIcon" src={leaddetails}></img>&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="outline-primary"
                 onClick={handleShowRecords}
              >Lead Names</Button>&nbsp;
                 <Button onClick={leadClick} variant="outline-success">Lead Details</Button>{' '}
            </Card.Body>
            <Card.Footer className="text-muted card-footer-custom">
            Click to know Lead Names
            </Card.Footer>
          </Card>
    </Col>


    <Col xs={12} md={6} xl={4}>
    <Card className="text-center card-custom"  style={{marginTop:"10px"}}>
            <Card.Header className="card-header-custom">
              <h4>Source Details</h4>
            </Card.Header>
            <Card.Body className="card-body-custom">
              <Card.Text>
                <strong style={{color:"green"}}>Active Source Count:</strong>  {sourceData.length}
              </Card.Text>
              <img className="dashboardIcon" src={source1}></img>&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="outline-primary"
              onClick={handleShowSources}
              > Show sources</Button>  &nbsp;
              <Button onClick={sourceClick} variant="outline-success">Source statics</Button>{' '}
            </Card.Body>
            <Card.Footer className="text-muted card-footer-custom">
              Click to know source Names
            </Card.Footer>
          </Card>
    </Col>
    <Col xs={12} md={6} xl={2}></Col>

</Row>



<Row>
<Col xs={12} md={6} xl={3}></Col>

<Col xs={12} md={6} xl={4}>


<Card className="text-center card-custom"  style={{marginTop:"30px"}}>
            <Card.Header className="card-header-custom">
              <h4>Service Details</h4>
            </Card.Header>
            <Card.Body className="card-body-custom">
              <Card.Text>
                <strong style={{color:"green"}}>Active Service Count:</strong>  {serviceData.length}
              </Card.Text>
              <img className="dashboardIcon" src={status1}></img>&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="outline-primary"
               onClick={handleShowService}
              >Show Services</Button> &nbsp;
              <Button onClick={serviceClick} variant="outline-success">Service statics</Button>{' '}
            </Card.Body>
            <Card.Footer className="text-muted card-footer-custom">
            Click to know service Names
            </Card.Footer>
          </Card>


</Col>
<Col xs={12} md={6} xl={4}>


<Card className="text-center card-custom"  style={{marginTop:"30px"}}>
            <Card.Header className="card-header-custom">
              <h4>Status Details</h4>
            </Card.Header>
            <Card.Body className="card-body-custom">
              <Card.Text>
                <strong style={{color:"green"}}>Active Status Count:</strong>  {statusData.length}
              </Card.Text>
              <img className="dashboardIcon" src={status2}></img>&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="outline-primary"
               onClick={handleShowStatus}
              >Show Status</Button> &nbsp;
              <Button onClick={statusClick} variant="outline-success">Status statics</Button>{' '}
            </Card.Body>
            <Card.Footer className="text-muted card-footer-custom">
            Click to know Status Names
            </Card.Footer>
          </Card>


</Col>
<Col xs={12} md={6} xl={2}></Col>

</Row>











<Modal show={showSources} onHide={handleCloseSources}>
                <Modal.Header closeButton>
                    <Modal.Title>Source Names</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {sourceData.map((source, index) => (
                            <li key={index}>{source.sourceName}</li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseSources}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>



            <Modal show={showService} onHide={handleCloseService}>
                <Modal.Header closeButton>
                    <Modal.Title>Service Names</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {serviceData.map((service, index) => (
                            <li key={index}>{service.serviceName}</li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseService}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>



            

            <Modal show={showStatus} onHide={handleCloseStatus}>
                <Modal.Header closeButton>
                    <Modal.Title>Status Names</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {statusData.map((status, index) => (
                            <li key={index}>{status.statusName}</li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseStatus}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>





            <Modal show={showRecords} onHide={handleCloseRecords}>
                <Modal.Header closeButton>
                    <Modal.Title>Lead Names</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {records.map((lead, index) => (
                            <li key={index}>{lead.leadName}</li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseRecords}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            
        </div>
    )
}