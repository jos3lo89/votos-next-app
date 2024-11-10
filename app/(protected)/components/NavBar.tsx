import { ModeToggle } from "@/components/theme/ModeToggle";
import UserMenu from "@/components/UserMenu";

const ProtectedNavBar = () => {
  return (
    <header className="flex justify-end items-center px-20 py-2  gap-6">
      <ModeToggle />
      <UserMenu />
    </header>
  );
};
export default ProtectedNavBar;
