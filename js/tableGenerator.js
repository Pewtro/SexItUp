function generateTable() {
	let participants = JSON.parse(sessionStorage.getItem("Participants"));

	const div = document.getElementById("tableContent");
	const table = document.createElement("table");

	div.appendChild(table);

	table.style.width = "100%";

	let headers = ["Name", "Bus", "Cabin", "Chore & Day", "Chore 2 & Day", "Final Cleaning", "Pin Code"];

	const row = table.insertRow(0);

	for (let i = 0; i < headers.length; i++) {
		let th = document.createElement("th");
		th.style.border = "1px solid #ddd";
		th.style.padding = "8px";
		th.innerText = headers[i];
		row.appendChild(th);
	}

	for (let j = 0; j < participants.length; j++) {
		const row = table.insertRow(-1);

		for (let h = 0; h < headers.length; h++) {
			let td = document.createElement("td");

			let value;

			switch (h) {
				case 0:
					value = participants[j].Name;
					break;
				case 1:
					value = participants[j].Bus;
					break;
				case 2:
					value = participants[j].Cabin;
					break;
				case 3:
					value = participants[j].Chore1 + " - " + participants[j].Chore1Day;
					break;
				case 4:
					value = participants[j].Chore2 + " - " + participants[j].Chore2Day;
					break;
				case 5:
					value = participants[j].FinalCleaning;
					break;
				case 6:
					value = participants[j].PinCode;
					break;
			}

			td.innerText = value;
			td.style.border = "1px solid #ddd";
			td.style.padding = "8px";

			row.appendChild(td);
		}

	}

}

function clearData() {
	sessionStorage.clear();
}