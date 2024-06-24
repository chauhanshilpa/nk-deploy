// This file includes all hard coded constants

export const COLORS_LIST = [
  "E8C5E5",
  "FFCBCB",
  "95D2B3",
  "FCDC94",
  "B3E2A7",
  "CAF4FF",
  "CDE8E5",
  "A3D8FF",
  "9195F6",
];

export const NOTE_BACKGROUND_IMAGES_LIST = [
  {
    src: "https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/background-9.jpg",
  },
  {
    src: "https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/backgrund-18.jpg",
  },
  {
    src: "https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/background-5.jpg",
  },
  {
    src: "https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/background-11.jpg",
  },
  {
    src: "https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/background-4.jpg",
  },
  {
    src: "https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/background-15.jpg",
  },
  {
    src: "https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/background-7.jpg",
  },
  {
    src: "https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/background-6.jpg",
  },
  {
    src: "https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/background-16.jpg",
  },
];

interface Backgrounds {
  [key: number]: string;
}

export let CACHED_NOTE_BACKGROUND_IMAGES_LIST: { src: string }[] = [];

let backgrounds: Backgrounds = {};
if (typeof window !== "undefined") {
  const storedBackgrounds = localStorage.getItem("backgrounds");
  if (storedBackgrounds) {
    const parsedBackgrounds: { [key: string]: string } =
      JSON.parse(storedBackgrounds);
    const list: { src: string }[] = Object.values(parsedBackgrounds).map(
      (value) => ({
        src: value,
      })
    );
    CACHED_NOTE_BACKGROUND_IMAGES_LIST = list;
  } else {
    NOTE_BACKGROUND_IMAGES_LIST.forEach((item, index) => {
      backgrounds[index] = item.src;
    });
    localStorage.setItem("backgrounds", JSON.stringify(backgrounds));
  }
}
