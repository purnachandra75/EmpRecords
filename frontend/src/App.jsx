import { useEffect, useState } from 'react'
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from './api'
import EmployeeForm from './EmployeeForm'
import EmployeeTable from './EmployeeTable'
import './App.css'

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
  jobTitle: '',
  phone: '',
  salary: '',
}

export default function App() {
  const [employees, setEmployees] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  async function loadEmployees() {
    setLoading(true)
    setError('')
    try {
      const data = await getEmployees()
      setEmployees(data)
    } catch (err) {
      setError(err.message || 'Unable to load employees')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEmployees()
  }, [])

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)
  }

  function toPayload(values) {
    return {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      department: values.department.trim(),
      jobTitle: values.jobTitle.trim(),
      phone: values.phone.trim(),
      salary: values.salary === '' ? 0 : Number(values.salary),
    }
  }

  async function handleSubmit(values) {
    setSaving(true)
    setError('')
    setNotice('')
    try {
      const payload = toPayload(values)
      if (editingId) {
        await updateEmployee(editingId, payload)
        setNotice('Employee updated')
      } else {
        await createEmployee(payload)
        setNotice('Employee created')
      }
      resetForm()
      await loadEmployees()
    } catch (err) {
      setError(err.message || 'Unable to save employee')
    } finally {
      setSaving(false)
    }
  }

  function handleEdit(employee) {
    setEditingId(employee.id)
    setForm({
      firstName: employee.firstName || '',
      lastName: employee.lastName || '',
      email: employee.email || '',
      department: employee.department || '',
      jobTitle: employee.jobTitle || '',
      phone: employee.phone || '',
      salary: employee.salary ?? '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(employee) {
    const confirmed = window.confirm(`Delete ${employee.firstName} ${employee.lastName}?`)
    if (!confirmed) {
      return
    }
    setError('')
    setNotice('')
    try {
      await deleteEmployee(employee.id)
      if (editingId === employee.id) {
        resetForm()
      }
      setNotice('Employee deleted')
      await loadEmployees()
    } catch (err) {
      setError(err.message || 'Unable to delete employee')
    }
  }

  return (
    <div className="page">
      <header>
        <p className="eyebrow">EmpRecords</p>
        <h1>Employee records</h1>
        <p className="lede">Create, view, update, and delete employee records.</p>
      </header>

      {error && <div className="banner error">{error}</div>}
      {notice && <div className="banner success">{notice}</div>}

      <EmployeeForm
        value={form}
        onChange={setForm}
        onSubmit={handleSubmit}
        onCancel={resetForm}
        isEditing={Boolean(editingId)}
        saving={saving}
      />

      <section className="card">
        <div className="card-header row">
          <div>
            <h2>All employees</h2>
            <p>{loading ? 'Loading records...' : `${employees.length} record(s)`}</p>
          </div>
          <button type="button" className="secondary" onClick={loadEmployees} disabled={loading}>
            Refresh
          </button>
        </div>
        {!loading && (
          <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </section>
    </div>
  )
}
