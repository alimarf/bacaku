import Link from "next/link";
import Button from "./Button";
import { MdSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import AccountDropwdown from "./AccountDropdown";
import { useRouter } from "next/router";

type Props = {};

const Navbar: React.FC<Props> = () => {
  const [keyword, setKeyword] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const isLoggedin = true;

  useEffect(() => {
    setKeyword(router.query.keyword as string || '');
  }, [router.query.keyword]);

  return (
    <header className="h-16 border-b border-slate-200 flex items-center justify-between px-24">
      <Link href={"/"}>
        <img src="/images/logo-with-text.svg" />
      </Link>

      <div className="w-[720px] absolute left-1/2 -translate-x-1/2 flex items-center">
        <MdSearch className="text-slate-400 mr-4" size={24} />
        <input
          className="font-sans text-sm placeholder-slate-400 text-slate-900 outline-none"
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              router.push(`/search?keyword=${keyword}`);
            }
          }}
        />
      </div>

      {isLoggedin && (
        <div className="relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <img
              className="w-10 h-10 rounded-full object-cover"
              src="/images/dummy-avatar.png"
              alt="John Die"
            />
          </button>
          {isDropdownOpen && <AccountDropwdown />}
        </div>
      )}

      {!isLoggedin && (
        <Link href={"/auth/sign-in"}>
          <Button>Sign In</Button>
        </Link>
      )}
    </header>
  );
};
export default Navbar;
