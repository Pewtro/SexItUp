/** The names of the busses */
const Bus1 = ["Alperne", []];
const Bus2 = ["Mod fjerne kyster", []];
const listOfBuses = [Bus1, Bus2];

/**
 * 1. The first number in the array is the current amount of people assigned.
 * 2. The second number in the array is the maximum possible amount of people assigned.
 * 3. The third value is the name of the chore or cabin
 * 4. The fourth value is the day the chore is happening
 * 5. The fifth value is the meeting time for the given chore
 * 6. The sixth value is the names of the participants on the given activity
 */
/** Kiosk refill */
let kioskRefillDay1 = [0, 4, "Kiosk Opfyldning", "Fredag", "Hele dagen", []];
let kioskRefillDay2 = [0, 4, "Kiosk Opfyldning", "Lørdag", "Hele dagen", []];
let kioskRefillDay3 = [0, 4, "Kiosk Opfyldning", "Søndag", "Hele dagen", []];

/** Cleaning inside */
let cleaningInsideDay2 = [0, 8, "Rengøring Indendørs", "Lørdag", "Kl. 10.00", []];
let cleaningInsideDay3 = [0, 8, "Rengøring Indendørs", "Søndag", "Kl. 10.00", []];

/** Cleaning outside */
let cleaningOutsideDay2 = [0, 10, "Rengøring Yderområder", "Lørdag", "Kl. 10.00", []];
let cleaningOutsideDay3 = [0, 10, "Rengøring Yderområder", "Søndag", "Kl. 10.00", []];

/** Breakfast */
let breakfastDay2 = [0, 8, "Morgenmad", "Lørdag", "Kl. 10.00", []];
let breakfastDay3 = [0, 8, "Morgenmad", "Søndag", "Kl. 10.00", []];
let breakfastDay4 = [0, 8, "Morgenmad", "Mandag", "Kl. 08:15", []];

/** Lunch dishes */
let dishesLunchDay2 = [0, 10, "Frokost Opvask", "Lørdag", "Efter maden", []];
let dishesLunchDay3 = [0, 10, "Frokost Opvask", "Søndag", "Efter maden", []];

/** Dinner cooking */
let cookingDinnerDay2 = [0, 10, "Aftensmad Tilberedning", "Lørdag", "Kl. 17:00", []];
let cookingDinnerDay3 = [0, 10, "Aftensmad Tilberedning", "Søndag", "Kl. 17:00", []];

/** Dinner dishes */
let dishesDinnerDay2 = [0, 10, "Aftensmad Opvask", "Lørdag", "Efter maden", []];
let dishesDinnerDay3 = [0, 10, "Aftensmad Opvask", "Søndag", "Efter maden", []];

/** Final cleaning */
const finalCleaningKitchen = [0, 15, "Køkken", "Mandag", "09:30", []];
const finalCleaningOutside = [0, 45, "Udenfor", "Mandag", "09:30", []];
const finalCleaningInside = [0, 40, "Indenfor", "Mandag", "09:30", []];

const listKioskRefill = [kioskRefillDay1, kioskRefillDay2, kioskRefillDay3];
const listCleaningInside = [cleaningInsideDay2, cleaningInsideDay3];
const listCleaningOutside = [cleaningOutsideDay2, cleaningOutsideDay3];
const listBreakfast = [breakfastDay2, breakfastDay3, breakfastDay4];
const listDishesLunch = [dishesLunchDay2, dishesLunchDay3];
const listCookingDinner = [cookingDinnerDay2, cookingDinnerDay3];
const listDishesDinner = [dishesDinnerDay2, dishesDinnerDay3];

const listDifferentChores = [kioskRefillDay1, kioskRefillDay2, kioskRefillDay3, cleaningInsideDay2, cleaningInsideDay3, breakfastDay2, breakfastDay3, breakfastDay4, dishesLunchDay2, dishesLunchDay3, cookingDinnerDay2, cookingDinnerDay3, dishesDinnerDay2, dishesDinnerDay3, cleaningOutsideDay2, cleaningOutsideDay3];
const listDifferentFinalCleaning = [finalCleaningKitchen, finalCleaningOutside, finalCleaningInside];
const amountDifferentChores = listDifferentChores.length;
const amountDifferentFinalCleaning = listDifferentFinalCleaning.length;


/** Cabins */
let cabinA1 = [0, 9, "Hytte A1", []];
let cabinA2 = [0, 9, "Hytte A2", []];
let cabinB1 = [0, 9, "Hytte B1", []];
let cabinB2 = [0, 9, "Hytte B2", []];
let cabinC1 = [0, 9, "Hytte C1", []];
let cabinC2 = [0, 9, "Hytte C2", []];
let cabinD1 = [0, 9, "Hytte D1", []];
let cabinD2 = [0, 9, "Hytte D2", []];
let cabinE = [0, 20, "Hytte E", []];
let cabinF = [0, 30, "Hytte F", []];
const listOfMaleCabins = [cabinC1, cabinC2, cabinD1, cabinD2, cabinE, cabinF];
const listOfFemaleCabins = [cabinA1, cabinA2, cabinB1, cabinB2];
const amountOfMaleCabins = listOfMaleCabins.length;
const amountOfFemaleCabins = listOfFemaleCabins.length;

