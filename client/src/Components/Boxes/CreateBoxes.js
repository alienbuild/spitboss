import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import { createSpitbox } from "../Spitbox/apiSpitbox";

const CreateBoxes = () => {

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
        <form onSubmit={handleSubmit}>

            <label htmlFor="name">Name</label>
            <input type="text" name="name" onChange={handleChange('name')} value={name} />

            <br/>

            <label htmlFor="description">Description</label>
            <input type="textarea" name="description" onChange={handleChange('description')} value={description} />

            <br/>

            <label htmlFor="price">Price</label>
            <input type="number" name="price" onChange={handleChange('price')} value={price} />

            <br/>

            <label htmlFor="category">Category</label>
            <select name="category" id="category" onChange={handleChange('category')}>
                <option disabled selected>Please select</option>
                {/*{categories && categories.map((category, index) => (*/}
                {/*    <option key={index} value={category._id}>{category.name}</option>*/}
                {/*))}*/}
            </select>

            <br/>

            <label htmlFor="quantity">Quantity</label>
            <input type="number" name="quantity" onChange={handleChange('quantity')} value={quantity} />

            <br/>

            <button type="submit">Create Spitbox</button>
        </form>
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
          <h1>Create Spitbox</h1>
          {showSuccess()}
          {showError()}
          {newSpitboxForm()}
          {goBack()}
      </>
  )
};

export default CreateBoxes;