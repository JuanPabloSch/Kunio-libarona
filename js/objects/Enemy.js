export class Enemy {
    constructor(scene, x, y, ball) {
        this.scene = scene;
        this.ball = ball;

        this.sprite = scene.physics.add.sprite(x, y, 'player');

        this.sprite.setScale(0.5);
        this.sprite.setTint(0xff4444);
        this.sprite.setDepth(2);
        this.sprite.setCollideWorldBounds(true);
        this.stunned = false;
        this.stunTimer = 0;
    }

    update() {

        if (this.stunned) {

    this.stunTimer -= this.scene.game.loop.delta;

    this.sprite.body.setVelocity(0);
    this.sprite.setTint(0xffff00);
    this.sprite.stop();
    this.sprite.setFrame(0);

    if (this.stunTimer <= 0) {
        this.stunned = false;
        this.sprite.setTint(0xff4444);
    }

    return;
}

    let speed = 150;

    if (this.ball.owner === 'enemy') {
        speed = 170;
    }

    let targetX = this.ball.sprite.x;
    let targetY = this.ball.sprite.y;

    // si tiene pelota va al arco izquierdo
    if (this.ball.owner === 'enemy') {

    targetX = this.scene.offsetX + 30;
    targetY = this.scene.centerY;

    // si llegó cerca del arco, patea
    if (this.sprite.x < this.scene.offsetX + 220) {

        this.ball.shoot(-420, 0);
        this.ball.owner = 'none';
    }
}

    const dx = targetX - this.sprite.x;
    const dy = targetY - this.sprite.y;

    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 5) {

        this.sprite.body.setVelocity(
            (dx / dist) * speed,
            (dy / dist) * speed
        );

        // mirar lado correcto
        if (dx < 0) this.sprite.flipX = true;
        else this.sprite.flipX = false;

        // animar
        if (!this.sprite.anims.isPlaying) {
            this.sprite.play('run');
        }

    } else {

        this.sprite.body.setVelocity(0);
        this.sprite.stop();
        this.sprite.setFrame(0);
    }
}
stun(ms = 1000) {
    this.stunned = true;
    this.stunTimer = ms;
}
}