let pinCodeList = [];

function randomise(amount) {
	return Math.floor(Math.random() * amount);
}

function pinCodeGenerator() {
	let participants = JSON.parse(sessionStorage.getItem("Participants"));
	let currentPinCode = 0;
	for (let i = 0; i < participants.length; i++) {
		const minimum = 1000;
		const maximum = 9999;
		currentPinCode = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
		let pinCodeIsUnique = false;
		while (!pinCodeIsUnique) {
			if (pinCodeList.includes(currentPinCode)) {
				if (currentPinCode < 9999) {
					currentPinCode++;
				} else {
					currentPinCode = 1000;
				}
			} else {
				pinCodeIsUnique = true;
				pinCodeList.push(currentPinCode);
			}
		}
		if (pinCodeIsUnique) {
			participants[i].PinCode = currentPinCode.toString();
		}
	}
	console.log(participants);
	sessionStorage.setItem("Participants", JSON.stringify(participants));
}

function distributeBuses() {
	let participants = JSON.parse(sessionStorage.getItem("Participants"));
	for (let i = 0; i < participants.length; i++) {
		if ((i % 2) === 0) {
			participants[i].Bus = Bus1[0];
			Bus1[1].push(participants[i].Name)
		} else {
			participants[i].Bus = Bus2[0];
			Bus2[1].push(participants[i].Name)
		}
	}
	console.log("Distributed all buses successfully, see list below");
	console.log("Buses: ", listOfBuses);
	sessionStorage.setItem("Participants", JSON.stringify(participants));
}

function checkIfAnyAvailableFinalCleaning() {
	let availableFinalCleaning = true;
	let finalCleaningAvailability = [];
	for (let i = 0; i < listDifferentFinalCleaning.length; i++) {
		if (listDifferentFinalCleaning[i][0] < listDifferentFinalCleaning[i][1]) {
			finalCleaningAvailability.push(true);
		} else {
			finalCleaningAvailability.push(false);
		}
	}
	if (finalCleaningAvailability.every((val, i, arr) => val === arr[0]) && finalCleaningAvailability[0] === false) {
		availableFinalCleaning = false;
	}
	return availableFinalCleaning;
}

function distributeFinalCleaning() {
	let participants = JSON.parse(sessionStorage.getItem("Participants"));
	for (let i = 0; i < participants.length; i++) {
		let finalCleaningAssigned = false;
		while (!finalCleaningAssigned && checkIfAnyAvailableFinalCleaning()) {
			const finalCleaningRandomise = randomise(amountDifferentFinalCleaning);
			const chosenFinalCleaning = listDifferentFinalCleaning[finalCleaningRandomise];
			if (chosenFinalCleaning[0] < chosenFinalCleaning[1]) {
				participants[i].FinalCleaning = chosenFinalCleaning[2];
				chosenFinalCleaning[0]++;
				chosenFinalCleaning[5].push(participants[i].Name);
				finalCleaningAssigned = true;
			}
		}
	}
	console.log("Distributed all final cleaning chores successfully, see list below");
	console.log("Final cleaning chores: ", listDifferentFinalCleaning);
	sessionStorage.setItem("Participants", JSON.stringify(participants));
}

function checkOverallFemaleCabinSpace() {
	let availableFemaleCabinSpace = true;
	let femaleCabinAvailability = [];
	for (let i = 0; i < listOfFemaleCabins.length; i++) {
		if (listOfFemaleCabins[i][0] < listOfFemaleCabins[i][1]) {
			femaleCabinAvailability.push(true);
		} else {
			femaleCabinAvailability.push(false);
		}
	}
	if (femaleCabinAvailability.every((val, i, arr) => val === arr[0]) && femaleCabinAvailability[0] === false) {
		availableFemaleCabinSpace = false;
	}
	return availableFemaleCabinSpace;
}

function checkOverallMaleCabinSpace() {
	let availableMaleCabinSpace = true;
	let maleCabinAvailability = [];
	for (let i = 0; i < listOfMaleCabins.length; i++) {
		if (listOfMaleCabins[i][0] < listOfMaleCabins[i][1]) {
			maleCabinAvailability.push(true);
		} else {
			maleCabinAvailability.push(false);
		}
	}
	if (maleCabinAvailability.every((val, i, arr) => val === arr[0]) && maleCabinAvailability[0] === false) {
		availableMaleCabinSpace = false;
	}
	return availableMaleCabinSpace;
}


