import React from 'react';
import { FileCheck, CheckCircle2, Clock } from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

export default function AssignmentsView() {
  const { currentStudent } = useAcademic();

  const assignmentsList = [
    { id: 1, subject: 'CS601 Advanced Java', title: 'Spring Boot Microservices REST API', dueDate: 'Tomorrow', status: 'Graded', score: '10/10' },
    { id: 2, subject: 'MA602 Mathematics', title: 'Linear Algebra Eigenvalues Problem Set', dueDate: 'In 3 days', status: 'Pending Submission', score: '--' },
    { id: 3, subject: 'CS603 DBMS', title: 'B+ Tree Indexing & Query Plan Optimization', dueDate: 'Next week', status: 'Graded', score: '9/10' },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <h2 className="text-2xl font-bold text-white font-heading">Assignments & Lab Records</h2>
        <p className="text-xs text-slate-400 mt-1">Track upcoming assignment deadlines and graded laboratory submissions.</p>
      </div>

      <div className="space-y-4">
        {assignmentsList.map((asgn) => (
          <div key={asgn.id} className="glass-card p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{asgn.subject}</span>
              <h3 className="font-bold text-base text-white mt-0.5">{asgn.title}</h3>
              <span className="text-xs text-slate-400 mt-1 block">Due: {asgn.dueDate}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${asgn.status === 'Graded' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                {asgn.status}
              </span>
              <span className="text-sm font-bold text-white bg-slate-800 px-3 py-1 rounded-xl">{asgn.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
