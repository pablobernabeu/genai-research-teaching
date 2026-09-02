// Marp CLI configuration.
// Docs: https://github.com/marp-team/marp-cli#configuration-file
//
// The custom theme (themes/workshop.css) extends the built-in `gaia` theme and
// wires in the logo and the title-slide disclaimer footer. `allowLocalFiles` is
// enabled so that local images render in HTML and PDF; the logo itself is embedded
// in the theme as a data URI, so a clean build needs nothing extra.

export default {
  // Register the custom theme so `theme: workshop` in slides.md resolves.
  themeSet: ['./themes/workshop.css'],

  // Allow local assets (images, a file-based logo) to be read during export.
  allowLocalFiles: true,

  // Enable inline HTML in Markdown (used sparingly for layout helpers).
  html: true,

  // Sensible PDF/HTML defaults.
  options: {
    looseYAML: false,
  },
};
