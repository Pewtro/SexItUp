let fileUploaded = false;
const csvDebug = false;
let k, i;

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
				if (row[k] === "Customer display name") {
					customerDisplayNameIndex = k;
					customerDisplayNameIndexFound = true;
				} else if (row[k] === "Sex") {
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
	csvDebug && console.log(attendeeNames);
	let participants = [];
	for (let j = 1; j < attendeeNames.length; j++) {
		participants.push({
			Name: attendeeNames[j],
			Sex: attendeeSexes[j],
			Bus: '',
			Cabin: '',
			Chore1: '',
			Chore1Day: '',
			Chore1Time: '',
			Chore2: '',
			Chore2Day: '',
			Chore2Time: '',
			FinalCleaning: '',
		});
	}
	console.log("Import successful! Below is a list of the participants:");
	console.log(participants);
	sessionStorage.setItem("Participants", JSON.stringify(participants));
}
