const fs = require('fs');
const db = 'data.json';
let userData = JSON.parse(fs.readFileSync(db));
let flag = false;

function getResponse(statuscode, message, data) {
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
	userData.some(ele => {
		flag = false;
		if (ele.id != parseData.id) {
			if (ele.emailid != parseData.emailid) {
				if (ele.mobileno != parseData.mobileno) {
					flag = true;
				}
				else {
					msg = 'Id already exist..!';
				}
			}
			else {
				msg = 'Email already exist..!';
			}
		}
		else {
			msg = 'Contact already exist..!';
		}
	})
	if (flag) {
		userData.push(parseData);
		fs.writeFileSync(db, JSON.stringify(userData));
		const giveResponse = 'User added successfully';
		let obj = getResponse(200, 'Ok', giveResponse);
		return JSON.stringify(obj);
	}
	else {
		let obj = getResponse(200, 'Ok', msg);
		return JSON.stringify(obj);
	}
}

function deleteUser(data) {
	flag = userData.splice(userData.findIndex(ele => {
		ele.id == data;
	}), 1);
	if (flag) {
		fs.writeFileSync(db, JSON.stringify(userData));
		const giveResponse = 'User removed successfully';
		let obj = getResponse(200, 'Ok', giveResponse);
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
	if (flag) {
		fs.writeFileSync(db, JSON.stringify(userData));
		const giveResponse = getUserById;
		let obj = getResponse(200, 'Ok', giveResponse);
		return JSON.stringify(obj);
	}

}

function updateUser(data) {
	const parseData = JSON.parse(data);
	const userKeys = ['name', 'emailid', 'mobileno', 'department', 'age', 'enrollno'];
	flag = userData.some(ele => {
		if (ele.id == parseData.id) {
			Object.keys(parseData).forEach(element => {
				if (userKeys.find((ele) => { if (ele == element) return true; })) {					
					if (parseData[element] !== '') {
						ele[element] = parseData[element];
					}
				}
			});
		}
		return true;
	})
	if (flag) {
		fs.writeFileSync(db, JSON.stringify(userData));
		const giveResponse = 'User updated successfully';
		let obj = getResponse(200, 'Ok', giveResponse);
		return JSON.stringify(obj);
	}
}

module.exports = {
	addUser,
	deleteUser,
	getUser,
	updateUser
}