import { UserRole } from '@/enums/UserRole';
import { IUserData } from '@/interfaces/IUserData';
import { api } from '@/lib/axios';
import { useUserStore } from '@/store/useUserStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface LocalUserData extends IUserData {
  role: UserRole;
}

export function Dashboard() {
  const navigate = useNavigate();

  const { token } = useUserStore();

  async function authorizeAdmin() {
    await api
      .get<LocalUserData>('/token')
      .then((userData) => {
        if (userData.data.role !== UserRole.Admin) {
          toast.error('Access Unauthorized');
          return navigate('/');
        }
      })
      .catch((e) => {
        toast.error(e.response.data.message);
        return navigate('/');
      });
  }

  useEffect(() => {
    if (!token) {
      toast.error('Please log in first');
      return navigate('/login');
    }
    
    authorizeAdmin();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen pt-52 lg:pt-0">
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
}
