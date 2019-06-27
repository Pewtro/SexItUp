let fileUploaded = false;
const debug = false;

function getAsText(fileToRead) {
	const reader = new FileReader();
	reader.readAsText(fileToRead);
	reader.onload = loadHandler;
	reader.error = errorHandler;
}


function handleFile(file) {
	if (window.FileReader) {
		//Only take the first index, since we're only interested in allowing 1 file to be uploaded.
		getAsText(file[0]);
		fileUploaded = true;
	} else {
		alert("FileReader not supported in browser");
	}
}

function loadHandler(event) {
	const csv = event.target.result;
	processData(csv);
}

function errorHandler(event) {
	if (event.target.error.name === "NotReadableError") {
		alert("Can't read file!")
	}
}

function processData(csv) {
	const allTextLines = csv.split(/\r\n|\n/);
	let customerDisplayNameIndex;
	let customerDisplayNameIndexFound = false;
	let customerSexIndex;
	let customerSexIndexFound = false;
	let attendeeNames = [];
	let attendeeSexes = [];
	for (let i = 0; i < allTextLines.length; i++) {
		const row = allTextLines[i].split(',');
		let col = [];
		for (let k = 0; k < row.length; k++) {
			if (!customerDisplayNameIndexFound || !customerSexIndexFound) {
				if (row[k] === "\"Customer display name\"") {
					customerDisplayNameIndex = k;
					customerDisplayNameIndexFound = true;
				} else if (row[k] === "\"Sex\"") {
					customerSexIndex = k;
					customerSexIndexFound = true;
				}
			}
			const textToPush = row[k].replace(/["]/g, '');
			col.push(textToPush);
		}
		attendeeNames.push(col[customerDisplayNameIndex]);
		attendeeSexes.push(col[customerSexIndex]);
	}
	debug && console.log(attendeeNames);
	let participants = [];
	for (let j = 1; j < attendeeNames.length; j++) {
		participants.push({
			Name: attendeeNames[j],
			Sex: attendeeSexes[j],
			Bus: '',
			Cabin: '',
			Chore1: '',
			Chore1Day: '',
			Chore2: '',
			Chore2Day: '',
			FinalCleaning: '',
		});
	}
	debug && console.log(participants);
	sessionStorage.setItem("Participants", JSON.stringify(participants));

	generatetabel(participants);

}

function cleardata() {
	sessionStorage.clear();
}

function generatetabel(participants) {

	for(let i = 0; i<participants.length; i++){
		console.log(participants[i].Name);
	}

	let div = document.getElementById("tablecontent");
	var table = document.createElement("table");

	div.appendChild(table);

	table.style.width = "100%";

	let headers = ["Navn", "Bus", "Cabin", "Chore & Day", "Chore 2 & Day", "Final Cleaning"];

	var row = table.insertRow(0);
	var cell;

	for(let i = 0; i<headers.length; i++){
		var th = document.createElement("th");
		th.style.border = "1px solid #ddd";
		th.style.padding = "8px";
		th.innerText = headers[i];
		row.appendChild(th);
	}

	var rowdata;

	for(var j = 0; j<participants.length; j++){
		var row = table.insertRow(-1);

		for(let h = 0; h<headers.length; h++){
			var td = document.createElement("td");

			let value;

			switch (h) {
				case 0: value = participants[j].Name;
					break;
				case 1: value = participants[j].Bus;
					break;
				case 2: value = participants[j].Cabin;
					break;
				case 3: value = participants[j].Chore1 + " og " + participants[j].Chore1Day;
					break;
				case 4: value = participants[j].Chore2 + " og " + participants[j].Chore2Day;
					break;
				case 5: value = participants[j].FinalCleaning;
					break;

			}

			td.innerText = value;

			td.style.border = "1px solid #ddd";
			td.style.padding = "8px";

			row.appendChild(td);
		}

	}

}
