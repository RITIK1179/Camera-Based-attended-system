import React from 'react'
import axios from "axios"
// import { MdDeleteOutline } from "react-icons/ti";
import { MdCancel } from "react-icons/md";
import { useEffect, useState } from "react"


const  All_student= ()=>{

        const [studata,Setstudata] = useState([{}]);
        useEffect(()=>{
          axios
          .get("http://localhost:3000/students/studentDetail")
          .then((response) => {
            // console.log("Recognition result:", response.data.marked);
            console.log(response.data.marked)
            Setstudata(response.data.marked);
            
          })
          .catch((error) => {
            console.error("Error sending image to server:", error);
          });
        },[])
        // console.log(studata[0]);

        const handleDeleteStudent = async (studentId) => {
          if (!window.confirm('Are you sure you want to delete this student?')) {
            return; // User canceled deletion
          }
      
          try {
            const response = await axios.delete(`http://localhost:3000/students/studentDel/${studentId}`); // Assuming DELETE endpoint with student ID
      
            // Update local state if deletion is successful on the server
            Setstudata(studata.filter((student) => student._id !== studentId)); // Use student ID for filtering (assuming _id is unique)
          } catch (error) {
            console.error('Error deleting student:', error);
            setError('An error occurred while deleting the student. Please try again later.');
          }
          // alert(studentId)
        };




        return(
          <>
               
              <table className="table table-striped">
        <thead className='thead-dark'>
          <tr>
            <th scope="col" >#</th>
            <th scope="col">id</th>
            <th scope="col">name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {studata.map((stu, index) => (
          <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{stu.studentId}</td>
              <td>{stu.name}</td>
              <td>
                  <button className='btn btn-danger' onClick={() => handleDeleteStudent(stu._id)}>
                  Delete 
                  </button>
                </td>
          </tr>
      ))}
          {/* <tr>
            <th scope="row">1</th>
            <td>{studata[0].id}</td>
            <td>{studata[0].marked}</td>
            <td>{studata[0].date}</td>
          </tr>
           */}
        </tbody>
              </table>
      
              </>
          )
      }


export default All_student;



