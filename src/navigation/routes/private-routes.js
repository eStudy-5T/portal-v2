import VerifyAccountPage from '../../pages/verify-account-page/VerifyAccountPage'

const privateRoutes = [
  {
    path: 'verify/:verifyToken',
    component: () => <VerifyAccountPage />,
    exact: true
  }
]

export default privateRoutes
