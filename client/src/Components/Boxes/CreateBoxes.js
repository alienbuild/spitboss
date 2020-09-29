import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import { createSpitbox } from "../Spitbox/apiSpitbox";
import SpitbossLogo from '../../assets/images/spitboss.svg';

// Bootstrap imports
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import Nav from "react-bootstrap/cjs/Nav";
import Modal from "react-bootstrap/cjs/Modal";
import Button from "react-bootstrap/cjs/Button";
import Tab from "react-bootstrap/cjs/Tab";

const CreateBoxes = () => {

    // Modal Controls
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Init state
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        participants: [],
        quantity: '',
        loading: false,
        error: '',
        createSpitbox: '',
        redirectToProfile: false,
        formData: ''
    });

    const {user, token} = isAuthenticated();

    const {
        name,
        description,
        price,
        participants,
        quantity,
        loading,
        error,
        createdSpitbox,
        redirectToProfile,
        formData
    } = values;

    // Handle form changes
    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: '', loading: true});
        console.log('Form data is', formData);

        createSpitbox(user._id, token, formData)
            .then(data => {
                if (data.error){
                    setValues({...values, error: data.error})
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        price: '',
                        quantity: '',
                        loading: false,
                        createdSpitbox: data.name
                    })
                }
            })
            .catch(err => console.log('FE error handleSubmit / Create Spitbox: ', err))
    };

    // Form markup
    const newSpitboxForm = () => (
        <>
            <img src={SpitbossLogo} alt="Spitboss Logo" className={`create-spitbox-logo`}/>
            <h2>Create your Spitbox</h2>
            <small>Your Spitbox will not become active until your opponent accepts your challenge.</small>
            <Tab.Container id="left-tabs-example">
                <Row>
                    <Col sm={12}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">
                                    <div className="horizontal-icon">
                                        <lord-icon
                                            target={'a'}
                                            animation="loop"
                                            palette="#8c8895;#8c8895"
                                            src={`../../assets/icons/40-gears-settings-double/40-gears-settings-double-solid.json`}>
                                        </lord-icon>
                                    </div>
                                    Spitbox Settings
                                    <small>Set the mode, ticket price and other specifics.</small>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">
                                    <div className="horizontal-icon">
                                        <lord-icon
                                            target={'a'}
                                            animation="loop"
                                            palette="#8c8895;#8c8895"
                                            src={`../../assets/icons/134-target/134-target-solid.json`}>
                                        </lord-icon>
                                    </div>
                                    Who is being challenged?
                                    <small>Select opponent...</small>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">
                                    <div className="horizontal-icon">
                                        <lord-icon
                                            target={'a'}
                                            animation="loop"
                                            palette="#8c8895;#8c8895"
                                            src={`../../assets/icons/45-clock-time/45-clock-time-solid.json`}>
                                        </lord-icon>
                                    </div>
                                    Start time
                                    <small>Now</small>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                {/*Settings*/}
                                <label htmlFor="description">Description</label>
                                <input type="textarea" name="description" onChange={handleChange('description')} value={description} />
                                <br/>
                                <label htmlFor="price">PPV Price</label>
                                <input type="number" name="price" onChange={handleChange('price')} value={price} />
                                <br/>
                                <label htmlFor="quantity">Limit tickets</label>
                                <input type="number" name="quantity" onChange={handleChange('quantity')} value={quantity} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                {/*Select Opponent*/}
                                <label htmlFor="category">Opponent</label>
                                <select name="category" id="category" onChange={handleChange('category')}>
                                    <option disabled selected>Please select</option>
                                    {/*{categories && categories.map((category, index) => (*/}
                                    {/*    <option key={index} value={category._id}>{category.name}</option>*/}
                                    {/*))}*/}
                                </select>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                {/*Event date/time*/}
                                789
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            </>
    )

    // Handle error
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    // Handle success
    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdSpitbox ? '' : 'none' }}>
            <h2>{`${createdSpitbox}`} is created!</h2>
        </div>
    );

    // Handle loading
    const showLoading = () =>
        loading && (
            <h2>Loading...</h2>
        );

    const goBack = () => {
        return(
            <Link to="/spitbox/boxes/list">Back to Spitboxes</Link>
        )
    };

    return(
      <>
          <Button onClick={handleShow}>Create Spitbox</Button>
          {showSuccess()}
          {showError()}
          <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
          >
              <Modal.Header>
                  <ul>
                      <li><button onClick={handleClose}>
                          <lord-icon
                              animation="loop"
                              target="button"
                              palette="#8c8895;#8c8895"
                              src={`../../assets/icons/38-error-cross-simple-outline/38-error-cross-simple-outline.json`}>
                          </lord-icon>
                      </button></li>
                  </ul>
              </Modal.Header>
              <form onSubmit={handleSubmit}>
                  <Modal.Body>
                      {newSpitboxForm()}
                  </Modal.Body>
                  <Modal.Footer>
                      <button type="submit">Create Spitbox</button>
                  </Modal.Footer>
              </form>
          </Modal>
          {goBack()}
      </>
  )
};

export default CreateBoxes;