import { useFetch } from "@/lib/fetchHandler";
import { LeaveFormProps, Leave, LeaveStatus, LeaveType, Employee } from "@/lib/interfaces";
import React, { ChangeEvent, useEffect, useState } from 'react';

export const LeaveForm: React.FC<LeaveFormProps> = ({
  employeeId,
  leaveTypeId,
  start_date,
  end_date,
  leaveStatusId,
  setEmployeeId,
  setLeaveTypeId,
  setStartLeave,
  setEndLeave,
  setLeaveStatusId
}) => {

  const {data: leaveTypes, fetchData: fetchLeaveTypes} = useFetch('/api/leavetypes');
  const {data: leaveStatus, fetchData: fetchLeaveStatus} = useFetch('/api/leavestatuses');
  const {data: employees, fetchData: fetchEmployees} = useFetch('/api/employees');

  useEffect(() => {
    fetchLeaveTypes();
    fetchLeaveStatus();
    fetchEmployees();
  }, []);

  return(
    <>
      <div className="form-group">
        <label className="block mb-2"></label>
        <select 
          className="input input-bordered input-primary w-full p-1.5 no-scrollbar" 
          value={employeeId} 
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setEmployeeId(Number(e.target.value))}
        >
          <option value="">Select Employee</option>
          {employees.map((employee: Employee) => (
            <option key={employee.id} value={employee.id}>{employee.firstName} {employee?.middleName} {employee.lastName}</option>
          ))}
        </select>

        <label className="block mt-2">Leave Start Date</label>
        <input 
          type="date" 
          className="input input-bordered input-primary w-full p-1.5" 
          value={start_date} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setStartLeave(e.target.value)} 
        />

        <label className="block mt-2">Leave End Date</label>
        <input 
          type="date" 
          className="input input-bordered input-primary w-full p-1.5" 
          value={end_date} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEndLeave(e.target.value)} 
        />
        
        <label className="block mb-2"></label>
        <select 
          className="input input-bordered input-primary w-full p-1.5 no-scrollbar" 
          value={leaveTypeId} 
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setLeaveTypeId(Number(e.target.value))}
        >
          <option value="">Leave Type</option>
          {leaveTypes.map((leaveType: LeaveType) => (
            <option key={leaveType.id} value={leaveType.id}>{leaveType.name}</option>
          ))}
        </select>

        <label className="block mb-2"></label>
        <select 
          className="input input-bordered input-primary w-full p-1.5 no-scrollbar" 
          value={leaveStatusId} 
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setLeaveStatusId(Number(e.target.value))}
        >
          <option value="">Leave Status</option>
          {leaveStatus.map((leaveStatus: LeaveStatus) => (
            <option key={leaveStatus.id} value={leaveStatus.id}>{leaveStatus.name}</option>
          ))}
        </select>
      </div>
    </>
  )
}