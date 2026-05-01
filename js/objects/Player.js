export class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(x, y, 'player');

        this.sprite.setDepth(2);
        this.sprite.setScale(0.5);
        this.sprite.setCollideWorldBounds(true);

        this.lastDirection = 'right';

        this.cursors = scene.input.keyboard.createCursorKeys();

        this.slowed = false;
        this.stunned = false;
        this.stunTimer = 0;
        this.boosted = false;
    }

    update() {
    if (this.stunned) {

    this.stunTimer -= this.scene.game.loop.delta;

    this.sprite.body.setVelocity(0);

    // color stun
    this.sprite.setTint(0xff8800);

    // congelar frame
    this.sprite.stop();
    this.sprite.setFrame(0);

    if (this.stunTimer <= 0) {
        this.stunned = false;
        this.sprite.clearTint();
    }

    return;
}
        
        let speed = 200;

        if (this.slowed) speed = 145;
        if (this.boosted) speed = 245;

        this.sprite.body.setVelocity(0);

        let moving = false;

        if (this.cursors.left.isDown) {
            this.sprite.body.setVelocityX(-speed);
            this.sprite.flipX = true;
            this.lastDirection = 'left';
            moving = true;
        }

        if (this.cursors.right.isDown) {
            this.sprite.body.setVelocityX(speed);
            this.sprite.flipX = false;
            this.lastDirection = 'right';
            moving = true;
        }

        if (this.cursors.up.isDown) {
            this.sprite.body.setVelocityY(-speed);
            moving = true;
        }

        if (this.cursors.down.isDown) {
            this.sprite.body.setVelocityY(speed);
            moving = true;
        }

        if (moving) {
            if (!this.sprite.anims.isPlaying) {
                this.sprite.play('run');
            }
        } else {
            this.sprite.stop();
            this.sprite.setFrame(0);
        }
    }
stun(ms = 1500) {
    this.stunned = true;
    this.stunTimer = ms;
}
}

