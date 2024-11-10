import AuthNavBar from "./components/NavBar";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <AuthNavBar />
      {children}
    </main>
  );
};
export default AuthLayout;
