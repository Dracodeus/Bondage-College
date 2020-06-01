"use strict";
var DailyJobBackground = "MainHall";
var DailyJobOpponent = null;

function DailyJobPlayerFullRestrain() { CharacterFullRandomRestrain(Player, "ALL") };

// Loads the daily job room screen
function DailyJobLoad() {
	if (DailyJobOpponent == null) {
		DailyJobOpponent = CharacterLoadNPC("NPC_DailyJob_Opponent");
		DailyJobOpponent.AllowItem = false;
	}
}

// Run the daily job room
function DailyJobRun() {
}

// When the user clicks in the daily job room
function DailyJobClick() {
}

// When the kidnap daily job fight starts
function DailyJobKidnapStart() {
	KidnapStart(DailyJobOpponent, "MainHallDark", 7, "DailyJobKidnapEnd()");
}

// When the kidnap daily job fight ends
function DailyJobKidnapEnd() {
	SkillProgress("Willpower", ((Player.KidnapMaxWillpower - Player.KidnapWillpower) + (DailyJobOpponent.KidnapMaxWillpower - DailyJobOpponent.KidnapWillpower)) * 2);
	DailyJobOpponent.Stage = (KidnapVictory) ? "100" : "200";
	if (KidnapVictory) CharacterRelease(Player);
	else CharacterRelease(DailyJobOpponent);
	if (KidnapVictory) DailyJobOpponent.AllowItem = true;
	CommonSetScreen("Room", "DailyJob");
	CharacterSetCurrent(DailyJobOpponent);
	DailyJobOpponent.CurrentDialog = DialogFind(DailyJobOpponent, (KidnapVictory) ? "KidnapVictory" : "KidnapDefeat");
}

// When the kidnap mission succeed, we go back to the main hall
function DailyJobKidnapSuccess() {
	CommonSetScreen("Room", "MainHall");
	CurrentCharacter = null;
	IntroductionMaid.Stage = "432";
	IntroductionJobCount = 0;
}

// When the kidnap mission fails, we go back to the main hall and allows it to restart later
function DailyJobKidnapFail() {
	CommonSetScreen("Room", "MainHall");
	DailyJobOpponent.Stage = "10";
	CurrentCharacter = null;
	DialogChangeReputation("Dominant", -1);
}