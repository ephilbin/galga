let my_sprite = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . 4 4 4 . . . . 4 4 4 . . . .
    . 4 5 5 5 e . . e 5 5 5 4 . . .
    4 5 5 5 5 5 e e 5 5 5 5 5 4 . .
    4 5 5 4 4 5 5 5 5 4 4 5 5 4 . .
    e 5 4 4 5 5 5 5 5 5 4 4 5 e . .
    . e e 5 5 5 5 5 5 5 5 e e . . .
    . . e 5 f 5 5 5 5 f 5 e . . . .
    . . f 5 5 5 4 4 5 5 5 f . f f .
    . . . 4 5 5 f f 5 5 6 f f 5 f .
    . . . f 6 6 6 6 6 6 4 f 5 5 f .
    . . . f 5 5 5 5 5 5 5 4 5 f . .
    . . . . f 5 4 5 f 5 f f f . . .
    . . . . . f f f f f f f . . . .
`, SpriteKind.Player)
my_sprite.setStayInScreen(true)
info.setLife(3)
controller.moveSprite(my_sprite, 500, 500)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_event_pressed() {
    let dart = sprites.createProjectileFromSprite(img`
        .............beebbbb............
        ............eebbbb4bb...........
        ............eb344bb4bb..........
        ............e44334bb4bb.........
        ............eb433344b4be........
        ............4eb43344444be.......
        ...........bd4eb43333344bb......
        ..........b455d4443333444bb.....
        ..........4d5555d444333444bb....
        .........4555555dd4b4443444be...
        ........bd5555d555d4bb444444ee..
        ........b55ddd665555bb4b44444ee.
        .......bd5555677655554ebb44444eb
        .......43222558855555d4eeb44b4ee
        ......b422332ddd555222d4eebbb4be
        ......be22232ed55522332db4ebbbbe
        .....bde22222e555e22232edd4bbbbe
        .....b52e222e3555e22222eddd4ebee
        ....bd552eee355552e222e355544eee
        ....665dd5555555552eee355dd4deee
        ...6776555555555555555551554d4ee
        ...4885222555dddd6655551544d4eee
        ..b45522332555dd677611d444ddeee.
        ..4d5222232e55555881d44ddd4eee..
        .bdd5e22222e555115114d54d4ee....
        .b55d2e222e351144d1d55eeee......
        bd5ddd2eee3d444555dd4e..........
        b555115dddd55d544eede...........
        4511d444d5544ee...4de...........
        41d4555d4ee........44...........
        41554eede.......................
        44ee...4e.......................
    `, my_sprite, 200, 0)
})
game.onUpdateInterval(500, function on_update_interval() {
    let bogey = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . b 5 5 b . . .
        . . . . . . b b b b b b . . . .
        . . . . . b b 5 5 5 5 5 b . . .
        . b b b b b 5 5 5 5 5 5 5 b . .
        . b d 5 b 5 5 5 5 5 5 5 5 b . .
        . . b 5 5 b 5 d 1 f 5 d 4 f . .
        . . b d 5 5 b 1 f f 5 4 4 c . .
        b b d b 5 5 5 d f b 4 4 4 4 b .
        b d d c d 5 5 b 5 4 4 4 4 4 4 b
        c d d d c c b 5 5 5 5 5 5 5 b .
        c b d d d d d 5 5 5 5 5 5 5 b .
        . c d d d d d d 5 5 5 5 5 d b .
        . . c b d d d d d 5 5 5 b b . .
        . . . c c c c c c c c b b . . .
    `, SpriteKind.Enemy)
    bogey.setVelocity(-100, 0)
    bogey.left = scene.screenWidth()
    // makes it travel entire screen
    bogey.y = randint(0, scene.screenHeight())
    bogey.setFlag(SpriteFlag.AutoDestroy, true)
})
// collison event code between sprites 
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    // function to destroy sprite and remove a life 
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
// Collision events code between enemy and projectiles 
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_projectile_overlap(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy()
    sprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
