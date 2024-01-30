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

interface IHeaderDropdown {
  userName: string;
}

export function HeaderDropdown({ userName }: IHeaderDropdown) {
  function logout() {
    localStorage.removeItem('user');
    window.location.reload();
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
          <DropdownMenuItem>Purchases</DropdownMenuItem>
          <DropdownMenuItem>Edit account</DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
