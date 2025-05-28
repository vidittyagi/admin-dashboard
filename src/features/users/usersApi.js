let mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: 2, name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'editor' },
  { id: 4, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' },
  { id: 5, name: 'Alice Brown', email: 'alice@example.com', role: 'user' }
]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export async function getUsers() {
  await delay(500)
  return [...mockUsers]
}

export async function createUser(user) {
  await delay(500)
  
  if (!user.name || !user.email || !user.role) {
    throw new Error('Missing required fields')
  }
  
  if (mockUsers.some(u => u.email === user.email)) {
    throw new Error('Email already exists')
  }
  
  const newUser = {
    id: Math.max(...mockUsers.map(u => u.id)) + 1,
    ...user,
    createdAt: new Date().toISOString()
  }
  
  mockUsers.push(newUser)
  return newUser
}

export async function updateUser({ id, ...user }) {
  await delay(500)
  
  const index = mockUsers.findIndex(u => u.id === id)
  if (index === -1) {
    throw new Error('User not found')
  }
  
  if (mockUsers.some(u => u.id !== id && u.email === user.email)) {
    throw new Error('Email already exists')
  }
  
  mockUsers[index] = { 
    ...mockUsers[index], 
    ...user, 
    updatedAt: new Date().toISOString() 
  }
  
  return mockUsers[index]
}

export async function deleteUser(id) {
  await delay(500)
  
  const index = mockUsers.findIndex(u => u.id === id)
  if (index === -1) {
    throw new Error('User not found')
  }
  
  const deletedUser = mockUsers[index]
  mockUsers.splice(index, 1)
  return deletedUser
}

export async function getUserById(id) {
  await delay(300)
  
  const user = mockUsers.find(u => u.id === id)
  if (!user) {
    throw new Error('User not found')
  }
  
  return user
}