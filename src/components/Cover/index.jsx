import styles from "./Cover.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

//Array de imagens utilizadas no carrossel da página//
const slides = [
  {
    image: "/cover1.jpg",
    title: "ÓCULOS DE GRAU E DE SOL",
    subtitle: "Preços baixos em",
    description: "Você só encontra aqui",
  },
  {
    image: "/cover2.jpg",
    title: "LENTES COM DESCONTO",
    subtitle: "Ofertas exclusivas em",
    description: "Aproveite agora mesmo",
  },
  {
    image: "/cover3.jpg",
    title: "NOVIDADES EM ARMAÇÕES",
    subtitle: "Chegaram os lançamentos",
    description: "Modelos modernos e estilosos",
  },
  {
    image: "/cover4.jpg",
    title: "COMPRE SEM SAIR DE CASA",
    subtitle: "Facilidade e conforto",
    description: "Peça já pelo nosso site",
  },
];

export default function Cover() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalTime, setIntervalTime] = useState(7000);

  //Aqui faço o uso do setInterval para cronometrar o tempo da imagem do banner na tela//
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [intervalTime, currentIndex]);

  //Aqui a função de setas, permitindo avançar e voltar a imagem do banner//
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

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
            <div className={styles.textOverlay}>
              <p>{slide.subtitle}</p>
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
            </div>
          )}
        </div>
      ))}

      <button className={styles.prev} onClick={goToPrev}>
        &#10094;
      </button>
      <button className={styles.next} onClick={goToNext}>
        &#10095;
      </button>
    </div>
  ); //Botões utilizados para navegar entre as imagens do carrossel//
}
