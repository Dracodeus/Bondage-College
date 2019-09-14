"use strict";
var AsylumMeetingBackground = "AsylumMeeting";
var AsylumMeetingPatientLeft = null;
var AsylumMeetingPatientRight = null;

// Returns TRUE if specific dialog conditions are met
function AsylumEntranceCanReleasePlayer() { return (Player.IsRestrained() && !AsylumMeetingPatientLeft.IsRestrained() && (LogValue("Committed", "Asylum") >= CurrentTime)) }
function AsylumEntranceCannotReleasePlayer() { return (Player.IsRestrained() && (AsylumMeetingPatientLeft.IsRestrained() || (LogValue("Committed", "Asylum") < CurrentTime))) }

// Loads the room and it's patients
function AsylumMeetingLoad() {
	if (AsylumMeetingPatientLeft == null) {
		AsylumMeetingPatientLeft = CharacterLoadNPC("NPC_AsylumEntrance_PatientLeft");
		AsylumEntranceWearPatientClothes(AsylumMeetingPatientLeft);
		AsylumMeetingPatientLeft.AllowItem = false;
		AsylumMeetingPatientLeft.RunAway = false;
		InventoryWear(AsylumMeetingPatientLeft, "Beret1", "Hat", "#BB0000");
	}
	if (AsylumMeetingPatientRight == null) {
		AsylumMeetingPatientRight = CharacterLoadNPC("NPC_AsylumEntrance_PatientRight");
		AsylumEntranceWearPatientClothes(AsylumMeetingPatientRight);
		InventoryWear(AsylumMeetingPatientRight, "SlaveCollar", "ItemNeck");
		InventoryWear(AsylumMeetingPatientRight, "StraitJacket", "ItemArms");
		InventoryWear(AsylumMeetingPatientRight, "SmallBlindfold", "ItemHead");
		InventoryWear(AsylumMeetingPatientRight, "MuzzleGag", "ItemMouth");
	}
}

// Runs the room
function AsylumMeetingRun() {
	if (!AsylumMeetingPatientLeft.RunAway) DrawCharacter(AsylumMeetingPatientLeft, 250, 0, 1);
	DrawCharacter(Player, 750, 0, 1);
	DrawCharacter(AsylumMeetingPatientRight, 1250, 0, 1);
	if (Player.CanWalk()) DrawButton(1885, 25, 90, 90, "", "White", "Icons/Exit.png");
	DrawButton(1885, 145, 90, 90, "", "White", "Icons/Character.png");
}

// When the user clicks in the room
function AsylumMeetingClick() {
	if ((MouseX >= 250) && (MouseX < 750) && (MouseY >= 0) && (MouseY < 1000) && !AsylumMeetingPatientLeft.RunAway) CharacterSetCurrent(AsylumMeetingPatientLeft);
	if ((MouseX >= 750) && (MouseX < 1250) && (MouseY >= 0) && (MouseY < 1000)) CharacterSetCurrent(Player);
	if ((MouseX >= 1250) && (MouseX < 1750) && (MouseY >= 0) && (MouseY < 1000)) CharacterSetCurrent(AsylumMeetingPatientRight);
	if ((MouseX >= 1885) && (MouseX < 1975) && (MouseY >= 25) && (MouseY < 115) && Player.CanWalk()) CommonSetScreen("Room", "AsylumEntrance");
	if ((MouseX >= 1885) && (MouseX < 1975) && (MouseY >= 145) && (MouseY < 235)) InformationSheetLoadCharacter(Player);
}

// When the player smokes with the patient
function AsylumMeetingSmoke() {
	CharacterSetFacialExpression(Player, "Blush", "Low");
	TimerInventoryRemoveSet(Player, "Blush", 15);	
	CharacterSetFacialExpression(Player, "Eyebrows", "Soft");
	TimerInventoryRemoveSet(Player, "Eyebrows", 15);
	CharacterSetFacialExpression(AsylumMeetingPatientLeft, "Blush", "Low");
	TimerInventoryRemoveSet(AsylumMeetingPatientLeft, "Blush", 15);	
	CharacterSetFacialExpression(AsylumMeetingPatientLeft, "Eyebrows", "Soft");
	TimerInventoryRemoveSet(AsylumMeetingPatientLeft, "Eyebrows", 15);
	CharacterChangeMoney(Player, -1);
}

// When the player buys a vibrating wand from the patient
function AsylumMeetingBuyVibratingWand() {
	InventoryAdd(Player, "VibratingWand", "ItemVulva");
	CharacterChangeMoney(Player, -80);
	DialogChangeReputation("Asylum", -5);
}

// When the player gets released for money
function AsylumMeetingReleaseForMoney() {
	CharacterRelease(Player);
	CharacterChangeMoney(Player, -10);
	DialogChangeReputation("Dominant", -1);
}

// When the girl on the left runs away
function AsylumMeetingRunAway(RepChange) {
	DialogChangeReputation("Asylum", RepChange);
	DialogLeave();
	AsylumMeetingPatientLeft.RunAway = true;
}