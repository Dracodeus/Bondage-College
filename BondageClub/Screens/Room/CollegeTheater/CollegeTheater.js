"use strict";
var CollegeTheaterBackground = "CollegeTheater";
var CollegeTheaterJulia = null;
var CollegeTheaterJuliaLove = 0;

// Returns TRUE if the dialog option should be shown
function CollegeTheaterCanInviteToPrivateRoom() { return (LogQuery("RentRoom", "PrivateRoom") && (PrivateCharacter.length < PrivateCharacterMax)) }
function CollegeTheaterJuliaLoveIs(LoveLevel) { return (CollegeTheaterJuliaLove >= parseInt(LoveLevel)) }
function CollegeTheaterCanChooseRole() { return ((ReputationGet("Dominant") > -30) && (ReputationGet("Dominant") < 30)) }

// Sets Julia in her full theater clothes
function CollegeTheaterJuliaClothes() {
	CharacterNaked(CollegeTheaterJulia);
	InventoryWear(CollegeTheaterJulia, "Yukata1", "Cloth", "#993333");
	InventoryWear(CollegeTheaterJulia, "PussyDark1", "Pussy", "#e86e37");
	InventoryWear(CollegeTheaterJulia, "Eyes3", "Eyes", "#f85e27");
	InventoryWear(CollegeTheaterJulia, "Mouth1", "Mouth", "Default");
	InventoryWear(CollegeTheaterJulia, "H0990", "Height", "Default");
	InventoryWear(CollegeTheaterJulia, "XLarge", "BodyUpper", "White");
	InventoryWear(CollegeTheaterJulia, "XLarge", "BodyLower", "White");
	InventoryWear(CollegeTheaterJulia, "Default", "Hands", "White");
	InventoryWear(CollegeTheaterJulia, "HairBack5", "HairBack", "#e86e37");
	InventoryWear(CollegeTheaterJulia, "HairFront6", "HairFront", "#e86e37");
	InventoryWear(CollegeTheaterJulia, "OuvertPerl1", "Bra", "#BB0000");
	InventoryWear(CollegeTheaterJulia, "Panties11", "Panties", "#BB0000");
	InventoryWear(CollegeTheaterJulia, "Pantyhose1", "Socks", "Default");
	InventoryWear(CollegeTheaterJulia, "Sandals", "Shoes", "Default");
}

// Generates Julia
function CollegeTheaterLoad() {

	// Generates a full Julia model based on the Bondage College template
	if (CollegeTheaterJulia == null) {

		// Do not generate her if she's already in the private room
		if (PrivateCharacter.length > 1)
			for (var P = 1; P < PrivateCharacter.length; P++)
				if (PrivateCharacter[P].Name == "Julia")
					return;
		
		// Generates the model
		CollegeTheaterJulia = CharacterLoadNPC("NPC_CollegeTheater_Julia");
		CollegeTheaterJulia.AllowItem = false;
		CollegeTheaterJulia.Name = "Julia";
		CollegeTheaterJuliaClothes();
		CharacterRefresh(CollegeTheaterJulia);
		
	}

}

// Runs the room (shows the player and Julia)
function CollegeTheaterRun() {
	DrawCharacter(Player, 500, 0, 1);
	if (CollegeTheaterJulia != null) DrawCharacter(CollegeTheaterJulia, 1000, 0, 1);
	DrawButton(1885, 25, 90, 90, "", Player.CanWalk() ? "White" : "Pink", "Icons/Exit.png", TextGet("Exit"));
	DrawButton(1885, 145, 90, 90, "", "White", "Icons/Character.png", TextGet("Profile"));
}

// When the user clicks in the room
function CollegeTheaterClick() {
	if ((MouseX >= 500) && (MouseX < 1000) && (MouseY >= 0) && (MouseY < 1000)) CharacterSetCurrent(Player);
	if ((MouseX >= 1000) && (MouseX < 1500) && (MouseY >= 0) && (MouseY < 1000) && (CollegeTheaterJulia != null)) CharacterSetCurrent(CollegeTheaterJulia);
	if ((MouseX >= 1885) && (MouseX < 1975) && (MouseY >= 25) && (MouseY < 115) && Player.CanWalk()) CommonSetScreen("Room", "CollegeEntrance");
	if ((MouseX >= 1885) && (MouseX < 1975) && (MouseY >= 145) && (MouseY < 235)) InformationSheetLoadCharacter(Player);
}

// Puts a random colored rope on a character
function CollegeTheaterRandomRope(C) {
	var Color = CommonRandomItemFromList("", ["#AA4444", "#44AA44", "#4444AA", "#AAAA44", "#AA44AA", "#44AAAA"]);
	InventoryWear(C, "HempRope", "ItemArms", Color);
	InventoryWear(C, "HempRope", "ItemLegs", Color);
	InventoryWear(C, "HempRope", "ItemFeet", Color);
}

// Wears the clothes for the play
function CollegeTheaterPlayClothes(C1, C2) {
	InventoryWear(C1, "WitchHat1", "Hat", "#555555");
	InventoryWear(C1, "BondageDress2", "Cloth", "#555555");
	InventoryWear(C2, "Beret1", "Hat", "#CC8899");
	InventoryWear(C2, "Dress2", "Cloth", "Default");
}

// When Julia love towards the player changes, it can also trigger an event
function CollegeTheaterJuliaLoveChange(LoveChange, Event) {
	if (LoveChange != null) CollegeTheaterJuliaLove = CollegeTheaterJuliaLove + parseInt(LoveChange);
	if (Event == "PlayerWitch") CollegeTheaterPlayClothes(Player, CollegeTheaterJulia);
	if (Event == "JuliaWitch") CollegeTheaterPlayClothes(CollegeTheaterJulia, Player);
	if (Event == "PlayerNaked") CharacterNaked(Player);
	if (Event == "JuliaNaked") CharacterNaked(CollegeTheaterJulia);
	if (Event == "PlayerRope") CollegeTheaterRandomRope(Player);
	if (Event == "JuliaRope") CollegeTheaterRandomRope(CollegeTheaterJulia);
}

// Dress back the player and Julia when the plays end
function CollegeTheaterDressBack() {
	CharacterRelease(Player);
	CharacterRelease(CollegeTheaterJulia);
	CollegeEntranceWearStudentClothes(Player);
	CollegeTheaterJuliaClothes();
	InventoryRemove(Player, "Hat");
	InventoryRemove(CollegeTheaterJulia, "Hat");
}

// When the plater invites Julia to her room
function CollegeTheaterInviteToPrivateRoom() {
	CommonSetScreen("Room", "Private");
	PrivateAddCharacter(CollegeTheaterJulia, null, true);
	var C = PrivateCharacter[PrivateCharacter.length - 1];
	C.Trait = [];
	NPCTraitSet(C, "Dominant", 30);
	NPCTraitSet(C, "Violent", 60);
	NPCTraitSet(C, "Dumb", 40);
	NPCTraitSet(C, "Rude", 90);
	C.Love = 20;
	NPCTraitDialog(C);
	ServerPrivateCharacterSync();
	DialogLeave();
	CollegeTheaterJulia = null;
}