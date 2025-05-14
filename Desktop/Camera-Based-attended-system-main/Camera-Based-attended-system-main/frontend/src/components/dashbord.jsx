import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 

const Dashboard = () => {
  const [studata, Setstudata] = useState([]); 
  const [selectedDate, setSelectedDate] = useState(new Date()); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/attendance/dash");
        Setstudata(response.data.marked);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredData = studata.filter((student) => {
    const studentDate = new Date(student.date);
    return studentDate.getFullYear() === selectedDate.getFullYear() &&
      studentDate.getMonth() === selectedDate.getMonth() &&
      studentDate.getDate() === selectedDate.getDate();
  });

  return (
    <>
      <div className="d-flex justify-content-end mb-2 py-3">
        <p>Filter</p>
        <div className="mx-5">

        <DatePicker selected={selectedDate} onChange={handleDateChange} />
        </div>
      </div>
      <table className="table table-striped table-hover ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">id</th>
            <th scope="col">marked</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((stu, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{stu.id}</td>
              <td>{stu.marked}</td>
              <td>{stu.date}</td>
            </tr>
          ))}
          {filteredData.length === 0 && (
            <tr>
              <td colSpan="4">No data found for selected date.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Dashboard;
