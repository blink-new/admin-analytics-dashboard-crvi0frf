import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import ResetPasswordPage from './ResetPasswordPage'

type AuthMode = 'login' | 'register' | 'reset'

interface AuthFlowProps {
  onBack: () => void
}

const AuthFlow: React.FC<AuthFlowProps> = ({ onBack }) => {
  const [mode, setMode] = useState<AuthMode>('login')

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 }
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.3
  }

  return (
    <AnimatePresence mode="wait">
      {mode === 'login' && (
        <motion.div
          key="login"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <LoginPage
            onSwitchToRegister={() => setMode('register')}
            onSwitchToReset={() => setMode('reset')}
            onBack={onBack}
          />
        </motion.div>
      )}
      
      {mode === 'register' && (
        <motion.div
          key="register"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <RegisterPage
            onSwitchToLogin={() => setMode('login')}
            onBack={onBack}
          />
        </motion.div>
      )}
      
      {mode === 'reset' && (
        <motion.div
          key="reset"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <ResetPasswordPage
            onSwitchToLogin={() => setMode('login')}
            onBack={onBack}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AuthFlow