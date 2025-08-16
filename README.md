# Casa de Amor Mexican Restaurant Website

A modern, responsive website for Casa de Amor Mexican Restaurant located in Hobart, Tasmania.

## Features

- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Interactive Contact Forms**: Two-tab contact system with Issue Reports and General Enquiries
- **EmailJS Integration**: Automated email handling for customer inquiries
- **Bootstrap Framework**: Modern UI components and styling
- **Function/Event Booking**: Dedicated pages for private functions and events

## Pages

- `index.html` - Homepage with restaurant introduction
- `contact.html` - Contact page with dual-form system
- `Functions.html` - Functions and events information
- `food-fun.html` - Food and drinks menu
- `whats-on.html` - Current events and promotions

## Technologies Used

- HTML5
- CSS3
- Bootstrap 5.3.3
- JavaScript (ES6+)
- EmailJS for form handling

## File Structure

```
├── index.html              # Homepage
├── contact.html            # Contact page with dual forms
├── Functions.html          # Functions and events
├── food-fun.html          # Food and drinks menu
├── whats-on.html          # Current events and promotions
├── friday-happy-hour.html # Happy hour promotions
├── Everyday.html          # Daily specials
├── Weekends.html          # Weekend events
├── Trivia-Night.html      # Trivia night information
├── css/
│   ├── main.css           # Main stylesheet (imports all others)
│   ├── components.css     # Component-specific styles
│   ├── utilities.css      # Utility classes
│   ├── fonts.css          # Font definitions
│   └── faq.css           # FAQ section styles
├── js/
│   ├── navbar.js          # Common navbar functionality
│   ├── functions.js       # Functions page specific scripts
│   ├── contact-forms.js   # Contact form validation and EmailJS
│   └── *.min.js          # Minified versions
└── Images/               # All website images
    ├── logos/            # Logo variations
    ├── backgrounds/      # Hero section backgrounds
    ├── events/          # Event images
    └── gallery/         # Gallery images
```

## Code Organization

### HTML Files
All HTML files follow a consistent structure with organized section comments:
- `<!-- ==================== SECTION NAME ==================== -->`
- Each major section is clearly labeled for easy navigation
- Common elements (navbar, footer, booking modal) are consistent across all files

### CSS Architecture
- **Modular approach**: `main.css` imports all other stylesheets
- **Components**: Reusable UI components in `components.css`
- **Utilities**: Helper classes in `utilities.css`
- **Fonts**: All font definitions centralized in `fonts.css`

### JavaScript Structure
- **navbar.js**: Common functionality (scroll effects, FAQ toggles, carousel)
- **functions.js**: Page-specific scripts for Functions.html
- **contact-forms.js**: Comprehensive form validation and EmailJS integration

## Maintenance Guidelines

### Adding New Pages
1. Copy the structure from an existing HTML file
2. Update the `<title>` and meta description
3. Ensure navbar active states are correct
4. Include the same footer structure
5. Add appropriate section comments

### Updating Styles
1. Check if the style belongs in an existing CSS file
2. Follow the established naming conventions
3. Use CSS custom properties for colors when possible
4. Maintain responsive design principles

### Form Configuration
- EmailJS credentials are in `js/contact-forms.js`
- Two form types: 'issue' and 'enquiry'
- Validation patterns are centralized for easy updates

### Image Management
- Keep images optimized for web (< 500KB recommended)
- Use descriptive filenames
- Maintain consistent image dimensions within sections

## Setup

1. Clone this repository
2. Configure EmailJS credentials in `js/contact-forms.js`
3. Update restaurant information in contact sections
4. Test all forms before deployment
5. Open `index.html` in a web browser

## Contact Information

**Casa de Amor Mexican Restaurant**
- Address: 11 Morrison St, Hobart, TAS 7000
- Phone: (03) 6169 2286
- Email: info@casadeamor.com.au

## License

This project is for Casa de Amor Mexican Restaurant. All rights reserved.