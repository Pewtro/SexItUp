function genPDF() {
	const data = JSON.parse(sessionStorage.getItem("Participants"));
	// You'll need to make your image into a Data URL
	// Use http://dataurl.net/#dataurlmaker
	const doc = new jsPDF();
	let counter = 0;

	doc.setFont("courier", "bold");
	doc.setTextColor(0, 0, 0);
	/** This function iterates through all the data stored in sessionStorage with the information about the individual participants */
	for (let i = 0; i < data.length; i++) {
		counter++;
		if (counter === 1) {
			doc.setFontSize(10);
			doc.addImage(imgData, 'JPEG', 15, 30, 180, 80);
			doc.text(33, 93, data[i].Name);
			doc.text(33, 81, 'DIT-LAB');
			doc.text(87, 81, data[i].Bus);
			doc.text(150, 57, data[i].Cabin);
			doc.text(150, 71, 'TJANSER:');
			doc.text(150, 91, 'SLUTRENGØRING:');
			doc.text(150, 95, data[i].FinalCleaning);
			doc.setFontSize(8);
			doc.text(150, 75, data[i].Chore1);
			doc.text(150, 79, data[i].Chore1Day);
			doc.text(150, 83, data[i].Chore2);
			doc.text(150, 87, data[i].Chore2Day);
		} else if (counter === 2) {
			doc.setFontSize(10);
			doc.addImage(imgData, 'JPEG', 15, 105, 180, 80);
			doc.text(33, 168, data[i].Name);
			doc.text(33, 156, 'DIT-LAB');
			doc.text(87, 156, data[i].Bus);
			doc.text(150, 132, data[i].Cabin);
			doc.text(150, 146, 'TJANSER:');
			doc.text(150, 166, 'SLUTRENGØRING:');
			doc.text(150, 170, data[i].FinalCleaning);
			doc.setFontSize(8);
			doc.text(150, 150, data[i].Chore1);
			doc.text(150, 154, data[i].Chore1Day);
			doc.text(150, 158, data[i].Chore2);
			doc.text(150, 162, data[i].Chore2Day);
		} else if (counter === 3) {
			doc.setFontSize(10);
			doc.addImage(imgData, 'JPEG', 15, 190, 180, 80);
			doc.text(33, 253, data[i].Name);
			doc.text(33, 241, 'DIT-LAB');
			doc.text(87, 241, data[i].Bus);
			doc.text(150, 217, data[i].Cabin);
			doc.text(150, 231, 'TJANSER:');
			doc.text(150, 251, 'SLUTRENGØRING:');
			doc.text(150, 255, data[i].FinalCleaning);
			doc.setFontSize(8);
			doc.text(150, 235, data[i].Chore1);
			doc.text(150, 239, data[i].Chore1Day);
			doc.text(150, 243, data[i].Chore2);
			doc.text(150, 247, data[i].Chore2Day);
			counter = 0;
			doc.addPage();
		}
	}
	doc.save("GDL.pdf");
}

/** Generates a list with all information about the participants
 * Includes:
 * Busses DONE
 * Cabins DONE
 * Chores 1 and 2 (Including DAY and TIME?)
 * FinalCleaning
 */
