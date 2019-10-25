"use strict";
var TennisBackground = "CollegeTennisPlay";
var TennisCharacterLeft = null;
var TennisCharacterRight = null;
var TennisCharacterLeftPoint = 0;
var TennisCharacterRightPoint = 0;
var TennisCharacterLeftRacket = 500;
var TennisCharacterRightRacket = 500;

// Loads the tennis mini game and sets the difficulty
function TennisLoad() {
	TennisCharacterLeftPoint = 0;
	TennisCharacterRightPoint = 0;
	TennisCharacterLeftRacket = 500;
	TennisCharacterRightRacket = 500;
	MiniGameDifficultyRatio = 10;
	if (MiniGameDifficulty == "Normal") MiniGameDifficultyRatio = 15;
	if (MiniGameDifficulty == "Hard") MiniGameDifficultyRatio = 20;
}

// Runs the tennis mini game
function TennisRun() {
	
	// Draw the characters
	DrawCharacter(TennisCharacterLeft, 0, 100, 0.9);
	DrawText(TennisCharacterLeft.Name, 225, 30, "white");
	DrawText(TextGet("Point" + TennisCharacterLeftPoint.toString()), 225, 80, "white");
	DrawCharacter(TennisCharacterRight, 1550, 100, 0.9);
	DrawText(TennisCharacterRight.Name, 1775, 30, "white");
	DrawText(TextGet("Point" + TennisCharacterRightPoint.toString()), 1775, 80, "white");
	MiniGameTimer = MiniGameTimer + Math.round(TimerRunInterval);

	// If the mini game is running
	if (!MiniGameEnded) {

		// Sets the new progress
		if (MiniGameTimer >= 5000) MiniGameProgress = -1;

		// Draw the intro text or progress bar
		if (MiniGameProgress == -1) {
			DrawText(TextGet("Intro1"), 1000, 400, "white");
			DrawText(TextGet("Intro2"), 1000, 500, "white");
			DrawText(TextGet("StartsIn") + " " + (5 - Math.floor(MiniGameTimer / 1000)).toString(), 1000, 600, "white");
		}

		// Shows the rackets
		DrawImage("Screens/" + CurrentModule + "/" + CurrentScreen + "/Racket.png", 550, TennisCharacterLeftRacket - 50);
		DrawImage("Screens/" + CurrentModule + "/" + CurrentScreen + "/Racket.png", 1450, TennisCharacterRightRacket - 50);

	} else {

		// Draw the end message
		if (MiniGameVictory && (TennisCharacterRightPoint == 0)) DrawText(TextGet("Perfect"), 1000, 400, "white");
		else if (MiniGameVictory) DrawText(TextGet("Victory"), 1000, 400, "white");
		else DrawText(TextGet("Defeat"), 1000, 400, "white");
		DrawText(TextGet("ClickContinue"), 1000, 600, "white");

	}

}

// The game ends if a player has 4 or more points and is leading by at least 2 points
function TennisVerifyEnd() {
	if ((TennisCharacterLeftPoint >= 4) && (TennisCharacterLeftPoint >= TennisCharacterRightPoint + 2)) {
		MiniGameVictory = true;
		MiniGameEnded = true;
	}
	if ((TennisCharacterRightPoint >= 4) && (TennisCharacterRightPoint >= TennisCharacterLeftPoint + 2)) {
		MiniGameVictory = false;
		MiniGameEnded = true;
	}
}

// When the user clicks in the tennis mini game
function TennisClick() {

	// If the game is over, clicking on the player image will end it
	if (MiniGameEnded && (MouseX >= 0) && (MouseX <= 450) && (MouseY >= 100) && (MouseY <= 999))
		CommonDynamicFunction(MiniGameReturnFunction + "()");

	// If the game has started, we check the click position and send it as a move
	if ((MiniGameTimer > 5000) && (MouseX >= 450) && (MouseX < 750) && (MouseY >= 0) && (MouseX < 1000) && (MiniGameProgress != -1) && !MiniGameEnded)
		TennisCharacterLeftRacket = MouseY;

}