var Game = (function(global, doc){

	var Game, Sprite, SpriteMap, SpriteMapCurves, Stage, GameCanvas, Const, Engine, Directions;

	/**
	 * Constants
	 * @type {Object}
	 */
	Const = {
		TILE_SIZE: 20,
		GAME_SPEED: 40, // miliseconds
		UP: 0,
		RIGHT: 1,
		DOWN: 2,
		LEFT: 3
	};

	/**
	 * Sprites maps coords in XY format
	 */
	SpriteMap = {
		// Hands
		HAND_UP: [0, 0],
		HAND_DOWN: [20, 20],
		HAND_RIGHT: [20, 0],
		HAND_LEFT: [0, 20],

		// Arms
		ARMS_V: [0, 40],
		ARMS_H: [20, 40],
		
		// Itens
		HEART: [0, 100],
		KEY: [20, 100]
	};

	SpriteMapCurves = {
		UR: [0, 60],
		UL: [20, 60],

		RD: [20, 60],
		RU: [20, 80],

		DL: [20, 80],
		DR: [0, 80],

		LU: [0, 80],
		LD: [0, 60],
	};

	Engine = {
		interval: null
	};

	Directions = {
		previous: 0,
		current: 0
	};

	Game = {
		isStarted: false, 

		position: [15, 23],

		stageSize: {
			h: 640 / 20,
			v: 480 / 20
		},

		init: function () {
			GameCanvas = doc.getElementById('game');
			GameCanvas.width = 640;
			GameCanvas.height = 480;

			Stage = GameCanvas.getContext('2d');

			Sprite = new Image();
			Sprite.src = 'img/sprites.png';

			this.bindKeyEvents();

			this.run();
			return this;
		},

		loadMap: function () {
			// Implements this after
		},

		getCoords: function (x, y) {
			var tileSize = Const.TILE_SIZE,
				coordX = (((x + 1) * tileSize) - tileSize),
				coordY = (((y + 1) * tileSize) - tileSize);

			return [coordX, coordY];
		},

		drawAt: function (x, y, spriteName) {
			var tileSize = Const.TILE_SIZE,
				coords = this.getCoords(x, y),
				spriteCoords = this.getTileCoordsByName(spriteName);

			Stage.drawImage(Sprite, spriteCoords[0], spriteCoords[1], tileSize, tileSize, coords[0], coords[1], tileSize, tileSize);
		},

		run: function () {
			var self = this;
			doc.body.focus();
			this.isStarted = true;
			this.goToNext();

			Engine.interval = setInterval(function () {
				self.goToNext();
			}, Const.GAME_SPEED);
		},

		canGoNext: function () {
			var goToX,
				goToY,
				x = this.position[0],
				y = this.position[1];

			switch (Directions.current) {
				case Const.UP:
					goToY = y - 1;
				break;
				case Const.DOWN:
					goToY = y + 1;
				break;
				default:
					goToY = y;
			}

			switch (Directions.current) {
				case Const.LEFT:
					goToX = x - 1;
				break;
				case Const.RIGHT:
					goToX = x + 1;
				break;
				default:
					goToX = x;
			}

			if (x <= 0 || y <= 0 || x >= this.stageSize.h || y >= this.stageSize.v) {
				return false;
			} else {
				return [goToX, goToY];
			}
		},


		goToNext: function () {
			var next = this.canGoNext(),
				tile;

			if (next !== false) {
				tile = this.getTileToNextMove();
				Directions.previous = Directions.current;
				this.drawAt(next[0], next[1], tile);
				this.position = next;

				if (!this.canGoNext()) this.gameOver();
			}
		},

		getTileToNextMove: function () {
			var tile = '';

			if (Directions.current === Const.LEFT || Directions.current === Const.RIGHT) {
				tile = 'ARMS_H';
			} else if (Directions.current === Const.UP || Directions.current === Const.DOWN) {
				tile = 'ARMS_V';
			}

			return tile;
		},


		getTileCoordsByName: function (name) {
			return SpriteMap['' + name + ''] || SpriteMapCurves['' + name + ''];
		},

		gameOver: function () {
			clearInterval(Engine.interval);
			this.isStarted = false;
			alert('Oh not! It`s over ;(');
		},

		changeDirectionOnKeyPress: function (event) {
			var current = Directions.current,
				newDirection,
				dirs = ['U', 'R', 'D', 'L'];

			if (this.isStarted ) {
				switch (event.keyCode) {
					case 37: 
						newDirection = Const.LEFT;
					break;

					case 38:
						newDirection = Const.UP;
					break;

					case 39:
						newDirection = Const.RIGHT;
					break;

					case 40:
						newDirection = Const.DOWN;
					break;
				}

				if (current === Const.LEFT && newDirection === Const.RIGHT) {
					return;
				}

				if (current === Const.RIGHT && newDirection === Const.LEFT) {
					return;
				}

				if (current === Const.DOWN && newDirection === Const.UP) {
					return;
				}

				if (current === Const.UP && newDirection === Const.DOWN) {
					return;
				}

				if (newDirection !== Directions.previous) {
					Directions.previous = Directions.current;
					Directions.current = newDirection;
					this.fixMoveCurve(dirs[Directions.previous] + dirs[Directions.current]);
				}

			}
		},

		fixMoveCurve: function (tile) {
			Stage.clearRect(this.position[0], this.position[1], Const.TILE_SIZE, Const.TILE_SIZE);
			this.drawAt(this.position[0], this.position[1], tile);
		},

		bindKeyEvents: function () {
			doc.onkeydown = function (e) {
				Game.changeDirectionOnKeyPress(e);
			};
		}
	};

	return Game.init();

}(window, document));
