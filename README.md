# urlsnap - Link Shortener Application

## Overview

A modern, feature-rich URL shortener designed to simplify link sharing and tracking. With advanced analytics, QR code generation, and a sleek, responsive design, this tool empowers users to manage their links effortlessly.  

🌐 [View the Project](https://urlsnap.netlify.app/) 
---
## Features  

- **Custom URL Shortening**  
  Users can create custom aliases for shortened URLs to make them more memorable.  

- **QR Code Generation**  
  Automatically generates QR codes for every shortened URL, enabling easy sharing and access.  

- **Responsive Design**  
  Styled with **Tailwind CSS**, ensuring a modern and seamless user experience across devices.  

- **Powered by Supabase**  
  Utilizes **Supabase** for secure data storage and user authentication.  

- **Link Analytics**  
  - **Click Count**: Tracks the number of times a link is accessed.  
  - **Device Insights**: Identifies the type of device (mobile, desktop, etc.) used to access the link.  
  - **Geographical Data**: Provides the city where the link was opened, offering valuable location-based insights.  


---

## Tech Stack

### Core Dependencies
- **React**: Frontend framework.
- **Tailwind CSS**: For styling.
- **Supabase**: Backend services (database, authentication).
- **ShadCN**: For reusable component utilities.
- **React-Router**: Client-side routing.

### Additional Tools
- **React-QRCode-Logo**: QR code generation.
- **Yup**: Schema validation for forms.
- **Lucide-React**: Icon library.
- **UA Parser**: Extracts detailed device and browser information for analytics.  
- **Recharts**: For creating interactive and visually appealing charts in the analytics dashboard.  

---

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AnishPillai2002/snapurl
   cd snapurl
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Create a `.env` file in the root directory and configure the following:
   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_KEY=your-supabase-key
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser to see the app running.

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to your fork and create a pull request.

---

## License

urlsnap is released under the MIT License.

--- 

This documentation provides a comprehensive guide for developers to install, run, and contribute to the project. Let me know if you need help customizing this further!
