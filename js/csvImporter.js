let fileUploaded = false;
const debug = false;

/** The names of the busses */
const Bus1 = "Fremtiden";
const Bus2 = "Fortiden";

/* Det første tal er nuværende antal på den givne tjans/hytte, det andet tal er maks */
/** Kiosk opfyldning tjanser*/
let kioskOpfyldningLordag = [0, 4, "Kiosk Opfyldning", "Lørdag"];
let kioskOpfyldningSondag = [0, 4, "Kiosk Opfyldning", "Søndag"];
let kioskOpfyldningMandag = [0, 4, "Kiosk Opfyldning", "Mandag"];

/** Rengøring indendørs*/
let rengoringIndendorsSondag = [0, 7, "Rengøring Indendørs", "Søndag"];
let rengoringIndendorsMandag = [0, 7, "Rengøring Indendørs", "Mandag"];
let rengoringIndendorsTirsdag = [0, 7, "Rengøring Indendørs", "Tirsdag"];

/** Morgenmad */
let morgenmadSondag = [0, 6, "Morgenmad", "Søndag"];
let morgenmadMandag = [0, 6, "Morgenmad", "Mandag"];
let morgenmadTirsdag = [0, 6, "Morgenmad", "Tirsdag"];

/** Frokost opvask*/
let opvaskFrokostSondag = [0, 6, "Frokost Opvask", "Søndag"];
let opvaskFrokostMandag = [0, 6, "Frokost Opvask", "Mandag"];

/** Aftensmad tilberedning */
let aftensmadTilberedningSondag = [0, 10, "Aftensmad Tilberedning", "Søndag"];
let aftensmadTilberedningMandag = [0, 10, "Aftensmad Tilberedning", "Mandag"];

/** Aftensmad opvask */
let aftensmadOpvaskSondag = [0, 10, "Aftensmad Opvask", "Søndag"];
let aftensmadOpvaskMandag = [0, 10, "Aftensmad Opvask", "Mandag"];

/** Rengøring udenfor*/
let rengoringUdenforSondag = [0, 10, "Rengøring Yderområder", "Søndag"];
let rengoringUdenforMandag = [0, 10, "Rengøring Yderområder", "Mandag"];

/** Slut rengøring */
const slutRengoringKokken = [0, 15, "Køkken"];
const slutRengoringUdenfor = [0, 35, "Udenfor"];
const slutRengoringIndenfor = [0, 35, "Indenfor"];

const listeAfTjanser = ['aftensmadOpvaskSøndag', 'aftensmadOpvaskMandag', 'kioskOpfyldningLørdag', 'kioskOpfyldningSøndag', 'kioskOpfyldningMandag', 'rengøringIndendørsSøndag', 'rengøringIndendørsMandag', 'morgenmadSøndag', 'morgenmadMandag', 'morgenmadTirsdag', 'opvaskFrokostSøndag', 'opvaskFrokostMandag', 'aftensmadTilberedningSøndag', 'aftensmadTilberedningMandag', 'rengøringUdenforSøndag', 'rengøringUdenforMandag'];
const listeAfSlutrengoring = ['slutRengøringKøkken', 'slutRengøringUdenfor', 'slutRengøringIndenfor'];
const antalTjanser = listeAfTjanser.length;
const antalSlutTjanser = listeAfSlutrengoring.length;

/** TODO: Automate remainingtjanser count to rely on listeAfTjanser */
let remainingTjanser = 123;

/** Hytter */
let HytteA1 = [0, 9, "Hytte A1"];
let HytteA2 = [0, 9, "Hytte A2"];
let HytteB1 = [0, 9, "Hytte B1"];
let HytteB2 = [0, 9, "Hytte B2"];
let HytteC1 = [0, 9, "Hytte C1"];
let HytteC2 = [0, 9, "Hytte C2"];
let HytteD1 = [0, 9, "Hytte D1"];
let HytteD2 = [0, 9, "Hytte D2"];
const HyttePiger = [0, 20, "Hytte E"];
const listeAfDrengeHytter = ['Hytte A1', 'Hytte A2', 'Hytte B1', 'Hytte B2', 'Hytte C1', 'Hytte C2', 'Hytte D1', 'Hytte D2'];

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
				case 3: value = participants[j].Chore1 + " - " + participants[j].Chore1Day;
					break;
				case 4: value = participants[j].Chore2 + " - " + participants[j].Chore2Day;
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

function givechores(){
	var participants = JSON.parse(sessionStorage.getItem("Participants"));

	participants = fordelbusser(participants);

	participants = fordeltjans1(participants);

	//participants = fordeltjans2(participants);

	generatetabel(participants);

	alert("overlevet");

	console.log(participants);

	console.log(remainingTjanser);
}

