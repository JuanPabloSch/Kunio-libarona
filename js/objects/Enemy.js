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

    let speed = 150;

    if (this.ball.owner === 'enemy') {
        speed = 170;
    }

    let targetX = this.ball.sprite.x;
    let targetY = this.ball.sprite.y;

    // si tiene pelota va al arco izquierdo
    if (this.ball.owner === 'enemy') {
        targetX = this.scene.offsetX;
        targetY = this.scene.centerY;
    }

    const dx = targetX - this.sprite.x;
    const dy = targetY - this.sprite.y;

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