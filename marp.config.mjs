// Marp CLI configuration.
// Docs: https://github.com/marp-team/marp-cli#configuration-file
//
// The custom theme (themes/workshop.css) extends the built-in `gaia` theme and
// wires in the logo and the persistent disclaimer footer. `allowLocalFiles` is
// enabled so a file-based logo or local images render in HTML and PDF; the
// placeholder logo is embedded in the theme as a data URI, so a clean build
// needs nothing extra.

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