function genList() {
	const doc = new jsPDF();
	doc.setFont("courier", "bold");
	doc.setTextColor(0, 0, 0);
	/** Create pages for the list */
	let horizontal = 5;
	let vertical = 10;
	//Chores
	//Kiosk
	doc.setFontSize(30);
	doc.text(horizontal, vertical, listKioskRefill[0][2]);
	for (let i = 0; i < listKioskRefill.length; i++) {
		vertical += 10;
		doc.setFontSize(20);
		doc.text(horizontal, vertical, listKioskRefill[i][3] + " - Mødetid: " + listKioskRefill[i][4]);
		doc.setFontSize(10);
		for (let j = 0; j < listKioskRefill[i][5].length; j++) {
			if ((j % 2) === 0) {
				vertical += 10;
				horizontal = 5;
				doc.text(horizontal, vertical, listKioskRefill[i][5][j])
			} else {
				horizontal = 120;
				doc.text(horizontal, vertical, listKioskRefill[i][5][j])
			}
		}
		horizontal = 5;
		vertical += 10;
	}
	//Cleaning Inside
	doc.addPage();
	doc.setFontSize(30);
	vertical = 10;
	doc.text(horizontal, vertical, listCleaningInside[0][2]);
	for (let i = 0; i < listCleaningInside.length; i++) {
		vertical += 10;
		doc.setFontSize(20);
		doc.text(horizontal, vertical, listCleaningInside[i][3] + " - Mødetid: " + listCleaningInside[i][4]);
		doc.setFontSize(10);
		for (let j = 0; j < listCleaningInside[i][5].length; j++) {
			if ((j % 2) === 0) {
				vertical += 10;
				horizontal = 5;
				doc.text(horizontal, vertical, listCleaningInside[i][5][j])
			} else {
				horizontal = 120;
				doc.text(horizontal, vertical, listCleaningInside[i][5][j])
			}
		}
		horizontal = 5;
		vertical += 10;
	}
	//Cleaning Outside
	doc.addPage();
	doc.setFontSize(30);
	vertical = 10;
	doc.text(horizontal, vertical, listCleaningOutside[0][2]);
	for (let i = 0; i < listCleaningOutside.length; i++) {
		vertical += 10;
		doc.setFontSize(20);
		doc.text(horizontal, vertical, listCleaningOutside[i][3] + " - Mødetid: " + listCleaningOutside[i][4]);
		doc.setFontSize(10);
		for (let j = 0; j < listCleaningOutside[i][5].length; j++) {
			if ((j % 2) === 0) {
				vertical += 10;
				horizontal = 5;
				doc.text(horizontal, vertical, listCleaningOutside[i][5][j])
			} else {
				horizontal = 120;
				doc.text(horizontal, vertical, listCleaningOutside[i][5][j])
			}
		}
		horizontal = 5;
		vertical += 10;
	}
	//Breakfast
	doc.addPage();
	doc.setFontSize(30);
	vertical = 10;
	doc.text(horizontal, vertical, listBreakfast[0][2]);
	for (let i = 0; i < listCleaningOutside.length; i++) {
		vertical += 10;
		doc.setFontSize(20);
		doc.text(horizontal, vertical, listBreakfast[i][3] + " - Mødetid: " + listBreakfast[i][4]);
		doc.setFontSize(10);
		for (let j = 0; j < listBreakfast[i][5].length; j++) {
			if ((j % 2) === 0) {
				vertical += 10;
				horizontal = 5;
				doc.text(horizontal, vertical, listBreakfast[i][5][j])
			} else {
				horizontal = 120;
				doc.text(horizontal, vertical, listBreakfast[i][5][j])
			}
		}
		horizontal = 5;
		vertical += 10;
	}
	//Dishes Lunch
	doc.addPage();
	doc.setFontSize(30);
	vertical = 10;
	doc.text(horizontal, vertical, listDishesLunch[0][2]);
	for (let i = 0; i < listDishesLunch.length; i++) {
		vertical += 10;
		doc.setFontSize(20);
		doc.text(horizontal, vertical, listDishesLunch[i][3] + " - Mødetid: " + listDishesLunch[i][4]);
		doc.setFontSize(10);
		for (let j = 0; j < listDishesLunch[i][5].length; j++) {
			if ((j % 2) === 0) {
				vertical += 10;
				horizontal = 5;
				doc.text(horizontal, vertical, listDishesLunch[i][5][j])
			} else {
				horizontal = 120;
				doc.text(horizontal, vertical, listDishesLunch[i][5][j])
			}
		}
		horizontal = 5;
		vertical += 10;
	}
	//Cooking Dinner
	doc.addPage();
	doc.setFontSize(30);
	vertical = 10;
	doc.text(horizontal, vertical, listCookingDinner[0][2]);
	for (let i = 0; i < listCookingDinner.length; i++) {
		vertical += 10;
		doc.setFontSize(20);
		doc.text(horizontal, vertical, listCookingDinner[i][3] + " - Mødetid: " + listCookingDinner[i][4]);
		doc.setFontSize(10);
		for (let j = 0; j < listCookingDinner[i][5].length; j++) {
			if ((j % 2) === 0) {
				vertical += 10;
				horizontal = 5;
				doc.text(horizontal, vertical, listCookingDinner[i][5][j])
			} else {
				horizontal = 120;
				doc.text(horizontal, vertical, listCookingDinner[i][5][j])
			}
		}
		horizontal = 5;
		vertical += 10;
	}
	//Dinner Dishes
	doc.addPage();
	doc.setFontSize(30);
	vertical = 10;
	doc.text(horizontal, vertical, listDishesDinner[0][2]);
	for (let i = 0; i < listDishesDinner.length; i++) {
		vertical += 10;
		doc.setFontSize(20);
		doc.text(horizontal, vertical, listDishesDinner[i][3] + " - Mødetid: " + listDishesDinner[i][4]);
		doc.setFontSize(10);
		for (let j = 0; j < listDishesDinner[i][5].length; j++) {
			if ((j % 2) === 0) {
				vertical += 10;
				horizontal = 5;
				doc.text(horizontal, vertical, listDishesDinner[i][5][j])
			} else {
				horizontal = 120;
				doc.text(horizontal, vertical, listDishesDinner[i][5][j])
			}
		}
		horizontal = 5;
		vertical += 10;
	}
	//FinalCleaning
	doc.addPage();
	vertical = 10;
	for (let i = 0; i < listDifferentFinalCleaning.length; i++) {
		doc.setFontSize(30);
		doc.text(horizontal, vertical, "Slutrengøring " + listDifferentFinalCleaning[i][2]);
		vertical += 10;
		doc.setFontSize(20);
		doc.text(horizontal, vertical, "Mødetid: " + listDifferentFinalCleaning[i][4]);
		doc.setFontSize(10);
		for (let j = 0; j < listDifferentFinalCleaning[i][5].length; j++) {
			if ((j % 2) === 0) {
				vertical += 10;
				horizontal = 5;
				doc.text(horizontal, vertical, listDifferentFinalCleaning[i][5][j])
			} else {
				horizontal = 120;
				doc.text(horizontal, vertical, listDifferentFinalCleaning[i][5][j])
			}
		}
		doc.addPage();
		vertical = 10;
		horizontal = 5;
	}
	//Male Cabins
	for (let i = 0; i < listOfMaleCabins.length; i++) {
		if (i !== 0) {
			if ((i % 4) === 0) {
				doc.addPage();
				horizontal = 5;
				vertical = 10;
			} else if ((i % 2) === 0) {
				vertical = 10;
				horizontal = 120;
			} else {
				vertical = 130;
			}
		}
		doc.setFontSize(30);
		doc.text(horizontal, vertical, listOfMaleCabins[i][2]);
		doc.setFontSize(10);
		for (let j = 0; j < listOfMaleCabins[i][3].length; j++) {
			vertical += 10;
			doc.text(horizontal, vertical, listOfMaleCabins[i][3][j])
		}
	}
	/** NEW PAGE */
	doc.addPage();

	//Female Cabins
	horizontal = 5;
	vertical = 10;
	doc.setFontSize(30);
	doc.text(horizontal, vertical, cabinE[2]);
	doc.setFontSize(10);
	for (let i = 0; i < cabinE[3].length; i++) {
		vertical += 10;
		doc.text(horizontal, vertical, cabinE[3][i])
	}

	/** Buses */
	/** NEW PAGE */
	doc.addPage();
//Bus 1
	horizontal = 5;
	vertical = 10;
	doc.setFontSize(30);
	doc.text(horizontal, vertical, Bus1[0] + ' - ' + Bus1[1].length + ' passagerer');
	doc.setFontSize(10);
	for (let i = 0; i < Bus1[1].length; i++) {
		if ((i % 2) === 0) {
			vertical += 10;
			horizontal = 5;
			doc.text(horizontal, vertical, Bus1[1][i])
		} else {
			horizontal = 120;
			doc.text(horizontal, vertical, Bus1[1][i])
		}
	}
	/** NEW PAGE */
	doc.addPage();
//Bus 2
	horizontal = 5;
	vertical = 10;
	doc.setFontSize(30);
	doc.text(horizontal, vertical, Bus2[0] + ' - ' + Bus2[1].length + ' passagerer');
	doc.setFontSize(10);
	for (let i = 0; i < Bus2[1].length; i++) {
		if ((i % 2) === 0) {
			vertical += 10;
			horizontal = 5;
			doc.text(horizontal, vertical, Bus2[1][i])
		} else {
			horizontal = 120;
			doc.text(horizontal, vertical, Bus2[1][i])
		}
	}
	doc.save("GDLListe.pdf");
}

/** Use this to generate a ticket for one person */
function genSpecificTicket() {
	const doc = new jsPDF();
	doc.setFont("courier", "bold");
	doc.setFontSize(10);
	doc.addImage(imgData, 'JPEG', 15, 30, 180, 80);
	doc.text(33, 83, 'Fake Mister Fake');
	doc.text(33, 71, 'DIT-LAB');
	doc.text(87, 71, 'The Future');
	doc.text(150, 47, 'Cabin E');
	doc.text(150, 61, 'TJANSER:');
	doc.text(150, 81, 'Cleaning:');
	doc.text(150, 85, 'Kitchen');
	doc.setFontSize(8);
	doc.text(150, 65, 'Cooking Dinner');
	doc.text(150, 69, 'Monday');
	doc.text(150, 73, '');
	doc.text(150, 77, '');
	doc.save("Specifik_billet.pdf");
}