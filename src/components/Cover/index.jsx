import styles from "./Cover.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

//Array de imagens utilizadas no carrossel da página//
const slides = [
  {
    image: "/cover1.jpg",
    textClass: "slideText1",
  },
  {
    image: "/cover2.jpg",
    textClass: "slideText2",
  },
  {
    image: "/cover3.jpg",
    textClass: "slideText3",
  },
  {
    image: "/cover4.jpg",
    textClass: "slideText4",
  },
];

export default function Cover() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalTime = 7500;

  //Aqui faço o uso do setInterval para cronometrar o tempo da imagem do banner na tela//
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [intervalTime, currentIndex]);

  //Aqui se inicia a parte visual da página, utilizando um modo carrossel nas imagens do banner//
  return (
    <div className={styles.carousel}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === currentIndex ? styles.active : ""
          }`}
        >
          <Image
            src={slide.image}
            alt={`Slide ${index}`}
            fill
            className={styles.image}
            priority={index === 0}
          />

          {index === currentIndex && (
            <div className={`${styles.textOverlay} ${styles[slide.textClass]}`}>
              <div className={styles.textGroup}>
                <p>{slide.subtitle}</p>
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  ); //Botões utilizados para navegar entre as imagens do carrossel//
}
