import "../globals.css";

export const metadata = {
  title: "พิมพ์เอกสาร - ระบบการเงิน โรงเรียนวัดบ้านดอน",
};

export default function PrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="bg-white text-black print:bg-white">
        {children}
      </body>
    </html>
  );
}
