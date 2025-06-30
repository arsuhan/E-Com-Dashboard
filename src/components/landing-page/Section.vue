<template>
  <div
    id="hero"
    class="pt-6 px-6 lg:px-20 overflow-hidden min-h-screen flex flex-col lg:flex-row items-center lg:mt-1 md:-mt-"
    style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
  >
    <!-- Text Section -->
    <div class="w-full flex justify-center lg:justify-start items-center text-center lg:text-left px-4 md:px-12 md:mt-8 xs:mt-0">
      <div>
        <h1 class="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight transition ease-linear duration-500 hover:scale-105">
          <span class="font-light block">Welcome to e-shop - Quality Products at Your Fingertips!</span>
          High-Quality, Affordable..
        </h1>
        <p class="text-base sm:text-lg md:text-lg lg:text-2xl font-normal leading-normal mt-4 text-gray-700">
          Shop Now | Explore Categories
        </p>
        <Button
          label="All Products"
          as="router-link"
          to="/products"
          rounded
          class="!text-base sm:!text-lg lg:!text-xl mt-6 lg:mt-8 !px-4"
        />
      </div>
    </div>

    <!-- Image Section -->
    <div class="w-full flex justify-center items-center mt-10 lg:mt-0 transition ease-linear duration-500 hover:scale-110">
      <img
        src="https://www.pngall.com/wp-content/uploads/4/Headphone-Transparent-PNG.png"
        alt="Hero Image"
        class="w-3/4 md:w-2/3 lg:w-9/12"
      />
    </div>
  </div>
</template>
