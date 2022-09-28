const $id = (element) => document.getElementById(element);
//$id("score-bar").textContent = `Your score is ${score}`;
const $class = (element) => document.getElementsByClassName(element);

var date = new Date();
let attendees = 1;

let main = true;
let side = true;

const nameArray = [
	"Osborn Kitto ",
	"Moses Alerander ",
	"Bridget Beck ",
	"Bevis Kit ",
	"Lance Jordan ",
	"Sid Dutt ",
	"Jesse Norton ",
	"Regan Cronin ",
	"Clare Moulton ",
	"Moore Thorndike ",
	"Webster Kennan ",
	"Kenneth Noel ",
	"Hugo Adela ",
	"Cornelia Godwin ",
	"Amelia Harrod ",
	"Susan Coleridge ",
	"Carl Bob ",
	"Alberta Bryan ",
	"Coral Saroyan ",
	"Marico DuBois ",
	"Bertha Bruce ",
	"Albert Habakkuk ",
	"Dominic Spenser ",
	"Perry Jennings ",
	"Nelly Gill ",
	"Marcia Cecillia ",
	"Cedric Priestley ",
	"Gilbert Giles ",
	"Gustave Jefferson ",
	"Frederica Pansy ",
	"Julie Adams ",
	"Mona Wheatley ",
	"Basil Dierser ",
	"Myrna Chaplin ",
	"Aaron Eveline ",
	"Francis Silas ",
	"Joyce Gracie ",
	"Montague Tony ",
	"Cherry Carl ",
	"Viola Elinor ",
	"Alice FitzGerald ",
	"Blake Milton ",
	"Jack Powell ",
	"Troy Strong ",
];

const nameLength = nameArray.length;

const photoNumber = 26;

const clock = function () {
	let getDate = new Date();
	$id("meet-bar-time").textContent = getDate.toLocaleTimeString();
};
setInterval(function () {
	clock();
}, 1000);

() => {
	$id("attendees").textContent = attendees;
};

function initialize() {
	for (let i = 0; i < 5; i += 1) {
		add();
	}
}

initialize();

function add(name, imgsrc) {
	console.log("add one person");
	if (attendees < 15 || (attendees == 15 && name !== undefined)) {
		if (name === undefined) {
			attendees += 1;
			$id("attendees").textContent = attendees;
		}

		var newPerson = document.createElement("div");
		newPerson.setAttribute("class", "meet-smallPerson");

		var newPerson_circle = document.createElement("div");
		newPerson_circle.setAttribute("class", "meet-smallPerson-circle");

		var newPerson_image = document.createElement("img");
		newPerson_image.setAttribute("class", "meet-smallPerson-image");
		const imgNum = getRandomInt(1, photoNumber);
		const nameNum = getRandomInt(1, nameLength);
		if (imgsrc == undefined) {
			newPerson_image.setAttribute("src", `./user${imgNum}.png`);
		} else {
			newPerson_image.setAttribute("src", imgsrc);
		}
		newPerson_image.setAttribute("class", "meet-smallPerson-image");

		var newPerson_sound = document.createElement("div");
		newPerson_sound.setAttribute("class", "meet-smallPerson-sound");

		var newPerson_sound_icon = document.createElement("span");
		newPerson_sound_icon.setAttribute("class", "material-icons");
		newPerson_sound_icon.setAttribute("style", "font-size: 18px");
		newPerson_sound_icon.textContent = "mic_off";

		var newPerson_name = document.createElement("div");
		newPerson_name.setAttribute("class", "meet-smallPerson-name");
		if (name == undefined) {
			newPerson_name.textContent = `${nameArray[nameNum]}`;
		} else {
			newPerson_name.textContent = name;
		}

		if (name != "你") {
			var newPerson_cancelButton = document.createElement("button");
			newPerson_cancelButton.setAttribute("class", "meet-smallPerson-cancel");
			newPerson_cancelButton.setAttribute("onclick", "cancel(this)");

			var newPerson_cancel_icon = document.createElement("span");
			newPerson_cancel_icon.setAttribute("class", "material-icons");
			newPerson_cancel_icon.setAttribute("style", "font-size: 18px");
			newPerson_cancel_icon.textContent = "cancel";
			newPerson_cancelButton.appendChild(newPerson_cancel_icon);
			newPerson.appendChild(newPerson_cancelButton);
		}

		var newPerson_setting = document.createElement("button");
		newPerson_setting.setAttribute("class", "meet-smallPerson-setting");
		newPerson_setting.setAttribute("onclick", "addMain(this)");

		var newPerson_setting_pin = document.createElement("span");
		newPerson_setting_pin.setAttribute("class", "material-icons pin");
		newPerson_setting_pin.textContent = "push_pin";

		var newPerson_setting_dashboard = document.createElement("span");
		newPerson_setting_dashboard.setAttribute("class", "material-icons dashboard");
		newPerson_setting_dashboard.textContent = "dashboard";

		var newPerson_setting_close_fullscreen = document.createElement("span");
		newPerson_setting_close_fullscreen.setAttribute("class", "material-icons close_fullscreen");
		newPerson_setting_close_fullscreen.textContent = "close_fullscreen";

		newPerson.appendChild(newPerson_circle);
		newPerson.appendChild(newPerson_sound);
		newPerson.appendChild(newPerson_name);
		newPerson.appendChild(newPerson_setting);

		newPerson_circle.appendChild(newPerson_image);

		newPerson_sound.appendChild(newPerson_sound_icon);

		newPerson_setting.appendChild(newPerson_setting_pin);
		newPerson_setting.appendChild(newPerson_setting_dashboard);
		newPerson_setting.appendChild(newPerson_setting_close_fullscreen);

		$id("meet-smallPeople").appendChild(newPerson);
	} else {
		alert("已達人數上限");
	}
	checkOnlyMyself();
	checkSmallPeople();
}

