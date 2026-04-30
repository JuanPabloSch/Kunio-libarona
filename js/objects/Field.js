export function setupWorld(scene) {
    scene.worldWidth = 3000;
    scene.worldHeight = 1800;

    scene.fieldWidth = 2000;
    scene.fieldHeight = 1200;

    scene.offsetX = (scene.worldWidth - scene.fieldWidth) / 2;
    scene.offsetY = (scene.worldHeight - scene.fieldHeight) / 2;

    scene.centerX = scene.offsetX + scene.fieldWidth / 2;
    scene.centerY = scene.offsetY + scene.fieldHeight / 2;
    }

    export function createField(scene) {

    const {
        worldWidth,
        worldHeight,
        fieldWidth,
        fieldHeight,
        offsetX,
        offsetY,
        centerX,
        centerY
    } = scene;

   // dibujar cancha
   // =========================
    // 🌿 FONDO PASTO
    // =========================
    scene.add.rectangle(
        worldWidth / 2,
        worldHeight / 2,
        worldWidth,
        worldHeight,
        0x0b3d0b
    );

    // =========================
    // ⚽ STRIPES CANCHA
    // =========================
    const stripeWidth = 100;

    for (let x = 0; x < fieldWidth; x += stripeWidth) {

        let color = (x / stripeWidth) % 2 === 0 ? 0x1f7a1f : 0x228b22;

        scene.add.rectangle(
            offsetX + x + stripeWidth / 2,
            centerY,
            stripeWidth,
            fieldHeight,
            color
        );
    }

    // =========================
    // 🧾 LÍNEAS CANCHA
    // =========================
    const line = scene.add.graphics();
    line.lineStyle(4, 0xffffff);
    
    scene.add.circle(offsetX + 200, centerY, 6, 0xffffff);
    scene.add.circle(offsetX + fieldWidth - 200, centerY, 6, 0xffffff);
    line.beginPath();
    line.arc(offsetX + 300, centerY, 80, -Math.PI / 2, Math.PI / 2);
    line.strokePath();

    line.beginPath();
    line.arc(offsetX + fieldWidth - 300, centerY, 80, Math.PI / 2, -Math.PI / 2);
    line.strokePath();
    // borde
    line.strokeRect(offsetX, offsetY, fieldWidth, fieldHeight);

    // media cancha
    line.beginPath();
    line.moveTo(centerX, offsetY);
    line.lineTo(centerX, offsetY + fieldHeight);
    line.strokePath();

    // círculo central
    line.strokeCircle(centerX, centerY, 80);

    // áreas grandes
    line.strokeRect(offsetX, centerY - 250, 300, 500);
    line.strokeRect(offsetX + fieldWidth - 300, centerY - 250, 300, 500);

    // áreas chicas
    line.strokeRect(offsetX, centerY - 150, 120, 300);
    line.strokeRect(offsetX + fieldWidth - 120, centerY - 150, 120, 300);

    // corners
    line.beginPath();
    line.arc(offsetX, offsetY, 80, 0, Math.PI / 2);
    line.strokePath();

    line.beginPath();
    line.arc(offsetX + fieldWidth, offsetY, 80, Math.PI / 2, Math.PI);
    line.strokePath();

    line.beginPath();
    line.arc(offsetX, offsetY + fieldHeight, 80, Math.PI * 1.5, 0);
    line.strokePath();

    line.beginPath();
    line.arc(offsetX + fieldWidth, offsetY + fieldHeight, 80, Math.PI, Math.PI * 1.5);
    line.strokePath();

    line.setDepth(1);

    const poleHeight = 50;
    const poleWidth = 4;
    const flagSize = 18;

    // arriba izquierda
    scene.add.rectangle(
        scene.offsetX,
        scene.offsetY - poleHeight / 2,
        poleWidth,
        poleHeight,
        0xffff00
    ).setDepth(2);

    scene.add.triangle(
        scene.offsetX + 7,
        scene.offsetY - poleHeight,
        0, 0,
        flagSize, 8,
        0, 16,
        0xff0000
    ).setDepth(2);

    // arriba derecha
    scene.add.rectangle(
        scene.offsetX + scene.fieldWidth,
        scene.offsetY - poleHeight / 2,
        poleWidth,
        poleHeight,
        0xffff00
    ).setDepth(2);

    scene.add.triangle(
        scene.offsetX + scene.fieldWidth + 11,
        scene.offsetY - poleHeight,
        0, 0,
        -flagSize, 8,
        0, 16,
        0xff0000
    ).setDepth(2);

    // abajo izquierda
    scene.add.rectangle(
        scene.offsetX,
        scene.offsetY + scene.fieldHeight - poleHeight / 2,
        poleWidth,
        poleHeight,
        0xffff00
    ).setDepth(2);

    scene.add.triangle(
        scene.offsetX + 7,
        scene.offsetY + scene.fieldHeight - poleHeight + 9,
        0, 0,
        flagSize, -8,
        0, -16,
        0xff0000
    ).setDepth(2);

    // abajo derecha
    scene.add.rectangle(
        scene.offsetX + scene.fieldWidth,
        scene.offsetY + scene.fieldHeight - poleHeight / 2,
        poleWidth,
        poleHeight,
        0xffff00
    ).setDepth(2);

    scene.add.triangle(
        scene.offsetX + scene.fieldWidth + 12,
        scene.offsetY + scene.fieldHeight - poleHeight + 10,
        0, 0,
        -flagSize, -8,
        0, -16,
        0xff0000
    ).setDepth(2);

    // 🥅 ARCO IZQUIERDO
    const goalDepth = 70;
    const goalHeight = 180;

    const thin = 3;
    const thick = 8;

    const postX = scene.offsetX;

    // poste delantero
    scene.add.rectangle(postX, scene.centerY, thick, goalHeight, 0xffffff).setDepth(1);

    // poste trasero
    scene.add.rectangle(postX - goalDepth, scene.centerY, thin, goalHeight, 0xffffff).setDepth(1);

    // travesaño
    scene.add.rectangle(postX - goalDepth / 2, scene.centerY - goalHeight / 2, goalDepth, thin, 0xffffff).setDepth(1);

    // base
    scene.add.rectangle(postX - goalDepth / 2, scene.centerY + goalHeight / 2, goalDepth, thin, 0xffffff).setDepth(1);

    // red
    const net = scene.add.graphics();
    net.lineStyle(1, 0xffffff, 0.6);

    const step = 15;

    for (let x = postX - goalDepth + step; x < postX; x += step) {
        net.beginPath();
        net.moveTo(x, scene.centerY - goalHeight / 2);
        net.lineTo(x, scene.centerY + goalHeight / 2);
        net.strokePath();
    }

    for (let y = scene.centerY - goalHeight / 2 + step; y < scene.centerY + goalHeight / 2; y += step) {
        net.beginPath();
        net.moveTo(postX - goalDepth, y);
        net.lineTo(postX, y);
        net.strokePath();
    }

    net.setDepth(1);

    // 🥅 ARCO DERECHO
    scene.add.rectangle(scene.offsetX + scene.fieldWidth, scene.centerY, 8, 180, 0xffffff).setDepth(1);
    scene.add.rectangle(scene.offsetX + scene.fieldWidth + 70, scene.centerY, 3, 180, 0xffffff).setDepth(1);
    scene.add.rectangle(scene.offsetX + scene.fieldWidth + 35, scene.centerY - 90, 70, 3, 0xffffff).setDepth(1);
    scene.add.rectangle(scene.offsetX + scene.fieldWidth + 35, scene.centerY + 90, 70, 3, 0xffffff).setDepth(1);

    // red derecha
    const netRight = scene.add.graphics();
    netRight.lineStyle(1, 0xffffff, 0.6);

    for (let x = scene.offsetX + scene.fieldWidth + 15; x < scene.offsetX + scene.fieldWidth + 70; x += 15) {
        netRight.beginPath();
        netRight.moveTo(x, scene.centerY - 90);
        netRight.lineTo(x, scene.centerY + 90);
        netRight.strokePath();
    }

    for (let y = scene.centerY - 75; y < scene.centerY + 90; y += 15) {
        netRight.beginPath();
        netRight.moveTo(scene.offsetX + scene.fieldWidth, y);
        netRight.lineTo(scene.offsetX + scene.fieldWidth + 70, y);
        netRight.strokePath();
    }

    netRight.setDepth(1);

    }
