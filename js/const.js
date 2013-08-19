(function (global, doc) {
	var Const;

	// Game constants
	Const = {
		TILE_SIZE: 20,
		GAME_SPEED: 80, // miliseconds
		UP: 0,
		RIGHT: 1,
		DOWN: 2,
		LEFT: 3,
		IS_NOT_A_BLOCK: true,
		I_WAS_NOT_HERE: false
	};

	global.Const = Const;
}(window, document));