function cancel(button) {
	//console.log(button.parentNode);
	var person = button.parentNode;
	person.remove();
	attendees -= 1;
	$id("attendees").textContent = attendees;
	if (attendees === 1) {
		checkOnlyMyself();
	} else {
		checkSmallPeople();
	}
}

function addMain(button) {
	if (attendees === 1 && main) {
		return;
	}
	if (main) {
		closeMain();
	}
	var person = button.parentNode;
	//調整main small的大小
	mainPerson = $id("meet-mainPerson");
	mainPerson.setAttribute("style", "display: inline-flex");
	$id("meet-smallPeople").setAttribute("style", "width: 30%");
	const name = person.getElementsByClassName("meet-smallPerson-name")[0].textContent;
	const imgsrc = person.getElementsByClassName("meet-smallPerson-image")[0].getAttribute("src");

	var mainPerson = $id("meet-mainPerson");

	var circle = document.createElement("div");
	circle.setAttribute("class", "meet-mainPerson-circle");

	var img = document.createElement("img");
	img.setAttribute("class", "meet-mainPerson-image");
	img.setAttribute("id", "meet-mainPerson-image");
	img.setAttribute("src", imgsrc);
	img.setAttribute("alt", "圖片");

	var setting = document.createElement("button");
	setting.setAttribute("class", "meet-mainPerson-setting");
	setting.setAttribute("onclick", "closeMain()");

	var setting_pin = document.createElement("span");
	setting_pin.setAttribute("class", "material-icons pin");
	setting_pin.textContent = "push_pin";

	var setting_dashboard = document.createElement("span");
	setting_dashboard.setAttribute("class", "material-icons dashboard");
	setting_dashboard.textContent = "dashboard";

	var setting_close_fullscreen = document.createElement("span");
	setting_close_fullscreen.setAttribute("class", "material-icons close_fullscreen");
	setting_close_fullscreen.textContent = "close_fullscreen";

	var sound = document.createElement("div");
	sound.setAttribute("class", "meet-mainPerson-sound");

	var sound_icon = document.createElement("span");
	sound_icon.setAttribute("class", "material-icons");
	sound_icon.setAttribute("style", "font-size: 18px");
	sound_icon.textContent = "mic_off";

	var anchor = document.createElement("div");
	anchor.setAttribute("class", "meet-mainPerson-anchor");

	var pin = document.createElement("div");
	pin.setAttribute("class", "meet-mainPerson-pin");

	var push_pin = document.createElement("span");
	push_pin.setAttribute("class", "material-icons");
	push_pin.textContent = "push_pin";

	var mainName = document.createElement("div");
	mainName.setAttribute("class", "meet-mainPerson-name");
	mainName.setAttribute("id", "meet-mainPerson-name");
	mainName.textContent = name;

	if (name != "你") {
		var cancelButton = document.createElement("button");
		cancelButton.setAttribute("class", "meet-smallPerson-cancel");
		cancelButton.setAttribute("onclick", "cancelMain(this)");

		var cancel_icon = document.createElement("span");
		cancel_icon.setAttribute("class", "material-icons");
		cancel_icon.setAttribute("style", "font-size: 18px");
		cancel_icon.textContent = "cancel";
		cancelButton.appendChild(cancel_icon);
		mainPerson.appendChild(cancelButton);
	}

	mainPerson.appendChild(circle);
	mainPerson.appendChild(setting);
	mainPerson.appendChild(sound);
	mainPerson.appendChild(anchor);

	circle.appendChild(img);

	setting.appendChild(setting_pin);
	setting.appendChild(setting_dashboard);
	setting.appendChild(setting_close_fullscreen);

	anchor.appendChild(pin);
	anchor.appendChild(mainName);

	pin.appendChild(push_pin);

	var buttonParent = button.parentNode;
	buttonParent.remove();

	main = true;
	checkSmallPeople();
}

