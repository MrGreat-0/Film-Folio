import React from "react";

const About = () => {
  return (
    <div className="w-full min-h-[90vh] flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-5xl font-bold mb-6 text-center">About Filmfolio</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Welcome to Filmfolio, your ultimate destination for exploring an
        extensive database of movies, TV shows, and celebrity profiles. Powered
        by React, Filmfolio provides users with a dynamic and engaging platform
        to discover the latest and greatest in the world of entertainment.
      </p>

      <h2 className="text-4xl font-semibold mb-4">Features</h2>
      <p className="text-lg text-gray-600 mb-4 text-center">
        Filmfolio is designed to offer an immersive browsing experience. Key
        features of our platform include:
      </p>
      <ul className="list-disc list-inside text-lg text-gray-600 mb-6">
        <li>
          <span className="font-bold">Extensive Library:</span> Browse through a
          vast collection of movies and TV shows across various genres and eras.
        </li>
        <li>
          <span className="font-bold">Detailed Profiles:</span> Access
          comprehensive information on movies, TV shows, and actors, including
          synopses, cast details, release dates, and ratings.
        </li>
        <li>
          <span className="font-bold">Trailers & Clips:</span> Watch trailers
          and video clips for selected movies and TV shows directly within the
          app.
        </li>
        <li>
          <span className="font-bold">Seamless Scrolling:</span> Enjoy infinite
          scrolling for effortless browsing without interruptions.
        </li>
        <li>
          <span className="font-bold">Responsive Design:</span> With a modern UI
          built using Tailwind CSS, Filmfolio is optimized for all devices,
          providing a great user experience whether on desktop or mobile.
        </li>
      </ul>

      <h3 className="text-3xl font-semibold mb-4">Technologies</h3>
      <p className="text-lg text-gray-600 mb-4 text-center">
        Filmfolio is built with the following technologies:
      </p>
      <ul className="list-disc list-inside text-lg text-gray-600 mb-6">
        <li>
          <span className="font-bold">React:</span> For developing an
          interactive and dynamic user interface.
        </li>
        <li>
          <span className="font-bold">Redux Toolkit:</span> To efficiently
          manage the application state.
        </li>
        <li>
          <span className="font-bold">Vite:</span> As our modern build tool for
          a streamlined development experience.
        </li>
        <li>
          <span className="font-bold">Axios:</span> For making seamless HTTP
          requests to fetch real-time data from The Movie Database (TMDb) API.
        </li>
        <li>
          <span className="font-bold">React Router DOM:</span> To handle routing
          and navigation across different views.
        </li>
        <li>
          <span className="font-bold">Tailwind CSS:</span> A utility-first
          framework for building responsive layouts.
        </li>
        <li>
          <span className="font-bold">Swiper:</span> To create responsive
          carousels and sliders for content showcase.
        </li>
        <li>
          <span className="font-bold">React Player:</span> To incorporate a
          video player for trailers and clips.
        </li>
      </ul>

      <h3 className="text-3xl font-semibold mb-4">Visit the App</h3>
      <p className="text-lg text-gray-600 mb-4 text-center">
        Ready to explore Filmfolio? Check out our live demo
        <a
          className="text-blue-600 font-semibold hover:underline px-1"
          href="https://film-folio-pi.vercel.app/"
          target="_blank"
        >
          here
        </a>
        and dive into the world of movies and television shows at your
        fingertips. Discover, learn, and enjoy all your favorites—and maybe find
        some new ones!
      </p>
    </div>
  );
};

export default About;
