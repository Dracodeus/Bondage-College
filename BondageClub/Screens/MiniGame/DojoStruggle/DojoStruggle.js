"use strict";
var DojoStruggleBackground = "Shibari";

// Loads the dojo struggle mini game and sets the difficulty (a little faster on mobile)
function DojoStruggleLoad() {
}

// Runs the dojo struggle mini game
function DojoStruggleRun() {
	
	// Draw the character
	DrawCharacter(Player, 750, -350, 3);
	MiniGameTimer = MiniGameTimer + Math.round(TimerRunInterval);

	// Shows the intro text before the mini game begins
	if (MiniGameTimer < 5000) {
		DrawRect(0, 950, 2000, 50, "black");
		DrawText(TextGet("Intro").replace("StartTimer", (10 - Math.floor(MiniGameTimer / 1000)).toString()), 1000, 975, "white");
		return;
	}
	
	// If the mini game is running
	if (!MiniGameEnded) {

		DojoStruggleVerifyEnd();

	} else {

		// Draw the end message
		DrawRect(0, 950, 2000, 50, "black");
		if (MiniGameVictory && (MiniGameProgess == 0)) DrawText(TextGet("Perfect"), 1000, 975, "white");
		else if (MiniGameVictory) DrawText(TextGet("Victory"), 1000, 975, "white");
		else DrawText(TextGet("Defeat"), 1000, 975, "white");

	}

}

// Validates if the mini game must end
function DojoStruggleVerifyEnd() {
	if (1 == 2) {
		MiniGameVictory = false;
		MiniGameEnded = true;
	}
	if (1 == 2) {
		MiniGameVictory = true;
		MiniGameEnded = true;
	}
}

// When the user clicks in the dojo struggle mini game
function DojoStruggleClick() {

	// If the game is over, clicking on the image will end it
	if (MiniGameEnded && (MouseX >= 1000))
		CommonDynamicFunction(MiniGameReturnFunction + "()");

	// If the game has started, we check the click position and send it as a move
	if ((MiniGameTimer > 5000) && (MouseY >= 350) && (MouseY <= 650) && !MiniGameEnded) {
	}

}