"use strict";
var PandoraBackground = "Pandora/Ground/Entrance";
var PandoraCurrentRoom = null;
var PandoraRoom = [];
var PandoraDirectionList = ["South", "North", "East", "West"];
var PandoraDirectionListFrom = ["North", "South", "West", "East"];
var PandoraSeachMode = false;
var PandoraSeachSquare = null;
var PandoraMessage = null;

/**
 * Prepares a text popup for Pandora's Box
 * @returns {void} - Nothing
 */
function PandoraMsgBox(Text) {
	PandoraMessage = { Timer: CommonTime() + 5000, Text: Text };
}

/**
 * Loads the Pandora's Box screen
 * @returns {void} - Nothing
 */
function PandoraLoad() {
}

/**
 * Runs and draws all Pandora's Box screens
 * @returns {void} - Nothing
 */
function PandoraRun() {

	// Gets the current room & background
	if ((PandoraRoom.length == 0) || (PandoraCurrentRoom == null)) return;
	PandoraBackground = "Pandora/" + PandoraCurrentRoom.Floor + "/" + PandoraCurrentRoom.Background;

	// In search mode
	if (PandoraSeachMode) {
		DrawButton(1885, 885, 90, 90, "", "White", "Icons/Search.png", TextGet("SearchStop"));
		if (PandoraSeachSquare != null) DrawEmptyRect(PandoraSeachSquare.X - 100, PandoraSeachSquare.Y - 100, 200, 200, "Cyan", 3);
		return;
	}

	// Draws up to 4 characters in the room, including the player
	let Pos = 690 - PandoraCurrentRoom.Character.length * 230;
	DrawCharacter(Player, Pos, 0, 1);
	let AllowMove = true;
	for (let C = 0; C < PandoraCurrentRoom.Character.length; C++) {
		DrawCharacter(PandoraCurrentRoom.Character[C], Pos + ((C + 1) * 460), 0, 1);
		if ((PandoraCurrentRoom.Character[C].AllowMove != null) && (PandoraCurrentRoom.Character[C].AllowMove == false)) AllowMove = false;
	}

	// If we allow moving, we draw the paths
	if (AllowMove) {
		for (let P = 0; P < PandoraCurrentRoom.Path.length; P++)
			DrawButton(1885, 25 + P * 115, 90, 90, "", "White", "Icons/" + PandoraCurrentRoom.Direction[P] + ".png", TextGet("Path" + PandoraCurrentRoom.Direction[P]));
		DrawButton(1827, 655, 90, 90, "", (PandoraCurrentRoom.DirectionMap.indexOf("North") >= 0) ? "White" : "Silver", "Icons/North.png", TextGet("DirectionNorth"));
		DrawButton(1770, 770, 90, 90, "", (PandoraCurrentRoom.DirectionMap.indexOf("West") >= 0) ? "White" : "Silver", "Icons/West.png", TextGet("DirectionWest"));
		DrawButton(1885, 770, 90, 90, "", (PandoraCurrentRoom.DirectionMap.indexOf("East") >= 0) ? "White" : "Silver", "Icons/East.png", TextGet("DirectionEast"));
		DrawButton(1827, 885, 90, 90, "", (PandoraCurrentRoom.DirectionMap.indexOf("South") >= 0) ? "White" : "Silver", "Icons/South.png", TextGet("DirectionSouth"));
	}
	
	// If we must draw a message in the middle of the screen
	if ((PandoraMessage != null) && (PandoraMessage.Timer != null) && (PandoraMessage.Text != null) && (PandoraMessage.Timer >= CommonTime())) {
		DrawRect(500, 465, 1000, 70, "black");
		DrawRect(502, 467, 996, 66, "white");
		DrawTextWrap(PandoraMessage.Text, 500, 465, 1000, 70, "black");
	}
		

}

/**
 * Handles clicks in all Pandora's screen
 * @returns {void} - Nothing
 */
function PandoraClick() {

	// Checks if we clicked on the player
	if (PandoraRoom.length == 0) return;
	let Pos = 690 - PandoraCurrentRoom.Character.length * 230;

	// If there's a message running, we do not allow any clicks
	if ((PandoraMessage != null) && (PandoraMessage.Timer != null) && (PandoraMessage.Text != null) && (PandoraMessage.Timer >= CommonTime()))
		return;

	// In search mode, we can click anywhere on the screen
	if (PandoraSeachMode) {
		if (MouseIn(0, 0, 1800, 1000)) {
			PandoraSeachSquare = { X: MouseX, Y: MouseY };
			if ((PandoraCurrentRoom.ItemX != null) && (PandoraCurrentRoom.ItemY != null) && MouseIn(PandoraCurrentRoom.ItemX - 100, PandoraCurrentRoom.ItemY - 100, 200, 200)) {
				InfiltrationTarget.Found = true;
				PandoraSeachMode = false;
				PandoraMsgBox(TextGet("FoundItem").replace("TargetName", InfiltrationTarget.Name));
			}
		}
		if (MouseIn(1885, 885, 90, 90)) PandoraSeachMode = false;
		return;
	}

	// Checks if we clicked on a character
	if (MouseIn(Pos, 0, 500, 1000)) return CharacterSetCurrent(Player);
	let AllowMove = true;
	for (let C = 0; C < PandoraCurrentRoom.Character.length; C++) {
		if (MouseIn(Pos + ((C + 1) * 460), 0, 500, 1000)) return CharacterSetCurrent(PandoraCurrentRoom.Character[C]);
		if ((PandoraCurrentRoom.Character[C].AllowMove != null) && (PandoraCurrentRoom.Character[C].AllowMove == false)) AllowMove = false;
	}

	// If we allow moving, we can switch room
	if (AllowMove) {
		for (let P = 0; P < PandoraCurrentRoom.Path.length; P++)
			if (MouseIn(1900, 25 + P * 115, 90, 90)) {
				if (PandoraCurrentRoom.Path[P].Floor == "Exit") return CommonSetScreen("Room", "Infiltration");
				if (PandoraCurrentRoom.Path[P].Floor == "Search") {
					if ((InfiltrationTarget.Found == null) || (InfiltrationTarget.Found == false)) {
						PandoraSeachSquare = null;
						PandoraSeachMode = true;
					} else PandoraMsgBox(TextGet("AlreadyFound").replace("TargetName", InfiltrationTarget.Name));
					return;
				}
				return PandoraCurrentRoom = PandoraCurrentRoom.Path[P];
			}
		if (MouseIn(1827, 655, 90, 90) && (PandoraCurrentRoom.DirectionMap.indexOf("North") >= 0)) return PandoraCurrentRoom = PandoraCurrentRoom.PathMap[PandoraCurrentRoom.DirectionMap.indexOf("North")];
		if (MouseIn(1770, 770, 90, 90) && (PandoraCurrentRoom.DirectionMap.indexOf("West") >= 0)) return PandoraCurrentRoom = PandoraCurrentRoom.PathMap[PandoraCurrentRoom.DirectionMap.indexOf("West")];
		if (MouseIn(1885, 770, 90, 90) && (PandoraCurrentRoom.DirectionMap.indexOf("East") >= 0)) return PandoraCurrentRoom = PandoraCurrentRoom.PathMap[PandoraCurrentRoom.DirectionMap.indexOf("East")];
		if (MouseIn(1827, 885, 90, 90) && (PandoraCurrentRoom.DirectionMap.indexOf("South") >= 0)) return PandoraCurrentRoom = PandoraCurrentRoom.PathMap[PandoraCurrentRoom.DirectionMap.indexOf("South")];
	}

}

// Generates X rooms linked on the entry room
function PandoraGenerateRoom(EntryRoom, DirectionFrom, RoomLevel) {
	
	// The higher the room level, the less paths there will be
	let PathCount = 0;
	if (EntryRoom.Background.indexOf("Entrance") == 0) PathCount = 2 + Math.floor(Math.random() * 3);
	if (EntryRoom.Background.indexOf("Tunnel") == 0) PathCount = 1;
	if (EntryRoom.Background.indexOf("Fork") == 0) PathCount = 1 + Math.floor(Math.random() * 3);
	
	// Generates all paths
	let Path = [];
	for (let P = 0; P < PathCount; P++) {
		
		// Generates a valid path that's not already used
		let Continue = false;
		let PathNum;
		while (!Continue) {
			PathNum = Math.floor(Math.random() * 4);
			if (EntryRoom.Background.indexOf("Tunnel") == 0) PathNum = PandoraDirectionListFrom.indexOf(DirectionFrom);
			Continue = ((PandoraDirectionList.indexOf(DirectionFrom) != PathNum) && (Path.indexOf(PathNum) < 0));
		}
		Path.push(PathNum);
		
		// Generates a background for the room, tries not to repeat it
		let RoomBack;
		Continue = false;
		while (!Continue) {
			RoomBack = "Cell";
			if (RoomLevel == 1) RoomBack = (Math.random() >= 0.4) ? "Fork" : "Tunnel";
			if ((RoomLevel == 2) && (Math.random() >= 0.25)) RoomBack = (Math.random() >= 0.55) ? "Fork" : "Tunnel";
			if ((RoomLevel == 3) && (Math.random() >= 0.5)) RoomBack = (Math.random() >= 0.7) ? "Fork" : "Tunnel";
			if ((RoomLevel == 4) && (Math.random() >= 0.75)) RoomBack = (Math.random() >= 0.85) ? "Fork" : "Tunnel";
			RoomBack = RoomBack + Math.floor(Math.random() * 6);
			Continue = true;
			for (let R = 0; R < PandoraRoom.length; R++)
				if ((PandoraRoom[R].Background == RoomBack) && (Math.random() >= 0.25)) {
					Continue = false;
					break;
				}
		}
		
		// Creates the room
		let Room = {};
		Room.Character = [];
		Room.Floor = EntryRoom.Floor;
		Room.Background = RoomBack;
		Room.Path = [];
		Room.PathMap = [];
		Room.PathMap.push(EntryRoom);
		Room.Direction = [];
		Room.DirectionMap = [];
		Room.DirectionMap.push(PandoraDirectionList[PathNum]);
		PandoraRoom.push(Room);
		EntryRoom.PathMap.push(Room);
		EntryRoom.DirectionMap.push(PandoraDirectionListFrom[PathNum]);
		
		// Creates sub-rooms if it's not a dead end room
		if (RoomBack.indexOf("Cell") == 0) {
			if ((InfiltrationMission == "Retrieve") || (InfiltrationMission == "Steal")) {
				let SearchRoom = { Floor: "Search" };
				Room.Path.push(SearchRoom);
				Room.Direction.push("Search");
			}
		} else PandoraGenerateRoom(Room, PandoraDirectionListFrom[PathNum], RoomLevel + 1);

	}	
}


