import ProtectedNavBar from "./components/NavBar";

const ProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <ProtectedNavBar />
      {children}
    </main>
  );
};
export default ProtectedLayout;
