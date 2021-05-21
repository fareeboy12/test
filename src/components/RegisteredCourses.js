import React, { Component } from "react";
import axios from "axios";

export class RegisteredCourses extends Component {
  grades = {
    grade: [],
  };

  getGrades = (grades) => {
    axios
      .get(`/api/grades/${grades}`)
      .then((courses) => this.setState({ grade: courses.data }));
  };

  render() {
    console.log(this.state.getGrades());
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Title</th>
              <th>CrHr</th>
              <th>Grade</th>
              <th>GPA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CS1112101</td>
              <td>Calculus and Analytical Geometry</td>
              <td>3</td>
              <td>
                <select>
                  <option>A+</option>
                  <option>A</option>
                  <option>B+</option>
                  <option>B</option>
                </select>
              </td>
              <td>3.0</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default RegisteredCourses;