function fordelbusser(participants){

	for (i = 0; i < participants.length; i++) {
		if ((i%2)==0) {
			participants[i].Bus = Bus1;
		} else {
			participants[i].Bus = Bus2;
		}
	}

	return participants;
}

function fordeltjans1(participants) {

	const listeAfTjanser = ['aftensmadOpvaskSøndag', 'aftensmadOpvaskMandag', 'kioskOpfyldningLørdag', 'kioskOpfyldningSøndag', 'kioskOpfyldningMandag', 'rengøringIndendørsSøndag', 'rengøringIndendørsMandag', 'morgenmadSøndag', 'morgenmadMandag', 'morgenmadTirsdag', 'opvaskFrokostSøndag', 'opvaskFrokostMandag', 'aftensmadTilberedningSøndag', 'aftensmadTilberedningMandag', 'rengøringUdenforSøndag', 'rengøringUdenforMandag'];
	const antalTjanser = listeAfTjanser.length;

	for (i = 0; i < participants.length; i++) {
		if (remainingTjanser === 0) {
			break;
		}
		const tjanseRandomizer = Math.floor(Math.random() * antalTjanser);
		const valgtTjans = listeAfTjanser[tjanseRandomizer];
		if (tjekTjans(valgtTjans)) {
			opdaterTjanser(valgtTjans, i, 1, participants);
		} else {
			let tjansAssigned = false;
			let t = tjanseRandomizer;
			while (!tjansAssigned) {
				t++;
				if (t >= antalTjanser) {
					t = 0;
				}
				let tjansFound = listeAfTjanser[t];
				if (tjekTjans(tjansFound)) {
					opdaterTjanser(tjansFound, i, 1, participants);
					tjansAssigned = true;
				} else {
					tjansAssigned = false;
				}
			}
		}
	}

	return participants;
}

function tjekTjans(tjanseNavn) {

	switch (tjanseNavn) {

		case "kioskOpfyldningLørdag": return kioskOpfyldningLordag[0] < kioskOpfyldningLordag[1];
			break;
		case "kioskOpfyldningSøndag": return kioskOpfyldningSondag[0] < kioskOpfyldningSondag[1];
			break;
		case "kioskOpfyldningMandag": return kioskOpfyldningMandag[0] < kioskOpfyldningMandag[1];
			break;
		case "rengøringIndendørsSøndag": return rengoringIndendorsSondag[0] < rengoringIndendorsSondag[1];
			break;
		case "rengøringIndendørsMandag": return rengoringIndendorsMandag[0] < rengoringIndendorsMandag[1];
			break;
		case "rengøringIndendørsTirsdag": return rengoringIndendorsTirsdag[0] < rengoringIndendorsTirsdag[1];
			break;
		case "morgenmadSøndag": return morgenmadSondag[0] < morgenmadSondag[1];
			break;
		case "morgenmadMandag": return morgenmadMandag[0] < morgenmadMandag[1];
			break;
		case "morgenmadTirsdag": return morgenmadTirsdag[0] < morgenmadTirsdag[1];
			break;
		case "aftensmadOpvaskSøndag": return aftensmadOpvaskSondag[0] < aftensmadOpvaskSondag[1];
			break;
		case "aftensmadOpvaskMandag": return aftensmadOpvaskMandag[0] < aftensmadOpvaskMandag[1];
			break;
		case "opvaskFrokostSøndag": return opvaskFrokostSondag[0] < opvaskFrokostSondag[1];
			break;
		case "opvaskFrokostMandag": return opvaskFrokostMandag[0] < opvaskFrokostMandag[1];
			break;
		case "aftensmadTilberedningSøndag": return aftensmadTilberedningSondag[0] < aftensmadTilberedningSondag[1];
			break;
		case "aftensmadTilberedningMandag": return aftensmadTilberedningMandag[0] < aftensmadTilberedningMandag[1];
			break;
		case "rengøringUdenforSøndag": return rengoringUdenforSondag[0] < rengoringUdenforSondag[1];
			break;
		case "rengøringUdenforMandag": return rengoringUdenforMandag[0] < rengoringUdenforMandag[1];
			break;

	}
}

