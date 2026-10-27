const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
  jobTitle: '',
  phone: '',
  salary: '',
}

export default function EmployeeForm({ value, onChange, onSubmit, onCancel, isEditing, saving }) {
  const form = value ?? emptyForm

  function handleChange(event) {
    const { name, value: fieldValue } = event.target
    onChange({ ...form, [name]: fieldValue })
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="card-header">
        <h2>{isEditing ? 'Edit employee' : 'Add employee'}</h2>
        <p>Fill in the employee details and save the record.</p>
      </div>

      <div className="grid">
        <label>
          First name
          <input name="firstName" value={form.firstName} onChange={handleChange} required />
        </label>
        <label>
          Last name
          <input name="lastName" value={form.lastName} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Phone
          <input name="phone" value={form.phone} onChange={handleChange} />
        </label>
        <label>
          Department
          <input name="department" value={form.department} onChange={handleChange} />
        </label>
        <label>
          Job title
          <input name="jobTitle" value={form.jobTitle} onChange={handleChange} />
        </label>
        <label>
          Salary
          <input name="salary" type="number" min="0" step="0.01" value={form.salary} onChange={handleChange} />
        </label>
      </div>

      <div className="actions">
        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : isEditing ? 'Update employee' : 'Create employee'}
        </button>
        {isEditing && (
          <button type="button" className="secondary" onClick={onCancel} disabled={saving}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
