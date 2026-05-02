export class Enemy {
    constructor(scene, x, y, ball) {
        this.scene = scene;
        this.ball = ball;

        this.sprite = scene.physics.add.sprite(x, y, 'enemy');

        this.sprite.setScale(0.5);
        this.sprite.setDepth(2);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setCollideWorldBounds(true);
        this.stunned = false;
        this.stunTimer = 0;
        this.state = 'run';
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
    if (this.state === 'run' && this.sprite.x < this.scene.offsetX + 220) {

    this.kick(); // animación

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
stun(ms = 1000) {
    this.stunned = true;
    this.stunTimer = ms;
}
kick() {
    if (this.state === 'kick') return;

    this.state = 'kick';

    this.sprite.body.setVelocity(0);
    this.sprite.anims.play('enemy_kick', true);

    this.sprite.once('animationcomplete', () => {
        this.state = 'run';
    });
}
}