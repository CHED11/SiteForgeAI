// Project gallery items. Images are served from the Unsplash CDN (stable,
// optimised, free to use) with fixed crop + quality params for fast loads.
const img = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`

export const PROJECTS = [
  {
    image: img('photo-1600585154340-be6161a56a0c'),
    title: 'Modern Family Home',
    category: 'New Home Rendering',
    location: 'Mermaid Waters',
  },
  {
    image: img('photo-1600596542815-ffad4c1539a9'),
    title: 'Coastal Acrylic Render',
    category: 'Acrylic Render',
    location: 'Palm Beach',
  },
  {
    image: img('photo-1576941089067-2de3c901e126'),
    title: 'Contemporary Façade',
    category: 'Texture Coatings',
    location: 'Burleigh Heads',
  },
  {
    image: img('photo-1512917774080-9991f1c4c750'),
    title: 'Luxury Residence',
    category: 'Residential Rendering',
    location: 'Broadbeach Waters',
  },
  {
    image: img('photo-1564013799919-ab600027ffc6'),
    title: 'Render Refresh & Repair',
    category: 'Remedial Rendering',
    location: 'Robina',
  },
  {
    image: img('photo-1570129477492-45c003edd2be'),
    title: 'Hamptons-Style Build',
    category: 'New Home Rendering',
    location: 'Hope Island',
  },
  {
    image: img('photo-1583608205776-bfd35f0d9f83'),
    title: 'Pool Surround & Feature Wall',
    category: 'Walls, Fences & Pool Areas',
    location: 'Varsity Lakes',
  },
  {
    image: img('photo-1486304873000-235643847519'),
    title: 'Commercial Shopfront',
    category: 'Commercial Rendering',
    location: 'Southport',
  },
]
