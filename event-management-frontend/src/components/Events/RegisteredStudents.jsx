import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import api from '../../utils/axios';
import { showToast } from '../../utils/auth';

const RegisteredStudents = () => {
  const { eventId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/events/${eventId}/registered-students`);
        setStudents(res.data.data.students || []);
      } catch (err) {
        showToast(err.response?.data?.message || 'Error loading registered students', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [eventId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-primary-600" />
              <h1 className="text-xl font-bold text-gray-900">Registered Students</h1>
            </div>
            <Link to="/student-dashboard" className="btn-secondary flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading students...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No registered students to show</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Name</th>
                    <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">USN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {students.map((s) => (
                    <tr key={s._id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{s.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{s.usn || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisteredStudents;
