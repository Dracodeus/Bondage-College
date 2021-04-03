"use strict";
var PandoraBackground = "PandoraMainHall";
var PandoraCurrentRoom = 0;
var PandoraRoom = [];

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
	if (PandoraRoom.length == 0) return;
	let Room = PandoraRoom[PandoraCurrentRoom];
	let Pos = 750 - Room.Character.length * 250;
	DrawCharacter(Player, Pos, 0, 1);
	for (let C = 0; C < Room.Character.length; C++)
		DrawCharacter(Room.Character[C], Pos + ((C + 1) * 500), 0, 1);
}

/**
 * Handles clicks in all Pandora's screen
 * @returns {void} - Nothing
 */
function PandoraClick() {
	if (PandoraRoom.length == 0) return;
	let Room = PandoraRoom[PandoraCurrentRoom];
	let Pos = 750 - Room.Character.length * 250;
	if (MouseIn(Pos, 0, 500, 1000)) return CharacterSetCurrent(Player);
	for (let C = 0; C < Room.Character.length; C++)
		if (MouseIn(Pos + ((C + 1) * 500), 0, 500, 1000))
			return CharacterSetCurrent(Room.Character[C]);
}

/**
 * Clears all the rooms and generates the main hall with an introduction maid
 * @returns {void} - Nothing
 */
function PandoraBuildMainHall() {
	PandoraCurrentRoom = 0;
	PandoraRoom = [];
	let Room = {};
	let Char = CharacterLoadNPC("NPC_Pandora_Maid");
	Char.AllowItem = false;
	Room.Character = [];
	Room.Character.push(Char);
	Room.Background = "PandoraMainHall";
	PandoraRoom.push(Room);
}