export class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(x, y, 'player');

        this.sprite.setDepth(2);
        this.sprite.setScale(0.5);
        this.sprite.setCollideWorldBounds(true);

        this.cursors = scene.input.keyboard.createCursorKeys();

        this.lastDirection = 'right';

        // estados
        this.slowed = false;
        this.boosted = false;

        this.stunned = false;
        this.stunTimer = 0;

        this.isKicking = false;
        this.isTackling = false;
        this.tackleCooldown = 0;
    }

    update() {

        if (this.tackleCooldown > 0) {
            this.tackleCooldown -= this.scene.game.loop.delta;
        }
        // =========================
        // STUN
        // =========================
        if (this.stunned) {

            this.stunTimer -= this.scene.game.loop.delta;

            this.sprite.body.setVelocity(0);
            this.sprite.setTint(0xff8800);
            this.sprite.setFrame(0);

            if (this.stunTimer <= 0) {
                this.stunned = false;
                this.sprite.clearTint();
            }

            return;
        }

        // =========================
        // KICK BLOCK (evita pisar animación)
        // =========================
        if (this.isKicking) {
            this.sprite.body.setVelocity(0);
            return;
        }

        if (this.isTackling) {
            return;
        }

        // =========================
        // SPEED
        // =========================
        let speed = 200;

        if (this.slowed) speed = 145;
        if (this.boosted) speed = 245;

        this.sprite.body.setVelocity(0);

        let moving = false;

        // =========================
        // MOVIMIENTO
        // =========================
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

        // =========================
        // ANIMACIONES
        // =========================
        if (moving) {
            if (!this.sprite.anims.isPlaying) {
                this.sprite.play('run', true);
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

    kick() {
    this.isKicking = true;

    this.sprite.body.setVelocity(0);
    this.sprite.play('player_kick', true);

    this.sprite.once('animationcomplete', () => {
        this.isKicking = false;
    });
}

tackle() {
    if (this.tackleCooldown > 0) return;
    if (this.isTackling || this.isKicking || this.stunned) return;
    this.tackleCooldown = 1400;
    this.isTackling = true;

    let speed = 500;

    if (this.lastDirection === 'left') {
        this.sprite.setVelocityX(-speed);
        this.sprite.flipX = true;
    } else {
        this.sprite.setVelocityX(speed);
        this.sprite.flipX = false;
    }

    this.sprite.play('player_tackle', true);

    this.sprite.once('animationcomplete', () => {
        this.sprite.setVelocity(0);
        this.isTackling = false;
    });
}
}