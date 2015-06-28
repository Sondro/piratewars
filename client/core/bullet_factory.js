'use strict'

var BulletComponent = require('../components/bullet.js');
var Entity = require('../../shared/core/entity.js');
var GameEngine = require('../../shared/game_engine.js');
var PhysicsComponent = require('../../shared/components/physics.js');
var SpriteComponent = require('../components/sprite.js');
var UUID = require('node-uuid');
var MathUtils = require('../../shared/utils/math.js');

///////////////////// Send these to a data file /////////////////////////////
var bulletVelocity = 50;
var bulletSpriteScale = 0.2;
var bulletMass = 0.2;

//collision groups
var PLAYER = Math.pow(2,0);
var BULLET = Math.pow(2,1);


var BulletFactory = {
	init : function (data) {
		this.game = data.game;
	},

	createBullet : function(initialPosition, angle) {
		// console.log("createBullet");
		var bulletId = UUID();
		var entity = new Entity(bulletId, 'bullet');

		var sprite = this.game.add.sprite(initialPosition.x, initialPosition.y, 'bullet');
		sprite.anchor.setTo(0.5, 0.5); // Default anchor at the center
		sprite.scale.setTo(bulletSpriteScale);

		var velocity = MathUtils.vector(bulletVelocity, angle);

		var body = new p2.Body({
	            name: "bullet",
	            type: p2.Body.KINEMATIC,
	            /*mass : bulletMass,*/
	            position: [initialPosition.x, initialPosition.y],
	            velocity: [ velocity.x, velocity.y ],
	    });
	    body.entity = entity;
	    
	    var shape = new p2.Circle(1); //////set radius!!
		shape.collisionGroup = BULLET;
		shape.collisionMask = PLAYER;
	    body.addShape(shape);

		GameEngine.getInstance().world.addBody(body);

		entity.components.add(new PhysicsComponent(body));
		entity.components.add(new SpriteComponent(sprite));
		entity.components.add(new BulletComponent());
		// console.log("End of entity");
		return entity;
	},

	createRemoteBullet : function(transform) {
		// console.log("createBullet");
		var bulletId = UUID();
		var entity = new Entity(bulletId);

		var sprite = this.game.add.sprite(transform.x, transform.y, 'bullet');
		sprite.anchor.setTo(0.5, 0.5); // Default anchor at the center
		sprite.scale.setTo(bulletSpriteScale);

		var body = new p2.Body({
	            name: "bullet",
	            type: p2.Body.KINEMATIC,
	            /*mass : bulletMass,*/
	            position: [transform.position.x,
	            		   transform.position.y],
	            velocity: [transform.velocity.x,
	            		   transform.velocity.y],
	            angle: transform.angle
	    });
	    body.entity = entity;
	    
	    var shape = new p2.Circle(1); //////set radius!!
		shape.collisionGroup = BULLET;
		shape.collisionMask = PLAYER;
	    body.addShape(shape);

		GameEngine.getInstance().world.addBody(body);

		entity.components.add(new PhysicsComponent(body));
		entity.components.add(new SpriteComponent(sprite));
		entity.components.add(new BulletComponent());
		// console.log("End of entity");
		return entity;
	}
};

module.exports = BulletFactory;