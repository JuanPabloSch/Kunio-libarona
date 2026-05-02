export class Goalkeeper {

    constructor(scene, x, y, side) {
        this.scene = scene;
        this.side = side; // left / right

        this.sprite = scene.physics.add.sprite(x, y, 'enemy');

        this.sprite.setScale(0.5);
        this.sprite.setDepth(2);
        this.sprite.setImmovable(true);

        this.homeX = x;
        this.homeY = y;

        this.speed = 140;
    }

    update() {

        const ball = this.scene.ball.sprite;

        let targetY = this.homeY;

        // seguir pelota si entra cerca del arco
        if (Math.abs(ball.x - this.homeX) < 220) {
            targetY = ball.y;
        }

        const dy = targetY - this.sprite.y;

        if (Math.abs(dy) > 6) {
            this.sprite.setVelocityY(Math.sign(dy) * this.speed);
        } else {
            this.sprite.setVelocityY(0);
        }

        // límites verticales del arco
        const top = this.scene.centerY - 90;
        const bottom = this.scene.centerY + 90;

        this.sprite.y = Phaser.Math.Clamp(
            this.sprite.y,
            top,
            bottom
        );

        this.sprite.setVelocityX(0);
    }
    
trySave() {

    const ball = this.scene.ball.sprite;

    const dist = Phaser.Math.Distance.Between(
        this.sprite.x,
        this.sprite.y,
        ball.x,
        ball.y
    );

    if (dist > 55) return;
    if (this.scene.ball.owner !== 'none') return;

    // 55% atrapa / 45% rebote
    if (Math.random() < 0.55) {

        this.scene.ball.owner = 'enemy';
        this.scene.ball.state = 'IDLE';
        this.scene.ball.protectTimer = 600;

    } else {

        let dir = (this.side === 'left') ? 1 : -1;

        this.scene.ball.shoot(
            dir * Phaser.Math.Between(220, 320),
            Phaser.Math.Between(-120, 120)
        );
    }
}
}