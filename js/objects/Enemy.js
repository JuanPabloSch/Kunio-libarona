export class Enemy {
    constructor(scene, x, y, ball) {
        this.scene = scene;
        this.ball = ball;

        this.sprite = scene.physics.add.sprite(x, y, 'enemy');

        this.sprite.setScale(0.5);
        this.sprite.setDepth(2);
        this.sprite.setCollideWorldBounds(true);

        // estados
        this.state = 'run';
        this.stunned = false;
        this.stunTimer = 0;
        this.isKicking = false;
    }

    update() {

        // =========================
        // STUN
        // =========================
        if (this.stunned) {

            this.stunTimer -= this.scene.game.loop.delta;

            this.sprite.body.setVelocity(0);
            this.sprite.setTint(0xffff00);
            this.sprite.setFrame(0);

            if (this.stunTimer <= 0) {
                this.stunned = false;
                this.sprite.clearTint();
            }

            return;
        }

        // =========================
        // KICK BLOCK
        // =========================
        if (this.isKicking) {
            this.sprite.body.setVelocity(0);
            return;
        }

        // =========================
        // SPEED
        // =========================
        let speed = 175;

        if (this.ball.owner === 'enemy') {
            speed = 195;
        }

        let targetX = this.ball.sprite.x;
        let targetY = this.ball.sprite.y;

        // =========================
        // SI TIENE LA PELOTA
        // =========================
        if (this.ball.owner === 'enemy') {
            targetX = this.scene.offsetX + 30;
            targetY = this.scene.centerY;

            // kick trigger
            if (
                this.state === 'run' &&
                this.sprite.x < this.scene.offsetX + 220
            ) {
                this.kick();

                this.ball.shoot(-420, 0);
                this.ball.owner = 'none';
            }
        }

        const playerDist = Phaser.Math.Distance.Between(
    this.sprite.x,
    this.sprite.y,
    this.scene.player.sprite.x,
    this.scene.player.sprite.y
    );

    if (
        this.ball.owner === 'player' &&
        playerDist < 90 &&
        this.state === 'run'
    ) {
        this.tackle();
    }
        
        // =========================
        // MOVIMIENTO
        // =========================
        const dx = targetX - this.sprite.x;
        const dy = targetY - this.sprite.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 5) {

            this.sprite.body.setVelocity(
                (dx / dist) * speed,
                (dy / dist) * speed
            );

            this.sprite.flipX = dx < 0;

            if (this.state === 'run') {
                if (!this.sprite.anims.isPlaying) {
                    this.sprite.play('enemy_run', true);
                }
            }

        } else {
            this.sprite.body.setVelocity(0);
            this.sprite.stop();
            this.sprite.setFrame(0);
        }
    }

    // =========================
    // STUN
    // =========================
    stun(ms = 1000) {
        this.stunned = true;
        this.stunTimer = ms;
    }

    // =========================
    // KICK (IMPORTANTE: bloquea run correctamente)
    // =========================
    kick() {
        if (this.isKicking) return;

        this.isKicking = true;
        this.state = 'kick';

        this.sprite.body.setVelocity(0);
        this.sprite.play('enemy_kick', true);

        this.sprite.once('animationcomplete', () => {
            this.isKicking = false;
            this.state = 'run';
        });
    }

    tackle() {

    if (this.state === 'kick' || this.state === 'tackle' || this.stunned) return;

    this.state = 'tackle';

    let speed = 420;

    if (this.sprite.flipX) {
        this.sprite.setVelocityX(-speed);
    } else {
        this.sprite.setVelocityX(speed);
    }

    this.sprite.play('enemy_tackle', true);

    this.sprite.once('animationcomplete', () => {
        this.sprite.setVelocity(0);
        this.state = 'run';
    });
}
}