import React, { Component } from "react";
import axios from "axios";
import RegisteredCourses from "./RegisteredCourses";

class SemesterCourses extends Component {
  state = {
    semester: "",
    semesterCourses: [],
    courseids: [],
    registeredCourses: [],
  };

  getSemesterCourses = (semester) => {
    axios
      .get(`/api/courses/${semester}`)
      .then((courses) => this.setState({ semesterCourses: courses.data }));
  };

  addRegistration = () => {
    console.log(this.state.courseids);
    console.log(this.props.regno);
    const regs = {
      courseids: JSON.stringify(this.state.courseids),
      regno: this.props.regno,
    };
    axios.post("/api/registration/add", regs).then((res) => {
      //   this.setState({ regs: res.data });
      console.log(res);
      console.log(res.data);
      this.setState({ registeredCourses: res.data });
    });
  };

  handleChange = (e) => {
    let { value } = e.target;
    this.setState({ semester: value });
    this.getSemesterCourses(value);
  };

  handleChangeCheckbox = (e) => {
    const { value } = e.target;
    const { courseids } = this.state;
    let index = courseids.indexOf(value);
    index === -1 ? courseids.push(value) : courseids.splice(index, 1);
    this.setState({ courseids });
  };

  render() {
    let sem = ["", 1, 2, 3, 4, 5, 6, 7, 8];

    let semesterOptions = sem.map((semOpt) => (
      <option value={semOpt}>{semOpt}</option>
    ));
    let currentCourses = [];
    let semCourses = this.state.semesterCourses.map(
      (course) => (
        currentCourses.push(course.courseid),
        (
          <tr key={course._id}>
            <td>
              <input
                type="checkbox"
                name="course.courseid"
                value={course.courseid}
                onChange={this.handleChangeCheckbox}
                checked={this.state.courseids.includes(course.courseid)}
              />
            </td>
            <td>{course.code}</td>
            <td>{course.title}</td>
            <td>{course.crhr}</td>
          </tr>
        )
      )
    );

    return (
      <div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Semester :</th>
                <td>
                  <select
                    value={this.state.semester}
                    onChange={this.handleChange}
                  >
                    {semesterOptions}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br></br>
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    name="selectAll"
                    checked={currentCourses.forEach((a) => {
                      this.state.courseids.includes(a);
                    })}
                    onChange={() => {
                      this.setState({
                        courseids:
                          this.state.courseids.length === 0
                            ? currentCourses
                            : [],
                      });
                    }}
                  />
                </th>
                <th>Code</th>
                <th>Title</th>
                <th>CrHr</th>
              </tr>
            </thead>
            <tbody>{semCourses}</tbody>
          </table>
          {this.state.courseids.length !== 0 && (
            <button onClick={this.addRegistration}>Register</button>
          )}
        </div>
        <br />
        <div>
          <RegisteredCourses registeredCourses={this.state.registeredCourses} />
        </div>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

export default SemesterCourses;
