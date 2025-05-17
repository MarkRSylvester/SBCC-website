// Replace Our Story accordion content
const ourStory = document.querySelector('#our-story-accordion .accordion-content');
if (ourStory) {
  ourStory.innerHTML = `
    <div class="our-story-wrapper">
      <p class="accordion-intro">
        We’re a community of chefs making private dining effortless and unforgettable. Whether it’s an intimate dinner or a weekend retreat, we’ll match you with the right chef to bring your vision to life.
      </p>

      <!-- rest of the accordion content stays here -->
    </div>
  `;
}
