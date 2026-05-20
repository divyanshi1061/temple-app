# Website Redesign: Modern Luxury Aesthetic

This plan outlines the steps to transition the Maa Baglamukhi Temple website from its current traditional temple aesthetic (heavy saffron, mandalas, bright glows) to a "modern luxury aesthetic" similar to Apple, Rolex, or Stripe. 

## User Review Required

> [!IMPORTANT]
> The requested "Apple/Stripe/Rolex" luxury SaaS aesthetic represents a **significant departure** from the traditional Hindu temple aesthetic currently in place. 
> - **Colors:** We will shift from vibrant Saffron and Temple Orange to a sophisticated monochromatic palette (crisp whites, deep blacks/charcoals) with **subtle, premium gold/bronze accents**.
> - **Typography:** We will primarily use `Inter` (a clean, modern sans-serif) to match the Apple/Stripe feel, completely removing or significantly minimizing the use of traditional serif fonts like Cormorant and Cinzel.
> - **Decorations:** Traditional background mandalas, heavy gradients, and floating sparkles will be replaced by clean white space, very soft blur effects (glassmorphism), and subtle micro-animations.

Please confirm if this extreme shift in visual identity (from traditional temple to modern luxury SaaS) aligns with your vision for the Mandir's website.

## Proposed Changes

### Global Styling & Assets

#### [MODIFY] [globals.css](file:///c:/Rudraksh-baglamukhi/temple-app/src/app/globals.css)
- **Colors:** Redefine the color palette to focus on crisp white (`#FFFFFF`), off-white/light gray for backgrounds (`#FAFAFA`, `#F5F5F7`), deep charcoal for text (`#111111`, `#1D1D1F`), and a muted, premium gold for accents (`#D4AF37` or `#C5A059`).
- **Typography:** Set `Inter` as the primary font for almost all text to give that Stripe/Apple clean look. 
- **Effects:** Replace `divine-glow` with soft diffuse shadows `box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04)`.
- **Glassmorphism:** Update `.glass-*` classes to use intense background blur with highly transparent white backgrounds (Apple's frosted glass effect).
- **Buttons:** Update `.btn-sacred` to be sleek and minimal (e.g., solid black with white text or solid premium gold with subtle hover elevation).

### Component Refactoring

The following components will be refactored to remove traditional patterns, heavy colors, and complex SVGs in favor of massive white space, clean borders, rounded corners (e.g., `rounded-2xl` or `rounded-3xl`), and crisp alignment.

#### [MODIFY] [HeroSection.tsx](file:///c:/Rudraksh-baglamukhi/temple-app/src/components/home/HeroSection.tsx)
- Remove the complex rotating mandala SVG and floating "✨" emojis.
- Implement a massive, bold, centered typography layout typical of Apple product pages.
- Use a soft, subtle blurred gradient background instead of heavy radial gradients.
- Streamline the CTA buttons to pill shapes or clean rounded rectangles.

#### [MODIFY] [Navbar.tsx](file:///c:/Rudraksh-baglamukhi/temple-app/src/components/layout/Navbar.tsx)
- Convert to a floating frosted-glass pill or an ultra-clean top bar.
- Simplify the logo presentation (remove the background radial glow).
- Change navigation links to use clean, small uppercase tracking or simple medium-weight sans-serif text.

#### [MODIFY] [ServicesSection.tsx](file:///c:/Rudraksh-baglamukhi/temple-app/src/components/home/ServicesSection.tsx)
- Remove the SVG mandala background pattern.
- Update the cards to be ultra-clean: white background, very thin light gray border (`border-black/5`), significant internal padding, and soft hover lift.

#### [MODIFY] [BookingSection.tsx](file:///c:/Rudraksh-baglamukhi/temple-app/src/components/home/BookingSection.tsx)
- Remove the background radial glow.
- Convert the progress tracker to a sleek minimal design (e.g., thin lines and small dots).
- Style input fields with light gray backgrounds (`bg-gray-50`), no borders, or very subtle focus rings (Stripe style).

#### [MODIFY] Other Sections
- `AboutSection.tsx`, `TestimonialsSection.tsx`, `GallerySection.tsx`, `ContactSection.tsx`, `Footer.tsx` will all have their heavy traditional styling replaced with the new minimal, high-spacing, premium aesthetic.

## Verification Plan

### Manual Verification
- After applying the changes, I will use the browser tool to visually inspect the website at `http://localhost:3000`.
- I will verify the responsive layout (mobile, tablet, desktop) to ensure padding and typography scale correctly.
- I will take screenshots of the key sections (Hero, Booking, Services) and embed them in a Walkthrough artifact for your review.
