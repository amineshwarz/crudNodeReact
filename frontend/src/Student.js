import axios from 'axios'
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

const Student = ()=> {

    const [student, setStudent] = useState([])

    const handleDelete = async (id) => {
        try {
            // await axios.delete(`http://localhost:8081/delete/${id}`);
            await axios.delete(`http://localhost:8081/student/${id}`);
            setStudent(prevStudents => prevStudents.filter(student => student.id !== id));
        }catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8081/")
        
        .then(res => setStudent(res.data))  
        .catch(err => console.log(err))  // Affiche les erreurs dans la console
    }, [])



  return (
    <div>
       <h1>Student Component</h1>
       <Link to="/create" className='btn btn-primary'>Ajouter</Link>
       <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {
                    student.map((data, i ) => (
                        <tr key={i}>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>
                                <Link to={`update/${data.id}`} className='btn btn-primary'>Modifier</Link>
                                <button className='btn btn-danger' onClick={ e => handleDelete(data.id)}>Delete</button>
                            </td>
                            
                        </tr>
                        
                    ))
                }

            </tbody>
       </table>
    </div>
  )
}

export default Student