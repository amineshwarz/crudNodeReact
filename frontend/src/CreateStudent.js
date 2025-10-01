import {useState}from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

// ---------------- CreateStudent Component ----------------
const CreateStudent = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:8081/create", {
            name,
            email
        })
        .then(res => console.log("Student",res," was created"))
        .catch(err => console.log(err))
        navigate('/')
    }



  return (
   
    <div className='d-flex vh-100 bg primary justify-content-center align-items-center'>
        <div className='w-50 bg-white shadow p3 rounded'>
            <form onSubmit={handleSubmit}>
                <h2>Ajouter un étudiant</h2>
                <div className='mb-2'>
                    <label htmlFor='name'>Nom</label>
                    <input type="text" placeholder='Entrer le nom' className='form-control'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='email'>Email</label>
                    <input type="email" placeholder='Entrer l email' className='form-control'  onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button className='btn btn-success'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateStudent
