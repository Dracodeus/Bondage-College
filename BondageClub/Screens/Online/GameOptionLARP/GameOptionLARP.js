"use strict";
var GameOptionLARPBackground = "Sheet";
var GameOptionLARPClassList = ["Matron", "Seducer", "Trickster", "Servant", "Artist", "Protector"];
var GameOptionLARPTeamList = ["None", "Red", "Green", "Blue", "Yellow", "Cyan", "Purple", "Orange", "White", "Gray", "Black"];

// Draws the LARP class/team icon of a character
function GameOptionLARPDrawIcon(C, X, Y, Zoom) {
	if ((C != null) && (C.LARP != null) && (C.LARP.Class != null) && (C.LARP.Team != null) && (C.LARP.Team != "None"))
		DrawImageZoomCanvas("Icons/LARP/" + C.LARP.Class + C.LARP.Team + ".png", MainCanvas, 0, 0, 100, 100, X, Y, 100 * Zoom, 100 * Zoom);
}

// When the screens loads
function GameOptionLARPLoad() {

}

// When the screen runs
function GameOptionLARPRun() {

	// Draw the character, text and buttons
	DrawCharacter(Player, 50, 50, 0.9);
	MainCanvas.textAlign = "left";
	DrawText(TextGet("Title"), 550, 125, "Black", "Gray");
	DrawText(TextGet("SelectClass"), 550, 225, "Black", "Gray");
	DrawText(TextGet("SelectTeam"), 550, 325, "Black", "Gray");
	MainCanvas.textAlign = "center";
	DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
	DrawBackNextButton(900, 193, 400, 64, TextGet("Class" + Player.LARP.Class), "White", "", () => "", () => "");
	DrawBackNextButton(900, 293, 400, 64, TextGet("Color" + Player.LARP.Team), "White", "", () => "", () => "");
	GameOptionLARPDrawIcon(Player, 1000, 450, 2);

}

// When the player clicks in the chat Admin screen
function GameOptionLARPClick() {

	// When the user exits
	if ((MouseX >= 1815) && (MouseX < 1905) && (MouseY >= 75) && (MouseY < 165)) GameOptionLARPExit();

	// When the user selects a new class
	if ((MouseX >= 900) && (MouseX < 1300) && (MouseY >= 193) && (MouseY < 257)) {
		if (MouseX <= 1100) Player.LARP.Class = (GameOptionLARPClassList.indexOf(Player.LARP.Class) <= 0) ? GameOptionLARPClassList[GameOptionLARPClassList.length - 1] : GameOptionLARPClassList[GameOptionLARPClassList.indexOf(Player.LARP.Class) - 1];
		else Player.LARP.Class = (GameOptionLARPClassList.indexOf(Player.LARP.Class) >= GameOptionLARPClassList.length - 1) ? GameOptionLARPClassList[0] : GameOptionLARPClassList[GameOptionLARPClassList.indexOf(Player.LARP.Class) + 1];
	}
	
	// When the user selects a new team
	if ((MouseX >= 900) && (MouseX < 1300) && (MouseY >= 293) && (MouseY < 357)) {
		if (MouseX <= 1100) Player.LARP.Team = (GameOptionLARPTeamList.indexOf(Player.LARP.Team) <= 0) ? GameOptionLARPTeamList[GameOptionLARPTeamList.length - 1] : GameOptionLARPTeamList[GameOptionLARPTeamList.indexOf(Player.LARP.Team) - 1];
		else Player.LARP.Team = (GameOptionLARPTeamList.indexOf(Player.LARP.Team) >= GameOptionLARPTeamList.length - 1) ? GameOptionLARPTeamList[0] : GameOptionLARPTeamList[GameOptionLARPTeamList.indexOf(Player.LARP.Team) + 1];
	}
	
}

// When the user exit from this screen
function GameOptionLARPExit() {
	CommonSetScreen("Online", "ChatRoom");
}