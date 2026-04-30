export class Ball {
    constructor(scene, x, y) {
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(x, y, 'ball');

        this.sprite.setScale(0.3);
        this.sprite.setDepth(1);
        this.sprite.setImmovable(true);
        this.sprite.body.setAllowGravity(false);
        this.sprite.setDrag(90);
        this.sprite.setMaxVelocity(500);

        this.ballShot = false;
    }

    update(player, offsetX, offsetY) {

        const isMoving =
            player.body.velocity.x !== 0 ||
            player.body.velocity.y !== 0;

        // 🔁 solo gira si se mueve el jugador
        if (isMoving) {
            if (!this.sprite.anims.isPlaying) {
                this.sprite.play('ball_spin');
            }
        } else {
            this.sprite.anims.stop();
        }

        // ⚽ follow al jugador SOLO si no pateaste
        if (!this.ballShot) {
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
    }

    shoot(vx, vy) {
        this.ballShot = true;
        this.sprite.setVelocity(vx, vy);
    }
}