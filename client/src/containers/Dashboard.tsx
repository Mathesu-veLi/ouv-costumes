import { api } from '@/lib/axios';
import { useUserStore } from '@/store/useUserStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function Dashboard() {
  const navigate = useNavigate();

  const { token } = useUserStore();
  const [authorized, setAuthorized] = useState(false);

  async function authorizeAdmin() {
    await api
      .get('/token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => {
        toast.error(e.response.data.message);
        return navigate('/');
      })
      .then(() => toast.success('Access authorized'))
  }

  useEffect(() => {
    if (!token) {
      toast.error('Please log in first');
      return navigate('/login');
    }

    if (!authorized) authorizeAdmin();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen pt-52 lg:pt-0">
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
}
