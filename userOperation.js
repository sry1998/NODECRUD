const fs = require('fs');
const db = 'data.json';
let userData = JSON.parse(fs.readFileSync(db));
let flag = false;

function getResponse(statuscode,message,data) {
	let res = {
		statuscode: statuscode,
		message: message,
		data: data
	}
	return res;
}

function addUser(data) {
	const parseData = JSON.parse(data);
	let msg;
	userData.forEach(ele => {
		flag = false;
		if (ele.id === parseData.id) {
			msg = 'id already exist..!';
		} else if (ele.emailid == parseData.emailid) {
			msg = 'email already exist..!';
		} else if (ele.mobileno == parseData.mobileno) {
			msg = 'contact already exist..!';
		}
		if (ele.id != parseData.id) {
			if (ele.emailid != parseData.emailid) {
				if (ele.mobileno != parseData.mobileno) {
					flag = true;
				}
			}
		} 
	})
	if (flag) {
		userData.push(parseData);
		fs.writeFile(db, JSON.stringify(userData), function (err) {
			if (err) throw err;
		});
		const giveResponse = 'User added Successfully';
		let obj = getResponse(200,'Ok',giveResponse);
		return JSON.stringify(obj);
	}
	else {
		let obj = getResponse(200,'Ok',msg);
		return JSON.stringify(obj);
	}
}

function deleteUser(data) {
	flag = 0;
	userData.forEach(ele => {
		if (ele.id == data) {
			let index = userData.indexOf(ele);
			userData.splice(index, 1);
			flag = 1;
		}
	})
	if (flag) {
		fs.writeFile(db, JSON.stringify(userData), function (err) {
			if (err) throw err;
		});
		const giveResponse = 'User removed Successfully';
		let obj = getResponse(200,'Ok',giveResponse);
		return JSON.stringify(obj);
	}
}

function getUser(data) {
	let getUserById;
	flag = 0;
	userData.forEach(ele => {
		if (ele.id == data) {
			getUserById = ele;
			flag = 1;
		}
	})
	if (flag === 1) {
		fs.writeFile(db, JSON.stringify(userData), function (err) {
			if (err) throw err;
		});
		const giveResponse = getUserById;
		let obj = getResponse(200,'Ok',giveResponse);
		return JSON.stringify(obj);
	}
	
}

function updateUser(data) {
	const parseData = JSON.parse(data);
	userData.forEach(ele => {
		if (ele.id == parseData.id) {
			Object.keys(parseData).forEach(element => {
				if (element == 'name') {
					if (parseData.element !== '') {
						ele.name = parseData.name;
					}
				}
				if (element == 'emailid') {
					if (parseData.element !== '') {
						ele.emailid = parseData.emailid;
					}
				}
				if (element == 'mobileno') {
					if (parseData.element !== '') {
						ele.mobileno = parseData.mobileno;
					}
				}
				if (element == 'department') {
					if (parseData.element !== '') {
						ele.department = parseData.department;
					}
				}
				if (element == 'age') {
					if (parseData.element !== '') {
						ele.age = parseData.age;
					}
				}
				if (element == 'enrollno') {
					if (parseData.element !== '') {
						ele.enrollno = parseData.enrollno;
					}
				}
			})
			flag = 1;
		}
	})
	if (flag === 1) {
		//awdata.push(parseData);
		fs.writeFile(db, JSON.stringify(userData), function (err) {
			if (err) throw err;
		});
		const giveResponse = 'User updated Successfully';
		let obj = getResponse(200,'Ok',giveResponse);
		return JSON.stringify(obj);
	}
}

module.exports = {
	addUser,
	deleteUser,
	getUser,
	updateUser
}