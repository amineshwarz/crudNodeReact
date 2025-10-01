import axios from 'axios'
import {useEffect, useState} from 'react'


const Student = ()=> {

    const [student, setStudent] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8081/")
        
        .then(res => setStudent(res.data))  
        .catch(err => console.log(err))  // Affiche les erreurs dans la console
    }, [])


  return (
    <div>
       <h1>Student Component</h1>
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
                                <Link to="/create" className='btn btn-primary'>Ajouter</Link>
                                <button className='btn btn-danger'>Delete</button>
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