function distributeCabins() {
	let participants = JSON.parse(sessionStorage.getItem("Participants"));
	for (let i = 0; i < participants.length; i++) {
		let cabinAssigned = false;
		if (participants[i].Sex === "F") {
			if (!checkOverallFemaleCabinSpace()) {
				console.warn("Too many girls, distribute more space");
			}
			while (!cabinAssigned && checkOverallFemaleCabinSpace()) {
				const femaleCabinRandomise = randomise(amountOfFemaleCabins);
				const chosenFemaleCabin = listOfFemaleCabins[femaleCabinRandomise];
				if (chosenFemaleCabin[0] < chosenFemaleCabin[1]) {
					participants[i].Cabin = chosenFemaleCabin[2];
					chosenFemaleCabin[0]++;
					chosenFemaleCabin[3].push(participants[i].Name);
					cabinAssigned = true;
				}
			}
		} else if (participants[i].Sex === "M") {
			if (!checkOverallMaleCabinSpace()) {
				console.warn("Too many boys, distribute more space");
			}
			while (!cabinAssigned && checkOverallMaleCabinSpace()) {
				const maleCabinRandomise = randomise(amountOfMaleCabins);
				const chosenMaleCabin = listOfMaleCabins[maleCabinRandomise];
				if (chosenMaleCabin[0] < chosenMaleCabin[1]) {
					participants[i].Cabin = chosenMaleCabin[2];
					chosenMaleCabin[0]++;
					chosenMaleCabin[3].push(participants[i].Name);
					cabinAssigned = true;
				}
			}
		}
	}
	console.log("Distributed all cabins successfully, see list below");
	console.log("Male cabins: ", listOfMaleCabins);
	console.log("Female cabins: ", listOfFemaleCabins);
	sessionStorage.setItem("Participants", JSON.stringify(participants));
}

function checkIfAnyAvailableChores() {
	let availableChores = true;
	let choreAvailability = [];
	for (let i = 0; i < listDifferentChores.length; i++) {
		if (listDifferentChores[i][0] < listDifferentChores[i][1]) {
			choreAvailability.push(true);
		} else {
			choreAvailability.push(false);
		}
	}
	if (choreAvailability.every((val, i, arr) => val === arr[0]) && choreAvailability[0] === false) {
		availableChores = false;
	}
	return availableChores;
}

function distributeFirstChores() {
	let participants = JSON.parse(sessionStorage.getItem("Participants"));
	for (let i = 0; i < participants.length; i++) {
		let choreAssigned = false;
		if (!checkIfAnyAvailableChores()) {
			console.warn("No chores available!");
		}
		while (!choreAssigned && checkIfAnyAvailableChores()) {
			const choreRandomise = randomise(amountDifferentChores);
			const chosenChore = listDifferentChores[choreRandomise];
			if (chosenChore[0] < chosenChore[1]) {
				participants[i].Chore1 = chosenChore[2];
				participants[i].Chore1Day = chosenChore[3];
				participants[i].Chore1Time = chosenChore[4];
				chosenChore[0]++;
				chosenChore[5].push(participants[i].Name);
				choreAssigned = true;
			}
		}
	}
	console.log("Distributed all chores successfully (FIRST TIME), see list below");
	console.log("Chores: ", listDifferentChores);
	sessionStorage.setItem("Participants", JSON.stringify(participants));
}

function distributeSecondChores() {
	let participants = JSON.parse(sessionStorage.getItem("Participants"));
	for (let i = participants.length - 1; i > 0; i--) {
		let choreAssigned = false;
		if (!checkIfAnyAvailableChores()) {
			console.warn("No chores available! Breaking out!");
			break;
		}
		while (!choreAssigned && checkIfAnyAvailableChores()) {
			for (let j = 0; j < listDifferentChores.length; j++) {
				if (listDifferentChores[j][0] < listDifferentChores[j][1] && listDifferentChores[j][3] !== participants[i].Chore1Day) {
					choreAssigned = true;
					listDifferentChores[j][0]++;
					participants[i].Chore2 = listDifferentChores[j][2];
					participants[i].Chore2Day = listDifferentChores[j][3];
					participants[i].Chore2Time = listDifferentChores[j][4];
					listDifferentChores[j][5].push(participants[i].Name);
				}
			}
			if (!choreAssigned) {
				console.log("Didn't find a fitting new chore for ", participants[i].Name, ". Moving to next");
				choreAssigned = true;
			}
		}
		i -= Math.floor(Math.random() * 3);
	}
	console.log("Distributed all chores successfully (SECOND TIME), see list below");
	console.log("Chores: ", listDifferentChores);
	sessionStorage.setItem("Participants", JSON.stringify(participants));
}

function distributeEverything() {
	distributeCabins();
	distributeBuses();
	distributeFirstChores();
	distributeSecondChores();
	distributeFinalCleaning();
	pinCodeGenerator();
	generateTable();
}



