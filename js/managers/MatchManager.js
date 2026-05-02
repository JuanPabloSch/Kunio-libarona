export class MatchManager {

    constructor(scene) {
        this.scene = scene;

        this.scoreHome = 0;
        this.scoreAway = 0;

        this.goalLock = false;

        this.createUI();
    }

    createUI() {

        this.homeLabel = this.scene.add.text(20, 20, 'HOME', {
    fontFamily: 'Arial Black',
    fontSize: '30px',
    color: '#ffffff',
    stroke: '#000000',
    strokeThickness: 4
    }).setScrollFactor(0).setDepth(99);

    this.homeText = this.scene.add.text(140, 20, '0', {
        fontFamily: 'Arial Black',
        fontSize: '30px',
        color: '#ffff00',
        stroke: '#000000',
        strokeThickness: 4
    }).setScrollFactor(0).setDepth(99);

        this.awayLabel = this.scene.add.text(560, 20, 'AWAY', {
        fontFamily: 'Arial Black',
        fontSize: '30px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4
    }).setScrollFactor(0).setDepth(99);

    this.awayText = this.scene.add.text(700, 20, '0', {
        fontFamily: 'Arial Black',
        fontSize: '30px',
        color: '#ffff00',
        stroke: '#000000',
        strokeThickness: 4
    }).setScrollFactor(0).setDepth(99);

        this.goalText = this.scene.add.text(320, 260, 'GOAL!!', {
            fontFamily: 'Arial Black',
        fontSize: '30px',
        color: '#ffff00',
        stroke: '#000000',
        strokeThickness: 4
        })
        .setScrollFactor(0)
        .setDepth(200)
        .setVisible(false);
        this.updateScore();
    }

    update() {

        const bx = this.scene.ball.sprite.x;
        const by = this.scene.ball.sprite.y;

        const goalTop = this.scene.centerY - 90;
        const goalBottom = this.scene.centerY + 90;

        // izquierda = AWAY
        if (
            !this.goalLock &&
            bx < this.scene.offsetX - 20 &&
            by > goalTop &&
            by < goalBottom
        ) {
            this.goalLock = true;
            this.scoreAway++;
            this.updateScore();
            this.resetBall();
        }

        // derecha = HOME
        if (
            !this.goalLock &&
            bx > this.scene.offsetX + this.scene.fieldWidth + 5 &&
            by > goalTop &&
            by < goalBottom
        ) {
            this.goalLock = true;
            this.scoreHome++;
            this.updateScore();
            this.resetBall();
        }
    }

    updateScore() {
    this.homeText.setText(this.scoreHome);
    this.awayText.setText(this.scoreAway);
}

    resetBall() {

        this.scene.player.sprite.body.setVelocity(0);
        this.scene.enemy.sprite.body.setVelocity(0);
        this.scene.ball.sprite.body.setVelocity(0);

        this.goalText.setVisible(true);

        this.scene.physics.pause();

        this.scene.time.delayedCall(1000, () => {

            this.scene.player.sprite.x = this.scene.startPlayerX;
            this.scene.player.sprite.y = this.scene.startPlayerY;

            this.scene.enemy.sprite.x = this.scene.startEnemyX;
            this.scene.enemy.sprite.y = this.scene.startEnemyY;

            this.scene.ball.sprite.x = this.scene.centerX + 50;
            this.scene.ball.sprite.y = this.scene.centerY;

            this.scene.ball.owner = 'player';
            this.scene.ball.state = 'IDLE';

            this.goalText.setVisible(false);

            this.scene.physics.resume();
            this.goalLock = false;
        });
    }
}