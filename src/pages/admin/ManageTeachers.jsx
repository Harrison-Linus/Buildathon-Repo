import React from 'react';
import { GraduationCap, Mail, ShieldCheck } from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

export default function ManageTeachers() {
  const { teacherInfo } = useAcademic();

  const facultyList = [
    {
      id: teacherInfo.id,
      name: teacherInfo.name,
      designation: teacherInfo.designation,
      department: teacherInfo.department,
      email: teacherInfo.email,
      assignedClass: teacherInfo.assignedClass,
      avatar: teacherInfo.avatar,
    },
    {
      id: 'TCH-1003',
      name: 'Dr. S. Meenakshi',
      designation: 'Associate Professor',
      department: 'Computer Science and Engineering',
      email: 's.meenakshi@university.edu',
      assignedClass: 'CSE-A (Semester 6)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <h2 className="text-xl font-bold text-white font-heading">Manage Faculty Profiles</h2>
        <p className="text-xs text-slate-400 mt-1">Assign professors to course sections and oversee teaching workloads.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {facultyList.map((tch) => (
          <div key={tch.id} className="glass-card p-6 rounded-3xl flex items-start gap-4">
            <img src={tch.avatar} alt={tch.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/30" />
            <div className="space-y-1">
              <h3 className="font-bold text-base text-white">{tch.name}</h3>
              <p className="text-xs text-indigo-400 font-semibold">{tch.designation}</p>
              <p className="text-xs text-slate-400">{tch.department}</p>
              <div className="pt-2 text-[11px] text-slate-300">
                Assigned Section: <span className="font-bold text-white">{tch.assignedClass}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
