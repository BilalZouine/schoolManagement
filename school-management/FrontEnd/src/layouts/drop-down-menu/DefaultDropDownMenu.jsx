import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  User,
  LogOut,
} from 'lucide-react'
import { useStudentContext } from "../../context/StudentContext";
import StudentApi from "../../service/api/student/UserApi";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTER } from "../../router";

export default function DefaultDropDownMenu({ children }) {

  const { student, logout: contextLogut } = useStudentContext();
  const navigate = useNavigate();
  const logout = () => {
    StudentApi.logout()
      .then(() => {
        contextLogut()
        window.localStorage.removeItem('token')
        navigate(LOGIN_ROUTER); // Redirect to the login page

      })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button ><User /> {student.name ?? student.firstname} </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {children}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