function closeMain() {
	if (attendees === 1) {
		return;
	}
	const mainPerson = $id("meet-mainPerson");
	const name = $id("meet-mainPerson-name").textContent;
	const imgsrc = $id("meet-mainPerson-image").getAttribute("src");
	add(name, imgsrc);
	mainPerson.setAttribute("style", "display: none");
	mainPerson.innerHTML = "";
	$id("meet-smallPeople").setAttribute("style", "width: 100%");
	main = false;
	checkSmallPeople();
}

function cancelMain(button) {
	closeMain();
	console.log(main);
	smallArray = $class("meet-smallPerson");
	let cancelPerson = smallArray[smallArray.length - 1];
	cancelPerson.remove();
	attendees -= 1;
	$id("attendees").textContent = attendees;
	//console.log(attendees);
	checkOnlyMyself();
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

function checkSmallPeople() {
	const smallPeople = $id("meet-smallPeople");
	const width = smallPeople.clientWidth;
	const height = smallPeople.clientHeight;
	const number = $class("meet-smallPerson").length;
	let row;
	let onePersonWidth;
	let onePersonHeight;
	if (main === false) {
		if (number <= 6) {
			row = 3;
			onePersonWidth = width / 3.4;
			onePersonHeight = height / 2.5;
		} else if (number <= 12) {
			row = 4;
			onePersonWidth = width / 4.4;
			onePersonHeight = height / 3.5;
		} else if (number <= 15) {
			row = 5;
			onePersonWidth = width / 5.4;
			onePersonHeight = height / 3.5;
		}
	} else {
		onePersonWidth = width / 2.2;
		onePersonHeight = onePersonWidth * 0.8;
	}
	let smallPersonArray = $class("meet-smallPerson");
	let length = smallPersonArray.length;
	for (let i = 0; i < length; i += 1) {
		smallPersonArray[i].setAttribute(
			"style",
			`width: ${onePersonWidth}; height: ${onePersonHeight}`
		);
	}

	mod = length % (main === false ? row : 2);
	if (main === false) {
		for (let j = 0; j < mod; j += 1) {
			smallPersonArray[length - 1 - j].setAttribute(
				"style",
				`width: ${(mod === 1 ? 1.4 : 1.2) * onePersonWidth}; height: ${onePersonHeight}`
			);
		}
	} else {
		for (let j = 0; j < mod; j += 1) {
			smallPersonArray[length - 1 - j].setAttribute(
				"style",
				`width: ${((row - 0.5) / mod) * onePersonWidth}; height: ${onePersonHeight} `
			);
		}
	}
}

function checkOnlyMyself() {
	if (attendees === 1) {
		if (main === false) {
			const button = $class("meet-smallPerson-setting")[0];
			console.log(button);
			addMain(button);
		}
		let smallPeople = $id("meet-smallPeople");
		smallPeople.setAttribute("style", "display: none");
		let mainPerson = $id("meet-mainPerson");
		mainPerson.setAttribute("style", "width: 100%");
		main = true;
	} else {
		if (main === true) {
			let smallPeople = $id("meet-smallPeople");
			smallPeople.setAttribute("style", "display: flex");
			let mainPerson = $id("meet-mainPerson");
			mainPerson.setAttribute("style", `width: 70%`);
		}
	}
}
