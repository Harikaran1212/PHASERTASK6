import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const PhaserGame = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    // Phaser configuration
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 430,
      scene: {
        preload: preload,
        create: create,
      },
    };

    // Initialize the Phaser game
    gameRef.current = new Phaser.Game(config);

    return () => {
      // Cleanup Phaser game on component unmount
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

  function preload() {
    this.load.image("background", "assets/background.jpg"); // Load the background image
    this.load.image("image1", "assets/image2.png");
    this.load.image("image2", "assets/robot.png");
    this.load.audio("backgroundMusic", "assets/background-music.mp3");
  }

  function create() {
    // Add the background image
    this.add.image(400, 215, "background").setScale(1); // Center and scale the background

    // Play background music
    const music = this.sound.add("backgroundMusic");
    music.play({ loop: true });

    // Add and tween the first image
    const image1 = this.add.image(50, 300, "image1");

    this.tweens.add({
      targets: image1,
      x: 700,
      y: 300,
      angle: 360,
      duration: 4000,
      ease: "Power1",
      onComplete: () => {
        image1.destroy(); // Destroy the first image

        // Add and show the second image
        const image2 = this.add.image(700, 300, "image2");

        // Tween the second image
        this.tweens.add({
          targets: image2,
          x: 415,
          y: 300,
          angle: -360,
          duration: 3000,
          ease: "Power1",
        });
      },
    });
  }

  return <div id="phaser-game" />;
};

export default PhaserGame;
