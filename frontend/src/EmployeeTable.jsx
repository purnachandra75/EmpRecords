export default function EmployeeTable({ employees, onEdit, onDelete }) {
  if (employees.length === 0) {
    return <p className="empty">No employee records yet. Add one using the form.</p>
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Job title</th>
            <th>Phone</th>
            <th>Salary</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>
                {employee.firstName} {employee.lastName}
              </td>
              <td>{employee.email}</td>
              <td>{employee.department || '-'}</td>
              <td>{employee.jobTitle || '-'}</td>
              <td>{employee.phone || '-'}</td>
              <td>{employee.salary != null ? employee.salary.toLocaleString() : '-'}</td>
              <td className="row-actions">
                <button type="button" className="secondary" onClick={() => onEdit(employee)}>
                  Edit
                </button>
                <button type="button" className="danger" onClick={() => onDelete(employee)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
