import React from "react";
import { Icon } from "./type";

const RemitaIcon = ({ ...props }: Icon) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
    >
      <rect width="44" height="44" rx="5" fill="#FF6363" fill-opacity="0.15" />
      <path
        d="M14.916 16.3077V29.5783C14.916 32.7273 16.5441 33.4663 18.5363 31.2278C18.7264 30.9876 18.9716 30.7969 19.2512 30.6716C19.5307 30.5464 19.8362 30.4903 20.142 30.5081C20.4478 30.526 20.7448 30.6173 21.0078 30.7742C21.2708 30.9312 21.4922 31.1492 21.6531 31.4098L22.7884 33.0057C22.9552 33.2925 23.1943 33.5305 23.4819 33.6959C23.7695 33.8613 24.0954 33.9483 24.4272 33.9483C24.7589 33.9483 25.0848 33.8613 25.3724 33.6959C25.66 33.5305 25.8991 33.2925 26.0659 33.0057L27.137 31.4206C27.2991 31.1599 27.5215 30.9419 27.7854 30.785C28.0493 30.6282 28.3471 30.537 28.6535 30.5191C28.96 30.5013 29.2663 30.5573 29.5467 30.6825C29.827 30.8077 30.0732 30.9983 30.2645 31.2385C32.2567 33.477 33.8847 32.738 33.8847 29.589V16.3077C33.8847 11.5629 32.8136 10.374 28.6043 10.374H12.1848"
        stroke="#FF6363"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.6553 10.374C10.8452 10.374 10.3846 11.5629 10.3846 16.3077V19.521C10.3233 20.2179 10.5327 20.9117 10.9695 21.4582C11.4064 22.0048 12.037 22.362 12.7303 22.4557H14.8724V16.297C14.9153 11.5629 14.4654 10.374 12.6553 10.374Z"
        stroke="#FF6363"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M24.309 17.5078L22.2847 21.4815H26.569L24.2876 25.4552"
        stroke="#FF6363"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default RemitaIcon;
