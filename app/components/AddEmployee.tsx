import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EmployeeForm } from './EmployeeForm';

export const AddEmployee = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [roleId, setRoleId] = useState(0);
  const [employeeTypeId, setEmployeeTypeId] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !addressLine || !city || !province || !country || !roleId || !employeeTypeId) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          middleName,
          lastName,
          email,
          addressLine,
          city,
          province,
          country,
          roleId,
          employeeTypeId
        })
      });

      if (res.ok) {
        alert('Employee added successfully');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='form-group'>
      <EmployeeForm
        firstName={firstName}
        middleName={middleName}
        lastName={lastName}
        email={email}
        addressLine={addressLine}
        city={city}
        province={province}
        country={country}
        roleId={roleId}
        employeeTypeId={employeeTypeId}

        setFirstName={setFirstName}
        setMiddleName={setMiddleName}
        setLastName={setLastName}
        setEmail={setEmail}
        setAddressLine={setAddressLine}
        setCity={setCity}
        setProvince={setProvince}
        setCountry={setCountry}
        setRoleId={setRoleId}
        setEmployeeTypeId={setEmployeeTypeId}
      />
      <button type="submit" className="btn btn-primary mt-4">
        Submit  
      </button>
    </form>
  );
};
