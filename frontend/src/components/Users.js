import React, { useState, useEffect } from 'react'

const API = process.env.REACT_APP_API;

export const Users = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  const [editing, setEditing] = useState(false)
  const [id, setId] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(API)
    //console.log(name, email, password)
    if(!editing){
      const res = await fetch(`${API}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })
      const data = await res.json();
    } else {
      const res = await fetch(`${API}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })
      const data = await res.json();
      setId()
      setEditing(false)
    }
    
    setName('')
    setEmail('')
    setPassword('')
    await getUsers();
  }

  const getUsers = async () => {
    const res = await fetch(`${API}/users`)
    const data = await res.json();
   setUsers(data)
  }

  const deleteUser = async (id) => {
    const userResponse = window.confirm('Are you sure you want to delete it?')
    if(userResponse){
      const res = await fetch(`${API}/users/${id}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      await getUsers();
      console.log(data)
    }
  }

  const editUser = async (id) => {
    const res = await fetch(`${API}/user/${id}`)
    const data  = await res.json()
    //console.log(data)
    setName(data.name)
    setEmail(data.email)
    setPassword(data.password)
    setEditing(true)
    setId(id)

  }

  useEffect(()=>{
    getUsers();
  }, [])

  return (
    <div className='row'>
      <div className='col-md-4'>
        <form onSubmit={handleSubmit} className='card card-body'>
          <div className='form-group m-1'>
            <input type='text' className='form-control'  onChange={e => setName(e.target.value)} value={name} placeholder="Name" autoFocus />
          </div> 
          <div className='form-group m-1'>
          <input type='email' className='form-control'  onChange={e => setEmail(e.target.value)} value={email} placeholder="Email" />
          </div> 
          <div className='form-group m-1'>
          <input type='password' className='form-control'  onChange={e => setPassword(e.target.value)} value={password} placeholder="Password" /> 
          </div> 
          <button className='btn btn-primary btn-block'>
            { editing ? 'Update' : 'Create' }
          </button>
        </form>
      </div>
      <div className='col-md-6'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
          { users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button className='btn btn-secondary btn-sm col-12 m-1'
                onClick={() => editUser(user._id)}
                >
                  Edit
                </button>
                <button className='btn btn-danger btn-sm col-12 m-1'
                onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
        ))}
          </tbody>
        </table>
      </div>
    </div>
  )
  
}