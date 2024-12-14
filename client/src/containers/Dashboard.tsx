import { UserRole } from '@/enums/UserRole';
import { useUserStore } from '@/store/useUserStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function Dashboard() {
  const { role } = useUserStore().userData;
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== UserRole.Admin) {
      toast.error('You are not authorized to access this page');
      return navigate('/');
    }
  });
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen pt-52 lg:pt-0">
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
}
