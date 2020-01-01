"use strict";
var CollegeTeacherBackground = "CollegeTeacher";
var CollegeTeacherMildred = null;
var CollegeTeacherMildredLove = 0;

// Returns TRUE if the dialog option should be shown
function CollegeTeacherCanInviteToPrivateRoom() { return (LogQuery("RentRoom", "PrivateRoom") && (PrivateCharacter.length < PrivateCharacterMax)) }
function CollegeTeacherMildredLoveIs(LoveLevel) { return (CollegeTeacherMildredLove >= parseInt(LoveLevel)) }

// Fully dress-up Mildred
function CollegeTeacherMildredClothes() {
	CharacterNaked(CollegeTeacherMildred);
	InventoryWear(CollegeTeacherMildred, "TeacherOutfit1", "Cloth", "Default");
	InventoryWear(CollegeTeacherMildred, "PussyDark3", "Pussy", "#333333");
	InventoryWear(CollegeTeacherMildred, "Eyes1", "Eyes", "#a57b78");
	InventoryWear(CollegeTeacherMildred, "Glasses4", "Glasses", "#333333");
	InventoryWear(CollegeTeacherMildred, "Mouth1", "Mouth", "Default");
	InventoryWear(CollegeTeacherMildred, "H0940", "Height", "Default");
	InventoryWear(CollegeTeacherMildred, "Normal", "BodyUpper", "White");
	InventoryWear(CollegeTeacherMildred, "Normal", "BodyLower", "White");
	InventoryWear(CollegeTeacherMildred, "Default", "Hands", "White");
	InventoryWear(CollegeTeacherMildred, "HairBack6", "HairBack", "#603022");
	InventoryWear(CollegeTeacherMildred, "HairFront4", "HairFront", "#603022");
	InventoryWear(CollegeTeacherMildred, "Ribbons2", "HairAccessory1", "#111111");
	InventoryWear(CollegeTeacherMildred, "Bra1", "Bra", "#2222AA");
	InventoryWear(CollegeTeacherMildred, "Panties11", "Panties", "#2222AA");
	InventoryWear(CollegeTeacherMildred, "Socks5", "Socks", "#444458");
	InventoryWear(CollegeTeacherMildred, "Shoes2", "Shoes", "#111111");
}

// Generates Mildred
function CollegeTeacherLoad() {

	// Generates a full Mildred model based on the Bondage College template
	if (CollegeTeacherMildred == null) {

		// Do not generate her if she's already in the private room
		if (PrivateCharacter.length > 1)
			for (var P = 1; P < PrivateCharacter.length; P++)
				if (PrivateCharacter[P].Name == "Mildred")
					return;
		
		// Generates the model
		CollegeTeacherMildred = CharacterLoadNPC("NPC_CollegeTeacher_Mildred");
		CollegeTeacherMildred.AllowItem = false;
		CollegeTeacherMildred.Name = "Mildred";
		CollegeTeacherMildred.GoneAway = false;
		CollegeTeacherMildredClothes();
		CharacterRefresh(CollegeTeacherMildred);

	}

}

// Runs the room (shows the player and Mildred)
function CollegeTeacherRun() {
	DrawCharacter(Player, 500, 0, 1);
	if ((CollegeTeacherMildred != null) && !CollegeTeacherMildred.GoneAway) DrawCharacter(CollegeTeacherMildred, 1000, 0, 1);
	DrawButton(1885, 25, 90, 90, "", Player.CanWalk() ? "White" : "Pink", "Icons/Exit.png", TextGet("Exit"));
	DrawButton(1885, 145, 90, 90, "", "White", "Icons/Character.png", TextGet("Profile"));
}

// When the user clicks in the room
function CollegeTeacherClick() {
	if ((MouseX >= 1000) && (MouseX < 1500) && (MouseY >= 0) && (MouseY < 1000) && (CollegeTeacherMildred != null) && !CollegeTeacherMildred.GoneAway) CharacterSetCurrent(CollegeTeacherMildred);
	if ((MouseX >= 1885) && (MouseX < 1975) && (MouseY >= 25) && (MouseY < 115) && Player.CanWalk()) CommonSetScreen("Room", "CollegeEntrance");
	if ((MouseX >= 1885) && (MouseX < 1975) && (MouseY >= 145) && (MouseY < 235)) InformationSheetLoadCharacter(Player);
}

// When Mildred love towards the player changes, it can also trigger an event.  When a good or bad move is done, her expression will change quickly.
function CollegeTeacherMildredLoveChange(LoveChange, Event) {
	if (LoveChange != null) CollegeTeacherMildredLove = CollegeTeacherMildredLove + parseInt(LoveChange);
	if ((LoveChange != null) && (parseInt(LoveChange) < 0)) {
		CharacterSetFacialExpression(CollegeTeacherMildred, "Eyes", "Dazed");
		TimerInventoryRemoveSet(CollegeTeacherMildred, "Eyes", 2);
	}
	if ((LoveChange != null) && (parseInt(LoveChange) > 0)) {
		CharacterSetFacialExpression(CollegeTeacherMildred, "Blush", "Low");
		TimerInventoryRemoveSet(CollegeTeacherMildred, "Blush", 2);
	}
	if (Event == "Pillory") InventoryWear(Player, "Pillory", "ItemArms");
}

// Dress back the player and Mildred
function CollegeTeacherDressBack() {
	CharacterRelease(Player);
	CharacterRelease(CollegeTeacherMildred);
	CollegeEntranceWearStudentClothes(Player);
	CollegeTeacherMildredClothes();
}

// When the plater invites Mildred to her room
function CollegeTeacherInviteToPrivateRoom() {
	CollegeTeacherDressBack();
	CommonSetScreen("Room", "Private");
	PrivateAddCharacter(CollegeTeacherMildred, null, true);
	var C = PrivateCharacter[PrivateCharacter.length - 1];
	C.Trait = [];
	NPCTraitSet(C, "Dominant", 60);
	NPCTraitSet(C, "Violent", 50);
	NPCTraitSet(C, "Frigid", 40);
	NPCTraitSet(C, "Polite", 20);
	NPCTraitSet(C, "Wise", 30);
	NPCTraitSet(C, "Serious", 80);
	C.Love = 20;
	NPCTraitDialog(C);
	ServerPrivateCharacterSync();
	DialogLeave();
	CollegeTeacherMildred.GoneAway = true;
}