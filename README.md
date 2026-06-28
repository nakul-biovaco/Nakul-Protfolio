# Nakul Mahendra Mundhada's Portfolio

Welcome to the official portfolio of Nakul Mahendra Mundhada, an aspiring Embedded Systems & AI Engineer. This platform showcases my projects, skills, education, internships, and certifications, reflecting my passion for IoT solutions in agriculture and smart technologies.

## Technologies Used

This portfolio is built with:

-   **Next.js 14**: A React framework for building full-stack web applications.
-   **React**: A JavaScript library for building user interfaces.
-   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
-   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
-   **Shadcn/ui**: A collection of re-usable components built with Radix UI and Tailwind CSS.
-   **Lucide React**: A beautiful collection of open-source icons.
-   **Framer Motion**: A production-ready motion library for React.
-   **Supabase**: An open-source Firebase alternative for database, authentication, and storage.

## Features

-   **Responsive Design**: Optimized for various screen sizes, from mobile to desktop.
-   **Interactive UI**: Custom cursor follower, particle background, and scroll progress indicator for an engaging user experience.
-   **Dynamic Content**: Sections for projects, internships, education, skills, and certifications.
-   **Theme Toggle**: Switch between light and dark modes.
-   **Contact Form**: For inquiries and collaborations.
-   **Media Gallery**: Showcase videos and photos with like and comment functionality.
-   **SEO Optimized**: Configured with metadata for better search engine visibility.

## Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/your-username/NakulProtfolio.git
cd NakulProtfolio
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of your project and add your Supabase credentials:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
SUPABASE_JWT_SECRET=YOUR_SUPABASE_JWT_SECRET
\`\`\`

You can find these keys in your Supabase project settings under `API`.

### 4. Run Supabase Migrations (Optional, for local Supabase setup)

If you are running Supabase locally or need to apply schema changes, you can use the provided SQL scripts.

First, ensure your Supabase project is linked and you have the Supabase CLI installed.

\`\`\`bash
# Link your local project to your Supabase project
supabase link --project-ref your-project-id

# Pull the latest schema from your Supabase project
supabase db pull

# Apply migrations (if you have new migration files)
supabase migration up
\`\`\`

Alternatively, you can manually run the SQL scripts in your Supabase SQL Editor:

-   `scripts/create-schema.sql`
-   `scripts/create-tables.sql`
-   `scripts/create-demo-requests-table.sql`
-   `scripts/create-partnership-volunteer-tables.sql`
-   `scripts/supabase-schema.sql` (This is often a dump of your current schema, useful for initial setup)

### 5. Seed Database (Optional)

To populate your database with sample data, run the seed scripts:

\`\`\`bash
# You might need a custom script or use the Supabase UI to insert data
# Example:
# pnpm tsx scripts/seed-data.ts
# pnpm tsx scripts/seed-sample-data.ts
\`\`\`

### 6. Run the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

\`\`\`
.
├── app/
│   ├── about/             # About page
│   ├── api/               # API routes (e.g., analytics)
│   ├── certifications/    # Certifications page
│   ├── company/           # Company related pages (Electroculture, Foundation)
│   ├── contact/           # Contact page
│   ├── education/         # Education page
│   ├── internships/       # Internships list and detail pages
│   ├── media/             # Media gallery and detail pages
│   ├── projects/          # Projects list and detail pages
│   ├── skills/            # Skills page
│   ├── globals.css        # Global CSS styles
│   ├── layout.tsx         # Root layout for the application
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # Shadcn/ui components
│   ├── certificate-viewer.tsx
│   ├── comment-section.tsx
│   ├── contact-form.tsx
│   ├── cursor-follower.tsx
│   ├── demo-scheduler.tsx
│   ├── floating-action-button.tsx
│   ├── loading-spinner.tsx
│   ├── material-icons.tsx
│   ├── media-card.tsx
│   ├── navigation.tsx
│   ├── parallax-container.tsx
│   ├── particle-background.tsx
│   ├── partnership-form.tsx
│   ├── scroll-progress.tsx
│   ├── theme-provider.tsx
│   ├── typewriter-text.tsx
│   ├── visitor-analytics-card.tsx
│   └── volunteer-form.tsx
├── hooks/
│   ├── use-dynamic-data.ts
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   ├── actions/           # Server Actions for database operations
│   ├── api.ts             # API utility functions
│   ├── supabase.ts        # Supabase client initialization
│   └── utils.ts           # Utility functions (e.g., cn for class names)
├── public/
│   ├── ADDER.png
│   ├── AGC.jpg
│   ├── HPCA.png
│   ├── MORSE.png
│   ├── RTL.png
│   ├── T.png
│   ├── certificates/      # Certificate images and PDFs
│   ├── favicon.png        # Favicon
│   ├── images/            # General images (logos, profile, etc.)
│   ├── nakul-og-image.png # Open Graph image
│   └── placeholder.svg    # Placeholder images
├── scripts/               # SQL scripts for database setup and seeding
├── styles/
│   └── globals.css        # Global CSS (might be merged into app/globals.css)
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies and scripts

\`\`\`

## Contributing

Feel free to fork the repository and contribute!

## License

This project is open source and available under the [MIT License](LICENSE).
