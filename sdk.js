$(document).ready(() => {

	/*
	 * TODO: 
	 ** 1. Initial index.html with link to Guide.html and SexItUp.html on github pages
	 * 2. Create possibility to upload CSV file: https://www.youtube.com/watch?v=ZZncFax8yNY
	 * 	2.1. Ensure that participants variable is populated with the information and saved in localStorage or sessionStorage
	 * 	2.2. Create button to read/write from/to localStorage/sessionStorage if necessary
	 * 	2.3. Update .	gitignore to not upload the real data .csv, but to maintain the fake.csv
	 * 3. Create a reset button to remove all information 
	 * 4. Populate a table with the read information and have it accessible only through SexItUp page -- separate page? or modal?
	 * 5. Refactor individual distribution modules to english and better code
	 * 	5.1. Cabins
	 * 	5.2. Buses
	 * 	5.3. Final Cleaning
	 * 	5.4. Chore 1 and 2 + Associated days
	 * 		5.4.1. Ensure that it cannot distribute chores on the same days
	 * 6. Style everything somewhat alright
	 * 7. Ask people to break it with fake data csv import
	 */

	const debug = false;

	/** The names of the busses */
	const Bus1 = "Fremtiden";
	const Bus2 = "Fortiden";
	/** First participant is allocated to bus number one by default */
	let busNr = 1;

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
	let remainingTjanser = 4 + 4 + 4 + 7 + 7 + 7 + 6 + 6 + 6 + 6 + 6 + 10 + 10 + 10 + 10 + 10 + 10;

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

	function opdaterHytter(hytteNavn) {
		if (hytteNavn === "Hytte B1") {
			HytteB1[0]++;
		} else if (hytteNavn === "Hytte B2") {
			HytteB2[0]++;
		} else if (hytteNavn === "Hytte C1") {
			HytteC1[0]++;
		} else if (hytteNavn === "Hytte C2") {
			HytteC2[0]++;
		} else if (hytteNavn === "Hytte D1") {
			HytteD1[0]++;
		} else if (hytteNavn === "Hytte D2") {
			HytteD2[0]++;
		} else if (hytteNavn === "Hytte A1") {
			HytteA1[0]++;
		} else if (hytteNavn === "Hytte A2") {
			HytteA2[0]++;
		}
	}

	function tjekHytte(hytteNavn) {
		if (hytteNavn === "Hytte B1") {
			return HytteB1[0] < HytteB1[1];
		} else if (hytteNavn === "Hytte B2") {
			return HytteB2[0] < HytteB2[1];
		} else if (hytteNavn === "Hytte C1") {
			return HytteC1[0] < HytteC1[1];
		} else if (hytteNavn === "Hytte C2") {
			return HytteC2[0] < HytteC2[1];
		} else if (hytteNavn === "Hytte D1") {
			return HytteD1[0] < HytteD1[1];
		} else if (hytteNavn === "Hytte D2") {
			return HytteD2[0] < HytteD2[1];
		} else if (hytteNavn === "Hytte A1") {
			return HytteA1[0] < HytteA1[1];
		} else if (hytteNavn === "Hytte A2") {
			return HytteA2[0] < HytteA2[1];
		}
	}

	/** Hytte fordeling */
	$("#FordelHytter").click(() => {
		const participants = JSON.parse(sessionStorage.getItem("Participants"));
		console.log(participants);
		const antalDrengeHytter = listeAfDrengeHytter.length;
		for (i = 0; i < participants.length; i++) {
			if (participants[i].Sex === "K") {
				if (HyttePiger[0] < HyttePiger[1]) {
					participants[i].Cabin = HyttePiger[2];
					HyttePiger[0] += 1;
				} else {
					console.warn("Too many girls")
				}
			} else if (participants[i].Sex === "M") {
				const randomizer = Math.floor(Math.random() * antalDrengeHytter);
				const valgtHytte = listeAfDrengeHytter[randomizer];
				if (tjekHytte(valgtHytte)) {
					participants[i].Cabin = valgtHytte;
					opdaterHytter(valgtHytte)
				} else {
					let hytteAssigned = false;
					k = randomizer;
					while (!hytteAssigned) {
						k++;
						if (k >= antalDrengeHytter) {
							k = 0;
						}
						let hytteFound = listeAfDrengeHytter[k];
						if (tjekHytte(hytteFound)) {
							participants[i].Hytte = hytteFound;
							opdaterHytter(hytteFound);
							hytteAssigned = true;
						} else {
							hytteAssigned = false;
						}
					}
				}
			}
		}
		console.log("Session storage updated with cabin distribution");
		sessionStorage.setItem("Participants", JSON.stringify(participants));
	});

	function opdaterTjanser(tjanseNavn, i, tjansNr) {
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
			participants[i].Tjans1 = fundenTjans;
			participants[i].Tjansdag = tjansDag;
		} else {
			participants[i].Tjans2 = fundenTjans;
			participants[i].Tjans2dag = tjansDag;
		}
		remainingTjanser -= 1;
	}

	function tjekTjans(tjanseNavn) {
		if (tjanseNavn === "kioskOpfyldningLørdag") {
			return kioskOpfyldningLordag[0] < kioskOpfyldningLordag[1];
		} else if (tjanseNavn === "kioskOpfyldningSøndag") {
			return kioskOpfyldningSondag[0] < kioskOpfyldningSondag[1];
		} else if (tjanseNavn === "kioskOpfyldningMandag") {
			return kioskOpfyldningMandag[0] < kioskOpfyldningMandag[1];
		} else if (tjanseNavn === "rengøringIndendørsSøndag") {
			return rengoringIndendorsSondag[0] < rengoringIndendorsSondag[1];
		} else if (tjanseNavn === "rengøringIndendørsMandag") {
			return rengoringIndendorsMandag[0] < rengoringIndendorsMandag[1];
		} else if (tjanseNavn === "rengøringIndendørsTirsdag") {
			return rengoringIndendorsTirsdag[0] < rengoringIndendorsTirsdag[1];
		} else if (tjanseNavn === "morgenmadSøndag") {
			return morgenmadSondag[0] < morgenmadSondag[1];
		} else if (tjanseNavn === "morgenmadMandag") {
			return morgenmadMandag[0] < morgenmadMandag[1];
		} else if (tjanseNavn === "morgenmadTirsdag") {
			return morgenmadTirsdag[0] < morgenmadTirsdag[1];
		} else if (tjanseNavn === "aftensmadOpvaskSøndag") {
			return aftensmadOpvaskSondag[0] < aftensmadOpvaskSondag[1];
		} else if (tjanseNavn === "aftensmadOpvaskMandag") {
			return aftensmadOpvaskMandag[0] < aftensmadOpvaskMandag[1];
		} else if (tjanseNavn === "opvaskFrokostSøndag") {
			return opvaskFrokostSondag[0] < opvaskFrokostSondag[1];
		} else if (tjanseNavn === "opvaskFrokostMandag") {
			return opvaskFrokostMandag[0] < opvaskFrokostMandag[1];
		} else if (tjanseNavn === "aftensmadTilberedningSøndag") {
			return aftensmadTilberedningSondag[0] < aftensmadTilberedningSondag[1];
		} else if (tjanseNavn === "aftensmadTilberedningMandag") {
			return aftensmadTilberedningMandag[0] < aftensmadTilberedningMandag[1];
		} else if (tjanseNavn === "rengøringUdenforSøndag") {
			return rengoringUdenforSondag[0] < rengoringUdenforSondag[1];
		} else if (tjanseNavn === "rengøringUdenforMandag") {
			return rengoringUdenforMandag[0] < rengoringUdenforMandag[1];
		}
	}

	/** Tjanse fordeling */
	$("#FordelTjanser").click(() => {
		for (i = 0; i < participants.length; i++) {
			if (remainingTjanser === 0) {
				break;
			}
			const tjanseRandomizer = Math.floor(Math.random() * antalTjanser);
			const valgtTjans = listeAfTjanser[tjanseRandomizer];
			if (tjekTjans(valgtTjans)) {
				opdaterTjanser(valgtTjans, i, 1);
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
						opdaterTjanser(tjansFound, i, 1);
						tjansAssigned = true;
					} else {
						tjansAssigned = false;
					}
				}
			}
		}
	});

	/** Tjanse2 fordeling */
	$("#FordelTjanserTo").click(() => {
		for (i = 0; i < participants.length; i++) {
			if (remainingTjanser === 0) {
				console.log("We had to break the loop with ", remainingTjanser, " tjanser remaining");
				break;
			}
			const tjanseRandomizer = Math.floor(Math.random() * antalTjanser);
			const valgtTjans = listeAfTjanser[tjanseRandomizer];
			if (tjekTjans(valgtTjans)) {
				opdaterTjanser(valgtTjans, i, 2);
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
						opdaterTjanser(tjansFound, i, 2);
						tjansAssigned = true;
					} else {
						tjansAssigned = false;
					}
				}
			}
		}
	});

	function opdaterSlutTjanser(tjanseNavn, i) {
		let fundenSlutTjans = null;
		if (tjanseNavn === "slutRengøringIndenfor") {
			slutRengoringIndenfor[0]++;
			fundenSlutTjans = slutRengoringIndenfor[2];
		} else if (tjanseNavn === "slutRengøringUdenfor") {
			slutRengoringUdenfor[0]++;
			fundenSlutTjans = slutRengoringUdenfor[2];
		} else if (tjanseNavn === "slutRengøringKøkken") {
			slutRengoringKokken[0]++;
			fundenSlutTjans = slutRengoringKokken[2];
		}
		participants[i].Slutrengoring = fundenSlutTjans;
	}

	function tjekSlutTjans(tjanseNavn) {
		if (tjanseNavn === "slutRengøringIndenfor") {
			return slutRengoringIndenfor[0] < slutRengoringIndenfor[1];
		} else if (tjanseNavn === "slutRengøringUdenfor") {
			return slutRengoringUdenfor[0] < slutRengoringUdenfor[1];
		} else if (tjanseNavn === "slutRengøringKøkken") {
			return slutRengoringKokken[0] < slutRengoringKokken[1];
		}
	}

	/** Fordeling af slutrengøring */
	$("#FordelSlutrengøring").click(() => {
		for (i = 0; i < participants.length; i++) {
			const slutTjanseRandomizer = Math.floor(Math.random() * antalSlutTjanser);
			const valgtSlutTjans = listeAfSlutrengoring[slutTjanseRandomizer];
			if (tjekSlutTjans(valgtSlutTjans)) {
				opdaterSlutTjanser(valgtSlutTjans, i);
			} else {
				let slutTjansAssigned = false;
				let st = slutTjanseRandomizer;
				while (!slutTjansAssigned) {
					st++;
					if (st >= antalSlutTjanser) {
						st = 0;
					}
					let slutTjansFound = listeAfSlutrengoring[st];
					if (tjekSlutTjans(slutTjansFound)) {
						opdaterSlutTjanser(slutTjansFound, i);
						slutTjansAssigned = true;
					} else {
						slutTjansAssigned = false;
					}
				}
			}
		}
	});

	/** Fordeling i busserne */
	$("#FordelBusserne").click(() => {
		for (i = 0; i < participants.length; i++) {
			if (busNr === 1) {
				participants[i].Bus = Bus1;
				busNr += 1;
			} else {
				participants[i].Bus = Bus2;
				busNr = 1;
			}
		}
	});

	$("#Log").click(() => {
		console.log(participants);
		console.log(remainingTjanser);
		console.log(opvaskFrokostMandag);
	});

	$("#localStorage").click(() => {
		sessionStorage.setItem("Participants", JSON.stringify(participants));
	});
});
