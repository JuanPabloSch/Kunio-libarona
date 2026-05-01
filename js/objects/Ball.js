export class Ball {
    constructor(scene, x, y) {
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(x, y, 'ball');

        this.sprite.setScale(0.3);
        this.sprite.setDepth(1);
        this.sprite.setDrag(90);
        this.sprite.setMaxVelocity(500);

        this.state = 'IDLE';
        this.owner = 'player';

        // ⏱ control de tiempo de tiro
        this.shotTimer = 0;
    }

update(player, offsetX, offsetY) {

    if (this.state === 'IDLE') {

        this.sprite.setVelocity(0);

        let target = player;
        let followX = offsetX;
        let followY = offsetY;

        if (this.owner === 'enemy') {
            target = this.scene.enemy.sprite;

            followX = -45;
            followY = 40;
        }

        if (this.owner === 'none') {
            return;
        }

        this.sprite.x = Phaser.Math.Linear(
            this.sprite.x,
            target.x + followX,
            0.25
        );

        this.sprite.y = Phaser.Math.Linear(
            this.sprite.y,
            target.y + followY,
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
    this.owner = 'none';

    this.sprite.setVelocity(vx, vy);

    this.shotTimer = 400;
}
}