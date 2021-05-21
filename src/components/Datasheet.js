import React, { Component } from "react";
import axios from "axios";
import SemesterCourses from "./SemesterCourses";

export class Datasheet extends Component {
  state = {
    student: "",
  };

  getStudent = (regno) => {
    axios
      .get(`/api/students/${regno}`)
      .then((student) => this.setState({ student: student.data }));
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.getStudent(value);
  };

  render() {
    return (
      <div>
        <div className="col">
          <div>
            <table>
              <tbody>
                <tr>
                  <th>Reg. #</th>
                  <td>
                    <input
                      type="text"
                      name="regno"
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br></br>
          {this.state.student.length !== 0 && (
            <div>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <th>Name :</th>
                      <td>{this.state.student.studentname}</td>
                    </tr>
                    <tr>
                      <th>Father :</th>
                      <td>{this.state.student.fathername}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <br></br>
              <SemesterCourses regno={this.state.student.regno} />
            </div>
          )}
        </div>
        <div className="col">{/* <RegisteredCourses /> */}</div>
        <div className="col">{JSON.stringify(this.state, null, 2)}</div>
      </div>
    );
  }
}

export default Datasheet;