function opdaterTjanser(tjanseNavn, i, tjansNr, participants) {
	let fundenTjans = null;
	let tjansDag = null;
	if (tjanseNavn === "kioskOpfyldningLørdag") {
		kioskOpfyldningLordag[0]++;
		fundenTjans = kioskOpfyldningLordag[2];
		tjansDag = kioskOpfyldningLordag[3];
	} else if (tjanseNavn === "kioskOpfyldningSøndag") {
		kioskOpfyldningSondag[0]++;
		fundenTjans = kioskOpfyldningSondag[2];
		tjansDag = kioskOpfyldningSondag[3];
	} else if (tjanseNavn === "kioskOpfyldningMandag") {
		kioskOpfyldningMandag[0]++;
		fundenTjans = kioskOpfyldningMandag[2];
		tjansDag = kioskOpfyldningMandag[3];
	} else if (tjanseNavn === "rengøringIndendørsSøndag") {
		rengoringIndendorsSondag[0]++;
		fundenTjans = rengoringUdenforSondag[2];
		tjansDag = rengoringUdenforSondag[3];
	} else if (tjanseNavn === "rengøringIndendørsMandag") {
		rengoringIndendorsMandag[0]++;
		fundenTjans = rengoringUdenforMandag[2];
		tjansDag = rengoringIndendorsMandag[3];
	} else if (tjanseNavn === "rengøringIndendørsTirsdag") {
		rengoringIndendorsTirsdag[0]++;
		fundenTjans = rengoringIndendorsTirsdag[2];
		tjansDag = rengoringIndendorsTirsdag[3];
	} else if (tjanseNavn === "morgenmadSøndag") {
		morgenmadSondag[0]++;
		fundenTjans = morgenmadSondag[2];
		tjansDag = morgenmadSondag[3];
	} else if (tjanseNavn === "morgenmadMandag") {
		morgenmadMandag[0]++;
		fundenTjans = morgenmadMandag[2];
		tjansDag = morgenmadMandag[3];
	} else if (tjanseNavn === "morgenmadTirsdag") {
		morgenmadTirsdag[0]++;
		fundenTjans = morgenmadTirsdag[2];
		tjansDag = morgenmadTirsdag[3];
	} else if (tjanseNavn === "opvaskFrokostSøndag") {
		opvaskFrokostSondag[0]++;
		fundenTjans = opvaskFrokostSondag[2];
		tjansDag = opvaskFrokostSondag[3];
	} else if (tjanseNavn === "opvaskFrokostMandag") {
		opvaskFrokostMandag[0]++;
		fundenTjans = opvaskFrokostMandag[2];
		tjansDag = opvaskFrokostMandag[3];
	} else if (tjanseNavn === "aftensmadOpvaskSøndag") {
		aftensmadOpvaskSondag[0]++;
		fundenTjans = aftensmadOpvaskSondag[2];
		tjansDag = aftensmadOpvaskSondag[3];
	} else if (tjanseNavn === "aftensmadOpvaskMandag") {
		aftensmadOpvaskMandag[0]++;
		fundenTjans = aftensmadOpvaskMandag[2];
		tjansDag = aftensmadOpvaskMandag[3];
	} else if (tjanseNavn === "aftensmadTilberedningSøndag") {
		aftensmadTilberedningSondag[0]++;
		fundenTjans = aftensmadTilberedningSondag[2];
		tjansDag = aftensmadTilberedningSondag[3];
	} else if (tjanseNavn === "aftensmadTilberedningMandag") {
		aftensmadTilberedningMandag[0]++;
		fundenTjans = aftensmadTilberedningMandag[2];
		tjansDag = aftensmadTilberedningMandag[3];
	} else if (tjanseNavn === "rengøringUdenforSøndag") {
		rengoringUdenforSondag[0]++;
		fundenTjans = rengoringUdenforSondag[2];
		tjansDag = rengoringUdenforSondag[3];
	} else if (tjanseNavn === "rengøringUdenforMandag") {
		rengoringUdenforMandag[0]++;
		fundenTjans = rengoringUdenforMandag[2];
		tjansDag = rengoringUdenforMandag[3];
	}
	if (tjansNr === 1) {
		participants[i].Chore1 = fundenTjans;
		participants[i].Chore1Day = tjansDag;
	} else {
		participants[i].Chore2 = fundenTjans;
		participants[i].Chore2Day = tjansDag;
	}
	remainingTjanser -= 1;

	return participants;

}

function fordeltjans2(participants){
	var count = remainingTjanser;
	for (i = 0; i < count; i++) {
		if (remainingTjanser === 0) {
			console.log("We had to break the loop with ", remainingTjanser, " tjanser remaining");
			return participants;
		}
		const tjanseRandomizer = Math.floor(Math.random() * antalTjanser);
		const valgtTjans = listeAfTjanser[tjanseRandomizer];
		if (tjekTjans(valgtTjans)) {
			opdaterTjanser(valgtTjans, i, 2, participants);
		} else {
			let tjansAssigned = false;
			let t = tjanseRandomizer;
			while (!tjansAssigned) {
				t++;
				if (t >= antalTjanser) {
					t = 0;
				}
				let tjansFound = listeAfTjanser[t];
				if (tjekTjans(tjansFound)) {
					opdaterTjanser(tjansFound, i, 2, participants);
					tjansAssigned = true;
				} else {
					tjansAssigned = false;
				}
			}
		}
		console.log(remainingTjanser);
	}

	return participants;
}
