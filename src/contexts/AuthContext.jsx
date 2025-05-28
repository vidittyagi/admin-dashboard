import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, []);

  const login = async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          credentials.email === 'v@gmail.com' && 
          credentials.password === '12345678'
        ) {
          const mockUser = {
            id: 1,
            email: credentials.email,
            name: 'Admin User',
            role: 'admin',
            token: 'mock-token-' + Date.now()
          }
          localStorage.setItem('user', JSON.stringify(mockUser))
          setUser(mockUser)
          resolve(mockUser)
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 500)
    })
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const updateUser = (updatedUser) => {
    const newUser = { ...user, ...updatedUser }
    localStorage.setItem('user', JSON.stringify(newUser))
    setUser(newUser)
  }

  const value = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context;
}