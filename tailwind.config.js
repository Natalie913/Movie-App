 

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure Tailwind scans your files
    theme: {
      extend: {
        colors: {
          "red-main": "rgb(185, 28, 28)", // Change this to your desired color
        },
      },
    },
    plugins: [],
  };
  