/**
 * Loads the Pandora's Box screen
 * @param {string} FloorName - The name of the floor in which we must generate rooms
 * @param {object} Entry - The room object that's leading to that floor
 * @returns {void} - Nothing
 */
function PandoraGenerateFloor(FloorName, EntryRoom, DirectionFrom, DirectionTo) {
	
	// Always create the same entrance room
	let Room = {};
	Room.Character = [];
	Room.Floor = FloorName;
	Room.Background = "Entrance";
	Room.Path = [];
	Room.Path.push(EntryRoom);
	Room.PathMap = [];
	Room.Direction = [];
	Room.Direction.push(DirectionFrom);
	Room.DirectionMap = [];
	PandoraRoom.push(Room);
	EntryRoom.Path.push(Room);
	EntryRoom.Direction.push(DirectionTo);
	
	// Starts the room generation
	PandoraGenerateRoom(Room, DirectionFrom, 1);

}

/**
 * Clears all the rooms and generates the main hall with an introduction maid
 * @returns {void} - Nothing
 */
function PandoraBuildMainHall() {
	
	// Creates the ground entrance room
	PandoraRoom = [];
	let Room = {};
	let Char = CharacterLoadNPC("NPC_Pandora_EntranceMaid");
	Char.AllowItem = false;
	Char.AllowMove = false;
	Room.Character = [];
	Room.Character.push(Char);
	Room.Floor = "Ground";
	Room.Background = "Entrance";
	Room.Path = [];
	Room.PathMap = [];
	PandoraRoom.push(Room);
	
	// Creates the exit room in the entrance
	let ExitRoom = { Floor: "Exit" };
	Room.Path.push(ExitRoom);
	Room.Direction = [];
	Room.Direction.push("Exit");
	Room.DirectionMap = [];
	
	// Generates the floors and sets the starting room
	PandoraGenerateFloor("Underground", Room, "StairsUp", "StairsDown");
	PandoraCurrentRoom = Room;

	// Picks a random cell room for the final target
	let RoomFound = false;
	while (!RoomFound) {
		Room = PandoraRoom[Math.floor(Math.random() * PandoraRoom.length)];
		if (Room.Background.indexOf("Cell") == 0) {
			if ((InfiltrationMission == "Retrieve") || (InfiltrationMission == "Steal")) {
				Room.ItemX = 50 + Math.floor(Math.random() * 1700);
				Room.ItemY = 50 + Math.floor(Math.random() * 900);
			}
			RoomFound = true;
		}
	}
	
	
}

/**
 * Removes the current character from the room and deletes that NPC from the array
 * @returns {void} - Nothing
 */
function PandoraRemoveCurrentCharacter() {
	for (let C = 0; C < PandoraCurrentRoom.Character.length; C++)
		if (PandoraCurrentRoom.Character[C].AccountName == CurrentCharacter.AccountName) {
			PandoraCurrentRoom.Character.splice(C, 1);
			break;
		}
	CharacterDelete(CurrentCharacter.AccountName);
	DialogLeave();
}