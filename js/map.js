(function (global, doc){
	var Map;

	Map = {
		/**
		 * Mapeamento do ambiente
		 * @type {Array}
		 */
		ambient: [],

		/**
		 * Posições dos itens colecionaveis no mapa
		 * @type {Array}
		 */
		itens: [],

		/**
		 * Locais por onde o jogador ja passou
		 * @type {Array}
		 */
		playerPositions: [],

		/**
		 * Numero de itens coletaveis no mapa
		 * @type {Number}
		 */
		itensInMap: 0,

		/**
		 * Coordenada de saida do nivel
		 * @type {Array}
		 */
		endPoint: [0, 0],

		/**
		 * Configura o mapa que será usado pelo jogo
		 * @param  {Number} rows    Numero de linhas do mapa
		 * @param  {Number} columns Numero de colunas no mapa
		 * @return {void}
		 */
		createMap: function (rows, columns) {
			var i, x;

			this.itens = [];
			this.ambient = [];
			this.playerPositions = [];

			for (i = 0; i < rows; i += 1) {
				this.ambient.push([]);

				for (x = 0; x < columns; x += 1) {
					this.ambient[i].push(true);
				}				
			}

			for (i = 0; i < rows; i += 1) {
				this.itens.push([]);

				for (x = 0; x < columns; x += 1) {
					this.itens[i].push(false);
				}				
			}

			for (i = 0; i < rows; i += 1) {
				this.playerPositions.push([]);

				for (x = 0; x < columns; x += 1) {
					this.playerPositions[i].push(false);
				}				
			}
		},

		/**
		 * Adiciona os itens coletaveis ao mapa
		 * @param  {Array} itens Itens coletaveis
		 * @return {void}
		 */
		addItensToMap: function (itens) {
			var i,
				x,
				y,
				val,
				cur,
				len = itens.length;

			for (i = 0; i < len; i += 1) {
				cur = itens[i];
				x = cur[0]; 
				y = cur[1];
				val = cur[2] || false;

				this.itens[x][y] = val;

				Game.drawAt(x, y, val);
			}

			this.itensInMap = len;
		},

		/**
		 * Adiciona os blocos de colisão ao mapa
		 * @param  {Array} blocks Blocos
		 * @return {void}
		 */
		addBlockToAmbient: function (blocks) {
			var i,
				x,
				y,
				val,
				len = blocks.length;

			for (i = 0; i < len; i += 1) {
				x = blocks[i][0]; 
				y = blocks[i][1];
				val = blocks[i][2] || false;

				this.ambient[x][y] = val;

				Game.drawAt(x, y, val);
			}
		},

		/**
		 * Verifica se não há colisão na coordenada informada
		 * @param  {Number}  x
		 * @param  {Number}  y
		 * @return {Boolean}   Verdadeiro caso não exista itens de colisão na coordenada
		 */
		canIGoTo: function (x, y) {
			if (x < this.ambient.length && y < this.ambient[0].length) {
				return (this.ambient[x][y] === Const.IS_NOT_A_BLOCK && this.playerPositions[x][y] === Const.I_WAS_NOT_HERE) ? true : false;
			}
			return false;
		},

		/**
		 * Verifica se existe um item coletavel na coordenada informada
		 * @param  {Number} x
		 * @param  {Number} y
		 * @return {Boolean}  Verdadeiro caso exista um item
		 */
		hasItemIn: function (x, y) {
			return (this.itens[x][y] !== false) ? true : false;
		},

		/**
		 * Salva o local por onde o jogador passou
		 * @param  {Number} x
		 * @param  {Number} y
		 * @return {void}
		 */
		recordPlayerPosition: function (x, y) {
			this.playerPositions[x][y] = !Const.I_WAS_NOT_HERE;
		}
	};

	global.Map = Map;
}(window, document))