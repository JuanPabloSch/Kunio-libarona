export class Enemy {
    constructor(scene, x, y, ball) {
        this.scene = scene;
        this.ball = ball;

        this.sprite = scene.physics.add.sprite(x, y, 'player');

        this.sprite.setScale(0.5);
        this.sprite.setTint(0xff4444);
        this.sprite.setDepth(2);
        this.sprite.setCollideWorldBounds(true);
    }

    update() {
        const speed = 120;

        const dx = this.ball.sprite.x - this.sprite.x;
        const dy = this.ball.sprite.y - this.sprite.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 5) {
            this.sprite.body.setVelocity(
                (dx / dist) * speed,
                (dy / dist) * speed
            );
        } else {
            this.sprite.body.setVelocity(0);
        }
    }
}