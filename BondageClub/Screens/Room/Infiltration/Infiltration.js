"use strict";
var InfiltrationBackground = "Infiltration";
var InfiltrationSupervisor = null;
var InfiltrationDifficulty = 0;
var InfiltrationMission = "";
//var InfiltrationMissionType = ["Rescue", "Kidnap", "Retrieve", "Steal"];
var InfiltrationMissionType = ["Retrieve", "Steal"];
var InfiltrationObjectType = ["USBKey", "BDSMPainting", "GoldCollar", "GeneralLedger", "SilverVibrator", "DiamondRing", "SignedPhoto"];
var InfiltrationTarget = {};

/**
 * Returns TRUE if the mission is a success and can be completed
 * @returns {boolean} - TRUE if successful
 */
function InfiltrationMissionSuccess() {
	return ((InfiltrationTarget != null) && (InfiltrationTarget.Found != null) && (InfiltrationTarget.Found == true));
}

/**
 * Loads the infiltration screen by generating the supervisor.
 * @returns {void} - Nothing
 */
function InfiltrationLoad() {
	if (InfiltrationSupervisor == null) {
		InfiltrationSupervisor = CharacterLoadNPC("NPC_Infiltration_Supervisor");
		InfiltrationSupervisor.AllowItem = false;
		CharacterNaked(InfiltrationSupervisor);
		InventoryWear(InfiltrationSupervisor, "ReverseBunnySuit", "Suit", "#400000");
		InventoryWear(InfiltrationSupervisor, "ReverseBunnySuit", "SuitLower", "#400000");
		InventoryWear(InfiltrationSupervisor, "FishnetBikini1", "Bra", "#222222");
		InventoryWear(InfiltrationSupervisor, "BondageDress1", "Cloth");
		InventoryWear(InfiltrationSupervisor, "LatexAnkleShoes", "Shoes", "#222222");
	}
	if (Player.Infiltration == null) Player.Infiltration = {};
	if (Player.Infiltration.Perks == null) Player.Infiltration.Perks = "";
}

/**
 * Runs and draws the infiltration screen.  Shows the player and the opponent.
 * @returns {void} - Nothing
 */
function InfiltrationRun() {
	DrawCharacter(Player, 500, 0, 1);
	DrawCharacter(InfiltrationSupervisor, 1000, 0, 1);
	DrawButton(1885, 25, 90, 90, "", "White", "Icons/Exit.png", TextGet("Exit"));
	DrawButton(1885, 145, 90, 90, "", "White", "Icons/Character.png", TextGet("Profile"));
	DrawButton(1885, 265, 90, 90, "", "White", "Icons/Infiltration.png", TextGet("Perks"));
}

/**
 * Handles clicks in the infiltration screen
 * @returns {void} - Nothing
 */
function InfiltrationClick() {
	if (MouseIn(1000, 0, 500, 1000)) CharacterSetCurrent(InfiltrationSupervisor);
	if (MouseIn(1885, 25, 90, 90) && Player.CanWalk()) CommonSetScreen("Room", "MainHall");
	if (MouseIn(1885, 145, 90, 90)) InformationSheetLoadCharacter(Player);
	if (MouseIn(1885, 265, 90, 90)) CommonSetScreen("Room", "InfiltrationPerks");
}

/**
 * Sets the infiltration mission challenge difficulty
 * @returns {void} - Nothing
 */
function InfiltrationSelectChallenge(Difficulty) {
	InfiltrationDifficulty = Difficulty;
}

/**
 * Prepares the mission and presents it to the player
 * @returns {void} - Nothing
 */
function InfiltrationPrepareMission() {
	InfiltrationMission	= CommonRandomItemFromList(InfiltrationMission, InfiltrationMissionType);
	if ((InfiltrationMission == "Rescue") || (InfiltrationMission == "Kidnap")) {
		let C = {};
		CharacterRandomName(C);
		InfiltrationTarget.Type = "NPC";
		InfiltrationTarget.Name = C.Name;
	} else {
		InfiltrationTarget.Type = CommonRandomItemFromList(InfiltrationTarget.Type, InfiltrationObjectType);
		InfiltrationTarget.Name = DialogFind(InfiltrationSupervisor, "Object" + InfiltrationTarget.Type);
	}
	InfiltrationTarget.Found = false;
	InfiltrationSupervisor.Stage = InfiltrationMission;
	InfiltrationSupervisor.CurrentDialog = DialogFind(InfiltrationSupervisor, InfiltrationMission + "Intro");
	InfiltrationSupervisor.CurrentDialog = InfiltrationSupervisor.CurrentDialog.replace("TargetName", InfiltrationTarget.Name);
}

/**
 * Starts the mission and jumps to Pandora's box
 * @returns {void} - Nothing
 */
function InfiltrationStartMission() {
	DialogLeave();
	CommonSetScreen("Room", "Pandora");
	PandoraBuildMainHall();
}

/**
 * Returns to Pandora's box with the same stats and room layout
 * @returns {void} - Nothing
 */
function InfiltrationReturnMission() {
	DialogLeave();
	CommonSetScreen("Room", "Pandora");
}

/**
 * When the player completes the mission, she gains
 * @returns {void} - Nothing
 */
function InfiltrationCompleteMission() {
	SkillProgress("Infiltration", 60);
	CharacterChangeMoney(Player, 15);
}