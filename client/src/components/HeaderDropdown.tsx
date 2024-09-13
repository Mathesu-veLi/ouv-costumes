import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { IoIosArrowDropdown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface IHeaderDropdown {
  userName: string;
}

export function HeaderDropdown({ userName }: IHeaderDropdown) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    window.location.reload();
  }

  function redirectToEditPage() {
    navigate('/edit');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          <IoIosArrowDropdown />
          &nbsp;&nbsp;{userName}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={redirectToEditPage}>
            Edit account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
