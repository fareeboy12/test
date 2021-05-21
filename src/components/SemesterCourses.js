import React, { Component } from "react";
import axios from "axios";

class SemesterCourses extends Component {
	state = {
		semester: "",
		semesterCourses: [],
		courseIds: [],
		regs: [],
	};

	getSemesterCourses = (semester) => {
		axios
			.get(`/api/courses/${semester}`)
			.then((courses) =>
				this.setState({ semesterCourses: courses.data })
			);
	};

	addRegistration = () => {
		console.log(this.state.courseIds);
		console.log(this.props.regno);
		const regs = {
			courseIds: this.state.courseIds,
			regno: this.props.regno,
		};
		axios.patch("/api/registration/add", regs).then((res) => {
			this.setState({ regs: res.data });
		});
	};

	handleChange = (e) => {
		let { value } = e.target;
		this.setState({ semester: value });
		this.getSemesterCourses(value);
	};

	handleChangeCheckbox = (e) => {
		const { value } = e.target;
		const { courseIds } = this.state;
		let index = courseIds.indexOf(value);
		index === -1 ? courseIds.push(value) : courseIds.splice(index, 1);
		this.setState({ courseIds });
	};

	handleChangeRegister = () => {
		console.log(this.state.courseIds);
		console.log(this.props.regno);
		this.addRegistration();
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
							<label key={course.courseid}>
								<input
									type="checkbox"
									name="course.courseid"
									value={course.courseid}
									checked={this.state.courseIds.includes(
										course.courseid
									)}
									onChange={this.handleChangeCheckbox}
								/>
							</label>
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
											this.state.courseIds.includes(a);
										})}
										onChange={() => {
											this.setState({
												courseIds:
													this.state.courseIds
														.length === 0
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
					{this.state.courseIds.length !== 0 && (
						<button onClick={this.handleChangeRegister()}>
							Register
						</button>
					)}
				</div>
				<pre>{JSON.stringify(this.state, null, 2)}</pre>
			</div>
		);
	}
}

export default SemesterCourses;
