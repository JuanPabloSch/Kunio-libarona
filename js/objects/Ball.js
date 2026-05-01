export class Ball {
    constructor(scene, x, y) {
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(x, y, 'ball');

        this.sprite.setScale(0.3);
        this.sprite.setDepth(1);
        this.sprite.setDrag(90);
        this.sprite.setMaxVelocity(500);

        this.state = 'IDLE';

        // ⏱ control de tiempo de tiro
        this.shotTimer = 0;
    }

    update(player, offsetX, offsetY) {

    if (this.state === 'IDLE') {

        this.sprite.setVelocity(0);

        this.sprite.x = Phaser.Math.Linear(
            this.sprite.x,
            player.x + offsetX,
            0.25
        );

        this.sprite.y = Phaser.Math.Linear(
            this.sprite.y,
            player.y + offsetY,
            0.25
        );
    }

        // =========================
        // SHOT
        // =========================
        if (this.state === 'SHOT') {

            this.shotTimer -= this.scene.game.loop.delta;

            // mínimo 300ms de tiro obligatorio
            if (this.shotTimer <= 0) {

                const v = this.sprite.body.velocity;

                // ahora sí chequeo suave
                if (Math.abs(v.x) + Math.abs(v.y) < 2) {
                    this.state = 'IDLE';
                }
            }
        }

        // animación única
        if (!this.sprite.anims.isPlaying) {
            this.sprite.play('ball_spin');
        }
    }

    shoot(vx, vy) {
        this.state = 'SHOT';

        this.sprite.setVelocity(vx, vy);

        // ⏱ bloqueo mínimo de control
        this.shotTimer = 400; // ms
    }
}