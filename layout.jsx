// app/layout.jsx

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body style={{ backgroundColor: "#f5f5f5", margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
