import {useState, useEffect}from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdateStudent = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();

// ------------------- afficher les données de l'étudiant à modifier dans l'imput avec useEffect ----------------
    useEffect(() => {
        axios.get(`http://localhost:8081/student/${id}`)
          .then(res => {
            setName(res.data.name);
            setEmail(res.data.email);
          })
          .catch(err => console.log(err));
      }, [id]);


    // ------------------- fonction pour mettre à jour l'étudiant -------------------
    function handleSubmit(e){
        e.preventDefault();
        const updateStudent = { name, email };
        axios.put(`http://localhost:8081/update/${id}`, updateStudent)
        .then(res => { 
            console.log("Student",res," was updated")
            navigate('/')
        }).catch(err => console.log(err)) 
    }

    // ------------------- Render the component -------------------
  return (
    <div className='d-flex vh-100 bg primary justify-content-center align-items-center'>
        <div className='w-50 bg-white shadow p3 rounded'>
            <form onSubmit={handleSubmit}>
                <h2>Modifier un étudiant</h2>
                <div className='mb-2'>
                    <label htmlFor='name'>Nom</label>
                    <input type="text" placeholder='Entrer le nom' className='form-control' value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='email'>Email</label>
                    <input type="email" placeholder='Entrer l email' className='form-control'  value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button className='btn btn-success'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateStudent
    
